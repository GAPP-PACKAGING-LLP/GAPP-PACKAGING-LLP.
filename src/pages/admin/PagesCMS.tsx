import React, { useState, useEffect } from 'react';
import { FileText, Save, RotateCcw, Check, Sparkles } from 'lucide-react';
import { subscribeToPages, savePageContent, DEFAULT_PAGES } from '../../firebase/cms';
import { CMSPageContent } from '../../types';
import { FormField } from '../../components/admin/common/FormField';
import { FileUpload } from '../../components/admin/common/FileUpload';
import { useToast } from '../../components/admin/common/Toast';

export const PagesCMS: React.FC = () => {
  const { success, error } = useToast();
  const [pages, setPages] = useState<Record<string, CMSPageContent>>(DEFAULT_PAGES);
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'contact'>('home');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = subscribeToPages((items) => {
      setPages((prev) => ({ ...prev, ...items }));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const currentPage = pages[activeTab] || DEFAULT_PAGES[activeTab];

  const handleFieldChange = (key: string, value: any) => {
    setPages((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [key]: value
      }
    }));
  };

  const handleImageChange = (imageKey: string, url: string) => {
    setPages((prev) => {
      const pageData = prev[activeTab];
      const images = pageData.content?.images || {};
      return {
        ...prev,
        [activeTab]: {
          ...pageData,
          content: {
            ...pageData.content,
            images: {
              ...images,
              [imageKey]: url
            }
          }
        }
      };
    });
  };

  const handleContentFieldChange = (subKey: string, value: any) => {
    setPages((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        content: {
          ...(prev[activeTab]?.content || {}),
          [subKey]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await savePageContent(activeTab, currentPage);
      success('Page Saved', `${currentPage.title} updated successfully.`);
    } catch (err: any) {
      error('Failed to save page', err?.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefault = () => {
    setPages((prev) => ({
      ...prev,
      [activeTab]: DEFAULT_PAGES[activeTab]
    }));
    success('Reset to Default', `Loaded default template for ${DEFAULT_PAGES[activeTab].title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(['home', 'about', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.toUpperCase()} PAGE
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefault}
            className="px-3 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#0F4C5C] hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving to Cloud...' : 'Publish Page'}</span>
          </button>
        </div>
      </div>

      {/* Editor Canvas */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0F4C5C]" />
            <span>{currentPage.title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify the hero text, promotional highlights, and core copy displayed to website visitors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Internal Page Title"
            value={currentPage.title}
            onChange={(val) => handleFieldChange('title', val)}
            placeholder="e.g. Home Page Content"
            required
          />

          <FormField
            label="Section Eyebrow / Tagline"
            value={currentPage.tagline || ''}
            onChange={(val) => handleFieldChange('tagline', val)}
            placeholder="e.g. Reliable Corrugated Packaging Solutions"
          />
        </div>

        <FormField
          label="Hero Main Headline"
          value={currentPage.heroTitle || ''}
          onChange={(val) => handleFieldChange('heroTitle', val)}
          placeholder="e.g. High-Precision Corrugated Boxes & Packaging Solutions"
          helperText="Displayed prominently at the top of the page"
        />

        <FormField
          label="Hero Subtitle / Description"
          type="textarea"
          rows={3}
          value={currentPage.heroSubtitle || ''}
          onChange={(val) => handleFieldChange('heroSubtitle', val)}
          placeholder="Enter a concise paragraph summarizing your capabilities."
        />

        {/* Tab specific dynamic content fields */}
        {activeTab === 'home' && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Homepage Key Value Highlights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Highlight 1"
                value={currentPage.content?.bullet1 || ''}
                onChange={(val) => handleContentFieldChange('bullet1', val)}
                placeholder="Feature bullet 1"
              />
              <FormField
                label="Highlight 2"
                value={currentPage.content?.bullet2 || ''}
                onChange={(val) => handleContentFieldChange('bullet2', val)}
                placeholder="Feature bullet 2"
              />
              <FormField
                label="Highlight 3"
                value={currentPage.content?.bullet3 || ''}
                onChange={(val) => handleContentFieldChange('bullet3', val)}
                placeholder="Feature bullet 3"
              />

            </div>
            
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Homepage Images
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FileUpload
                  label="Hero Background"
                  currentUrl={currentPage.content?.images?.heroImg}
                  onUploadSuccess={(url) => handleImageChange('heroImg', url)}
                  storagePath="pages/home/heroBg"
                  accept="image/*"
                />
                <FileUpload
                  label="About Section Image"
                  currentUrl={currentPage.content?.images?.aboutImg}
                  onUploadSuccess={(url) => handleImageChange('aboutImg', url)}
                  storagePath="pages/home/aboutImg"
                  accept="image/*"
                />
                <FileUpload
                  label="CTA Banner Background"
                  currentUrl={currentPage.content?.images?.ctaBg}
                  onUploadSuccess={(url) => handleImageChange('ctaBg', url)}
                  storagePath="pages/home/ctaBg"
                  accept="image/*"
                />
              </div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-4">
                Product Category Images
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <FileUpload
                    key={`prod${num}`}
                    label={`Product Image ${num}`}
                    currentUrl={currentPage.content?.images?.[`prod${num}`]}
                    onUploadSuccess={(url) => handleImageChange(`prod${num}`, url)}
                    storagePath={`pages/home/prod${num}`}
                    accept="image/*"
                  />
                ))}
              </div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-4">
                Gallery Strip Images
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <FileUpload
                    key={num}
                    label={`Gallery Image ${num}`}
                    currentUrl={currentPage.content?.images?.[`gallery${num}`]}
                    onUploadSuccess={(url) => handleImageChange(`gallery${num}`, url)}
                    storagePath={`pages/home/gallery${num}`}
                    accept="image/*"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Corporate Mission & Zero-Discharge Policy
            </h4>
            <FormField
              label="Mission Statement"
              type="textarea"
              rows={2}
              value={currentPage.content?.mission || ''}
              onChange={(val) => handleContentFieldChange('mission', val)}
            />
            <FormField
              label="Vision Statement"
              type="textarea"
              rows={2}
              value={currentPage.content?.vision || ''}
              onChange={(val) => handleContentFieldChange('vision', val)}
            />
            <FormField
              label="Zero-Discharge Environmental Commitment"
              type="textarea"
              rows={2}
              value={currentPage.content?.zeroDischargeText || ''}
              onChange={(val) => handleContentFieldChange('zeroDischargeText', val)}

            />
            
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                About Page Images
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileUpload
                  label="Hero Background"
                  currentUrl={currentPage.content?.images?.heroBg}
                  onUploadSuccess={(url) => handleImageChange('heroBg', url)}
                  storagePath="pages/about/heroBg"
                  accept="image/*"
                />
                <FileUpload
                  label="Story Image"
                  currentUrl={currentPage.content?.images?.storyImg}
                  onUploadSuccess={(url) => handleImageChange('storyImg', url)}
                  storagePath="pages/about/storyImg"
                  accept="image/*"
                />
                <FileUpload
                  label="Factory Image"
                  currentUrl={currentPage.content?.images?.factoryImg}
                  onUploadSuccess={(url) => handleImageChange('factoryImg', url)}
                  storagePath="pages/about/factoryImg"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              RFQ Prompt & Support Notice
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Quotation Inquiries Prompt"
                value={currentPage.content?.rfqPrompt || ''}
                onChange={(val) => handleContentFieldChange('rfqPrompt', val)}
              />
              <FormField
                label="Turnaround Commitment Text"
                value={currentPage.content?.turnaroundTime || ''}
                onChange={(val) => handleContentFieldChange('turnaroundTime', val)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
