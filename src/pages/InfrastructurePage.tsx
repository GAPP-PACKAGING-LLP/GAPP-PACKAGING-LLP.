import React, { useState } from 'react';
import { MachinerySection } from '../components/home/MachinerySection';
import { VirtualPlantTour } from '../components/home/VirtualPlantTour';
import { Link } from 'react-router-dom';
import { Factory, Wrench, ShieldCheck, Zap, Send, ArrowRight, Layers, CheckCircle2, Eye } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface InfrastructurePageProps {
  onOpenQuoteModal: () => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onOpenQuoteModal }) => {
  const { settings } = useCMS();
  const [activeTab, setActiveTab] = useState<'machinery' | 'tour'>('machinery');

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner */}
        <div className="bg-[#0A3642] text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded border border-[#D97706]/30">
            Plant & Machinery Infrastructure
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            12 Precision Converting Machinery Lines & Plant Operations
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Operating in Mandideep with automated fingerless corrugators, ceramic anilox flexo printers, 4-bar rotary slitter scorers, heavy-duty wire stitchers, and an 8-stage quality-governed production cycle.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Request Factory Quotation</span>
            </button>
            <button
              onClick={() => setActiveTab(activeTab === 'machinery' ? 'tour' : 'machinery')}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              {activeTab === 'machinery' ? (
                <>
                  <Eye className="w-4 h-4 text-[#D97706]" />
                  <span>Switch to 8-Stage Plant Tour View</span>
                </>
              ) : (
                <>
                  <Wrench className="w-4 h-4 text-[#D97706]" />
                  <span>Switch to Machinery Fleet Specs</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('machinery')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'machinery'
                ? 'bg-[#0F4C5C] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Installed Machinery (12 Lines)</span>
          </button>
          <button
            onClick={() => setActiveTab('tour')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'tour'
                ? 'bg-[#0F4C5C] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>8-Stage Virtual Plant Tour</span>
          </button>
        </div>

        {/* Dynamic Section based on tab */}
        {activeTab === 'machinery' ? (
          <div className="space-y-12">
            <MachinerySection />
            
            {/* Embedded Teaser for Plant Tour below */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-[#0F4C5C] text-xs font-bold uppercase tracking-wider">
                  <Factory className="w-3.5 h-3.5" />
                  <span>Process Transparency</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Want to see the step-by-step production flow?</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Follow our 8-stage manufacturing checkpoints from Kraft paper reel yard to final dispatched lot.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('tour')}
                className="bg-[#0F4C5C] hover:bg-[#0A3642] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <span>View 8-Stage Plant Tour</span>
                <ArrowRight className="w-4 h-4 text-[#D97706]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <VirtualPlantTour />

            {/* Switch back to machinery button */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-[#0F4C5C] text-xs font-bold uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Equipment Registry</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Review Individual Machine Specifications</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Inspect technical details of our 52" corrugators, 2-color flexo printer, rotary slitters, and heavy platen die-cutters.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('machinery')}
                className="bg-[#0F4C5C] hover:bg-[#0A3642] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <span>View Machinery Fleet Specs</span>
                <ArrowRight className="w-4 h-4 text-[#D97706]" />
              </button>
            </div>
          </div>
        )}

        {/* Cross-Link Card to Testing Lab */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#008CE8] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">In-House Quality Testing Laboratory</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Explore our digital Bursting Strength testers, Cobb water absorption apparatus, GSM balances, and batch COA certification issued with every delivery lot.
            </p>
          </div>
          <Link
            to="/quality"
            className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider bg-[#0F4C5C] text-white px-6 py-3 rounded-lg hover:bg-[#0A3642] transition-colors shrink-0"
          >
            <span>View Testing Lab</span>
            <ArrowRight className="w-4 h-4 text-[#D97706]" />
          </Link>
        </div>

      </div>
    </div>
  );
};
