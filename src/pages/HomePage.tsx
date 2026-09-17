import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, Box, CheckCircle2, ShieldCheck, Truck, Clock, 
  Package, Layers, FileText, ArrowRight, Settings, Image as ImageIcon,
  X, ShoppingCart, Activity, Briefcase, Zap, PhoneCall, Mail, MapPin, 
  Upload, Loader2
} from 'lucide-react';
import { companyData } from '../data/companyData';

interface HomePageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [fileError, setFileError] = useState('');

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
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB');
      e.target.value = '';
    }
  };

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80', caption: 'Packaging warehouse or factory', span: 'col-span-2 row-span-2' },
    { src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80', caption: 'Stacked kraft boxes', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80', caption: 'Open corrugated carton box', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1580674684081-776d507bcea0?auto=format&fit=crop&q=80', caption: 'Closed shipping carton', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80', caption: 'Industrial packaging workflow', span: 'col-span-2 row-span-1' },
  ];

  return (
    <main className="flex-1 bg-white overflow-hidden text-slate-800 font-sans">
      
      {/* 3. HERO SECTION */}
      <section className="relative bg-slate-50 pt-20 pb-24 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 max-w-xl">
              <div className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-full">
                PACKAGING SOLUTIONS FOR BUSINESS
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#262D38] leading-[1.1] tracking-tight">
                Reliable Corrugated Packaging for Growing Businesses
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Customized carton boxes and packaging solutions designed for protection, presentation and dependable supply.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full sm:w-auto bg-[#008CE8] hover:bg-[#0073BF] text-white px-8 py-3.5 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Request a Quote
                </button>
                <Link
                  to="/products"
                  className="w-full sm:w-auto bg-white border border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-3.5 rounded-lg font-bold text-sm shadow-sm transition-all text-center"
                >
                  Explore Products
                </Link>
              </div>
              <div className="pt-2">
                <a href={`tel:${companyData.phones[0]}`} className="text-sm font-semibold text-[#0E525B] hover:underline flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4" />
                  Talk to our packaging team
                </a>
              </div>
            </div>

            {/* Right Image Composition */}
            <div className="relative relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80"
                alt="Corrugated Box Production"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              
              {/* Overlapping Card */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4">
                <div className="bg-slate-100 p-2.5 rounded-lg">
                  <Package className="w-6 h-6 text-[#008CE8]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">Customized Packaging</h3>
                  <p className="text-xs text-slate-500 font-medium">For B2B Requirements</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TRUST AND CAPABILITY STRIP */}
      <section className="bg-white py-10 border-b border-slate-100 shadow-sm relative z-10 -mt-1">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
            <div className="flex flex-col items-center gap-2">
              <Settings className="w-6 h-6 text-[#0E525B]" />
              <span className="font-bold text-sm text-slate-800">Customized Box Solutions</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#008CE8]" />
              <span className="font-bold text-sm text-slate-800">Consistent Quality</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Layers className="w-6 h-6 text-[#D97706]" />
              <span className="font-bold text-sm text-slate-800">B2B Bulk Supply</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-6 h-6 text-emerald-600" />
              <span className="font-bold text-sm text-slate-800">Responsive Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT GAPP SECTION */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80" 
                alt="Cardboard packaging material" 
                className="w-full rounded-2xl shadow-lg object-cover aspect-square sm:aspect-[4/3] lg:aspect-square"
              />
              <div className="absolute -top-5 -right-5 sm:top-auto sm:bottom-10 sm:-right-10 bg-[#262D38] text-white px-6 py-4 rounded-xl shadow-xl border border-slate-700">
                <span className="block font-bold text-sm">Packaging that protects</span>
                <span className="block font-bold text-sm">your product</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#008CE8]">
                ABOUT GAPP PACKAGING LLP
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Packaging solutions built around your business needs
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                GAPP Packaging LLP operates a robust manufacturing facility in the Mandideep Industrial Area, specializing in high-strength corrugated boxes and industrial packaging materials. 
                <br/><br/>
                We produce 3-ply, 5-ply, and 7-ply cartons tailored to protect FMCG, pharmaceutical, and engineering goods during transit. By focusing on customized dimensions, accurate grammage, and verified bursting strength, we provide reliable B2B supply chains that businesses across Madhya Pradesh can depend on.
              </p>
              <div className="pt-4">
                <Link to="/about" className="inline-flex items-center gap-2 font-bold text-sm text-white bg-[#0E525B] hover:bg-[#0A3642] px-6 py-3 rounded-lg transition-colors">
                  Read About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT CATEGORIES */}
      <section className="py-20 md:py-28 bg-white border-y border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-[#008CE8]">
              OUR PACKAGING SOLUTIONS
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Carton boxes for different business requirements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Corrugated Carton Boxes', desc: 'Standard 3-ply and 5-ply shippers for distribution.', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80' },
              { title: 'Printed Carton Boxes', desc: 'Flexographic printed boxes for brand identification.', img: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80' },
              { title: 'Corrugated Sheets', desc: 'Raw board sheets for separators and padding.', img: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80' },
              { title: 'Industrial Packaging', desc: '7-ply heavy-duty boxes for machinery and bulk.', img: 'https://images.unsplash.com/photo-1580674684081-776d507bcea0?auto=format&fit=crop&q=80' },
            ].map((prod, idx) => (
              <div key={idx} className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-slate-900">{prod.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{prod.desc}</p>
                  <div className="pt-3 flex items-center justify-between">
                    <Link to="/products" className="text-sm font-bold text-[#0E525B] hover:underline">View Details</Link>
                    <button onClick={() => onOpenQuoteModal()} className="text-sm font-bold text-[#008CE8] hover:underline">Request Quote</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CARTON BOX IMAGE GALLERY */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">See Our Packaging in Detail</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-xl overflow-hidden cursor-pointer group shadow-sm ${img.span}`}
                onClick={() => setActiveImage(img.src)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveImage(img.src)}
              >
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-end">
                  <div className="p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <p className="text-white font-bold text-sm">{img.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {activeImage && (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 backdrop-blur-sm"
               onClick={() => setActiveImage(null)}
               role="dialog"
               aria-modal="true"
          >
            <button className="absolute top-6 right-6 text-white hover:text-slate-300" onClick={() => setActiveImage(null)}>
              <X className="w-8 h-8" />
            </button>
            <img src={activeImage} alt="Enlarged view" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
          </div>
        )}
      </section>

      {/* 8. WHY CHOOSE GAPP SECTION */}
      <section className="py-20 md:py-28 bg-[#0A2540] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
              <Settings className="w-8 h-8 text-[#008CE8] mb-6" />
              <h3 className="font-bold text-xl mb-3">Customized Requirements</h3>
              <p className="text-slate-300 text-sm leading-relaxed">We manufacture boxes precisely dimensioned and fluted to match your product specifications.</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
              <Box className="w-8 h-8 text-[#008CE8] mb-6" />
              <h3 className="font-bold text-xl mb-3">Practical Packaging Support</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Direct advice on selecting the right ply, kraft paper GSM, and flute profiles.</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
              <ShieldCheck className="w-8 h-8 text-[#008CE8] mb-6" />
              <h3 className="font-bold text-xl mb-3">Quality-Oriented Approach</h3>
              <p className="text-slate-300 text-sm leading-relaxed">In-house testing for bursting strength (BST) and grammage ensures consistent supply.</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
              <PhoneCall className="w-8 h-8 text-[#008CE8] mb-6" />
              <h3 className="font-bold text-xl mb-3">Clear Business Communication</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Honest timelines, fast quote turnarounds, and transparent production status updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PACKAGING PROCESS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">How We Work</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
            {/* Connecting Line Desktop */}
            <div className="hidden md:block absolute top-8 left-12 right-12 h-0.5 bg-slate-200 -z-10"></div>
            
            {[
              { num: '1', title: 'Share Your Requirement', icon: FileText, desc: 'Provide dimensions and load requirements.' },
              { num: '2', title: 'Confirm Size & Material', icon: Settings, desc: 'We suggest the best ply and GSM combination.' },
              { num: '3', title: 'Review Design', icon: ImageIcon, desc: 'Finalize dimensions and flexo printing layout.' },
              { num: '4', title: 'Production & QC', icon: CheckCircle2, desc: 'Manufacturing with strict bursting strength tests.' },
              { num: '5', title: 'Dispatch', icon: Truck, desc: 'Timely delivery to your facility.' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4 w-full md:w-1/5 relative bg-white">
                <div className="w-16 h-16 shrink-0 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center relative z-10 shadow-sm">
                  <step.icon className="w-6 h-6 text-[#0E525B]" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#008CE8] text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    {step.num}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. INDUSTRIES SERVED */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Industries Served</h2>
            <p className="text-slate-600">We develop packaging solutions according to product, handling and supply requirements.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              { icon: ShoppingCart, name: 'FMCG' },
              { icon: Zap, name: 'Electronics' },
              { icon: Activity, name: 'Pharmaceuticals' },
              { icon: Briefcase, name: 'Industrial Products' },
              { icon: Package, name: 'E-commerce' }
            ].map((ind, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-[#008CE8] hover:shadow-md transition-all flex flex-col items-center gap-3 group">
                <ind.icon className="w-8 h-8 text-slate-400 group-hover:text-[#008CE8] transition-colors" />
                <span className="font-bold text-sm text-slate-700">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. REQUEST A QUOTE FORM */}
      <section className="py-20 bg-white border-y border-slate-100" id="quote-form-section">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Let�s discuss your packaging requirement
              </h2>
              <p className="text-slate-600 text-lg">
                Share your product and packaging details. Our team will review your requirement and get back to you with an accurate quotation.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                    <PhoneCall className="w-5 h-5 text-[#008CE8]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Call Us Directly</p>
                    <a href={`tel:${companyData.phones[0]}`} className="text-slate-600 hover:text-[#008CE8] block">{companyData.phones[0]}</a>
                    <a href={`tel:+919981280902`} className="text-slate-600 hover:text-[#008CE8] block">+91 9981280902</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                    <Mail className="w-5 h-5 text-[#008CE8]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Email Requirement</p>
                    <a href={`mailto:${companyData.email}`} className="text-slate-600 hover:text-[#008CE8] block">{companyData.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                    <MapPin className="w-5 h-5 text-[#008CE8]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Manufacturing Unit</p>
                    <p className="text-slate-600 text-sm max-w-xs">{companyData.factoryAddress.full}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Full Name *</label>
                    <input required type="text" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8] focus:ring-1 focus:ring-[#008CE8]" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Company Name</label>
                    <input type="text" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8] focus:ring-1 focus:ring-[#008CE8]" placeholder="Enter company name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Phone Number *</label>
                    <input required type="tel" pattern="^[0-9]{10}$" title="Valid 10-digit Indian phone number" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8] focus:ring-1 focus:ring-[#008CE8]" placeholder="10-digit number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Email Address *</label>
                    <input required type="email" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8] focus:ring-1 focus:ring-[#008CE8]" placeholder="you@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">City and State</label>
                    <input type="text" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8] focus:ring-1 focus:ring-[#008CE8]" placeholder="e.g. Bhopal, MP" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Product Required *</label>
                    <select required className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8] focus:ring-1 focus:ring-[#008CE8]">
                      <option value="">Select a product...</option>
                      <option value="3-ply">3-Ply Corrugated Box</option>
                      <option value="5-ply">5-Ply Corrugated Box</option>
                      <option value="7-ply">7-Ply Corrugated Box</option>
                      <option value="printed">Printed Carton</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Length (mm)</label>
                    <input type="number" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8]" placeholder="L" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Width (mm)</label>
                    <input type="number" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8]" placeholder="W" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Height (mm)</label>
                    <input type="number" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8]" placeholder="H" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Message</label>
                  <textarea rows={3} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#008CE8] resize-none" placeholder="Share additional requirements or load capacity details..."></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Upload Reference File</label>
                  <div className="flex items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer hover:bg-slate-100 bg-white transition-colors relative">
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png,.docx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                      <Upload className="w-6 h-6 mb-2 text-slate-400" />
                      <p className="text-sm font-semibold">Click to upload or drag and drop</p>
                      <p className="text-xs mt-1 text-slate-400">PDF, JPG, PNG or DOCX (Max 5MB)</p>
                    </div>
                  </div>
                  {fileError && <p className="text-xs text-red-500 font-bold mt-2">{fileError}</p>}
                  {fileError && <p className="text-xs text-red-500 font-bold mt-2">{fileError}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'loading'}
                  className="w-full bg-[#008CE8] hover:bg-[#0073BF] text-white font-bold py-4 rounded-lg shadow-md transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {formStatus === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                  Submit Enquiry
                </button>

                {formStatus === 'success' && (
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 text-sm font-bold text-center">
                    Thank you. Your enquiry has been received.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm font-bold text-center">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA BANNER */}
      <section className="bg-[#0E525B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Need the right carton box for your product?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            Send us your requirement and discuss a suitable packaging solution with the GAPP team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                document.getElementById('quote-form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-4 rounded-lg font-bold text-sm shadow-md transition-colors"
            >
              Request a Quote
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-sm transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
    </main>
  );
};
