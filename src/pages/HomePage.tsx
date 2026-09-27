import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, Box, CheckCircle2, ShieldCheck, Truck, Clock, 
  Package, Layers, FileText, ArrowRight, Settings, 
  ShoppingCart, Activity, Briefcase, Zap, PhoneCall, Mail, MapPin, 
  Upload, Loader2, Wrench, Eye, Cpu, Check, ChevronLeft, ChevronRight,
  Phone, Award, Building2, ExternalLink
} from 'lucide-react';
import { companyData, clientPartnersData } from '../data/companyData';
import { useCMS } from '../context/CMSContext';
import { createInquiry } from '../firebase';
import { BrandName } from '../components/common/BrandName';

// Corrugated Box Image Assets
import heroBoxImg from '../assets/images/hero_corrugated_box_1790478658140.jpg';
import aboutBoxImg from '../assets/images/about_corrugated_boxes_1790478673653.jpg';
import prod1BoxImg from '../assets/images/carton_box_standard_1790478686540.jpg';
import prod2BoxImg from '../assets/images/carton_box_printed_1790478698272.jpg';
import prod3BoxImg from '../assets/images/carton_sheets_flute_1790478709330.jpg';
import industrialBoxImg from '../assets/images/industrial_heavy_carton_1790478721215.jpg';

interface HomePageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [generatedRefCode, setGeneratedRefCode] = useState<string>('');
  const [fileError, setFileError] = useState('');
  const [fileName, setFileName] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    productType: '5-ply',
    length: '',
    width: '',
    height: '',
    monthlyQuantity: '',
    message: ''
  });

  const { settings, clients } = useCMS();
  const primaryPhone = settings.phones?.[0] || companyData.phones[0];
  const secondaryPhone = settings.phones?.[1] || companyData.phones[1];
  const factoryEmail = settings.email || companyData.email;

  // Active client partners list from CMS or fallback
  const rawClients = clients && clients.length > 0 ? clients : clientPartnersData;
  const activeClients = rawClients.filter(c => c.isActive !== false);

  const [clientSectorFilter, setClientSectorFilter] = useState<string>('All');
  const [clientCarouselPage, setClientCarouselPage] = useState<number>(0);

  const clientSectors = ['All', 'Pharmaceuticals', 'Food & FMCG', 'Beverage & Trade'];

  const filteredClients = activeClients.filter((client) => {
    if (clientSectorFilter === 'All') return true;
    const sec = (client.sector || '').toLowerCase();
    if (clientSectorFilter === 'Pharmaceuticals') {
      return sec.includes('pharma') || sec.includes('biotech') || sec.includes('health');
    }
    if (clientSectorFilter === 'Food & FMCG') {
      return sec.includes('food') || sec.includes('bakery') || sec.includes('fmcg') || sec.includes('confectionery');
    }
    if (clientSectorFilter === 'Beverage & Trade') {
      return sec.includes('distiller') || sec.includes('beverage') || sec.includes('trade') || sec.includes('consumer');
    }
    return true;
  });

  // OKCPL-Style Hero Slides
  const heroSlides = [
    {
      id: 1,
      badge: "A Reliable Packaging Material Manufacturer",
      headline: "High Quality Corrugated Carton Boxes & Custom Converting",
      description: "We offer high quality of corrugated boxes. We are proud to present our clients an unsurpassed range of 3-Ply, 5-Ply and 7-Ply Corrugated Boxes, manufactured at Mandideep Industrial Area as per the highest industrial strength standards.",
      bgImage: heroBoxImg,
      primaryAction: {
        label: "Enquiry Now!",
        isModal: true
      },
      secondaryAction: {
        label: "Our Products",
        link: "/products"
      }
    },
    {
      id: 2,
      badge: "Integrated Manufacturing Plant in Mandideep",
      headline: "12 Precision Converting Machinery Lines",
      description: "Equipped with high-speed fingerless single facer corrugators, 2-colour ceramic anilox flexo printer slotters, rotary slitter scorers, and auto wire stitchers for high-capacity continuous production.",
      bgImage: aboutBoxImg,
      primaryAction: {
        label: "Explore Facilities",
        link: "/infrastructure"
      },
      secondaryAction: {
        label: "8-Stage Plant Tour",
        link: "/plant-tour"
      }
    },
    {
      id: 3,
      badge: "Adherence to Quality Norms & Prompt Service",
      headline: "In-House Quality Testing Laboratory & Batch Certification",
      description: "Zero compromise on Burst Factor (BST), paper GSM balances, Cobb water absorption, and moisture tolerances. A formal test certificate is issued with every delivered lot.",
      bgImage: industrialBoxImg,
      primaryAction: {
        label: "Quality Policy & Lab",
        link: "/quality"
      },
      secondaryAction: {
        label: "Instant RFQ",
        isModal: true
      }
    }
  ];

  // Auto-play slider
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size must be under 5MB');
      } else {
        setFileError('');
        setFileName(file.name);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fileError) return;
    setFormStatus('loading');

    try {
      const generatedRef = `GAPP-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
      
      await createInquiry({
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        boxType: formData.productType === '3-ply' ? '3-Ply Corrugated Box' :
                 formData.productType === '5-ply' ? '5-Ply Corrugated Box' :
                 formData.productType === '7-ply' ? '7-Ply Heavy-Duty Box' :
                 formData.productType === 'printed' ? 'Printed Custom Carton' : 'Custom Corrugated Packaging',
        plyCount: formData.productType === '3-ply' ? '3-ply' :
                  formData.productType === '7-ply' ? '7-ply' : '5-ply',
        dimensionsLength: formData.length,
        dimensionsWidth: formData.width,
        dimensionsHeight: formData.height,
        dimensionUnit: 'mm',
        monthlyQuantity: formData.monthlyQuantity,
        deliveryLocation: formData.location,
        message: `${formData.message} ${fileName ? `[Reference Attached: ${fileName}]` : ''}`.trim(),
        status: 'new',
        source: 'homepage_rfq_form',
        inquiryRef: generatedRef
      });

      setGeneratedRefCode(generatedRef);
      setFormStatus('success');
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        location: '',
        productType: '5-ply',
        length: '',
        width: '',
        height: '',
        monthlyQuantity: '',
        message: ''
      });
      setFileName('');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setFormStatus('error');
    }
  };

  return (
    <main className="flex-1 bg-white overflow-hidden text-slate-800 font-sans">
      
      {/* ========================================================================= */}
      {/* 1. OKCPL-STYLE HERO SLIDER / BANNER                                       */}
      {/* ========================================================================= */}
      <section 
        className="relative bg-slate-900 border-b-4 border-[#008CE8] overflow-hidden min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Background Image with Industrial Tint Overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.bgImage}
                  alt={slide.headline}
                  className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>

              {/* Slide Content Container */}
              <div className="relative h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center z-20">
                <div className="max-w-2xl text-white space-y-5 pt-8 pb-12">
                  
                  {/* OKCPL Top Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#008CE8]/20 border border-[#008CE8]/50 text-[#008CE8] font-bold text-xs uppercase tracking-wider backdrop-blur-xs">
                    <Box className="w-3.5 h-3.5" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
                    {slide.headline}
                  </h1>

                  {/* Description */}
                  <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
                    {slide.description}
                  </p>

                  {/* OKCPL Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    {slide.primaryAction.isModal ? (
                      <button
                        onClick={() => onOpenQuoteModal()}
                        className="bg-[#008CE8] hover:bg-[#0073BF] text-white px-8 py-3.5 rounded font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                      >
                        <Send className="w-4 h-4" />
                        <span>{slide.primaryAction.label}</span>
                      </button>
                    ) : (
                      <Link
                        to={slide.primaryAction.link || '/'}
                        className="bg-[#008CE8] hover:bg-[#0073BF] text-white px-8 py-3.5 rounded font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                      >
                        <span>{slide.primaryAction.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}

                    {slide.secondaryAction.isModal ? (
                      <button
                        onClick={() => onOpenQuoteModal()}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white px-7 py-3.5 rounded font-extrabold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-xs transition-all cursor-pointer"
                      >
                        {slide.secondaryAction.label}
                      </button>
                    ) : (
                      <Link
                        to={slide.secondaryAction.link || '/'}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white px-7 py-3.5 rounded font-extrabold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-xs transition-all"
                      >
                        {slide.secondaryAction.label}
                      </Link>
                    )}
                  </div>

                  {/* Direct Contact Quick Strip */}
                  <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5 text-white">
                      <Phone className="w-3.5 h-3.5 text-[#008CE8]" />
                      Direct Sales: <a href={`tel:${primaryPhone}`} className="text-[#008CE8] hover:underline ml-1 font-bold">{primaryPhone}</a>
                    </span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="text-slate-300 hidden sm:inline">Mandideep Industrial Area (Bhopal)</span>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Slider Controls (Prev / Next Buttons) */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-[#008CE8] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-[#008CE8] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-[#008CE8]' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT COMPANY SECTION (REPLICATING OKCPL ABOUT US SECTION)              */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-4 border-slate-100 bg-slate-100">
                <img 
                  src={aboutBoxImg} 
                  alt="GAPP Packaging LLP Corrugated Boxes Manufacturing Unit Mandideep" 
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Plant Stats Floating Box */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:right-4 bg-[#262D38] text-white p-4 sm:p-5 rounded shadow-xl border-l-4 border-[#008CE8] max-w-xs">
                <span className="block font-bold text-xs uppercase tracking-wider text-[#008CE8]">Manufacturing Plant</span>
                <span className="block font-bold text-sm text-white mt-0.5">Mandideep Industrial Area</span>
                <span className="block text-[11px] text-slate-300 mt-0.5">Distt. Raisen, Madhya Pradesh</span>
              </div>
            </div>

            {/* Right Industrial Content (OKCPL Copy Model) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#008CE8] bg-blue-50 px-3 py-1 rounded">
                ABOUT COMPANY
              </div>

              {/* Headline with Logo Colors only for the name */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#262D38] leading-tight">
                About <BrandName includeSuffix showTagline={false} className="inline text-inherit" />
              </h2>

              {/* Descriptive Paragraphs in OKCPL Style */}
              <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
                <p>
                  <BrandName includeSuffix showTagline={false} className="inline font-bold" /> is situated at Survey no. 13/1/1/3, Khanpura Rd, Industrial Area Mandideep, Distt. Raisen (Madhya Pradesh), operating modern infrastructure and high-speed converting machinery lines to manufacture robust corrugated boxes in Madhya Pradesh.
                </p>
                <p>
                  We specialize in manufacturing <strong>Customized Corrugated Boxes and Sheets</strong> with comprehensive facilities for <strong>A, B, C, and E flutes</strong>. Our Mandideep manufacturing plant features 12 precision converting machinery lines, an in-house quality testing laboratory, and a spacious godown for finished goods to ensure continuous, prompt dispatch.
                </p>
                <p>
                  We have dedicated transport and supply logistics for safe delivery of finished goods directly to customer locations across Bhopal, Mandideep, Raisen, Indore, and Central India.
                </p>
                <p>
                  Our client list includes reputed enterprises across FMCG, pharmaceuticals, confectionery, automotive engineering, food processing, and logistics.
                </p>
              </div>

              {/* OKCPL 4 Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#008CE8] shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-slate-800">12 Converting Machinery Lines at Mandideep</span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#008CE8] shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-slate-800">3-Ply, 5-Ply & 7-Ply Heavy-Duty Master Cartons</span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#008CE8] shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-slate-800">In-House Lab for Bursting Strength & GSM QC</span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#008CE8] shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-slate-800">Dedicated Transport Logistics for Doorstep Supply</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#0E525B] hover:bg-[#0A3642] text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-wider shadow-xs transition-colors"
                >
                  <span>Read Full Company Profile</span>
                  <ArrowRight className="w-4 h-4 text-[#008CE8]" />
                </Link>
                <Link
                  to="/infrastructure"
                  className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-[#008CE8] bg-white px-5 py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <Wrench className="w-4 h-4 text-[#008CE8]" />
                  <span>Inspect Plant Facilities</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR PRODUCTS SECTION (REPLICATING OKCPL OUR PRODUCTS SECTION)          */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8]">
              MANUFACTURING CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#262D38]">
              Our Products
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Cardboard boxes made from best quality raw materials for superior quality & strength. Available in every size or as per customer requirements.
            </p>
          </div>

          {/* Product Cards Grid (6 OKCPL-Style Product Categories) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 'carton-box',
                title: 'Corrugated Carton Boxes',
                subtitle: 'Card Board Boxes',
                desc: 'Standard 3-ply and 5-ply universal kraft boxes for distribution, commercial shipping, and storage with high burst factor.',
                image: prod1BoxImg,
                badge: '3-Ply & 5-Ply'
              },
              {
                id: 'printed-boxes',
                title: 'Printed Brand Cartons',
                subtitle: 'Flexo Printed Boxes',
                desc: 'Two-colour ceramic anilox flexo printed cartons with sharp corporate branding, barcodes, and handling marks.',
                image: prod2BoxImg,
                badge: 'Custom Flexo'
              },
              {
                id: 'heavy-duty',
                title: 'Heavy-Duty Industrial Boxes',
                subtitle: '7-Ply Export Grade',
                desc: '7-ply reinforced multi-wall export containers engineered for automobile parts, engineering equipment, and heavy loads.',
                image: industrialBoxImg,
                badge: '7-Ply Heavy Duty'
              },
              {
                id: 'sheets-pads',
                title: 'Corrugated Sheets & Pads',
                subtitle: 'Fluted Fitments & Separators',
                desc: 'Fluted layer pads, partitions, separator boards, and corner fitments for inner cushioning and damage-free transit.',
                image: prod3BoxImg,
                badge: 'Fitments & Pads'
              },
              {
                id: 'die-cut',
                title: 'Die-Cut & Punching Cartons',
                subtitle: 'Custom Die-Cut Packaging',
                desc: 'Precision die-cut and lock-bottom packaging manufactured to exact customer specifications for confectionery and retail products.',
                image: heroBoxImg,
                badge: 'Die-Cut Custom'
              },
              {
                id: 'food-agro',
                title: 'Food & Agro Packaging Cartons',
                subtitle: 'Hygienic Grade Cartons',
                desc: 'Odorless, 100% recyclable corrugated cartons engineered for agricultural produce, processed food, and perishables.',
                image: aboutBoxImg,
                badge: 'Food & Agro'
              }
            ].map((prod) => (
              <div 
                key={prod.id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={`${prod.title} by GAPP Packaging LLP`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#008CE8] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                      {prod.badge}
                    </div>
                  </div>

                  {/* Product Text */}
                  <div className="p-5 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#0E525B]">{prod.subtitle}</p>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#008CE8] transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {prod.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
                  <Link
                    to="/products"
                    className="text-xs font-bold text-[#0E525B] hover:text-[#008CE8] transition-colors"
                  >
                    View Specs &rarr;
                  </Link>
                  <button
                    onClick={() => onOpenQuoteModal(prod.title)}
                    className="bg-[#008CE8] hover:bg-[#0073BF] text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                  >
                    Enquiry Now!
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Central Button */}
          <div className="text-center pt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#262D38] hover:bg-slate-800 text-white px-8 py-3.5 rounded font-extrabold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <span>View More Products in Catalog</span>
              <ArrowRight className="w-4 h-4 text-[#008CE8]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FACILITIES & INFRASTRUCTURE (REPLICATING OKCPL FACILITIES SECTION)      */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-[#0A3642] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#008CE8] border border-white/15 text-xs font-bold uppercase tracking-widest rounded">
                <Wrench className="w-3.5 h-3.5" />
                <span>MANUFACTURING INFRASTRUCTURE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Our Facilities & Precision Machinery Lines
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Operating from Mandideep Industrial Area, <BrandName theme="dark" includeSuffix showTagline={false} className="inline" /> is equipped with 12 specialized machines including high-speed fingerless corrugators, ceramic anilox flexo printer slotters, rotary slitter scorers, eccentric slotters, and semi-automatic wire stitchers.
              </p>

              {/* 3 Facility Highlights Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-xs">
                <div className="bg-white/10 p-4 rounded border border-white/10 space-y-1">
                  <div className="text-[#008CE8] font-bold text-sm">Corrugation</div>
                  <div className="text-white font-semibold">High-Speed Fingerless</div>
                  <div className="text-slate-300 text-[11px]">52" heavy conversion rolls for rapid flute formation</div>
                </div>
                <div className="bg-white/10 p-4 rounded border border-white/10 space-y-1">
                  <div className="text-[#008CE8] font-bold text-sm">Printing & Slotting</div>
                  <div className="text-white font-semibold">2-Colour Ceramic Flexo</div>
                  <div className="text-slate-300 text-[11px]">Motorized micro-registration and clean slotting</div>
                </div>
                <div className="bg-white/10 p-4 rounded border border-white/10 space-y-1">
                  <div className="text-[#008CE8] font-bold text-sm">Finishing & Binding</div>
                  <div className="text-white font-semibold">Wire Stitching & Scoring</div>
                  <div className="text-slate-300 text-[11px]">Thin-blade rotary slitter scorers & high-speed wire stitchers</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center items-stretch">
              <Link
                to="/infrastructure"
                className="bg-[#008CE8] hover:bg-[#0073BF] text-white px-6 py-4 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 text-center"
              >
                <Cpu className="w-4 h-4" />
                <span>View All 12 Machinery Lines</span>
              </Link>
              <Link
                to="/plant-tour"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-4 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-center"
              >
                <Eye className="w-4 h-4 text-[#008CE8]" />
                <span>8-Stage Plant Tour</span>
              </Link>
              <Link
                to="/quality"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-4 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-center"
              >
                <ShieldCheck className="w-4 h-4 text-[#008CE8]" />
                <span>In-House Testing Laboratory</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR CLIENTS SECTION (REPLICATING OKCPL OUR CLIENTS SECTION)             */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with OKCPL Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-100">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8] bg-blue-50 px-3 py-1 rounded inline-block">
                TRUSTED CLIENT PARTNERS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#262D38]">
                Our Clients
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Supplying high-strength corrugated boxes to leading pharmaceutical, confectionery, distilleries, and FMCG manufacturing brands across Central India.
              </p>
            </div>

            {/* Sector Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {clientSectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setClientSectorFilter(sector)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    clientSectorFilter === sector
                      ? 'bg-[#008CE8] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {filteredClients.map((client) => (
              <div 
                key={client.id}
                className="bg-white border border-slate-200 hover:border-[#008CE8] rounded-xl p-4 sm:p-5 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Active Indicator Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#008CE8] transition-colors"></div>

                {/* Client Logo Image Container */}
                <div className="w-full h-18 sm:h-22 bg-slate-50/70 group-hover:bg-white rounded-lg p-2 flex items-center justify-center border border-slate-100 group-hover:border-blue-100 transition-all">
                  {client.logoUrl ? (
                    <img 
                      src={client.logoUrl} 
                      alt={`${client.name} official client logo`}
                      className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Building2 className="w-8 h-8 text-[#008CE8]" />
                      <span className="text-[11px] font-bold text-slate-700 mt-1">{client.name.substring(0, 14)}</span>
                    </div>
                  )}
                </div>

                {/* Client Details & Vendor Badging */}
                <div className="w-full pt-3 mt-2 border-t border-slate-100 space-y-1">
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-[#008CE8] transition-colors" title={client.name}>
                    {client.name}
                  </h4>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-[10px] font-semibold text-[#0E525B] bg-teal-50 px-2 py-0.5 rounded border border-teal-100 line-clamp-1">
                      {client.sector}
                    </span>
                  </div>
                  {client.details && (
                    <p className="text-[10px] text-slate-500 font-medium line-clamp-1" title={client.details}>
                      {client.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Guarantee Strip */}
          <div className="mt-10 p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-700 font-medium">
              <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#008CE8]" />
                10+ Major Industrial Plants in Mandideep & MP
              </span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Laboratory Batch Test Certificate With Every Consignment
              </span>
            </div>

            <Link
              to="/clients"
              className="text-xs font-bold text-[#0E525B] hover:text-[#008CE8] inline-flex items-center gap-1.5 shrink-0 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-[#008CE8] transition-colors"
            >
              <span>View Client Supply Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#008CE8]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. GET IN TOUCH & QUICK ENQUIRY FORM (REPLICATING OKCPL GET IN TOUCH)     */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-slate-50" id="enquiry-section">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Get in Touch (OKCPL style) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#008CE8] bg-blue-50 px-3 py-1 rounded">
                CONTACT FACTORY
              </div>

              <h2 className="text-3xl font-extrabold text-[#262D38]">
                Get in Touch
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Connect directly with the manufacturing desk at <BrandName includeSuffix showTagline={false} className="inline" /> for pricing, custom flute calibration, paper GSM optimization, and bulk commercial orders.
              </p>

              {/* Plant Details Box */}
              <div className="space-y-4 pt-2">
                
                {/* Address */}
                <div className="flex items-start gap-3.5 p-4 rounded bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 bg-blue-50 rounded text-[#008CE8] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase">Plant & Works Address</h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                      {settings.factoryAddress?.full || companyData.factoryAddress.full}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">
                      Mandideep Industrial Area, Distt. Raisen - 464993, (M.P.) India
                    </p>
                  </div>
                </div>

                {/* Phone & Mobile */}
                <div className="flex items-start gap-3.5 p-4 rounded bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 bg-blue-50 rounded text-[#008CE8] shrink-0 mt-0.5">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase">Telephone / Mobile</h3>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                      <a href={`tel:${primaryPhone}`} className="hover:text-[#008CE8] transition-colors">{primaryPhone}</a>
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600">
                      <a href={`tel:${secondaryPhone}`} className="hover:text-[#008CE8] transition-colors">{secondaryPhone}</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-4 rounded bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 bg-blue-50 rounded text-[#008CE8] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase">E-Mail</h3>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                      <a href={`mailto:${factoryEmail}`} className="hover:text-[#008CE8] transition-colors">{factoryEmail}</a>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Formal quotation provided within 24 business hours</p>
                  </div>
                </div>

                {/* Legal & GST Strip */}
                <div className="p-3 bg-white rounded border border-slate-200 text-[11px] font-mono text-slate-600 flex flex-wrap items-center justify-between gap-2">
                  <span><strong>GSTIN:</strong> {settings.gst || companyData.gst}</span>
                  <span><strong>LLPIN:</strong> {settings.llpin || companyData.llpin}</span>
                </div>

              </div>

            </div>

            {/* Right Column: Quick Enquiry Form (OKCPL style) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-md">
              
              <div className="border-b border-slate-100 pb-4 mb-5">
                <h3 className="text-xl font-extrabold text-[#262D38]">
                  Quick Enquiry Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your required carton box specifications for direct factory rates.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Your Name *</label>
                    <input 
                      required 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#008CE8]" 
                      placeholder="e.g. Rajesh Kumar" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#008CE8]" 
                      placeholder="e.g. Apex Industries" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Mobile Number *</label>
                    <input 
                      required 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      pattern="^[0-9+ -]{10,15}$"
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#008CE8]" 
                      placeholder="10-digit mobile number" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Email Address *</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#008CE8]" 
                      placeholder="name@company.com" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Product Type *</label>
                    <select 
                      required 
                      name="productType"
                      value={formData.productType}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#008CE8]"
                    >
                      <option value="3-ply">3-Ply Corrugated Box</option>
                      <option value="5-ply">5-Ply Corrugated Box (Universal)</option>
                      <option value="7-ply">7-Ply Heavy-Duty Export Carton</option>
                      <option value="printed">Custom Flexo Printed Carton</option>
                      <option value="sheets">Corrugated Sheets & Layer Pads</option>
                      <option value="other">Custom Specification / Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Monthly Quantity</label>
                    <input 
                      type="text" 
                      name="monthlyQuantity"
                      value={formData.monthlyQuantity}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#008CE8]" 
                      placeholder="e.g. 5,000 boxes / month" 
                    />
                  </div>
                </div>

                {/* Box Dimensions in mm */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Length (mm)</label>
                    <input 
                      type="number" 
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#008CE8]" 
                      placeholder="L (mm)" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Width (mm)</label>
                    <input 
                      type="number" 
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#008CE8]" 
                      placeholder="W (mm)" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Height (mm)</label>
                    <input 
                      type="number" 
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#008CE8]" 
                      placeholder="H (mm)" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Message / Requirements</label>
                  <textarea 
                    rows={2} 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#008CE8] resize-none" 
                    placeholder="Specify payload weight, printing details, flute requirement..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'loading'}
                  className="w-full bg-[#008CE8] hover:bg-[#0073BF] text-white font-extrabold py-3.5 rounded shadow transition-colors disabled:opacity-70 flex justify-center items-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Enquiry to Plant...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enquiry Now!</span>
                    </>
                  )}
                </button>

                {formStatus === 'success' && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Enquiry Submitted Successfully!</span>
                    </div>
                    <p>Reference Code: <span className="font-mono font-bold">{generatedRefCode}</span></p>
                    <p className="text-emerald-700 text-[11px]">Our Mandideep plant team will contact you shortly with the quotation.</p>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200 text-xs font-bold text-center">
                    Something went wrong. Please call us directly at {primaryPhone}.
                  </div>
                )}

              </form>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
};
