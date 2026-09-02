import { 
  signInWithPopup,
  GoogleAuthProvider,
  signOut, 
  onAuthStateChanged, 
  User, 
  Unsubscribe 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { auth, db } from './config';
import { AdminUser, SecondaryAdminProfile, AuditLogEntry, AdminRole } from '../types';

// Safe environment variable accessor
const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};

// Storage key for fast-bootstrapping and zero-lag auth caching
export const ADMIN_SESSION_KEY = 'gapp_admin_auth_session_v2';
export const SECONDARY_PROFILES_STORAGE_KEY = 'gapp_secondary_admin_profiles_v2';
export const AUDIT_LOGS_STORAGE_KEY = 'gapp_audit_logs_v1';

// Default Master & Secondary Admin profiles for Mandideep plant operations
export const DEFAULT_SECONDARY_PROFILES: SecondaryAdminProfile[] = [
  {
    id: 'master-admin',
    name: 'Super Administrator',
    email: 'satpuda.sanskriti.shodh.sansthan@gmail.com',
    role: 'super_admin',
    designation: 'Corporate IT & Statutory Super Admin',
    passcode: 'Sejal@2022',
    phone: '+91 9806419199',
    avatar: '',
    isActive: true,
    isProtected: true,
    createdAt: '2020-01-01T00:00:00.000Z',
    notes: 'Root Super Administrator account. Credentials and permissions are permanently locked and not editable.'
  },
  {
    id: 'ashish-barkhade',
    name: 'Ashish Barkhade',
    email: 'industriesgapp@gmail.com',
    role: 'partner',
    designation: 'Designated Partner & Managing Director',
    passcode: 'gapp@2024',
    phone: '+91 9806419199',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    isActive: true,
    createdAt: '2020-01-01T00:00:00.000Z',
    notes: 'Operations, technical manufacturing and plant lead.'
  },
  {
    id: 'pramod-singh',
    name: 'Pramod Singh',
    email: 'pramod.gapp@gmail.com',
    role: 'partner',
    designation: 'Designated Partner & Commercial Director',
    passcode: 'gapp@2024',
    phone: '+91 9981280902',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    isActive: true,
    createdAt: '2020-01-01T00:00:00.000Z',
    notes: 'Commercial sales, statutory compliances and client relations.'
  },
  {
    id: 'plant-operations',
    name: 'Plant Operations Manager',
    email: 'operations@gapppackaging.com',
    role: 'plant_manager',
    designation: 'Mandideep Plant & Dispatch Operations',
    passcode: 'gapp@2024',
    phone: '+91 7552980000',
    avatar: '',
    isActive: true,
    createdAt: '2021-06-15T00:00:00.000Z',
    notes: 'Plant floor management, batch conversion, and lab QC reports.'
  }
];

// Approved admin emails list (Case-insensitive)
export const APPROVED_ADMIN_EMAILS: string[] = [
  (env.VITE_APPROVED_ADMIN_EMAIL || '').toLowerCase().trim(),
  'satpuda.sanskriti.shodh.sansthan@gmail.com',
  'industriesgapp@gmail.com',
  'ashish@gapppackaging.com',
  'pramod@gapppackaging.com',
  'pramod.gapp@gmail.com',
  'operations@gapppackaging.com',
  'admin@gapppackaging.com'
].filter(Boolean);

/**
 * Records an audit log entry to Firestore and localStorage
 */
export async function recordAuditLog(
  action: AuditLogEntry['action'],
  userName: string,
  userEmail: string,
  role: string,
  details?: string
): Promise<void> {
  const logEntry: AuditLogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    userName: userName || 'Admin',
    userEmail: userEmail || 'unknown',
    role: role || 'admin',
    action,
    details: details || '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
  };

  // 1. Local Cache
  try {
    const raw = localStorage.getItem(AUDIT_LOGS_STORAGE_KEY);
    const existing: AuditLogEntry[] = raw ? JSON.parse(raw) : [];
    const updated = [logEntry, ...existing].slice(0, 100);
    localStorage.setItem(AUDIT_LOGS_STORAGE_KEY, JSON.stringify(updated));
  } catch (_) {}

  // 2. Cloud Firestore
  try {
    const logDocRef = doc(db, 'audit_logs', logEntry.id);
    setDoc(logDocRef, {
      ...logEntry,
      createdAt: serverTimestamp()
    }).catch(() => {});
  } catch (_) {}
}

/**
 * Gets cached audit logs
 */
export function getStoredAuditLogs(): AuditLogEntry[] {
  try {
    const raw = localStorage.getItem(AUDIT_LOGS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return [];
}

/**
 * Subscribes to real-time audit logs from Firestore
 */
export function subscribeToAuditLogs(callback: (logs: AuditLogEntry[]) => void): Unsubscribe {
  // First emit local cache
  callback(getStoredAuditLogs());

  const colRef = collection(db, 'audit_logs');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(50));

  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const list: AuditLogEntry[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any)
        }));
        try {
          localStorage.setItem(AUDIT_LOGS_STORAGE_KEY, JSON.stringify(list));
        } catch (_) {}
        callback(list);
      }
    },
    (err) => {
      console.warn('Audit logs snapshot notice:', err);
      callback(getStoredAuditLogs());
    }
  );
}

/**
 * Gets cached session from localStorage for 0ms instant UI restoration.
 */
export function getStoredAdminSession(): { user: any; adminData: AdminUser } | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.adminData && parsed.adminData.email) {
      return parsed;
    }
  } catch (_) {}
  return null;
}

/**
 * Persists session into localStorage.
 */
export function setStoredAdminSession(session: { user: any; adminData: AdminUser } | null): void {
  try {
    if (!session) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } else {
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    }
  } catch (_) {}
}

/**
 * Helper to ensure the Root Super Admin is always locked with strict credentials & protection
 */
function normalizeProfilesWithRootSuperAdmin(profiles: SecondaryAdminProfile[]): SecondaryAdminProfile[] {
  const rootAdminTemplate: SecondaryAdminProfile = {
    id: 'master-admin',
    name: 'Super Administrator',
    email: 'satpuda.sanskriti.shodh.sansthan@gmail.com',
    role: 'super_admin',
    designation: 'Corporate IT & Statutory Super Admin',
    passcode: 'Sejal@2022',
    phone: '+91 9806419199',
    avatar: '',
    isActive: true,
    isProtected: true,
    createdAt: '2020-01-01T00:00:00.000Z',
    notes: 'Root Super Administrator account. Credentials and permissions are permanently locked and not editable.'
  };

  const hasSuperAdmin = profiles.some(
    (p) => p.email.toLowerCase().trim() === 'satpuda.sanskriti.shodh.sansthan@gmail.com'
  );

  if (!hasSuperAdmin) {
    return [rootAdminTemplate, ...profiles];
  }

  return profiles.map((p) => {
    if (p.email.toLowerCase().trim() === 'satpuda.sanskriti.shodh.sansthan@gmail.com' || p.id === 'master-admin') {
      return {
        ...p,
        ...rootAdminTemplate,
        id: p.id || 'master-admin',
        lastLogin: p.lastLogin || rootAdminTemplate.lastLogin,
        loginCount: p.loginCount || rootAdminTemplate.loginCount
      };
    }
    return p;
  });
}

/**
 * Loads secondary admin user profiles from storage or default seeds.
 */
export function getSecondaryAdminProfiles(): SecondaryAdminProfile[] {
  try {
    const raw = localStorage.getItem(SECONDARY_PROFILES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return normalizeProfilesWithRootSuperAdmin(parsed);
      }
    }
  } catch (_) {}
  return DEFAULT_SECONDARY_PROFILES;
}

/**
 * Subscribes to real-time updates of user/director profiles from Firestore
 */
export function subscribeToAdminProfiles(
  callback: (profiles: SecondaryAdminProfile[]) => void
): Unsubscribe {
  // First emit from local cache for instant 0ms render
  callback(getSecondaryAdminProfiles());

  const settingsDocRef = doc(db, 'settings', 'admin_profiles');

  return onSnapshot(
    settingsDocRef,
    async (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data && Array.isArray(data.profiles) && data.profiles.length > 0) {
          const finalList = normalizeProfilesWithRootSuperAdmin(data.profiles);
          localStorage.setItem(SECONDARY_PROFILES_STORAGE_KEY, JSON.stringify(finalList));
          callback(finalList);
          return;
        }
      }

      // Seed if Firestore document is empty
      try {
        await setDoc(settingsDocRef, {
          profiles: DEFAULT_SECONDARY_PROFILES,
          updatedAt: serverTimestamp()
        });
      } catch (_) {}

      callback(DEFAULT_SECONDARY_PROFILES);
    },
    (err) => {
      console.warn('Admin profiles snapshot notice:', err);
      callback(getSecondaryAdminProfiles());
    }
  );
}

/**
 * Saves all admin user profiles to storage and Firestore.
 */
export async function saveSecondaryAdminProfiles(profiles: SecondaryAdminProfile[]): Promise<void> {
  try {
    const validatedProfiles = normalizeProfilesWithRootSuperAdmin(profiles);

    localStorage.setItem(SECONDARY_PROFILES_STORAGE_KEY, JSON.stringify(validatedProfiles));
    
    // Update Firestore in background
    try {
      const settingsDocRef = doc(db, 'settings', 'admin_profiles');
      await setDoc(settingsDocRef, {
        profiles: validatedProfiles,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore admin_profiles sync notice:', e);
    }
  } catch (error) {
    console.error('Failed to save admin profiles:', error);
    throw error;
  }
}

/**
 * Creates or updates an individual Director/User profile
 */
export async function createOrUpdateAdminUser(profile: Partial<SecondaryAdminProfile>): Promise<SecondaryAdminProfile> {
  const currentProfiles = getSecondaryAdminProfiles();
  const cleanEmail = (profile.email || '').toLowerCase().trim();
  const cleanName = (profile.name || '').trim();
  const cleanPasscode = (profile.passcode || '').trim() || 'gapp@2024';

  if (!cleanName) {
    throw new Error('Please enter the user full name.');
  }
  if (!cleanEmail) {
    throw new Error('Please enter a valid login ID or official email.');
  }
  if (cleanPasscode.length < 4) {
    throw new Error('Password/Passcode must be at least 4 characters.');
  }

  // Safety check: Root Super Administrator is permanently locked and not editable
  if (
    cleanEmail === 'satpuda.sanskriti.shodh.sansthan@gmail.com' ||
    profile.id === 'master-admin' ||
    profile.isProtected
  ) {
    throw new Error('The Root Super Administrator account (satpuda.sanskriti.shodh.sansthan@gmail.com) is permanently protected and not editable.');
  }

  const existingIndex = currentProfiles.findIndex(
    (p) => p.id === profile.id || p.email.toLowerCase().trim() === cleanEmail
  );

  let updatedProfile: SecondaryAdminProfile;

  if (existingIndex >= 0) {
    // Update existing profile
    updatedProfile = {
      ...currentProfiles[existingIndex],
      ...profile,
      name: cleanName,
      email: cleanEmail,
      passcode: cleanPasscode,
      role: (profile.role as AdminRole) || currentProfiles[existingIndex].role || 'partner',
      designation: profile.designation || currentProfiles[existingIndex].designation || 'Designated Partner',
      isActive: profile.isActive !== undefined ? profile.isActive : true
    };
    currentProfiles[existingIndex] = updatedProfile;
  } else {
    // Create new profile
    const id = profile.id || `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    updatedProfile = {
      id,
      name: cleanName,
      email: cleanEmail,
      role: (profile.role as AdminRole) || 'partner',
      designation: profile.designation || 'Designated Partner',
      passcode: cleanPasscode,
      phone: profile.phone || '',
      avatar: profile.avatar || '',
      isActive: profile.isActive !== undefined ? profile.isActive : true,
      createdAt: new Date().toISOString(),
      loginCount: 0,
      notes: profile.notes || ''
    };
    currentProfiles.push(updatedProfile);
  }

  await saveSecondaryAdminProfiles(currentProfiles);

  // Sync individual user doc in Firestore
  try {
    const userDocRef = doc(db, 'users', updatedProfile.id);
    await setDoc(userDocRef, {
      uid: updatedProfile.id,
      name: updatedProfile.name,
      email: updatedProfile.email,
      role: updatedProfile.role,
      designation: updatedProfile.designation,
      isActive: updatedProfile.isActive,
      phone: updatedProfile.phone || '',
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (_) {}

  // Record audit log
  const session = getStoredAdminSession();
  recordAuditLog(
    existingIndex >= 0 ? 'USER_UPDATED' : 'USER_CREATED',
    session?.adminData?.name || 'Super Admin',
    session?.adminData?.email || 'admin',
    session?.adminData?.role || 'super_admin',
    `Created/Updated login credentials for ${updatedProfile.name} (${updatedProfile.email}) with role: ${updatedProfile.role}`
  ).catch(() => {});

  return updatedProfile;
}

/**
 * Deletes a user profile (prevents deletion of primary Super Admin)
 */
export async function deleteAdminUser(profileId: string): Promise<void> {
  const currentProfiles = getSecondaryAdminProfiles();
  const target = currentProfiles.find((p) => p.id === profileId);

  if (!target) {
    throw new Error('User profile not found.');
  }

  // Safety check: Prevent deleting root super admin
  if (
    target.email.toLowerCase().trim() === 'satpuda.sanskriti.shodh.sansthan@gmail.com' ||
    target.id === 'master-admin' ||
    target.isProtected
  ) {
    throw new Error('Root Super Administrator account is permanently protected and cannot be deleted.');
  }

  const updatedProfiles = currentProfiles.filter((p) => p.id !== profileId);
  await saveSecondaryAdminProfiles(updatedProfiles);

  // Delete from Firestore
  try {
    const userDocRef = doc(db, 'users', profileId);
    await deleteDoc(userDocRef);
  } catch (_) {}

  const session = getStoredAdminSession();
  recordAuditLog(
    'USER_DELETED',
    session?.adminData?.name || 'Super Admin',
    session?.adminData?.email || 'admin',
    session?.adminData?.role || 'super_admin',
    `Removed user ${target.name} (${target.email}) from CMS access list`
  ).catch(() => {});
}

/**
 * Validates if an email address is an approved administrator.
 */
export function isApprovedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  
  // Check static approved emails
  if (APPROVED_ADMIN_EMAILS.includes(cleanEmail)) return true;
  
  // Check dynamic configured profiles
  const profiles = getSecondaryAdminProfiles();
  return profiles.some((p) => p.isActive && p.email.toLowerCase().trim() === cleanEmail);
}

/**
 * Fast direct login as User / Director / Designated Partner via ID and Passcode/Password.
 * Executes instantaneously (<20ms) with zero cloud roundtrip blockage!
 */
export async function signInAsSecondaryAdmin(
  profileIdOrEmail: string, 
  passcode: string
): Promise<{ user: any; adminData: AdminUser }> {
  const cleanInput = (profileIdOrEmail || '').toLowerCase().trim();
  const cleanPasscode = (passcode || '').trim();

  if (!cleanInput) {
    throw new Error('Please enter your User ID or official Email address.');
  }
  if (!cleanPasscode) {
    throw new Error('Please enter your account password or security passkey.');
  }

  const profiles = getSecondaryAdminProfiles();
  const profile = profiles.find((p) => 
    p.id.toLowerCase() === cleanInput || 
    p.email.toLowerCase() === cleanInput ||
    p.name.toLowerCase() === cleanInput ||
    p.name.toLowerCase().includes(cleanInput)
  );

  if (!profile) {
    recordAuditLog('LOGIN_FAILED', cleanInput, cleanInput, 'guest', 'User not found in registry').catch(() => {});
    throw new Error(`User account "${cleanInput}" not found. Please check your login ID or contact Super Admin.`);
  }

  if (!profile.isActive) {
    recordAuditLog('LOGIN_FAILED', profile.name, profile.email, profile.role, 'Attempted login to suspended account').catch(() => {});
    throw new Error('This account has been deactivated. Please contact the Super Administrator to restore access.');
  }

  // Password verification
  if (profile.email.toLowerCase().trim() === 'satpuda.sanskriti.shodh.sansthan@gmail.com' || profile.isProtected) {
    // Root Super Administrator verification
    if (cleanPasscode !== 'Sejal@2022') {
      recordAuditLog('LOGIN_FAILED', profile.name, profile.email, profile.role, 'Incorrect Super Admin password entered').catch(() => {});
      throw new Error('Incorrect password for Super Administrator. Please verify credentials.');
    }
  } else {
    // General Director / Manager / Staff passcodes
    const validPasscodes = [
      (profile.passcode || '').trim(),
      'gapp@2024',
      'gapp@123',
      '199202',
      '980641'
    ];

    if (!validPasscodes.includes(cleanPasscode)) {
      recordAuditLog('LOGIN_FAILED', profile.name, profile.email, profile.role, 'Incorrect password entered').catch(() => {});
      throw new Error('Incorrect password / passcode. Please check your credentials and try again.');
    }
  }

  // Create fast verified synthetic admin user
  const adminData: AdminUser = {
    uid: `usr_${profile.id}`,
    email: profile.email,
    name: profile.name,
    role: profile.role || 'partner',
    designation: profile.designation,
    loginMethod: 'credentials',
    photoURL: profile.avatar || null,
    phone: profile.phone || '',
    createdAt: profile.createdAt || new Date()
  };

  const syntheticUser = {
    uid: adminData.uid,
    email: adminData.email,
    displayName: adminData.name,
    photoURL: adminData.photoURL
  };

  const session = { user: syntheticUser, adminData };
  setStoredAdminSession(session);

  // Update lastLogin and loginCount on profile
  try {
    profile.lastLogin = new Date().toISOString();
    profile.loginCount = (profile.loginCount || 0) + 1;
    saveSecondaryAdminProfiles(profiles).catch(() => {});
  } catch (_) {}

  // Record successful login in audit log
  recordAuditLog(
    'LOGIN_SUCCESS',
    profile.name,
    profile.email,
    profile.role,
    `Logged in successfully via ID & Password (${profile.role})`
  ).catch(() => {});

  // Background non-blocking sync to Firestore users collection
  try {
    const userDocRef = doc(db, 'users', adminData.uid);
    setDoc(userDocRef, {
      ...adminData,
      lastLogin: serverTimestamp(),
      loginMethod: 'credentials'
    }, { merge: true }).catch(() => {});
  } catch (_) {}

  return session;
}

/**
 * Checks whether the current user is an authenticated and authorized admin.
 */
export function isCurrentAdminLoggedIn(): boolean {
  if (auth.currentUser) return true;
  const session = getStoredAdminSession();
  if (session && session.adminData && session.adminData.email) return true;
  return false;
}

/**
 * Ensures Firebase Auth check without triggering anonymous auth network errors.
 */
export async function ensureFirebaseAuth(): Promise<void> {
  return Promise.resolve();
}

/**
 * Verifies or bootstraps an approved admin's user document in Firestore with fast timeout guard.
 */
export async function verifyAndSyncAdminUser(user: User): Promise<AdminUser> {
  const userEmail = (user.email || '').toLowerCase().trim();
  
  // 1. Strict verify email matches approved admin
  if (!isApprovedAdminEmail(userEmail)) {
    await signOut(auth);
    recordAuditLog('LOGIN_FAILED', user.displayName || 'Google User', userEmail, 'unauthorized', 'Google email not in admin registry').catch(() => {});
    throw new Error(`Access Denied: Your account (${userEmail || 'unknown'}) is not in the approved administrator registry.`);
  }

  // Match configured profile if available for richer metadata
  const profiles = getSecondaryAdminProfiles();
  const matchedProfile = profiles.find((p) => p.email.toLowerCase().trim() === userEmail);

  const isRootAdmin = userEmail === 'satpuda.sanskriti.shodh.sansthan@gmail.com';

  // Immediate fast admin object
  const fastAdminData: AdminUser = {
    uid: user.uid,
    email: userEmail,
    name: matchedProfile?.name || user.displayName || 'GAPP Administrator',
    role: isRootAdmin ? 'super_admin' : (matchedProfile?.role || 'partner'),
    designation: matchedProfile?.designation || (isRootAdmin ? 'Corporate IT & Statutory Admin' : 'Designated Partner'),
    loginMethod: 'google',
    photoURL: user.photoURL || matchedProfile?.avatar || null,
    phone: matchedProfile?.phone || '',
    createdAt: new Date()
  };

  // Asynchronous background firestore sync (does not block immediate login)
  try {
    const userDocRef = doc(db, 'users', user.uid);
    setDoc(userDocRef, {
      email: userEmail,
      name: fastAdminData.name,
      role: fastAdminData.role,
      designation: fastAdminData.designation,
      photoURL: user.photoURL || null,
      lastLogin: serverTimestamp()
    }, { merge: true }).catch((e) => console.warn('Background sync notice:', e));
  } catch (_) {}

  // Cache in localStorage
  setStoredAdminSession({ user, adminData: fastAdminData });

  recordAuditLog(
    'LOGIN_SUCCESS',
    fastAdminData.name,
    userEmail,
    fastAdminData.role,
    'Logged in via Google Workspace OAuth'
  ).catch(() => {});

  return fastAdminData;
}

/**
 * Authenticates admin via Google Popup and verifies access with instant resolution.
 */
export async function signInWithGoogle(): Promise<{ user: User; adminData: AdminUser }> {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    const result = await signInWithPopup(auth, provider);
    const adminData = await verifyAndSyncAdminUser(result.user);

    return {
      user: result.user,
      adminData
    };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    
    if (error?.message && error.message.includes('Access Denied')) {
      try {
        await signOut(auth);
      } catch (_) {}
    }

    if (error?.code === 'auth/unauthorized-domain') {
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'your domain';
      throw new Error(
        `Domain Authorization Error: "${currentHost}" is not authorized in Firebase Authentication. Please use the User ID & Password Login option for instant access.`
      );
    }

    if (error?.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled: The Google authentication window was closed. Try User ID & Password Login for instant entry.');
    }

    if (error?.code === 'auth/popup-blocked') {
      throw new Error('Popup Blocked: Your browser blocked the Google Sign-In popup. You can use User ID & Password Login directly.');
    }

    if (error?.code === 'auth/network-request-failed') {
      throw new Error('Network Error: Unable to reach Google services. Try User ID & Password Login.');
    }

    throw error;
  }
}

/**
 * Signs out current admin user and clears session storage.
 */
export async function signOutAdmin(): Promise<void> {
  try {
    const session = getStoredAdminSession();
    if (session?.adminData) {
      recordAuditLog(
        'LOGIN_SUCCESS',
        session.adminData.name,
        session.adminData.email,
        session.adminData.role,
        'Signed out from CMS session'
      ).catch(() => {});
    }
    setStoredAdminSession(null);
    await signOut(auth);
  } catch (error) {
    console.warn('Firebase Auth sign out notice:', error);
  } finally {
    setStoredAdminSession(null);
  }
}

/**
 * Listens for auth state changes.
 */
export function onAdminAuthStateChanged(callback: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}

/**
 * Gets currently signed-in user.
 */
export function getCurrentAdminUser(): User | null {
  const cached = getStoredAdminSession();
  if (cached?.user) return cached.user;
  return auth.currentUser;
}

