import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  AlertCircle, 
  RefreshCw,
  CheckCircle2,
  Users,
  KeyRound,
  Eye,
  EyeOff,
  Building2,
  Sparkles,
  Zap,
  UserCheck,
  Mail,
  Shield
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { companyData } from '../data/companyData';
import { BrandLogo } from '../components/common/BrandLogo';

export const AdminLogin: React.FC = () => {
  const { 
    user, 
    isAdmin, 
    loading, 
    error, 
    secondaryProfiles, 
    loginWithGoogle, 
    loginWithCredentials, 
    clearError 
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'credentials' | 'google'>('credentials');
  const [loginIdentifier, setLoginIdentifier] = useState<string>('industriesgapp@gmail.com');
  const [passcode, setPasscode] = useState<string>('gapp@2024');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ashish-barkhade');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin';

  // If already authenticated and admin, redirect instantly to admin CMS
  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate(from, { replace: true });
    }
  }, [user, isAdmin, loading, navigate, from]);

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    clearError();
    setIsSigningIn(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Google login error:', err);
      setLocalError(
        err?.message || 'Access Denied: You are not authorized to access the GAPP Packaging Admin CMS.'
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleCredentialsSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLocalError(null);
    clearError();
    setIsSigningIn(true);
    try {
      const targetIdentifier = loginIdentifier.trim();
      if (!targetIdentifier) {
        throw new Error('Please enter your User Login ID or official Email address.');
      }
      if (!passcode.trim()) {
        throw new Error('Please enter your password / passcode.');
      }

      await loginWithCredentials(targetIdentifier, passcode.trim());
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Credentials login error:', err);
      setLocalError(
        err?.message || 'Authentication failed. Please verify your login ID and password.'
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleQuickSelectUser = (profile: any) => {
    setSelectedPresetId(profile.id);
    setLoginIdentifier(profile.email || profile.id);
    setPasscode(profile.passcode || 'gapp@2024');
    setLocalError(null);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#0F4C5C] selection:text-white" id="admin-login-page">
      
      {/* Top back navigation */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg mb-4 flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0F4C5C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </Link>
        <span className="text-[11px] font-mono text-slate-400">Mandideep Plant Portal</span>
      </div>

      {/* Main Login Card Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-md space-y-6">
          
          {/* Header & Brand Identity */}
          <div className="text-center space-y-2">
            <div className="flex justify-center pb-1">
              <BrandLogo theme="light" className="h-12 w-auto max-w-[200px]" alt="GAPP Packaging" />
            </div>
            
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                GAPP Packaging CMS Login
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Super Admin & Director Control Center (लॉगिन पोर्टल)
              </p>
            </div>
          </div>

          {/* Login Method Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab('credentials');
                setLocalError(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === 'credentials'
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-[#D97706]" />
              <span>ID & Password Login</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('google');
                setLocalError(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === 'google'
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Google Workspace</span>
            </button>
          </div>

          {/* Error Message Box */}
          {displayError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs text-red-700 space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-red-800">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>Authentication Notice</span>
              </div>
              <p className="leading-relaxed text-red-600">
                {displayError}
              </p>
            </div>
          )}

          {/* TAB 1: ID & PASSWORD LOGIN */}
          {activeTab === 'credentials' && (
            <form onSubmit={handleCredentialsSignIn} className="space-y-5">
              {/* Quick Select Director Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Quick Select Director / Staff Login:
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {secondaryProfiles.map((p) => {
                    const isSelected = selectedPresetId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleQuickSelectUser(p)}
                        className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-teal-50/70 border-[#0F4C5C] ring-1 ring-[#0F4C5C]'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? 'bg-[#0F4C5C] text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {p.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {p.name.split(' ')[0]}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {p.role === 'super_admin' ? 'Super Admin' : p.role === 'partner' ? 'Director' : 'Manager'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Identifier (Email or Username) */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Login ID / Official Email (यूजर आईडी या ईमेल):
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => {
                      setLoginIdentifier(e.target.value);
                      setSelectedPresetId('');
                    }}
                    placeholder="e.g. industriesgapp@gmail.com or ashish@gapppackaging.com"
                    className="w-full text-xs font-mono pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white outline-none"
                  />
                </div>
              </div>

              {/* Password / Passcode */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password / Passcode (पासवर्ड):
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Default: gapp@2024</span>
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full text-xs font-mono pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full flex items-center justify-center gap-2 bg-[#0F4C5C] hover:bg-[#0A3642] active:scale-[0.99] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSigningIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                    <span>Login to CMS Dashboard</span>
                  </>
                )}
              </button>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <Shield className="w-3.5 h-3.5 text-[#0F4C5C]" />
                  <span>Super Admin & Role Security</span>
                </div>
                <p className="leading-relaxed text-slate-500">
                  Super Admin can manage and issue new login accounts for Directors, Designated Partners, and plant staff inside CMS under <strong>Users & Access Control</strong>.
                </p>
              </div>
            </form>
          )}

          {/* TAB 2: GOOGLE WORKSPACE OAUTH */}
          {activeTab === 'google' && (
            <div className="space-y-4 pt-1">
              <p className="text-xs text-slate-600 leading-relaxed">
                Sign in using your authorized GAPP Packaging Google Workspace or partner Gmail account.
              </p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                id="google-signin-btn"
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-300 hover:border-slate-400 py-3.5 px-4 rounded-xl font-bold text-sm shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {isSigningIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-[#0F4C5C] animate-spin" />
                    <span>Connecting Google Auth...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span className="text-slate-800 font-bold group-hover:text-[#0F4C5C]">
                      Sign in with Google Account
                    </span>
                  </>
                )}
              </button>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-500 space-y-1.5 font-mono">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Approved Admin Inboxes</span>
                </div>
                <ul className="text-[11px] text-slate-500 list-disc list-inside space-y-0.5 font-mono">
                  <li>satpuda.sanskriti.shodh.sansthan@gmail.com</li>
                  <li>industriesgapp@gmail.com</li>
                </ul>
              </div>
            </div>
          )}

          {/* Plant & Statutory Footer Reference */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>GST: {companyData.gst}</span>
            <span>LLPIN: {companyData.llpin}</span>
          </div>

        </div>
      </div>

    </div>
  );
};

