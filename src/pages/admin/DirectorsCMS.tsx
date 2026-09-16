import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Search, 
  ArrowUpDown, 
  CheckCircle2, 
  XCircle,
  Building2,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { 
  subscribeToDirectors, 
  saveDirector, 
  deleteDirector, 
  DEFAULT_DIRECTORS 
} from '../../firebase/cms';
import { DirectorItem } from '../../types';
import { FormField } from '../../components/admin/common/FormField';
import { FileUpload } from '../../components/admin/common/FileUpload';
import { ModalDrawer } from '../../components/admin/common/ModalDrawer';
import { ConfirmDialog } from '../../components/admin/common/ConfirmDialog';
import { useToast } from '../../components/admin/common/Toast';

export const DirectorsCMS: React.FC = () => {
  const { success, error } = useToast();
  const [directors, setDirectors] = useState<DirectorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Drawer / Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDirector, setEditingDirector] = useState<Partial<DirectorItem> | null>(null);
  const [saving, setSaving] = useState(false);

  // Delete dialog state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string>('');

  useEffect(() => {
    const unsub = subscribeToDirectors((items) => {
      setDirectors(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingDirector({
      name: '',
      role: 'Designated Partner',
      din: '',
      photoUrl: '',
      phone: '+91 ',
      email: 'industriesgapp@gmail.com',
      bio: '',
      order: directors.length + 1,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: DirectorItem) => {
    setEditingDirector({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDirector?.name?.trim()) {
      error('Validation error', 'Please enter director or partner name.');
      return;
    }
    if (!editingDirector?.role?.trim()) {
      error('Validation error', 'Please specify role or designation.');
      return;
    }

    setSaving(true);
    try {
      await saveDirector(editingDirector);
      success(
        editingDirector.id ? 'Director Updated' : 'Director Added',
        `${editingDirector.name} saved to company leadership profiles.`
      );
      setIsModalOpen(false);
      setEditingDirector(null);
    } catch (err: any) {
      error('Failed to save director', err?.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      await deleteDirector(deletingId);
      success('Director Removed', `${deletingName} removed from leadership list.`);
      setDeletingId(null);
    } catch (err: any) {
      error('Failed to delete director', err?.message);
    }
  };

  const handleResetDefaults = async () => {
    try {
      for (const d of DEFAULT_DIRECTORS) {
        await saveDirector(d);
      }
      success('Reset Successful', 'Default Designated Partners profiles restored.');
    } catch (err: any) {
      error('Reset failed', err?.message);
    }
  };

  const filteredDirectors = directors.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      d.name?.toLowerCase().includes(q) ||
      d.role?.toLowerCase().includes(q) ||
      d.din?.toLowerCase().includes(q) ||
      d.phone?.toLowerCase().includes(q) ||
      d.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-primary" />
              <span>Directors & Key Management CMS</span>
            </h2>
            <span className="bg-cyan-100 text-brand-primary text-xs font-bold px-2 py-0.5 rounded-full border border-cyan-200">
              {directors.length} Profiles
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage Designated Partners, Managing Directors, DIN registration, photographs, and executive contact credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {directors.length === 0 && (
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Load Default Partners</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-2 cursor-pointer"
            id="add-director-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Add Director / Partner</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search director name, DIN, role, or phone..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-brand-primary focus:bg-white text-slate-800"
          />
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Displayed on About Page, Corporate PDF Brochure & Official Inquiries Desk</span>
        </div>
      </div>

      {/* Directors Cards Grid */}
      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
          Loading leadership team from database...
        </div>
      ) : filteredDirectors.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-sm font-bold text-slate-700">No directors found</div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click "Add Director / Partner" to add company directors, partners, DIN numbers, and photos.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-lg cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Director</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDirectors.map((director) => (
            <div
              key={director.id}
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-2xs hover:shadow-md flex flex-col justify-between ${
                director.isActive ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50'
              }`}
            >
              <div>
                {/* Card Top Banner / Photo Header */}
                <div className="p-5 flex items-start gap-4 border-b border-slate-100">
                  <div className="relative shrink-0">
                    {director.photoUrl ? (
                      <img
                        src={director.photoUrl}
                        alt={director.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-2xs"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-linear-to-br from-brand-primary to-[#0A2540] text-white flex items-center justify-center font-black text-xl shadow-2xs">
                        {director.name.charAt(0)}
                      </div>
                    )}
                    {director.isActive ? (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Active on Website" />
                    ) : (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-slate-400 border-2 border-white rounded-full" title="Hidden" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-extrabold text-slate-800 truncate" title={director.name}>
                        {director.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        #{director.order || 1}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-brand-primary mt-0.5 truncate" title={director.role}>
                      {director.role}
                    </p>

                    {director.din && (
                      <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        <span>DIN: {director.din}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3 text-xs">
                  {director.bio && (
                    <p className="text-slate-600 leading-relaxed text-[11px] line-clamp-3 italic">
                      "{director.bio}"
                    </p>
                  )}

                  <div className="space-y-1.5 pt-1 border-t border-slate-100 text-slate-600">
                    {director.phone && (
                      <div className="flex items-center gap-2 text-[11px]">
                        <Phone className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                        <span className="font-mono">{director.phone}</span>
                      </div>
                    )}
                    {director.email && (
                      <div className="flex items-center gap-2 text-[11px]">
                        <Mail className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                        <span className="truncate">{director.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  {director.isActive ? (
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Live on site</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-400">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Draft / Hidden</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(director)}
                    className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer"
                    title="Edit Director"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeletingId(director.id);
                      setDeletingName(director.name);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Director"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Director Modal Drawer */}
      <ModalDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDirector?.id ? 'Edit Director / Designated Partner' : 'Add New Director / Partner'}
      >
        {editingDirector && (
          <form onSubmit={handleSave} className="space-y-4">
            <FormField
              label="Full Name"
              value={editingDirector.name || ''}
              onChange={(val) => setEditingDirector({ ...editingDirector, name: val })}
              placeholder="e.g. Ashish Barkhade"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Role / Designation"
                value={editingDirector.role || ''}
                onChange={(val) => setEditingDirector({ ...editingDirector, role: val })}
                placeholder="e.g. Designated Partner & Plant Head"
                required
              />

              <FormField
                label="DIN (Director Identification No.)"
                value={editingDirector.din || ''}
                onChange={(val) => setEditingDirector({ ...editingDirector, din: val })}
                placeholder="e.g. 08892140 (Optional)"
              />
            </div>

            {/* Photo Upload */}
            <FileUpload
              label="Director Photograph / Portrait"
              folder="directors"
              value={editingDirector.photoUrl || ''}
              onChange={(url) => setEditingDirector({ ...editingDirector, photoUrl: url })}
              helperText="Upload official portrait image (JPG or PNG)"
              isImage={true}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Contact Phone / Mobile"
                value={editingDirector.phone || ''}
                onChange={(val) => setEditingDirector({ ...editingDirector, phone: val })}
                placeholder="e.g. +91 9806419199"
              />

              <FormField
                label="Official Email Address"
                value={editingDirector.email || ''}
                onChange={(val) => setEditingDirector({ ...editingDirector, email: val })}
                placeholder="e.g. industriesgapp@gmail.com"
              />
            </div>

            <FormField
              label="Executive Bio & Key Responsibilities"
              type="textarea"
              rows={3}
              value={editingDirector.bio || ''}
              onChange={(val) => setEditingDirector({ ...editingDirector, bio: val })}
              placeholder="Brief summary of their technical background, plant responsibilities, or customer leadership..."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <FormField
                label="Display Order Index"
                type="number"
                value={editingDirector.order ?? 1}
                onChange={(val) => setEditingDirector({ ...editingDirector, order: Number(val) })}
                helperText="Controls position in leadership list (1 = top)"
              />

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Publication Status</label>
                <button
                  type="button"
                  onClick={() => setEditingDirector({ ...editingDirector, isActive: !editingDirector.isActive })}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors border ${
                    editingDirector.isActive
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                >
                  {editingDirector.isActive ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-slate-400" />}
                  <span>{editingDirector.isActive ? 'Active (Visible on Website)' : 'Draft (Hidden from Public)'}</span>
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                <span>{saving ? 'Saving...' : 'Save Director Profile'}</span>
              </button>
            </div>
          </form>
        )}
      </ModalDrawer>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Director Profile?"
        message={`Are you sure you want to delete ${deletingName} from leadership team? This will remove them from the website.`}
        confirmText="Yes, Delete Profile"
        isDanger={true}
      />
    </div>
  );
};
