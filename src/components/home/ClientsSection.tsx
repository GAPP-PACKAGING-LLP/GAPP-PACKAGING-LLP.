import React, { useState } from 'react';
import { 
  Building, 
  CheckCircle2, 
  Building2,
  ShieldCheck,
  Award,
  Truck,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useCMS } from '../../context/CMSContext';
import { clientPartnersData } from '../../data/companyData';
import { ClientPartner } from '../../types';

export const ClientsSection: React.FC = () => {
  const { clients } = useCMS();
  const [selectedSector, setSelectedSector] = useState<string>('All');

  // Display clients from CMS or fallback data
  const rawList = clients && clients.length > 0 ? clients : clientPartnersData;
  const activeClients = rawList.filter((c) => c.isActive !== false);

  // Sectors list
  const sectors = ['All', ...Array.from(new Set(activeClients.map((c) => c.sector).filter(Boolean)))];

  const filteredClients = selectedSector === 'All'
    ? activeClients
    : activeClients.filter((c) => c.sector === selectedSector);

  // Helper to extract initials for corporate logo placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter((w) => !['PVT', 'LTD', 'LIMITED', 'PRIVATE', 'AND', '&'].includes(w.toUpperCase()))
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'GP';
  };

  return (
    <section id="clients" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badgeText="Industrial Trust & Client Base"
          title="Major Clients & Industrial Supply Partners"
          subtitle="GAPP Packaging LLP supplies certified corrugated boxes to reputed pharmaceutical laboratories, biotechnology leaders, distilleries, FMCG manufacturers, and food processing plants across Central India."
        />

        {/* Sector Filter Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSector === sec
                  ? 'bg-[#0F4C5C] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Major Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredClients.map((client, index) => {
            const initials = getInitials(client.name);
            const clientNumber = typeof client.id === 'number' 
              ? (client.id < 10 ? `0${client.id}` : `${client.id}`) 
              : (index + 1 < 10 ? `0${index + 1}` : `${index + 1}`);

            return (
              <div
                key={client.id || index}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between gap-4 hover:border-[#0F4C5C] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Logo / Monogram */}
                    {client.logoUrl ? (
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-xs">
                        <img
                          src={client.logoUrl}
                          alt={client.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F4C5C] to-[#0A3642] text-white flex items-center justify-center font-extrabold text-sm font-mono shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        {initials}
                      </div>
                    )}

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          REF #{clientNumber}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {client.sector}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0F4C5C] transition-colors">
                        {client.name}
                      </h3>

                      {client.details && (
                        <p className="text-xs font-semibold text-[#0F4C5C] flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>{client.details}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0 items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>In-House QA Tested Lots</span>
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-slate-700">
                    Mandideep Direct Dispatch
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Core Trust Pillars Banner */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Urgent Order Delivery</h4>
              <p className="text-sm font-bold text-slate-900">Zero Schedule Disruption</p>
              <p className="text-[11px] text-slate-600">Urgent batches dispatched without delaying regular clients.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Laboratory Quality</h4>
              <p className="text-sm font-bold text-slate-900">Test Report with Every Lot</p>
              <p className="text-[11px] text-slate-600">Bursting Strength & GSM certificate included with invoices.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Central India Logistics</h4>
              <p className="text-sm font-bold text-slate-900">Mandideep Hub Fleet</p>
              <p className="text-[11px] text-slate-600">Direct factory delivery across Bhopal, Raisen, Indore & MP.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

