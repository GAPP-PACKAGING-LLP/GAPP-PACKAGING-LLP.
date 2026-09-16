import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, ArrowLeft, AlertCircle, RefreshCw, Eye, EyeOff, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { BrandLogo } from '../components/common/BrandLogo';

export const AdminLogin: React.FC = () => {
  const { user, isAdmin, loading, error, loginWithCredentials, clearError } = useAuth();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin';

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate(from, { replace: true });
    }
  }, [user, isAdmin, loading, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();
    
    const targetEmail = email.trim();
    if (!targetEmail) {
      setLocalError('Please enter your email.');
      return;
    }
    if (!password.trim()) {
      setLocalError('Please enter your password.');
      return;
    }

    setIsSigningIn(true);
    try {
      await loginWithCredentials(targetEmail, password.trim());
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password') {
        setLocalError('Invalid email or password.');
      } else {
        setLocalError('Unable to sign in. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#0F4C5C] selection:text-white">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0F4C5C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Website</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-xl space-y-8">
          
          <div className="text-center space-y-4">
            <div className="flex justify-center pb-2">
              <BrandLogo theme="light" className="h-14 w-auto max-w-[200px]" alt="GAPP Packaging LLP" />
            </div>
            
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Admin Login
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Sign in to manage your packaging website.
              </p>
            </div>
          </div>

          {displayError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 space-y-2 animate-fadeIn" role="alert">
              <div className="flex items-center gap-2 font-bold text-red-800">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>Error</span>
              </div>
              <p className="leading-relaxed text-red-600 font-medium">
                {displayError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full text-sm pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-sm pl-11 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 cursor-pointer rounded-md hover:bg-slate-100 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full flex items-center justify-center gap-2 bg-[#0F4C5C] hover:bg-[#0A3642] active:bg-[#07242c] text-white py-3.5 px-4 rounded-lg font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSigningIn ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

