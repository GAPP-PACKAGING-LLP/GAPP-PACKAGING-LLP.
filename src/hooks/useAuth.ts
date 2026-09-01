import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { 
  onAdminAuthStateChanged, 
  signInWithGoogle as authSignInWithGoogle, 
  signInAsSecondaryAdmin,
  signOutAdmin, 
  isApprovedAdminEmail,
  verifyAndSyncAdminUser,
  getStoredAdminSession,
  setStoredAdminSession,
  getSecondaryAdminProfiles,
  saveSecondaryAdminProfiles,
  ensureFirebaseAuth
} from '../firebase/auth';
import { AdminUser, SecondaryAdminProfile } from '../types';

export interface UseAuthReturn {
  user: User | any | null;
  adminUser: AdminUser | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  secondaryProfiles: SecondaryAdminProfile[];
  loginWithGoogle: () => Promise<void>;
  loginWithSecondaryUser: (profileIdOrEmail: string, passcode: string) => Promise<void>;
  updateSecondaryProfiles: (profiles: SecondaryAdminProfile[]) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  // Immediate synchronous cache hydration for 0ms initial load
  const initialSession = getStoredAdminSession();
  const [user, setUser] = useState<User | any | null>(initialSession?.user || null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(initialSession?.adminData || null);
  const [loading, setLoading] = useState<boolean>(!initialSession);
  const [error, setError] = useState<string | null>(null);
  const [secondaryProfiles, setSecondaryProfiles] = useState<SecondaryAdminProfile[]>(getSecondaryAdminProfiles());

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Listen to secondary profiles changes
  const refreshProfiles = useCallback(() => {
    setSecondaryProfiles(getSecondaryAdminProfiles());
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Listen to Firebase Auth state
    const unsubscribe = onAdminAuthStateChanged(async (firebaseUser) => {
      if (!isMounted) return;
      
      // If user is already authenticated via secondary passkey session, preserve it
      const currentStored = getStoredAdminSession();
      if (currentStored && currentStored.adminData?.loginMethod === 'passkey' && !firebaseUser) {
        setUser(currentStored.user);
        setAdminUser(currentStored.adminData);
        setLoading(false);
        ensureFirebaseAuth().catch(() => {});
        return;
      }

      if (!firebaseUser) {
        if (!currentStored) {
          setUser(null);
          setAdminUser(null);
        }
        setLoading(false);
        return;
      }

      try {
        const email = (firebaseUser.email || '').toLowerCase().trim();

        // 1. Verify email matches approved admin
        if (!isApprovedAdminEmail(email)) {
          await signOutAdmin();
          if (isMounted) {
            setUser(null);
            setAdminUser(null);
            setError('Access Denied: Your account is not in the approved administrator registry.');
            setLoading(false);
          }
          return;
        }

        // 2. Fetch or sync Admin User document in Firestore with fast resolution
        const adminData = await verifyAndSyncAdminUser(firebaseUser);
        
        if (isMounted) {
          setUser(firebaseUser);
          setAdminUser(adminData);
          setError(null);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Auth verification error:', err);
        if (isMounted) {
          // If we had a valid session, preserve it; otherwise show error
          if (!currentStored) {
            setUser(null);
            setAdminUser(null);
            setError(err?.message || 'Access Denied: Unable to verify admin privileges.');
          }
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const { user: authedUser, adminData } = await authSignInWithGoogle();
      setUser(authedUser);
      setAdminUser(adminData);
      setStoredAdminSession({ user: authedUser, adminData });
      setError(null);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.message || 'Sign in failed. Access is restricted to approved administrators.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithSecondaryUser = async (profileIdOrEmail: string, passcode: string) => {
    setLoading(true);
    setError(null);
    try {
      const session = await signInAsSecondaryAdmin(profileIdOrEmail, passcode);
      setUser(session.user);
      setAdminUser(session.adminData);
      setError(null);
    } catch (err: any) {
      console.error('Secondary login error:', err);
      setError(err?.message || 'Invalid admin credentials or passcode.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSecondaryProfiles = async (profiles: SecondaryAdminProfile[]) => {
    await saveSecondaryAdminProfiles(profiles);
    setSecondaryProfiles(profiles);
  };

  const logout = async () => {
    setLoading(true);
    try {
      setStoredAdminSession(null);
      await signOutAdmin();
      setUser(null);
      setAdminUser(null);
      setError(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setAdminUser(null);
      setLoading(false);
    }
  };

  const isAdmin = Boolean(
    user && 
    adminUser && 
    (isApprovedAdminEmail(adminUser.email) || isApprovedAdminEmail(user?.email))
  );

  return {
    user,
    adminUser,
    loading,
    error,
    isAdmin,
    secondaryProfiles,
    loginWithGoogle,
    loginWithSecondaryUser,
    updateSecondaryProfiles,
    logout,
    clearError
  };
}

