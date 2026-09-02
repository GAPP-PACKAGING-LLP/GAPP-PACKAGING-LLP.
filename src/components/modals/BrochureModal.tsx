import React from 'react';
import { X, Printer, FileText, ShieldCheck, Factory, Layers, Users, Wrench } from 'lucide-react';
import { 
  companyData, 
  machineryData, 
  testingEquipmentData, 
  clientPartnersData, 
  designatedPartnersData 
} from '../../data/companyData';
import { BrandLogo, BrandMark } from '../common/BrandLogo';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" id="brochure-modal-overlay">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 print:max-w-none print:shadow-none print:border-none">
        
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-20 bg-[#0F4C5C] text-white px-6 py-4 flex items-center justify-between border-b border-teal-800 print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#D97706]" />
            <span className="font-bold text-sm sm:text-base">GAPP Packaging LLP • Official Company Profile (9 Pages)</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-teal-200 hover:text-white p-1 rounded-md cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brochure Printable Content */}
        <div className="p-6 sm:p-8 space-y-8 bg-white text-slate-800">
          
          {/* Page 1: Header & Company Profile */}
          <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/logo.svg"
                alt="GAPP Packaging - Focus On Quality"
                className="w-32 h-auto object-contain rounded-lg p-1 bg-white"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900 font-sans">
                  <span className="text-[#008CE8]">GAPP</span> PACKAGING LLP
                </h2>
                <p className="text-xs font-bold text-[#0A4D5C]">
                  Focus On Quality
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Official Technical Profile & Specification Brochure
                </p>
              </div>
            </div>

            <div className="text-xs font-mono space-y-1 text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-200">
              <div><span className="font-bold text-slate-900">LLPIN:</span> {companyData.llpin}</div>
              <div><span className="font-bold text-slate-900">GSTIN:</span> {companyData.gst}</div>
              <div><span className="font-bold text-slate-900">Est.:</span> 2020 (Semi-Automatic Unit)</div>
            </div>
          </div>

          {/* Page 2: Introduction Letter */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h2 className="text-sm font-bold text-[#0F4C5C] uppercase tracking-wider">
              Introduction Letter – Corrugated Boxes Manufacturers (Page 2)
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              GAPP Packaging LLP was established in 2020 as a box making unit. Our unit is in Mandideep, Madhya Pradesh and is one of the few with a semi-automatic machine in Bhopal. Our focus is directed towards providing quality boxes and on time delivery consistently. We cater to any urgent orders without affecting the regular delivery schedule of our clients since we understand the fluctuating market demands that our customers face time to time.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              GAPP provides one stop professionalized solution for your trade and manufacturing. Depending on the size and field of your organization, we provide optimum and customized solutions.
            </p>
          </div>

          {/* Designated Partners */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#0F4C5C] flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <Users className="w-4 h-4 text-[#D97706]" />
              <span>Designated Partners (Page 9)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {designatedPartnersData.map((p, i) => (
                <div key={i} className="p-3 bg-[#0F4C5C]/5 border border-[#0F4C5C]/15 rounded-md text-xs">
                  <div className="font-bold text-slate-900">{p.name}</div>
                  <div className="text-slate-500">{p.role}</div>
                  <div className="font-mono font-semibold text-[#0F4C5C] mt-1">{p.phone}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Page 6: Plant & Machinery List (12 Machines) */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#0F4C5C] flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <Wrench className="w-4 h-4 text-[#D97706]" />
              <span>Plant & Machinery List (Page 6 - 12 Machines)</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {machineryData.map((m, idx) => (
                <div key={m.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#0F4C5C] font-bold text-[11px]">{idx + 1}.</span>
                    <span className="font-semibold text-slate-800">{m.name}</span>
                  </div>
                  <span className="font-mono text-[11px] bg-white px-2 py-0.5 border border-slate-200 rounded text-slate-600">
                    {m.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Page 7: Testing Equipment (5 Instruments) */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#0F4C5C] flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span>Testing Equipment List (Page 7 - 5 Instruments)</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {testingEquipmentData.map((t, idx) => (
                <div key={t.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#0F4C5C] font-bold text-[11px]">{idx + 1}.</span>
                    <span className="font-semibold text-slate-800">{t.name}</span>
                  </div>
                  <span className="font-mono text-[11px] bg-white px-2 py-0.5 border border-slate-200 rounded text-slate-600">
                    {t.parameterMeasured.split('(')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pages 8 & 9: Major Clients (10 Companies) */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[#0F4C5C] flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <Layers className="w-4 h-4 text-[#D97706]" />
              <span>Major Clients (Pages 8 & 9 - 10 Verified Clients)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {clientPartnersData.map((c) => (
                <div key={c.id} className="p-2 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{c.id}. {c.name}</span>
                  {c.details && <span className="text-[10px] text-[#D97706] font-semibold">{c.details}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Addresses Footer */}
          <div className="bg-[#0F4C5C] text-white p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
            <div>
              <div className="font-bold text-sm">GAPP PACKAGING LLP</div>
              <div className="text-slate-200">FTY Add: {companyData.factoryAddress.full}</div>
              <div className="text-slate-200">OFF Add: {companyData.officeAddress.full}</div>
            </div>
            <div className="text-left sm:text-right shrink-0 space-y-0.5 font-mono">
              <div>Phone: +91 9806419199, +91 9981280902</div>
              <div>Email: {companyData.email}</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
