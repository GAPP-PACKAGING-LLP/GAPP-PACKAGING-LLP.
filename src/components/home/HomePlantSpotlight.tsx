import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const HomePlantSpotlight: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5 text-brand-primary" />
            <span>Facility & Manufacturing Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Inside Our 15,000+ Sq. Ft. Mandideep Manufacturing Plant
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Take a transparent look at our specialized conversion machinery lines and our 8-stage quality-governed production cycle.
          </p>
        </div>

        {/* Dual Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: 12 Industrial Converting Lines */}
          <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-200 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-300 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-xs">
                  <Wrench className="w-6 h-6 text-brand-accent" />
                </div>
                <span className="text-xs font-mono font-bold text-brand-primary bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  12 Converting Units
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Converting Machinery & Equipment Fleet
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  Our facility is equipped with 52" single-facer corrugators, high-speed 2-color flexographic printer, thin-blade rotary slitters, eccentric slotters, and 140T platen die-cutters running daily in Mandideep.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Fingerless high-speed fluting for consistent pitch & height</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Thin tungsten alloy slitter blades for burr-free edges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Semi-automatic flap pasting & heavy angular wire stitching</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                to="/infrastructure"
                className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider text-brand-primary hover:text-brand-accent transition-colors group"
              >
                <span>Explore Full Machinery Fleet & Specifications</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: 8-Stage Virtual Manufacturing Tour */}
          <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-200 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-300 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-brand-primary-hover text-white flex items-center justify-center shadow-xs">
                  <Eye className="w-6 h-6 text-brand-accent" />
                </div>
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                  8-Stage Process
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  8-Stage Virtual Plant Tour & Inspection Flow
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  Follow our step-by-step production flow from Kraft paper reel conditioning to corrugation, gluing, flexo printing, die-cutting, laboratory verification, and final bundled dispatch.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008CE8] shrink-0" />
                  <span>Stage-by-stage visual factory floor checkpoints</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008CE8] shrink-0" />
                  <span>Inline quality monitoring at each operational step</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008CE8] shrink-0" />
                  <span>Lot-wise Test Certificate verification before dispatch</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                to="/infrastructure"
                className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider text-brand-primary hover:text-brand-accent transition-colors group"
              >
                <span>Take the 8-Stage Plant Tour & Machine View</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
