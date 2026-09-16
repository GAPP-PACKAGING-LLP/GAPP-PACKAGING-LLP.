import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Send, 
  Layers, 
  CheckCircle, 
  Factory, 
  FileCheck, 
  Sparkles,
  PhoneCall,
  Recycle,
  Clock
} from 'lucide-react';
import { companyData, deliveryGuidelinesData } from '../../data/companyData';
import { BrandMark } from '../common/BrandLogo';

interface HeroSectionProps {
  onOpenQuoteModal: () => void;
  onOpenBrochureModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  return (
    <section 
      id="hero" 
      className="relative bg-gradient-to-b from-[#F4F6F8] via-[#F8F9FA] to-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200 overflow-hidden bg-industrial-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Operational Status Pill */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs text-xs font-semibold text-slate-800">
            <BrandMark size={18} />
            <span className="text-[#008CE8] font-bold">GAPP</span>
            <span className="text-slate-400">•</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-brand-primary">Mandideep Plant Active</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-mono text-slate-700">
            <span className="font-bold text-[#008CE8]">GSTIN:</span>
            <span>{companyData.gst}</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-mono text-slate-700">
            <span className="font-bold text-[#232B39]">LLPIN:</span>
            <span>{companyData.llpin}</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#008CE8] bg-[#008CE8]/10 px-3 py-1 rounded-md border border-[#008CE8]/20">
                  Semi-Automatic Corrugation Unit
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-primary">
                  Focus On Quality
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#232B39] tracking-tight leading-[1.15] font-heading">
                Corrugated Box Manufacturer in Mandideep | GAPP Packaging LLP
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl font-normal">
              <strong className="text-[#008CE8] font-bold">GAPP</strong> <strong className="text-[#232B39] font-black">PACKAGING LLP</strong> was established in 2020 as a high-capacity box making unit. Our facility is situated in <span className="font-semibold text-brand-primary">Mandideep, Madhya Pradesh</span> and is one of the few equipped with high-speed semi-automatic manufacturing lines in the Bhopal industrial corridor.
            </p>

            {/* Trust Bullet List from actual company profile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm text-[#334155]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-primary shrink-0" />
                <span>On-Time Delivery Consistently</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Cater to Urgent Orders on Short Notice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Test Certificate Issued with Every Lot</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Zero-Discharge & 100% Recyclable Unit</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenQuoteModal}
                id="hero-request-quote-btn"
                className="inline-flex items-center justify-center gap-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white px-7 py-3.5 rounded-md font-bold text-sm shadow-md transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4 text-brand-accent" />
                <span>Request a Custom Quote</span>
              </button>

              <Link
                to="/infrastructure"
                id="hero-explore-machinery-btn"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-brand-primary border border-slate-300 px-6 py-3.5 rounded-md font-semibold text-sm shadow-xs transition-colors"
              >
                <Factory className="w-4 h-4 text-brand-accent" />
                <span>Installed Machineries (12 Units)</span>
              </Link>
            </div>

            {/* Quick Contact Line */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#475569]">
              <span className="flex items-center gap-1.5 font-medium">
                <PhoneCall className="w-3.5 h-3.5 text-brand-primary" />
                <span>Ashish Barkhade:</span>
                <a href="tel:+919806419199" className="text-brand-primary font-bold hover:underline">
                  +91 9806419199
                </a>
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1.5 font-medium">
                <span>Pramod Singh:</span>
                <a href="tel:+919981280902" className="text-brand-primary font-bold hover:underline">
                  +91 9981280902
                </a>
              </span>
              <span className="text-slate-300">|</span>
              <button
                onClick={onOpenBrochureModal}
                className="text-brand-primary hover:text-brand-primary-hover font-semibold underline underline-offset-2 cursor-pointer"
              >
                View Company Profile
              </button>
            </div>

          </div>

          {/* Right Visual Industrial Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200/80 p-6 space-y-5 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    GAPP Manufacturing Capabilities
                  </span>
                </div>
                <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                  Zero Plastic
                </span>
              </div>

              {/* Delivery Guidelines Highlight */}
              <div className="bg-brand-primary/5 p-4 rounded-lg border border-brand-primary/15 space-y-2">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Delivery Guidelines</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  "{deliveryGuidelinesData.onTimeCommitment} {deliveryGuidelinesData.urgentOrderFlexibility}"
                </p>
              </div>

              {/* Key Highlights from 9 pages */}
              <div className="space-y-2 font-mono text-xs">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-800 font-sans">Corrugation Technology:</span>
                  <span className="text-[11px] font-bold text-brand-primary">High-speed fingerless corrugation</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-800 font-sans">Printing:</span>
                  <span className="text-[11px] font-bold text-brand-primary">Two colour flexo printing inline</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-800 font-sans">Joint Finishing:</span>
                  <span className="text-[11px] font-bold text-brand-primary">Semi automatic flap pasting & stitching</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-800 font-sans">In-house Lab:</span>
                  <span className="text-[11px] font-bold text-brand-primary">5 Dedicated testing instruments</span>
                </div>
              </div>

              {/* Action Link inside Card */}
              <div className="pt-1">
                <a
                  href="#box-calculator"
                  className="w-full flex items-center justify-between bg-brand-primary/10 hover:bg-brand-primary/15 text-brand-primary px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors"
                >
                  <span>Open Corrugated Box Estimation Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Metric Stats Bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-slate-200">
          {companyData.stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200 shadow-xs">
              <div className="text-xl sm:text-2xl font-extrabold text-brand-primary font-mono">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
