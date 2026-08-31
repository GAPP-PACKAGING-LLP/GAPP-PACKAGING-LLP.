export interface DesignatedPartner {
  name: string;
  role: string;
  phone: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  industry: string;
  established: string;
  unitLocation: string;
  llpin: string;
  gst: string;
  email: string;
  phones: string[];
  whatsappNumber: string;
  partners: DesignatedPartner[];
  officeAddress: {
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
    googleMapsQuery: string;
  };
  factoryAddress: {
    surveyNo: string;
    road: string;
    area: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
    googleMapsQuery: string;
  };
  stats: {
    label: string;
    value: string;
    suffix?: string;
    sublabel: string;
  }[];
  workingHours: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: '3-ply' | '5-ply' | '7-ply' | 'die-cut' | 'printed' | 'heavy-duty' | 'accessories' | string;
  fluteTypes: string;
  burstingFactor: string;
  gsmRange: string;
  loadCapacity: string;
  description: string;
  features: string[];
  applications: string[];
  layerStructure: string;
  imageHint: string;
  imageUrl?: string;
  isActive?: boolean;
  order?: number;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  packagingTypes: string[];
  keyBenefit: string;
  iconName: string;
}

export interface MachineryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  importance: string;
  model?: string;
  capacity?: string;
  speed?: string;
  imageUrl?: string;
  galleryImages?: string[];
  imageCaption?: string;
  storagePath?: string;
  fileSize?: string;
  isActive?: boolean;
  order?: number;
}

export interface TestingEquipmentItem {
  id: string;
  name: string;
  standard: string;
  parameterMeasured: string;
  importance: string;
  description: string;
  unit?: string;
  accuracy?: string;
  imageUrl?: string;
  isActive?: boolean;
  order?: number;
}

export interface QualityPolicyItem {
  statement: string;
  measures: string[];
  process: {
    rawMaterials: string;
    onlineMonitoring: string;
    preDispatchCertification: string;
  };
}

export interface EnvironmentPolicyItem {
  zeroDischarge: string;
  recyclable: string;
  plasticFree: string;
}

export interface DeliveryGuidelinesItem {
  onTimeCommitment: string;
  urgentOrderFlexibility: string;
}

export interface MissionVisionItem {
  mission: string;
  keysForDevelopment: string[];
  weBelieveIn: string[];
  vision: string;
  improvisation: string;
}

export interface ClientPartner {
  id: number | string;
  name: string;
  details?: string;
  sector: string;
  location?: string;
  supplyType?: string;
  logoUrl?: string;
  order?: number;
  isActive?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'procurement' | 'technical' | 'delivery' | 'customization';
}

export interface AdminUser {
  uid: string;
  email: string;
  name: string;
  role: 'super_admin' | 'partner' | 'plant_manager' | 'editor' | string;
  designation?: string;
  loginMethod?: 'google' | 'passkey' | 'credentials' | string;
  createdAt: any;
  photoURL?: string | null;
}

export interface SecondaryAdminProfile {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'partner' | 'plant_manager' | 'editor';
  designation: string;
  passcode: string;
  avatar?: string;
  isActive: boolean;
}

export interface InquiryFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  boxType: string;
  plyCount: string;
  dimensionsLength: string;
  dimensionsWidth: string;
  dimensionsHeight: string;
  dimensionUnit: 'mm' | 'inches';
  monthlyQuantity: string;
  deliveryLocation: string;
  printRequirement: string;
  specialRequirements: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';

export interface InquiryInput {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  status?: InquiryStatus;
  boxType?: string;
  plyCount?: string;
  dimensionsLength?: string;
  dimensionsWidth?: string;
  dimensionsHeight?: string;
  dimensionUnit?: 'mm' | 'inches';
  monthlyQuantity?: string;
  deliveryLocation?: string;
  printRequirement?: string;
  inquiryRef?: string;
  source?: 'contact_page' | 'home_rfq' | 'modal_rfq' | 'custom' | string;
}

export interface InquiryDocument extends InquiryInput {
  id: string;
  status: InquiryStatus;
  createdAt: any;
  updatedAt?: any;
  adminNotes?: string;
}

export interface CMSGalleryItem {
  id: string;
  title: string;
  caption?: string;
  category: 'plant' | 'machinery' | 'products' | 'testing' | 'warehouse' | string;
  imageUrl: string;
  storagePath?: string;
  fileSize?: number | string;
  dimensions?: string;
  createdAt: any;
  order?: number;
}

export interface CMSBrochure {
  id: string;
  title: string;
  description?: string;
  version: string;
  fileUrl: string;
  storagePath?: string;
  fileSize?: string;
  isPrimary: boolean;
  downloadCount: number;
  createdAt: any;
}

export interface CMSPageContent {
  id: string;
  slug: 'home' | 'about' | 'contact' | string;
  title: string;
  tagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  content: Record<string, any>;
  updatedAt?: any;
}

export interface DirectorItem {
  id: string;
  name: string;
  role: string;
  din?: string;
  photoUrl?: string;
  phone?: string;
  email?: string;
  bio?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface CMSSettings {
  id?: string;
  logoUrl?: string;
  logoDarkUrl?: string;
  faviconUrl?: string;
  companyName: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  industry?: string;
  email: string;
  salesEmail?: string;
  phones: string[];
  whatsappNumber: string;
  gst: string;
  llpin: string;
  pan?: string;
  msmeUdyam?: string;
  factoryLicense?: string;
  mppcbConsent?: string;
  bankName?: string;
  bankAccountNo?: string;
  bankIfsc?: string;
  bankBranch?: string;
  established: string;
  unitLocation: string;
  officeAddress: {
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
    googleMapsQuery: string;
  };
  factoryAddress: {
    surveyNo: string;
    road: string;
    area: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
    googleMapsQuery: string;
  };
  stats?: Array<{
    label: string;
    value: string;
    suffix?: string;
    sublabel: string;
  }>;
  workingHours: string;
  updatedAt?: any;
}
