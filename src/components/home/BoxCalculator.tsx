import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Layers, 
  Send, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  MessageSquare,
  HelpCircle,
  Package
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { companyData } from '../../data/companyData';

interface BoxCalculatorProps {
  onOpenQuoteWithSpec: (spec: {
    boxType: string;
    dimensions: { length: string; width: string; height: string; unit: 'mm' | 'inches' };
    ply: string;
  }) => void;
}

export const BoxCalculator: React.FC<BoxCalculatorProps> = ({ onOpenQuoteWithSpec }) => {
  const [unit, setUnit] = useState<'mm' | 'inches'>('mm');
  const [length, setLength] = useState<number>(400);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(250);
  const [plyCount, setPlyCount] = useState<'3-ply' | '5-ply' | '7-ply'>('5-ply');
  const [kraftGrade, setKraftGrade] = useState<'standard' | 'high-bf' | 'heavy-export'>('high-bf');
  const [printOption, setPrintOption] = useState<'plain' | '1-color' | '2-color' | 'multi-color'>('1-color');
  const [estimatedQuantity, setEstimatedQuantity] = useState<number>(2500);

  // Conversion to mm for standard formulas
  const l_mm = unit === 'inches' ? length * 25.4 : length;
  const w_mm = unit === 'inches' ? width * 25.4 : width;
  const h_mm = unit === 'inches' ? height * 25.4 : height;

  // Box Calculations (RSC standard formula)
  const calculations = useMemo(() => {
    // Sheet blank dimensions in mm
    // Length sheet = 2 * (L + W) + joint allowance (approx 40mm)
    // Width sheet = H + W (top and bottom flaps)
    const blankLength_mm = (2 * (l_mm + w_mm)) + (plyCount === '7-ply' ? 60 : 45);
    const blankWidth_mm = h_mm + w_mm;

    // Sheet area in sq. meters
    const sheetArea_sqm = (blankLength_mm * blankWidth_mm) / 1000000;
    const sheetArea_sqft = sheetArea_sqm * 10.7639;

    // Estimated box weight in grams based on ply and paper GSM
    let gsmAvg = 160;
    let layers = 3;
    let takeupFactor = 1.35;

    if (plyCount === '3-ply') {
      layers = 3;
      gsmAvg = kraftGrade === 'standard' ? 140 : kraftGrade === 'high-bf' ? 180 : 220;
    } else if (plyCount === '5-ply') {
      layers = 5;
      gsmAvg = kraftGrade === 'standard' ? 160 : kraftGrade === 'high-bf' ? 200 : 250;
    } else {
      layers = 7;
      gsmAvg = kraftGrade === 'standard' ? 180 : kraftGrade === 'high-bf' ? 240 : 300;
    }

    // Weight estimate approx = sheetArea * total effective GSM
    const effectiveTotalGsm = (plyCount === '3-ply' ? (2 + takeupFactor) : plyCount === '5-ply' ? (3 + 2 * takeupFactor) : (4 + 3 * takeupFactor)) * gsmAvg;
    const estimatedWeightGrams = Math.round(sheetArea_sqm * effectiveTotalGsm);

    // Box Compression Strength (BCT kgf) estimate
    let estimatedBct_kgf = 0;
    let maxRecommendedPayload_kg = 0;

    if (plyCount === '3-ply') {
      estimatedBct_kgf = Math.round(120 + (kraftGrade === 'standard' ? 40 : 90));
      maxRecommendedPayload_kg = kraftGrade === 'standard' ? 12 : 18;
    } else if (plyCount === '5-ply') {
      estimatedBct_kgf = Math.round(320 + (kraftGrade === 'standard' ? 80 : 180));
      maxRecommendedPayload_kg = kraftGrade === 'standard' ? 30 : 45;
    } else {
      estimatedBct_kgf = Math.round(750 + (kraftGrade === 'standard' ? 150 : 350));
      maxRecommendedPayload_kg = kraftGrade === 'standard' ? 80 : 150;
    }

    // Volumetric weight for logistics (L * W * H in cm / 5000)
    const volWeight_kg = ((l_mm / 10) * (w_mm / 10) * (h_mm / 10)) / 5000;

    return {
      sheetArea_sqm: sheetArea_sqm.toFixed(3),
      sheetArea_sqft: sheetArea_sqft.toFixed(2),
      estimatedWeightGrams,
      estimatedBct_kgf,
      maxRecommendedPayload_kg,
      volWeight_kg: volWeight_kg.toFixed(2),
      blankLength_mm: Math.round(blankLength_mm),
      blankWidth_mm: Math.round(blankWidth_mm)
    };
  }, [l_mm, w_mm, h_mm, plyCount, kraftGrade]);

  const handleTransferToQuote = () => {
    onOpenQuoteWithSpec({
      boxType: `${plyCount.toUpperCase()} Heavy RSC Carton (${kraftGrade})`,
      dimensions: {
        length: length.toString(),
        width: width.toString(),
        height: height.toString(),
        unit
      },
      ply: plyCount
    });
  };

  const handleDirectWhatsAppSpec = () => {
    const msg = encodeURIComponent(
      `*GAPP Packaging - Custom Box Specification*\n` +
      `*Structure:* ${plyCount.toUpperCase()} (${kraftGrade.toUpperCase()} Paper)\n` +
      `*Dimensions:* ${length} x ${width} x ${height} ${unit}\n` +
      `*Est. Sheet Size:* ${calculations.blankLength_mm} x ${calculations.blankWidth_mm} mm\n` +
      `*Est. Box Weight:* ~${calculations.estimatedWeightGrams} grams\n` +
      `*Target BCT:* ~${calculations.estimatedBct_kgf} kgf\n` +
      `*Print Spec:* ${printOption.toUpperCase()}\n` +
      `*Estimated Quantity:* ${estimatedQuantity} units\n` +
      `Please provide factory quotation for Mandideep dispatch.`
    );
    window.open(`https://wa.me/${companyData.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="box-calculator" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badgeText="B2B Engineering Utility"
          title="Custom Boxes & Corrugated Packaging Configurator"
          subtitle="Input your required carton dimensions, wall construction, and kraft paper grade to instantly calculate sheet blank dimensions, Box Compression Test (BCT) estimates, and generate a customized RFQ."
        />

        {/* 2-Column Calculator Container */}
        <div className="bg-[#F8F9FA] rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-xs">
          
          {/* Left Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unit Selector */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Dimension Unit
              </span>
              <div className="inline-flex rounded-md shadow-2xs bg-white p-1 border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (unit === 'inches') {
                      setLength(Math.round(length * 25.4));
                      setWidth(Math.round(width * 25.4));
                      setHeight(Math.round(height * 25.4));
                    }
                    setUnit('mm');
                  }}
                  className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
                    unit === 'mm' ? 'bg-[#0F4C5C] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Millimeters (mm)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (unit === 'mm') {
                      setLength(Math.round(length / 25.4));
                      setWidth(Math.round(width / 25.4));
                      setHeight(Math.round(height / 25.4));
                    }
                    setUnit('inches');
                  }}
                  className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
                    unit === 'inches' ? 'bg-[#0F4C5C] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Inches
                </button>
              </div>
            </div>

            {/* Dimension Sliders & Inputs */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                2. Internal Box Dimensions (L × W × H)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Length */}
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Length (L)</span>
                    <span className="font-mono text-[#0F4C5C]">{length} {unit}</span>
                  </div>
                  <input
                    type="number"
                    min={unit === 'mm' ? 100 : 4}
                    max={unit === 'mm' ? 2000 : 80}
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full text-sm font-mono p-1 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-[#0F4C5C]"
                  />
                </div>

                {/* Width */}
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Width (W)</span>
                    <span className="font-mono text-[#0F4C5C]">{width} {unit}</span>
                  </div>
                  <input
                    type="number"
                    min={unit === 'mm' ? 100 : 4}
                    max={unit === 'mm' ? 1500 : 60}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full text-sm font-mono p-1 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-[#0F4C5C]"
                  />
                </div>

                {/* Height */}
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Height (H)</span>
                    <span className="font-mono text-[#0F4C5C]">{height} {unit}</span>
                  </div>
                  <input
                    type="number"
                    min={unit === 'mm' ? 80 : 3}
                    max={unit === 'mm' ? 1500 : 60}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full text-sm font-mono p-1 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-[#0F4C5C]"
                  />
                </div>

              </div>
            </div>

            {/* Wall Construction (Ply) */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                3. Wall Construction (Ply Count)
              </span>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPlyCount('3-ply')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    plyCount === '3-ply'
                      ? 'bg-white border-[#0F4C5C] ring-2 ring-[#0F4C5C]/20 shadow-xs'
                      : 'bg-white/60 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="font-bold text-slate-900">3-Ply (Single Wall)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Payload up to 15 kg</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlyCount('5-ply')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    plyCount === '5-ply'
                      ? 'bg-white border-[#0F4C5C] ring-2 ring-[#0F4C5C]/20 shadow-xs'
                      : 'bg-white/60 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="font-bold text-slate-900">5-Ply (Double Wall)</div>
                  <div className="text-[11px] text-[#0F4C5C] font-semibold mt-0.5">Industrial Benchmark</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlyCount('7-ply')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    plyCount === '7-ply'
                      ? 'bg-white border-[#0F4C5C] ring-2 ring-[#0F4C5C]/20 shadow-xs'
                      : 'bg-white/60 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="font-bold text-slate-900">7-Ply (Triple Wall)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Payload up to 150 kg</div>
                </button>
              </div>
            </div>

            {/* Paper Quality Grade */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                4. Kraft Paper Grade & Burst Factor (BF)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setKraftGrade('standard')}
                  className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    kraftGrade === 'standard' ? 'bg-white border-[#0F4C5C] ring-1 ring-[#0F4C5C]' : 'bg-white/60 border-slate-200'
                  }`}
                >
                  <div className="font-bold text-slate-800">Commercial Kraft</div>
                  <div className="text-[11px] text-slate-500">14 - 18 BF (Standard)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setKraftGrade('high-bf')}
                  className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    kraftGrade === 'high-bf' ? 'bg-white border-[#0F4C5C] ring-1 ring-[#0F4C5C]' : 'bg-white/60 border-slate-200'
                  }`}
                >
                  <div className="font-bold text-slate-800">Virgin High-BF Kraft</div>
                  <div className="text-[11px] text-[#0F4C5C] font-semibold">22 - 28 BF (High Crush)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setKraftGrade('heavy-export')}
                  className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    kraftGrade === 'heavy-export' ? 'bg-white border-[#0F4C5C] ring-1 ring-[#0F4C5C]' : 'bg-white/60 border-slate-200'
                  }`}
                >
                  <div className="font-bold text-slate-800">Export Grade Kraft</div>
                  <div className="text-[11px] text-slate-500">32 - 45 BF (Export Heavy)</div>
                </button>
              </div>
            </div>

            {/* Printing Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  5. Printing Requirement
                </span>
                <select
                  value={printOption}
                  onChange={(e: any) => setPrintOption(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-[#0F4C5C]"
                >
                  <option value="plain">Plain Unprinted (Kraft Brown)</option>
                  <option value="1-color">1-Color Flexo (Logo & Handling Signs)</option>
                  <option value="2-color">2-Color Flexo (Brand Identity + Barcodes)</option>
                  <option value="multi-color">Multi-Color / Laminated Duplex Carton</option>
                </select>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  6. Monthly Volume Requirement
                </span>
                <select
                  value={estimatedQuantity}
                  onChange={(e) => setEstimatedQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-[#0F4C5C]"
                >
                  <option value={1000}>1,000 Boxes / Month</option>
                  <option value={2500}>2,500 Boxes / Month</option>
                  <option value={5000}>5,000 Boxes / Month</option>
                  <option value={10000}>10,000 Boxes / Month</option>
                  <option value={25000}>25,000+ Boxes / Month (OEM Tier)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Right Live Spec Sheet & Engineering Outputs (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0F4C5C] text-white rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-md border border-teal-700">
            
            <div className="space-y-4">
              
              <div className="flex items-center justify-between border-b border-teal-700 pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#D97706]" />
                  <span className="font-bold text-sm">Calculated Spec Matrix</span>
                </div>
                <span className="text-[11px] font-mono bg-[#D97706] text-white px-2 py-0.5 rounded font-bold uppercase">
                  {plyCount}
                </span>
              </div>

              {/* Spec Metric Grid */}
              <div className="space-y-2.5 font-mono text-xs">
                
                <div className="bg-[#0A3642] p-3 rounded-lg flex justify-between items-center border border-teal-800">
                  <span className="text-teal-200 font-sans">Sheet Blank Size:</span>
                  <span className="font-bold text-white text-sm">{calculations.blankLength_mm} × {calculations.blankWidth_mm} mm</span>
                </div>

                <div className="bg-[#0A3642] p-3 rounded-lg flex justify-between items-center border border-teal-800">
                  <span className="text-teal-200 font-sans">Single Box Board Area:</span>
                  <span className="font-bold text-white text-sm">{calculations.sheetArea_sqm} m² ({calculations.sheetArea_sqft} sq.ft)</span>
                </div>

                <div className="bg-[#0A3642] p-3 rounded-lg flex justify-between items-center border border-teal-800">
                  <span className="text-teal-200 font-sans">Est. Box Tare Weight:</span>
                  <span className="font-bold text-white text-sm">~{calculations.estimatedWeightGrams} grams</span>
                </div>

                <div className="bg-[#0A3642] p-3 rounded-lg flex justify-between items-center border border-teal-800">
                  <span className="text-teal-200 font-sans">Box Compression (BCT):</span>
                  <span className="font-bold text-[#D97706] text-sm">~{calculations.estimatedBct_kgf} kgf</span>
                </div>

                <div className="bg-[#0A3642] p-3 rounded-lg flex justify-between items-center border border-teal-800">
                  <span className="text-teal-200 font-sans">Max Recommended Payload:</span>
                  <span className="font-bold text-white text-sm">Up to {calculations.maxRecommendedPayload_kg} kg</span>
                </div>

                <div className="bg-[#0A3642] p-3 rounded-lg flex justify-between items-center border border-teal-800">
                  <span className="text-teal-200 font-sans">Volumetric Shipping Wt:</span>
                  <span className="font-bold text-white text-sm">{calculations.volWeight_kg} kg</span>
                </div>

              </div>

            </div>

            {/* Export & Quotation Triggers */}
            <div className="space-y-2.5 pt-2 border-t border-teal-700">
              <button
                type="button"
                onClick={handleTransferToQuote}
                id="transfer-spec-to-rfq-btn"
                className="w-full bg-[#D97706] hover:bg-[#B45309] text-white py-3 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Transfer Spec to Official RFQ Form</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsAppSpec}
                id="whatsapp-spec-share-btn"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Price Estimate</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
