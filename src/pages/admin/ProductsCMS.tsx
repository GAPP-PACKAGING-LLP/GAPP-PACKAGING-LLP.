import React, { useState, useEffect } from 'react';
import { 
  Boxes, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Save, 
  Eye,
  Loader2, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  ExternalLink,
  X, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { subscribeToProducts, saveProduct, deleteProduct } from '../../firebase/cms';
import { ProductItem } from '../../types';
import { DataTable, Column } from '../../components/admin/common/DataTable';
import { ModalDrawer } from '../../components/admin/common/ModalDrawer';
import { ConfirmDialog } from '../../components/admin/common/ConfirmDialog';
import { FormField } from '../../components/admin/common/FormField';
import { FileUpload } from '../../components/admin/common/FileUpload';
import { useToast } from '../../components/admin/common/Toast';
import { useAuth } from '../../hooks/useAuth';

const CATEGORY_OPTIONS = [
  { label: '3-Ply Corrugated', value: '3-ply' },
  { label: '5-Ply Master Carton', value: '5-ply' },
  { label: '7-Ply Heavy Duty', value: '7-ply' },
  { label: 'Die-Cut Box', value: 'die-cut' },
  { label: 'Two Colour Flexo Printed', value: 'printed' },
  { label: 'Heavy Duty Stitched', value: 'heavy-duty' },
  { label: 'Packaging Accessories', value: 'accessories' }
];

export const ProductsCMS: React.FC = () => {
  const { success, error } = useToast();
  const { user, isAdmin } = useAuth();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToProducts((items) => {
      setProducts(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct({
      name: '',
      category: '5-ply',
      fluteTypes: 'Single Wall / Double Wall',
      burstingFactor: 'Tested on In-house Bursting Strength Tester',
      gsmRange: 'Verified via In-house Grammage Tester',
      loadCapacity: 'Customized to client requirements',
      description: '',
      features: ['Zero-discharge manufacturing', '100% recyclable Kraft board'],
      applications: ['Retail', 'Pharma', 'Industrial'],
      layerStructure: 'Kraft Liner + Fluted Wave + Inner Liner',
      imageHint: 'Corrugated box',
      imageUrl: '',
      isActive: true,
      order: products.length + 1
    });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (prod: ProductItem) => {
    setEditingProduct({ ...prod });
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Require logged-in admin
    if (!user && !isAdmin) {
      const authErr = 'Admin authentication required. Please log in to save products.';
      console.error('Firebase product save error:', authErr);
      error('Authentication Error', authErr);
      return;
    }

    if (!editingProduct.name?.trim() || !editingProduct.description?.trim()) {
      error('Validation Error', 'Product Name and Description are required.');
      return;
    }

    const trimmedUrl = (editingProduct.imageUrl || '').trim();
    if (!trimmedUrl) {
      error('Validation Error', 'Product Image is required. Please upload a photo or paste a URL.');
      return;
    }

    setIsSaving(true);
    try {
      await saveProduct({
        ...editingProduct,
        imageUrl: trimmedUrl
      });
      success('Product Saved', `Successfully saved "${editingProduct.name}" to Firestore.`);
      setIsDrawerOpen(false);
    } catch (err: any) {
      console.error('Firebase product save error:', err);
      error('Failed to save product', err?.message || 'Firestore write error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    if (!user && !isAdmin) {
      const authErr = 'Admin authentication required. Please log in to delete products.';
      console.error('Firebase product delete error:', authErr);
      error('Authentication Error', authErr);
      return;
    }

    setIsDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
      success('Product Deleted', `Removed "${deleteTarget.name}" from catalog.`);
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Firebase product delete error:', err);
      error('Failed to delete product', err?.message || 'Firestore delete error.');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<ProductItem>[] = [
    {
      header: 'Product Name & Category',
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
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-brand-primary flex items-center justify-center font-bold text-xs shrink-0 border border-teal-100">
              <Boxes className="w-5 h-5" />
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-bold text-slate-800 text-xs truncate">{row.name}</h4>
            <span className="text-[10px] font-mono text-brand-primary bg-teal-50 px-1.5 py-0.5 rounded">
              {row.category?.toUpperCase()}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Flute & Specs',
      accessor: 'fluteTypes',
      render: (row) => (
        <div className="space-y-0.5 max-w-xs">
          <p className="text-xs text-slate-700 truncate font-medium">{row.fluteTypes}</p>
          <p className="text-[10px] text-slate-400 font-mono truncate">{row.layerStructure}</p>
        </div>
      )
    },
    {
      header: 'Applications',
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {(row.applications || []).slice(0, 2).map((app, idx) => (
            <span
              key={idx}
              className="bg-slate-100 text-slate-600 text-[10px] font-medium px-1.5 py-0.5 rounded truncate"
            >
              {app}
            </span>
          ))}
          {(row.applications || []).length > 2 && (
            <span className="text-[10px] text-slate-400 font-mono">
              +{row.applications.length - 2}
            </span>
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
          <span>{row.isActive !== false ? 'Active' : 'Hidden'}</span>
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
            Corrugated Packaging Products
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage corrugated boxes, master shippers, flexo printed cartons, and technical ply specifications.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        searchPlaceholder="Search product by name, category, or flute..."
        searchFilter={(item, q) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.fluteTypes || '').toLowerCase().includes(q)
        }
        actions={(row) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => handleOpenEdit(row)}
              className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Edit Product"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteTarget(row)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Product"
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
        title={editingProduct.id ? `Edit: ${editingProduct.name}` : 'Add New Packaging Offering'}
        subtitle="Specify product attributes, ply configuration, and testing criteria."
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
              className="px-4 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Product'}</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Product Name"
              value={editingProduct.name || ''}
              onChange={(val) => setEditingProduct({ ...editingProduct, name: val })}
              placeholder="e.g. 5-Ply Heavy Master Carton"
              required
            />

            <FormField
              label="Category"
              type="select"
              options={CATEGORY_OPTIONS}
              value={editingProduct.category || '5-ply'}
              onChange={(val) => setEditingProduct({ ...editingProduct, category: val })}
              required
            />
          </div>

          <FormField
            label="Description"
            type="textarea"
            rows={3}
            value={editingProduct.description || ''}
            onChange={(val) => setEditingProduct({ ...editingProduct, description: val })}
            placeholder="Comprehensive description of the box grade, durability, and use cases..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Flute Types / Walls"
              value={editingProduct.fluteTypes || ''}
              onChange={(val) => setEditingProduct({ ...editingProduct, fluteTypes: val })}
              placeholder="e.g. Single Wall, Double Wall, B/C/E Flute"
            />

            <FormField
              label="Bursting Factor / Strength"
              value={editingProduct.burstingFactor || ''}
              onChange={(val) => setEditingProduct({ ...editingProduct, burstingFactor: val })}
              placeholder="e.g. Tested on In-house Bursting Strength Tester"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="GSM Range / Paper Weight"
              value={editingProduct.gsmRange || ''}
              onChange={(val) => setEditingProduct({ ...editingProduct, gsmRange: val })}
              placeholder="e.g. Verified via Grammage Tester (120 - 250 GSM)"
            />

            <FormField
              label="Load Capacity"
              value={editingProduct.loadCapacity || ''}
              onChange={(val) => setEditingProduct({ ...editingProduct, loadCapacity: val })}
              placeholder="e.g. Up to 35 kg payload"
            />
          </div>

          <FormField
            label="Layer Structure"
            value={editingProduct.layerStructure || ''}
            onChange={(val) => setEditingProduct({ ...editingProduct, layerStructure: val })}
            placeholder="e.g. Kraft Liner + High-Strength Fluted Wave + Inner Liner"
          />

          <FormField
            label="Key Features (Comma separated)"
            type="tags"
            value={editingProduct.features || []}
            onChange={(val) => setEditingProduct({ ...editingProduct, features: val })}
            placeholder="Zero-discharge process, 100% recyclable, Lot test certificate"
          />

          <FormField
            label="Applications / Target Sectors (Comma separated)"
            type="tags"
            value={editingProduct.applications || []}
            onChange={(val) => setEditingProduct({ ...editingProduct, applications: val })}
            placeholder="Pharma, Retail, Engineering, Confectionery"
          />

          {/* Product Image Upload & URL with compression */}
          <FileUpload
            label="Product Photo / Technical CAD"
            folder="products"
            value={editingProduct.imageUrl || ''}
            onChange={(url) => setEditingProduct({ ...editingProduct, imageUrl: url })}
            helperText="Upload JPG/PNG box photo (auto-compressed) or paste ImageKit CDN URL"
            isImage={true}
          />

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <FormField
              label="Publish Status"
              type="switch"
              value={editingProduct.isActive}
              onChange={(val) => setEditingProduct({ ...editingProduct, isActive: val })}
            />

            <div className="w-28">
              <FormField
                label="Sort Order"
                type="number"
                value={editingProduct.order || 1}
                onChange={(val) => setEditingProduct({ ...editingProduct, order: val })}
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
        title="Delete Product"
        message={`Are you sure you want to remove "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};
