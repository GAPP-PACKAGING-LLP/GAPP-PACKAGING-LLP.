import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Leaf, Clock, Award, Users, Wrench, Microscope, 
  CheckCircle2, FileDown, Send, ArrowRight, Building2, MapPin, Mail, Phone, Box, Package
} from 'lucide-react';
import { 
  companyData, 
  designatedPartnersData, 
  missionVisionData, 
  qualityPolicyData, 
  machineryData, 
  testingEquipmentData, 
  environmentPolicyData, 
  deliveryGuidelinesData, 
  statutoryRequirementsData, 
  clientPartnersData 
} from '../data/companyData';
import { useCMS } from '../context/CMSContext';

interface AboutPageProps {
  onOpenQuoteModal?: () => void;
  onOpenBrochureModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const { settings } = useCMS();

  return (
    <div className="flex-1 bg-white text-slate-800 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-b from-slate-100 to-white py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-[#008CE8] text-xs font-bold uppercase tracking-widest rounded-full">
            <Box className="w-3.5 h-3.5" />
            <span>GAPP PACKAGING LLP • ESTABLISHED 2020</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#262D38] tracking-tight">
            About GAPP Packaging LLP
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Semi-automatic corrugated box manufacturing unit in Mandideep, Bhopal delivering quality boxes, zero-discharge sustainability, and on-time consistency.
          </p>
          {onOpenBrochureModal && (
            <div className="pt-2">
              <button
                onClick={onOpenBrochureModal}
                className="inline-flex items-center gap-2 bg-[#008CE8] hover:bg-[#0073BF] text-white px-6 py-2.5 rounded-lg text-xs font-bold shadow transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>View / Print 9-Page Official Company Profile (PDF)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* 2. Introduction Letter (Page 2 of PDF) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-[#008CE8] uppercase tracking-widest block">
              PAGE 2: INTRODUCTION LETTER
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Corrugated Boxes Manufacturers
            </h2>
            <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
              <p>
                <strong>GAPP Packaging LLP</strong> was established in 2020 as a box making unit. Our unit is in Mandideep, Madhya Pradesh and is one of the few with a semi-automatic machine in Bhopal.
              </p>
              <p>
                Our focus is directed towards providing quality boxes and on time delivery consistently. We cater to any urgent orders without affecting the regular delivery schedule of our clients since we understand the fluctuating market demands that our customers face time to time.
              </p>
              <p>
                GAPP provides one stop professionalized solution for your trade and manufacturing. Depending on the size and field of your organization, we have different products to meet your requirements. We provide the optimum and customized solutions made for your organization.
              </p>
              <p className="border-l-2 border-[#008CE8] pl-3 py-1 italic text-slate-600">
                "We have well trained skilled labors and experienced managers along with, in-house engineering support staff to always ensure smooth production. Our employees are the key strength of the organization hence we can provide growth to our people, products, and the services through a commitment to innovation and team spirit."
              </p>
            </div>
          </div>

          {/* Only Corrugated Box image */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000" 
                alt="Stacked Brown Corrugated Boxes - GAPP Packaging" 
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </section>

        {/* 3. Mission, Vision, Keys & Beliefs (Page 3 of PDF) */}
        <section className="bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#008CE8] uppercase tracking-widest block">
              PAGE 3: PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Mission, Vision & Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#008CE8]" />
                <span>Our Mission</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                "{missionVisionData.mission}"
              </p>
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Our Keys for Development:</h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {missionVisionData.keysForDevelopment.map((k, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008CE8]" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Our Vision</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                "{missionVisionData.vision}"
              </p>
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">We Believe In:</h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {missionVisionData.weBelieveIn.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Quality Policy & 3-Step Process (Page 4 of PDF) */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#008CE8] uppercase tracking-widest block">
              PAGE 4: QUALITY ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Quality Policy & Quality Process
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              "{qualityPolicyData.statement}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-[#008CE8] font-black text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-sm text-slate-900">Raw Material Testing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {qualityPolicyData.process.rawMaterials}
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-teal-100 text-[#0E525B] font-black text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-sm text-slate-900">Online Stage Monitoring</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {qualityPolicyData.process.onlineMonitoring}
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-sm text-slate-900">Pre-Dispatch Lot Certification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {qualityPolicyData.process.preDispatchCertification}
              </p>
            </div>
          </div>
        </section>

        {/* 5. Machineries & Testing Lab (Pages 5, 6 & 7) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#008CE8]" />
              <span>12 Machineries Installed (Page 5)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {machineryData.map((m) => (
                <div key={m.id} className="p-2 bg-white rounded border border-slate-200/80 flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#008CE8] shrink-0" />
                  <span>{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[#0E525B]" />
              <span>In-House Testing Lab (Page 5)</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {testingEquipmentData.map((t) => (
                <div key={t.id} className="p-2.5 bg-white rounded border border-slate-200/80">
                  <span className="font-bold text-slate-900 block">{t.name}</span>
                  <span className="text-[11px] text-slate-500">{t.parameterMeasured}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Environment & Statutory Compliance (Page 6 & 7) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Page 6 Policy</span>
            <h3 className="font-black text-lg text-emerald-950 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span>Zero-Discharge & Eco Commitment</span>
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              "{environmentPolicyData.zeroDischarge} {environmentPolicyData.plasticFree}"
            </p>
          </div>

          <div className="p-6 bg-slate-100 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">Page 7 Statutory</span>
            <h3 className="font-black text-lg text-slate-900">
              Statutory Compliance & Legal
            </h3>
            <p className="text-xs text-slate-600">
              "{statutoryRequirementsData.compliance}"
            </p>
            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
              <div><span className="font-bold">GSTIN:</span> {statutoryRequirementsData.gstNo}</div>
              <div><span className="font-bold">LLPIN:</span> {statutoryRequirementsData.llpin}</div>
            </div>
          </div>
        </section>

        {/* 7. Designated Partners (Page 9) */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-[#008CE8] uppercase tracking-widest block">PAGE 9: LEADERSHIP</span>
              <h3 className="text-xl font-black text-slate-900">Designated Partners</h3>
            </div>
            <p className="text-xs text-slate-500">Contact for bulk corrugated box manufacturing inquiries</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-base text-slate-900">Ashish Barkhade</h4>
              <p className="text-xs text-slate-500">Designated Partner • GAPP Packaging LLP</p>
              <a href="tel:+919806419199" className="text-[#008CE8] font-bold text-sm block hover:underline">
                +91 9806419199
              </a>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-base text-slate-900">Pramod Singh</h4>
              <p className="text-xs text-slate-500">Designated Partner • GAPP Packaging LLP</p>
              <a href="tel:+919981280902" className="text-[#008CE8] font-bold text-sm block hover:underline">
                +91 9981280902
              </a>
            </div>
          </div>
        </section>

        {/* 8. Verified Factory & Registered Office (Page 1) */}
        <section className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-[#008CE8] uppercase tracking-widest block">PAGE 1: VERIFIED LOCATIONS</span>
            <h3 className="text-xl font-black text-slate-900">Official Addresses & Contacts</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="space-y-1.5 p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span>Manufacturing Plant (FTY Add):</span>
              </div>
              <p className="text-slate-600 leading-relaxed pl-6">
                {companyData.factoryAddress.full}
              </p>
            </div>

            <div className="space-y-1.5 p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Building2 className="w-4 h-4 text-[#0E525B]" />
                <span>Registered Office (OFF Add):</span>
              </div>
              <p className="text-slate-600 leading-relaxed pl-6">
                {companyData.officeAddress.full}
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
