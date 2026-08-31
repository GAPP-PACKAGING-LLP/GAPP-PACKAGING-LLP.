import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  Recycle, 
  MapPin, 
  FileCheck, 
  Award,
  Factory,
  CheckCircle2,
  Users,
  Target,
  Sparkles,
  Phone
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { missionVisionData, statutoryRequirementsData } from '../../data/companyData';
import { BrandLogo } from '../common/BrandLogo';
import { useCMS } from '../../context/CMSContext';

export const AboutSection: React.FC = () => {
  const { settings, directors } = useCMS();

  const activeDirectors = directors.filter((d) => d.isActive !== false);

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badgeText={`About ${settings.companyName || 'GAPP Packaging LLP'}`}
          badgeVariant="blue"
          title={`Corrugated Boxes Manufacturers Established in ${settings.established || '2020'}`}
          subtitle={`Our unit is in ${settings.unitLocation || 'Mandideep, Madhya Pradesh'} and is one of the few with a semi-automatic machine in Bhopal.`}
        />

        {/* 2-Column Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Text & Introduction (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            {/* Official Brand Identity Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="w-full sm:w-auto flex justify-center">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <BrandLogo 
                    className="w-48 sm:w-56 h-auto object-contain"
                  />
                </div>
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#008CE8]/10 text-[#008CE8] text-xs font-bold">
                  Official Trademark & Brand
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 leading-tight">
                  {settings.companyName || 'GAPP PACKAGING LLP'}
                </h4>
                <p className="text-xs text-[#0A4D5C] font-bold">
                  Tagline: {settings.tagline || 'Focus On Quality'}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Total Corrugated Packaging Solutions • Semi-Automatic High Capacity Corrugator Unit • Mandideep, Bhopal (M.P.)
                </p>
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-lg font-bold text-[#0F4C5C]">
                Introduction Letter – Corrugated Boxes Manufacturers
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                <strong className="text-slate-900 font-semibold">{settings.companyName || 'GAPP Packaging LLP'}</strong> was established in {settings.established || '2020'} as a box making unit. Our unit is in {settings.unitLocation || 'Mandideep, Madhya Pradesh'} and is one of the few with a semi-automatic machine in Bhopal.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Our focus is directed towards providing quality boxes and on time delivery consistently. We cater to any urgent orders without affecting the regular delivery schedule of our clients since we understand the fluctuating market demands that our customers face time to time.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {settings.shortDescription || 'GAPP provides one stop professionalized solution for your trade and manufacturing. Depending on the size and field of your organization, we have different products to meet your requirements. We provide the optimum and customized solutions made for your organization.'}
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                We have well trained skilled labors and experienced managers along with, in-house engineering support staff to always ensure smooth production. Our employees are the key strength of the organization hence we can provide growth to our people, products, and the services through a commitment to innovation and team spirit.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="bg-[#0F4C5C]/5 p-5 rounded-xl border border-[#0F4C5C]/20 space-y-3">
                <div className="flex items-center gap-2 text-[#0F4C5C]">
                  <Target className="w-5 h-5" />
                  <h4 className="font-bold text-base">Our Mission</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  "{missionVisionData.mission}"
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold text-[#0F4C5C] uppercase tracking-wider block mb-1">
                    Keys for Development:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {missionVisionData.keysForDevelopment.map((key, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C5C]" />
                        <span>{key}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#D97706]/5 p-5 rounded-xl border border-[#D97706]/20 space-y-3">
                <div className="flex items-center gap-2 text-[#D97706]">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="font-bold text-base">Our Vision</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  "{missionVisionData.vision}"
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider block mb-1">
                    We Believe In:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {missionVisionData.weBelieveIn.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Governance, Facility & Management (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Designated Partners Card */}
            <div className="bg-[#0A3642] text-white p-6 rounded-xl shadow-md border border-teal-800 space-y-4">
              <div className="flex items-center justify-between border-b border-teal-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#D97706]" />
                  <span className="font-bold text-sm tracking-wide">Designated Partners & Leadership</span>
                </div>
                <span className="text-[11px] font-mono text-[#D97706] font-semibold bg-[#D97706]/20 px-2 py-0.5 rounded">
                  Management
                </span>
              </div>

              <div className="space-y-3">
                {activeDirectors.map((director) => (
                  <div key={director.id} className="bg-teal-950/50 p-3 rounded-lg border border-teal-800/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {director.photoUrl ? (
                        <img
                          src={director.photoUrl}
                          alt={director.name}
                          className="w-10 h-10 rounded-lg object-cover border border-teal-700 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {director.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm truncate">{director.name}</div>
                        <div className="text-xs text-slate-300 truncate">{director.role}</div>
                        {director.din && <div className="text-[10px] text-teal-300 font-mono">DIN: {director.din}</div>}
                      </div>
                    </div>
                    {director.phone && (
                      <a 
                        href={`tel:${director.phone}`}
                        className="text-xs text-[#D97706] font-mono bg-black/30 px-2.5 py-1 rounded hover:underline shrink-0"
                      >
                        {director.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-300 border-t border-teal-700/60 pt-3">
                <span className="text-slate-400">Team: </span>
                Well-trained skilled labors, experienced managers, and in-house engineering support staff ensuring smooth production.
              </div>
            </div>

            {/* Environmental Policy Card */}
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800">
                <Recycle className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-sm">Environment Policy</h4>
              </div>
              <ul className="text-xs sm:text-sm text-emerald-900 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero-Discharge Unit:</strong> GAPP is zero-discharge manufacturing unit, and all our materials are recyclable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Plastic:</strong> We do not use any sorts of plastic at our facility.</span>
                </li>
              </ul>
            </div>

            {/* Statutory Requirements Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>Statutory Requirements</span>
                <FileCheck className="w-4 h-4 text-[#0F4C5C]" />
              </h4>

              <p className="text-xs text-slate-600">
                {statutoryRequirementsData.compliance}
              </p>

              <div className="space-y-2 font-mono text-xs text-slate-700">
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-100">
                  <span className="text-slate-500 font-semibold font-sans">GST No:</span>
                  <span className="font-bold text-slate-900">{settings.gst || statutoryRequirementsData.gstNo}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-100">
                  <span className="text-slate-500 font-semibold font-sans">LLPIN:</span>
                  <span className="font-bold text-slate-900">{settings.llpin || statutoryRequirementsData.llpin}</span>
                </div>
                {settings.pan && (
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-100">
                    <span className="text-slate-500 font-semibold font-sans">PAN No:</span>
                    <span className="font-bold text-slate-900">{settings.pan}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
