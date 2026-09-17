import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Calculator, Box, MapPin, Factory } from 'lucide-react';

interface HomePageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal }) => {
  return (
    <main className="flex-1 bg-white">
      {/* 1. Hero Section */}
      <section className="bg-slate-100 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#262D38] tracking-tight leading-tight max-w-4xl mx-auto flex flex-col gap-2">
            <span className="text-[#008CE8] text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>GAPP Packaging LLP</span>
            <span className="text-3xl sm:text-4xl">Manufacturer of Corrugated Boxes</span>
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
            Based in Mandideep (Bhopal), we manufacture and supply high-quality corrugated boxes, printed cartons, and packaging materials.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#008CE8] hover:bg-[#0073BF] text-white px-8 py-4 rounded-md font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              <Send className="w-5 h-5 text-white" />
              <span>Enquiry / Get a Quote</span>
            </button>
            <Link
              to="/calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#008CE8] border border-slate-300 px-8 py-4 rounded-md font-bold text-sm shadow-sm transition-colors cursor-pointer"
            >
              <Calculator className="w-5 h-5 text-[#008CE8]" />
              <span>Packaging Calculator</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Welcome Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">Welcome to GAPP Packaging LLP</h2>
          <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
            GAPP Packaging LLP is a manufacturing unit located at Industrial Area, Mandideep, Dist. Raisen (M.P.). We specialize in producing 3 Ply, 5 Ply, and 7 Ply Corrugated Boxes, printed cartons, and heavy-duty shipping containers. 
            Our facility is equipped with semi-automatic corrugation machinery, 2-color flexo printing, thin-blade slitting, and stitching/pasting machines to deliver accurate dimensions and high bursting strength.
          </p>
          <div className="pt-4">
            <Link to="/about" className="inline-block bg-slate-800 text-white px-6 py-2 rounded font-semibold hover:bg-slate-700 transition">Read More About Us</Link>
          </div>
        </div>
      </section>

      {/* 3. Products & Facilities */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Our Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 border border-slate-200 rounded text-center">
              <Box className="w-12 h-12 text-[#008CE8] mx-auto mb-4" />
              <h3 className="font-bold text-lg text-slate-900 mb-2">Corrugated Boxes</h3>
              <p className="text-slate-600 text-sm">We manufacture 3-ply, 5-ply, and 7-ply boxes tailored for FMCG, Pharmaceuticals, and Industrial products.</p>
            </div>
            <div className="bg-white p-6 border border-slate-200 rounded text-center">
              <Factory className="w-12 h-12 text-[#008CE8] mx-auto mb-4" />
              <h3 className="font-bold text-lg text-slate-900 mb-2">Printed Cartons</h3>
              <p className="text-slate-600 text-sm">Two-color flexo printed cartons with sharp brand identification and text details.</p>
            </div>
            <div className="bg-white p-6 border border-slate-200 rounded text-center">
              <MapPin className="w-12 h-12 text-[#008CE8] mx-auto mb-4" />
              <h3 className="font-bold text-lg text-slate-900 mb-2">Mandideep Facility</h3>
              <p className="text-slate-600 text-sm">In-house testing laboratory with Bursting Strength, GSM, and Moisture testing equipment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Us CTA */}
      <section className="bg-[#0E525B] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Contact Us</h2>
          <p className="text-slate-300">Plot / Survey No. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Madhya Pradesh 464993</p>
          <p className="text-slate-300 font-bold text-lg">Call: +91 9806419199 / 9981280902 | Email: industriesgapp@gmail.com</p>
        </div>
      </section>
    </main>
  );
};
