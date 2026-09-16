import React from 'react';
import { 
  Box, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Send,
  Printer,
  Sparkles,
  Package
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { productsData as defaultProductsData } from '../../data/companyData';
import { ProductItem } from '../../types';
import { useCMS } from '../../context/CMSContext';

interface ProductsSectionProps {
  onSelectProductForQuote: (productName: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProductForQuote }) => {
  const { products: cmsProducts } = useCMS();
  const displayProducts = (cmsProducts && cmsProducts.length > 0)
    ? cmsProducts.filter(p => p.isActive !== false)
    : defaultProductsData;

  return (
    <section id="products" className="py-16 md:py-24 bg-[#F8F9FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badgeText="Our Products & Solutions"
          title="Products: 3 Ply, 5 Ply & 7 Ply Corrugated Boxes"
          subtitle="GAPP provides one stop professionalized corrugated packaging solutions for manufacturing and trade. Custom engineered 3 ply, 5 ply, and 7 ply carton boxes for all industries."
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-brand-primary/60 hover:shadow-md transition-all duration-200 group"
            >
              {/* Product Image if available */}
              {product.imageUrl && (
                <div className="w-full h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={product.imageUrl}
                    alt={`${product.name} - GAPP Packaging Corrugated Box Mandideep`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-mono font-bold bg-white/90 text-navy px-2 py-0.5 rounded shadow-xs">
                    {product.category}
                  </span>
                </div>
              )}

              <div className="p-6 space-y-4 flex-1">
                
                {/* Top Badge */}
                {!product.imageUrl && (
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded">
                      {product.name}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-snug">
                  {product.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Features List */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Key Features:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Applications */}
                {product.applications && product.applications.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Sectors Supplied:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.applications.map((app, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 mt-2 border-t border-slate-100">
                <button
                  onClick={() => onSelectProductForQuote(product.name)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white py-2.5 px-4 rounded-md font-semibold text-xs transition-colors cursor-pointer shadow-xs mt-4"
                >
                  <Send className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Inquire for {product.name}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Manufacturing Highlights Banner */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Need custom corrugated box dimensions or urgent batch deliveries?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              We cater to any urgent orders without affecting the regular delivery schedule of our clients.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            Submit Custom Specifications
          </a>
        </div>

      </div>
    </section>
  );
};
