import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ArrowRight, 
  ShieldPlus, 
  Cog, 
  Package, 
  ShoppingBag, 
  Layers, 
  Truck,
  Wine
} from 'lucide-react';

export const HomeIndustriesStrip: React.FC = () => {
  const industries = [
    {
      title: 'Pharmaceuticals & Healthcare',
      icon: ShieldPlus,
      desc: 'Clean, dimensionally precise shippers with lot-wise lab certification.',
      bg: 'hover:border-emerald-400'
    },
    {
      title: 'Automotive & Engineering',
      icon: Cog,
      desc: 'High-puncture, high-bursting strength boxes for machined components.',
      bg: 'hover:border-amber-400'
    },
    {
      title: 'FMCG & Food Processing',
      icon: Truck,
      desc: 'High-stacking master cartons bonded with 100% food-grade starch glue.',
      bg: 'hover:border-teal-400'
    },
    {
      title: 'Confectionery & Bakery',
      icon: Package,
      desc: 'Zero-discharge, hygienic, odor-free boxes without plastic lamination.',
      bg: 'hover:border-sky-400'
    },
    {
      title: 'Retail & E-Commerce',
      icon: ShoppingBag,
      desc: 'Shelf-ready die-cut cartons and flexo printed branded shippers.',
      bg: 'hover:border-indigo-400'
    },
    {
      title: 'Beverages & Distilleries',
      icon: Wine,
      desc: 'Heavy double-wall partitions protecting glass bottles during transit.',
      bg: 'hover:border-purple-400'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-[#0F4C5C] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-[#0F4C5C]" />
              <span>Sectors & Applications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Customized Packaging Engineered for Every Sector
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We tailor board grammage, flute geometry, and compression strength to meet the exact compliance standards of your industry.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0F4C5C] hover:text-[#0A3642] group shrink-0"
          >
            <span>Explore Industry Specifications & Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            const IconComp = ind.icon;
            return (
              <div
                key={idx}
                className={`bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex items-start gap-4 ${ind.bg}`}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0F4C5C] flex items-center justify-center shrink-0">
                  <IconComp className="w-6 h-6 text-[#D97706]" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-base font-extrabold text-slate-900">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
