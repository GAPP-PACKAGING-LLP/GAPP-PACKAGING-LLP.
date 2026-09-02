import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Menu, 
  ExternalLink, 
  Database,
  Radio,
  FileDown
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface TopbarProps {
  onToggleMobileSidebar: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/admin': { title: 'Dashboard Overview', subtitle: 'Real-time inquiries and manufacturing metrics' },
  '/admin/users': { title: 'Users & Access Control', subtitle: 'Super Admin ID & Password management for Directors and Staff' },
  '/admin/directors': { title: 'Directors & Leadership', subtitle: 'Manage company partners, leadership profiles, and credentials' },
  '/admin/inquiries': { title: 'Customer Inquiries RFQ', subtitle: 'Review, manage, and filter customer quotation requests' },
  '/admin/pages': { title: 'Page Content CMS', subtitle: 'Update copy for Home, About, and Contact sections' },
  '/admin/products': { title: 'Packaging Offerings', subtitle: 'Manage corrugated boxes, ply counts, and technical specs' },
  '/admin/machinery': { title: 'Plant Machinery', subtitle: 'Manage corrugators, printing presses, and slotters' },
  '/admin/testing-equipment': { title: 'Testing Laboratory', subtitle: 'Manage quality testing apparatus and ASTM/IS calibration' },
  '/admin/clients': { title: 'Major Client Partners', subtitle: 'Update industrial and corporate client references' },
  '/admin/gallery': { title: 'Plant Photo Gallery', subtitle: 'Upload plant images and facility photos to Firebase Storage' },
  '/admin/brochures': { title: 'Brochures & Catalogs', subtitle: 'Upload and manage technical PDF catalogs in Firebase Storage' },
  '/admin/settings': { title: 'Plant & Corporate Settings', subtitle: 'Configure addresses, GST, LLPIN, and contact channels' }
};

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileSidebar }) => {
  const location = useLocation();
  const { adminUser } = useAuth();

  const currentMeta = pageTitles[location.pathname] || {
    title: 'Admin Operations',
    subtitle: 'GAPP Packaging LLP Management System'
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Page Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight">
              {currentMeta.title}
            </h1>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick actions, Status, Live site */}
        <div className="flex items-center gap-2.5">
          {/* Cloud Database Connected indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-lg text-[11px] font-semibold">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>Firestore Live</span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Site</span>
          </a>

          {/* User mini tag */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-medium text-slate-600 max-w-[120px] sm:max-w-[160px] truncate">
              {adminUser?.name?.split(' ')[0] || 'Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
