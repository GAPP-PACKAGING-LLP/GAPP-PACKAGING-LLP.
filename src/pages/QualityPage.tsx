import React from 'react';
import { QualityPolicySection } from '../components/home/QualityPolicySection';
import { TestingLabSection } from '../components/home/TestingLabSection';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, FileCheck, Send, ArrowRight, CheckCircle2, Wrench } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface QualityPageProps {
  onOpenQuoteModal: () => void;
  onOpenBrochureModal: () => void;
}

export const QualityPage: React.FC<QualityPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner */}
        <div className="bg-brand-primary-hover text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-3 py-1 rounded border border-brand-accent/30">
            Quality Assurance & Testing Standards
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Certified Testing & Zero-Defect Quality Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Every corrugated box batch produced at our Mandideep facility is verified against Bureau of Indian Standards (IS 2771 / IS 7028) and ASTM guidelines for bursting strength, compressive load, and moisture resistance.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBrochureModal}
              className="bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Download Lab Test Matrix Brochure</span>
            </button>
            <button
              onClick={onOpenQuoteModal}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Request Batch COA Sample</span>
            </button>
          </div>
        </div>

        {/* Testing Lab Equipment Section */}
        <TestingLabSection />

        {/* Quality Process & Assurance Section */}
        <QualityPolicySection />

        {/* Cross-Link Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Want to test box dimensions before ordering?</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Use our interactive box configurator to calculate volume, board area, and bursting factors.
            </p>
          </div>
          <Link
            to="/calculator"
            className="bg-brand-primary hover:bg-[#0c3c49] text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Launch Box Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
