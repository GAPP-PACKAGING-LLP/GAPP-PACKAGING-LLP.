import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { ProductsSection } from '../components/home/ProductsSection';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { BoxCalculator } from '../components/home/BoxCalculator';
import { ClientsSection } from '../components/home/ClientsSection';
import { ContactSection } from '../components/home/ContactSection';
import { FaqSection } from '../components/home/FaqSection';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  Wrench, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Layers, 
  Calculator, 
  Truck, 
  FileText,
  Phone,
  CheckCircle2
} from 'lucide-react';
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

      {/* 3. About Company Overview with Quick Link */}
      <section className="relative">
        <AboutSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center -mt-6">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0F4C5C] font-bold text-xs sm:text-sm px-6 py-3 rounded-full border border-slate-300 hover:border-[#0F4C5C] shadow-sm transition-all duration-200 group cursor-pointer"
          >
            <span>Read Complete Company Profile & Leadership</span>
            <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 4. Core Products Section with Dedicated Page Link */}
      <section className="bg-slate-50/70 border-t border-slate-200">
        <ProductsSection 
          onSelectProductForQuote={(name) => onOpenQuoteModal(name)} 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center -mt-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-lg shadow-md transition-all duration-200 group cursor-pointer"
          >
            <span>Explore Full Product Catalog & Technical Flute Specs</span>
            <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 5. Infrastructure & Plant Spotlight (Clean Dual Card) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-[#0F4C5C] text-xs font-bold uppercase tracking-wider">
              <Factory className="w-3.5 h-3.5 text-[#0F4C5C]" />
              <span>Plant & Capability Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              High-Speed Converting Infrastructure in Mandideep
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Built for high volume industrial demands with zero compromise on precision and structural compression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Machinery & Infrastructure */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-200 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F4C5C] text-white flex items-center justify-center shadow">
                  <Wrench className="w-6 h-6 text-[#D97706]" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  12 Conversion Lines & Converting Fleet
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  52" Single Facer corrugators, high-speed 2-color flexographic printer, 4-bar rotary slitter scorers, eccentric slotters, and 140-ton platen die-cutters running daily in Mandideep.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Fingerless flute corrugation for B, C, and E flutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Heavy-duty angular zinc wire stitching</span>
                  </div>
                </div>
              </div>

              <Link
                to="/infrastructure"
                className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0F4C5C] hover:text-[#D97706] transition-colors pt-4 border-t border-slate-200"
              >
                <span>View Full Machinery Lineup</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Interactive Virtual Plant Tour */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-200 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A3642] text-white flex items-center justify-center shadow">
                  <Factory className="w-6 h-6 text-[#D97706]" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  8-Stage Virtual Manufacturing Journey
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Follow our step-by-step manufacturing process from Kraft paper reel yard inspection to single-facer corrugation, flexo printing, stitching, lab QA testing, and dispatch across MP.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#008CE8] shrink-0" />
                    <span>Interactive step-by-step factory floor guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#008CE8] shrink-0" />
                    <span>Quality control check-points at every stage</span>
                  </div>
                </div>
              </div>

              <Link
                to="/plant-tour"
                className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0F4C5C] hover:text-[#D97706] transition-colors pt-4 border-t border-slate-200"
              >
                <span>Take 8-Stage Virtual Plant Tour</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Box Configurator Teaser */}
      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <BoxCalculator 
          onOpenQuoteWithSpec={(spec) => onOpenQuoteModal(spec.boxType, spec.dimensions)} 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex justify-center -mt-6">
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0F4C5C] font-bold text-xs sm:text-sm px-6 py-3 rounded-full border border-slate-300 hover:border-[#0F4C5C] shadow-sm transition-all duration-200 group cursor-pointer"
          >
            <span>Open Dedicated Box Calculator & Dimension Guidelines</span>
            <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 7. Industries Served Overview with Dedicated Link */}
      <section className="bg-white border-t border-slate-200">
        <IndustriesSection 
          onSelectIndustryForQuote={(title) => onOpenQuoteModal(title)} 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center -mt-4">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-lg shadow-md transition-all duration-200 group cursor-pointer"
          >
            <span>View All Industry Solutions & Compliance Standards</span>
            <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 8. Major Clients & Trust Badges with Dedicated Link */}
      <section className="bg-slate-50/70 border-t border-slate-200">
        <ClientsSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center -mt-4">
          <Link
            to="/clients"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0F4C5C] font-bold text-xs sm:text-sm px-6 py-3 rounded-full border border-slate-300 hover:border-[#0F4C5C] shadow-sm transition-all duration-200 group cursor-pointer"
          >
            <span>View Industrial Partners & Supply Commitments</span>
            <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 9. Procurement FAQs with Dedicated Link */}
      <section className="bg-white border-t border-slate-200">
        <FaqSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center -mt-4">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0F4C5C] font-bold text-xs sm:text-sm px-6 py-3 rounded-full border border-slate-300 hover:border-[#0F4C5C] shadow-sm transition-all duration-200 group cursor-pointer"
          >
            <span>Read All Procurement & Technical FAQs</span>
            <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 10. Contact & Factory RFQ Section */}
      <ContactSection />
    </main>
  );
};
