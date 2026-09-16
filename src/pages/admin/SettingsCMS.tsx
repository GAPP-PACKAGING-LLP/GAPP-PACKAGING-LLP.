import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Building, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Save, 
  RotateCcw,
  Sparkles,
  Image as ImageIcon,
  Landmark,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  ExternalLink,
  Download
} from 'lucide-react';
import { subscribeToSettings, saveSettings, DEFAULT_SETTINGS } from '../../firebase/cms';
import { CMSSettings } from '../../types';
import { FormField } from '../../components/admin/common/FormField';
import { FileUpload } from '../../components/admin/common/FileUpload';
import { useToast } from '../../components/admin/common/Toast';
import { useAuth } from '../../hooks/useAuth';

export const SettingsCMS: React.FC = () => {
  const { success, error } = useToast();
  const { user, isAdmin } = useAuth();
  const [settings, setSettings] = useState<CMSSettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'logo' | 'identity' | 'statutory' | 'locations' | 'contact' | 'stats'>('logo');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoSaving, setLogoSaving] = useState(false);

  useEffect(() => {
    const unsub = subscribeToSettings((data) => {
      if (data) {
        setSettings(data);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleChange = (key: keyof CMSSettings, val: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  const handleAddressChange = (type: 'officeAddress' | 'factoryAddress', field: string, val: string) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: val,
        // Also update full if the field is full
        ...(field === 'full' ? { full: val } : {})
      }
    }));
  };

  const handlePhoneChange = (index: number, val: string) => {
    setSettings((prev) => {
      const newPhones = [...(prev.phones || ['', ''])];
      newPhones[index] = val;
      return {
        ...prev,
        phones: newPhones
      };
    });
  };

  const handleStatChange = (index: number, field: 'label' | 'value' | 'sublabel' | 'suffix', val: string) => {
    setSettings((prev) => {
      const newStats = [...(prev.stats || DEFAULT_SETTINGS.stats || [])];
      if (newStats[index]) {
        newStats[index] = {
          ...newStats[index],
          [field]: val
        };
      }
      return {
        ...prev,
        stats: newStats
      };
    });
  };

  const handleSave = async (e?: React.FormEvent, customSettings?: Partial<CMSSettings>) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const dataToSave = customSettings ? { ...settings, ...customSettings } : settings;
      await saveSettings(dataToSave);
      if (customSettings) {
        setSettings((prev) => ({ ...prev, ...customSettings }));
      }
      success('Settings Published', 'Company logo, statutory details, and plant settings updated across the live website.');
    } catch (err: any) {
      console.error('Save settings error:', err);
      error('Failed to publish settings', err?.message || 'Please ensure you are logged in as an authorized administrator.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishLogo = async (overrideLogoUrl?: string) => {
    setLogoSaving(true);
    try {
      const targetLogo = overrideLogoUrl !== undefined ? overrideLogoUrl : (settings.logoUrl || '/logo.svg');
      const updated = {
        ...settings,
        logoUrl: targetLogo
      };
      await saveSettings(updated);
      setSettings(updated);
      success('Logo Published Live', 'Company logo is now published across Navbar, Footer, RFQs, and all website pages.');
    } catch (err: any) {
      console.error('Publish logo error:', err);
      error('Failed to publish logo', err?.message || 'Error communicating with cloud database.');
    } finally {
      setLogoSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    success('Reset to Default', 'Restored official corporate defaults and vector logo.');
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-primary" />
            <span>Master Company & Website Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload company logo, configure legal GST/LLPIN credentials, plant addresses, contact phones, and live statistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-4 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            id="save-settings-btn"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving to Cloud...' : 'Save All Settings'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-1.5 flex flex-wrap gap-1">
        {[
          { id: 'logo', label: 'Logo & Branding', icon: ImageIcon },
          { id: 'identity', label: 'Company Overview', icon: Building },
          { id: 'statutory', label: 'Statutory & Bank', icon: Landmark },
          { id: 'locations', label: 'Plant & Office Address', icon: MapPin },
          { id: 'contact', label: 'Contact & Phones', icon: Phone },
          { id: 'stats', label: 'Live Stats Counters', icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Form Canvas */}
      <div className="space-y-6">
        {/* ======================================================== */}
        {/* TAB 1: LOGO & BRANDING UPLOAD SECTION                    */}
        {/* ======================================================== */}
        {activeTab === 'logo' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-brand-primary" />
                    <span>Company Logo & Brand Visual Assets</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload your official company logo here. It will immediately update everywhere across the website: Navbar Header, Footer, About Page, Quotation RFQ, and PDF Brochures.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real-time Live Sync</span>
                </div>
              </div>

              {/* Primary Logo Upload Field */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-4">
                    <FileUpload
                      label="Primary Company Logo (Standard / White Background)"
                      folder="branding"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp,.svg,.png,.jpg,.jpeg"
                      value={settings.logoUrl || ''}
                      onChange={async (url) => {
                        handleChange('logoUrl', url);
                        await handlePublishLogo(url);
                      }}
                      helperText="Supports PNG Transparent, High-Res JPG, SVG Vector, or WebP"
                      isImage={true}
                    />

                    <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={async () => {
                          handleChange('logoUrl', '/logo.svg');
                          await handlePublishLogo('/logo.svg');
                        }}
                        className="text-xs text-brand-primary hover:underline font-semibold flex items-center gap-1.5 cursor-pointer py-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset to Vector SVG (/logo.svg)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePublishLogo()}
                        disabled={logoSaving || saving}
                        id="publish-logo-changes-btn"
                        className="px-4 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{logoSaving ? 'Publishing Logo...' : 'Publish Logo Changes'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormField
                      label="Direct Logo URL (Alternative)"
                      value={settings.logoUrl || ''}
                      onChange={(val) => handleChange('logoUrl', val)}
                      placeholder="https://example.com/logo.png or /logo.svg"
                      helper="You can also paste an image URL directly or upload an image above."
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handlePublishLogo(settings.logoUrl)}
                        disabled={logoSaving || saving}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Save className="w-3 h-3" />
                        <span>Apply & Publish URL</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Logo Preview Box */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-brand-primary" />
                    <span>Real-time Preview on Website Backgrounds</span>
                  </div>

                  {/* Preview 1: Light Navbar */}
                  <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Header / Navbar (Light Theme)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">White BG</span>
                    </div>
                    <div className="h-20 flex items-center justify-center p-3 bg-white rounded-lg border border-slate-100 shadow-inner">
                      <img
                        src={settings.logoUrl || '/logo.svg'}
                        alt="Company Logo Preview"
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/logo.svg';
                        }}
                      />
                    </div>
                  </div>

                  {/* Preview 2: Dark Slate Footer */}
                  <div className="border border-slate-700 rounded-xl p-4 bg-[#07192C] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                        Footer & Admin Bar (Dark Navy Theme)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Dark Navy BG</span>
                    </div>
                    <div className="h-20 flex items-center justify-center p-3 bg-[#0A2540] rounded-lg border border-slate-700/80 shadow-inner">
                      <img
                        src={settings.logoDarkUrl || settings.logoUrl || '/logo-dark.svg'}
                        alt="Dark Theme Logo Preview"
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/logo-dark.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Assets (Dark Logo & Favicon) */}
              <div className="border-t border-slate-100 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-200/80">
                  <FileUpload
                    label="Dark Theme Inverted Logo (Optional)"
                    folder="branding"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp,.svg"
                    value={settings.logoDarkUrl || ''}
                    onChange={async (url) => {
                      handleChange('logoDarkUrl', url);
                      try {
                        await saveSettings({ logoDarkUrl: url });
                        success('Dark Logo Saved', 'Dark theme logo updated.');
                      } catch (e) {
                        console.warn(e);
                      }
                    }}
                    helperText="Inverted white/cyan logo for dark navy footer"
                    isImage={true}
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      handleChange('logoDarkUrl', '/logo-dark.svg');
                      await saveSettings({ logoDarkUrl: '/logo-dark.svg' });
                      success('Default Dark Logo Restored', 'Restored vector SVG /logo-dark.svg.');
                    }}
                    className="text-xs text-brand-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Use Default Dark Vector (/logo-dark.svg)</span>
                  </button>
                </div>

                <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-200/80">
                  <FileUpload
                    label="Favicon / Icon Mark (Browser Tab Icon)"
                    folder="branding"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp,.svg,.ico"
                    value={settings.faviconUrl || ''}
                    onChange={async (url) => {
                      handleChange('faviconUrl', url);
                      try {
                        await saveSettings({ faviconUrl: url });
                        success('Favicon Saved', 'Website favicon icon updated.');
                      } catch (e) {
                        console.warn(e);
                      }
                    }}
                    helperText="Square 1:1 symbol mark icon for browser tabs"
                    isImage={true}
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      handleChange('faviconUrl', '/favicon.svg');
                      await saveSettings({ faviconUrl: '/favicon.svg' });
                      success('Default Favicon Restored', 'Restored favicon.svg.');
                    }}
                    className="text-xs text-brand-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Use Default Interlocking Icon (/favicon.svg)</span>
                  </button>
                </div>
              </div>

              {/* Cloud Sync & Git Deployment Info Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="text-xs font-bold text-slate-800">Cloud Database & Live Sync Information</h4>
                  </div>
                  <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                    CMS me logo upload/publish karne par yeh Firebase Firestore me store hota hai aur sabhi live users ko bina code re-build ke dikhta hai. Agar aap chahte hain ki Git repository ka default source file bhi permanent yahi rahe, toh aap is logo ko download karke apne local codebase ke <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px] font-mono">/public/logo.svg</code> me commit kar sakte hain.
                  </p>
                </div>

                {settings.logoUrl && settings.logoUrl !== '/logo.svg' && (
                  <a
                    href={settings.logoUrl}
                    target="_blank"
                    rel="noreferrer"
                    download="gapp-logo"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold shadow-2xs transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Download Active Logo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: COMPANY OVERVIEW & IDENTITY                       */}
        {/* ======================================================== */}
        {activeTab === 'identity' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-brand-primary" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">Company Overview & Business Profile</h3>
                <p className="text-xs text-slate-500">Legal entity details, taglines, and marketing introductions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Company Name"
                value={settings.companyName}
                onChange={(val) => handleChange('companyName', val)}
                required
              />

              <FormField
                label="Official Tagline / Slogan"
                value={settings.tagline}
                onChange={(val) => handleChange('tagline', val)}
                placeholder="e.g. Focus On Quality"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                label="Industry Category"
                value={settings.industry || 'Corrugated Boxes Manufacturers'}
                onChange={(val) => handleChange('industry', val)}
                placeholder="e.g. Corrugated Packaging"
              />

              <FormField
                label="Year Established"
                value={settings.established}
                onChange={(val) => handleChange('established', val)}
                placeholder="e.g. 2020"
              />

              <FormField
                label="Primary Unit Location"
                value={settings.unitLocation}
                onChange={(val) => handleChange('unitLocation', val)}
                placeholder="e.g. Mandideep, Madhya Pradesh"
              />
            </div>

            <FormField
              label="Short Elevator Description (for Footer & Meta)"
              type="textarea"
              rows={2}
              value={settings.shortDescription}
              onChange={(val) => handleChange('shortDescription', val)}
            />

            <FormField
              label="Full Corporate Overview (for About Page)"
              type="textarea"
              rows={4}
              value={settings.fullDescription}
              onChange={(val) => handleChange('fullDescription', val)}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: STATUTORY REGISTRATIONS & BANKING                 */}
        {/* ======================================================== */}
        {activeTab === 'statutory' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">Statutory Registrations, Tax IDs & Bank Info</h3>
                <p className="text-xs text-slate-500">Official legal identification numbers displayed on invoice/quote specs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                label="GSTIN Number"
                value={settings.gst}
                onChange={(val) => handleChange('gst', val)}
                placeholder="e.g. 23AAVFG6804D1ZF"
                required
              />

              <FormField
                label="LLPIN / CIN Registration"
                value={settings.llpin}
                onChange={(val) => handleChange('llpin', val)}
                placeholder="e.g. AAT-8600"
                required
              />

              <FormField
                label="Permanent Account Number (PAN)"
                value={settings.pan || 'AAVFG6804D'}
                onChange={(val) => handleChange('pan', val)}
                placeholder="e.g. AAVFG6804D"
              />

              <FormField
                label="Udyam MSME Registration"
                value={settings.msmeUdyam || 'UDYAM-MP-37-0012480'}
                onChange={(val) => handleChange('msmeUdyam', val)}
                placeholder="e.g. UDYAM-MP-37-0012480"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Factory License Number"
                value={settings.factoryLicense || 'FAC-BPL-2020-8912'}
                onChange={(val) => handleChange('factoryLicense', val)}
                placeholder="e.g. FAC-BPL-2020-8912"
              />

              <FormField
                label="Pollution Board (MPPCB) Consent No."
                value={settings.mppcbConsent || 'MPPCB-CONSENT-2020-AIR-WATER'}
                onChange={(val) => handleChange('mppcbConsent', val)}
                placeholder="e.g. MPPCB-CONSENT-2020-AIR-WATER"
              />
            </div>

            {/* Bank Details */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-cyan-600" />
                <span>Commercial Bank Account Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField
                  label="Bank Name"
                  value={settings.bankName || 'Bank of Baroda'}
                  onChange={(val) => handleChange('bankName', val)}
                  placeholder="e.g. Bank of Baroda"
                />

                <FormField
                  label="Account Number"
                  value={settings.bankAccountNo || '98760200001234'}
                  onChange={(val) => handleChange('bankAccountNo', val)}
                  placeholder="e.g. 98760200001234"
                />

                <FormField
                  label="IFSC Code"
                  value={settings.bankIfsc || 'BARB0OBEDUL'}
                  onChange={(val) => handleChange('bankIfsc', val)}
                  placeholder="e.g. BARB0OBEDUL"
                />

                <FormField
                  label="Branch"
                  value={settings.bankBranch || 'Obedullaganj, MP'}
                  onChange={(val) => handleChange('bankBranch', val)}
                  placeholder="e.g. Obedullaganj, MP"
                />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: LOCATIONS & ADDRESSES                            */}
        {/* ======================================================== */}
        {activeTab === 'locations' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-primary" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">Plant & Registered Office Locations</h3>
                <p className="text-xs text-slate-500">Official physical plant address in Mandideep and corporate office</p>
              </div>
            </div>

            {/* Factory Address */}
            <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-extrabold text-brand-primary uppercase tracking-wide block">
                1. Manufacturing Unit / Factory Address (Mandideep)
              </span>

              <FormField
                label="Full Combined Factory Address"
                type="textarea"
                rows={2}
                value={settings.factoryAddress?.full || ''}
                onChange={(val) => handleAddressChange('factoryAddress', 'full', val)}
                placeholder="Survey no. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Pipaliya Korka, Madhya Pradesh 464993"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField
                  label="Survey No / Building"
                  value={settings.factoryAddress?.surveyNo || ''}
                  onChange={(val) => handleAddressChange('factoryAddress', 'surveyNo', val)}
                  placeholder="Survey no. 13/1/1/3"
                />
                <FormField
                  label="Road & Area"
                  value={settings.factoryAddress?.road || ''}
                  onChange={(val) => handleAddressChange('factoryAddress', 'road', val)}
                  placeholder="Khanpura Rd, Industrial Area"
                />
                <FormField
                  label="Pincode"
                  value={settings.factoryAddress?.pincode || ''}
                  onChange={(val) => handleAddressChange('factoryAddress', 'pincode', val)}
                  placeholder="464993"
                />
              </div>

              <FormField
                label="Google Maps Search Query / Coordinates Link"
                value={settings.factoryAddress?.googleMapsQuery || ''}
                onChange={(val) => handleAddressChange('factoryAddress', 'googleMapsQuery', val)}
                placeholder="Survey no. 13/1/1/3 Khanpura Rd, Mandideep"
              />
            </div>

            {/* Registered Office Address */}
            <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-extrabold text-brand-primary uppercase tracking-wide block">
                2. Registered Office Address (Obedullaganj)
              </span>

              <FormField
                label="Full Combined Office Address"
                type="textarea"
                rows={2}
                value={settings.officeAddress?.full || ''}
                onChange={(val) => handleAddressChange('officeAddress', 'full', val)}
                placeholder="Near bank of baroda, Hoshangbad road, Obedullaganj, Madhya Pradesh 464993"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField
                  label="Landmark & Street"
                  value={settings.officeAddress?.landmark || ''}
                  onChange={(val) => handleAddressChange('officeAddress', 'landmark', val)}
                  placeholder="Near bank of baroda, Hoshangabad Rd"
                />
                <FormField
                  label="City & State"
                  value={`${settings.officeAddress?.city || 'Obedullaganj'}, ${settings.officeAddress?.state || 'MP'}`}
                  onChange={(val) => handleAddressChange('officeAddress', 'city', val)}
                />
                <FormField
                  label="Pincode"
                  value={settings.officeAddress?.pincode || ''}
                  onChange={(val) => handleAddressChange('officeAddress', 'pincode', val)}
                  placeholder="464993"
                />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CONTACT CHANNELS & WORKING HOURS                  */}
        {/* ======================================================== */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-brand-primary" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">Customer Connect & Communication Desk</h3>
                <p className="text-xs text-slate-500">Phone numbers, WhatsApp gateway, email inboxes, and plant shift timings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Primary Phone / Executive 1 (Ashish Barkhade)"
                value={settings.phones?.[0] || ''}
                onChange={(val) => handlePhoneChange(0, val)}
                placeholder="+91 9806419199"
                required
              />

              <FormField
                label="Secondary Phone / Executive 2 (Pramod Singh)"
                value={settings.phones?.[1] || ''}
                onChange={(val) => handlePhoneChange(1, val)}
                placeholder="+91 9981280902"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                label="WhatsApp Number (with country code)"
                value={settings.whatsappNumber}
                onChange={(val) => handleChange('whatsappNumber', val)}
                placeholder="+919806419199"
                required
              />

              <FormField
                label="Official Email Address"
                value={settings.email}
                onChange={(val) => handleChange('email', val)}
                placeholder="industriesgapp@gmail.com"
                required
              />

              <FormField
                label="Sales / RFQ Email"
                value={settings.salesEmail || 'sales@gapppackaging.com'}
                onChange={(val) => handleChange('salesEmail', val)}
                placeholder="sales@gapppackaging.com"
              />
            </div>

            <FormField
              label="Operating Plant Hours / Operational Schedule"
              value={settings.workingHours}
              onChange={(val) => handleChange('workingHours', val)}
              placeholder="Mon - Sat: 09:00 AM - 07:30 PM (Sunday Closed for Maintenance)"
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: LIVE STATS COUNTERS                               */}
        {/* ======================================================== */}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-primary" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">Home & About Statistics Counters</h3>
                <p className="text-xs text-slate-500">Edit the key manufacturing and credential metrics showcased on the website</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(settings.stats || DEFAULT_SETTINGS.stats || []).map((stat, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-brand-primary flex items-center justify-between">
                    <span>Stat Metric #{idx + 1}</span>
                    <span className="font-mono text-slate-400">Card {idx + 1}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      label="Value / Number"
                      value={stat.value}
                      onChange={(val) => handleStatChange(idx, 'value', val)}
                      placeholder="e.g. 2020 or 100%"
                    />
                    <FormField
                      label="Title Label"
                      value={stat.label}
                      onChange={(val) => handleStatChange(idx, 'label', val)}
                      placeholder="e.g. Establishment"
                    />
                  </div>

                  <FormField
                    label="Description Sublabel"
                    value={stat.sublabel}
                    onChange={(val) => handleStatChange(idx, 'sublabel', val)}
                    placeholder="e.g. Box making unit in Mandideep, MP"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-6 py-2.5 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing Changes...' : 'Save & Publish All Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
