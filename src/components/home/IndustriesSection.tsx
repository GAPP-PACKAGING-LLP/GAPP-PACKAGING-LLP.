import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ShieldPlus, 
  Cog, 
  Package, 
  Layers, 
  Truck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Box
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { industriesData } from '../../data/companyData';

interface IndustriesSectionProps {
  onSelectIndustryForQuote?: (industryTitle: string) => void;
}

// Technical sector enhancements
const industrySpecs: Record<string, { recommendedPly: string; burstFactor: string; moistureLimit: string; loadRating: string }> = {
  retail: {
    recommendedPly: '3-Ply / Single Wall B-Flute',
    burstFactor: '18 - 24 BF High Graphic Liner',
    moistureLimit: '< 8% Cobb Tested',
    loadRating: 'Up to 15 kg Shelf/E-Comm'
  },
  pharmaceuticals: {
    recommendedPly: '3-Ply & 5-Ply Clean Room Grade',
    burstFactor: '22 - 28 BF Virgin Kraft',
    moistureLimit: '< 7% Moisture Controlled',
    loadRating: '20 - 35 kg Bottle/Vial Shippers'
  },
  engineering: {
    recommendedPly: '5-Ply & 7-Ply Heavy Duty Stitched',
    burstFactor: '28 - 35 BF Heavy Kraft Liner',
    moistureLimit: '< 9% High Compressive Rigidity',
    loadRating: '50 - 120 kg Auto & Machine Parts'
  },
  confectionery: {
    recommendedPly: '3-Ply & 5-Ply Food-Grade Starch',
    burstFactor: '20 - 26 BF Odorless Board',
    moistureLimit: '< 8% Clean Starch Adhesion',
    loadRating: '10 - 25 kg Bakery/Sweets Master'
  },
  stationery: {
    recommendedPly: '3-Ply & 5-Ply Flat Rigid Shippers',
    burstFactor: '18 - 24 BF Edge Protected',
    moistureLimit: '< 8.5% Non-Warping',
    loadRating: '15 - 30 kg Reams & Books'
  },
  fmcg: {
    recommendedPly: '5-Ply Double Wall High-Speed Line',
    burstFactor: '24 - 32 BF High Stacking Index',
    moistureLimit: '< 8% Central India Weather-Resistant',
    loadRating: '25 - 45 kg High-Volume Palletized'
  }
};

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustryForQuote }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'ShieldPlus': return <ShieldPlus className="w-6 h-6" />;
      case 'Cog': return <Cog className="w-6 h-6" />;
      case 'Package': return <Package className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      default: return <Package className="w-6 h-6" />;
    }
  };

  const filteredIndustries = activeFilter === 'all'
    ? industriesData
    : industriesData.filter((i) => i.id === activeFilter);

  return (
    <section id="industries" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badgeText="Sectors & Industry Verticals"
          title="Industries Served: Automotive, Pharma, FMCG & Engineering Packaging"
          subtitle="GAPP Packaging LLP provides custom engineered corrugation solutions tailored to the strict quality, weight capacity, and moisture resistance requirements of each industrial sector."
        />

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-brand-primary text-white shadow-md'
                : 'bg-[#F8F9FA] text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            All 6 Sectors
          </button>

          {industriesData.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveFilter(ind.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === ind.id
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-[#F8F9FA] text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <span>{ind.title.replace(' Sector', '')}</span>
            </button>
          ))}
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry) => {
            const specs = industrySpecs[industry.id] || {
              recommendedPly: '5-Ply Corrugated',
              burstFactor: '24+ BF Kraft',
              moistureLimit: '< 8% Cobb Checked',
              loadRating: 'Custom Capacity'
            };

            return (
              <div
                key={industry.id}
                className="bg-[#F8F9FA] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-brand-primary hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-4">
                  
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white text-brand-primary rounded-xl flex items-center justify-center border border-slate-200 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-xs">
                      {getIcon(industry.iconName)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-accent bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      {specs.loadRating}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-snug">
                    {industry.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Technical Spec Matrix */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Board Structure:</span>
                      <span className="font-bold text-slate-800">{specs.recommendedPly}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Bursting Strength:</span>
                      <span className="font-semibold text-emerald-700">{specs.burstFactor}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Moisture Standard:</span>
                      <span className="font-semibold text-slate-700">{specs.moistureLimit}</span>
                    </div>
                  </div>

                  {/* Packaging Formats Delivered */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Supplied Products:
                    </div>
                    <ul className="space-y-1">
                      {industry.packagingTypes.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Key Benefit Highlight & CTA */}
                <div className="mt-5 space-y-3 pt-3 border-t border-slate-200/70">
                  <div className="bg-teal-50/70 p-3 rounded-xl border border-teal-100/80 text-xs text-slate-700">
                    <span className="font-bold text-brand-primary block mb-0.5 text-[11px]">Core Operational Advantage:</span>
                    <span className="leading-snug text-[11px]">{industry.keyBenefit}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectIndustryForQuote) {
                        onSelectIndustryForQuote(industry.title);
                      } else {
                        const elem = document.getElementById('contact');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-2 bg-white hover:bg-brand-primary text-brand-primary hover:text-white border border-brand-primary/40 hover:border-transparent text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Request {industry.title.replace(' Sector', '')} Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Fast Delivery Banner */}
        <div className="mt-12 bg-gradient-to-r from-brand-primary-hover to-brand-primary text-white p-6 sm:p-8 rounded-2xl border border-teal-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent bg-brand-accent/20 px-2.5 py-0.5 rounded-md border border-brand-accent/40 font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>Zero Production Disruption Guarantee</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Catering to Regular Schedules & Urgent Order Demands
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
              We cater to urgent production runs without affecting the regular delivery schedules of our existing clients. Our buffer reel inventory in Mandideep ensures continuous 24/7 manufacturing readiness.
            </p>
          </div>

          <a
            href="#contact"
            className="shrink-0 bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center gap-1.5"
          >
            <span>Inquire for Plant Delivery</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

