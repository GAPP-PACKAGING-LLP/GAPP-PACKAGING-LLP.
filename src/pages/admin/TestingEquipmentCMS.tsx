import React, { useState, useEffect } from 'react';
import { 
  Microscope, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Save, 
  ShieldAlert,
  Activity
} from 'lucide-react';
import { subscribeToTestingEquipment, saveTestingEquipment, deleteTestingEquipment } from '../../firebase/cms';
import { TestingEquipmentItem } from '../../types';
import { DataTable, Column } from '../../components/admin/common/DataTable';
import { ModalDrawer } from '../../components/admin/common/ModalDrawer';
import { ConfirmDialog } from '../../components/admin/common/ConfirmDialog';
import { FormField } from '../../components/admin/common/FormField';
import { FileUpload } from '../../components/admin/common/FileUpload';
import { useToast } from '../../components/admin/common/Toast';

export const TestingEquipmentCMS: React.FC = () => {
  const { success, error } = useToast();
  const [equipment, setEquipment] = useState<TestingEquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<TestingEquipmentItem>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<TestingEquipmentItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToTestingEquipment((items) => {
      setEquipment(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      name: '',
      standard: 'IS / ASTM Calibration',
      parameterMeasured: '',
      importance: '',
      description: '',
      unit: '',
      accuracy: 'Calibrated laboratory scale',
      imageUrl: '',
      isActive: true,
      order: equipment.length + 1
    });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (item: TestingEquipmentItem) => {
    setEditingItem({ ...item });
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.name || !editingItem.parameterMeasured) {
      error('Validation Error', 'Equipment Name and Parameter Measured are required.');
      return;
    }

    setIsSaving(true);
    try {
      await saveTestingEquipment(editingItem);
      success('Testing Equipment Saved', `Updated "${editingItem.name}" in quality lab.`);
      setIsDrawerOpen(false);
    } catch (err: any) {
      error('Failed to save testing equipment', err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteTestingEquipment(deleteTarget.id);
      success('Equipment Deleted', `Removed "${deleteTarget.name}".`);
      setDeleteTarget(null);
    } catch (err: any) {
      error('Failed to delete equipment', err?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<TestingEquipmentItem>[] = [
    {
      header: 'Apparatus Name & Standard',
      sortable: true,
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={row.name}
              className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-50"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-100">
              <Microscope className="w-5 h-5" />
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-bold text-slate-800 text-xs truncate">{row.name}</h4>
            <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
              {row.standard}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Parameter Measured',
      accessor: 'parameterMeasured',
      render: (row) => (
        <div className="space-y-0.5 max-w-xs">
          <p className="text-xs text-slate-800 font-semibold truncate">{row.parameterMeasured}</p>
          <p className="text-[10px] text-slate-500 line-clamp-1">{row.importance}</p>
        </div>
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
          <span>{row.isActive !== false ? 'Calibrated' : 'Inactive'}</span>
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
            Quality Testing Laboratory Equipment
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage in-house testing apparatus ensuring lot test certificates and ASTM/IS compliance.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testing Apparatus</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={equipment}
        loading={loading}
        searchPlaceholder="Search testing equipment by name, standard or parameter..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => handleOpenEdit(row)}
              className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Edit Testing Equipment"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteTarget(row)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Equipment"
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
        title={editingItem.id ? `Edit: ${editingItem.name}` : 'Add Testing Apparatus'}
        subtitle="Specify test standard, measured unit, and QC importance."
        maxWidth="lg"
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
              className="px-4 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Apparatus'}</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Equipment Name"
            value={editingItem.name || ''}
            onChange={(val) => setEditingItem({ ...editingItem, name: val })}
            placeholder="e.g. Bursting Strength Tester"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Testing Standard / Calibration"
              value={editingItem.standard || ''}
              onChange={(val) => setEditingItem({ ...editingItem, standard: val })}
              placeholder="e.g. IS / ASTM Calibration"
              required
            />

            <FormField
              label="Parameter Measured"
              value={editingItem.parameterMeasured || ''}
              onChange={(val) => setEditingItem({ ...editingItem, parameterMeasured: val })}
              placeholder="e.g. Bursting Strength (kg/cm²) & BF"
              required
            />
          </div>

          <FormField
            label="Quality Importance / Prevention Role"
            type="textarea"
            rows={2}
            value={editingItem.importance || ''}
            onChange={(val) => setEditingItem({ ...editingItem, importance: val })}
            placeholder="Ensures corrugated boxes resist hydraulic bursting and internal stress during transit."
          />

          <FormField
            label="Technical Procedure Description"
            type="textarea"
            rows={2}
            value={editingItem.description || ''}
            onChange={(val) => setEditingItem({ ...editingItem, description: val })}
            placeholder="Tests the bursting pressure of paper and corrugated board to verify strength..."
          />

          {/* Photo Upload */}
          <FileUpload
            label="Laboratory Apparatus Photo"
            folder="testing"
            value={editingItem.imageUrl}
            onChange={(url) => setEditingItem({ ...editingItem, imageUrl: url })}
            helperText="Upload image of the testing equipment in lab (PNG/JPG)"
          />

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <FormField
              label="Lab Calibration Status"
              type="switch"
              value={editingItem.isActive}
              onChange={(val) => setEditingItem({ ...editingItem, isActive: val })}
            />

            <div className="w-28">
              <FormField
                label="Display Order"
                type="number"
                value={editingItem.order || 1}
                onChange={(val) => setEditingItem({ ...editingItem, order: val })}
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
        title="Delete Testing Equipment"
        message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
      />
    </div>
  );
};
