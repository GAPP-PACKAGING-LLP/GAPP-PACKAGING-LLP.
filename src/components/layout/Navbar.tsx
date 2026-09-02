import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  Box,
  Layers,
  Wrench,
  FlaskConical,
  Award,
  Send,
  Lock
} from 'lucide-react';
import { companyData } from '../../data/companyData';
import { BrandLogo, BrandMark } from '../common/BrandLogo';
import { useCMS } from '../../context/CMSContext';

interface NavbarProps {
  onOpenQuoteModal: () => void;
  onOpenBrochureModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const { settings } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const phone1 = settings.phones?.[0] || '+91 9806419199';
  const phone2 = settings.phones?.[1] || '+91 9981280902';
  const email = settings.email || companyData.email;
  const gst = settings.gst || companyData.gst;
  const llpin = settings.llpin || companyData.llpin;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Machinery', path: '/infrastructure' },
    { name: 'Testing Lab', path: '/quality' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Clients', path: '/clients' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full z-50 sticky top-0 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-200 border-b border-slate-200">
      {/* Top Industrial Info Bar (Desktop) */}
      <div className="hidden lg:block bg-[#0A3642] text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-[#134E4A]/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Plant: Mandideep Industrial Area, MP</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-[#D97706]" />
              <a href={`mailto:${email}`} className="hover:text-white transition-colors underline-offset-2 hover:underline">
                {email}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <a href={`tel:${phone1}`} className="hover:text-white font-medium">
                {phone1}
              </a>
              <span className="text-slate-500">|</span>
              <a href={`tel:${phone2}`} className="hover:text-white font-medium">
                {phone2}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-slate-300 bg-white/10 px-2.5 py-0.5 rounded text-[11px] font-mono">
              <span className="text-[#D97706] font-semibold">GSTIN:</span>
              <span>{gst}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300 bg-white/10 px-2.5 py-0.5 rounded text-[11px] font-mono">
              <span className="text-[#D97706] font-semibold">LLPIN:</span>
              <span>{llpin}</span>
            </div>
            <button
              onClick={onOpenBrochureModal}
              className="flex items-center space-x-1 text-[#D97706] hover:text-amber-300 font-semibold cursor-pointer text-[11px] transition-colors"
            >
              <FileText className="w-3 h-3" />
              <span>Spec Sheet</span>
            </button>
            <Link
              to="/admin"
              className="flex items-center space-x-1 text-slate-300 hover:text-white font-semibold text-[11px] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
              title="Admin Inquiries Portal"
            >
              <Lock className="w-3 h-3 text-[#D97706]" />
              <span>CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center group py-1 shrink-0" id="nav-brand-logo" title="GAPP Packaging - Homepage">
            <BrandLogo className="h-11 sm:h-13 w-auto max-w-[190px] sm:max-w-[240px]" alt="GAPP Packaging - Focus On Quality" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`px-2.5 py-1.5 text-xs lg:text-[13px] font-bold rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#0F4C5C] text-white shadow-xs'
                      : 'text-[#334155] hover:text-[#0F4C5C] hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/admin"
              className="text-xs font-bold text-slate-600 hover:text-[#0F4C5C] px-3 py-2 rounded border border-slate-300 hover:border-[#0F4C5C] transition-colors flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5 text-[#0F4C5C]" />
              <span>Admin CMS</span>
            </Link>

            <button
              onClick={onOpenQuoteModal}
              id="header-get-quote-btn"
              className="inline-flex items-center gap-2 bg-[#0F4C5C] hover:bg-[#0A3642] text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#D97706]" />
              <span>Get Instant Quote</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 xl:hidden">
            <button
              onClick={onOpenQuoteModal}
              className="sm:hidden bg-[#0F4C5C] text-white px-3 py-1.5 rounded text-xs font-semibold"
            >
              Quote
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 rounded-md text-[#334155] hover:text-[#0F4C5C] hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`px-3 py-2.5 text-base font-semibold rounded-md flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#0F4C5C] text-white font-bold'
                      : 'text-[#334155] hover:text-[#0F4C5C] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </Link>
              );
            })}
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-semibold text-[#0F4C5C] bg-teal-50 hover:bg-teal-100 rounded-md flex items-center justify-between mt-1"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#D97706]" />
                Admin Inquiries Portal (CMS)
              </span>
              <ChevronRight className="w-4 h-4 text-[#0F4C5C]" />
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0F4C5C] text-white py-3 rounded-md font-bold text-sm shadow-sm"
            >
              <Send className="w-4 h-4 text-[#D97706]" />
              <span>Request Custom Box Quotation</span>
            </button>
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBrochureModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-[#0F4C5C] py-2.5 rounded-md font-semibold text-sm hover:bg-slate-200"
            >
              <FileText className="w-4 h-4 text-[#D97706]" />
              <span>View Technical Spec Brochure</span>
            </button>

            <div className="bg-slate-50 p-3 rounded-md text-xs space-y-1.5 text-slate-600 font-mono">
              <div><span className="font-semibold text-slate-800">GST:</span> {companyData.gst}</div>
              <div><span className="font-semibold text-slate-800">LLPIN:</span> {companyData.llpin}</div>
              <div><span className="font-semibold text-slate-800">Direct Sales:</span> +91 9806419199</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
