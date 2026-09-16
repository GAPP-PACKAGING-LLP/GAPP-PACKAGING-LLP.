import React, { useState, useEffect } from 'react';
import { 
  MailQuestion, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Clock, 
  CheckCircle2, 
  Archive, 
  Trash2, 
  Download, 
  Layers, 
  Eye, 
  MessageSquare,
  Sparkles,
  FileText,
  Plus
} from 'lucide-react';
import { 
  subscribeToInquiries, 
  updateInquiryStatus, 
  deleteInquiry 
} from '../../firebase';
import { InquiryDocument, InquiryStatus } from '../../types';
import { DataTable, Column } from '../../components/admin/common/DataTable';
import { ModalDrawer } from '../../components/admin/common/ModalDrawer';
import { ConfirmDialog } from '../../components/admin/common/ConfirmDialog';
import { useToast } from '../../components/admin/common/Toast';
import { QuotationGeneratorModal } from '../../components/admin/inquiries/QuotationGeneratorModal';

export const InquiriesCMS: React.FC = () => {
  const { success, error } = useToast();
  const [inquiries, setInquiries] = useState<InquiryDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryDocument | null>(null);

  // Quotation Generator Modal
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [quotationInquiryTarget, setQuotationInquiryTarget] = useState<InquiryDocument | null>(null);

  // Delete Dialog
  const [deleteTarget, setDeleteTarget] = useState<InquiryDocument | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToInquiries((items) => {
      setInquiries(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredInquiries = statusFilter === 'all'
    ? inquiries
    : inquiries.filter((inq) => inq.status === statusFilter);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      success('Status Updated', `Inquiry status changed to ${newStatus}`);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (err: any) {
      error('Failed to update status', err?.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteInquiry(deleteTarget.id);
      success('Inquiry Deleted', `Removed inquiry record from ${deleteTarget.name}.`);
      setDeleteTarget(null);
      if (selectedInquiry?.id === deleteTarget.id) {
        setSelectedInquiry(null);
      }
    } catch (err: any) {
      error('Failed to delete inquiry', err?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const exportToCSV = () => {
    if (inquiries.length === 0) {
      error('No Data', 'There are no inquiries to export.');
      return;
    }

    const headers = [
      'ID', 'Date', 'Name', 'Company', 'Phone', 'Email', 
      'Status', 'Box Type', 'Ply Count', 'Dimensions', 
      'Monthly Qty', 'Delivery Location', 'Message'
    ];

    const rows = inquiries.map((i) => [
      i.id,
      i.createdAt?.toDate ? i.createdAt.toDate().toISOString() : i.createdAt || '',
      `"${i.name || ''}"`,
      `"${i.company || ''}"`,
      `"${i.phone || ''}"`,
      `"${i.email || ''}"`,
      i.status || 'new',
      `"${i.boxType || ''}"`,
      `"${i.plyCount || ''}"`,
      `"${i.dimensionsLength || ''}x${i.dimensionsWidth || ''}x${i.dimensionsHeight || ''} ${i.dimensionUnit || ''}"`,
      `"${i.monthlyQuantity || ''}"`,
      `"${i.deliveryLocation || ''}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GAPP_Inquiries_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Export Complete', `Downloaded ${inquiries.length} inquiries to CSV.`);
  };

  const columns: Column<InquiryDocument>[] = [
    {
      header: 'Customer & Company',
      sortable: true,
      accessor: 'name',
      render: (row) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs text-slate-800">{row.name}</span>
            {row.status === 'new' && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </div>
          {row.company ? (
            <p className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
              <Building className="w-3 h-3 text-slate-400" />
              <span>{row.company}</span>
            </p>
          ) : (
            <p className="text-[10px] text-slate-400 font-mono">Individual inquiry</p>
          )}
        </div>
      )
    },
    {
      header: 'Contact Channels',
      render: (row) => (
        <div className="space-y-0.5 text-xs font-mono">
          <a
            href={`tel:${row.phone}`}
            className="flex items-center gap-1 text-slate-700 hover:text-brand-primary font-semibold"
          >
            <Phone className="w-3 h-3 text-brand-primary" />
            <span>{row.phone}</span>
          </a>
          <a
            href={`mailto:${row.email}`}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-[11px] truncate max-w-[180px]"
          >
            <Mail className="w-3 h-3 text-slate-400" />
            <span className="truncate">{row.email}</span>
          </a>
        </div>
      )
    },
    {
      header: 'RFQ Requirements',
      render: (row) => (
        <div className="space-y-0.5 max-w-xs">
          {row.boxType ? (
            <p className="text-xs font-semibold text-slate-800 truncate">
              {row.boxType} <span className="text-[11px] text-slate-500 font-normal font-mono">({row.plyCount || 'Custom'})</span>
            </p>
          ) : (
            <p className="text-xs text-slate-700 line-clamp-1">{row.message || 'General packaging query'}</p>
          )}
          {row.deliveryLocation && (
            <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{row.deliveryLocation}</span>
            </p>
          )}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <select
          value={row.status || 'new'}
          onChange={(e) => handleStatusChange(row.id, e.target.value as InquiryStatus)}
          onClick={(e) => e.stopPropagation()}
          className={`text-[11px] font-bold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none ${
            row.status === 'new'
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : row.status === 'contacted'
              ? 'bg-blue-50 text-blue-800 border-blue-300'
              : row.status === 'in_progress'
              ? 'bg-purple-50 text-purple-800 border-purple-300'
              : row.status === 'completed'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-slate-50 text-slate-600 border-slate-300'
          }`}
        >
          <option value="new">● NEW RFQ</option>
          <option value="contacted">● CONTACTED</option>
          <option value="in_progress">● IN PROGRESS</option>
          <option value="completed">● CLOSED / WON</option>
          <option value="archived">● ARCHIVED</option>
        </select>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800">
            Customer Inquiries & RFQs
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time feed of quotation requests and packaging inquiries submitted via the website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setQuotationInquiryTarget(null);
              setIsQuotationModalOpen(true);
            }}
            className="px-3.5 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Quotation</span>
          </button>
          
          <button
            onClick={exportToCSV}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All Inquiries', count: inquiries.length },
          { key: 'new', label: 'New RFQs', count: inquiries.filter((i) => i.status === 'new').length },
          { key: 'contacted', label: 'Contacted', count: inquiries.filter((i) => i.status === 'contacted').length },
          { key: 'completed', label: 'Closed / Ordered', count: inquiries.filter((i) => i.status === 'completed').length },
          { key: 'archived', label: 'Archived', count: inquiries.filter((i) => i.status === 'archived').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
              statusFilter === tab.key
                ? 'bg-brand-primary text-white font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                statusFilter === tab.key
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredInquiries}
        loading={loading}
        searchPlaceholder="Search customer by name, company, phone or email..."
        searchFilter={(item, q) =>
          (item.name || '').toLowerCase().includes(q) ||
          (item.company || '').toLowerCase().includes(q) ||
          (item.phone || '').toLowerCase().includes(q) ||
          (item.email || '').toLowerCase().includes(q) ||
          (item.deliveryLocation || '').toLowerCase().includes(q)
        }
        actions={(row) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => {
                setQuotationInquiryTarget(row);
                setIsQuotationModalOpen(true);
              }}
              className="p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
              title="Generate Instant Quotation / PDF Invoice"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedInquiry(row)}
              className="p-1.5 text-brand-primary hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
              title="View Full RFQ Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteTarget(row)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Inquiry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Full RFQ Detail Modal Drawer */}
      {selectedInquiry && (
        <ModalDrawer
          isOpen={Boolean(selectedInquiry)}
          onClose={() => setSelectedInquiry(null)}
          title={`RFQ: ${selectedInquiry.name}`}
          subtitle={`Received ${selectedInquiry.createdAt?.toDate ? selectedInquiry.createdAt.toDate().toLocaleString() : 'Recently'}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedInquiry.name)},%20thank%20you%20for%20contacting%20GAPP%20Packaging%20LLP.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Customer</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setQuotationInquiryTarget(selectedInquiry);
                    setIsQuotationModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Quotation</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedInquiry.id, 'completed')}
                  className="px-3.5 py-1.5 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Mark as Closed / Won
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Contact Header Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800">{selectedInquiry.name}</h4>
                  <p className="text-xs text-slate-500 font-mono">{selectedInquiry.company || 'Direct Individual Inquiry'}</p>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    selectedInquiry.status === 'new'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {selectedInquiry.status?.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs font-mono">
                <a href={`tel:${selectedInquiry.phone}`} className="text-slate-700 hover:text-brand-primary flex items-center gap-1.5 font-bold">
                  <Phone className="w-3.5 h-3.5 text-brand-primary" />
                  <span>{selectedInquiry.phone}</span>
                </a>
                <a href={`mailto:${selectedInquiry.email}`} className="text-slate-700 hover:text-brand-primary flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-brand-primary" />
                  <span className="truncate">{selectedInquiry.email}</span>
                </a>
              </div>
            </div>

            {/* Packaging Technical Specs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Box Specifications & Dimensions
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Box Type</span>
                  <span className="text-xs font-bold text-slate-800">{selectedInquiry.boxType || 'Universal Carton'}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Ply Count</span>
                  <span className="text-xs font-bold text-slate-800">{selectedInquiry.plyCount || '5-Ply'}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Monthly Qty</span>
                  <span className="text-xs font-bold text-slate-800">{selectedInquiry.monthlyQuantity || 'Custom Lot'}</span>
                </div>
              </div>

              {(selectedInquiry.dimensionsLength || selectedInquiry.dimensionsWidth || selectedInquiry.dimensionsHeight) && (
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Custom Dimensions</span>
                    <span className="text-xs font-bold text-slate-800 font-mono">
                      {selectedInquiry.dimensionsLength || '0'} × {selectedInquiry.dimensionsWidth || '0'} × {selectedInquiry.dimensionsHeight || '0'} {selectedInquiry.dimensionUnit || 'mm'}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    L × W × H
                  </span>
                </div>
              )}

              {selectedInquiry.deliveryLocation && (
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Delivery Destination</span>
                  <span className="text-xs font-semibold text-slate-800">{selectedInquiry.deliveryLocation}</span>
                </div>
              )}

              {selectedInquiry.message && (
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Customer Message / Note</span>
                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{selectedInquiry.message}</p>
                </div>
              )}
            </div>
          </div>
        </ModalDrawer>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Inquiry Record"
        message={`Are you sure you want to delete inquiry from "${deleteTarget?.name}"?`}
      />

      {/* Quotation & Proforma Generator Modal */}
      <QuotationGeneratorModal
        isOpen={isQuotationModalOpen}
        onClose={() => {
          setIsQuotationModalOpen(false);
          setQuotationInquiryTarget(null);
        }}
        inquiry={quotationInquiryTarget}
      />
    </div>
  );
};
