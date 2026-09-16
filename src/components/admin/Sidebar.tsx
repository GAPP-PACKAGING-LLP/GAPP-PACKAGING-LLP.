import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Boxes,
  Cpu,
  Microscope,
  Building2,
  Image as GalleryIcon,
  FileDown,
  MailQuestion,
  Settings,
  Users,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { BrandMark } from '../common/BrandLogo';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/users', label: 'Users & Access Control', icon: ShieldCheck, badgeKey: 'users' },
  { to: '/admin/inquiries', label: 'Inquiries RFQ', icon: MailQuestion, badgeKey: 'inquiries' },
  { to: '/admin/directors', label: 'Directors & Team', icon: Users },
  { to: '/admin/pages', label: 'Pages Content', icon: FileText },
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/machinery', label: 'Machinery', icon: Cpu },
  { to: '/admin/testing-equipment', label: 'Testing Lab', icon: Microscope },
  { to: '/admin/clients', label: 'Client Partners', icon: Building2 },
  { to: '/admin/gallery', label: 'Plant Gallery', icon: GalleryIcon },
  { to: '/admin/brochures', label: 'Brochures & PDF', icon: FileDown },
  { to: '/admin/settings', label: 'Logo & Plant Settings', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const location = useLocation();
  const { adminUser, logout } = useAuth();

  const isLinkActive = (to: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === to;
    }
    return location.pathname.startsWith(to);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#0A2540] text-slate-300 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BrandMark size={32} isDark={true} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-xs tracking-wider">
                <span className="text-[#008CE8]">GAPP</span> CMS
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                PROD
              </span>
            </div>
            <p className="text-[10px] text-cyan-300/80 font-medium">Focus On Quality</p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
          Core Operations
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isLinkActive(item.to, item.exact);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                active
                  ? 'bg-brand-primary text-white font-bold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
            </NavLink>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
          Public Website
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Open Public Site</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Live ↗</span>
        </a>
      </div>

      {/* User Info & Logout Footer */}
      <div className="p-3 border-t border-slate-700/60 bg-[#07192C]">
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {adminUser?.photoURL ? (
              <img
                src={adminUser.photoURL}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border border-slate-600 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs shrink-0 border border-teal-500/40">
                <span>{adminUser?.name?.charAt(0) || 'A'}</span>
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-white truncate">
                  {adminUser?.name || 'Administrator'}
                </p>
              </div>
              <p className="text-[10px] text-teal-300/90 truncate font-medium">
                {adminUser?.designation || (adminUser?.role === 'super_admin' ? 'Super Administrator' : 'Designated Partner')}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            title="Sign Out / Switch User"
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-800 h-screen sticky top-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative w-64 max-w-full bg-[#0A2540] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
