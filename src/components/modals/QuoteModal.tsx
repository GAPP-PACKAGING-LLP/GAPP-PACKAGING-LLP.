import React from 'react';
import { X, Database } from 'lucide-react';
import { companyData } from '../../data/companyData';
import { InquiryForm } from '../common/InquiryForm';
import { BrandMark } from '../common/BrandLogo';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledBoxType?: string;
  prefilledDimensions?: { length: string; width: string; height: string; unit: 'mm' | 'inches' };
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  prefilledBoxType = 'Corrugated Master Cartons',
  prefilledDimensions
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" id="quote-modal-overlay">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0A2540] text-white p-5 sm:p-6 sticky top-0 z-10 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-white/10 rounded-lg flex items-center justify-center">
              <BrandMark size={32} isDark={true} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#008CE8]">GAPP</span>
                <span className="text-lg sm:text-xl font-black tracking-tight text-white">PACKAGING</span>
              </div>
              <p className="text-xs text-cyan-200 mt-0.5">
                Request Industrial Quotation (RFQ) • Direct Manufacturer Price
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content with Firestore Connected Form */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-medium text-[#0F4C5C]">
              <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
              Direct B2B Manufacturer Pricing • Mandideep Plant
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                <Database className="w-3 h-3" /> Firestore
              </span>
              <span>GST: {companyData.gst}</span>
            </div>
          </div>

          <InquiryForm
            initialBoxType={prefilledBoxType}
            initialDimensions={prefilledDimensions}
            source="modal_rfq"
          />
        </div>

      </div>
    </div>
  );
};
