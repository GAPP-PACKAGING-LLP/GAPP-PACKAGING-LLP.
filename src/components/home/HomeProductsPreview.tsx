import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Box, 
  Package, 
  Printer, 
  Wrench,
  Send
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface HomeProductsPreviewProps {
  onSelectProductForQuote: (productName: string) => void;
}

export const HomeProductsPreview: React.FC<HomeProductsPreviewProps> = ({ onSelectProductForQuote }) => {
  const { products } = useCMS();

  // Featured 4 core categories for the home showcase
  const featuredOfferings = [
    {
      id: '3-ply',
      name: '3 Ply Single Wall Corrugated Boxes',
      categoryBadge: 'Single Wall (B / C / E Flute)',
      targetLoad: 'Up to 15 kg payload',
      idealFor: 'E-commerce shippers, retail distribution, pharmaceuticals, confectionery, and lightweight transit.',
      keySpecs: ['1 Fluted Medium + 2 Kraft Liners', 'High flute rigidity', 'Custom bursting factor'],
      accentColor: 'from-sky-500/10 to-teal-500/5',
      borderColor: 'border-sky-200 hover:border-sky-500',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: Box
    },
    {
      id: '5-ply',
      name: '5 Ply Double Wall Master Cartons',
      categoryBadge: 'Double Wall (BC / BB Flute)',
      targetLoad: '15 to 45 kg payload',
      idealFor: 'FMCG master cartons, automotive parts, glass bottles, consumer appliances, and heavy warehouse stacking.',
      keySpecs: ['2 Fluted Mediums + 3 Kraft Liners', 'Superior edge crush resistance', 'High stacking load'],
      accentColor: 'from-teal-500/10 to-emerald-500/5',
      borderColor: 'border-teal-200 hover:border-teal-600',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      icon: Layers,
      isPopular: true
    },
    {
      id: '7-ply',
      name: '7 Ply Heavy Duty Triple Wall Containers',
      categoryBadge: 'Triple Wall Heavy-Duty',
      targetLoad: '40 to 120+ kg payload',
      idealFor: 'Machinery components, export bulk shipping, industrial equipment, metal castings, and severe transport.',
      keySpecs: ['3 Fluted Layers + 4 Kraft Liners', 'Extreme puncture resistance', 'Wooden crate alternative'],
      accentColor: 'from-amber-500/10 to-orange-500/5',
      borderColor: 'border-amber-200 hover:border-amber-500',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: Package
    },
    {
      id: 'flexo-printed',
      name: 'Two-Colour Flexo Printed & Die-Cut Boxes',
      categoryBadge: 'Brand & Custom Conversion',
      targetLoad: 'Customized to spec',
      idealFor: 'Retail shelf-ready packaging, custom auto-lock cartons, perforated boxes, and branded enterprise shippers.',
      keySpecs: ['Inline 2-Color Flexo Printing', '140T precision die-cut blanks', 'Eco-friendly water inks'],
      accentColor: 'from-indigo-500/10 to-purple-500/5',
      borderColor: 'border-indigo-200 hover:border-indigo-500',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      icon: Printer
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-brand-primary text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-brand-primary" />
              <span>Engineered Packaging Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Corrugated Boxes Built for Industrial Durability
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Manufactured at our Mandideep plant with high-speed fingerless corrugation, precision rotary slitting, and lot-wise laboratory certification.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary-hover group shrink-0"
          >
            <span>View Full Product Catalog & Specs</span>
            <ArrowRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredOfferings.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border ${item.borderColor} p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 relative group overflow-hidden`}
              >
                {item.isPopular && (
                  <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-xs">
                    Most Demanded
                  </div>
                )}

                <div className="space-y-4">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-6 h-6 text-brand-accent group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div>
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md border mb-2 ${item.badgeColor}`}>
                      {item.categoryBadge}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-brand-primary transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-700 font-mono">
                    <span className="text-slate-500 font-sans block text-[10px] font-bold uppercase tracking-wider">Payload Rating</span>
                    <span className="font-bold text-brand-primary">{item.targetLoad}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.idealFor}
                  </p>

                  {/* Bullet specs */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {item.keySpecs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectProductForQuote(item.name)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold py-2.5 px-3 rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Get Instant Quote</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner to Full Catalog */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
              Need custom box dimensions, partitions, or specialized GSM / BF combinations?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              We engineer packaging to your exact payload, pallet size, and stacking compression requirements.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#0c3c49] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <span>Explore All Specifications</span>
              <ArrowRight className="w-4 h-4 text-brand-accent" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
