import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, ShieldCheck, CheckCircle2, Users } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const HomeClientsTicker: React.FC = () => {
  const { clients } = useCMS();

  // Highlight top 8 prominent corporate partners
  const displayClients = clients.slice(0, 8);

  return (
    <section className="py-16 md:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-[#0F4C5C] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#0F4C5C]" />
            <span>Trusted Industrial Partners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Supplying Corrugated Packaging to Central India's Leading Brands
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From multinational pharmaceutical facilities to automotive OEMs and large food processors, our clients rely on our 100% on-time delivery.
          </p>
        </div>

        {/* Client Partners Cards Grid with Real Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {displayClients.map((client, idx) => (
            <div
              key={client.id || idx}
              className="bg-[#F8F9FA] rounded-xl p-4 sm:p-5 border border-slate-200 text-center flex flex-col justify-between items-center hover:bg-white hover:border-[#0F4C5C]/50 hover:shadow-md transition-all duration-300 min-h-[140px] group"
            >
              {/* Logo Area */}
              <div className="w-full h-14 flex items-center justify-center mb-2 px-2">
                {client.logoUrl ? (
                  <img
                    src={client.logoUrl}
                    alt={`${client.name} Logo`}
                    className="max-h-12 max-w-full object-contain filter group-hover:brightness-105 transition-all"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0F4C5C] flex items-center justify-center font-bold text-xs">
                    <Building2 className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="w-full space-y-1">
                <div className="text-xs sm:text-xs font-bold text-slate-800 leading-tight group-hover:text-[#0F4C5C] transition-colors line-clamp-2">
                  {client.name}
                </div>
                {client.details && (
                  <div className="text-[10px] font-semibold text-[#0F4C5C] truncate">
                    {client.details}
                  </div>
                )}
                {client.sector && (
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                    {client.sector}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Line & Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>100% Statutory Compliance (GST, LLPIN, MSME) & Zero Delivery Defaults</span>
          </div>

          <Link
            to="/clients"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F4C5C] hover:text-[#D97706] group"
          >
            <span>View All Client Partners & Commitments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
