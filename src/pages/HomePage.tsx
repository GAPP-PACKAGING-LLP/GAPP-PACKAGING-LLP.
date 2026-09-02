import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HomeProductsPreview } from '../components/home/HomeProductsPreview';
import { HomeAdvantages } from '../components/home/HomeAdvantages';
import { HomeEstimatorWidget } from '../components/home/HomeEstimatorWidget';
import { HomePlantSpotlight } from '../components/home/HomePlantSpotlight';
import { HomeIndustriesStrip } from '../components/home/HomeIndustriesStrip';
import { HomeClientsTicker } from '../components/home/HomeClientsTicker';
import { HomeCtaBanner } from '../components/home/HomeCtaBanner';
import { useCMS } from '../context/CMSContext';

interface HomePageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const { settings } = useCMS();

  return (
    <main className="flex-1">
      {/* 1. Hero Section */}
      <HeroSection 
        onOpenQuoteModal={() => onOpenQuoteModal()} 
        onOpenBrochureModal={onOpenBrochureModal} 
      />

      {/* 2. Key Manufacturing Stats Bar */}
      <section className="bg-[#0A3642] text-white py-8 border-y border-teal-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] font-mono">15,000+</div>
              <div className="text-xs text-slate-300 font-semibold mt-1 uppercase tracking-wider">Sq. Ft. Mandideep Plant</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] font-mono">12 Lines</div>
              <div className="text-xs text-slate-300 font-semibold mt-1 uppercase tracking-wider">Precision Conversion Machinery</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] font-mono">500+ MT</div>
              <div className="text-xs text-slate-300 font-semibold mt-1 uppercase tracking-wider">Monthly Production Capacity</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] font-mono">100% QA</div>
              <div className="text-xs text-slate-300 font-semibold mt-1 uppercase tracking-wider">In-House Laboratory Tested</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Products Preview Grid (Clean teaser with link to /products) */}
      <HomeProductsPreview 
        onSelectProductForQuote={(productName) => onOpenQuoteModal(productName)}
      />

      {/* 4. Manufacturing & Quality Advantage Pillars */}
      <HomeAdvantages />

      {/* 5. Interactive Box Specifier & Quick Estimator Widget (Teaser with link to /calculator) */}
      <HomeEstimatorWidget 
        onOpenQuoteWithSpec={(boxType, dimensions) => onOpenQuoteModal(boxType, dimensions)}
      />

      {/* 6. Plant Infrastructure & 8-Stage Virtual Tour Showcase (Teaser with links to /infrastructure and /plant-tour) */}
      <HomePlantSpotlight />

      {/* 7. Industries Served (Clean showcase with link to /industries) */}
      <HomeIndustriesStrip />

      {/* 8. Corporate Client Partners & Trust Badges (Clean showcase with link to /clients) */}
      <HomeClientsTicker />

      {/* 9. Direct Factory RFQ & Call to Action Banner */}
      <HomeCtaBanner 
        onOpenQuoteModal={() => onOpenQuoteModal()}
        onOpenBrochureModal={onOpenBrochureModal}
      />
    </main>
  );
};
