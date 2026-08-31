import React, { useState, useEffect } from 'react';
import { 
  Image as GalleryIcon, 
  Plus, 
  Trash2, 
  Eye, 
  UploadCloud, 
  Layers, 
  Tag, 
  Calendar,
  ExternalLink
} from 'lucide-react';
import { subscribeToGallery, saveGalleryItem, deleteGalleryItem } from '../../firebase/cms';
import { CMSGalleryItem } from '../../types';
import { ModalDrawer } from '../../components/admin/common/ModalDrawer';
import { ConfirmDialog } from '../../components/admin/common/ConfirmDialog';
import { FormField } from '../../components/admin/common/FormField';
import { FileUpload } from '../../components/admin/common/FileUpload';
import { useToast } from '../../components/admin/common/Toast';

export const GalleryCMS: React.FC = () => {
  const { success, error } = useToast();
  const [gallery, setGallery] = useState<CMSGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<CMSGalleryItem>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Preview Modal
  const [previewImage, setPreviewImage] = useState<CMSGalleryItem | null>(null);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<CMSGalleryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToGallery((items) => {
      setGallery(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredGallery = selectedCategory === 'all'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      caption: '',
      category: 'plant',
      imageUrl: '',
      storagePath: '',
      order: gallery.length + 1
    });
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title || !editingItem.imageUrl) {
      error('Validation Error', 'Image Title and Image File are required.');
      return;
    }

    setIsSaving(true);
    try {
      await saveGalleryItem(editingItem);
      success('Image Saved', `Uploaded "${editingItem.title}" to gallery.`);
      setIsDrawerOpen(false);
    } catch (err: any) {
      error('Failed to save image', err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteGalleryItem(deleteTarget.id, deleteTarget.storagePath);
      success('Image Deleted', `Removed "${deleteTarget.title}".`);
      setDeleteTarget(null);
    } catch (err: any) {
      error('Failed to delete image', err?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800">
            Plant & Facility Photo Gallery
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload and manage photos of the Mandideep corrugation plant, machinery, testing lab, and warehouse.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Image</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'plant', 'machinery', 'products', 'testing', 'warehouse'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#0F4C5C] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs font-mono">
          Loading plant gallery photos...
        </div>
      ) : filteredGallery.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <GalleryIcon className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-700">No images in this category</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click &quot;Upload New Image&quot; to add facility photos directly to Firebase Storage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col group hover:border-[#0F4C5C] transition-all"
            >
              {/* Image Thumbnail with Overlay */}
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPreviewImage(item)}
                    className="p-2 bg-white/90 hover:bg-white text-slate-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                    title="Preview Image"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              {/* Card Meta */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-800 truncate">{item.title}</h4>
                  {item.caption && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.caption}</p>
                  )}
                </div>
                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal Drawer */}
      <ModalDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Upload Plant Image"
        subtitle="Upload facility or equipment photos to Firebase Storage and publish to gallery."
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
              disabled={isSaving || !editingItem.imageUrl}
              className="px-4 py-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Uploading...' : 'Publish Image'}</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Image Title"
            value={editingItem.title || ''}
            onChange={(val) => setEditingItem({ ...editingItem, title: val })}
            placeholder="e.g. High-Speed Corrugation Line in Operation"
            required
          />

          <FormField
            label="Category"
            type="select"
            options={[
              { label: 'Plant & Infrastructure', value: 'plant' },
              { label: 'Machinery & Corrugators', value: 'machinery' },
              { label: 'Packaging Products', value: 'products' },
              { label: 'Testing Laboratory', value: 'testing' },
              { label: 'Warehouse & Dispatch', value: 'warehouse' }
            ]}
            value={editingItem.category || 'plant'}
            onChange={(val) => setEditingItem({ ...editingItem, category: val })}
            required
          />

          <FormField
            label="Caption / Description"
            type="textarea"
            rows={2}
            value={editingItem.caption || ''}
            onChange={(val) => setEditingItem({ ...editingItem, caption: val })}
            placeholder="e.g. Continuous corrugated sheet converting line at Mandideep unit."
          />

          {/* Direct Firebase Storage Upload */}
          <FileUpload
            label="Photo File (Upload to Firebase Storage)"
            folder="gallery"
            value={editingItem.imageUrl}
            onChange={(url, storagePath, fileSize) =>
              setEditingItem({
                ...editingItem,
                imageUrl: url,
                storagePath,
                fileSize
              })
            }
            helperText="Supports PNG, JPG, WebP up to 25MB"
          />
        </form>
      </ModalDrawer>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl border border-slate-700 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/10 bg-slate-900">
              <img
                src={previewImage.imageUrl}
                alt={previewImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-800">{previewImage.title}</h3>
                <p className="text-xs text-slate-500">{previewImage.caption}</p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Close
              </button>
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
        title="Delete Gallery Image"
        message={`Are you sure you want to remove "${deleteTarget?.title}" from the gallery?`}
      />
    </div>
  );
};
