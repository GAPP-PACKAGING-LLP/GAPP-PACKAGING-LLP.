import React, { useState } from 'react';
import { 
  Building2, 
  Factory, 
  Copy, 
  Check,
  UserCheck,
  ExternalLink,
  Mail,
  Database
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { companyData } from '../../data/companyData';
import { InquiryForm } from '../common/InquiryForm';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badgeText="Contact & Plant Details"
          title="Contact Corrugated Box Manufacturer in Mandideep, Bhopal"
          subtitle="Get in touch with GAPP Packaging LLP for your corrugated box requirements, urgent delivery requests, and customized packaging solutions in Bhopal & Mandideep."
        />

        {/* 2-Column Main Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Official Addresses & Designated Partners (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Factory Address Card */}
            <div className="bg-[#F8F9FA] rounded-xl border border-slate-200 p-6 space-y-4 hover:border-brand-primary/50 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <Factory className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Factory Address (FTY Add)</h3>
                    <p className="text-[11px] text-slate-500 font-mono">Mandideep, MP</p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyData.factoryAddress.googleMapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1"
                >
                  <span>Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                <p className="font-medium text-slate-900">{companyData.factoryAddress.full}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>Unit Location: Mandideep Industrial Area</span>
                <span className="text-emerald-700 font-semibold">● Operational</span>
              </div>
            </div>

            {/* Office Address Card */}
            <div className="bg-[#F8F9FA] rounded-xl border border-slate-200 p-6 space-y-4 hover:border-brand-primary/50 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Office Address (OFF Add)</h3>
                    <p className="text-[11px] text-slate-500 font-mono">Obedullaganj, MP</p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyData.officeAddress.googleMapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1"
                >
                  <span>Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="font-medium text-slate-900">{companyData.officeAddress.full}</p>
              </div>
            </div>

            {/* Designated Partners Card */}
            <div className="bg-brand-primary-hover text-white p-6 rounded-xl border border-teal-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent border-b border-teal-700 pb-2 flex items-center justify-between">
                <span>Designated Partners (Page 9)</span>
                <UserCheck className="w-4 h-4" />
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-teal-950/40 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Ashish Barkhade</div>
                    <div className="text-xs text-slate-300">Designated Partner</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="tel:+919806419199" className="text-brand-accent font-mono font-bold hover:underline">
                      +91 9806419199
                    </a>
                    <button
                      onClick={() => handleCopy('+919806419199', 'p1')}
                      className="text-slate-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedField === 'p1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-teal-950/40 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Pramod Singh</div>
                    <div className="text-xs text-slate-300">Designated Partner</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="tel:+919981280902" className="text-brand-accent font-mono font-bold hover:underline">
                      +91 9981280902
                    </a>
                    <button
                      onClick={() => handleCopy('+919981280902', 'p2')}
                      className="text-slate-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedField === 'p2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-teal-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-accent" />
                    <a href={`mailto:${companyData.email}`} className="hover:text-brand-accent font-mono break-all text-xs">
                      {companyData.email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy(companyData.email, 'email')}
                    className="text-slate-400 hover:text-white"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean InquiryForm (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F8F9FA] rounded-2xl border border-slate-200 p-6 sm:p-8">
            
            <div className="mb-6 border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-brand-primary">
                  Send an Inquiry / Request for Quotation
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Tell us your box requirements and delivery timeline. We cater to regular schedules and urgent orders.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-mono font-semibold px-2.5 py-1 rounded border border-emerald-200 self-start sm:self-auto shrink-0">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Firestore Connected</span>
              </div>
            </div>

            {/* Clean Connected InquiryForm Component */}
            <InquiryForm source="contact_page" />

          </div>

        </div>

      </div>
    </section>
  );
};
