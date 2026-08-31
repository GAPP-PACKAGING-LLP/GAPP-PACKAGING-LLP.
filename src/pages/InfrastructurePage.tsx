import React from 'react';
import { MachinerySection } from '../components/home/MachinerySection';
import { Link } from 'react-router-dom';
import { Factory, Wrench, ShieldCheck, Zap, Send, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface InfrastructurePageProps {
  onOpenQuoteModal: () => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onOpenQuoteModal }) => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner */}
        <div className="bg-[#0A3642] text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded border border-[#D97706]/30">
            Plant & Machinery Infrastructure
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            12 Precision Converting Machinery Lines
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Operating in Mandideep with automated fingerless corrugators, ceramic anilox flexo printers, 4-bar rotary slitter scorers, and heavy-duty wire stitchers delivering 500+ MT monthly converting capacity.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Request Factory Quotation</span>
            </button>
            <Link
              to="/plant-tour"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <span>Take 8-Stage Virtual Tour</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Machinery Lines Grid Section */}
        <MachinerySection />

        {/* Cross-Link Cards to Plant Tour and Testing Lab */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#0F4C5C] flex items-center justify-center">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Virtual Plant Tour & Manufacturing Flow</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Walk through our 8-stage production process from raw Kraft reel yard inspection to single-facer corrugation, rotary slitting, flexo printing, and dispatch fleet.
              </p>
            </div>
            <Link
              to="/plant-tour"
              className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0F4C5C] hover:text-[#D97706] transition-colors pt-2"
            >
              <span>Experience Interactive Plant Tour</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#008CE8] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">In-House Testing Laboratory</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore our digital Bursting Strength testers, Cobb water absorption apparatus, GSM balances, and batch COA certification process.
              </p>
            </div>
            <Link
              to="/quality"
              className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0F4C5C] hover:text-[#D97706] transition-colors pt-2"
            >
              <span>View Testing Lab & Quality Standards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
