import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Lock, 
  ArrowLeft, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Mail, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Fingerprint, 
  Clock, 
  FileText, 
  HelpCircle,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { BrandLogo } from '../components/common/BrandLogo';
import { 
  getLoginRateLimitState, 
  MAX_FAILED_ATTEMPTS, 
  LoginRateLimitState 
} from '../firebase/auth';

export const AdminLogin: React.FC = () => {
  const { 
    user, 
    isAdmin, 
    loading: authLoading, 
    error: authError, 
    loginWithGoogle, 
    loginWithCredentials, 
    clearError 
  } = useAuth();

  // Form states
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Rate limiting & security states
  const [rateLimit, setRateLimit] = useState<LoginRateLimitState>(getLoginRateLimitState());
  const [lockoutCountdown, setLockoutCountdown] = useState<number>(0);

  // Loading states
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState<boolean>(false);
  const [isCredentialsSigningIn, setIsCredentialsSigningIn] = useState<boolean>(false);

  // Local feedback
  const [localError, setLocalError] = useState<string | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin';

  // Redirect authorized users to dashboard immediately
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate(from, { replace: true });
    }
  }, [user, isAdmin, authLoading, navigate, from]);

  // Rate Limiting Countdown Timer (live 1-second interval when locked)
  useEffect(() => {
    const currentState = getLoginRateLimitState();
    setRateLimit(currentState);

    if (currentState.isLocked) {
      setLockoutCountdown(currentState.lockoutRemainingSeconds);

      const timer = setInterval(() => {
        const updated = getLoginRateLimitState();
        setRateLimit(updated);

        if (!updated.isLocked) {
          setLockoutCountdown(0);
          clearInterval(timer);
        } else {
          setLockoutCountdown(updated.lockoutRemainingSeconds);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [localError]);

  // Format seconds into MM:SS
  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    if (rateLimit.isLocked) {
      setLocalError(`Portal is locked due to multiple failed attempts. Please wait ${formatCountdown(lockoutCountdown)}.`);
      return;
    }

    setLocalError(null);
    setLocalSuccess(null);
    clearError();
    setIsGoogleSigningIn(true);

    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setLocalError(err?.message || 'Google sign-in failed. Please ensure your Google account is an authorized company administrator.');
    } finally {
      setIsGoogleSigningIn(false);
      setRateLimit(getLoginRateLimitState());
    }
  };

  // User ID / Email & Password Form Submit
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit lock
    const currentLimit = getLoginRateLimitState();
    if (currentLimit.isLocked) {
      setLocalError(`Security lockout is active. Too many failed attempts. Try again in ${formatCountdown(currentLimit.lockoutRemainingSeconds)}.`);
      return;
    }

    setLocalError(null);
    setLocalSuccess(null);
    clearError();
    
    const cleanId = identifier.trim();
    const cleanPass = password.trim();

    if (!cleanId) {
      setLocalError('Please enter your authorized User ID or official Email address.');
      return;
    }
    if (!cleanPass) {
      setLocalError('Please enter your account password.');
      return;
    }

    setIsCredentialsSigningIn(true);
    try {
      await loginWithCredentials(cleanId, cleanPass);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Credentials login error:', err);
      const updatedLimit = getLoginRateLimitState();
      setRateLimit(updatedLimit);
      
      // Auto-clear password on failed attempt for security
      setPassword('');

      setLocalError(
        err?.message || 'Invalid User ID / Email or Password. Please verify your credentials and try again.'
      );
    } finally {
      setIsCredentialsSigningIn(false);
    }
  };

  const isAnyLoading = isGoogleSigningIn || isCredentialsSigningIn || authLoading;
  const displayError = localError || authError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#0F4C5C] selection:text-white">
      
      {/* Back to Website link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0F4C5C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to GAPP Packaging Portal</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-9 rounded-2xl border border-slate-200 shadow-xl space-y-6">
          
          {/* Header Brand */}
          <div className="text-center space-y-3">
            <div className="flex justify-center pb-1">
              <BrandLogo theme="light" className="h-11 w-auto max-w-[200px]" alt="GAPP Packaging LLP" />
            </div>
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F4C5C]/10 text-[#0F4C5C] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F4C5C]" />
                <span>Enterprise CMS Portal</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Administrator Sign In
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Restricted portal for Directors, Designated Partners &amp; Super Admins.
              </p>
            </div>
          </div>

          {/* Rate Limit Lockout Banner */}
          {rateLimit.isLocked && (
            <div className="rounded-xl p-4 bg-rose-50 border border-rose-200 text-rose-900 space-y-2 animate-fadeIn" role="alert">
              <div className="flex items-center gap-2 font-bold text-xs">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Security Lockout Active</span>
              </div>
              <p className="text-xs leading-relaxed text-rose-800">
                5 consecutive failed login attempts detected. To safeguard system security against brute-force attacks, login is temporarily locked.
              </p>
              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-rose-200 text-xs font-semibold text-rose-700">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                  Time remaining:
                </span>
                <span className="font-mono font-bold text-sm tracking-widest text-rose-800">
                  {formatCountdown(lockoutCountdown)}
                </span>
              </div>
            </div>
          )}

          {/* Failed Attempts Warning (when 1 to 4 failed attempts occur) */}
          {!rateLimit.isLocked && rateLimit.failedAttempts > 0 && (
            <div className="rounded-xl p-3 bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold">
                  Security Warning: Failed attempt {rateLimit.failedAttempts} of {MAX_FAILED_ATTEMPTS}
                </p>
                <p className="text-[11px] text-amber-800 leading-snug">
                  {rateLimit.remainingAttempts} attempt{rateLimit.remainingAttempts !== 1 ? 's' : ''} remaining. Exceeding {MAX_FAILED_ATTEMPTS} attempts will lock this portal for 15 minutes.
                </p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {displayError && !rateLimit.isLocked && (
            <div 
              className={`rounded-xl p-3.5 text-xs space-y-1.5 animate-fadeIn border ${
                displayError.includes('closed before completing') || displayError.includes('cancelled')
                  ? 'bg-amber-50/90 border-amber-200 text-amber-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`} 
              role="alert"
            >
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className={`w-4 h-4 shrink-0 ${
                  displayError.includes('closed before completing') || displayError.includes('cancelled')
                    ? 'text-amber-600'
                    : 'text-red-600'
                }`} />
                <span>Authentication Notice</span>
              </div>
              <p className="leading-relaxed font-medium whitespace-pre-line text-[11px]">
                {displayError}
              </p>
            </div>
          )}

          {/* Success Banner */}
          {localSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{localSuccess}</span>
            </div>
          )}

          {/* Google Workspace Direct Sign-In */}
          <div className="space-y-2.5">
            <button
              type="button"
              id="admin-google-signin-btn"
              onClick={handleGoogleSignIn}
              disabled={isAnyLoading || rateLimit.isLocked}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border-2 border-slate-200 hover:border-slate-300 py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs hover:shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleSigningIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#0F4C5C]" />
                  <span>Connecting to Google Workspace...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Authorized Google Account</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Direct Single Sign-On (SSO) for pre-approved corporate Google accounts
            </p>
          </div>

          {/* Secure Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                or sign in with user credentials
              </span>
            </div>
          </div>

          {/* Secure Credentials Form */}
          <form onSubmit={handleCredentialsSubmit} className="space-y-4" noValidate>
            
            {/* User ID or Email */}
            <div className="space-y-1.5">
              <label htmlFor="admin-identifier" className="block text-xs font-bold text-slate-700">
                User ID / Official Email (यूजर आईडी या ईमेल)
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-400 pointer-events-none">
                  <Fingerprint className="w-4 h-4 text-[#0F4C5C]" />
                </div>
                <input
                  id="admin-identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. ashish_barkhade or director@gapppackaging.com"
                  className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-800 disabled:opacity-50 disabled:bg-slate-100 font-medium"
                  autoComplete="username"
                  disabled={isAnyLoading || rateLimit.isLocked}
                />
              </div>
              <p className="text-[10px] text-slate-400">
                Enter your unique User ID (as assigned in Users CMS) or official email address.
              </p>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="admin-password" className="block text-xs font-bold text-slate-700">
                  Password / Passkey (पासवर्ड)
                </label>
                <span className="text-[10px] text-slate-400 font-medium">
                  Confidential
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your confidential account password"
                  className="w-full text-xs pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-800 disabled:opacity-50 disabled:bg-slate-100 font-medium"
                  autoComplete="current-password"
                  disabled={isAnyLoading || rateLimit.isLocked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer rounded hover:bg-slate-100 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={rateLimit.isLocked}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="admin-credentials-signin-btn"
              disabled={isAnyLoading || rateLimit.isLocked}
              className="w-full flex items-center justify-center gap-2 bg-[#0F4C5C] hover:bg-[#0A3642] active:bg-[#07242c] text-white py-2.5 px-4 rounded-lg font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCredentialsSigningIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials &amp; Security Shield...</span>
                </>
              ) : rateLimit.isLocked ? (
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Portal Locked ({formatCountdown(lockoutCountdown)})</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Authenticate &amp; Access CMS</span>
                </span>
              )}
            </button>
          </form>

          {/* Enterprise Security Shield Info */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-[#0F4C5C]" />
              <span>Portal Security Enforcement:</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600">
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>256-Bit TLS Channel</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Anti-Brute Force Shield</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Audit Trail Logging</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Statutory Super Admin Control</span>
              </div>
            </div>
          </div>

          {/* Footer Assistance */}
          <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              Need account assistance or password reset? Contact Corporate IT &amp; Statutory Super Admin: <span className="font-semibold text-slate-700 font-mono text-[10px]">satpuda.sanskriti.shodh.sansthan@gmail.com</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
