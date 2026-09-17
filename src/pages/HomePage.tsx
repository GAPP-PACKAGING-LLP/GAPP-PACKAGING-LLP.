import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, Box, CheckCircle2, ShieldCheck, Truck, Clock, 
  Package, Layers, FileText, ArrowRight, Settings, Image as ImageIcon,
  X, ShoppingCart, Activity, Briefcase, Zap, PhoneCall, Mail, MapPin, 
  Upload, Loader2, Award, FileDown, Check, ChevronRight, Phone,
  Printer, Building2, Leaf, ShieldPlus, ShoppingBag, Cog, Wrench, Microscope, Users
} from 'lucide-react';
import { 
  companyData, 
  machineryData, 
  testingEquipmentData, 
  clientPartnersData, 
  designatedPartnersData,
  missionVisionData,
  qualityPolicyData,
  environmentPolicyData,
  deliveryGuidelinesData,
  statutoryRequirementsData,
  industriesData
} from '../data/companyData';
import { useCMS } from '../context/CMSContext';

interface HomePageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [fileError, setFileError] = useState('');
  const { pages } = useCMS();
  const pageData = pages['home'] || { content: { images: {} } };
  const images = pageData.content?.images || {};

  // Escape key & background scroll lock for gallery lightbox
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null);
    };
    if (activeImage) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeImage]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileError) return;
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
    }, 1200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB');
      e.target.value = '';
    }
  };

  // PURE CORRUGATED BOX IMAGES ONLY (No warehouses, no workers, only real corrugated boxes)
  const defaultImages = {
    heroBox: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200',
    aboutBox: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=1000',
    ctaBox: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=1200',
    prod3ply: 'https://images.unsplash.com/photo-1580674684081-776d507bcea0?auto=format&fit=crop&q=80&w=800',
    prod5ply: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    prod7ply: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800',
    prodPrinted: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800',
    prodDiecut: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800',
  };

  const galleryImages = [
    { 
      src: images.gallery1 || defaultImages.heroBox, 
      caption: 'Stacked Kraft Corrugated Carton Boxes', 
      span: 'col-span-1 md:col-span-2 row-span-2' 
    },
    { 
      src: images.gallery2 || defaultImages.aboutBox, 
      caption: 'Fluted Corrugated Cardboard Box Structure', 
      span: 'col-span-1 row-span-1' 
    },
    { 
      src: images.gallery3 || defaultImages.prod3ply, 
      caption: 'Single Wall 3-Ply Shipping Carton', 
      span: 'col-span-1 row-span-1' 
    },
    { 
      src: images.gallery4 || defaultImages.prod7ply, 
      caption: 'Heavy-Duty Industrial Corrugated Box Container', 
      span: 'col-span-1 row-span-1' 
    },
    { 
      src: images.gallery5 || defaultImages.prodDiecut, 
      caption: 'Precision Die-Cut Corrugated Packaging & Partitions', 
      span: 'col-span-1 md:col-span-2 row-span-1' 
    },
  ];

  return (
    <main className="flex-1 bg-white overflow-hidden text-slate-800 font-sans">
      
      {/* 1. PDF BROCHURE PROMPT STRIP */}
      <div className="bg-[#0A3642] text-white py-2.5 px-4 text-xs font-semibold border-b border-[#134E4A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#008CE8] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Official PDF Profile
            </span>
            <span className="text-slate-200">
              GAPP Packaging LLP • Semi-Automatic Corrugated Box Making Unit, Mandideep (Bhopal)
            </span>
          </div>
          {onOpenBrochureModal && (
            <button
              onClick={onOpenBrochureModal}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white transition-colors cursor-pointer text-xs font-bold underline underline-offset-4"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>View / Print Official Company Profile (9 Pages PDF)</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. HERO SECTION (PDF PAGE 1 & 2 ALIGNED - ONLY CORRUGATED BOX IMAGES) */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white pt-12 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-[#008CE8] text-xs font-bold uppercase tracking-widest rounded-full">
                <Box className="w-3.5 h-3.5" />
                <span>Corrugated Boxes Manufacturers • Est. 2020</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#262D38] leading-[1.15] tracking-tight">
                Quality Corrugated Boxes with Guaranteed On-Time Delivery
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                GAPP Packaging LLP operates a semi-automatic box making unit in Mandideep, Bhopal. We manufacture 3-ply, 5-ply, 7-ply, and printed corrugated cartons with lot-wise test certificates and unmatched flexibility for urgent orders.
              </p>

              {/* Core Verification Badges directly from PDF */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                  <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero-Discharge (0% Plastic)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#008CE8] shrink-0" />
                  <span>Test Certificate with Every Lot</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                  <Clock className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Urgent Orders Flexibility</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="bg-[#008CE8] hover:bg-[#0073BF] text-white px-7 py-3.5 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Instant Quotation</span>
                </button>
                {onOpenBrochureModal && (
                  <button
                    onClick={onOpenBrochureModal}
                    className="bg-[#0E525B] hover:bg-[#0A3642] text-white px-6 py-3.5 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download PDF Brochure</span>
                  </button>
                )}
                <Link
                  to="/products"
                  className="bg-white border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3.5 rounded-lg font-bold text-sm shadow-2xs transition-all text-center"
                >
                  Explore Products
                </Link>
              </div>

              {/* Designated Partners Quick Contact */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 border-t border-slate-200 pt-4">
                <span className="font-bold text-slate-800">Designated Partners:</span>
                <a href="tel:+919806419199" className="hover:text-[#008CE8] font-semibold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#008CE8]" />
                  Ashish Barkhade: +91 9806419199
                </a>
                <a href="tel:+919981280902" className="hover:text-[#008CE8] font-semibold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#008CE8]" />
                  Pramod Singh: +91 9981280902
                </a>
              </div>
            </div>

            {/* Right Image Composition - ONLY CORRUGATED BOX */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
                <img 
                  src={images.heroImg || defaultImages.heroBox}
                  alt="Quality Stacked Corrugated Boxes - GAPP Packaging"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-[#008CE8]">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 leading-tight">3-Ply, 5-Ply & 7-Ply Cartons</h3>
                      <p className="text-xs text-slate-500 font-medium">Semi-Automatic High Precision Line</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    Tested BST
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CREDENTIAL STRIP (EXACT DATA FROM PDF) */}
      <section className="bg-white py-8 border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
            <div className="space-y-1">
              <p className="text-2xl font-black text-[#008CE8]">2020</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Established Box Making Unit</p>
              <p className="text-[11px] text-slate-500">Mandideep, Madhya Pradesh</p>
            </div>
            <div className="space-y-1 pl-4">
              <p className="text-2xl font-black text-[#0E525B]">Semi-Automatic</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">High Speed Machinery</p>
              <p className="text-[11px] text-slate-500">One of the few in Bhopal / Mandideep</p>
            </div>
            <div className="space-y-1 pl-4">
              <p className="text-2xl font-black text-emerald-600">Zero-Discharge</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">100% Recyclable Packaging</p>
              <p className="text-[11px] text-slate-500">Zero plastic used at facility</p>
            </div>
            <div className="space-y-1 pl-4">
              <p className="text-2xl font-black text-[#D97706]">Lot-Certified</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Quality Assurance</p>
              <p className="text-[11px] text-slate-500">Test Certificate issued with every lot</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTRODUCTION LETTER SECTION (PDF PAGE 2 VERBATIM) */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image - ONLY CORRUGATED BOX FLUTE */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img 
                  src={images.aboutImg || defaultImages.aboutBox} 
                  alt="Fluted Corrugated Cardboard Packaging Box" 
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="bg-[#008CE8] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                    Page 2 of Official PDF
                  </span>
                  <h4 className="text-base font-bold mt-1">One Stop Professionalized Packaging Solution</h4>
                  <p className="text-xs text-slate-200">Tailored box dimensions, grammage, and bursting strength.</p>
                </div>
              </div>
            </div>

            {/* Letter Content from PDF */}
            <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#008CE8]">
                OFFICIAL COMPANY PROFILE
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                Introduction Letter – Corrugated Boxes Manufacturers
              </h2>
              
              <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>GAPP Packaging LLP</strong> was established in 2020 as a box making unit. Our unit is in Mandideep, Madhya Pradesh and is one of the few with a semi-automatic machine in Bhopal.
                </p>
                <p>
                  Our focus is directed towards providing quality boxes and on time delivery consistently. We cater to any urgent orders without affecting the regular delivery schedule of our clients since we understand the fluctuating market demands that our customers face time to time.
                </p>
                <p>
                  GAPP provides one stop professionalized solution for your trade and manufacturing. Depending on the size and field of your organization, we have different products to meet your requirements. We provide the optimum and customized solutions made for your organization.
                </p>
                <p className="text-slate-600 text-sm italic border-l-2 border-[#008CE8] pl-3 py-1">
                  "We have well trained skilled labors and experienced managers along with, in-house engineering support staff to always ensure smooth production. Our employees are the key strength of the organization hence we can provide growth to our people, products, and the services through a commitment to innovation and team spirit."
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 font-bold text-xs text-white bg-[#0E525B] hover:bg-[#0A3642] px-5 py-2.5 rounded-lg transition-colors"
                >
                  <span>Read Full Company Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {onOpenBrochureModal && (
                  <button 
                    onClick={onOpenBrochureModal}
                    className="inline-flex items-center gap-1.5 font-bold text-xs text-slate-700 hover:text-[#008CE8] bg-white border border-slate-300 px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#008CE8]" />
                    <span>View 9-Page Brochure</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. MISSION, VISION & CORE VALUES (PDF PAGE 3) */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8]">
              PAGE 3 OF OFFICIAL BROCHURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Our Mission, Values & Forward Vision
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Founded on principles of quality consistency, transparency, and relentless innovation in corrugated packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Our Mission */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-blue-100 text-[#008CE8] rounded-lg flex items-center justify-center font-bold mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Our Mission</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  "{missionVisionData.mission}"
                </p>
              </div>
              <div className="text-[11px] font-bold text-[#008CE8] uppercase tracking-wider pt-2 border-t border-slate-200">
                Quality & Reliability First
              </div>
            </div>

            {/* Keys for Development */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-teal-100 text-[#0E525B] rounded-lg flex items-center justify-center font-bold mb-3">
                <Settings className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">Keys for Development</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {missionVisionData.keysForDevelopment.map((key, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#008CE8] shrink-0" />
                    <span>{key}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* We Believe In */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-amber-100 text-[#D97706] rounded-lg flex items-center justify-center font-bold mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">We Believe In</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {missionVisionData.weBelieveIn.map((bel, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                    <span>{bel}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Vision */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Our Vision</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  "Our Vision is to achieve 100% customer satisfaction by delivering quality products at an affordable cost. Technology-based corrugated box manufacturing capable of demanding unconditional response."
                </p>
              </div>
              <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider pt-2 border-t border-slate-200">
                Scope of Improvisation – Sky is the Limit
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. PRODUCTS SECTION (PURE CORRUGATED BOXES ONLY) */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8]">
                CORRUGATED BOXES RANGE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                Customized Corrugated Packaging Solutions
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Manufactured with precision fluting, accurate GSM liners, and certified bursting strength.
              </p>
            </div>
            <button
              onClick={() => onOpenQuoteModal()}
              className="self-start md:self-auto bg-[#008CE8] hover:bg-[#0073BF] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Get Custom Size Quote
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '3-Ply Corrugated Boxes',
                tag: 'Single Wall Carton',
                desc: 'Standard 3-ply lightweight and durable shipper boxes ideal for retail merchandise, FMCG, and e-commerce distribution.',
                img: images.prod1 || defaultImages.prod3ply,
                features: ['A, B, or C Flute', 'High crush resistance', 'Cost-effective bulk shipping']
              },
              {
                title: '5-Ply Master Cartons',
                tag: 'Double Wall Shipper',
                desc: 'Heavy-duty 5-ply double-wall boxes built for medium to heavy items, pharmaceuticals, and export transit stacking.',
                img: images.prod2 || defaultImages.prod5ply,
                features: ['Combined AB or BC flutes', 'Certified bursting factor', 'Superior stacking strength']
              },
              {
                title: '7-Ply Industrial Boxes',
                tag: 'Triple Wall Heavy-Duty',
                desc: 'Extra-heavy triple wall corrugated containers engineered for engineering machinery, industrial tools, and automotive parts.',
                img: images.prod4 || defaultImages.prod7ply,
                features: ['Maximum burst resistance', 'Wooden crate alternative', 'Heavy machinery transport']
              },
              {
                title: 'Two-Colour Flexo Printed Cartons',
                tag: 'Custom Branded Boxes',
                desc: 'High-speed two-colour flexographic printing for company branding, batch details, barcode labelling, and handling markings.',
                img: images.prod3 || defaultImages.prodPrinted,
                features: ['Two-colour precision flexo', 'Crisp product branding', 'Fragile & handling symbols']
              }
            ].map((prod, idx) => (
              <div key={idx} className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img 
                      src={prod.img} 
                      alt={prod.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {prod.tag}
                    </span>
                  </div>
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#008CE8] transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prod.desc}
                    </p>
                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      {prod.features.map((feat, fIdx) => (
                        <div key={fIdx} className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                          <Check className="w-3 h-3 text-[#008CE8]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenQuoteModal(prod.title)}
                    className="w-full bg-slate-100 hover:bg-[#008CE8] hover:text-white text-slate-700 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Request Quote for this Box
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. QUALITY POLICY & 3-STEP PROCESS (PDF PAGE 4) */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Quality Policy */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#008CE8]">
                PAGE 4 OF OFFICIAL BROCHURE
              </div>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">
                Quality Policy & Standards
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-medium bg-blue-50/60 p-4 rounded-xl border border-blue-100">
                "{qualityPolicyData.statement}"
              </p>
              
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Measures to Maintain Quality Policy:
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {qualityPolicyData.measures.map((measure, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008CE8] mt-1.5 shrink-0"></span>
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 3-Step Quality Process */}
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Quality Process (3 Stages)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full batch traceability from raw paper reel testing to final lot certification.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#008CE8] font-black text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Raw Material Sampling & Marking</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {qualityPolicyData.process.rawMaterials}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-[#0E525B] font-black text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Online QC Monitoring in Each Stage</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {qualityPolicyData.process.onlineMonitoring}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Pre-Dispatch Certification with Every Lot</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {qualityPolicyData.process.preDispatchCertification}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Test Certificate (BST, Grammage & Moisture) is issued with every single dispatch lot.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. MACHINERIES & IN-HOUSE TESTING LAB (PDF PAGE 5 & 6 & 7) */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8]">
              PAGES 5, 6 & 7 OF OFFICIAL BROCHURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Machineries Installed & Testing Laboratory
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              State-of-the-art semi-automatic manufacturing infrastructure located in Mandideep Industrial Area.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 12 Machineries Installed */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-[#008CE8]" />
                  <span>12 Machineries Installed</span>
                </h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Mandideep Plant
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {machineryData.map((m, mIdx) => (
                  <div key={m.id} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 hover:bg-blue-50/50 transition-colors text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#008CE8] shrink-0 mt-0.5" />
                    <span>{m.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* In-House Testing Equipment */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Microscope className="w-5 h-5 text-[#0E525B]" />
                    <span>Testing Equipment (In-House Lab)</span>
                  </h3>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Lot Certification
                  </span>
                </div>

                <div className="space-y-3 mt-4">
                  {testingEquipmentData.map((test) => (
                    <div key={test.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900">{test.name}</h4>
                        <span className="text-[10px] font-mono text-slate-500 font-semibold">{test.standard}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {test.parameterMeasured}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Guidelines from PDF */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5 mt-4">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Delivery Guidelines (Page 5)</span>
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  "{deliveryGuidelinesData.onTimeCommitment} {deliveryGuidelinesData.urgentOrderFlexibility}"
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 9. ENVIRONMENT POLICY & STATUTORY COMPLIANCE (PDF PAGE 6 & 7) */}
      <section className="py-14 bg-gradient-to-r from-[#0E525B] to-[#0A3642] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-3">
              <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                Page 6: Environment Policy
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Zero-Discharge Manufacturing Unit
              </h2>
              <p className="text-slate-200 text-sm leading-relaxed">
                "{environmentPolicyData.zeroDischarge} {environmentPolicyData.plasticFree}"
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">100% Recyclable Kraft Paper</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">Food-Grade Starch Glue</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">Zero Plastic Facility</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 space-y-3">
              <span className="bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                Page 7: Statutory Requirements
              </span>
              <h3 className="text-lg font-bold">Government SSI Unit Compliance</h3>
              <p className="text-xs text-slate-300">
                "{statutoryRequirementsData.compliance}"
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="bg-black/30 p-2.5 rounded-lg border border-white/10">
                  <span className="text-amber-400 block text-[10px] font-sans font-bold">GST NUMBER</span>
                  <span className="font-bold">{statutoryRequirementsData.gstNo}</span>
                </div>
                <div className="bg-black/30 p-2.5 rounded-lg border border-white/10">
                  <span className="text-amber-400 block text-[10px] font-sans font-bold">LLPIN NUMBER</span>
                  <span className="font-bold">{statutoryRequirementsData.llpin}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. SECTORS SERVED (PDF PAGE 2 - EXACT 6 SECTORS) */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8]">
              PAGE 2: VERIFIED BUSINESS SECTORS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Industries & Sectors Currently Served
            </h2>
            <p className="text-slate-600 text-sm">
              "We are currently doing business in Retail, Pharmaceuticals, Engineering, Confectionery, Stationery and FMCG sector."
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Retail Sector', icon: ShoppingBag, desc: 'Display & retail shippers' },
              { name: 'Pharmaceuticals', icon: ShieldPlus, desc: 'Clean, certified medicine shippers' },
              { name: 'Engineering', icon: Cog, desc: 'Heavy load machinery boxes' },
              { name: 'Confectionery', icon: Package, desc: 'Hygienic bakery & sweets boxes' },
              { name: 'Stationery', icon: Layers, desc: 'Paper reams & book cartons' },
              { name: 'FMCG Sector', icon: ShoppingCart, desc: 'High-speed master shippers' },
            ].map((sec, idx) => (
              <div key={idx} className="bg-slate-50 hover:bg-blue-50/50 p-5 rounded-xl border border-slate-200 text-center transition-all group flex flex-col items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#008CE8] group-hover:scale-110 transition-transform mb-3 shadow-2xs">
                  <sec.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{sec.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{sec.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. MAJOR CLIENTS (PDF PAGES 8 & 9 - EXACT 10 CLIENTS) */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8]">
              PAGES 8 & 9 OF OFFICIAL BROCHURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Major Corporate Clients
            </h2>
            <p className="text-slate-600 text-sm">
              Trusted by leading pharmaceutical, confectionery, and manufacturing companies in Madhya Pradesh and nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {clientPartnersData.map((client) => (
              <div key={client.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">#{client.id}</span>
                    <span className="text-[10px] font-bold text-[#008CE8] bg-blue-50 px-1.5 py-0.2 rounded">
                      {client.sector}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                    {client.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {client.details}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                  {client.supplyType}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. PURE CORRUGATED BOX GALLERY (EXCLUSIVELY CORRUGATED BOXES) */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8]">
                CORRUGATED BOX DETAIL
              </div>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                Packaging Gallery (Corrugated Boxes)
              </h2>
              <p className="text-slate-600 text-sm">
                Click any box to inspect structure, fluting, and craftsmanship.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
              Pure Corrugated Boxes Only
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-xl overflow-hidden cursor-pointer group shadow-2xs ${img.span}`}
                onClick={() => setActiveImage(img.src)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveImage(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <p className="text-white font-bold text-xs">{img.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Lightbox Modal with Escape Key support & scroll lock */}
        {activeImage && (
          <div 
            className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-slate-300 cursor-pointer"
              onClick={() => setActiveImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={activeImage} 
              alt="Enlarged Corrugated Box View" 
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" 
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        )}
      </section>

      {/* 13. REQUEST A QUOTE & DESIGNATED PARTNERS (PDF PAGE 1 & 9) */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200" id="quote-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact & Addresses */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8]">
                  REQUEST FOR QUOTATION (RFQ)
                </div>
                <h2 className="text-3xl font-black text-slate-900 mt-1 leading-tight">
                  Discuss Your Corrugated Box Requirement
                </h2>
                <p className="text-slate-600 text-sm mt-3">
                  Share your carton dimensions, ply, and load specifications. Our engineering team will review and calculate an accurate quotation.
                </p>
              </div>

              {/* Designated Partners Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#008CE8]" />
                  <span>Designated Partners (Page 9)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="font-extrabold text-slate-900">Ashish Barkhade</p>
                    <p className="text-[11px] text-slate-500">Designated Partner</p>
                    <a href="tel:+919806419199" className="text-[#008CE8] font-bold mt-1 block">
                      +91 9806419199
                    </a>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="font-extrabold text-slate-900">Pramod Singh</p>
                    <p className="text-[11px] text-slate-500">Designated Partner</p>
                    <a href="tel:+919981280902" className="text-[#008CE8] font-bold mt-1 block">
                      +91 9981280902
                    </a>
                  </div>
                </div>
              </div>

              {/* Addresses from Page 1 */}
              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Manufacturing Plant (FTY):</span>
                    <span>{companyData.factoryAddress.full}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-[#0E525B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Registered Office (OFF):</span>
                    <span>{companyData.officeAddress.full}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#008CE8] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Official Email:</span>
                    <a href={`mailto:${companyData.email}`} className="text-[#008CE8] hover:underline font-semibold">
                      {companyData.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right RFQ Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Your Name *</label>
                    <input required type="text" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#008CE8]" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Company Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#008CE8]" placeholder="e.g. Pharma / Retail Co." />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Phone Number *</label>
                    <input required type="tel" pattern="^[0-9]{10}$" title="Valid 10-digit phone number" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#008CE8]" placeholder="10-digit mobile number" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Email Address *</label>
                    <input required type="email" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#008CE8]" placeholder="name@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Box Type Required *</label>
                    <select required className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#008CE8]">
                      <option value="">Select Box Ply...</option>
                      <option value="3-ply">3-Ply Corrugated Box (Single Wall)</option>
                      <option value="5-ply">5-Ply Master Carton (Double Wall)</option>
                      <option value="7-ply">7-Ply Industrial Heavy Duty (Triple Wall)</option>
                      <option value="printed">Two-Colour Flexo Printed Carton</option>
                      <option value="diecut">Die-Cut Packaging / Sheets</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Approx Quantity</label>
                    <input type="number" min="100" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#008CE8]" placeholder="e.g. 1000 boxes" />
                  </div>
                </div>

                {/* Box Dimensions */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Dimensions (in mm)</label>
                  <div className="grid grid-cols-3 gap-3">
                    <input type="number" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#008CE8]" placeholder="Length (L)" />
                    <input type="number" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#008CE8]" placeholder="Width (W)" />
                    <input type="number" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#008CE8]" placeholder="Height (H)" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Specific Requirements / Load Details</label>
                  <textarea rows={3} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#008CE8] resize-none" placeholder="Provide details such as payload weight (kg), burst factor needed, or fluting preference..."></textarea>
                </div>

                {/* File Upload (<5MB validated) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Attach Specification / Design Drawing</label>
                  <div className="flex items-center justify-center w-full h-24 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-100 bg-slate-50 transition-colors relative cursor-pointer">
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png,.docx" 
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <Upload className="w-5 h-5 mb-1 text-slate-400" />
                      <p className="text-xs font-semibold">Click to upload specification sheet</p>
                      <p className="text-[10px] text-slate-400">PDF, JPG, PNG or DOCX (Max 5MB)</p>
                    </div>
                  </div>
                  {fileError && <p className="text-xs text-red-500 font-bold mt-1">{fileError}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'loading'}
                  className="w-full bg-[#008CE8] hover:bg-[#0073BF] text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors disabled:opacity-70 flex justify-center items-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                >
                  {formStatus === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Submit Quotation Request</span>
                </button>

                {formStatus === 'success' && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 text-xs font-bold text-center">
                    Thank you! Your quotation enquiry has been sent directly to GAPP Packaging LLP.
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 14. FINAL CALL TO ACTION BANNER */}
      <section className="bg-[#0E525B] relative overflow-hidden text-white py-16">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center" 
          style={{ backgroundImage: `url(${images.ctaBg || defaultImages.ctaBox})` }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
            Mandideep • Bhopal • Madhya Pradesh
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">
            Need Quality Corrugated Boxes with On-Time Supply?
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            Contact designated partners Ashish Barkhade and Pramod Singh for immediate quote inquiries and technical specifications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                document.getElementById('quote-form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#008CE8] hover:bg-[#0073BF] text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
            >
              Request a Quote
            </button>
            {onOpenBrochureModal && (
              <button
                onClick={onOpenBrochureModal}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                View 9-Page PDF Brochure
              </button>
            )}
          </div>
        </div>
      </section>

    </main>
  );
};
