import React, { useState } from 'react';
import { 
  Wrench, 
  Layers, 
  Printer, 
  Scissors, 
  CheckCircle2,
  Scale,
  Sun,
  Activity,
  Flame,
  ZoomIn,
  Cpu,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useCMS } from '../../context/CMSContext';
import { MachineryItem } from '../../types';

export const MachinerySection: React.FC = () => {
  const { machinery } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<MachineryItem | null>(null);
  const [activeModalPhotoIndex, setActiveModalPhotoIndex] = useState<number>(0);

  // Active machineries
  const activeMachinery = machinery.filter((m) => m.isActive !== false);

  const categories = ['All', ...Array.from(new Set(activeMachinery.map((m) => m.category).filter(Boolean)))];

  const filteredMachinery = selectedCategory === 'All'
    ? activeMachinery
    : activeMachinery.filter((m) => m.category === selectedCategory);

  const handleOpenDetails = (machine: MachineryItem) => {
    setActiveModalItem(machine);
    setActiveModalPhotoIndex(0);
  };

  return (
    <section id="machinery" className="py-16 md:py-24 bg-[#F8F9FA] border-b border-slate-200" aria-label="Machineries Installed at Mandideep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badgeText="Manufacturing Infrastructure"
          title="Machineries Installed at Mandideep Unit"
          subtitle="Our unit in Mandideep, MP is equipped with complete in-house corrugation, two colour flexo printing, precision rotary slotting, and semi-automatic finishing machinery ensuring smooth, high-speed production."
        />

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0F4C5C] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Machinery Grid with Attached Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachinery.map((machine, index) => {
            const hasImage = Boolean(machine.imageUrl);
            const allPhotos = [
              ...(machine.imageUrl ? [machine.imageUrl] : []),
              ...(machine.galleryImages || [])
            ];

            return (
              <div
                key={machine.id || index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#0F4C5C]/60 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Machinery Attached Photo Card */}
                  <div 
                    className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-pointer"
                    onClick={() => handleOpenDetails(machine)}
                  >
                    {hasImage ? (
                      <img
                        src={machine.imageUrl}
                        alt={machine.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-center space-y-2">
                        <Cpu className="w-10 h-10 text-[#0F4C5C]/80" />
                        <span className="text-xs font-mono text-slate-400">Semi-Automatic Conversion Line</span>
                      </div>
                    )}

                    {/* Gradient Overlay & Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3.5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10">
                          {machine.category}
                        </span>

                        <span className="w-6 h-6 rounded-full bg-[#0F4C5C] text-white text-[11px] font-bold font-mono flex items-center justify-center shadow">
                          {index + 1}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        {machine.imageCaption ? (
                          <span className="text-[10px] text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded font-mono truncate max-w-[200px]">
                            📍 {machine.imageCaption}
                          </span>
                        ) : (
                          <span className="text-[10px] text-white/80 font-mono">
                            Mandideep Plant Unit
                          </span>
                        )}

                        <div className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#0F4C5C]/90 hover:bg-[#0F4C5C] px-2 py-1 rounded-lg backdrop-blur-xs transition-colors">
                          <Maximize2 className="w-3 h-3" />
                          <span>Specs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0F4C5C] transition-colors">
                      {machine.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {machine.description}
                    </p>

                    {/* Speed & Capacity Pills if available */}
                    {(machine.speed || machine.capacity || machine.model) && (
                      <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono">
                        {machine.speed && (
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                            ⚡ {machine.speed}
                          </span>
                        )}
                        {machine.capacity && (
                          <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-100">
                            ⚙️ {machine.capacity}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Role / Importance Footer */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-500 text-[11px]">Production Role:</span>
                    <span className="font-bold text-[#0F4C5C] text-[11px] truncate max-w-[170px]">{machine.importance}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Detailed Machinery Lightbox Modal */}
        {activeModalItem && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveModalItem(null)}
          >
            <div 
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-[#D97706] font-bold">
                    {activeModalItem.category} • Mandideep Infrastructure
                  </span>
                  <h3 className="text-base font-bold text-white">{activeModalItem.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Photo Viewer */}
                {activeModalItem.imageUrl ? (
                  <div className="space-y-3">
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 flex items-center justify-center">
                      <img
                        src={
                          activeModalPhotoIndex === 0
                            ? activeModalItem.imageUrl
                            : activeModalItem.galleryImages?.[activeModalPhotoIndex - 1] || activeModalItem.imageUrl
                        }
                        alt={activeModalItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Gallery Thumbnails if multiple angles exist */}
                    {activeModalItem.galleryImages && activeModalItem.galleryImages.length > 0 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        <button
                          type="button"
                          onClick={() => setActiveModalPhotoIndex(0)}
                          className={`relative aspect-video w-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            activeModalPhotoIndex === 0 ? 'border-[#0F4C5C] ring-2 ring-[#0F4C5C]/20' : 'border-slate-200 opacity-70'
                          }`}
                        >
                          <img src={activeModalItem.imageUrl} alt="Main" className="w-full h-full object-cover" />
                        </button>

                        {activeModalItem.galleryImages.map((gUrl, gIdx) => (
                          <button
                            key={gIdx}
                            type="button"
                            onClick={() => setActiveModalPhotoIndex(gIdx + 1)}
                            className={`relative aspect-video w-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                              activeModalPhotoIndex === gIdx + 1 ? 'border-[#0F4C5C] ring-2 ring-[#0F4C5C]/20' : 'border-slate-200 opacity-70'
                            }`}
                          >
                            <img src={gUrl} alt={`Angle ${gIdx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Technical Overview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Machinery & Process Overview
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeModalItem.description}
                  </p>
                </div>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Process Function</span>
                    <span className="font-bold text-slate-800">{activeModalItem.importance}</span>
                  </div>
                  {activeModalItem.model && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Model / Make</span>
                      <span className="font-semibold text-slate-800">{activeModalItem.model}</span>
                    </div>
                  )}
                  {activeModalItem.capacity && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Capacity / Output</span>
                      <span className="font-semibold text-slate-800">{activeModalItem.capacity}</span>
                    </div>
                  )}
                  {activeModalItem.speed && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Speed & Configuration</span>
                      <span className="font-semibold text-slate-800">{activeModalItem.speed}</span>
                    </div>
                  )}
                </div>

                {/* Plant Notice */}
                <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#0F4C5C] shrink-0" />
                  <p className="text-xs text-[#0F4C5C] font-medium">
                    This unit operates under strict ISO standard calibrations with scheduled preventative maintenance in Mandideep, Bhopal.
                  </p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 bg-[#0F4C5C] hover:bg-[#0A3642] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Request Plant Batch Quote
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Semi-Automatic Machine in Bhopal Note */}
        <div className="mt-12 bg-[#0F4C5C]/5 border border-[#0F4C5C]/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C5C] bg-[#0F4C5C]/10 px-2.5 py-1 rounded-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plant Capabilities & Technology</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-[#0F4C5C]">
              Semi-Automatic Converting Line in Mandideep (Bhopal Region)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
              GAPP Packaging LLP operates one of the most comprehensive semi-automatic corrugation setups in the region, supported by trained skilled operators and on-site engineering staff to ensure zero downtime and reliable batch consistency.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-[#0F4C5C] hover:bg-[#0A3642] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Inquire for Factory Order</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
