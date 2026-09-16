import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Printer, 
  Share2, 
  MessageSquare, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  IndianRupee,
  X,
  Copy,
  Sparkles,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { InquiryDocument } from '../../../types';
import { companyData } from '../../../data/companyData';
import { useToast } from '../common/Toast';

export interface QuotationLineItem {
  id: string;
  description: string;
  ply: string;
  dimensions: string;
  gsmFlute: string;
  quantity: number;
  ratePerUnit: number;
}

interface QuotationGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry?: InquiryDocument | null;
}

export const QuotationGeneratorModal: React.FC<QuotationGeneratorModalProps> = ({
  isOpen,
  onClose,
  inquiry
}) => {
  const { success, error } = useToast();
  const printRef = useRef<HTMLDivElement>(null);

  // Quote Metadata
  const [quoteNumber, setQuoteNumber] = useState<string>(() => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `GAPP/QTN/${new Date().getFullYear()}/${randomSuffix}`;
  });
  const [quoteDate, setQuoteDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [validUntil, setValidUntil] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });

  // Client Details
  const [clientName, setClientName] = useState(inquiry?.name || '');
  const [clientCompany, setClientCompany] = useState(inquiry?.company || '');
  const [clientPhone, setClientPhone] = useState(inquiry?.phone || '');
  const [clientEmail, setClientEmail] = useState(inquiry?.email || '');
  const [deliveryLocation, setDeliveryLocation] = useState(inquiry?.deliveryLocation || 'Mandideep / Bhopal, MP');
  const [clientGst, setClientGst] = useState('');

  // Line Items
  const [lineItems, setLineItems] = useState<QuotationLineItem[]>(() => {
    const defaultQty = parseInt(inquiry?.monthlyQuantity?.replace(/[^0-9]/g, '') || '1000', 10) || 1000;
    const defaultDimensions = inquiry?.dimensionsLength 
      ? `${inquiry.dimensionsLength}x${inquiry.dimensionsWidth}x${inquiry.dimensionsHeight} ${inquiry.dimensionUnit || 'mm'}`
      : '300x200x200 mm';

    return [
      {
        id: 'item-1',
        description: inquiry?.boxType || 'Universal Corrugated Carton (RSC)',
        ply: inquiry?.plyCount || '5-Ply (Double Wall)',
        dimensions: defaultDimensions,
        gsmFlute: '120/140/120 GSM - B/C Flute (High BF Kraft)',
        quantity: defaultQty,
        ratePerUnit: 24.50
      }
    ];
  });

  // Financials
  const [gstRate, setGstRate] = useState<number>(18);
  const [freightCharges, setFreightCharges] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [paymentTerms, setPaymentTerms] = useState<string>('50% Advance with Purchase Order, 50% upon delivery notification');
  const [deliveryTerms, setDeliveryTerms] = useState<string>('Door Delivery within 4-6 business days from batch approval');
  const [preparedBy, setPreparedBy] = useState<string>('Ashish Barkhade (Designated Partner)');

  if (!isOpen) return null;

  // Computations
  const subtotal = lineItems.reduce((acc, item) => acc + (item.quantity * item.ratePerUnit), 0);
  const taxableAmount = Math.max(0, subtotal - discountAmount + freightCharges);
  const gstAmount = (taxableAmount * gstRate) / 100;
  const grandTotal = taxableAmount + gstAmount;

  // Add Item
  const handleAddItem = () => {
    const newItem: QuotationLineItem = {
      id: `item-${Date.now()}`,
      description: 'Corrugated Packaging Box',
      ply: '5-Ply',
      dimensions: 'Custom Size',
      gsmFlute: '140 GSM Kraft Paper',
      quantity: 1000,
      ratePerUnit: 20.00
    };
    setLineItems([...lineItems, newItem]);
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    if (lineItems.length <= 1) {
      error('Item Required', 'Quotation must have at least one line item.');
      return;
    }
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  // Update Item
  const handleUpdateItem = (id: string, field: keyof QuotationLineItem, value: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // WhatsApp Share Generator
  const handleShareWhatsApp = () => {
    if (!clientPhone) {
      error('Phone Missing', 'Please provide the client phone number to send WhatsApp quotation.');
      return;
    }

    const itemsSummary = lineItems.map((item, idx) => 
      `*${idx + 1}. ${item.description}*\n` +
      `   • Ply/Size: ${item.ply} | ${item.dimensions}\n` +
      `   • Specs: ${item.gsmFlute}\n` +
      `   • Qty: ${item.quantity.toLocaleString('en-IN')} pcs @ ₹${item.ratePerUnit.toFixed(2)}/pc = ₹${(item.quantity * item.ratePerUnit).toLocaleString('en-IN')}`
    ).join('\n\n');

    const message = 
      `*GAPP PACKAGING LLP - FORMAL QUOTATION*\n` +
      `*Quotation Ref:* ${quoteNumber}\n` +
      `*Date:* ${quoteDate} (Valid until: ${validUntil})\n\n` +
      `*To:* ${clientName || 'Valued Client'} ${clientCompany ? `(${clientCompany})` : ''}\n` +
      `*Delivery Location:* ${deliveryLocation}\n\n` +
      `----------------------------------------\n` +
      `*PRODUCT & PRICE BREAKDOWN:*\n\n` +
      `${itemsSummary}\n\n` +
      `----------------------------------------\n` +
      `*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n` +
      (freightCharges > 0 ? `*Freight Charges:* ₹${freightCharges.toLocaleString('en-IN')}\n` : '') +
      (discountAmount > 0 ? `*Discount:* -₹${discountAmount.toLocaleString('en-IN')}\n` : '') +
      `*GST (${gstRate}%):* ₹${gstAmount.toLocaleString('en-IN')}\n` +
      `*GRAND TOTAL:* ₹${Math.round(grandTotal).toLocaleString('en-IN')} (All Inclusive)\n\n` +
      `*Terms & Delivery:*\n` +
      `• Payment: ${paymentTerms}\n` +
      `• Delivery: ${deliveryTerms}\n` +
      `• Testing: Batch Test Certificate (Bursting Strength & GSM) included with lot.\n\n` +
      `*Plant Unit:* Survey no. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, MP 464993\n` +
      `*GSTIN:* ${companyData.gst} | *LLPIN:* ${companyData.llpin}\n` +
      `*Contact:* +91 9806419199 / +91 9981280902\n` +
      `*Email:* industriesgapp@gmail.com`;

    const cleanPhone = clientPhone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    success('WhatsApp Ready', 'Quotation summary prepared and opened in WhatsApp.');
  };

  const handleCopyText = () => {
    const text = `GAPP PACKAGING LLP QUOTATION ${quoteNumber}\nClient: ${clientName} (${clientCompany})\nTotal: Rs. ${Math.round(grandTotal).toLocaleString('en-IN')}\nDate: ${quoteDate}`;
    navigator.clipboard.writeText(text);
    success('Copied to Clipboard', 'Quick quotation summary copied.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto" id="quotation-modal">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[94vh]">
        
        {/* Modal Top Action Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Quotation & Proforma Invoice Generator</h3>
                <span className="text-[10px] font-mono font-bold bg-brand-accent text-white px-2 py-0.5 rounded">
                  {quoteNumber}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate official branded quotations, print A4 PDF invoices, or dispatch via WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy Summary"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-teal-400" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Workspace */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-100/70">
          
          {/* Printable Formal Document Paper Sheet */}
          <div 
            ref={printRef}
            className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-8 space-y-6 text-slate-800 max-w-4xl mx-auto print:p-0 print:border-none print:shadow-none"
            id="printable-quotation-document"
          >
            
            {/* Document Letterhead */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-brand-primary">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
                    G
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-brand-primary">
                    GAPP PACKAGING LLP
                  </h1>
                </div>
                <p className="text-xs font-bold text-brand-accent tracking-wide uppercase">
                  Corrugated Boxes & Packaging Solutions Manufacturers
                </p>
                <div className="text-[11px] text-slate-600 font-mono space-y-0.5 pt-1">
                  <p>Plant: Survey no. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, MP 464993</p>
                  <p>GSTIN: <span className="font-bold text-slate-800">{companyData.gst}</span> | LLPIN: <span className="font-bold text-slate-800">{companyData.llpin}</span></p>
                  <p>Ph: +91 9806419199, +91 9981280902 | Email: industriesgapp@gmail.com</p>
                </div>
              </div>

              <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3 sm:text-right space-y-1 shrink-0">
                <span className="text-xs font-extrabold text-brand-primary uppercase tracking-wider block">
                  FORMAL QUOTATION
                </span>
                <p className="text-xs font-mono font-bold text-slate-900">{quoteNumber}</p>
                <p className="text-[11px] text-slate-600">Date: <span className="font-semibold">{quoteDate}</span></p>
                <p className="text-[11px] text-slate-600">Valid Till: <span className="font-semibold text-emerald-700">{validUntil}</span></p>
              </div>
            </div>

            {/* Client & Billing Info Config */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                  Quotation Prepared For (Customer):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Contact Person Name"
                    className="text-xs font-bold p-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="Company / Firm Name"
                    className="text-xs font-semibold p-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Phone / WhatsApp (+91)"
                    className="text-xs font-mono p-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Email Address"
                    className="text-xs font-mono p-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                  Delivery & Tax Details:
                </span>
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="Delivery Destination (e.g. Mandideep / Bhopal)"
                  className="w-full text-xs font-semibold p-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={clientGst}
                    onChange={(e) => setClientGst(e.target.value)}
                    placeholder="Client GSTIN (Optional)"
                    className="text-xs font-mono p-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                  <input
                    type="text"
                    value={preparedBy}
                    onChange={(e) => setPreparedBy(e.target.value)}
                    placeholder="Prepared by Partner"
                    className="text-xs font-semibold p-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Box Items & Pricing Specification
                </h4>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-brand-primary text-xs font-bold rounded-lg border border-teal-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Box Item</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider font-mono">
                      <th className="p-3 w-8">#</th>
                      <th className="p-3">Box Description & Structure</th>
                      <th className="p-3">Dimensions (L×W×H)</th>
                      <th className="p-3">Paper / GSM Specs</th>
                      <th className="p-3 w-24 text-right">Quantity</th>
                      <th className="p-3 w-24 text-right">Rate (₹)</th>
                      <th className="p-3 w-28 text-right">Amount (₹)</th>
                      <th className="p-3 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {lineItems.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/80">
                        <td className="p-3 font-mono font-bold text-slate-500">{idx + 1}</td>
                        <td className="p-3 space-y-1">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                            className="w-full font-bold text-xs p-1.5 bg-white border border-slate-200 rounded"
                            placeholder="Universal RSC Carton"
                          />
                          <input
                            type="text"
                            value={item.ply}
                            onChange={(e) => handleUpdateItem(item.id, 'ply', e.target.value)}
                            className="w-full text-[11px] p-1 bg-white border border-slate-200 rounded text-slate-600 font-mono"
                            placeholder="5-Ply / 3-Ply"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={item.dimensions}
                            onChange={(e) => handleUpdateItem(item.id, 'dimensions', e.target.value)}
                            className="w-full text-xs font-mono p-1.5 bg-white border border-slate-200 rounded"
                            placeholder="300x200x200 mm"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={item.gsmFlute}
                            onChange={(e) => handleUpdateItem(item.id, 'gsmFlute', e.target.value)}
                            className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded text-slate-600"
                            placeholder="140 GSM Kraft Paper"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value, 10) || 0)}
                            className="w-20 text-xs font-mono font-bold text-right p-1.5 bg-white border border-slate-200 rounded"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={item.ratePerUnit}
                            onChange={(e) => handleUpdateItem(item.id, 'ratePerUnit', parseFloat(e.target.value) || 0)}
                            className="w-20 text-xs font-mono font-bold text-right p-1.5 bg-white border border-slate-200 rounded"
                          />
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">
                          ₹{(item.quantity * item.ratePerUnit).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                            title="Remove Line"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations & Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Commercial Terms & Bank Details */}
              <div className="space-y-3 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px]">
                    Commercial Terms & Conditions
                  </span>
                  
                  <div className="space-y-1.5">
                    <div>
                      <label className="text-[10px] text-slate-500 font-medium">Payment Terms:</label>
                      <input
                        type="text"
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className="w-full text-[11px] p-1.5 bg-white border border-slate-300 rounded font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-medium">Delivery Schedule:</label>
                      <input
                        type="text"
                        value={deliveryTerms}
                        onChange={(e) => setDeliveryTerms(e.target.value)}
                        className="w-full text-[11px] p-1.5 bg-white border border-slate-300 rounded font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Details Note */}
                <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-100 text-[11px] space-y-1 font-mono text-slate-700">
                  <div className="flex items-center gap-1 font-bold text-brand-primary">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Bank Transfer Details:</span>
                  </div>
                  <p>A/C Name: <span className="font-bold">GAPP PACKAGING LLP</span></p>
                  <p>Bank: Bank of Baroda, Obedullaganj Branch (MP)</p>
                  <p>Quality Guarantee: Laboratory Test Certificate with every shipment lot.</p>
                </div>
              </div>

              {/* Price Calculations Total Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Amount:</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Freight / Transport:</span>
                  <div className="flex items-center gap-1">
                    <span>₹</span>
                    <input
                      type="number"
                      value={freightCharges}
                      onChange={(e) => setFreightCharges(parseFloat(e.target.value) || 0)}
                      className="w-20 text-right p-1 bg-white border border-slate-300 rounded text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Special Discount:</span>
                  <div className="flex items-center gap-1">
                    <span>-₹</span>
                    <input
                      type="number"
                      value={discountAmount}
                      onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                      className="w-20 text-right p-1 bg-white border border-slate-300 rounded text-xs font-bold text-red-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span>GST Rate:</span>
                    <select
                      value={gstRate}
                      onChange={(e) => setGstRate(parseInt(e.target.value, 10) || 0)}
                      className="text-xs p-1 bg-white border border-slate-300 rounded font-bold"
                    >
                      <option value={18}>18% (Standard Corrugation)</option>
                      <option value={12}>12%</option>
                      <option value={5}>5%</option>
                      <option value={0}>0% (SEZ / Exempt)</option>
                    </select>
                  </div>
                  <span className="font-bold text-slate-900">₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="pt-2 border-t-2 border-brand-primary flex justify-between items-center text-sm sm:text-base font-bold text-brand-primary">
                  <span>Grand Total (Net):</span>
                  <span>₹{Math.round(grandTotal).toLocaleString('en-IN')}</span>
                </div>

                <p className="text-[10px] text-slate-500 italic text-right font-sans">
                  Amount in words: Indian Rupees {Math.round(grandTotal).toLocaleString('en-IN')} Only
                </p>
              </div>

            </div>

            {/* Signature & Seal Footer */}
            <div className="pt-8 border-t border-slate-200 flex items-end justify-between">
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <p>This is a computer-generated formal quotation.</p>
                <p className="font-semibold text-slate-700">Subject to Mandideep / Raisen Jurisdiction.</p>
              </div>

              <div className="text-right space-y-1">
                <div className="w-36 h-12 border-b border-dashed border-slate-400 mx-auto"></div>
                <p className="text-xs font-bold text-slate-900">For GAPP PACKAGING LLP</p>
                <p className="text-[11px] text-brand-primary font-semibold">{preparedBy}</p>
                <p className="text-[10px] text-slate-500 font-mono">Authorized Signatory</p>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Quotation calculated for <strong className="text-slate-800">{clientName || 'Customer'}</strong> ({clientPhone || 'No phone'})
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share Quote on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
