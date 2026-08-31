import React from 'react';
import { ClientsSection } from '../components/home/ClientsSection';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Building2, Send, CheckCircle2, ArrowRight, Truck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ClientsPageProps {
  onOpenQuoteModal: () => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ onOpenQuoteModal }) => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="bg-[#0A3642] text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded border border-[#D97706]/30">
            Trust & Industrial Partnerships
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Trusted Packaging Partner for Central India
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Supplying high-volume corrugated boxes, master shippers, and custom cartons to leading pharmaceuticals, automotive manufacturers, distilleries, and FMCG brands across Mandideep, Bhopal, Indore, and Madhya Pradesh.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Partner With Us / Request Quote</span>
            </button>
            <Link
              to="/about"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <span>About Mandideep Plant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Clients Section Component */}
        <ClientsSection />

        {/* Supply Chain & Dispatch Guarantee */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Supply Chain Reliability Commitments
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Why manufacturing enterprises choose GAPP Packaging LLP for continuous uninterrupted supply contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0F4C5C] flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">24 to 48 Hour JIT Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated fleet logistics delivering to industrial zones in Mandideep, Bhopal, Obedullaganj, Govindpura, Dewas, and Pithampur.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#D97706] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">Buffer Reel Stock Guarantee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We maintain ready stock of virgin Kraft paper reels (120 to 250 GSM) to safeguard corporate clients against market paper shortages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 text-[#008CE8] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">Batch-wise COA Test Reports</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every dispatched consignment includes formal laboratory test certificates confirming Bursting Strength (BS), Cobb, and Grammage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
