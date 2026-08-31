import React from 'react';
import { ProductsSection } from '../components/home/ProductsSection';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, Box, Send, ArrowRight, Calculator, CheckCircle2, Factory } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ProductsPageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenQuoteModal }) => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner */}
        <div className="bg-[#0A3642] text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded border border-[#D97706]/30">
            Products & Technical Specifications
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Industrial Corrugated Packaging Catalog
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Explore our complete range of 3-ply single wall, 5-ply heavy-duty master shippers, 7-ply triple-wall bulk boxes, precision die-cut mailers, and custom partitions engineered at our Mandideep plant.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Get Custom Carton Quotation</span>
            </button>
            <Link
              to="/calculator"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Dimensions & GSM</span>
            </Link>
          </div>
        </div>

        {/* Products Section Grid */}
        <ProductsSection onSelectProductForQuote={(name) => onOpenQuoteModal(name)} />

        {/* Flute Profiles & Technical Selection Guide */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-[#0F4C5C] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Flute Engineering Reference</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Corrugated Flute Profiles & Performance Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select the optimal flute geometry based on compression strength, cushioning, and print quality requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-lg text-[#0F4C5C]">B-Flute</span>
                <span className="text-xs font-mono bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-bold">~3.0 mm</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                High crush resistance, excellent flat surface for crisp flexographic printing. Ideal for canned food, retail mailers, and die-cut boxes.
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                Flutes/Foot: 47–50
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-lg text-[#0F4C5C]">C-Flute</span>
                <span className="text-xs font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold">~4.0 mm</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The universal standard for shipping boxes. Delivers high top-to-bottom compression strength for stacking in shipping containers and warehouses.
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                Flutes/Foot: 39–43
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-lg text-[#0F4C5C]">E-Flute</span>
                <span className="text-xs font-mono bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded font-bold">~1.5 mm</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Micro-flute engineered for superior folding, compact storage, and high-resolution retail packaging for cosmetics, pharma, and small hardware.
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                Flutes/Foot: 90–95
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-lg text-[#0F4C5C]">BC-Flute (5-Ply)</span>
                <span className="text-xs font-mono bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded font-bold">~7.0 mm</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Combination double-wall board marrying B-flute puncture resistance with C-flute vertical compression. For automotive parts & heavy machinery.
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                Dual Wall Profile
              </div>
            </div>
          </div>
        </div>

        {/* Cross Link to Calculator */}
        <div className="bg-[#0F4C5C] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Calculate Custom Box Dimensions & GSM</h3>
            <p className="text-xs sm:text-sm text-teal-100">
              Use our interactive 3D box estimator tool to test length, width, height, and target burst factors.
            </p>
          </div>
          <Link
            to="/calculator"
            className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Open Box Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
