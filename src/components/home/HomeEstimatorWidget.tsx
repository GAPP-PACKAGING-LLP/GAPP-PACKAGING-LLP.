import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  ArrowRight, 
  Send, 
  Sliders, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  ShieldCheck,
  Scale
} from 'lucide-react';

interface HomeEstimatorWidgetProps {
  onOpenQuoteWithSpec: (boxType: string, dimensions: { length: string; width: string; height: string; unit: 'mm' | 'inches' }) => void;
}

export const HomeEstimatorWidget: React.FC<HomeEstimatorWidgetProps> = ({ onOpenQuoteWithSpec }) => {
  const [selectedPly, setSelectedPly] = useState<'3-ply' | '5-ply' | '7-ply'>('5-ply');
  const [length, setLength] = useState<string>('400');
  const [width, setWidth] = useState<string>('300');
  const [height, setHeight] = useState<string>('250');
  const [unit, setUnit] = useState<'mm' | 'inches'>('mm');

  const plyDetails = {
    '3-ply': {
      title: '3-Ply Single Wall',
      flutes: 'B / C / E Flute',
      idealLoad: 'Up to 15 kg',
      recommendation: 'Ideal for pharma bottles, confectionery, e-commerce, and lightweight dispatch.'
    },
    '5-ply': {
      title: '5-Ply Double Wall',
      flutes: 'BC / BB Flute',
      idealLoad: '15 to 45 kg',
      recommendation: 'Recommended for FMCG master cartons, automotive spares, food processing, and bulk shipping.'
    },
    '7-ply': {
      title: '7-Ply Triple Wall',
      flutes: 'Heavy Duty Triple',
      idealLoad: '40 to 120+ kg',
      recommendation: 'Engineered for heavy engineering tools, auto components, export freight, and machinery.'
    }
  };

  const handleInstantQuote = () => {
    onOpenQuoteWithSpec(
      plyDetails[selectedPly].title,
      { length, width, height, unit }
    );
  };

  return (
    <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#008CE8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-brand-accent text-xs font-bold uppercase tracking-wider border border-teal-500/30">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Box Specifier</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
              Quick Corrugated Box Specification & RFQ
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Select your structural requirements, test rough dimensions, and submit for an instant technical and commercial quotation directly from our Mandideep plant engineers.
            </p>
          </div>

          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-amber-400 group shrink-0"
          >
            <span>Open Advanced 4-Stage Configurator</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Box Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Controls (7 cols) */}
          <div className="lg:col-span-7 bg-slate-800/80 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border border-slate-700 space-y-6">
            
            {/* 1. Select Ply Level */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Select Corrugated Layer Structure:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['3-ply', '5-ply', '7-ply'] as const).map((ply) => (
                  <button
                    key={ply}
                    type="button"
                    onClick={() => setSelectedPly(ply)}
                    className={`py-3 px-4 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      selectedPly === ply
                        ? 'bg-brand-primary text-white border-[#008CE8] ring-2 ring-[#008CE8]/30 shadow-md'
                        : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="text-sm sm:text-base">{ply.toUpperCase()}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{plyDetails[ply].flutes}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Dimensions Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Outer / Inner Dimensions:
                </label>
                <div className="flex items-center bg-slate-700 rounded-lg p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setUnit('mm')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      unit === 'mm' ? 'bg-[#008CE8] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    mm
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('inches')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      unit === 'inches' ? 'bg-[#008CE8] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Inches
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1 font-mono">Length ({unit})</span>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-[#008CE8] focus:ring-1 focus:ring-[#008CE8] outline-hidden"
                    placeholder="L"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1 font-mono">Width ({unit})</span>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-[#008CE8] focus:ring-1 focus:ring-[#008CE8] outline-hidden"
                    placeholder="W"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1 font-mono">Height ({unit})</span>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-[#008CE8] focus:ring-1 focus:ring-[#008CE8] outline-hidden"
                    placeholder="H"
                  />
                </div>
              </div>
            </div>

            {/* Quick action button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleInstantQuote}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Specification for Quote</span>
              </button>

              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white px-5 py-3.5 rounded-xl text-xs font-bold transition-colors"
              >
                <span>Full Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Right Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-linear-to-br from-slate-800 to-slate-850 rounded-2xl p-6 sm:p-8 border border-slate-700 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Configured Spec Summary</span>
                </div>
                <span className="text-[11px] font-mono bg-teal-500/20 text-teal-300 px-2.5 py-0.5 rounded-full font-bold">
                  Lab Calibrated
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  {plyDetails[selectedPly].title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {plyDetails[selectedPly].recommendation}
                </p>
              </div>

              <div className="space-y-2 bg-slate-900/70 p-4 rounded-xl border border-slate-700/80 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-sans text-slate-400">Target Load:</span>
                  <span className="font-bold text-brand-accent">{plyDetails[selectedPly].idealLoad}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-sans text-slate-400">Dimensions:</span>
                  <span className="font-bold text-white">{length || 0} × {width || 0} × {height || 0} {unit}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-sans text-slate-400">Flute Profile:</span>
                  <span className="font-bold text-teal-400">{plyDetails[selectedPly].flutes}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-sans text-slate-400">Quality Certificate:</span>
                  <span className="font-bold text-emerald-400">Included with Lot</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>24-Hour technical quote response guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Custom printing & sample proofs available on request</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleInstantQuote}
                className="w-full text-center text-xs text-slate-300 hover:text-white font-bold underline underline-offset-4 cursor-pointer"
              >
                Send this specification directly to Mandideep Plant →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
