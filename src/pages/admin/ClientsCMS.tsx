import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Save, 
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { subscribeToClients, saveClient, deleteClient } from '../../firebase/cms';
import { ClientPartner } from '../../types';
import { DataTable, Column } from '../../components/admin/common/DataTable';
import { ModalDrawer } from '../../components/admin/common/ModalDrawer';
import { ConfirmDialog } from '../../components/admin/common/ConfirmDialog';
import { FormField } from '../../components/admin/common/FormField';
import { FileUpload } from '../../components/admin/common/FileUpload';
import { useToast } from '../../components/admin/common/Toast';

export const ClientsCMS: React.FC = () => {
  const { success, error } = useToast();
  const [clients, setClients] = useState<ClientPartner[]>([]);
  const [loading, setLoading] = useState(true);

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Partial<ClientPartner>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<ClientPartner | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToClients((items) => {
      setClients(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingClient({
      name: '',
      sector: 'Pharmaceuticals',
      details: '',
      location: 'Madhya Pradesh',
      supplyType: 'Corrugated Master Cartons',
      logoUrl: '',
      isActive: true,
      order: clients.length + 1
    });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (client: ClientPartner) => {
    setEditingClient({ ...client });
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient.name || !editingClient.sector) {
      error('Validation Error', 'Client Name and Sector are required.');
      return;
    }

    setIsSaving(true);
    try {
      await saveClient(editingClient);
      success('Client Saved', `Updated client record for "${editingClient.name}".`);
      setIsDrawerOpen(false);
    } catch (err: any) {
      error('Failed to save client', err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteClient(deleteTarget.id);
      success('Client Deleted', `Removed "${deleteTarget.name}".`);
      setDeleteTarget(null);
    } catch (err: any) {
      error('Failed to delete client', err?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<ClientPartner>[] = [
    {
      header: 'Client / Corporate Entity',
      sortable: true,
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.logoUrl ? (
            <img
              src={row.logoUrl}
              alt={row.name}
              className="w-10 h-10 rounded-lg object-contain p-1 border border-slate-200 shrink-0 bg-white"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0F4C5C] flex items-center justify-center font-bold text-xs shrink-0 border border-teal-100">
              <Building2 className="w-5 h-5" />
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-bold text-slate-800 text-xs truncate">{row.name}</h4>
            {row.details && (
              <p className="text-[10px] text-slate-400 font-mono truncate">{row.details}</p>
            )}
          </div>
        </div>
      )
    },
    {
      header: 'Industry Sector',
      accessor: 'sector',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
          {row.sector}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'isActive',
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
            row.isActive !== false
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {row.isActive !== false ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          <span>{row.isActive !== false ? 'Active Client' : 'Hidden'}</span>
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800">
            Major Corporate & Industrial Clients
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage customer references from Pages 8 & 9 (Pharma, Distilleries, Food & FMCG partners).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Entry</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={clients}
        loading={loading}
        searchPlaceholder="Search client by name, sector or vendor association..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => handleOpenEdit(row)}
              className="p-1.5 text-slate-600 hover:text-[#0F4C5C] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Edit Client"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteTarget(row)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Client"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add / Edit Drawer */}
      <ModalDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingClient.id ? `Edit: ${editingClient.name}` : 'Add Major Client'}
        subtitle="Manage client branding, sector, and relationship notes."
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Client'}</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Client Organization Name"
            value={editingClient.name || ''}
            onChange={(val) => setEditingClient({ ...editingClient, name: val })}
            placeholder="e.g. ARISTO PHARMACEUTICALS PVT LTD"
            required
          />

          <FormField
            label="Industry Sector"
            value={editingClient.sector || ''}
            onChange={(val) => setEditingClient({ ...editingClient, sector: val })}
            placeholder="e.g. Pharmaceuticals & Healthcare"
            required
          />

          <FormField
            label="Vendor Association / Note"
            value={editingClient.details || ''}
            onChange={(val) => setEditingClient({ ...editingClient, details: val })}
            placeholder="e.g. Vendor of CIPLA / SOM Distilleries"
          />

          {/* Client Logo Upload */}
          <FileUpload
            label="Client Logo (Optional)"
            folder="clients"
            value={editingClient.logoUrl}
            onChange={(url) => setEditingClient({ ...editingClient, logoUrl: url })}
            helperText="Upload client logo (PNG with transparent background preferred)"
          />

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <FormField
              label="Display on Website"
              type="switch"
              value={editingClient.isActive}
              onChange={(val) => setEditingClient({ ...editingClient, isActive: val })}
            />

            <div className="w-28">
              <FormField
                label="Display Order"
                type="number"
                value={editingClient.order || 1}
                onChange={(val) => setEditingClient({ ...editingClient, order: val })}
              />
            </div>
          </div>
        </form>
      </ModalDrawer>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Client"
        message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
      />
    </div>
  );
};
