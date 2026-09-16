import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Calculator, CheckCircle, Package, Box, Truck, ShieldCheck, MapPin, PhoneCall, Factory } from 'lucide-react';

interface HomePageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal }) => {
  return (
    <main className="flex-1 bg-white">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#008CE8] bg-[#008CE8]/10 px-4 py-1.5 rounded-full border border-[#008CE8]/20">
            Certified Corrugated Box Manufacturer
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#232B39] tracking-tight leading-tight max-w-4xl mx-auto">
            Packaging Solutions in Bhopal, Mandideep & Madhya Pradesh
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            GAPP Packaging LLP provides high-quality industrial packaging, customized corrugated boxes, and reliable supply chain materials for businesses across Central India.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F4C5C] hover:bg-[#0A3642] text-white px-8 py-4 rounded-md font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              <Send className="w-5 h-5 text-[#D97706]" />
              <span>Get a Quote</span>
            </button>
            <Link
              to="/calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0F4C5C] border border-slate-300 px-8 py-4 rounded-md font-bold text-sm shadow-sm transition-colors cursor-pointer"
            >
              <Calculator className="w-5 h-5 text-[#0F4C5C]" />
              <span>Packaging Calculator</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Services */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Main Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Industrial packaging designed to protect your goods.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Package, title: 'Packaging Materials', desc: 'Comprehensive range of robust packaging materials.' },
              { icon: Box, title: 'Corrugated Boxes', desc: '3-Ply, 5-Ply, and 7-Ply boxes with high bursting strength.' },
              { icon: Factory, title: 'Industrial Packaging', desc: 'Heavy-duty shippers for machinery and bulk transport.' },
              { icon: Calculator, title: 'Packaging Calculator', desc: 'Instantly estimate your dimension and material costs.' },
            ].map((service, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto bg-teal-100 text-[#0F4C5C] rounded-lg flex items-center justify-center">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">{service.title}</h3>
                <p className="text-sm text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Choose GAPP */}
      <section className="bg-slate-50 py-16 md:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Why Choose GAPP</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3 p-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-slate-900">Quality Packaging</h3>
                <p className="text-slate-600 text-sm mt-1">Verified lab-tested boxes guaranteeing strength and product safety.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <Factory className="w-6 h-6 text-[#0F4C5C] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-slate-900">Industrial Solutions</h3>
                <p className="text-slate-600 text-sm mt-1">Custom die-cut and printed cartons designed for B2B supply chains.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <MapPin className="w-6 h-6 text-[#D97706] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-slate-900">Madhya Pradesh Service Area</h3>
                <p className="text-slate-600 text-sm mt-1">Local manufacturing presence ensuring faster regional deliveries.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <Truck className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-slate-900">Quick Quotation</h3>
                <p className="text-slate-600 text-sm mt-1">Instant estimates and rapid RFQ processing directly from our factory.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Service Areas */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Service Areas</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We actively manufacture and supply corrugated packaging to businesses in <Link to="/packaging-bhopal" className="text-[#0F4C5C] font-semibold hover:underline">Bhopal</Link>, <Link to="/packaging-mandideep" className="text-[#0F4C5C] font-semibold hover:underline">Mandideep</Link>, <Link to="/packaging-raisen" className="text-[#0F4C5C] font-semibold hover:underline">Raisen</Link>, <Link to="/packaging-indore" className="text-[#0F4C5C] font-semibold hover:underline">Indore</Link>, <Link to="/packaging-ratlam" className="text-[#0F4C5C] font-semibold hover:underline">Ratlam</Link> and selected locations across <Link to="/packaging-madhya-pradesh" className="text-[#0F4C5C] font-semibold hover:underline">Madhya Pradesh</Link>.
          </p>
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="bg-[#0A2540] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl font-extrabold">Ready to Order?</h2>
          <p className="text-slate-300">Contact our Mandideep sales desk for immediate assistance and bulk pricing.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-4 rounded-md font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Request a Quote</span>
            </button>
            <a
              href="tel:+919806419199"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-md font-bold text-sm shadow-md transition-colors"
            >
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <span>Call Us</span>
            </a>
            <a
              href="https://wa.me/919806419199"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-md font-bold text-sm shadow-md transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.397 0 .015 5.38.015 12.016c0 2.122.553 4.195 1.603 6.02L.03 24l6.111-1.603c1.761 1.002 3.766 1.531 5.889 1.531 6.634 0 12.016-5.38 12.016-12.015C24.045 5.38 18.664 0 12.031 0zm.001 21.946c-1.802 0-3.565-.483-5.111-1.4l-.367-.217-3.797.996.996-3.702-.238-.378c-1.004-1.597-1.533-3.447-1.533-5.334 0-5.523 4.494-10.017 10.017-10.017s10.017 4.494 10.017 10.017-4.494 10.017-10.016 10.017zm5.503-7.514c-.302-.151-1.787-.882-2.064-.982-.276-.101-.478-.151-.678.151-.201.301-.779.982-.955 1.183-.176.201-.352.226-.653.075-1.722-.857-3.037-2.383-3.69-3.493-.151-.252.015-.377.166-.527.135-.135.301-.351.452-.527.151-.176.201-.302.302-.502.101-.201.051-.377-.025-.527-.075-.151-.679-1.631-.93-2.234-.246-.587-.497-.508-.679-.517-.176-.008-.377-.013-.578-.013-.201 0-.528.075-.804.377-.276.301-1.055 1.031-1.055 2.513 0 1.482 1.081 2.915 1.231 3.116.151.201 2.126 3.247 5.147 4.549.719.311 1.279.497 1.716.636.721.23 1.378.197 1.895.12.579-.086 1.787-.729 2.038-1.433.251-.703.251-1.306.176-1.432-.075-.126-.276-.201-.578-.352z"/></svg>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
