import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { AboutSection } from '../components/home/AboutSection';
import { useCMS } from '../context/CMSContext';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  ShieldCheck, 
  Truck, 
  Users, 
  Award, 
  MapPin, 
  ExternalLink, 
  Send,
  Phone,
  Mail,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onOpenQuoteModal: () => void;
  onOpenBrochureModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const { settings, directors, clients } = useCMS();
  const activeDirectors = directors.filter((d) => d.isActive !== false);
  const activeClients = clients.filter((c) => c.isActive !== false);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header Banner */}
        <div className="bg-[#0A3642] text-white rounded-2xl p-8 sm:p-12 border border-teal-800 space-y-4 shadow-lg">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded border border-[#D97706]/30">
            About {settings.companyName || 'GAPP Packaging LLP'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Precision Industrial Corrugated Box Manufacturing
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Operating from the industrial corridor of {settings.unitLocation || 'Mandideep, Madhya Pradesh'}, we manufacture high-performance packaging with calibrated compressive strength, tight tolerances, and certified testing.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer"
            >
              Request Plant Quotation
            </button>
          </div>
        </div>

        {/* Core Profile Section */}
        <AboutSection />

        {/* Board of Directors & Leadership Team Section */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-[#0F4C5C] text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Leadership & Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Board of Directors & Designated Partners
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Experienced technocrats and corporate leaders steering high-precision corrugation manufacturing in Madhya Pradesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeDirectors.map((director) => (
              <div
                key={director.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6"
              >
                <div className="shrink-0">
                  {director.photoUrl ? (
                    <img
                      src={director.photoUrl}
                      alt={`${director.name} - ${director.role}, GAPP Packaging LLP Mandideep`}
                      loading="lazy"
                      decoding="async"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#0F4C5C]/20 shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-[#0F4C5C] to-[#0A2540] text-white flex items-center justify-center font-black text-3xl shadow-sm">
                      {director.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{director.name}</h3>
                    <p className="text-xs font-bold text-[#0F4C5C]">{director.role}</p>
                    {director.din && (
                      <span className="inline-block mt-1 text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                        DIN: {director.din}
                      </span>
                    )}
                  </div>

                  {director.bio && (
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{director.bio}"
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    {director.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#008CE8] shrink-0" />
                        <a href={`tel:${director.phone}`} className="font-mono hover:text-[#0F4C5C] font-semibold">
                          {director.phone}
                        </a>
                      </div>
                    )}
                    {director.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#008CE8] shrink-0" />
                        <a href={`mailto:${director.email}`} className="hover:text-[#0F4C5C] truncate">
                          {director.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Partners & Institutional Trust Logos */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0F4C5C] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#D97706]" />
                <span>Institutional Client Base</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Major Clients & Approved Vendor Relationships
              </h3>
            </div>
            <Link
              to="/clients"
              className="text-xs font-bold text-[#0F4C5C] hover:text-[#D97706] flex items-center gap-1 shrink-0"
            >
              <span>Explore All Clients</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {activeClients.slice(0, 10).map((client, idx) => (
              <div
                key={client.id || idx}
                className="bg-white rounded-xl p-3 border border-slate-200 flex flex-col items-center justify-between text-center hover:border-[#0F4C5C]/40 hover:shadow-xs transition-all min-h-[105px]"
              >
                <div className="w-full h-10 flex items-center justify-center mb-1">
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="max-h-9 max-w-full object-contain"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0F4C5C] flex items-center justify-center font-bold text-xs">
                      <Building2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="text-[10px] font-bold text-slate-800 line-clamp-2 leading-tight">
                  {client.name}
                </div>
                {client.sector && (
                  <div className="text-[8.5px] text-slate-400 font-medium truncate w-full mt-0.5">
                    {client.sector}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Factory & Corporate Governance Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-[#F8F9FA] p-8 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-[#0F4C5C] flex items-center gap-2">
              <Factory className="w-5 h-5 text-[#D97706]" />
              <span>Mandideep Manufacturing Unit</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our factory is purpose-built with automated high-speed corrugation lines, multi-color flexo printers, and dedicated raw material conditioning zones. Situated near major highways, our plant enables 24-hour JIT (Just-In-Time) dispatch to automotive, pharma, and FMCG manufacturing plants across Madhya Pradesh.
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2 text-xs font-mono">
              <div className="text-slate-700 font-bold">Factory Address:</div>
              <div className="text-slate-600">{settings.factoryAddress?.full}</div>
            </div>
          </div>

          <div className="bg-[#F8F9FA] p-8 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-[#0F4C5C] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D97706]" />
              <span>Corporate Governance & Compliance</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              As a formally registered Limited Liability Partnership (LLPIN: {settings.llpin}), {settings.companyName || 'GAPP Packaging LLP'} operates with 100% statutory transparency, GST billing compliance ({settings.gst}), and labor safety standards.
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2 text-xs font-mono">
              <div className="text-slate-700 font-bold">Registered Office:</div>
              <div className="text-slate-600">{settings.officeAddress?.full}</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
