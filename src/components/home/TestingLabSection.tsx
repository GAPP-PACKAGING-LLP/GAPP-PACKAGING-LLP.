import React from 'react';
import { 
  FlaskConical, 
  ShieldCheck, 
  Award, 
  Scale, 
  Activity, 
  Droplet, 
  Gauge, 
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { testingEquipmentData } from '../../data/companyData';

export const TestingLabSection: React.FC = () => {
  return (
    <section id="testing-lab" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badgeText="Testing Equipment (Page 5)"
          title="In-House Testing Laboratory & Quality Control"
          subtitle="Equipped with specialized laboratory testing instruments to verify raw material properties, adhesive viscosity, and finished board strength before dispatch."
        />

        {/* 5-Testing Instruments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testingEquipmentData.map((equipment, idx) => (
            <div
              key={equipment.id}
              className="bg-[#F8F9FA] rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0F4C5C] hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                
                {/* Standard Badge */}
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-[#0F4C5C] text-white text-xs font-bold font-mono flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#0F4C5C] bg-[#0F4C5C]/10 px-2.5 py-1 rounded">
                    Testing Equipment
                  </span>
                </div>

                {/* Instrument Name */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {equipment.name}
                </h3>

                {/* Parameter Tag */}
                <div className="bg-white p-2.5 rounded border border-slate-200 text-xs font-mono">
                  <span className="text-slate-500 block text-[10px] uppercase font-sans font-semibold">Parameter Measured:</span>
                  <span className="font-bold text-[#0F4C5C]">{equipment.parameterMeasured}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {equipment.importance}
                </p>

              </div>

              {/* Function Footer */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-600">
                <span className="font-bold text-slate-800 block mb-0.5 text-[11px]">Functionality:</span>
                <p className="leading-snug">{equipment.description}</p>
              </div>

            </div>
          ))}
        </div>

        {/* Certificate of Analysis Guarantee Banner */}
        <div className="mt-12 bg-[#0F4C5C] text-white p-6 sm:p-8 rounded-xl border border-teal-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D97706]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
                Quality Assurance Mandate
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Prior to Dispatch Every Lot is Again Sampled and Certified
            </h4>
            <p className="text-xs sm:text-sm text-teal-100 max-w-2xl">
              "Test Certificate is issued with every lot. All our raw materials are sampled tested and on approval unloaded and stacked with an identification mark."
            </p>
          </div>

          <a
            href="#contact"
            className="shrink-0 bg-white hover:bg-slate-100 text-[#0F4C5C] px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Request Batch Test Specs
          </a>
        </div>

      </div>
    </section>
  );
};
