import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  RotateCcw,
  MessageSquare,
  Building,
  User,
  Phone,
  Mail,
  Box
} from 'lucide-react';
import { createInquiry } from '../../firebase';
import { companyData } from '../../data/companyData';
import { InquiryInput } from '../../types';

interface InquiryFormProps {
  initialBoxType?: string;
  initialDimensions?: { length: string; width: string; height: string; unit: 'mm' | 'inches' };
  source?: 'contact_page' | 'home_rfq' | 'modal_rfq' | 'custom';
  compact?: boolean;
  onSuccess?: (inquiryId: string, refNumber: string) => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialBoxType = 'Corrugated Master Cartons',
  initialDimensions,
  source = 'contact_page',
  compact = false,
  onSuccess
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
    boxType: initialBoxType,
    plyCount: '5-ply',
    dimensionsLength: initialDimensions?.length || '',
    dimensionsWidth: initialDimensions?.width || '',
    dimensionsHeight: initialDimensions?.height || '',
    dimensionUnit: initialDimensions?.unit || 'mm',
    monthlyQuantity: '1,000 to 5,000 units',
    deliveryLocation: 'Mandideep / Bhopal, MP',
    printRequirement: 'Two Colour Flexo Printing'
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; ref: string; clientName: string } | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Field change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user edits
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Form validation
  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name (minimum 2 characters)';
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      errors.company = 'Please enter your company / organization name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    const phoneDigits = formData.phone.replace(/[^0-9+]/g, '');
    if (!phoneDigits || phoneDigits.length < 8) {
      errors.phone = 'Please enter a valid phone or mobile number';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Compose detailed message if user left the message box simple
      const composedMessage = formData.message.trim() || 
        `Inquiry for ${formData.boxType} (${formData.plyCount}). Dimensions: ${formData.dimensionsLength || '-'} x ${formData.dimensionsWidth || '-'} x ${formData.dimensionsHeight || '-'} ${formData.dimensionUnit}. Quantity: ${formData.monthlyQuantity}. Delivery Location: ${formData.deliveryLocation}. Print: ${formData.printRequirement}.`;

      const payload: InquiryInput = {
        name: formData.name.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: composedMessage,
        status: 'new',
        boxType: formData.boxType,
        plyCount: formData.plyCount,
        dimensionsLength: formData.dimensionsLength,
        dimensionsWidth: formData.dimensionsWidth,
        dimensionsHeight: formData.dimensionsHeight,
        dimensionUnit: formData.dimensionUnit as 'mm' | 'inches',
        monthlyQuantity: formData.monthlyQuantity,
        deliveryLocation: formData.deliveryLocation,
        printRequirement: formData.printRequirement,
        source: source
      };

      // Save to Firestore 'inquiries' collection
      const result = await createInquiry(payload);

      // Set success state
      setSuccessData({
        id: result.id,
        ref: result.inquiryRef,
        clientName: formData.name
      });

      if (onSuccess) {
        onSuccess(result.id, result.inquiryRef);
      }

      // Reset form fields
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        message: '',
        boxType: 'Corrugated Master Cartons',
        plyCount: '5-ply',
        dimensionsLength: '',
        dimensionsWidth: '',
        dimensionsHeight: '',
        dimensionUnit: 'mm',
        monthlyQuantity: '1,000 to 5,000 units',
        deliveryLocation: 'Mandideep / Bhopal, MP',
        printRequirement: 'Two Colour Flexo Printing'
      });
      setValidationErrors({});
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      setError(err?.message || 'Failed to submit inquiry. Please check your internet connection or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    if (!successData) return;
    const msg = encodeURIComponent(
      `*New Inquiry - GAPP Packaging LLP*\n` +
      `*Ref:* ${successData.ref}\n` +
      `*Contact:* ${successData.clientName}\n` +
      `*Status:* Submitted to Plant Database\n` +
      `*Inquiry ID:* ${successData.id}`
    );
    window.open(`https://wa.me/${companyData.whatsappNumber}?text=${msg}`, '_blank');
  };

  // Success view
  if (successData) {
    return (
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-emerald-200 text-center space-y-5 shadow-xs" id="inquiry-success-container">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h4 className="text-xl font-bold text-brand-primary">
            Inquiry Saved in Plant Database
          </h4>
          <p className="text-xs text-slate-600">
            Thank you, <span className="font-semibold text-slate-900">{successData.clientName}</span>. Your request has been recorded in the Firestore system.
          </p>
        </div>

        {/* Reference Box */}
        <div className="bg-[#F8F9FA] border border-slate-200 rounded-lg p-3 max-w-sm mx-auto font-mono text-xs space-y-1">
          <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Inquiry Reference Number</span>
          <span className="text-lg font-bold text-brand-primary">{successData.ref}</span>
          <div className="text-[10px] text-slate-400">ID: {successData.id}</div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-md font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect on WhatsApp</span>
          </button>
          
          <button
            type="button"
            onClick={() => setSuccessData(null)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-md font-semibold text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Submit Another Inquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate id="gapp-inquiry-form">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Submission Error</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Contact Person Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              disabled={isSubmitting}
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              className={`w-full px-3.5 py-2.5 bg-white border rounded-md text-xs sm:text-sm outline-none transition-colors ${
                validationErrors.name 
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200' 
                  : 'border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent'
              }`}
            />
          </div>
          {validationErrors.name && (
            <p className="text-[11px] text-red-600 mt-1">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Company / Organization Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="company"
              required
              disabled={isSubmitting}
              value={formData.company}
              onChange={handleChange}
              placeholder="Enterprise / Business Name"
              className={`w-full px-3.5 py-2.5 bg-white border rounded-md text-xs sm:text-sm outline-none transition-colors ${
                validationErrors.company 
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200' 
                  : 'border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent'
              }`}
            />
          </div>
          {validationErrors.company && (
            <p className="text-[11px] text-red-600 mt-1">{validationErrors.company}</p>
          )}
        </div>
      </div>

      {/* Phone & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Mobile / Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              required
              disabled={isSubmitting}
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98XXXXXXXX"
              className={`w-full px-3.5 py-2.5 bg-white border rounded-md text-xs sm:text-sm outline-none transition-colors ${
                validationErrors.phone 
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200' 
                  : 'border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent'
              }`}
            />
          </div>
          {validationErrors.phone && (
            <p className="text-[11px] text-red-600 mt-1">{validationErrors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Official Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              disabled={isSubmitting}
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@company.com"
              className={`w-full px-3.5 py-2.5 bg-white border rounded-md text-xs sm:text-sm outline-none transition-colors ${
                validationErrors.email 
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200' 
                  : 'border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent'
              }`}
            />
          </div>
          {validationErrors.email && (
            <p className="text-[11px] text-red-600 mt-1">{validationErrors.email}</p>
          )}
        </div>
      </div>

      {/* Box Requirement & Ply Specification (if not super compact) */}
      {!compact && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Industry Sector
              </label>
              <select
                name="boxType"
                disabled={isSubmitting}
                value={formData.boxType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-brand-primary outline-none"
              >
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="Retail & E-commerce">Retail & E-commerce</option>
                <option value="Engineering & Machined Goods">Engineering & Machined Goods</option>
                <option value="Confectionery & Bakery">Confectionery & Bakery</option>
                <option value="Stationery & Books">Stationery & Books</option>
                <option value="FMCG & Food Processing">FMCG & Food Processing</option>
                <option value="Other Industry">Other Industry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Box Type / Ply Construction
              </label>
              <select
                name="plyCount"
                disabled={isSubmitting}
                value={formData.plyCount}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-brand-primary outline-none"
              >
                <option value="3-ply Single Wall Corrugated Box">3-ply Single Wall Corrugated Box</option>
                <option value="5-ply Double Wall Corrugated Box">5-ply Double Wall Corrugated Box</option>
                <option value="Two Colour Flexo Printed Cartons">Two Colour Flexo Printed Cartons</option>
                <option value="Stitched Heavy Duty Cartons">Stitched Heavy Duty Cartons</option>
                <option value="Semi Automatic Pasted Boxes">Semi Automatic Pasted Boxes</option>
                <option value="Custom Box Design">Custom Box Design</option>
              </select>
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Approximate Dimensions (L × W × H)
              </label>
              <div className="flex items-center space-x-3 text-xs">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="dimensionUnit"
                    value="mm"
                    checked={formData.dimensionUnit === 'mm'}
                    onChange={handleChange}
                    className="text-brand-primary"
                  />
                  <span className="ml-1 text-slate-700 font-medium">mm</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="dimensionUnit"
                    value="inches"
                    checked={formData.dimensionUnit === 'inches'}
                    onChange={handleChange}
                    className="text-brand-primary"
                  />
                  <span className="ml-1 text-slate-700 font-medium">Inches</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                name="dimensionsLength"
                disabled={isSubmitting}
                value={formData.dimensionsLength}
                onChange={handleChange}
                placeholder="Length (L)"
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                type="number"
                name="dimensionsWidth"
                disabled={isSubmitting}
                value={formData.dimensionsWidth}
                onChange={handleChange}
                placeholder="Width (W)"
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                type="number"
                name="dimensionsHeight"
                disabled={isSubmitting}
                value={formData.dimensionsHeight}
                onChange={handleChange}
                placeholder="Height (H)"
                className="px-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>
        </>
      )}

      {/* Message / Special Requirements */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          Order Details / Message / Urgent Delivery Timeline
        </label>
        <textarea
          name="message"
          rows={compact ? 2 : 3}
          disabled={isSubmitting}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please specify order quantity, target delivery timeline, or any specific box requirements."
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-brand-primary outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          id="submit-inquiry-btn"
          className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:bg-slate-400 text-white py-3 px-6 rounded-md font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 text-brand-accent animate-spin" />
              <span>Saving to Firestore Database...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-brand-accent" />
              <span>Submit Inquiry & Request Quotation</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center">
        <p className="text-[11px] text-slate-500">
          🔒 Secure submission directly to GAPP Packaging LLP plant management.
        </p>
      </div>
    </form>
  );
};
