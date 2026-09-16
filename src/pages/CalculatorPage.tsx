import React from 'react';
import { BoxCalculator } from '../components/home/BoxCalculator';
import { Link } from 'react-router-dom';
import { Calculator, Send, FileText, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface CalculatorPageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner & Intro */}
        <div className="bg-brand-primary-hover text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-6 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-3 py-1 rounded border border-brand-accent/30">
            Interactive Engineering Tool
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Packaging Calculator
          </h1>
          <div className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed space-y-4">
            <p>
              Welcome to the GAPP Packaging Calculator. This tool is designed to help B2B buyers, supply chain managers, and local businesses easily estimate their packaging material needs, box dimensions, and approximate costs. 
            </p>
            <p>
              To get started, simply enter your required **Length, Width, and Height** (in mm or inches) and select your preferred material thickness (3-ply, 5-ply, or 7-ply). 
            </p>
            <p className="italic text-teal-100">
              *Please note: The results provided by this calculator are estimates for your convenience. The final commercial quotation may vary depending on raw material GSM, specific flute types, order quantity, and custom printing requirements.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBrochureModal}
              className="bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download Technical Spec Sheet</span>
            </button>
            <Link
              to="/products"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Products & Flutes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Interactive Box Configurator */}
        <BoxCalculator 
          onOpenQuoteWithSpec={(spec) => onOpenQuoteModal(spec.boxType, spec.dimensions)} 
        />

        {/* How to Use Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              How to Use the Packaging Calculator
            </h2>
            <p className="text-sm text-slate-600">
              Follow these simple guidelines to ensure you get the most accurate estimate for your corrugated boxes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="font-bold text-brand-primary text-base">1. Internal Dimensions</h3>
              <p className="leading-relaxed">
                Always specify **Inside Dimensions (L × W × H)**. Corrugated board thickness (e.g., 6-7mm for 5-ply) reduces interior volume if calculated using outer dimensions, which can cause product fit issues.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="font-bold text-brand-primary text-base">2. Select the Right Ply</h3>
              <p className="leading-relaxed">
                Choose **3-ply** for lightweight retail goods (up to 15 kg), **5-ply** for standard master cartons (15-45 kg), and **7-ply** for heavy industrial shipments to ensure proper Box Compression Test (BCT) strength.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="font-bold text-brand-primary text-base">3. Request Final Quote</h3>
              <p className="leading-relaxed">
                Once you generate your estimate, click the **Request Quotation** button to send your specs directly to our sales desk. We will factor in bulk discounts, GSM paper combinations, and freight to give you an exact price.
              </p>
            </div>
          </div>
        </div>

        {/* Packaging Solutions for MP Businesses */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Packaging Solutions for Madhya Pradesh Businesses
            </h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
            As a premier packaging manufacturer based in Mandideep, GAPP Packaging LLP supports the logistical and supply chain needs of businesses across Central India. We leverage advanced high-speed manufacturing to supply customized, durable packaging to agricultural exporters in Raisen, automotive OEMs in Pithampur and Indore, chemical plants in Ratlam, and FMCG brands throughout Bhopal. By sourcing locally, businesses across Madhya Pradesh benefit from reduced freight costs, faster turnaround times, and responsive B2B support.
          </p>
          <div className="pt-2">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm font-semibold text-brand-primary">
              <li><Link to="/packaging-bhopal" className="hover:underline flex items-center gap-1"><ArrowRight className="w-3 h-3"/> Bhopal</Link></li>
              <li><Link to="/packaging-mandideep" className="hover:underline flex items-center gap-1"><ArrowRight className="w-3 h-3"/> Mandideep</Link></li>
              <li><Link to="/packaging-raisen" className="hover:underline flex items-center gap-1"><ArrowRight className="w-3 h-3"/> Raisen</Link></li>
              <li><Link to="/packaging-indore" className="hover:underline flex items-center gap-1"><ArrowRight className="w-3 h-3"/> Indore</Link></li>
              <li><Link to="/packaging-ratlam" className="hover:underline flex items-center gap-1"><ArrowRight className="w-3 h-3"/> Ratlam</Link></li>
              <li><Link to="/packaging-madhya-pradesh" className="hover:underline flex items-center gap-1"><ArrowRight className="w-3 h-3"/> Madhya Pradesh</Link></li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-8 pt-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4 text-left">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm">
              <h3 className="font-bold text-brand-primary text-base mb-2">
                Why does the calculator require inside dimensions?
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Corrugated board has physical thickness. If you measure the outside of the box, the inside space will be smaller by the thickness of the board (e.g., losing up to 10mm for a 5-ply box), which may cause your product to not fit. Always measure the product itself for inside dimensions.
              </p>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm">
              <h3 className="font-bold text-brand-primary text-base mb-2">
                How accurate is the estimated cost?
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                The calculator provides a baseline estimate based on standard Kraft paper GSM and market rates. Your final price will be optimized based on your specific burst factor (BF) requirements, total order volume, and any 2-color flexo printing needs.
              </p>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm">
              <h3 className="font-bold text-brand-primary text-base mb-2">
                Do you deliver the boxes shown in the calculator across Madhya Pradesh?
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Yes, we manufacture and supply corrugated boxes to businesses in Bhopal, Indore, Mandideep, Ratlam, Raisen, and other regions in Madhya Pradesh. Freight logistics will be calculated when you submit your formal RFQ.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
