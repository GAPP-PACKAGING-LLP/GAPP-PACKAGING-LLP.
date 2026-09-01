import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  Loader2, 
  Link as LinkIcon, 
  ExternalLink,
  AlertCircle,
  Sparkles,
  FolderOpen
} from 'lucide-react';
import { compressImageFile, fileToDataUrl } from '../../../utils/imageCompressor';

interface FileUploadProps {
  label: string;
  folder?: string;
  accept?: string;
  value?: string;
  onChange: (url: string, storagePath?: string, fileSize?: string) => void;
  helperText?: string;
  isImage?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  folder = 'admin_uploads',
  accept = 'image/*,application/pdf,.svg',
  value,
  onChange,
  helperText = 'PNG, JPG, SVG, WebP or PDF documents',
  isImage = true
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    setError(null);
    setNotice(null);
    setIsUploading(true);
    setUploadProgress(40);

    try {
      if (file.type.startsWith('image/')) {
        const res = await compressImageFile(file, 1200, 1200, 0.85);
        setUploadProgress(100);
        setNotice(`Optimized image (${res.compressedSizeKb} KB).`);
        onChange(res.dataUrl, '', `${res.compressedSizeKb} KB`);
      } else {
        const dataUrl = await fileToDataUrl(file);
        setUploadProgress(100);
        const sizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
        onChange(dataUrl, '', sizeStr);
      }
    } catch (err: any) {
      console.error('File processing failure:', err);
      setError(err?.message || 'Failed to process file. You can also use the Direct URL tab.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    onChange('', '', '');
    setError(null);
    setNotice(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    onChange(customUrlInput.trim(), '', 'Web URL');
    setCustomUrlInput('');
    setError(null);
  };

  const isCurrentValuePdf = value && (
    value.toLowerCase().includes('.pdf') || 
    value.startsWith('data:application/pdf') ||
    value.includes('/docs/')
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 block">{label}</label>
        
        {/* Toggle between Upload and URL */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              activeMode === 'upload' ? 'bg-white shadow-xs text-[#0F4C5C] font-bold' : 'hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              activeMode === 'url' ? 'bg-white shadow-xs text-[#0F4C5C] font-bold' : 'hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Direct URL</span>
          </button>
        </div>
      </div>

      {activeMode === 'upload' ? (
        <div className="space-y-2">
          {/* Main Upload Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#0F4C5C] bg-[#0F4C5C]/5 ring-2 ring-[#0F4C5C]/20'
                : 'border-slate-300 hover:border-[#0F4C5C] hover:bg-slate-50/80 bg-slate-50/40'
            }`}
          >
            {isUploading ? (
              <div className="space-y-2.5 py-2">
                <Loader2 className="w-7 h-7 text-[#0F4C5C] animate-spin mx-auto" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">Uploading & Optimizing image...</p>
                  <div className="w-48 mx-auto bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#0F4C5C] h-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{uploadProgress}%</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-1">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0F4C5C] shrink-0">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-slate-800 flex items-center justify-center sm:justify-start gap-1">
                    <span>Click to Choose Image</span>
                    <span className="font-normal text-slate-400">or Drag & Drop</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{helperText}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-3 py-1.5 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  Browse Device
                </button>
              </div>
            )}
          </div>

          {/* If file already attached, show preview bar underneath */}
          {value && (
            <div className="border border-slate-200 rounded-xl p-2.5 bg-white shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                {isImage && !isCurrentValuePdf ? (
                  <div className="relative w-12 h-12 rounded-lg border border-slate-200 bg-slate-50 shrink-0 overflow-hidden flex items-center justify-center p-1">
                    <img
                      src={value}
                      alt="Upload preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex flex-col items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                    <span className="text-[8px] font-extrabold uppercase">PDF</span>
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Current Active File</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono truncate max-w-[220px] mt-0.5">
                    {value.startsWith('data:') ? 'Base64 Attachment Data' : value}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {value.startsWith('http') || value.startsWith('/docs') || value.startsWith('/logo') ? (
                  <a
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-500 hover:text-[#0F4C5C] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Open preview in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Direct URL mode */
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
          <p className="text-xs text-slate-600">
            Paste a public web link or image link (e.g. Google Drive image, Cloudinary, Imgur, or direct URL):
          </p>
          <div className="flex gap-2">
            <input
              type="url"
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              placeholder="https://example.com/logo.png or /logo.svg"
              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0F4C5C]"
            />
            <button
              type="button"
              onClick={handleApplyCustomUrl}
              disabled={!customUrlInput.trim()}
              className="px-3 py-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              Apply Link
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            e.target.value = '';
            handleFile(selectedFile);
          }
        }}
        className="hidden"
      />

      {error && (
        <div className="flex items-start gap-1.5 p-2.5 bg-red-50 border border-red-200 rounded-lg text-[11px] text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <div className="space-y-0.5">
            <p className="font-semibold">{error}</p>
            <p className="text-[10px] text-red-600">
              Tip: You can also paste an image URL in the <strong>Direct URL</strong> tab above.
            </p>
          </div>
        </div>
      )}

      {notice && (
        <div className="flex items-center gap-1.5 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}
    </div>
  );
};
