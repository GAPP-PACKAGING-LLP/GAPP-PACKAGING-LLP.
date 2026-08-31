import { 
  CompanyInfo, 
  ProductItem, 
  IndustryItem, 
  MachineryItem, 
  TestingEquipmentItem, 
  QualityPolicyItem,
  EnvironmentPolicyItem,
  DeliveryGuidelinesItem,
  MissionVisionItem,
  ClientPartner, 
  FaqItem,
  DesignatedPartner
} from '../types';

export const designatedPartnersData: DesignatedPartner[] = [
  {
    name: "Ashish Barkhade",
    role: "Designated Partner",
    phone: "+91 9806419199"
  },
  {
    name: "Pramod Singh",
    role: "Designated Partner",
    phone: "+91 9981280902"
  }
];

export const companyData: CompanyInfo = {
  name: "GAPP PACKAGING LLP",
  tagline: "Corrugated Boxes Manufacturers",
  shortDescription: "GAPP Packaging LLP was established in 2020 as a box making unit. Our unit is in Mandideep, Madhya Pradesh and is one of the few with a semi-automatic machine in Bhopal.",
  fullDescription: "GAPP provides one stop professionalized solution for your trade and manufacturing. Depending on the size and field of your organization, we have different products to meet your requirements. We provide the optimum and customized solutions made for your organization. We have well trained skilled labors and experienced managers along with, in-house engineering support staff to always ensure smooth production. Our employees are the key strength of the organization hence we can provide growth to our people, products, and the services through a commitment to innovation and team spirit.",
  industry: "Corrugated Boxes Manufacturers",
  established: "2020",
  unitLocation: "Mandideep, Madhya Pradesh",
  llpin: "AAT-8600",
  gst: "23AAVFG6804D1ZF",
  email: "industriesgapp@gmail.com",
  phones: ["+91 9806419199", "+91 9981280902"],
  whatsappNumber: "+919806419199",
  partners: designatedPartnersData,
  officeAddress: {
    street: "Hoshangbad road",
    landmark: "Near bank of baroda",
    city: "Obedullaganj",
    state: "Madhya Pradesh",
    pincode: "464993",
    full: "Near bank of baroda, Hoshangbad road, Obedullaganj, Madhya Pradesh 464993",
    googleMapsQuery: "Near bank of baroda, Hoshangbad road, Obedullaganj, Madhya Pradesh 464993"
  },
  factoryAddress: {
    surveyNo: "Survey no. 13/1/1/3",
    road: "Khanpura Rd",
    area: "Industrial Area, Mandideep",
    locality: "Pipaliya Korka",
    city: "Mandideep / Raisen",
    state: "Madhya Pradesh",
    pincode: "464993",
    full: "Survey no. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Pipaliya Korka, Madhya Pradesh 464993",
    googleMapsQuery: "Survey no. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Pipaliya Korka, Madhya Pradesh 464993"
  },
  stats: [
    {
      label: "Establishment",
      value: "2020",
      sublabel: "Box making unit in Mandideep, MP"
    },
    {
      label: "Machinery Status",
      value: "Semi-Automatic",
      sublabel: "One of the few in Bhopal / Mandideep"
    },
    {
      label: "Environment",
      value: "Zero-Discharge",
      sublabel: "100% recyclable, zero plastic used"
    },
    {
      label: "Quality & Delivery",
      value: "100%",
      sublabel: "On-time delivery & test certificate with every lot"
    }
  ],
  workingHours: "Operating Plant in Mandideep Industrial Area (Mon - Sat: 09:00 AM - 07:30 PM)"
};

export const missionVisionData: MissionVisionItem = {
  mission: "Our Mission is to achieve the reputation of a quality, high standard, customer satisfaction & reliable manufacturing Company in the Corrugation industry.",
  keysForDevelopment: [
    "Desire for Excellence",
    "Trust and confidence build-up",
    "Innovation",
    "Transparency",
    "Teamwork"
  ],
  weBelieveIn: [
    "Motivation",
    "Collective responsibility and leadership",
    "Professionalism and ethics",
    "Adding values to our client needs",
    "Teamwork"
  ],
  vision: "Our Vision is to achieve 100% customer satisfaction by delivering quality products at an affordable cost. Our forward vision is to strive to become an entity in technology based Corrugated Box Manufacturers, capable of demanding unconditional response from the targeted niche.",
  improvisation: "We also believe that for our scope of improvisation – sky is the limit, and we are always ready to take our achievements to the next level. We are growing and would always like to remain on the growing streak."
};

export const qualityPolicyData: QualityPolicyItem = {
  statement: "GAPP is committed to understanding and meeting our customer needs and expectations.",
  measures: [
    "Conscious efforts to improve the product quality to consistently cater packaging needs by utilizing state of the art manufacturing facilities and ensuring the delivery as per the customer’s expectation.",
    "Developing and maintaining open and constructive communication with our customers, suppliers, and employees.",
    "Developing our manufacturing process capabilities to meet our customer’s future requirements.",
    "Managing and conducting our business using systems which ensures that we can always respond in professional manner.",
    "Developing and training our workers so that they can be fully involved towards achieving this policy."
  ],
  process: {
    rawMaterials: "All our raw materials are sampled tested and on approval unloaded and stacked with an identification mark. Production plan is given to the concerned persons with written instructions.",
    onlineMonitoring: "Quality control is monitored online in each stage of production by our Quality control Supervisors.",
    preDispatchCertification: "Prior to dispatch every lot is again sampled and certified. Test Certificate is issued with every lot."
  }
};

export const environmentPolicyData: EnvironmentPolicyItem = {
  zeroDischarge: "GAPP is zero-discharge manufacturing unit, and all our materials are recyclable.",
  recyclable: "All materials processed and converted at our facility are 100% recyclable.",
  plasticFree: "We do not use any sorts of plastic at our facility."
};

export const deliveryGuidelinesData: DeliveryGuidelinesItem = {
  onTimeCommitment: "We are committed to ourselves in strict adhering to the delivery schedule provided by our customers and ensure on-time delivery on each order.",
  urgentOrderFlexibility: "Apart that, we are extremely flexible in providing urgent orders or cater to any changes that may occur in the delivery schedule at any point and in short notice."
};

export const statutoryRequirementsData = {
  compliance: "We abide with all rules and regulations of Central and State Govt., which is applicable to SSI units.",
  gstNo: "23AAVFG6804D1ZF",
  llpin: "AAT-8600"
};

// Exact 12 Machineries Installed from Page 6
export const machineryData: MachineryItem[] = [
  {
    id: "machine-1",
    name: "High speed fingerless Corrugation machine",
    category: "Corrugation",
    description: "High speed fingerless corrugation line ensuring uniform fluting, strong adhesion, and high output.",
    importance: "Core corrugating production",
    capacity: "80 - 100 meters/min",
    speed: "Semi-automatic continuous line",
    model: "Fingerless High-Speed Corrugator 52\"",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Installed at Mandideep Plant - Bay 1"
  },
  {
    id: "machine-2",
    name: "Two colour flexo Printing machine",
    category: "Printing",
    description: "Multi-color flexographic printing unit providing precise branding, text, and handling markings.",
    importance: "Branding & labeling",
    capacity: "4,000 sheets/hour",
    speed: "Ceramic anilox inking roll",
    model: "Double-Color Flexo Graphic Printer",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Two-Colour Precision Flexo Unit"
  },
  {
    id: "machine-3",
    name: "Pasting machine",
    category: "Pasting & Assembly",
    description: "Precision gluing and board pasting machinery for multi-ply corrugated sheet formation.",
    importance: "Layer bonding",
    capacity: "Heavy board lamination",
    speed: "Uniform adhesive applicator",
    model: "Industrial Sheet Pasting Machine",
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Multi-Ply Sheet Pasting Line"
  },
  {
    id: "machine-4",
    name: "Sheet pressing machine",
    category: "Pressing",
    description: "Heavy sheet pressing station guaranteeing flat, uniform boards without warping.",
    importance: "Board flatness & setting",
    capacity: "Hydraulic platen compression",
    speed: "Uniform cure pressure",
    model: "Heavy Hydraulic Sheet Press",
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Sheet Compression & Flattening Station"
  },
  {
    id: "machine-5",
    name: "Thin Blade Rotary machine",
    category: "Slitting & Scoring",
    description: "Precision thin blade rotary slitter and scorer for clean edges without crushing flutes.",
    importance: "Flute-friendly slitting",
    capacity: "Tungsten alloy thin blades",
    speed: "High-speed rotary scoring",
    model: "Thin Blade Slitter Scorer",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Burr-Free Thin Blade Rotary Slitter"
  },
  {
    id: "machine-6",
    name: "Eccentric slotter machine",
    category: "Slotting",
    description: "High-accuracy eccentric slotter for cutting box slots and corner notches.",
    importance: "Carton slotting",
    capacity: "Deep carton slotting",
    speed: "Adjustable stroke speed",
    model: "Industrial Eccentric Slotter",
    imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Carton Blank Corner & Flap Slotting"
  },
  {
    id: "machine-7",
    name: "R-S 4 machine",
    category: "Rotary Slotting",
    description: "Rotary slotting, creasing, and corner cutting equipment for rapid carton blanks.",
    importance: "Rotary conversion",
    capacity: "Multi-operation rotary tooling",
    speed: "Synchronized feed line",
    model: "4-Bar Combined Rotary Slotter & Creaser",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80",
    imageCaption: "4-Bar Rotary Creasing & Slotting Unit"
  },
  {
    id: "machine-8",
    name: "Stitching Machine",
    category: "Stitching & Binding",
    description: "Heavy-duty wire stitching unit for firm joint binding of heavy industrial boxes.",
    importance: "Joint reinforcement",
    capacity: "Copper / Galvanized wire stitch",
    speed: "350 - 450 stitches/min",
    model: "Heavy Angular Wire Stitcher 48\"",
    imageUrl: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Heavy Duty Joint Wire Stitching Machine"
  },
  {
    id: "machine-9",
    name: "Semi Automatic Flap pasting Machine",
    category: "Finishing & Pasting",
    description: "Semi-automatic joint gluing and flap pasting machine ensuring rapid assembly.",
    importance: "Fast box joint gluing",
    capacity: "Cold PVA / Hot melt adhesive",
    speed: "Fast continuous conveyor",
    model: "Semi-Auto Flap Gluer & Folder",
    imageUrl: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Semi-Automatic Flap Gluing Line"
  },
  {
    id: "machine-10",
    name: "Drying machine",
    category: "Conditioning & Drying",
    description: "Controlled drying setup ensuring proper moisture elimination and starch curing.",
    importance: "Moisture stabilization",
    capacity: "Thermo-regulated air chamber",
    speed: "Constant speed curing",
    model: "Industrial Board Drying Chamber",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Moisture Stabilization Drying Tunnel"
  },
  {
    id: "machine-11",
    name: "Paper Cutting Machine",
    category: "Cutting",
    description: "Heavy industrial paper guillotine cutter for accurate blank sizing and trim control.",
    importance: "Precision sheet trimming",
    capacity: "Programmed hydraulic clamping",
    speed: "Heavy alloy guillotine knife",
    model: "Industrial Heavy Paper Guillotine Cutter",
    imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Precision Blank Cutting & Trimming Machine"
  },
  {
    id: "machine-12",
    name: "Weighing Machine to ensure quality raw materials",
    category: "Quality Assurance & Inward",
    description: "Calibrated industrial weighing scale verifying incoming paper reel weight and GSM specifications.",
    importance: "Raw material QC verification",
    capacity: "3,000 kg Heavy Platform Scale",
    speed: "Digital precision sensor",
    model: "Industrial Heavy Platform Scale",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    imageCaption: "Inward Paper Reel Weight Verification Platform"
  }
];

// Exact 5 Testing Equipment from Page 7
export const testingEquipmentData: TestingEquipmentItem[] = [
  {
    id: "test-1",
    name: "Bursting Strength Tester",
    standard: "IS / ASTM Calibration",
    parameterMeasured: "Bursting Strength (kg/cm²) & Bursting Factor (BF)",
    importance: "Ensures corrugated boxes resist hydraulic bursting and internal stress during transportation.",
    description: "Tests the bursting pressure of paper and corrugated board to verify strength."
  },
  {
    id: "test-2",
    name: "Cobb testing machine",
    standard: "Standard Cobb Method",
    parameterMeasured: "Water Absorption Rate (g/m²)",
    importance: "Measures water absorption of paper to ensure moisture resistance in varied storage conditions.",
    description: "Measures the amount of liquid water absorbed by paper/board surface in a specific time."
  },
  {
    id: "test-3",
    name: "Grammage tester",
    standard: "GSM Standards",
    parameterMeasured: "Paper & Board Grammage (GSM - Grams per Square Meter)",
    importance: "Validates exact GSM of Kraft paper and liners to prevent raw material deviation.",
    description: "Precision grammage balance verifying accurate weight per square meter."
  },
  {
    id: "test-4",
    name: "Ford cup B4 viscometer",
    standard: "B4 Viscosity Standard",
    parameterMeasured: "Adhesive & Starch Viscosity (Efflux Time / Seconds)",
    importance: "Monitors viscosity of starch glue formulation to ensure optimum bonding and flute adhesion.",
    description: "Standard efflux viscometer for measuring and maintaining glue viscosity."
  },
  {
    id: "test-5",
    name: "Moisture meter (Moister meter)",
    standard: "Digital Moisture Metrology",
    parameterMeasured: "Moisture Content (%)",
    importance: "Controls paper reel and finished board moisture to prevent soft boxes or brittle flute defects.",
    description: "Calibrated probe measuring moisture levels across raw paper rolls and finished corrugated sheets."
  }
];

// Exact 6 Business Sectors from Page 2
export const industriesData: IndustryItem[] = [
  {
    id: "retail",
    title: "Retail Sector",
    description: "Customized corrugated cartons and product packaging tailored for retail merchandise, distribution, and display.",
    packagingTypes: ["Retail Cartons", "Shelf-Ready Packaging", "Custom Sized Shippers"],
    keyBenefit: "Quality printing and custom sizing for high shelf appeal and brand recognition.",
    iconName: "ShoppingBag"
  },
  {
    id: "pharmaceuticals",
    title: "Pharmaceuticals Sector",
    description: "Clean, dimensionally precise corrugated packaging designed for pharmaceutical products, medicines, and healthcare bottles.",
    packagingTypes: ["Pharma Shippers", "Medicine Outer Boxes", "Secondary Packaging"],
    keyBenefit: "Strict quality control and test certificates with every lot for full compliance.",
    iconName: "ShieldPlus"
  },
  {
    id: "engineering",
    title: "Engineering Sector",
    description: "Heavy-duty corrugated boxes designed to carry and protect industrial components, tools, and machined engineering goods.",
    packagingTypes: ["Heavy Industrial Boxes", "Stitched Cartons", "Component Shippers"],
    keyBenefit: "High bursting strength and reliable stacking capacity for heavy items.",
    iconName: "Cog"
  },
  {
    id: "confectionery",
    title: "Confectionery Sector",
    description: "Hygienic corrugated packaging for bakery products, sweets, chocolates, biscuits, and confectionery distribution.",
    packagingTypes: ["Confectionery Shippers", "Bakery Cartons", "Bulk Sweet Boxes"],
    keyBenefit: "100% recyclable, clean food-grade starch adhesive without any plastic.",
    iconName: "Package"
  },
  {
    id: "stationery",
    title: "Stationery Sector",
    description: "Sturdy corrugated cartons for paper products, notebooks, office supplies, books, and stationery items.",
    packagingTypes: ["Stationery Outer Boxes", "Paper Ream Shippers", "Office Supply Cartons"],
    keyBenefit: "Rigid flat protection preventing bending or edge damage to stationery goods.",
    iconName: "Layers"
  },
  {
    id: "fmcg",
    title: "FMCG Sector",
    description: "High-volume, reliable corrugated packaging for fast-moving consumer goods, packaged foods, and household essentials.",
    packagingTypes: ["FMCG Master Cartons", "Consumer Good Shippers", "Distribution Boxes"],
    keyBenefit: "On-time delivery consistency and flexible scheduling for urgent orders.",
    iconName: "Truck"
  }
];

// Exact 10 Major Clients from Pages 8 & 9
export const clientPartnersData: ClientPartner[] = [
  {
    id: 1,
    name: "ARISTO PHARMACEUTICALS PVT LTD",
    sector: "Pharmaceuticals"
  },
  {
    id: 2,
    name: "LIFESPAN BIOTECH PVT LTD",
    sector: "Biotechnology & Pharmaceuticals"
  },
  {
    id: 3,
    name: "PAWANSHREE INTERNATIONAL PVT LTD",
    sector: "International Trade & Manufacturing"
  },
  {
    id: 4,
    name: "M.H. PETS (Vendor of CIPLA)",
    details: "Vendor of CIPLA",
    sector: "Pharmaceutical Packaging & Containers"
  },
  {
    id: 5,
    name: "TRENDPORT PVT LTD (Vendor of SOM Distilleries PVT LTD)",
    details: "Vendor of SOM Distilleries PVT LTD",
    sector: "Distilleries & Beverage Packaging"
  },
  {
    id: 6,
    name: "SANJAY FRESH BAKE",
    sector: "Confectionery & Bakery"
  },
  {
    id: 7,
    name: "AADITYA FOOD PRODUCTS",
    sector: "Food Products & FMCG"
  },
  {
    id: 8,
    name: "FORTCAPS HEALTHCARE LTD",
    sector: "Healthcare & Pharmaceuticals"
  },
  {
    id: 9,
    name: "ANANT PRODUCTS",
    sector: "Consumer Products & Manufacturing"
  },
  {
    id: 10,
    name: "PENTAGON LABS LTD",
    sector: "Pharmaceuticals & Healthcare Formulations"
  }
];

// Corrugated Box Products Offered
export const productsData: ProductItem[] = [
  {
    id: "corrugated-boxes",
    name: "Corrugated Boxes & Master Cartons",
    category: "5-ply",
    fluteTypes: "Single Wall, Double Wall, High Speed Fingerless Corrugated Board",
    burstingFactor: "Tested on In-house Bursting Strength Tester",
    gsmRange: "Verified via In-house Grammage Tester",
    loadCapacity: "Customized to client requirements",
    description: "Custom and standard corrugated boxes manufactured with high-speed fingerless corrugation machinery, ensuring optimum protection, high strength, and consistent delivery.",
    features: [
      "Manufactured in Mandideep unit with semi-automatic precision equipment",
      "Rigid construction tailored to organization size and payload needs",
      "Zero-discharge manufacturing process, 100% recyclable Kraft board",
      "Test Certificate issued with every dispatch lot"
    ],
    applications: [
      "Retail & distribution cartons",
      "Pharmaceutical packaging & secondary shippers",
      "Engineering components & heavy goods",
      "Confectionery, bakery & food products",
      "Stationery & office supplies",
      "FMCG master shippers"
    ],
    layerStructure: "Kraft Liner + High-Strength Fluted Wave + Inner Liner",
    imageHint: "Corrugated box manufacturing"
  },
  {
    id: "printed-boxes",
    name: "Two Colour Flexo Printed Cartons",
    category: "printed",
    fluteTypes: "Single Wall & Double Wall",
    burstingFactor: "Calibrated to specifications",
    gsmRange: "Controlled Grammage",
    loadCapacity: "Customized",
    description: "Two-colour flexographic printed corrugated cartons featuring sharp brand identification, text, barcodes, and handling warnings.",
    features: [
      "Two-colour flexo printing machine inline",
      "Uniform ink laydown and clear identification markings",
      "Eco-friendly, water-based printing inks without plastic coatings",
      "Flexible order batches and fast turnaround"
    ],
    applications: [
      "Branded retail packaging",
      "Pharmaceutical identification shippers",
      "FMCG & confectionery outer boxes"
    ],
    layerStructure: "Flexo Printed Outer Kraft + Fluting + Backing Liner",
    imageHint: "Printed corrugated carton"
  },
  {
    id: "stitched-pasted-cartons",
    name: "Stitched & Semi-Automatic Pasted Cartons",
    category: "heavy-duty",
    fluteTypes: "Heavy-Duty Corrugated Board",
    burstingFactor: "High Bursting Strength",
    gsmRange: "Heavy Kraft",
    loadCapacity: "Heavy engineering load",
    description: "Cartons finished on heavy stitching machines and semi-automatic flap pasting machines for robust joint strength and high stacking durability.",
    features: [
      "Heavy wire stitching or semi-automatic flap gluing options",
      "Thin blade rotary slitting preventing crushed flutes",
      "Eccentric and R-S 4 rotary slotting for exact dimensional folding",
      "100% plastic-free construction"
    ],
    applications: [
      "Heavy engineering machinery parts",
      "Export & transit consignments",
      "Bulk trade & manufacturing dispatches"
    ],
    layerStructure: "Multi-Ply High Strength Corrugated Board",
    imageHint: "Stitched corrugated box"
  }
];

export const faqsData: FaqItem[] = [
  {
    category: "procurement",
    question: "Where is GAPP Packaging LLP located?",
    answer: "Our manufacturing unit is located at Survey no. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Pipaliya Korka, Madhya Pradesh 464993. Our registered office is Near bank of baroda, Hoshangbad road, Obedullaganj, Madhya Pradesh 464993."
  },
  {
    category: "delivery",
    question: "What are your delivery commitments and capabilities for urgent orders?",
    answer: "We are committed to strict adherence to customer delivery schedules to ensure on-time delivery on each order. We are also extremely flexible in providing urgent orders or catering to any changes in the delivery schedule at short notice."
  },
  {
    category: "technical",
    question: "What testing equipment is installed in your in-house laboratory?",
    answer: "Our in-house testing equipment includes a Bursting Strength Tester, Cobb testing machine, Grammage tester, Ford cup B4 viscometer, and Moisture meter."
  },
  {
    category: "procurement",
    question: "Do you issue a Test Certificate with every shipment?",
    answer: "Yes. Prior to dispatch, every lot is sampled and certified, and a formal Test Certificate is issued with every lot."
  },
  {
    category: "technical",
    question: "What is your environmental and plastic policy?",
    answer: "GAPP Packaging LLP is a zero-discharge manufacturing unit. All our materials are 100% recyclable, and we do not use any sorts of plastic at our facility."
  },
  {
    category: "procurement",
    question: "What are the statutory registration details of GAPP Packaging LLP?",
    answer: "We abide by all rules and regulations of Central and State Govt. applicable to SSI units. Our GST Number is 23AAVFG6804D1ZF and our LLP Identification Number (LLPIN) is AAT-8600."
  }
];
