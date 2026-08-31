import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck, 
  ExternalLink, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  Download,
  Lock
} from 'lucide-react';
import { companyData } from '../../data/companyData';
import { BrandLogo } from '../common/BrandLogo';
import { useCMS } from '../../context/CMSContext';

interface FooterProps {
  onOpenQuoteModal: () => void;
  onOpenBrochureModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const { settings } = useCMS();
  const currentYear = new Date().getFullYear();

  const phone1 = settings.phones?.[0] || '+91 9806419199';
  const phone2 = settings.phones?.[1] || '+91 9981280902';
  const email = settings.email || companyData.email;
  const gst = settings.gst || companyData.gst;
  const llpin = settings.llpin || companyData.llpin;
  const pan = settings.pan || 'AAVFG6804D';
  const factoryFull = settings.factoryAddress?.full || companyData.factoryAddress.full;
  const officeFull = settings.officeAddress?.full || companyData.officeAddress.full;
  const mapsQuery = settings.factoryAddress?.googleMapsQuery || companyData.factoryAddress.googleMapsQuery;

  return (
    <footer className="bg-[#0A2540] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Industrial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Col 1: Brand & Compliance Credentials */}
          <div className="space-y-4">
            <Link to="/" className="inline-block" title="GAPP Packaging - Homepage">
              <BrandLogo theme="dark" className="h-14 w-auto max-w-[220px]" alt={`${settings.companyName || 'GAPP Packaging'} - ${settings.tagline || 'Focus On Quality'}`} />
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed">
              {settings.shortDescription || 'Industrial B2B manufacturer of high-strength corrugated boxes, 3-ply, 5-ply, 7-ply master cartons, and precision die-cut packaging in Mandideep Industrial Area, MP.'}
            </p>

            {/* Statutory Corporate Details Box */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-lg text-xs space-y-2 font-mono">
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-[#008CE8] font-semibold">GSTIN:</span>
                <span className="font-bold text-white tracking-wider">{gst}</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-[#008CE8] font-semibold">LLPIN:</span>
                <span className="font-bold text-white tracking-wider">{llpin}</span>
              </div>
              {pan && (
                <div className="flex justify-between items-center text-slate-200">
                  <span className="text-[#008CE8] font-semibold">PAN:</span>
                  <span className="font-bold text-white tracking-wider">{pan}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-slate-200">
                <span className="text-slate-400">Industry:</span>
                <span className="text-slate-200 text-[11px]">{settings.industry || 'Corrugated Packaging'}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenBrochureModal}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D97706] hover:text-amber-300 py-1 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Technical Product Specifications</span>
              </button>

              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white py-1 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Admin Inquiries CMS (Firebase)</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Manufacturing Solutions & Products */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-teal-500/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D97706] rounded-full"></span>
              <span>Quick Navigation</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>About Mandideep Plant</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D97706] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>3-Ply, 5-Ply & 7-Ply Boxes</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D97706] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Industries Served</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D97706] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/infrastructure" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>12 Machinery Lines</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D97706] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/plant-tour" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>8-Stage Plant Tour</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D97706] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/quality" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Quality & Testing Lab</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D97706] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Box Configurator & Estimator</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D97706] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/clients" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Industrial Clients</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D97706] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Procurement FAQs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D97706] transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing Facility & Plant Address */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-teal-500/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D97706] rounded-full"></span>
              <span>Factory & Plant</span>
            </h3>
            
            <div className="bg-[#0F4C5C]/20 border border-teal-500/10 p-3.5 rounded-lg space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-xs mb-0.5">Manufacturing Plant:</div>
                  <p className="leading-relaxed text-slate-300">
                    {factoryFull}
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-teal-500/20">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#D97706] hover:text-amber-300 font-semibold"
                >
                  <span>Open Plant in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Production Shift Hours:</span>
                <p>{settings.workingHours || '24x7 Continuous Operations | Office: 09:00 AM - 07:30 PM'}</p>
              </div>
            </div>
          </div>

          {/* Col 4: Corporate Office & Direct Sales Desk */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-teal-500/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D97706] rounded-full"></span>
              <span>Corporate Office & Inquiries</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-xs mb-0.5">Registered Office:</div>
                  <p className="leading-relaxed">
                    {officeFull}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D97706] shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a href={`tel:${phone1}`} className="text-white hover:text-[#D97706] font-semibold">
                    {phone1}
                  </a>
                  <a href={`tel:${phone2}`} className="text-white hover:text-[#D97706] font-semibold">
                    {phone2}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D97706] shrink-0" />
                <a href={`mailto:${email}`} className="text-white hover:text-[#D97706] font-medium break-all">
                  {email}
                </a>
              </div>
            </div>

            <button
              onClick={onOpenQuoteModal}
              className="w-full bg-[#D97706] hover:bg-[#B45309] text-white py-2.5 px-4 rounded-md font-bold text-xs shadow transition-colors cursor-pointer text-center uppercase tracking-wider"
            >
              Request Custom RFQ Proposal
            </button>
          </div>

        </div>

        {/* Bottom Strip: Quality Certs & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
              <span>IS & ASTM Standards Testing</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
              <span>100% Recyclable Kraft Paper</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Zero Defect Stacking Warranty</span>
            </span>
          </div>

          <div className="text-center md:text-right font-mono text-[11px] text-slate-400">
            © {currentYear} {settings.companyName || 'GAPP Packaging LLP'}. All Rights Reserved. • {settings.unitLocation || 'Mandideep, MP'}
          </div>
        </div>

      </div>
    </footer>
  );
};
