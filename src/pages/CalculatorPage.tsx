import React from 'react';
import { BoxCalculator } from '../components/home/BoxCalculator';
import { Link } from 'react-router-dom';
import { Calculator, Send, FileText, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface CalculatorPageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="bg-[#0A3642] text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded border border-[#D97706]/30">
            Interactive Engineering Tool
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Corrugated Box Dimension & RFQ Estimator
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Configure custom box dimensions (L × W × H in mm or inches), select 3-ply, 5-ply, or 7-ply constructions, preview 3D/2D structural deckle folding, and submit instant quotation requests directly to our Mandideep sales desk.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBrochureModal}
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download Technical Spec Sheet</span>
            </button>
            <Link
              to="/products"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <span>Explore Products & Flutes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Interactive Box Configurator */}
        <BoxCalculator 
          onOpenQuoteWithSpec={(spec) => onOpenQuoteModal(spec.boxType, spec.dimensions)} 
        />

        {/* Engineering Guidelines */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Corrugation Measurement & Calculation Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Important dimensional conventions to ensure perfect product fit and zero crushing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0F4C5C] text-sm">1. Internal Dimensions (OD vs ID)</h3>
              <p className="leading-relaxed text-slate-600">
                Always specify **Inside Dimensions (L × W × H)**. Corrugated board thickness (3mm for 3-ply, 6-7mm for 5-ply, 10-12mm for 7-ply) reduces interior volume if calculated using outer dimensions.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0F4C5C] text-sm">2. Deckle & Flute Direction</h3>
              <p className="leading-relaxed text-slate-600">
                Flutes always run vertically along the height (H) dimension to deliver maximum top-to-bottom Box Compression Test (BCT) strength during warehouse stacking.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0F4C5C] text-sm">3. GSM & Paper Combination</h3>
              <p className="leading-relaxed text-slate-600">
                Higher GSM virgin Kraft liners (180–230 GSM) improve Bursting Factor (BF) and water resistance (Cobb values), critical for cold storage and long-distance transport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
