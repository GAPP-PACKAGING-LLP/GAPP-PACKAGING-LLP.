import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calculator, Send, Box, Factory, ChevronRight, CheckCircle2 } from 'lucide-react';
import { HomeCtaBanner } from '../home/HomeCtaBanner';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LocationPageProps {
  locationName: string;
  h1: string;
  introduction: React.ReactNode;
  productsOffered: string[];
  industriesServed: string[];
  serviceStatement: React.ReactNode;
  faqs: FAQItem[];
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const LocationPageTemplate: React.FC<LocationPageProps> = ({
  locationName,
  h1,
  introduction,
  productsOffered,
  industriesServed,
  serviceStatement,
  faqs,
  onOpenQuoteModal,
  onOpenBrochureModal
}) => {
  return (
    <div className="py-12 bg-white flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb */}
        <nav className="flex text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-brand-primary">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-3 h-3 mx-1" />
                <span className="text-slate-400">Locations</span>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-3 h-3 mx-1" />
                <span className="text-brand-primary font-semibold">{locationName}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Hero / Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#232B39] tracking-tight leading-tight">
              {h1}
            </h1>
            <div className="text-base sm:text-lg text-slate-600 leading-relaxed space-y-4">
              {introduction}
            </div>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuoteModal()}
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-md font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-brand-accent" />
                <span>Request Quotation</span>
              </button>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-brand-primary border border-slate-300 px-6 py-3 rounded-md font-bold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-brand-primary" />
                <span>Packaging Calculator</span>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-[#F8F9FA] border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-brand-primary font-bold pb-2 border-b border-slate-200">
                <MapPin className="w-5 h-5" />
                <span>Service Availability</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                {serviceStatement}
              </p>
              <div className="pt-2">
                <Link to="/contact" className="text-sm font-bold text-brand-accent hover:underline">
                  Contact us to confirm delivery →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Products & Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-teal-50 p-3 rounded-lg text-brand-primary">
                <Box className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Packaging Products Offered</h2>
            </div>
            <ul className="space-y-3">
              {productsOffered.map((product, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{product}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-50 p-3 rounded-lg text-brand-accent">
                <Factory className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Industries Served</h2>
            </div>
            <ul className="space-y-3">
              {industriesServed.map((industry, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call to action Banner */}
        <div className="-mx-4 sm:mx-0">
          <HomeCtaBanner 
            onOpenQuoteModal={onOpenQuoteModal} 
            onOpenBrochureModal={onOpenBrochureModal} 
          />
        </div>

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-8 pt-8 border-t border-slate-200">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-600">
                Common questions about our packaging solutions in {locationName}.
              </p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm">
                  <h3 className="font-bold text-brand-primary text-base sm:text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
