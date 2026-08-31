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
  UserCheck
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
    loginWithSecondaryUser, 
    clearError 
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'passkey' | 'google'>('passkey');
  const [selectedProfileId, setSelectedProfileId] = useState<string>('ashish-barkhade');
  const [passcode, setPasscode] = useState<string>('gapp@2024');
  const [customEmail, setCustomEmail] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
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

  const handleSecondaryUserSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLocalError(null);
    clearError();
    setIsSigningIn(true);
    try {
      const targetIdentifier = isCustomMode ? customEmail : selectedProfileId;
      if (!targetIdentifier) {
        throw new Error('Please select an admin profile or enter your email/username.');
      }
      if (!passcode) {
        throw new Error('Please enter the security passcode or plant passkey.');
      }

      await loginWithSecondaryUser(targetIdentifier, passcode);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Secondary login error:', err);
      setLocalError(
        err?.message || 'Authentication failed. Please verify your profile selection and passkey.'
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleQuickSelectUser = (profileId: string) => {
    setIsCustomMode(false);
    setSelectedProfileId(profileId);
    setPasscode('gapp@2024');
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
                Admin & CMS Management
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Designated Partners & Operations Control Center
              </p>
            </div>
          </div>

          {/* Login Method Switcher Tabs (2nd User / Direct vs Google OAuth) */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab('passkey');
                setLocalError(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === 'passkey'
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#D97706]" />
              <span>2nd User / Direct Login</span>
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

          {/* TAB 1: FAST 2ND USER / PASSKEY LOGIN */}
          {activeTab === 'passkey' && (
            <form onSubmit={handleSecondaryUserSignIn} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select User / Administrator Profile:
                </label>

                {/* Quick Select Profile Cards (Director 1, Director 2, Operations) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {secondaryProfiles.map((p) => {
                    const isSelected = !isCustomMode && selectedProfileId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleQuickSelectUser(p.id)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-teal-50/70 border-[#0F4C5C] ring-1 ring-[#0F4C5C]'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? 'bg-[#0F4C5C] text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {p.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {p.name}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F4C5C] shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 truncate">
                            {p.designation.split('&')[0]}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Email Toggle */}
                <div className="pt-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomMode((prev) => !prev);
                      setLocalError(null);
                    }}
                    className="text-[11px] text-[#0F4C5C] hover:underline font-semibold cursor-pointer"
                  >
                    {isCustomMode ? '← Choose from Preset Directors' : '+ Enter Custom Admin Email / ID'}
                  </button>
                </div>

                {/* Custom Email Input (if enabled) */}
                {isCustomMode && (
                  <div className="pt-1 animate-fadeIn">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Custom Admin Email / Username:
                    </label>
                    <input
                      type="text"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="e.g. pramod.gapp@gmail.com or admin"
                      className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Passcode / Passkey Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Security Passcode / Plant Passkey:
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    Default: <span className="font-semibold text-slate-600">gapp@2024</span>
                  </span>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter security passcode"
                    className="w-full text-xs font-mono p-3 pr-10 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white outline-none transition-all"
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

              {/* Fast Login Submit Button */}
              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full flex items-center justify-center gap-2 bg-[#0F4C5C] hover:bg-[#0A3642] active:scale-[0.99] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSigningIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Instant Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-[#D97706]" />
                    <span>Login to CMS Dashboard (Instant)</span>
                  </>
                )}
              </button>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <KeyRound className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Ultra-Fast 0ms Access</span>
                </div>
                <p className="leading-relaxed text-slate-500">
                  Direct designated partner login bypasses third-party popup latency for immediate plant management access.
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

