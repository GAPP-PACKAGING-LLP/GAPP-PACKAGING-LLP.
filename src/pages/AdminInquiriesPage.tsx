import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  Building, 
  User, 
  Trash2, 
  RefreshCw, 
  Download, 
  LogOut, 
  Box, 
  AlertCircle,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { 
  subscribeToInquiries, 
  updateInquiryStatus, 
  deleteInquiry
} from '../firebase';
import { InquiryDocument, InquiryStatus } from '../types';
import { useAuth } from '../hooks/useAuth';

const STATUS_CONFIG: Record<InquiryStatus, { label: string; bg: string; text: string; border: string }> = {
  new: { label: 'New Inquiry', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  contacted: { label: 'Contacted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  in_progress: { label: 'In Quotation / Progress', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  completed: { label: 'Order Confirmed', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  archived: { label: 'Archived', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300' }
};

export const AdminInquiriesPage: React.FC = () => {
  const { user, adminUser, logout } = useAuth();
  const [inquiries, setInquiries] = useState<InquiryDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Subscribe to real-time inquiries from Firestore
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToInquiries(
      (data) => {
        setInquiries(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Firestore subscription error:', err);
        setError('Failed to sync live data from Firestore. Please check your network or security permissions.');
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Filtered inquiries list
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesStatus;

    const matchesSearch = 
      inquiry.name.toLowerCase().includes(query) ||
      inquiry.company.toLowerCase().includes(query) ||
      inquiry.email.toLowerCase().includes(query) ||
      inquiry.phone.toLowerCase().includes(query) ||
      (inquiry.inquiryRef && inquiry.inquiryRef.toLowerCase().includes(query)) ||
      (inquiry.boxType && inquiry.boxType.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  // Handle status update
  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    setActionLoading(id);
    try {
      await updateInquiryStatus(id, newStatus);
    } catch (err: any) {
      alert(`Error updating status: ${err?.message || 'Failed'}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle delete
  const handleDelete = async (id: string, refName: string) => {
    if (!window.confirm(`Are you sure you want to delete inquiry ${refName}? This action is permanent.`)) {
      return;
    }
    setActionLoading(id);
    try {
      await deleteInquiry(id);
    } catch (err: any) {
      alert(`Error deleting: ${err?.message || 'Failed'}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Save admin notes
  const handleSaveNotes = async (id: string) => {
    setActionLoading(id);
    try {
      const inquiry = inquiries.find(i => i.id === id);
      if (inquiry) {
        await updateInquiryStatus(id, inquiry.status, notesText);
        setEditingNotesId(null);
      }
    } catch (err: any) {
      alert(`Error saving notes: ${err?.message || 'Failed'}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Export inquiries to CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export');
      return;
    }

    const headers = ['Reference', 'Date', 'Status', 'Name', 'Company', 'Phone', 'Email', 'Box Type', 'Ply', 'Dimensions', 'Quantity', 'Location', 'Message', 'Admin Notes'];
    const rows = inquiries.map(i => [
      `"${i.inquiryRef || i.id}"`,
      `"${i.createdAt ? new Date(i.createdAt).toLocaleString() : ''}"`,
      `"${i.status}"`,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${i.phone || ''}"`,
      `"${i.email || ''}"`,
      `"${(i.boxType || '').replace(/"/g, '""')}"`,
      `"${i.plyCount || ''}"`,
      `"${i.dimensionsLength || '-'}x${i.dimensionsWidth || '-'}x${i.dimensionsHeight || '-'} ${i.dimensionUnit || ''}"`,
      `"${(i.monthlyQuantity || '').replace(/"/g, '""')}"`,
      `"${(i.deliveryLocation || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${(i.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GAPP_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-8 bg-[#F8F9FA] min-h-screen text-slate-800" id="admin-cms-portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Management Bar */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-[#0F4C5C] text-white rounded-lg flex items-center justify-center font-bold shadow-xs">
              <Database className="w-6 h-6 text-[#D97706]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#0F4C5C] tracking-tight">
                  GAPP Inquiries CMS
                </h1>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Firestore
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Mandideep Plant Customer Quotations & RFQ Inquiries Database
              </p>
            </div>
          </div>

          {/* Quick Actions & Auth */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-md font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {/* Super Admin Status & Logout */}
            <div className="flex items-center gap-2 bg-slate-50 pl-3 pr-2 py-1.5 rounded-lg border border-slate-200 text-xs">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-left">
                  <div className="font-bold text-slate-800 text-[11px] leading-tight">
                    {adminUser?.name || user?.displayName || 'Super Admin'}
                  </div>
                  <div className="font-mono text-slate-500 text-[10px] truncate max-w-[150px]">
                    {user?.email}
                  </div>
                </div>
              </div>
              
              <button
                onClick={async () => {
                  await logout();
                }}
                className="inline-flex items-center gap-1 bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-200 hover:border-red-200 px-2 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ml-1"
                title="Sign Out from Admin CMS"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats & Overview Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
            <div className="text-xs text-slate-500 font-medium">Total Inquiries</div>
            <div className="text-2xl font-bold text-[#0F4C5C]">{inquiries.length}</div>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-emerald-200 shadow-2xs">
            <div className="text-xs text-emerald-700 font-medium">New / Uncontacted</div>
            <div className="text-2xl font-bold text-emerald-600">
              {inquiries.filter(i => i.status === 'new').length}
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-blue-200 shadow-2xs">
            <div className="text-xs text-blue-700 font-medium">Contacted</div>
            <div className="text-2xl font-bold text-blue-600">
              {inquiries.filter(i => i.status === 'contacted').length}
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-amber-200 shadow-2xs">
            <div className="text-xs text-amber-700 font-medium">In Quotation</div>
            <div className="text-2xl font-bold text-amber-600">
              {inquiries.filter(i => i.status === 'in_progress').length}
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-purple-200 shadow-2xs">
            <div className="text-xs text-purple-700 font-medium">Orders Confirmed</div>
            <div className="text-2xl font-bold text-purple-600">
              {inquiries.filter(i => i.status === 'completed').length}
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, company, ref..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#0F4C5C] focus:bg-white outline-none"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {['all', 'new', 'contacted', 'in_progress', 'completed', 'archived'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#0F4C5C] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'all' ? 'All Inquiries' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-xs text-red-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="underline font-bold hover:text-red-900"
            >
              Retry
            </button>
          </div>
        )}

        {/* Inquiries Table / Feed */}
        {loading ? (
          <div className="bg-white rounded-xl p-12 border border-slate-200 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#0F4C5C] animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-mono">Syncing real-time records from Firestore collection 'inquiries'...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-slate-200 text-center space-y-3">
            <Box className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No Inquiries Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search query or status filter.' 
                : 'No customer inquiries in Firestore yet. Submit a test quotation request from the public website!'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => {
              const statusStyle = STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.new;
              const formattedDate = inquiry.createdAt
                ? new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : 'Just now';

              return (
                <div
                  key={inquiry.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#0F4C5C]/40 transition-all space-y-4"
                >
                  {/* Inquiry Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-800 border border-slate-200">
                        {inquiry.inquiryRef || inquiry.id}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                        {statusStyle.label}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {formattedDate}
                      </span>
                    </div>

                    {/* Status Changer Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status:</span>
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value as InquiryStatus)}
                        disabled={actionLoading === inquiry.id}
                        className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-[#0F4C5C] outline-none cursor-pointer"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Quotation</option>
                        <option value="completed">Order Confirmed</option>
                        <option value="archived">Archived</option>
                      </select>

                      <button
                        onClick={() => handleDelete(inquiry.id, inquiry.inquiryRef || inquiry.id)}
                        disabled={actionLoading === inquiry.id}
                        className="text-slate-400 hover:text-red-600 p-1.5 rounded transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Customer & Box Specs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    
                    {/* Client Info */}
                    <div className="space-y-1.5 bg-[#F8F9FA] p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                        <User className="w-4 h-4 text-[#0F4C5C]" />
                        <span>{inquiry.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold">{inquiry.company}</span>
                      </div>
                      
                      {/* Direct Connect Buttons */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 border border-slate-300 px-2 py-1 rounded text-slate-700 font-mono font-semibold text-[11px]"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{inquiry.phone}</span>
                        </a>

                        <a
                          href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${inquiry.name}, thank you for contacting GAPP Packaging LLP regarding RFQ ${inquiry.inquiryRef || inquiry.id}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-1 rounded text-emerald-800 font-semibold text-[11px]"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`mailto:${inquiry.email}?subject=GAPP Packaging Quotation - ${inquiry.inquiryRef || inquiry.id}`}
                          className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 border border-slate-300 px-2 py-1 rounded text-slate-700 text-[11px]"
                        >
                          <Mail className="w-3 h-3 text-[#0F4C5C]" />
                          <span>Email</span>
                        </a>
                      </div>
                    </div>

                    {/* Box Technical Specs */}
                    <div className="space-y-1.5 bg-[#F8F9FA] p-3 rounded-lg border border-slate-200">
                      <div className="font-bold text-[#0F4C5C] flex items-center gap-1.5">
                        <Box className="w-4 h-4 text-[#D97706]" />
                        <span>{inquiry.boxType || 'Corrugated Boxes'}</span>
                      </div>
                      <div className="text-slate-600">
                        <span className="font-medium text-slate-900">Ply / Wall:</span> {inquiry.plyCount || '5-ply'}
                      </div>
                      <div className="text-slate-600">
                        <span className="font-medium text-slate-900">Dimensions:</span>{' '}
                        {inquiry.dimensionsLength || '-'} × {inquiry.dimensionsWidth || '-'} × {inquiry.dimensionsHeight || '-'} {inquiry.dimensionUnit || 'mm'}
                      </div>
                      <div className="text-slate-600">
                        <span className="font-medium text-slate-900">Volume:</span> {inquiry.monthlyQuantity || 'N/A'}
                      </div>
                      {inquiry.deliveryLocation && (
                        <div className="text-slate-600">
                          <span className="font-medium text-slate-900">Destination:</span> {inquiry.deliveryLocation}
                        </div>
                      )}
                    </div>

                    {/* Message & Internal Notes */}
                    <div className="space-y-2 bg-[#F8F9FA] p-3 rounded-lg border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="font-bold text-slate-700 block mb-1">Customer Notes / Message:</span>
                        <p className="text-slate-600 italic bg-white p-2 rounded border border-slate-200 text-[11px] leading-relaxed max-h-20 overflow-y-auto">
                          {inquiry.message || 'No additional notes specified.'}
                        </p>
                      </div>

                      {/* Internal Admin Notes */}
                      <div className="pt-2 border-t border-slate-200">
                        {editingNotesId === inquiry.id ? (
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              value={notesText}
                              onChange={(e) => setNotesText(e.target.value)}
                              placeholder="e.g. Quoted ₹38/box, awaiting sample approval"
                              className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveNotes(inquiry.id)}
                                className="bg-[#0F4C5C] text-white text-[10px] px-2 py-0.5 rounded font-bold"
                              >
                                Save Note
                              </button>
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="text-slate-500 text-[10px] px-2 py-0.5"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>
                              <span className="font-semibold text-slate-700">Internal Note:</span> {inquiry.adminNotes || 'None'}
                            </span>
                            <button
                              onClick={() => {
                                setEditingNotesId(inquiry.id);
                                setNotesText(inquiry.adminNotes || '');
                              }}
                              className="text-[#0F4C5C] hover:underline font-semibold flex items-center gap-0.5 ml-2 shrink-0 cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
