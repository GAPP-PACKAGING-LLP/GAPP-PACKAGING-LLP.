import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ToastProvider } from './common/Toast';

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F4F6F8] flex text-slate-800 antialiased font-sans">
        {/* Left Responsive Sidebar */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Main Panel */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <Topbar onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};
