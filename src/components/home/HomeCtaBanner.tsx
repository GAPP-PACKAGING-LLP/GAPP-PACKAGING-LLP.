import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, 
  FileDown, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface HomeCtaBannerProps {
  onOpenQuoteModal: () => void;
  onOpenBrochureModal: () => void;
}

export const HomeCtaBanner: React.FC<HomeCtaBannerProps> = ({
  onOpenQuoteModal,
  onOpenBrochureModal
}) => {
  const { settings } = useCMS();

  return (
    <section className="py-16 md:py-20 bg-[#0A3642] text-white relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-[#D97706]">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Factory Supply • Mandideep Plant</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-heading">
              Ready to Upgrade Your Packaging Strength & Supply Reliability?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Get in touch with our packaging engineering team at the Mandideep facility. Whether you require standard master shippers, custom die-cut boxes, or regular high-volume scheduled contracts, we guarantee calibrated quality and zero supply chain disruptions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Test Certificate issued with every lot</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24-Hour quick quote turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Urgent order flexibilities on short notice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Recyclable zero-discharge facility</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="inline-flex items-center justify-center gap-2.5 bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-4 rounded-xl font-extrabold text-sm shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Request Plant RFQ & Quotation</span>
              </button>

              <button
                type="button"
                onClick={onOpenBrochureModal}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-xl font-bold text-sm transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-teal-300" />
                <span>Download Specification Sheet</span>
              </button>
            </div>
          </div>

          {/* Right Direct Contact Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#D97706]" />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-white">
                    Factory Desk & Direct Lines
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                  Open Mon - Sat
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <div className="text-slate-400 font-medium">Designated Partner Contacts:</div>
                  <div className="flex flex-col gap-2 pt-1 font-mono">
                    <a 
                      href="tel:+919806419199" 
                      className="flex items-center gap-2 text-white hover:text-[#D97706] font-bold transition-colors bg-white/5 p-2.5 rounded-lg border border-white/10"
                    >
                      <PhoneCall className="w-4 h-4 text-[#D97706]" />
                      <span>Ashish Barkhade: +91 9806419199</span>
                    </a>
                    <a 
                      href="tel:+919981280902" 
                      className="flex items-center gap-2 text-white hover:text-[#D97706] font-bold transition-colors bg-white/5 p-2.5 rounded-lg border border-white/10"
                    >
                      <PhoneCall className="w-4 h-4 text-[#D97706]" />
                      <span>Pramod Singh: +91 9981280902</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-white/10">
                  <div className="text-slate-400 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Manufacturing Unit Location:</span>
                  </div>
                  <p className="text-slate-300 font-mono text-xs leading-relaxed">
                    {settings.factoryAddress?.full || 'Survey no. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Pipaliya Korka, Madhya Pradesh 464993'}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#0A3642] hover:bg-slate-100 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Open Interactive Map & Factory Details</span>
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
