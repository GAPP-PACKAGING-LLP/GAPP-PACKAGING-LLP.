import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, RefreshCw, Lock, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, adminUser, loading, error, isAdmin, logout } = useAuth();
  const location = useLocation();

  // 1. Loading state while verifying auth & Firestore role
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-sm w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center mx-auto border border-teal-100">
            <RefreshCw className="w-6 h-6 animate-spin text-[#0F4C5C]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-base">Verifying Admin Access</h3>
            <p className="text-xs text-slate-500 font-mono">
              Checking security privileges & Firestore permissions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Explicit Access Denied / Unauthorized state
  if (error || (user && !isAdmin)) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-red-200 shadow-md max-w-md w-full text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Access Denied</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {error || 'Your account does not have authorization to view the GAPP Packaging Admin CMS. Only verified super administrators are permitted.'}
            </p>
            {user?.email && (
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 break-all">
                Attempted: <span className="font-semibold text-red-600">{user.email}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={async () => {
                await logout();
              }}
              className="inline-flex items-center justify-center gap-1.5 bg-[#0F4C5C] hover:bg-[#0A3642] text-white px-4 py-2 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch Google Account</span>
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Site</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Not logged in -> Redirect to /admin/login
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 4. Authorized -> Render children
  return <>{children}</>;
};
