import React from 'react';
import { ContactSection } from '../components/home/ContactSection';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Factory, Building2, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const ContactPage: React.FC = () => {
  const { settings } = useCMS();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner */}
        <div className="bg-brand-primary-hover text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-3 py-1 rounded border border-brand-accent/30">
            Contact & RFQ Inquiries Desk
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Connect Directly With Our Mandideep Plant
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Get in touch with our technical packaging sales desk for instant custom quotation requests, sample prototypes, vendor onboarding, or scheduling factory QA audits.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href="tel:+919806419199"
              className="bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 9806419199</span>
            </a>
            <a
              href="https://wa.me/919806419199?text=Hello%20GAPP%20Packaging%20LLP,%20I%20would%20like%20to%20request%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <span>Instant WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Contact Form & Location Section */}
        <ContactSection />

        {/* FAQ Quick Link Strip */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-brand-accent" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Have questions regarding MOQ, payment terms, or delivery radius?</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Check our detailed procurement FAQs for commercial and technical answers.
            </p>
          </div>
          <Link
            to="/faq"
            className="bg-brand-primary hover:bg-[#0c3c49] text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Read Procurement FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
