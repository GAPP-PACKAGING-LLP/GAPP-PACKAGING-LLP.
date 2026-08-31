/**
 * GAPP Packaging LLP - Centralized Content Data File
 * Industrial Corrugated Box Manufacturer & Packaging Solutions
 * Mandideep / Obedullaganj / Bhopal, Madhya Pradesh, India
 */

export const siteConfig = {
  brandName: "GAPP Packaging LLP",
  tagline: "Corrugated Boxes Manufacturers & Industrial Packaging Solutions",
  gstin: "23AAVFG6804D1ZF",
  llpin: "AAT-8600",
  email: "industriesgapp@gmail.com",
  phone1: "+91 9806419199",
  phone2: "+91 9981280902",
  whatsappNumber: "+919806419199",
  officeAddress: {
    title: "Registered Office Address",
    street: "Hoshangabad Road",
    landmark: "Near Bank of Baroda",
    city: "Obedullaganj",
    state: "Madhya Pradesh",
    pincode: "464993",
    full: "Near Bank of Baroda, Hoshangabad Road, Obedullaganj, Madhya Pradesh 464993"
  },
  factoryAddress: {
    title: "Manufacturing Plant Address",
    surveyNo: "Survey No. 13/1/1/3",
    road: "Khanpura Rd",
    area: "Industrial Area, Mandideep",
    locality: "Pipaliya Korka",
    city: "Mandideep / Raisen",
    state: "Madhya Pradesh",
    pincode: "464993",
    full: "Survey No. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Pipaliya Korka, Madhya Pradesh 464993"
  },
  designatedPartners: [
    { name: "Ashish Barkhade", role: "Designated Partner", phone: "+91 9806419199" },
    { name: "Pramod Singh", role: "Designated Partner", phone: "+91 9981280902" }
  ]
};

export const seoData = {
  title: "GAPP Packaging LLP | Corrugated Box Manufacturer in Mandideep & Bhopal",
  metaDescription: "GAPP Packaging LLP is a premier corrugated box manufacturer in Mandideep Industrial Area & Bhopal (MP). Specializing in 3-ply, 5-ply, 7-ply heavy-duty carton boxes, custom printed packaging, and industrial shippers.",
  keywords: [
    "GAPP Packaging LLP",
    "GAPP Packaging Mandideep",
    "corrugated box manufacturer in Mandideep",
    "corrugated box manufacturer in Bhopal",
    "packaging box manufacturer Madhya Pradesh",
    "custom corrugated boxes supplier",
    "3 ply 5 ply 7 ply corrugated boxes",
    "heavy duty carton boxes",
    "industrial packaging solutions India",
    "packaging box factory Mandideep industrial area",
    "eco friendly packaging boxes manufacturer",
    "bulk packaging boxes supplier",
    "export quality corrugated boxes India"
  ],
  canonicalUrl: "https://www.gapppackaging.com/",
  geoRegion: "IN-MP",
  geoPlacename: "Mandideep",
  geoPosition: "23.0645;77.5256"
};

export const productsData = [
  {
    id: "3-ply",
    title: "3 Ply Corrugated Boxes",
    subtitle: "Single Wall Light & Medium Duty Shippers",
    ply: "3-Ply (Single Wall)",
    flutes: "B-Flute / C-Flute / E-Flute",
    gsmRange: "120 - 180 GSM Kraft",
    burstFactor: "18 - 24 BF",
    loadCapacity: "Up to 15 kg",
    description: "Engineered with an inner fluted layer sandwiched between two smooth Kraft liners. Ideal for pharmaceutical shippers, retail cartons, FMCG products, and lightweight consumer goods.",
    applications: ["Pharma Cartons", "Food & Bakery", "E-Commerce", "Cosmetics"],
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5-ply",
    title: "5 Ply Corrugated Boxes",
    subtitle: "Double Wall Industrial Master Cartons",
    ply: "5-Ply (Double Wall)",
    flutes: "B/C Flute Combination",
    gsmRange: "150 - 230 GSM Virgin / Semi-Virgin Kraft",
    burstFactor: "22 - 28 BF",
    loadCapacity: "15 - 45 kg",
    description: "Features two fluted mediums separated by a center liner with top and bottom Kraft facings. Built for heavy stacking strength, export cargo, beverages, and industrial parts.",
    applications: ["Automotive Parts", "Distilleries & Beverages", "FMCG Bulk Shipping", "Chemicals"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "7-ply",
    title: "7 Ply Corrugated Boxes",
    subtitle: "Triple Wall Heavy-Duty Transport Shippers",
    ply: "7-Ply (Triple Wall)",
    flutes: "A/B/C Heavy Combination",
    gsmRange: "180 - 250+ GSM High-Burst Kraft",
    burstFactor: "28 - 35+ BF",
    loadCapacity: "40 - 120+ kg",
    description: "Triple-wall reinforced construction engineered as a lightweight, eco-friendly replacement for wooden crates. Offers extreme puncture resistance and high compression ratings.",
    applications: ["Heavy Industrial Machinery", "Auto Engineering", "Bulk Exports", "Transformer Parts"],
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "heavy-duty",
    title: "Heavy Duty Carton Boxes",
    subtitle: "Reinforced Stitched Shipping Containers",
    ply: "5-Ply & 7-Ply Heavy Grade",
    flutes: "High-Caliber Heavy Flute",
    gsmRange: "200 - 260 GSM Heavy Liner",
    burstFactor: "30+ BF",
    loadCapacity: "50 - 150 kg",
    description: "Constructed with rust-proof angular zinc wire stitching and high bursting-factor Kraft liners for rugged long-distance transport across India and overseas shipping.",
    applications: ["Engineering Spares", "Pump & Motors", "Bulk Liquids", "Grain & Seeds"],
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "custom-boxes",
    title: "Custom Packaging Boxes",
    subtitle: "Die-Cut & Two-Colour Printed Branding",
    ply: "3-Ply & 5-Ply Customized",
    flutes: "Custom Flute Profiles",
    gsmRange: "Tailored to Spec",
    burstFactor: "Specified to Product",
    loadCapacity: "Custom Engineered",
    description: "Precision die-cut boxes with locking tabs, self-erecting bottoms, partition dividers, and high-definition two-color flexographic printing of logos, handling instructions, and barcodes.",
    applications: ["Custom Electronics", "Branded Retail", "Pharma Vials", "Gift Hampers"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "brown-boxes",
    title: "Brown Packaging Boxes",
    subtitle: "Eco-Friendly 100% Recyclable Standard Cartons",
    ply: "3-Ply & 5-Ply RSC Standard",
    flutes: "Standard B & C Flute",
    gsmRange: "120 - 200 GSM Unbleached Kraft",
    burstFactor: "18 - 26 BF",
    loadCapacity: "10 - 35 kg",
    description: "Classic unbleached natural Kraft corrugated boxes for cost-effective bulk storage, warehousing, inventory shipping, and e-commerce distribution.",
    applications: ["Warehousing", "Logistics", "General Merchandise", "Wholesale Distribution"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  }
];

export const industriesServed = [
  {
    id: "automotive",
    title: "Automotive & Engineering",
    description: "Heavy-duty 5-ply & 7-ply stitched cartons engineered to protect metal gears, automotive spare parts, bearings, and machinery assemblies from shock and impact during transit.",
    icon: "Truck",
    boxType: "5-Ply & 7-Ply Heavy Cartons",
    benefit: "High puncture resistance and zero-crush stackability"
  },
  {
    id: "fmcg",
    title: "FMCG & Consumer Goods",
    description: "High-volume corrugated shipping containers optimized for palletized freight, automatic case sealers, and retail distribution across Central India.",
    icon: "ShoppingBag",
    boxType: "3-Ply & 5-Ply Master Shippers",
    benefit: "High-speed line compatible with clean edge scoring"
  },
  {
    id: "pharma",
    title: "Pharmaceuticals & Healthcare",
    description: "Cleanroom manufactured odorless corrugated boxes with tight moisture control (< 7% Cobb) for packaging syrup bottles, blister packs, glass vials, and surgical supplies.",
    icon: "ShieldPlus",
    boxType: "3-Ply & 5-Ply Cleanroom Grade",
    benefit: "Moisture resistant with precise partition inserts"
  },
  {
    id: "food",
    title: "Food, Bakery & Confectionery",
    description: "100% food-grade starch adhesive bonded cartons designed for sweets, snacks, confectionery master shippers, and grain processing units.",
    icon: "Cake",
    boxType: "3-Ply & 5-Ply Food Grade",
    benefit: "Zero chemical odor, 100% virgin contact liners"
  },
  {
    id: "electronics",
    title: "Electronics & Electrical Appliances",
    description: "Custom die-cut packaging with shock-absorbing fluting and anti-static partitions for small appliances, switchgear, lighting, and electrical instruments.",
    icon: "Layers",
    boxType: "Die-Cut Micro-Flute & 5-Ply",
    benefit: "Custom drop-tested structural cushioning"
  },
  {
    id: "industrial",
    title: "Industrial Equipment & Hardware",
    description: "Triple-wall 7-ply and heavy 5-ply cartons designed as cost-effective, lightweight alternatives to timber packaging for pump sets, hardware, and fasteners.",
    icon: "Package",
    boxType: "7-Ply Triple-Wall Containers",
    benefit: "Replaces heavy wooden crates with 100% recyclable fiberboard"
  }
];

export const faqsData = [
  {
    question: "Where is GAPP Packaging LLP's manufacturing factory located?",
    answer: "Our manufacturing plant is located at Survey No. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, Pipaliya Korka, Madhya Pradesh 464993. Our registered office is situated Near Bank of Baroda, Hoshangabad Road, Obedullaganj, MP 464993."
  },
  {
    question: "What types of corrugated boxes does GAPP Packaging manufacture?",
    answer: "We manufacture 3-ply (single wall), 5-ply (double wall), 7-ply (triple wall) heavy-duty corrugated cartons, universal regular slotted containers (RSC), custom die-cut boxes, mono cartons, and branded boxes with high-definition two-colour flexographic printing."
  },
  {
    question: "What is the difference between 3-ply, 5-ply, and 7-ply corrugated boxes?",
    answer: "3-ply boxes have 1 fluted medium between 2 Kraft liners (best for items up to 15 kg). 5-ply boxes have 2 fluted mediums and 3 liners (engineered for 15–45 kg industrial loads and stacking). 7-ply boxes have 3 fluted layers and 4 liners (heavy-duty transport packaging for 40–120+ kg machinery and export shipments)."
  },
  {
    question: "Do you supply corrugated boxes outside Mandideep and Bhopal?",
    answer: "Yes. We supply across Madhya Pradesh and Central India, including Mandideep, Bhopal, Obedullaganj, Raisen, Hoshangabad/Narmadapuram, Indore, Dewas, Pithampur, and surrounding industrial belts with dedicated logistics."
  },
  {
    question: "Can GAPP Packaging handle urgent and fluctuating delivery orders?",
    answer: "Yes. GAPP Packaging LLP maintains buffer Kraft paper reel inventory and operates semi-automatic machinery in Mandideep, allowing us to cater to urgent production runs without disrupting regular supply schedules."
  },
  {
    question: "Do you provide Quality Test Certificates (COA) with dispatched lots?",
    answer: "Yes. Every manufacturing batch is tested in our in-house laboratory for Bursting Strength (BS), Cobb moisture absorption, Grammage (GSM), and viscosity. We provide formal test certificates with invoices upon request."
  },
  {
    question: "What are the GST and LLPIN registration details of GAPP Packaging LLP?",
    answer: "GAPP Packaging LLP is registered under GSTIN: 23AAVFG6804D1ZF and LLPIN: AAT-8600 under the Ministry of Corporate Affairs (MCA), Government of India."
  }
];
