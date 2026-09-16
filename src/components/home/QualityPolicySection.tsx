import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Award,
  Users,
  Cpu,
  TrendingUp,
  ClipboardList
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { qualityPolicyData } from '../../data/companyData';

export const QualityPolicySection: React.FC = () => {
  return (
    <section id="quality-policy" className="py-16 md:py-24 bg-[#F8F9FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badgeText="Quality Governance"
          title="Quality Assurance, Testing Standards & Quality Policy"
          subtitle="GAPP is committed to understanding and meeting customer needs through laboratory testing, skilled workforce training, and lot-wise Quality Test Certificates."
        />

        {/* Quality Policy Statement Banner */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
          <div className="flex items-center gap-3 text-brand-primary mb-3">
            <ShieldCheck className="w-6 h-6 text-brand-primary" />
            <h3 className="text-lg font-bold text-slate-900">
              Corporate Quality Policy Statement
            </h3>
          </div>
          <p className="text-base text-slate-700 leading-relaxed font-medium bg-brand-primary/5 p-4 rounded-lg border border-brand-primary/15">
            "{qualityPolicyData.statement}"
          </p>

          {/* 5 Measures to Maintain Quality Policy */}
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-4">
              Measures to Maintain Quality Policy:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {qualityPolicyData.measures.map((measure, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                    {measure}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Stage Quality Process */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-brand-primary" />
            <span>End-to-End Quality Process Workflow</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Raw Material Inward */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-brand-primary text-white text-sm font-bold font-mono flex items-center justify-center">
                    01
                  </span>
                  <span className="text-[11px] font-bold text-brand-primary uppercase bg-brand-primary/10 px-2 py-0.5 rounded">
                    Inward Testing
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  Raw Material Sample Testing
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "{qualityPolicyData.process.rawMaterials}"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
                Verified with Grammage & Weighing Tester
              </div>
            </div>

            {/* Step 2: Online QC Monitoring */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-brand-primary text-white text-sm font-bold font-mono flex items-center justify-center">
                    02
                  </span>
                  <span className="text-[11px] font-bold text-brand-primary uppercase bg-brand-primary/10 px-2 py-0.5 rounded">
                    Stage Control
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  Online Stage Monitoring
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "{qualityPolicyData.process.onlineMonitoring}"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
                Supervised by Quality Control Supervisors
              </div>
            </div>

            {/* Step 3: Pre-Dispatch Certification */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-brand-primary text-white text-sm font-bold font-mono flex items-center justify-center">
                    03
                  </span>
                  <span className="text-[11px] font-bold text-brand-primary uppercase bg-brand-primary/10 px-2 py-0.5 rounded">
                    Certification
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  Pre-Dispatch Certification
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "{qualityPolicyData.process.preDispatchCertification}"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-brand-primary font-bold">
                Test Certificate Issued With Every Lot
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
