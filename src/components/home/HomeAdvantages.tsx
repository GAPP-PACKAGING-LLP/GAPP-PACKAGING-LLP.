import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  ShieldCheck, 
  Recycle, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  FileCheck2,
  Cpu,
  Clock
} from 'lucide-react';

export const HomeAdvantages: React.FC = () => {
  const pillars = [
    {
      id: 'fleet',
      icon: Cpu,
      badge: 'Modern Equipment',
      title: '12 Semi-Automatic Conversion Lines',
      description: 'Equipped with 52" high-speed fingerless corrugators, 2-color flexographic printer, thin-blade rotary slitters, and 140T heavy die-cutters running in Mandideep.',
      highlight: 'Zero flute crushing & clean edges',
      linkTo: '/infrastructure',
      linkText: 'View Installed Machinery'
    },
    {
      id: 'qa-lab',
      icon: FileCheck2,
      badge: 'Certified QC',
      title: 'In-House Laboratory Testing',
      description: 'Every production lot is sampled and tested for Bursting Strength (BF), Grammage (GSM), Cobb water absorption, and Moisture content prior to dispatch.',
      highlight: 'Test Certificate with every lot',
      linkTo: '/quality',
      linkText: 'View Quality Assurance'
    },
    {
      id: 'eco',
      icon: Recycle,
      badge: '100% Sustainable',
      title: 'Zero-Discharge & Zero Plastic',
      description: 'We process 100% recyclable Kraft paper bonded with eco-friendly natural starch adhesives. Zero toxic effluents and zero single-use plastics across our facility.',
      highlight: 'Environmentally compliant & food-safe',
      linkTo: '/about',
      linkText: 'Read Environment Policy'
    },
    {
      id: 'logistics',
      icon: Clock,
      badge: 'JIT Logistics',
      title: '24-48 Hr Dispatch & Urgent Flexibility',
      description: 'Located right off the national highway in Mandideep, we maintain direct fleet routes for prompt Just-In-Time delivery to Bhopal, Indore, Dewas, and Central India.',
      highlight: 'Urgent order turnaround capability',
      linkTo: '/contact',
      linkText: 'Contact Mandideep Plant'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-brand-primary" />
            <span>The GAPP Manufacturing Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Why Central India's Leading Enterprises Partner With Us
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From precision engineering to stringent quality governance, we eliminate packaging failures, transit damages, and supply chain delays.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:border-brand-primary/40 hover:shadow-md transition-all duration-200 space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6 text-brand-accent" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 flex items-center gap-2 text-xs font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="text-xs font-bold text-brand-primary">{pillar.highlight}</span>
                  </div>
                </div>

                <Link
                  to={pillar.linkTo}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors pt-3 border-t border-slate-200/70"
                >
                  <span>{pillar.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
