import React from 'react';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowRight, Phone, Send, CheckCircle2, Factory } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface IndustriesPageProps {
  onOpenQuoteModal: (industryTitle?: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onOpenQuoteModal }) => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="bg-[#0A3642] text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded border border-[#D97706]/30">
            Industrial Sectors & Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Tailored Packaging for India's Core Industries
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            From pharma cleanroom cartons with zero moisture transfer to 7-ply heavy transport containers for automotive gears and food-grade confectionery shippers, GAPP Packaging engineers domain-specific packaging.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Get Sector-Specific Quote</span>
            </button>
            <Link
              to="/calculator"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <span>Calculate Box Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Core Industries Showcase */}
        <IndustriesSection onSelectIndustryForQuote={(title) => onOpenQuoteModal(title)} />

        {/* Technical Packaging Matrix */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Sector Compliance & QA Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              How our Mandideep plant maintains rigorous industry-specific quality and statutory certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0F4C5C] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-slate-900">Pharma & Healthcare Grade</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cleanroom batching, starch-free odorous binders prevention, Cobb test water absorption &lt; 7%, and precision die-cut partitions for vial protection.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Certified for glass ampoules & syrup bottles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>High-contrast two-colour batch coding</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#D97706] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-slate-900">Automotive & Engineering Heavy Cartons</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                5-Ply & 7-Ply triple-wall fiberboard with high bursting strength (up to 35+ BF) engineered to withstand heavy casting and machined metal parts.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Puncture resistant with angular zinc wire stitching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Pallet stackability up to 6 tiers high</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 text-[#008CE8] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-slate-900">Food, FMCG & Distilleries</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% recyclable, food-grade adhesive bonded master cartons for high-speed automated bottling and conveyor case tapers.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#008CE8] shrink-0" />
                  <span>Zero chemical smell, 100% virgin contact liner</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#008CE8] shrink-0" />
                  <span>High-speed case-packer compatibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-linear-to-r from-[#0F4C5C] to-[#0A2540] rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold">Need Custom Packaging for Your Industry?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our packaging engineers in Mandideep will analyze your product dimensions, drop-test requirements, and pallet loads.
            </p>
          </div>
          <button
            onClick={() => onOpenQuoteModal()}
            className="bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-lg cursor-pointer flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Consult an Engineer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
