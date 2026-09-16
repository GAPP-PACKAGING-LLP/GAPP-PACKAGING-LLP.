import React from 'react';
import { FaqSection } from '../components/home/FaqSection';
import { Link } from 'react-router-dom';
import { HelpCircle, Phone, Send, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface FaqPageProps {
  onOpenQuoteModal: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenQuoteModal }) => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="bg-brand-primary-hover text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-3 py-1 rounded border border-brand-accent/30">
            Procurement & Technical FAQ
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Clear answers regarding box specifications, Minimum Order Quantities (MOQ), bursting strength parameters, delivery timelines, and statutory GST compliance for B2B buyers.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Ask a Specific Question</span>
            </button>
            <Link
              to="/calculator"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <span>Box Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Faq Section Component */}
        <FaqSection />

        {/* Need More Assistance Banner */}
        <div className="bg-brand-primary text-white p-8 sm:p-10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-extrabold">Have a Custom Technical Requirement?</h3>
            <p className="text-xs sm:text-sm text-teal-100">
              Speak directly with our corrugation specialists and plant engineers in Mandideep.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+919806419199"
              className="bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>+91 9806419199</span>
            </a>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
