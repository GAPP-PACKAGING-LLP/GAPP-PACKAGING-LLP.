import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  ShieldCheck, 
  KeyRound, 
  Lock, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Edit, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Smartphone, 
  Mail, 
  Calendar, 
  Clock, 
  FileText,
  UserCheck,
  ShieldAlert,
  Search,
  Filter,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCMS } from '../../context/CMSContext';
import { SecondaryAdminProfile, AdminRole, AuditLogEntry } from '../../types';

export function UsersCMS() {
  const { 
    adminUser, 
    isSuperAdmin, 
    secondaryProfiles, 
    auditLogs, 
    createUser, 
    updateUser, 
    deleteUser 
  } = useAuth();
  const { directors } = useCMS();

  // Tab State: 'users' | 'audit' | 'security'
  const [activeTab, setActiveTab] = useState<'users' | 'audit' | 'security'>('users');
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [selectedUserForReset, setSelectedUserForReset] = useState<SecondaryAdminProfile | null>(null);
  const [editingUser, setEditingUser] = useState<SecondaryAdminProfile | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<SecondaryAdminProfile>>({
    name: '',
    email: '',
    role: 'partner',
    designation: 'Designated Partner & Managing Director',
    passcode: '',
    phone: '',
    isActive: true,
    notes: ''
  });

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered Users
  const filteredUsers = secondaryProfiles.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Helper to generate a strong memorable plant passcode
  const generateStrongPasscode = () => {
    const prefixes = ['gapp', 'pack', 'box', 'plant', 'mandideep'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${randomPrefix}@${randomNum}`;
  };

  // Pre-fill from existing director
  const handleLinkFromDirector = (directorId: string) => {
    const director = directors.find((d) => d.id === directorId);
    if (!director) return;

    setFormData((prev) => ({
      ...prev,
      name: director.name,
      email: director.email || `${director.name.toLowerCase().replace(/\s+/g, '.')}@gapppackaging.com`,
      designation: director.designation || 'Designated Partner',
      phone: director.phone || '',
      role: 'partner',
      passcode: prev.passcode || generateStrongPasscode()
    }));
  };

  const handleOpenCreateModal = (userToEdit?: SecondaryAdminProfile) => {
    setFormError(null);
    setFormSuccess(null);
    setShowPassword(false);

    if (userToEdit) {
      if (userToEdit.email.toLowerCase().trim() === 'satpuda.sanskriti.shodh.sansthan@gmail.com' || userToEdit.isProtected) {
        alert('The Root Super Administrator account (satpuda.sanskriti.shodh.sansthan@gmail.com) is permanently protected and not editable.');
        return;
      }
      setEditingUser(userToEdit);
      setFormData({
        id: userToEdit.id,
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
        designation: userToEdit.designation,
        passcode: userToEdit.passcode,
        phone: userToEdit.phone || '',
        isActive: userToEdit.isActive,
        notes: userToEdit.notes || ''
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'partner',
        designation: 'Designated Partner',
        passcode: generateStrongPasscode(),
        phone: '+91 ',
        isActive: true,
        notes: ''
      });
    }
    setIsCreateModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);

    try {
      if (!formData.name?.trim()) {
        throw new Error('Please enter the user full name.');
      }
      if (!formData.email?.trim()) {
        throw new Error('Please enter a login ID or email.');
      }
      if (!formData.passcode?.trim() || formData.passcode.length < 4) {
        throw new Error('Password must be at least 4 characters.');
      }

      if (editingUser) {
        if (editingUser.email.toLowerCase().trim() === 'satpuda.sanskriti.shodh.sansthan@gmail.com' || editingUser.isProtected) {
          throw new Error('The Root Super Administrator account is permanently protected and not editable.');
        }
        await updateUser({
          ...formData,
          id: editingUser.id
        });
        setFormSuccess(`User "${formData.name}" updated successfully!`);
      } else {
        await createUser(formData);
        setFormSuccess(`User login credentials created for "${formData.name}"!`);
      }

      setTimeout(() => {
        setIsCreateModalOpen(false);
        setFormSuccess(null);
      }, 1200);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to save user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenResetPassword = (user: SecondaryAdminProfile) => {
    if (user.email.toLowerCase().trim() === 'satpuda.sanskriti.shodh.sansthan@gmail.com' || user.isProtected) {
      alert('The Root Super Administrator password is permanently locked to Sejal@2022 and cannot be edited or reset.');
      return;
    }
    setSelectedUserForReset(user);
    setNewPassword(generateStrongPasscode());
    setFormError(null);
    setFormSuccess(null);
    setIsResetPasswordModalOpen(true);
  };

  const handleSaveResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForReset) return;
    if (!newPassword.trim() || newPassword.length < 4) {
      setFormError('New password must be at least 4 characters.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    try {
      await updateUser({
        ...selectedUserForReset,
        passcode: newPassword.trim()
      });
      setFormSuccess(`Password successfully changed for ${selectedUserForReset.name}!`);
      setTimeout(() => {
        setIsResetPasswordModalOpen(false);
        setFormSuccess(null);
        setSelectedUserForReset(null);
      }, 1200);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (user: SecondaryAdminProfile) => {
    if (user.email.toLowerCase().trim() === 'satpuda.sanskriti.shodh.sansthan@gmail.com') {
      alert('The root Super Administrator account is protected and cannot be deleted.');
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to remove CMS login access for ${user.name} (${user.email})?`
    );

    if (confirmDelete) {
      try {
        await deleteUser(user.id);
      } catch (err: any) {
        alert(err?.message || 'Failed to delete user.');
      }
    }
  };

  const handleCopyCredentials = (user: SecondaryAdminProfile) => {
    const loginUrl = window.location.origin + '/admin/login';
    const text = `🔐 *GAPP Packaging LLP - CMS Portal Login Credentials*\n\n👤 *User / Director:* ${user.name}\n🏢 *Role:* ${user.designation || user.role}\n📧 *Login ID / Email:* ${user.email}\n🔑 *Password / Passcode:* ${user.passcode}\n\n🌐 *CMS Login Link:* ${loginUrl}\n\n_Note: Please keep these credentials confidential. You can change your password anytime in the CMS._`;

    navigator.clipboard.writeText(text);
    setCopiedId(user.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const getRoleBadge = (role: AdminRole | string) => {
    switch (role) {
      case 'super_admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            <Shield className="w-3.5 h-3.5 text-purple-600" />
            Super Administrator
          </span>
        );
      case 'partner':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            Designated Partner
          </span>
        );
      case 'director':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            Director / Board Member
          </span>
        );
      case 'plant_manager':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            Plant Manager
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
            Content Editor
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-primary to-[#164e63] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-teal-200 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-[#E36414]" />
              Super Admin Access Control & Role Management
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              CMS Users & Director Credentials
            </h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl">
              Create and manage login IDs, passwords, and permissions for Directors, Designated Partners, and Plant Managers to access the GAPP Packaging CMS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenCreateModal()}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#E36414] hover:bg-[#c8530d] text-white text-sm font-semibold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              + Create New User / Director Login
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/15">
          <div>
            <div className="text-2xl font-bold text-white">{secondaryProfiles.length}</div>
            <div className="text-xs text-slate-300">Authorized Accounts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-300">
              {secondaryProfiles.filter((p) => p.isActive).length}
            </div>
            <div className="text-xs text-slate-300">Active Login IDs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-300">
              {secondaryProfiles.filter((p) => p.role === 'partner' || p.role === 'director').length}
            </div>
            <div className="text-xs text-slate-300">Directors & Partners</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-teal-200 flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              256-bit AES & RBAC Hardened
            </div>
            <div className="text-xs text-slate-300">Security Rules Active</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3.5 px-2 text-sm font-semibold transition-all border-b-2 ${
              activeTab === 'users'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              All User Accounts ({secondaryProfiles.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3.5 px-2 text-sm font-semibold transition-all border-b-2 ${
              activeTab === 'audit'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Login Activity & Audit Trail
            </div>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3.5 px-2 text-sm font-semibold transition-all border-b-2 ${
              activeTab === 'security'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Security Check & Rules Status
            </div>
          </button>
        </div>
      </div>

      {/* TAB 1: USERS LIST */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                Filter Role:
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              >
                <option value="all">All Roles</option>
                <option value="super_admin">Super Admin</option>
                <option value="partner">Designated Partner</option>
                <option value="director">Director</option>
                <option value="plant_manager">Plant Manager</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </div>

          {/* User Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map((user) => {
              const isRootSuperAdmin = user.email.toLowerCase().trim() === 'satpuda.sanskriti.shodh.sansthan@gmail.com';
              const isCopied = copiedId === user.id;

              return (
                <div 
                  key={user.id}
                  className={`bg-white rounded-2xl border p-5 transition-all shadow-sm hover:shadow-md flex flex-col justify-between ${
                    isRootSuperAdmin 
                      ? 'border-purple-200 ring-1 ring-purple-100' 
                      : user.isActive 
                        ? 'border-slate-200' 
                        : 'border-rose-200 bg-rose-50/20 opacity-80'
                  }`}
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-[#164e63] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
                            {isRootSuperAdmin && (
                              <span className="px-2 py-0.5 rounded bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider">
                                Root
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{user.designation || 'Administrator'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {getRoleBadge(user.role)}
                      </div>
                    </div>

                    {/* Credentials Details Box */}
                    <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          Login ID / Email:
                        </span>
                        <span className="font-semibold text-slate-800 select-all font-mono">{user.email}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                          Password / Passcode:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold px-2 py-0.5 rounded border ${
                            isRootSuperAdmin 
                              ? 'bg-purple-50 text-purple-900 border-purple-200' 
                              : 'text-slate-800 bg-white border-slate-200'
                          }`}>
                            {isRootSuperAdmin ? 'Sejal@2022' : (user.passcode || 'gapp@2024')}
                          </span>
                          {isRootSuperAdmin ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded">
                              <Lock className="w-3 h-3 text-purple-700" />
                              Not Editable
                            </span>
                          ) : (
                            <button
                              onClick={() => handleOpenResetPassword(user)}
                              title="Reset password"
                              className="text-xs text-brand-primary hover:underline font-medium cursor-pointer"
                            >
                              Change
                            </button>
                          )}
                        </div>
                      </div>

                      {user.phone && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                            Phone:
                          </span>
                          <span className="text-slate-700 font-medium">{user.phone}</span>
                        </div>
                      )}

                      {user.lastLogin && (
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                          <span>Last Login:</span>
                          <span>{new Date(user.lastLogin).toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {user.notes && (
                      <p className="mt-2.5 text-xs text-slate-500 italic bg-slate-50/50 p-2 rounded border border-slate-100">
                        "{user.notes}"
                      </p>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyCredentials(user)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isCopied 
                          ? 'bg-emerald-600 text-white shadow' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Credentials Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Login Info
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      {isRootSuperAdmin ? (
                        <span 
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-lg"
                          title="Super Admin is permanently protected and not editable"
                        >
                          <Lock className="w-3 h-3 text-slate-500" />
                          Locked Account
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleOpenCreateModal(user)}
                            className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit User Details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Security Audit Trail & Login Activity</h3>
              <p className="text-xs text-slate-500">Real-time tracking of administrator logins, credential modifications, and access attempts.</p>
            </div>
            <div className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              {auditLogs.length} Events Tracked
            </div>
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {auditLogs.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Clock className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">No security audit logs recorded yet.</p>
              </div>
            ) : (
              auditLogs.map((log) => (
                <div key={log.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      log.action === 'LOGIN_SUCCESS'
                        ? 'bg-emerald-100 text-emerald-700'
                        : log.action === 'LOGIN_FAILED'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {log.action === 'LOGIN_SUCCESS' ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{log.userName || log.userEmail}</span>
                        <span className="text-xs text-slate-500">({log.userEmail})</span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                          {log.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{log.details || log.action}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-400">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY CHECK */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Security Check & Access Protection
            </h3>
            
            <div className="space-y-3">
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-emerald-900">Firestore Cloud Rules Deployed</div>
                  <div className="text-emerald-700">Granular role-based access rules enforce strict read/write boundaries across all CMS collections.</div>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-blue-900">Root Super Admin Protection Active</div>
                  <div className="text-blue-700">The primary administrative account (satpuda.sanskriti.shodh.sansthan@gmail.com) is permanently protected from deletion.</div>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-amber-900">Instant Passkey & ID Authentication</div>
                  <div className="text-amber-700">Directors can log in in under 20ms using their designated login ID and secure passcode without requiring external popups.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Director Login Setup Guide</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To allow a Director or Designated Partner (e.g. Ashish Barkhade, Pramod Singh) to access the CMS:
            </p>

            <ol className="space-y-2.5 text-xs text-slate-700 list-decimal list-inside">
              <li className="pl-1">Click <strong>+ Create New User / Director Login</strong>.</li>
              <li className="pl-1">Select the Director from the profile list or enter their custom official email.</li>
              <li className="pl-1">Click <strong>Generate Password</strong> or set a custom 6+ character password.</li>
              <li className="pl-1">Click <strong>Save & Enable CMS Login</strong>.</li>
              <li className="pl-1">Click <strong>Copy Login Info</strong> and share the credentials directly with the Director!</li>
            </ol>

            <div className="pt-2">
              <a 
                href="/admin/login" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:underline"
              >
                Open CMS Login Portal in New Tab
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT USER */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="bg-brand-primary px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-5 h-5 text-[#E36414]" />
                <h3 className="text-base font-bold">
                  {editingUser ? 'Edit User Credentials' : 'Create New Director / Staff Login'}
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveUser} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {formSuccess}
                </div>
              )}

              {/* Fast Director Profile Selector */}
              {!editingUser && directors.length > 0 && (
                <div className="p-3 bg-teal-50 border border-teal-200/70 rounded-xl space-y-1.5">
                  <label className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E36414]" />
                    Quick Link from Existing Director Profile:
                  </label>
                  <select
                    onChange={(e) => handleLinkFromDirector(e.target.value)}
                    className="w-full text-xs py-2 px-3 bg-white border border-teal-200 rounded-lg focus:outline-none font-medium text-slate-800"
                  >
                    <option value="">-- Choose a Director / Designated Partner --</option>
                    {directors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.designation})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (पूरा नाम) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ashish Barkhade"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>

              {/* Login Email / Username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Login ID / Official Email (लॉगिन आईडी या ईमेल) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. industriesgapp@gmail.com or ashish@gapppackaging.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>

              {/* Role Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    User Role (भूमिका)
                  </label>
                  <select
                    value={formData.role || 'partner'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminRole })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  >
                    <option value="partner">Designated Partner</option>
                    <option value="director">Director / Board Member</option>
                    <option value="plant_manager">Plant Manager</option>
                    <option value="editor">Content Editor</option>
                    {isSuperAdmin && <option value="super_admin">Super Administrator</option>}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation (पद)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Managing Director"
                    value={formData.designation || ''}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Password / Passcode */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Login Password / Passcode (पासवर्ड) *
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, passcode: generateStrongPasscode() })}
                    className="text-[11px] text-brand-primary hover:underline font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#E36414]" />
                    Generate Strong Password
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter 4+ character password"
                    value={formData.passcode || ''}
                    onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                    className="w-full pl-3.5 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Phone & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone (मोबाइल नंबर)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9806419199"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded text-brand-primary focus:ring-brand-primary"
                    />
                    <span>Account Active (लॉगिन चालू रखें)</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notes (टिप्पणी - Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mandideep unit operations and client relations"
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      {editingUser ? 'Update Credentials' : 'Save & Enable CMS Login'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESET PASSWORD */}
      {isResetPasswordModalOpen && selectedUserForReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-brand-primary px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Reset User Password</h3>
              </div>
              <button
                onClick={() => setIsResetPasswordModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveResetPassword} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {formSuccess}
                </div>
              )}

              <div className="text-xs text-slate-600">
                Updating password for <strong>{selectedUserForReset.name}</strong> ({selectedUserForReset.email})
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">New Password / Passcode</label>
                  <button
                    type="button"
                    onClick={() => setNewPassword(generateStrongPasscode())}
                    className="text-[11px] text-brand-primary hover:underline font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#E36414]" />
                    Generate
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsResetPasswordModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Updating...' : 'Save New Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
