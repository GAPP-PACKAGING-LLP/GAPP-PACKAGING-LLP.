import React, { useState } from 'react';
import { 
  UploadCloud, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ZoomIn, 
  Plus, 
  Trash2, 
  Star,
  ExternalLink,
  Layers
} from 'lucide-react';
import { compressImageFile } from '../../../utils/imageCompressor';

export interface PresetMachineImage {
  id: string;
  name: string;
  category: string;
  url: string;
  description: string;
}

export const PRESET_MACHINERY_IMAGES: PresetMachineImage[] = [
  {
    id: 'corrugator-1',
    name: '52" High Speed Fingerless Corrugator',
    category: 'Corrugation',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    description: 'High-speed heavy single-facer corrugating line'
  },
  {
    id: 'flexo-printer-1',
    name: 'Two Colour Flexo Printing Line',
    category: 'Printing',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Two-colour ceramic anilox flexo printer slotter'
  },
  {
    id: 'pasting-machine-1',
    name: 'Multi-Ply Industrial Sheet Pasting Machine',
    category: 'Pasting & Assembly',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    description: 'Multi-ply sheet gluing & laminating line'
  },
  {
    id: 'hydraulic-press-1',
    name: 'Hydraulic Platen Sheet Pressing Machine',
    category: 'Pressing',
    url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    description: 'Hydraulic heavy platen sheet compression unit'
  },
  {
    id: 'thin-blade-slitter-1',
    name: 'Thin Blade Rotary Slitter & Scorer',
    category: 'Slitting & Scoring',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Thin blade tungsten alloy precision rotary scorer'
  },
  {
    id: 'eccentric-slotter-1',
    name: 'Industrial Heavy Eccentric Slotter',
    category: 'Slotting',
    url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    description: 'Corner notch & flap slotting machinery'
  },
  {
    id: 'rotary-slotter-1',
    name: '4-Bar Combined Rotary Slotter & Creaser',
    category: 'Rotary Slotting',
    url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80',
    description: '4-bar rotary creasing & carton cutting equipment'
  },
  {
    id: 'wire-stitcher-1',
    name: '48" Heavy Angular Wire Stitching Machine',
    category: 'Stitching & Binding',
    url: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80',
    description: 'Heavy duty box joint wire stitcher'
  },
  {
    id: 'flap-gluer-1',
    name: 'Semi-Automatic Flap Pasting Machine',
    category: 'Finishing & Pasting',
    url: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
    description: 'Rapid box joint gluing & folding machine'
  },
  {
    id: 'drying-tunnel-1',
    name: 'Controlled Board Drying Chamber',
    category: 'Conditioning & Drying',
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
    description: 'Controlled temperature starch curing tunnel'
  },
  {
    id: 'paper-cutter-1',
    name: 'Industrial Heavy Paper Guillotine Cutter',
    category: 'Cutting',
    url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    description: 'High precision hydraulic sheet guillotine'
  },
  {
    id: 'platform-scale-1',
    name: '3000kg Heavy Industrial Platform Scale',
    category: 'Quality Assurance & Inward',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Inward paper reel weight & GSM verification'
  }
];

interface MachineryImageAttachmentProps {
  primaryImageUrl?: string;
  galleryImages?: string[];
  imageCaption?: string;
  onPrimaryImageChange: (url: string, storagePath?: string, fileSize?: string) => void;
  onGalleryImagesChange?: (urls: string[]) => void;
  onImageCaptionChange?: (caption: string) => void;
  machineName?: string;
}

export const MachineryImageAttachment: React.FC<MachineryImageAttachmentProps> = ({
  primaryImageUrl,
  galleryImages = [],
  imageCaption = '',
  onPrimaryImageChange,
  onGalleryImagesChange,
  onImageCaptionChange,
  machineName = 'Machinery'
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'presets' | 'upload'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const [showAddGalleryUrl, setShowAddGalleryUrl] = useState(false);
  const [urlPreviewError, setUrlPreviewError] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);

  // Handle local file upload with instant compression
  const handleFileUpload = async (file: File, isGalleryItem = false) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(50);

    try {
      const res = await compressImageFile(file, 1200, 1200, 0.85);
      setUploadProgress(100);

      if (isGalleryItem) {
        if (onGalleryImagesChange) {
          onGalleryImagesChange([...galleryImages, res.dataUrl]);
        }
      } else {
        onPrimaryImageChange(res.dataUrl, '', `${res.compressedSizeKb} KB`);
      }
    } catch (err: any) {
      console.error('Machinery photo processing failed:', err);
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (isGalleryItem) {
          if (onGalleryImagesChange) {
            onGalleryImagesChange([...galleryImages, base64]);
          }
        } else {
          onPrimaryImageChange(base64);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleApplyUrl = () => {
    const trimmed = customUrlInput.trim();
    if (!trimmed) return;
    onPrimaryImageChange(trimmed);
    setCustomUrlInput('');
  };

  const handleApplyGalleryUrl = () => {
    const trimmed = galleryUrlInput.trim();
    if (!trimmed) return;
    if (onGalleryImagesChange) {
      onGalleryImagesChange([...galleryImages, trimmed]);
    }
    setGalleryUrlInput('');
    setShowAddGalleryUrl(false);
  };

  const handleSelectPreset = (presetUrl: string) => {
    onPrimaryImageChange(presetUrl);
  };

  const handleRemovePrimary = () => {
    onPrimaryImageChange('');
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    if (onGalleryImagesChange) {
      const updated = galleryImages.filter((_, idx) => idx !== indexToRemove);
      onGalleryImagesChange(updated);
    }
  };

  const handleSetGalleryAsPrimary = (url: string, index: number) => {
    const oldPrimary = primaryImageUrl;
    onPrimaryImageChange(url);
    if (onGalleryImagesChange) {
      const updated = [...galleryImages];
      if (oldPrimary) {
        updated[index] = oldPrimary;
      } else {
        updated.splice(index, 1);
      }
      onGalleryImagesChange(updated);
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4" id="machinery-image-attachment-box">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-brand-primary" />
            <span>Machinery Image & Photo Attachment</span>
          </label>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Attach high-definition photos of this machine for public plant infrastructure showcase.
          </p>
        </div>

        {primaryImageUrl && (
          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Photo Attached
          </span>
        )}
      </div>

      {/* Primary Image Preview Box if attached */}
      {primaryImageUrl ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shadow-xs">
          <div className="aspect-video w-full max-h-56 bg-slate-950 flex items-center justify-center overflow-hidden">
            <img
              src={primaryImageUrl}
              alt={machineName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setUrlPreviewError(true)}
            />
          </div>

          {/* Overlay controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 p-3 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold bg-brand-primary text-white px-2 py-0.5 rounded shadow">
                Primary Machine Photo
              </span>
              
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setLightboxUrl(primaryImageUrl)}
                  className="p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-colors cursor-pointer"
                  title="View Full Resolution"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleRemovePrimary}
                  className="p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
                  title="Remove Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-white space-y-1">
              <p className="text-xs font-bold truncate drop-shadow">{machineName}</p>
              <p className="text-[10px] text-slate-300 truncate font-mono">
                {primaryImageUrl.length > 60 ? primaryImageUrl.substring(0, 57) + '...' : primaryImageUrl}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Attachment Method Tabs */}
      <div className="space-y-3">
        <div className="flex items-center gap-1 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'bg-brand-primary text-white'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Image Web URL (ImageKit / CDN)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'presets'
                ? 'bg-brand-primary text-white'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Plant Preset Library</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-brand-primary text-white'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
        </div>

        {/* TAB 1: WEB URL INPUT */}
        {activeTab === 'url' && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://ik.imagekit.io/your_id/corrugator-machine.jpg"
                className="flex-1 text-xs font-mono p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                disabled={!customUrlInput.trim()}
                className="px-4 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Apply Photo</span>
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>💡 Direct HTTPS URL from ImageKit, Cloudinary, AWS S3, or Imgur.</span>
              {customUrlInput.trim() && (
                <span className="text-teal-700 font-medium font-mono text-[10px]">URL Ready</span>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PLANT PRESET LIBRARY */}
        {activeTab === 'presets' && (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-600 font-medium">
              Select an authentic packaging machinery photo matching your machine type:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {PRESET_MACHINERY_IMAGES.map((preset) => {
                const isSelected = primaryImageUrl === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`relative rounded-lg overflow-hidden border text-left p-1.5 transition-all cursor-pointer group flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-primary ring-2 ring-brand-primary bg-teal-50'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="aspect-video w-full rounded overflow-hidden bg-slate-100 relative">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-brand-primary text-white rounded-full p-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <div className="pt-1.5">
                      <p className="text-[11px] font-bold text-slate-800 truncate">{preset.name}</p>
                      <span className="text-[9px] font-mono text-brand-primary bg-teal-50 px-1 rounded">
                        {preset.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: UPLOAD DROPZONE */}
        {activeTab === 'upload' && (
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-brand-primary bg-brand-primary/10'
                  : 'border-slate-300 hover:border-brand-primary bg-white'
              }`}
            >
              {isUploading ? (
                <div className="space-y-2 py-2">
                  <Loader2 className="w-7 h-7 text-brand-primary animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-800">Uploading machine photo...</p>
                  <div className="w-36 mx-auto bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-brand-primary h-full transition-all" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-brand-primary flex items-center justify-center mx-auto">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drag & drop machine photo
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Supports JPG, PNG, WebP (Automatically compressed)
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image Caption / Location Input */}
      {onImageCaptionChange && (
        <div className="pt-1">
          <label className="text-[11px] font-bold text-slate-700 block mb-1">
            Machine Photo Caption / Installation Location:
          </label>
          <input
            type="text"
            value={imageCaption}
            onChange={(e) => onImageCaptionChange(e.target.value)}
            placeholder="e.g. Mandideep Plant - Bay 1 Conversion Line"
            className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
          />
        </div>
      )}

      {/* Multi-Image / Gallery Photos Section */}
      {onGalleryImagesChange && (
        <div className="pt-3 border-t border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-brand-primary" />
              <span>Supplementary Gallery Photos ({galleryImages.length})</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddGalleryUrl(!showAddGalleryUrl)}
                className="text-[11px] font-bold text-teal-800 hover:text-brand-primary flex items-center gap-1 cursor-pointer"
              >
                <LinkIcon className="w-3 h-3" />
                <span>Paste URL</span>
              </button>

              <input
                type="file"
                ref={galleryInputRef}
                accept="image/png,image/jpeg,image/webp,image/jpg"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0], true);
                  }
                }}
              />

              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="text-[11px] font-bold text-brand-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Angle</span>
              </button>
            </div>
          </div>

          {showAddGalleryUrl && (
            <div className="flex gap-2 p-2 bg-white rounded-lg border border-slate-200">
              <input
                type="url"
                value={galleryUrlInput}
                onChange={(e) => setGalleryUrlInput(e.target.value)}
                placeholder="https://ik.imagekit.io/.../machine-angle-2.jpg"
                className="flex-1 text-xs font-mono p-1.5 bg-slate-50 border border-slate-300 rounded outline-none"
              />
              <button
                type="button"
                onClick={handleApplyGalleryUrl}
                disabled={!galleryUrlInput.trim()}
                className="px-3 py-1.5 bg-brand-primary text-white text-xs font-bold rounded cursor-pointer disabled:opacity-50"
              >
                Add
              </button>
            </div>
          )}

          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {galleryImages.map((imgUrl, index) => (
                <div
                  key={index}
                  className="relative group aspect-video rounded-lg overflow-hidden border border-slate-300 bg-slate-900"
                >
                  <img
                    src={imgUrl}
                    alt={`Angle ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-1">
                    <button
                      type="button"
                      onClick={() => handleSetGalleryAsPrimary(imgUrl, index)}
                      title="Set as Primary Image"
                      className="p-1 bg-brand-primary text-white rounded hover:bg-brand-primary-hover"
                    >
                      <Star className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightboxUrl(imgUrl)}
                      title="Preview"
                      className="p-1 bg-slate-700 text-white rounded hover:bg-slate-600"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      title="Remove"
                      className="p-1 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-slate-400 font-mono">
              No additional angle photos attached yet. You can attach feeder, outfeed, or control panel shots.
            </p>
          )}
        </div>
      )}

      {/* Full Resolution Lightbox Modal */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxUrl(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-2 text-white border-b border-slate-800">
              <span className="text-xs font-bold">{machineName} - Full Resolution Photo</span>
              <button
                type="button"
                onClick={() => setLightboxUrl(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 max-h-[75vh] flex items-center justify-center overflow-auto">
              <img
                src={lightboxUrl}
                alt={machineName}
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
