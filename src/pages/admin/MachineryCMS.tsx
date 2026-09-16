import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Save, 
  Settings2,
  Gauge,
  Image as ImageIcon,
  LayoutGrid,
  List,
  ZoomIn,
  Sparkles,
  Layers,
  ArrowUpRight,
  ExternalLink,
  Wrench,
  Camera
} from 'lucide-react';
import { subscribeToMachinery, saveMachinery, deleteMachinery } from '../../firebase/cms';
import { MachineryItem } from '../../types';
import { DataTable, Column } from '../../components/admin/common/DataTable';
import { ModalDrawer } from '../../components/admin/common/ModalDrawer';
import { ConfirmDialog } from '../../components/admin/common/ConfirmDialog';
import { FormField } from '../../components/admin/common/FormField';
import { MachineryImageAttachment } from '../../components/admin/machinery/MachineryImageAttachment';
import { useToast } from '../../components/admin/common/Toast';

export const MachineryCMS: React.FC = () => {
  const { success, error } = useToast();
  const [machinery, setMachinery] = useState<MachineryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Form Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MachineryItem>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Delete Dialog
  const [deleteTarget, setDeleteTarget] = useState<MachineryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Lightbox
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const unsub = subscribeToMachinery((items) => {
      setMachinery(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const categories = Array.from(new Set(machinery.map((m) => m.category).filter(Boolean)));

  const filteredMachinery = categoryFilter === 'all' 
    ? machinery 
    : machinery.filter((m) => m.category === categoryFilter);

  const handleOpenAdd = () => {
    setEditingItem({
      name: '',
      category: 'Corrugation',
      description: '',
      importance: 'Core manufacturing unit',
      capacity: 'High-speed automated production',
      speed: 'Semi-automatic continuous line',
      model: '',
      imageUrl: '',
      galleryImages: [],
      imageCaption: '',
      isActive: true,
      order: machinery.length + 1
    });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (item: MachineryItem) => {
    setEditingItem({ 
      ...item,
      galleryImages: item.galleryImages || []
    });
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.name || !editingItem.category) {
      error('Validation Error', 'Machinery Name and Category are required.');
      return;
    }

    setIsSaving(true);
    try {
      await saveMachinery(editingItem);
      success('Machinery Saved', `Updated "${editingItem.name}" and attached photos in plant records.`);
      setIsDrawerOpen(false);
    } catch (err: any) {
      error('Failed to save machinery', err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteMachinery(deleteTarget.id);
      success('Machinery Deleted', `Removed "${deleteTarget.name}".`);
      setDeleteTarget(null);
    } catch (err: any) {
      error('Failed to delete machinery', err?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<MachineryItem>[] = [
    {
      header: 'Machinery Unit & Photo',
      sortable: true,
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.imageUrl ? (
            <div 
              className="relative group cursor-pointer shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage({ url: row.imageUrl!, title: row.name });
              }}
            >
              <img
                src={row.imageUrl}
                alt={row.name}
                className="w-12 h-12 rounded-lg object-cover border border-slate-200 bg-slate-50 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-100">
              <Cpu className="w-5 h-5" />
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-bold text-slate-800 text-xs truncate max-w-[220px]">{row.name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                {row.category}
              </span>
              {row.galleryImages && row.galleryImages.length > 0 && (
                <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Layers className="w-2.5 h-2.5" />
                  <span>+{row.galleryImages.length} angles</span>
                </span>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Technical Specifications',
      accessor: 'model',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          {row.model && <p className="font-semibold text-slate-800 truncate">{row.model}</p>}
          {row.capacity && <p className="text-[11px] text-slate-500 font-mono">Cap: {row.capacity}</p>}
          {row.speed && <p className="text-[11px] text-slate-500 font-mono">Speed: {row.speed}</p>}
        </div>
      )
    },
    {
      header: 'Operational Role',
      accessor: 'importance',
      render: (row) => (
        <div className="space-y-0.5 max-w-xs">
          <p className="text-xs text-slate-700 line-clamp-2">{row.description}</p>
          {row.importance && (
            <p className="text-[10px] text-[#0F4C5C] font-semibold">Role: {row.importance}</p>
          )}
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
          <span>{row.isActive !== false ? 'Installed' : 'Maintenance'}</span>
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6" id="machinery-cms-view">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900">
              Manufacturing Machinery & Photos
            </h2>
            <span className="text-xs font-mono font-bold bg-[#0F4C5C]/10 text-[#0F4C5C] px-2 py-0.5 rounded-full">
              {machinery.length} Units
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage conversion lines, attach high-resolution factory photos, upload machinery angles, and configure specs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'cards'
                  ? 'bg-white text-[#0F4C5C] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Visual Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'table'
                  ? 'bg-white text-[#0F4C5C] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Table List</span>
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#0F4C5C] hover:bg-[#0c3c49] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Machinery Item</span>
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          type="button"
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
            categoryFilter === 'all'
              ? 'bg-[#0F4C5C] text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          All Machineries ({machinery.length})
        </button>

        {categories.map((cat) => {
          const count = machinery.filter((m) => m.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                categoryFilter === cat
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                categoryFilter === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Visual Cards View Mode */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMachinery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Machine Photo Header */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-800 space-y-2 p-4 text-center">
                    <ImageIcon className="w-8 h-8 text-slate-500" />
                    <span className="text-xs">No machine photo attached</span>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="text-[11px] font-bold text-teal-400 hover:underline flex items-center gap-1"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Attach Photo Now</span>
                    </button>
                  </div>
                )}

                {/* Top overlay badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-1">
                    {item.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewImage({ url: item.imageUrl!, title: item.name })}
                        className="p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-xs transition-colors cursor-pointer"
                        title="View Full Resolution"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                        item.isActive !== false
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {item.isActive !== false ? 'Installed' : 'Maintenance'}
                    </span>
                  </div>
                </div>

                {/* Caption / Location pill */}
                {item.imageCaption && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-[10px] text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded font-mono truncate block max-w-full">
                      📍 {item.imageCaption}
                    </span>
                  </div>
                )}
              </div>

              {/* Machine Details Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#0F4C5C] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Specs Pill Box */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block text-[9px] uppercase">Speed / Rate</span>
                      <span className="font-semibold text-slate-800 truncate block">
                        {item.speed || item.capacity || 'Continuous Line'}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block text-[9px] uppercase">Role</span>
                      <span className="font-semibold text-[#0F4C5C] truncate block">
                        {item.importance || 'Manufacturing'}
                      </span>
                    </div>
                  </div>

                  {item.galleryImages && item.galleryImages.length > 0 && (
                    <div className="flex items-center gap-1 text-[10px] text-teal-700 bg-teal-50 px-2 py-1 rounded-md">
                      <Layers className="w-3 h-3" />
                      <span>{item.galleryImages.length} additional angle photos attached</span>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="text-xs font-bold text-[#0F4C5C] hover:text-[#0A3642] flex items-center gap-1.5 cursor-pointer py-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Specs & Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Machine"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View Mode */}
      {viewMode === 'table' && (
        <DataTable
          columns={columns}
          data={filteredMachinery}
          loading={loading}
          searchPlaceholder="Search machine by name, category, or specs..."
          actions={(row) => (
            <div className="flex items-center justify-end gap-1.5">
              <button
                onClick={() => handleOpenEdit(row)}
                className="p-1.5 text-slate-600 hover:text-[#0F4C5C] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Edit Machinery & Photos"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTarget(row)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Delete Machinery"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        />
      )}

      {/* Add / Edit Modal Drawer */}
      <ModalDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingItem.id ? `Edit: ${editingItem.name}` : 'Add New Plant Machine'}
        subtitle="Upload machine photos, configure speed/capacity, and operational roles."
        maxWidth="xl"
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
              <span>{isSaving ? 'Saving...' : 'Save Machine & Photos'}</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Machine Name"
            value={editingItem.name || ''}
            onChange={(val) => setEditingItem({ ...editingItem, name: val })}
            placeholder="e.g. High speed fingerless Corrugation machine"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Process Category"
              value={editingItem.category || ''}
              onChange={(val) => setEditingItem({ ...editingItem, category: val })}
              placeholder="e.g. Corrugation, Printing, Slotting"
              required
            />

            <FormField
              label="Operational Importance / Role"
              value={editingItem.importance || ''}
              onChange={(val) => setEditingItem({ ...editingItem, importance: val })}
              placeholder="e.g. Core corrugating production"
            />
          </div>

          <FormField
            label="Technical Description"
            type="textarea"
            rows={2}
            value={editingItem.description || ''}
            onChange={(val) => setEditingItem({ ...editingItem, description: val })}
            placeholder="Describe functionality, uniform fluting, speed, and board quality..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Capacity / Output"
              value={editingItem.capacity || ''}
              onChange={(val) => setEditingItem({ ...editingItem, capacity: val })}
              placeholder="e.g. 80 - 100 meters/min or 4,000 sheets/hour"
            />

            <FormField
              label="Speed / Model"
              value={editingItem.speed || ''}
              onChange={(val) => setEditingItem({ ...editingItem, speed: val })}
              placeholder="e.g. Semi-Automatic Continuous Line 52 inch"
            />
          </div>

          {/* DEDICATED FULL-FEATURED MACHINERY IMAGE ATTACHMENT */}
          <MachineryImageAttachment
            primaryImageUrl={editingItem.imageUrl}
            galleryImages={editingItem.galleryImages}
            imageCaption={editingItem.imageCaption}
            machineName={editingItem.name || 'Plant Machinery'}
            onPrimaryImageChange={(url, storagePath, fileSize) => {
              setEditingItem({
                ...editingItem,
                imageUrl: url,
                storagePath,
                fileSize
              });
            }}
            onGalleryImagesChange={(urls) => {
              setEditingItem({
                ...editingItem,
                galleryImages: urls
              });
            }}
            onImageCaptionChange={(caption) => {
              setEditingItem({
                ...editingItem,
                imageCaption: caption
              });
            }}
          />

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <FormField
              label="Operational Status (Installed & Active)"
              type="switch"
              value={editingItem.isActive !== false}
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

      {/* Global Image Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 text-white border-b border-slate-800 px-2">
              <span className="text-xs font-bold">{previewImage.title}</span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-2 max-h-[75vh] flex items-center justify-center overflow-auto">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Machinery Record"
        message={`Are you sure you want to remove "${deleteTarget?.name}" and its attached photos?`}
      />
    </div>
  );
};
