import React from 'react';
import { useCMS } from '../context/CMSContext';

export const AboutPage: React.FC = () => {
  const { settings } = useCMS();

  return (
    <div className="flex-1 bg-white">
      {/* 1. Header Section */}
      <div className="bg-slate-100 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#262D38]">About GAPP Packaging LLP</h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            A trusted corrugated box manufacturer in Mandideep, Madhya Pradesh.
          </p>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        <section className="prose prose-slate max-w-none text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Company Profile</h2>
          <p className="mb-4 leading-relaxed">
            GAPP Packaging LLP was established with the vision of providing high-quality, durable, and reliable corrugated packaging solutions for industries across Central India. Our manufacturing unit is strategically located in the Mandideep Industrial Area, near Bhopal, allowing us to serve diverse sectors efficiently.
          </p>
          <p className="mb-4 leading-relaxed">
            We manufacture a wide range of packaging products, including Single Wall (3-Ply), Double Wall (5-Ply), and Triple Wall (7-Ply) Corrugated Boxes, as well as customized printed cartons. Our commitment is to ensure that every box we produce meets exact specifications for bursting strength, grammage, and dimensions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Manufacturing Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="font-bold text-lg text-[#008CE8] mb-3">Machinery & Equipment</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>Semi-automatic corrugation machines (A, B, C flute profiles)</li>
                <li>Two-color flexographic printing machinery</li>
                <li>Thin-blade rotary slitter scorers for clean cuts</li>
                <li>Eccentric slotters for precise folding</li>
                <li>Heavy-duty wire stitching and flap pasting machines</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="font-bold text-lg text-[#0E525B] mb-3">Quality Assurance</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>In-house Bursting Strength Tester (BST)</li>
                <li>Grammage (GSM) measurement scale</li>
                <li>Moisture content analyzer</li>
                <li>Cobb tester for water absorption resistance</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 p-8 rounded-xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-bold text-slate-800 mb-1">Factory Address:</p>
              <p className="text-slate-600">{settings.factoryAddress?.full || "Survey no. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Madhya Pradesh 464993"}</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">Contact Details:</p>
              <p className="text-slate-600">Phone: +91 9806419199 / 9981280902</p>
              <p className="text-slate-600">Email: industriesgapp@gmail.com</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
