import React from 'react';
import { VirtualPlantTour } from '../components/home/VirtualPlantTour';
import { Link } from 'react-router-dom';
import { Factory, Wrench, ShieldCheck, MapPin, Phone, Send, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface PlantTourPageProps {
  onOpenQuoteModal: () => void;
}

export const PlantTourPage: React.FC<PlantTourPageProps> = ({ onOpenQuoteModal }) => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="bg-[#0A3642] text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded border border-[#D97706]/30">
            Mandideep Manufacturing Unit
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Interactive Virtual Plant Tour
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Experience our 8-stage industrial manufacturing process from raw Kraft reel yard inspection to high-speed single facer corrugation, multi-color flexo printing, heavy stitching, in-house lab testing, and dispatch.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Schedule Plant Visit / RFQ</span>
            </button>
            <Link
              to="/infrastructure"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <span>View Machinery Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 8-Stage Manufacturing Interactive Experience */}
        <VirtualPlantTour />

        {/* Plant Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#0F4C5C] flex items-center justify-center">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Modern Mandideep Facility</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              15,000+ Sq. Ft. purpose-engineered manufacturing floor equipped with continuous exhaust, automated glue kitchens, and dedicated staging bays.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">12 Precision Conversion Lines</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Integrated machinery lineup including 52" single facer corrugator, 2-color flexographic printer, rotary slitter scorer, and high-tonnage die-cutters.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#008CE8] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Certified QA Lab Testing</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Digital Bursting Strength, Cobb water absorption, Grammage balance, and moisture meters ensure 100% batch-to-batch compliance before dispatch.
            </p>
          </div>
        </div>

        {/* Location & Physical Visit CTA */}
        <div className="bg-[#0A2540] text-white p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#D97706] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Direct Factory Location</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold">Visit Our Mandideep Plant</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Survey No. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Pipaliya Korka, MP 464993. We welcome QA audits and vendor evaluation visits.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+919806419199"
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 9806419199</span>
            </a>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
