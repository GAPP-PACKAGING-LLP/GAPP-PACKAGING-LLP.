import React, { useState, useEffect } from 'react';
import { 
  FileDown, 
  Plus, 
  FileText, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  UploadCloud, 
  Download, 
  Star,
  File
} from 'lucide-react';
import { subscribeToBrochures, saveBrochure, deleteBrochure } from '../../firebase/cms';
import { CMSBrochure } from '../../types';
import { DataTable, Column } from '../../components/admin/common/DataTable';
import { ModalDrawer } from '../../components/admin/common/ModalDrawer';
import { ConfirmDialog } from '../../components/admin/common/ConfirmDialog';
import { FormField } from '../../components/admin/common/FormField';
import { FileUpload } from '../../components/admin/common/FileUpload';
import { useToast } from '../../components/admin/common/Toast';

export const BrochuresCMS: React.FC = () => {
  const { success, error } = useToast();
  const [brochures, setBrochures] = useState<CMSBrochure[]>([]);
  const [loading, setLoading] = useState(true);

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingBrochure, setEditingBrochure] = useState<Partial<CMSBrochure>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<CMSBrochure | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToBrochures((items) => {
      setBrochures(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingBrochure({
      title: '',
      description: '',
      version: 'v2026.1',
      fileUrl: '',
      storagePath: '',
      fileSize: '4.2 MB',
      isPrimary: brochures.length === 0,
      downloadCount: 0
    });
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrochure.title || !editingBrochure.fileUrl) {
      error('Validation Error', 'Brochure Title and PDF File URL/Upload are required.');
      return;
    }

    setIsSaving(true);
    try {
      await saveBrochure(editingBrochure);
      success('Brochure Saved', `Saved catalog "${editingBrochure.title}".`);
      setIsDrawerOpen(false);
    } catch (err: any) {
      error('Failed to save brochure', err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteBrochure(deleteTarget.id);
      success('Brochure Deleted', `Removed "${deleteTarget.title}".`);
      setDeleteTarget(null);
    } catch (err: any) {
      error('Failed to delete brochure', err?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<CMSBrochure>[] = [
    {
      header: 'Brochure Title & Version',
      sortable: true,
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 border border-red-100">
            <File className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-slate-800 text-xs truncate">{row.title}</h4>
              {row.isPrimary && (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                  Primary
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-mono truncate">{row.version} • {row.fileSize || 'PDF Document'}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Description',
      accessor: 'description',
      render: (row) => (
        <p className="text-xs text-slate-600 line-clamp-1 max-w-sm">
          {row.description || 'Corporate and technical specification document.'}
        </p>
      )
    },
    {
      header: 'Actions / Access',
      render: (row) => (
        <div className="flex items-center gap-2">
          <a
            href={row.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Download</span>
          </a>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800">
            Brochures & Technical Catalogs
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload PDF catalogs to Firebase Storage for visitors downloading brochures from the site.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload PDF Brochure</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={brochures}
        loading={loading}
        searchPlaceholder="Search brochures by title or version..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => {
                setEditingBrochure({ ...row });
                setIsDrawerOpen(true);
              }}
              className="p-1.5 text-slate-600 hover:text-[#0F4C5C] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Edit Brochure"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteTarget(row)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Brochure"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Upload Modal Drawer */}
      <ModalDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingBrochure.id ? `Edit: ${editingBrochure.title}` : 'Upload PDF Brochure'}
        subtitle="Attach PDF file to Firebase Storage and publish download catalog."
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
              disabled={isSaving || !editingBrochure.fileUrl}
              className="px-4 py-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Uploading...' : 'Save Brochure'}</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Brochure Catalog Title"
            value={editingBrochure.title || ''}
            onChange={(val) => setEditingBrochure({ ...editingBrochure, title: val })}
            placeholder="e.g. GAPP Packaging LLP - Corporate & Technical Profile"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Version / Release Tag"
              value={editingBrochure.version || ''}
              onChange={(val) => setEditingBrochure({ ...editingBrochure, version: val })}
              placeholder="e.g. v2026.1"
              required
            />

            <FormField
              label="Document File Size"
              value={editingBrochure.fileSize || ''}
              onChange={(val) => setEditingBrochure({ ...editingBrochure, fileSize: val })}
              placeholder="e.g. 4.2 MB"
            />
          </div>

          <FormField
            label="Catalog Summary"
            type="textarea"
            rows={2}
            value={editingBrochure.description || ''}
            onChange={(val) => setEditingBrochure({ ...editingBrochure, description: val })}
            placeholder="Complete 10-page profile covering machinery specifications, laboratory testing, and corrugated packaging products."
          />

          {/* PDF Upload */}
          <FileUpload
            label="PDF Document File"
            folder="brochures"
            accept="application/pdf"
            isImage={false}
            value={editingBrochure.fileUrl}
            onChange={(url, storagePath, fileSize) =>
              setEditingBrochure({
                ...editingBrochure,
                fileUrl: url,
                storagePath,
                fileSize: fileSize || editingBrochure.fileSize
              })
            }
            helperText="Upload official PDF brochure (Max 25MB)"
          />

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <FormField
              label="Set as Primary Website Brochure"
              type="switch"
              value={editingBrochure.isPrimary}
              onChange={(val) => setEditingBrochure({ ...editingBrochure, isPrimary: val })}
            />
          </div>
        </form>
      </ModalDrawer>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Brochure"
        message={`Are you sure you want to remove "${deleteTarget?.title}"?`}
      />
    </div>
  );
};
