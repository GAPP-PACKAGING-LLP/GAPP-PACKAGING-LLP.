import React, { useState } from 'react';
import { 
  Factory, 
  Layers, 
  Printer, 
  Scissors, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  Maximize2, 
  Activity, 
  Gauge, 
  Sparkles, 
  MapPin, 
  RotateCcw,
  ArrowRight,
  Flame,
  Scale
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

export interface PlantTourStage {
  id: number;
  stageNumber: string;
  name: string;
  tagline: string;
  bayLocation: string;
  machineryUsed: string;
  speedCapacity: string;
  qualityCheckpoint: string;
  description: string;
  keyOutputs: string[];
  imageUrl: string;
  specs: { label: string; value: string }[];
}

export const plantTourStages: PlantTourStage[] = [
  {
    id: 1,
    stageNumber: "01",
    name: "Raw Material Inward & Reel Yard",
    tagline: "Kraft Paper Roll Inspection & Moisture Metrology",
    bayLocation: "Bay A - Raw Material Yard (Mandideep)",
    machineryUsed: "Crane Infeed Hoist & Electronic Reel Weighing Scale",
    speedCapacity: "500+ Tonnes Reel Yard Capacity",
    qualityCheckpoint: "Moisture Content (< 8%) & Paper GSM Verification",
    description: "Every batch starts with strict raw material quality control. High Bursting Factor (18–35 BF) virgin and semi-virgin Kraft paper reels are tested on our digital Grammage and Moisture meters before entry into the corrugation bay.",
    keyOutputs: ["120 - 250 GSM Kraft Paper Rolls", "Verified Fluting Medium & Linerboard", "Zero-Moisture Certified Stock"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Paper GSM Range", value: "120 - 250 GSM" },
      { label: "Bursting Factor", value: "18 - 35 BF Grade" },
      { label: "Tested Standard", value: "TAPPI / ISO 536" },
      { label: "Storage Control", value: "Dry-Air Sheltered Yard" }
    ]
  },
  {
    id: 2,
    stageNumber: "02",
    name: "Continuous Fingerless Corrugation",
    tagline: "High-Speed Flute Formation & Steam Curing",
    bayLocation: "Bay B - Single Facer & Heating Line",
    machineryUsed: "52\" High-Speed Fingerless Single Facer Corrugator",
    speedCapacity: "40 - 60 Meters / Minute Continuous Output",
    qualityCheckpoint: "Flute Height Uniformity & Adhesion Strength",
    description: "Kraft paper is fed through precision fluting rolls under controlled steam heat and starch glue application. The fingerless mechanism prevents roll-mark defects, creating high-rigidity corrugated webs (B-Flute, C-Flute, E-Flute) with superior compressive strength.",
    keyOutputs: ["2-Ply Single Face Web", "Uniform Flute Geometry", "High Caliper Rigidity"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Roll Width", value: "52 Inches (1320 mm)" },
      { label: "Fluting Profile", value: "B-Flute / C-Flute / E-Flute" },
      { label: "Adhesive Type", value: "100% Food-Grade Starch" },
      { label: "Drive Type", value: "Semi-Automatic Sync Line" }
    ]
  },
  {
    id: 3,
    stageNumber: "03",
    name: "Multi-Color Flexographic Printing",
    tagline: "High-Definition Industrial Branding & Warning Graphics",
    bayLocation: "Bay C - Flexo Conversion Department",
    machineryUsed: "Two Colour High-Speed Flexo Printer Line",
    speedCapacity: "Up to 3,500 Sheets / Hour",
    qualityCheckpoint: "Color Registration Accuracy & Barcode Legibility",
    description: "Corrugated sheets pass through ceramic anilox flexographic printing cylinders with fast-drying water-based eco inks. We reproduce sharp company logos, transport handling symbols (Fragile, This Side Up), and scannable GS1 logistics barcodes.",
    keyOutputs: ["High-Contrast 2-Color Graphics", "Scannable Logistics Barcodes", "Zero-Smudge Fast-Drying Finish"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Print Colors", value: "2-Colour Flexo System" },
      { label: "Ink Standard", value: "Eco Water-Based Non-Toxic" },
      { label: "Registration", value: "Micro-Precision Alignment" },
      { label: "Stereo Plates", value: "Polymer / High-Res Rubber" }
    ]
  },
  {
    id: 4,
    stageNumber: "04",
    name: "Board Pasting & Hydraulic Platen Pressing",
    tagline: "Double Wall & Multi-Ply Lamination (3-Ply / 5-Ply / 7-Ply)",
    bayLocation: "Bay D - Lamination & Pressing Section",
    machineryUsed: "Semi-Auto Pasting Machine & Hydraulic Platen Press",
    speedCapacity: "Heavy-Duty Multi-Ply Batch Capacity",
    qualityCheckpoint: "Edge-to-Edge Starch Bond & Flatness Stability",
    description: "Single-face fluted rolls are laminated with top and bottom test liners to produce robust 3-ply, 5-ply, or 7-ply combined sheets. Hydraulic platen presses apply uniform pressure to cure the sheets flat, preventing moisture warping and curling.",
    keyOutputs: ["Flat Starch-Cured Boards", "3-Ply, 5-Ply & 7-Ply Boards", "Zero-Delamination Bonding"],
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Board Plies", value: "3-Ply, 5-Ply, 7-Ply Heavy" },
      { label: "Press Force", value: "Multi-Tonne Uniform Hydraulic" },
      { label: "Glue Viscosity", value: "Ford Cup B4 Monitored" },
      { label: "Board Flatness", value: "100% Anti-Warp Checked" }
    ]
  },
  {
    id: 5,
    stageNumber: "05",
    name: "Rotary Slitting, Scoring & Eccentric Slotting",
    tagline: "Precision Creasing & Flap Cutting",
    bayLocation: "Bay E - Conversion & Cutting Bay",
    machineryUsed: "Thin-Blade Rotary Slitter Scorer & Heavy Eccentric Slotter",
    speedCapacity: "High-Speed Rotary Gang Operations",
    qualityCheckpoint: "Exact Dimensional Tolerance (±0.5 mm) & Crease Depth",
    description: "Tough tungsten thin-blade slitters cut sheets cleanly without crushing flutes. Rotary creasers score the fold lines, and the eccentric slotter stamps out the flap notches to form precision regular slotted cartons (RSC) and custom blanks.",
    keyOutputs: ["Clean-Edge Box Blanks", "Accurate Deep Crease Scores", "Zero-Crush Flap Formation"],
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Slitter Technology", value: "Thin Blade Scorer (Zero Flute Crush)" },
      { label: "Slotting Accuracy", value: "±0.5 mm Flap Tolerance" },
      { label: "Max Sheet Width", value: "52 to 75 Inches" },
      { label: "Corner Notching", value: "Automatic Corner Cutter" }
    ]
  },
  {
    id: 6,
    stageNumber: "06",
    name: "Heavy-Duty Stitching & Flap Pasting",
    tagline: "Joint Fastening & High-Speed Carton Erection",
    bayLocation: "Bay F - Finishing & Joint Fastening Bay",
    machineryUsed: "Angular Heavy Wire Stitching Machines & Semi-Auto Gluer",
    speedCapacity: "Up to 4,000 Box Joints / Shift",
    qualityCheckpoint: "Stitch Pitch Spacing & Pull-Apart Joint Strength",
    description: "Depending on client requirements (engineering heavy parts vs food/pharma), cartons are jointed either with rust-proof electro-galvanized flat wire stitching or cold food-grade adhesive flap pasting for clean automatic packaging lines.",
    keyOutputs: ["High Tensile Stitched Cartons", "Clean Glued Pharma Shippers", "Reinforced Corner Joints"],
    imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Stitching Wire", value: "High-Tensile Zinc Coated" },
      { label: "Stitch Angle", value: "45° Heavy Angular Joint" },
      { label: "Adhesive Option", value: "Cold PVA / Hot Melt" },
      { label: "Corner Durability", value: "Tested Under 100+ kg Drop" }
    ]
  },
  {
    id: 7,
    stageNumber: "07",
    name: "In-House QC Testing Laboratory",
    tagline: "Bursting Strength (BS), Cobb, Grammage & Viscosity Metrology",
    bayLocation: "Bay G - Quality Assurance & Metrology Lab",
    machineryUsed: "Bursting Tester, Cobb Meter, Grammage Balance, Ford Cup",
    speedCapacity: "Batch Samples Tested Every 30 Minutes",
    qualityCheckpoint: "Certificate of Analysis (COA) Compliance",
    description: "Every manufacturing lot undergoes exhaustive laboratory testing on-site in Mandideep. We test bursting strength (kg/cm²), Cobb water absorption (g/m²), individual paper GSM, and glue viscosity. A formal Test Report is issued with every dispatch lot.",
    keyOutputs: ["Bursting Strength Report", "Moisture / Cobb Test Sheet", "Grammage Audit Certificate"],
    imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Bursting Pressure", value: "Digital Hydraulic (kg/cm²)" },
      { label: "Water Absorption", value: "Standard Cobb Method (g/m²)" },
      { label: "GSM Verification", value: "0.01g Precision Balance" },
      { label: "Batch COA", value: "Included with Every Invoice" }
    ]
  },
  {
    id: 8,
    stageNumber: "08",
    name: "Palletization, Bundling & Central India Dispatch",
    tagline: "Zero-Damage Strapped Strapping & Dedicated Fleet Logistics",
    bayLocation: "Bay H - Finished Goods Dispatch Dock",
    machineryUsed: "Tensioned Strapping Tools & Dedicated Transport Fleet",
    speedCapacity: "Daily Dispatch Coverage across MP & Central India",
    qualityCheckpoint: "Count Accuracy, Weather Tight Bundling & On-Time Arrival",
    description: "Completed boxes are counted, bundled in sets of 25/50 with plastic edge-protecting straps, stretch-wrapped to prevent ambient moisture absorption, and loaded onto our fleet for prompt scheduled delivery across Bhopal, Mandideep, Indore, Raisen, and MP.",
    keyOutputs: ["Strapped Weather-Tight Bundles", "Palletized Export Packs", "Guaranteed Scheduled Delivery"],
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Bundle Unit", value: "25 / 50 Boxes per Pack" },
      { label: "Protection", value: "Moisture-Proof Stretch Wrap" },
      { label: "Fleet Reach", value: "Mandideep, Bhopal, Indore, MP" },
      { label: "Delivery Rule", value: "Zero Disruption to Regular Schedule" }
    ]
  }
];

export const VirtualPlantTour: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const currentStage = plantTourStages[activeStageIndex];

  const handleNext = () => {
    setActiveStageIndex((prev) => (prev + 1) % plantTourStages.length);
  };

  const handlePrev = () => {
    setActiveStageIndex((prev) => (prev - 1 + plantTourStages.length) % plantTourStages.length);
  };

  return (
    <section id="plant-tour" className="py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden" aria-label="Interactive Virtual Plant Tour">
      
      {/* Background Subtle Tech Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#008CE8_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/15 border border-brand-accent/30 px-3 py-1 rounded-full">
            <Factory className="w-3.5 h-3.5" />
            <span>Interactive Manufacturing Tour</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Inside Mandideep: 8-Stage Manufacturing Flow
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Follow the complete step-by-step transformation from high-tensile Kraft paper rolls to lab-tested, multi-ply corrugated cartons ready for industrial packaging.
          </p>
        </div>

        {/* 8-Stage Process Navigation Bar */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700 -translate-y-1/2 z-0" />

          {/* Steps Scrollable Strip */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 pt-2 relative z-10 no-scrollbar">
            {plantTourStages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              const isPast = idx < activeStageIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`flex flex-col items-center gap-2 shrink-0 p-2.5 rounded-xl transition-all cursor-pointer group min-w-[110px] sm:min-w-[130px] ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-lg ring-2 ring-brand-primary/50'
                      : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                    isActive
                      ? 'bg-white text-brand-primary'
                      : isPast
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-700 text-slate-300'
                  }`}>
                    {stage.stageNumber}
                  </div>

                  <span className={`text-[11px] font-bold text-center leading-tight truncate max-w-[110px] ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {stage.name.split(' & ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Featured Interactive Showcase Card */}
        <div className="bg-slate-800/90 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left / Top: High-Res Machinery / Process Visual */}
          <div className="lg:col-span-6 relative aspect-video lg:aspect-auto min-h-[300px] sm:min-h-[400px] overflow-hidden bg-slate-950 flex items-center justify-center">
            <img
              src={currentStage.imageUrl}
              alt={`${currentStage.name} - Stage ${currentStage.stageNumber} at GAPP Packaging Mandideep Plant`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40 pointer-events-none" />

            {/* Floating Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-black/70 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/20 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                <span>{currentStage.bayLocation}</span>
              </span>

              <span className="text-xs font-mono font-bold text-white bg-brand-primary px-3 py-1 rounded-lg shadow">
                Stage {currentStage.stageNumber} of 08
              </span>
            </div>

            {/* Floating Bottom Machinery Banner */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-700 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-400">Core Machine / Tool</span>
                <p className="text-xs font-bold text-white leading-tight truncate max-w-[260px] sm:max-w-md">
                  {currentStage.machineryUsed}
                </p>
              </div>

              <span className="text-[11px] font-mono font-bold text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-800/60 shrink-0">
                ⚡ {currentStage.speedCapacity.split(' ')[0]} {currentStage.speedCapacity.split(' ')[1]}
              </span>
            </div>
          </div>

          {/* Right / Bottom: Detailed Engineering Breakdown */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Header Title */}
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-accent">
                  {currentStage.tagline}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {currentStage.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStage.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 gap-2.5 bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/80 text-xs font-mono">
                {currentStage.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">{spec.label}</span>
                    <span className="font-bold text-teal-300">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Quality Checkpoint Box */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Quality Assurance Checkpoint</span>
                </div>
                <p className="text-xs text-slate-300">
                  {currentStage.qualityCheckpoint}
                </p>
              </div>

              {/* Key Deliverables Delivered at this step */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Stage Output Deliverables:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentStage.keyOutputs.map((out, oIdx) => (
                    <span key={oIdx} className="text-[11px] bg-slate-700/60 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-400" />
                      <span>{out}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Navigator Buttons */}
            <div className="pt-4 border-t border-slate-700 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev Stage</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3.5 py-2 bg-brand-primary hover:bg-[#0c3c49] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer shadow-md"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <a
                href="#contact"
                className="text-xs font-bold text-brand-accent hover:text-amber-400 flex items-center gap-1 transition-colors"
              >
                <span>Book Factory Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
