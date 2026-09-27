import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';
import { companyData } from '../../data/companyData';
import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  onOpenQuoteModal: () => void;
  onOpenBrochureModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2540] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex flex-col gap-3" title="GAPP Packaging LLP - Homepage">
              <BrandLogo variant="icon" theme="dark" className="h-12 w-auto self-start" alt="GAPP Packaging LLP logo" />
              <span className="font-extrabold text-xl tracking-tight leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <span className="text-[#008CE8]">GAPP</span> <span className="text-white">PACKAGING</span> <span className="text-[#008CE8]">LLP</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              Industrial B2B manufacturer of high-strength corrugated boxes in Mandideep, serving businesses across Madhya Pradesh.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 lg:pl-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/infrastructure" className="hover:text-white transition-colors">Machinery</Link></li>
              <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link to="/quality" className="hover:text-white transition-colors">Quality</Link></li>
              <li><Link to="/plant-tour" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Products</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/products" className="hover:text-white transition-colors">Corrugated Boxes</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Custom Packaging</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Printed Boxes</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Corrugated Sheets</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919806419199" className="hover:text-white transition-colors">+91 9806419199</a>
                  <a href="tel:+919981280902" className="hover:text-white transition-colors">+91 9981280902</a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <a href="mailto:industriesgapp@gmail.com" className="hover:text-white transition-colors">industriesgapp@gmail.com</a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {companyData.factoryAddress.full}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Legal */}
        <div className="pt-8 flex flex-col items-center justify-center gap-5 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-center sm:text-left">
            <div>
              &copy; {currentYear} GAPP Packaging LLP. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="text-slate-700">•</span>
              <Link to="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
            </div>
          </div>
          <div className="w-full pt-4 border-t border-slate-800/80 flex items-center justify-center text-center">
            <span className="inline-flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-300 font-medium bg-slate-900/80 border border-slate-700/70 px-5 py-2 rounded-full shadow-sm hover:border-[#008CE8]/50 transition-colors">
              <span>Designed and Developed by</span>
              <strong className="text-[#008CE8] font-semibold tracking-wide">
                Rajesh Barange Pawar
              </strong>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
