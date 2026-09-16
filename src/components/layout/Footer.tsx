import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Brand & Address */}
          <div className="space-y-4">
            <Link to="/" className="inline-block" title="GAPP Packaging - Homepage">
              <BrandLogo theme="dark" className="h-14 w-auto max-w-[220px]" alt="GAPP Packaging" />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              Industrial B2B manufacturer of high-strength corrugated boxes in Mandideep, serving Madhya Pradesh.
            </p>
            <div className="flex items-start gap-2.5 text-xs text-slate-300 pt-2">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {companyData.factoryAddress.full}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-teal-500/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/calculator" className="hover:text-white transition-colors">Packaging Calculator</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-teal-500/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
              <span>Contact Us</span>
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919806419199" className="hover:text-white transition-colors">+91 9806419199</a>
                  <a href="tel:+919981280902" className="hover:text-white transition-colors">+91 9981280902</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <a href="mailto:industriesgapp@gmail.com" className="hover:text-white transition-colors">industriesgapp@gmail.com</a>
              </div>
              <button
                onClick={onOpenQuoteModal}
                className="mt-4 w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-2.5 px-4 rounded-md font-bold text-xs shadow transition-colors cursor-pointer text-center uppercase tracking-wider"
              >
                Request a Quote
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} GAPP Packaging LLP. All Rights Reserved. • Mandideep, MP
          </div>
          <div className="text-slate-500 font-semibold tracking-wide">
            Developed by Rajesh Barange Pawar
          </div>
        </div>

      </div>
    </footer>
  );
};
