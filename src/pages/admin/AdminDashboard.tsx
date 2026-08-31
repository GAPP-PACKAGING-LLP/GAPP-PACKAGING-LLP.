import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MailQuestion,
  Boxes,
  Cpu,
  Microscope,
  Building2,
  Image as GalleryIcon,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  FileDown,
  Building,
  ShieldCheck
} from 'lucide-react';
import { 
  subscribeToInquiries, 
  updateInquiryStatus, 
  subscribeToProducts, 
  subscribeToMachinery, 
  subscribeToTestingEquipment, 
  subscribeToClients 
} from '../../firebase';
import { InquiryDocument, ProductItem, MachineryItem, TestingEquipmentItem, ClientPartner } from '../../types';
import { useToast } from '../../components/admin/common/Toast';
import { BrandMark } from '../../components/common/BrandLogo';

export const AdminDashboard: React.FC = () => {
  const { success, error } = useToast();
  const [inquiries, setInquiries] = useState<InquiryDocument[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [machinery, setMachinery] = useState<MachineryItem[]>([]);
  const [testingEquip, setTestingEquip] = useState<TestingEquipmentItem[]>([]);
  const [clients, setClients] = useState<ClientPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubInq = subscribeToInquiries((items) => {
      setInquiries(items);
      setLoading(false);
    });
    const unsubProd = subscribeToProducts((items) => setProducts(items));
    const unsubMach = subscribeToMachinery((items) => setMachinery(items));
    const unsubTest = subscribeToTestingEquipment((items) => setTestingEquip(items));
    const unsubCli = subscribeToClients((items) => setClients(items));

    return () => {
      unsubInq();
      unsubProd();
      unsubMach();
      unsubTest();
      unsubCli();
    };
  }, []);

  const newInquiries = inquiries.filter((i) => i.status === 'new');
  const contactedInquiries = inquiries.filter((i) => i.status === 'contacted' || i.status === 'in_progress');
  const completedInquiries = inquiries.filter((i) => i.status === 'completed');

  const handleQuickStatus = async (id: string, newStatus: 'new' | 'contacted' | 'completed') => {
    try {
      await updateInquiryStatus(id, newStatus);
      success('Status Updated', `Inquiry marked as ${newStatus}`);
    } catch (err: any) {
      error('Failed to update status', err?.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0F4C5C] to-[#0A2540] rounded-2xl p-6 text-white shadow-sm border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-white/10 rounded-xl hidden sm:flex items-center justify-center shrink-0 border border-white/10">
            <BrandMark size={40} isDark={true} />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Mandideep Plant CMS Live
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              <span className="text-[#008CE8]">GAPP</span> PACKAGING Management Dashboard
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Real-time control over RFQ inquiries, catalog items, semi-automatic machinery lines, testing lab records, and company settings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/inquiries"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <MailQuestion className="w-4 h-4" />
            <span>Review Inquiries ({newInquiries.length} New)</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total RFQs */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total RFQs</span>
            <div className="p-2 rounded-lg bg-teal-50 text-[#0F4C5C]">
              <MailQuestion className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">{inquiries.length}</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {newInquiries.length} new
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Customer quotation requests</p>
        </div>

        {/* Card 2: Products */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Offerings</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">{products.length}</span>
            <span className="text-[11px] text-slate-400 font-mono">live</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Corrugated boxes & cartons</p>
        </div>

        {/* Card 3: Machinery */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Machinery</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">{machinery.length}</span>
            <span className="text-[11px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
              12 Units
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Plant conversion equipment</p>
        </div>

        {/* Card 4: Testing Lab */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Testing Lab</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Microscope className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">{testingEquip.length}</span>
            <span className="text-[11px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-medium">
              IS/ASTM
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">In-house quality apparatus</p>
        </div>
      </div>

      {/* Main Grid: Latest Inquiries + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Latest Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span>Recent Customer RFQs</span>
                {newInquiries.length > 0 && (
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {newInquiries.length} Action Needed
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-500">Quotations submitted via website & contact desk</p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-bold text-[#0F4C5C] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {inquiries.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No customer inquiries received yet.
              </div>
            ) : (
              inquiries.slice(0, 5).map((inq) => (
                <div key={inq.id} className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-800 truncate">
                        {inq.name}
                      </span>
                      {inq.company && (
                        <span className="text-[11px] text-slate-500 font-mono truncate">
                          • {inq.company}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          inq.status === 'new'
                            ? 'bg-amber-100 text-amber-800'
                            : inq.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : inq.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {inq.status?.toUpperCase() || 'NEW'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 truncate mt-1">
                      {inq.boxType ? `${inq.boxType} (${inq.plyCount || 'Custom Ply'})` : inq.message}
                    </p>

                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-mono">
                      <span>{inq.phone}</span>
                      <span>•</span>
                      <span>{inq.email}</span>
                      {inq.deliveryLocation && (
                        <>
                          <span>•</span>
                          <span>Dest: {inq.deliveryLocation}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {inq.status === 'new' && (
                      <button
                        onClick={() => handleQuickStatus(inq.id, 'contacted')}
                        className="px-2.5 py-1 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Mark Contacted
                      </button>
                    )}
                    {inq.status === 'contacted' && (
                      <button
                        onClick={() => handleQuickStatus(inq.id, 'completed')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Mark Closed
                      </button>
                    )}
                    <Link
                      to="/admin/inquiries"
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Action Links & Plant Statues */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Quick CMS Shortcuts</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/admin/products"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#0F4C5C] hover:bg-teal-50/40 transition-colors text-xs font-semibold text-slate-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <Boxes className="w-4 h-4 text-[#0F4C5C]" />
                  <span>Manage Products Catalog</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0F4C5C]" />
              </Link>

              <Link
                to="/admin/machinery"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#0F4C5C] hover:bg-teal-50/40 transition-colors text-xs font-semibold text-slate-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[#0F4C5C]" />
                  <span>Update Machinery (12 Units)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0F4C5C]" />
              </Link>

              <Link
                to="/admin/testing-equipment"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#0F4C5C] hover:bg-teal-50/40 transition-colors text-xs font-semibold text-slate-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <Microscope className="w-4 h-4 text-[#0F4C5C]" />
                  <span>Testing Lab & QC Standards</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0F4C5C]" />
              </Link>

              <Link
                to="/admin/gallery"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#0F4C5C] hover:bg-teal-50/40 transition-colors text-xs font-semibold text-slate-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <GalleryIcon className="w-4 h-4 text-[#0F4C5C]" />
                  <span>Upload Plant Photos</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0F4C5C]" />
              </Link>

              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#0F4C5C] hover:bg-teal-50/40 transition-colors text-xs font-semibold text-slate-700 group"
              >
                <div className="flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-[#0F4C5C]" />
                  <span>Plant & Statutory Settings</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0F4C5C]" />
              </Link>
            </div>
          </div>

          {/* Plant Compliance Card */}
          <div className="bg-slate-900 rounded-xl p-5 text-white shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Compliance</span>
              </span>
              <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                SSI Unit
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">GSTIN:</span>
                <span className="font-mono font-bold text-white">23AAVFG6804D1ZF</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">LLPIN:</span>
                <span className="font-mono font-bold text-white">AAT-8600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Plant Location:</span>
                <span className="font-medium text-white text-right">Mandideep, MP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
