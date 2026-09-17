import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db, auth } from './config';
import { isCurrentAdminLoggedIn, ensureFirebaseAuth } from './auth';
import { 
  ProductItem, 
  MachineryItem, 
  TestingEquipmentItem, 
  ClientPartner, 
  CMSGalleryItem, 
  CMSBrochure, 
  CMSPageContent, 
  CMSSettings,
  DirectorItem
} from '../types';
import { 
  productsData, 
  machineryData, 
  testingEquipmentData, 
  clientPartnersData, 
  companyData 
} from '../data/companyData';

// --- PRODUCTS CMS ---

export function subscribeToProducts(
  onData: (items: ProductItem[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, 'products');
  return onSnapshot(
    colRef,
    async (snapshot) => {
      if (snapshot.empty) {
        // Seed default products from companyData if collection is empty
        try {
          const batch = writeBatch(db);
          productsData.forEach((prod, index) => {
            const docRef = doc(colRef, prod.id || `prod-${index + 1}`);
            batch.set(docRef, {
              ...prod,
              imageUrl: prod.imageUrl || '',
              isActive: true,
              order: index + 1,
              updatedAt: serverTimestamp()
            });
          });
          await batch.commit();
        } catch (e) {
          console.warn('Products seed error:', e);
        }
        onData(productsData);
        return;
      }

      const items: ProductItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any)
      }));
      // Sort by order or name
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      onData(items);
    },
    (err) => {
      console.error('Firebase product subscription error:', err);
      onData(productsData);
      if (onError) onError(err);
    }
  );
}

/**
 * Saves product details in Firestore `products` collection.
 * Saves image URL as `imageUrl`.
 * Requires logged-in admin.
 */
export async function saveProduct(product: Partial<ProductItem>): Promise<string> {
  if (!isCurrentAdminLoggedIn()) {
    const authErr = new Error('Admin authentication required. Please log in to save products.');
    console.error('Firebase product save error:', authErr);
    throw authErr;
  }

  // Ensure Firebase Auth session is active
  await ensureFirebaseAuth();

  try {
    const colRef = collection(db, 'products');
    const id = product.id || `prod-${Date.now()}`;
    const docRef = doc(colRef, id);
    const data = {
      ...product,
      id,
      imageUrl: product.imageUrl || '',
      isActive: product.isActive !== undefined ? product.isActive : true,
      updatedAt: serverTimestamp()
    };
    await setDoc(docRef, data, { merge: true });
    return id;
  } catch (error: any) {
    console.error('Firebase product save error:', error);
    throw new Error(error?.message || 'Failed to save product to Firestore.');
  }
}

export async function deleteProduct(id: string): Promise<void> {
  if (!isCurrentAdminLoggedIn()) {
    const authErr = new Error('Admin authentication required. Please log in to delete products.');
    console.error('Firebase product delete error:', authErr);
    throw authErr;
  }

  // Ensure Firebase Auth session is active
  await ensureFirebaseAuth();

  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.error('Firebase product delete error:', error);
    throw new Error(error?.message || 'Failed to delete product from Firestore.');
  }
}

// --- MACHINERY CMS ---

export function subscribeToMachinery(
  onData: (items: MachineryItem[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, 'machinery');
  return onSnapshot(
    colRef,
    async (snapshot) => {
      if (snapshot.empty) {
        try {
          const batch = writeBatch(db);
          machineryData.forEach((mach, index) => {
            const docRef = doc(colRef, mach.id || `machine-${index + 1}`);
            batch.set(docRef, {
              ...mach,
              isActive: true,
              order: index + 1,
              updatedAt: serverTimestamp()
            });
          });
          await batch.commit();
        } catch (e) {
          console.warn('Machinery seed error:', e);
        }
        onData(machineryData);
        return;
      }

      const items: MachineryItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any)
      }));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      onData(items);
    },
    (err) => {
      console.warn('Machinery snapshot notice:', err);
      onData(machineryData);
      if (onError) onError(err);
    }
  );
}

export async function saveMachinery(machinery: Partial<MachineryItem>): Promise<string> {
  const colRef = collection(db, 'machinery');
  const id = machinery.id || `machine-${Date.now()}`;
  const docRef = doc(colRef, id);
  const data = {
    ...machinery,
    id,
    isActive: machinery.isActive !== undefined ? machinery.isActive : true,
    updatedAt: serverTimestamp()
  };
  await setDoc(docRef, data, { merge: true });
  return id;
}

export async function deleteMachinery(id: string): Promise<void> {
  const docRef = doc(db, 'machinery', id);
  await deleteDoc(docRef);
}

// --- TESTING EQUIPMENT CMS ---

export function subscribeToTestingEquipment(
  onData: (items: TestingEquipmentItem[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, 'testingEquipment');
  return onSnapshot(
    colRef,
    async (snapshot) => {
      if (snapshot.empty) {
        try {
          const batch = writeBatch(db);
          testingEquipmentData.forEach((test, index) => {
            const docRef = doc(colRef, test.id || `test-${index + 1}`);
            batch.set(docRef, {
              ...test,
              isActive: true,
              order: index + 1,
              updatedAt: serverTimestamp()
            });
          });
          await batch.commit();
        } catch (e) {
          console.warn('Testing equipment seed error:', e);
        }
        onData(testingEquipmentData);
        return;
      }

      const items: TestingEquipmentItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any)
      }));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      onData(items);
    },
    (err) => {
      console.warn('Testing equipment snapshot notice:', err);
      onData(testingEquipmentData);
      if (onError) onError(err);
    }
  );
}

export async function saveTestingEquipment(item: Partial<TestingEquipmentItem>): Promise<string> {
  const colRef = collection(db, 'testingEquipment');
  const id = item.id || `test-${Date.now()}`;
  const docRef = doc(colRef, id);
  const data = {
    ...item,
    id,
    isActive: item.isActive !== undefined ? item.isActive : true,
    updatedAt: serverTimestamp()
  };
  await setDoc(docRef, data, { merge: true });
  return id;
}

export async function deleteTestingEquipment(id: string): Promise<void> {
  const docRef = doc(db, 'testingEquipment', id);
  await deleteDoc(docRef);
}

// --- CLIENTS CMS ---

export function subscribeToClients(
  onData: (items: ClientPartner[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, 'clients');
  return onSnapshot(
    colRef,
    async (snapshot) => {
      if (snapshot.empty) {
        try {
          const batch = writeBatch(db);
          clientPartnersData.forEach((client, index) => {
            const docRef = doc(colRef, `client-${client.id}`);
            batch.set(docRef, {
              ...client,
              isActive: true,
              order: index + 1,
              updatedAt: serverTimestamp()
            });
          });
          await batch.commit();
        } catch (e) {
          console.warn('Clients seed error:', e);
        }
        onData(clientPartnersData);
        return;
      }

      const items: ClientPartner[] = snapshot.docs.map((d) => {
        const data = d.data() as any;
        const matchingDefault = clientPartnersData.find(
          (c) => c.name.toLowerCase().trim() === (data.name || '').toLowerCase().trim() ||
                 String(c.id) === String(data.id) ||
                 `client-${c.id}` === d.id
        );
        return {
          id: d.id,
          ...data,
          logoUrl: data.logoUrl || matchingDefault?.logoUrl || '',
          details: data.details || matchingDefault?.details || '',
          location: data.location || matchingDefault?.location || '',
          supplyType: data.supplyType || matchingDefault?.supplyType || ''
        };
      });
      items.sort((a, b) => (Number(a.order || 0)) - (Number(b.order || 0)));
      onData(items);
    },
    (err) => {
      console.warn('Clients snapshot notice:', err);
      onData(clientPartnersData);
      if (onError) onError(err);
    }
  );
}

export async function saveClient(client: Partial<ClientPartner>): Promise<string> {
  const colRef = collection(db, 'clients');
  const id = String(client.id || `client-${Date.now()}`);
  const docRef = doc(colRef, id);
  const data = {
    ...client,
    id,
    isActive: client.isActive !== undefined ? client.isActive : true,
    updatedAt: serverTimestamp()
  };
  await setDoc(docRef, data, { merge: true });
  return id;
}

export async function deleteClient(id: string | number): Promise<void> {
  const docRef = doc(db, 'clients', String(id));
  await deleteDoc(docRef);
}

// --- GALLERY CMS ---

const DEFAULT_GALLERY: CMSGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Semi-Automatic Corrugation Line',
    caption: 'High-speed fingerless corrugation line at Mandideep plant.',
    category: 'machinery',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
    order: 1
  },
  {
    id: 'gal-2',
    title: 'Two-Colour Flexo Printing Station',
    caption: 'Inline flexographic printing for clean brand labeling.',
    category: 'machinery',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
    order: 2
  },
  {
    id: 'gal-3',
    title: 'Finished Corrugated Carton Pallets',
    caption: 'Quality tested master shippers ready for dispatch.',
    category: 'products',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
    order: 3
  },
  {
    id: 'gal-4',
    title: 'QC Lab & Bursting Strength Tester',
    caption: 'In-house laboratory verifying BF and GSM parameters.',
    category: 'testing',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
    order: 4
  }
];

export function subscribeToGallery(
  onData: (items: CMSGalleryItem[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, 'gallery');
  return onSnapshot(
    colRef,
    async (snapshot) => {
      if (snapshot.empty) {
        try {
          const batch = writeBatch(db);
          DEFAULT_GALLERY.forEach((item) => {
            const docRef = doc(colRef, item.id);
            batch.set(docRef, item);
          });
          await batch.commit();
        } catch (e) {
          console.warn('Gallery seed error:', e);
        }
        onData(DEFAULT_GALLERY);
        return;
      }

      const items: CMSGalleryItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any)
      }));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      onData(items);
    },
    (err) => {
      console.warn('Gallery snapshot notice:', err);
      onData(DEFAULT_GALLERY);
      if (onError) onError(err);
    }
  );
}

export async function saveGalleryItem(item: Partial<CMSGalleryItem>): Promise<string> {
  const colRef = collection(db, 'gallery');
  const id = item.id || `gal-${Date.now()}`;
  const docRef = doc(colRef, id);
  const data = {
    ...item,
    id,
    createdAt: item.createdAt || new Date().toISOString()
  };
  await setDoc(docRef, data, { merge: true });
  return id;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const docRef = doc(db, 'gallery', id);
  await deleteDoc(docRef);
}

// --- BROCHURES CMS ---

const DEFAULT_BROCHURE: CMSBrochure = {
  id: 'brochure-primary',
  title: 'GAPP Packaging LLP - Corporate & Technical Catalog',
  description: 'Complete 10-page profile covering machinery specifications, laboratory testing equipment, and corrugated packaging products.',
  version: 'v2026.1',
  fileUrl: '/docs/gapp_packaging_profile.pdf',
  fileSize: '4.2 MB',
  isPrimary: true,
  downloadCount: 148,
  createdAt: new Date().toISOString()
};

export function subscribeToBrochures(
  onData: (items: CMSBrochure[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, 'brochures');
  return onSnapshot(
    colRef,
    async (snapshot) => {
      if (snapshot.empty) {
        try {
          const docRef = doc(colRef, DEFAULT_BROCHURE.id);
          await setDoc(docRef, DEFAULT_BROCHURE);
        } catch (e) {
          console.warn('Brochure seed notice:', e);
        }
        onData([DEFAULT_BROCHURE]);
        return;
      }

      const items: CMSBrochure[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any)
      }));
      onData(items);
    },
    (err) => {
      console.warn('Brochures snapshot notice:', err);
      onData([DEFAULT_BROCHURE]);
      if (onError) onError(err);
    }
  );
}

export async function saveBrochure(brochure: Partial<CMSBrochure>): Promise<string> {
  const colRef = collection(db, 'brochures');
  const id = brochure.id || `brochure-${Date.now()}`;
  const docRef = doc(colRef, id);
  const data = {
    ...brochure,
    id,
    downloadCount: brochure.downloadCount || 0,
    isPrimary: brochure.isPrimary !== undefined ? brochure.isPrimary : false,
    createdAt: brochure.createdAt || new Date().toISOString()
  };
  await setDoc(docRef, data, { merge: true });
  return id;
}

export async function deleteBrochure(id: string): Promise<void> {
  const docRef = doc(db, 'brochures', id);
  await deleteDoc(docRef);
}

// --- PAGES CMS ---

export const DEFAULT_PAGES: Record<string, CMSPageContent> = {
  home: {
    id: 'page-home',
    slug: 'home',
    title: 'Home Page Content',
    tagline: 'PACKAGING SOLUTIONS FOR BUSINESS',
    heroTitle: 'Reliable Corrugated Packaging for Growing Businesses',
    heroSubtitle: 'Customized carton boxes and packaging solutions designed for protection, presentation and dependable supply.',
    content: {
      bullet1: 'One of the few semi-automatic units in Bhopal/Mandideep',
      bullet2: 'Complete in-house testing laboratory with lot certification',
      bullet3: 'Committed to strict delivery schedules & urgent orders flexibility',
      images: {
        heroImg: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80',
        aboutImg: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80',
        ctaBg: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80',
        prod1: 'https://images.unsplash.com/photo-1580674684081-776d507bcea0?auto=format&fit=crop&q=80',
        prod2: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80',
        prod3: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80',
        prod4: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80',
        gallery1: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80',
        gallery2: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80',
        gallery3: 'https://images.unsplash.com/photo-1580674684081-776d507bcea0?auto=format&fit=crop&q=80',
        gallery4: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80',
        gallery5: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80'
      }
    }
  },
  about: {
    id: 'page-about',
    slug: 'about',
    title: 'About Us Page Content',
    tagline: 'Company Profile & Vision',
    heroTitle: 'Manufacturing Excellence in Corrugated Packaging Since 2020',
    heroSubtitle: 'Established in Mandideep, Madhya Pradesh, providing one-stop professionalized packaging solutions for manufacturing and trade.',
    content: {
      mission: 'To manufacture and supply highest quality corrugated packaging that ensures product safety and enhances customer brand value.',
      vision: 'To be the most preferred packaging partner in Central India through sustainable practices and technological advancement.',
      zeroDischargeText: 'We are committed to eco-friendly production with a zero-discharge facility.',
      images: {
        heroBg: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80',
        storyImg: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80',
        factoryImg: 'https://images.unsplash.com/photo-1580674684081-776d507bcea0?auto=format&fit=crop&q=80'
      }
    }
  },
  contact: {
    id: 'page-contact',
    slug: 'contact',
    title: 'Contact Page Content',
    tagline: 'Get in Touch',
    heroTitle: 'Contact Our Packaging Experts',
    heroSubtitle: 'Ready to discuss your requirements? Our team is here to help you find the perfect packaging solution.',
    content: {
      rfqPrompt: 'Send us your product dimensions and weight capacity, and we will prepare a custom quotation.',
      turnaroundTime: 'We typically respond to all technical queries within 24 hours.',
      images: {
        heroBg: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80'
      }
    }
  }
};

export function subscribeToPages(onData: (data: Record<string, CMSPageContent>) => void, onError?: (error: Error) => void) {
  const colRef = collection(db, 'pages');
  
  return onSnapshot(
    colRef,
    async (snapshot) => {
      if (snapshot.empty) {
        try {
          const batch = writeBatch(db);
          Object.values(DEFAULT_PAGES).forEach((p) => {
            const docRef = doc(colRef, p.slug);
            batch.set(docRef, p);
          });
          await batch.commit();
        } catch (e) {
          console.warn('Pages seed error:', e);
        }
        onData(DEFAULT_PAGES);
        return;
      }

      const pagesMap = {};
      snapshot.docs.forEach((d) => {
        pagesMap[d.id] = { id: d.id, ...d.data() };
      });
      onData(pagesMap);
    },
    (err) => {
      console.warn('Pages snapshot notice:', err);
      onData(DEFAULT_PAGES);
      if (onError) onError(err);
    }
  );
}



export async function savePageContent(slug: string, data: Partial<CMSPageContent>): Promise<void> {
  const docRef = doc(db, 'pages', slug);
  await setDoc(docRef, {
    ...data,
    slug,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

// --- DIRECTORS & LEADERSHIP CMS ---

export const DEFAULT_DIRECTORS: DirectorItem[] = [
  {
    id: 'director-1',
    name: 'Ashish Barkhade',
    role: 'Designated Partner & Director of Operations',
    din: '08892140',
    phone: '+91 9806419199',
    email: 'industriesgapp@gmail.com',
    bio: 'Spearheading plant manufacturing operations, continuous flute corrugation efficiency, technical engineering, and raw kraft paper supply chain logistics at Mandideep unit.',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    order: 1,
    isActive: true,
    createdAt: '2020-01-01T00:00:00.000Z'
  },
  {
    id: 'director-2',
    name: 'Pramod Singh',
    role: 'Designated Partner & Director of Commercial Strategy',
    din: '08892141',
    phone: '+91 9981280902',
    email: 'industriesgapp@gmail.com',
    bio: 'Overseeing corporate client partnerships, customized box design engineering, quality assurance compliance, statutory registrations, and financial governance.',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    order: 2,
    isActive: true,
    createdAt: '2020-01-01T00:00:00.000Z'
  }
];

export function subscribeToDirectors(
  onData: (items: DirectorItem[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, 'directors');
  const q = query(colRef, orderBy('order', 'asc'));

  return onSnapshot(
    q,
    async (snapshot) => {
      if (snapshot.empty) {
        try {
          const batch = writeBatch(db);
          DEFAULT_DIRECTORS.forEach((d) => {
            const docRef = doc(colRef, d.id);
            batch.set(docRef, d);
          });
          await batch.commit();
        } catch (e) {
          console.warn('Directors seed error:', e);
        }
        onData(DEFAULT_DIRECTORS);
        return;
      }

      const list: DirectorItem[] = [];
      snapshot.docs.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...(docSnap.data() as any) });
      });
      onData(list);
    },
    (err) => {
      console.warn('Directors snapshot notice:', err);
      onData(DEFAULT_DIRECTORS);
      if (onError) onError(err);
    }
  );
}

export async function saveDirector(director: Partial<DirectorItem>): Promise<string> {
  const id = director.id || `director-${Date.now()}`;
  const docRef = doc(db, 'directors', id);
  const data = {
    ...director,
    id,
    order: director.order !== undefined ? Number(director.order) : 1,
    isActive: director.isActive !== undefined ? director.isActive : true,
    updatedAt: serverTimestamp(),
    createdAt: director.createdAt || new Date().toISOString()
  };
  await setDoc(docRef, data, { merge: true });
  return id;
}

export async function deleteDirector(id: string): Promise<void> {
  const docRef = doc(db, 'directors', id);
  await deleteDoc(docRef);
}

// --- SETTINGS CMS ---

export const DEFAULT_SETTINGS: CMSSettings = {
  id: 'company-settings',
  logoUrl: '/logo.svg',
  logoDarkUrl: '/logo-dark.svg',
  faviconUrl: '/favicon.svg',
  companyName: companyData.name,
  tagline: companyData.tagline,
  shortDescription: companyData.shortDescription,
  fullDescription: companyData.fullDescription,
  industry: companyData.industry,
  email: companyData.email,
  salesEmail: 'sales@gapppackaging.com',
  phones: companyData.phones,
  whatsappNumber: companyData.whatsappNumber,
  gst: companyData.gst,
  llpin: companyData.llpin,
  pan: 'AAVFG6804D',
  msmeUdyam: 'UDYAM-MP-37-0012480',
  factoryLicense: 'FAC-BPL-2020-8912',
  mppcbConsent: 'MPPCB-CONSENT-2020-AIR-WATER',
  bankName: 'Bank of Baroda',
  bankAccountNo: '98760200001234',
  bankIfsc: 'BARB0OBEDUL',
  bankBranch: 'Obedullaganj, MP',
  established: companyData.established,
  unitLocation: companyData.unitLocation,
  officeAddress: companyData.officeAddress,
  factoryAddress: companyData.factoryAddress,
  stats: companyData.stats,
  workingHours: companyData.workingHours
};

export function subscribeToSettings(
  onData: (settings: CMSSettings) => void,
  onError?: (err: Error) => void
) {
  // 1. Instant hydration from localStorage cache
  try {
    const cached = localStorage.getItem('gapp_cached_settings');
    if (cached) {
      const parsed = JSON.parse(cached);
      onData({ ...DEFAULT_SETTINGS, ...parsed });
    }
  } catch (_) {}

  const docRef = doc(db, 'settings', 'company-settings');
  return onSnapshot(
    docRef,
    async (snap) => {
      if (!snap.exists()) {
        try {
          await setDoc(docRef, DEFAULT_SETTINGS);
        } catch (e) {
          console.warn('Settings seed error:', e);
        }
        onData(DEFAULT_SETTINGS);
        return;
      }
      const data = { ...DEFAULT_SETTINGS, id: snap.id, ...(snap.data() as any) };
      try {
        localStorage.setItem('gapp_cached_settings', JSON.stringify(data));
      } catch (_) {}
      onData(data);
    },
    (err) => {
      console.warn('Settings snapshot notice:', err);
      try {
        const cached = localStorage.getItem('gapp_cached_settings');
        if (cached) {
          onData({ ...DEFAULT_SETTINGS, ...JSON.parse(cached) });
          return;
        }
      } catch (_) {}
      onData(DEFAULT_SETTINGS);
      if (onError) onError(err);
    }
  );
}

export async function saveSettings(settings: Partial<CMSSettings>): Promise<void> {
  if (!isCurrentAdminLoggedIn()) {
    const authErr = new Error('Admin authentication required. Please log in to publish website settings.');
    console.error('Firebase saveSettings error:', authErr);
    throw authErr;
  }

  // Non-blocking Firebase Auth check
  ensureFirebaseAuth().catch(() => {});

  // 1. Instant local persistence so UI and all components update immediately
  try {
    const cached = localStorage.getItem('gapp_cached_settings');
    const existing = cached ? JSON.parse(cached) : DEFAULT_SETTINGS;
    const merged = { ...existing, ...settings };
    localStorage.setItem('gapp_cached_settings', JSON.stringify(merged));
  } catch (_) {}

  // 2. Sanitize undefined fields
  const sanitizedData: Record<string, any> = {};
  Object.entries(settings).forEach(([key, value]) => {
    if (value !== undefined) {
      sanitizedData[key] = value;
    }
  });

  try {
    const docRef = doc(db, 'settings', 'company-settings');
    const backupDocRef = doc(db, 'settings', 'company');

    const firestoreSave = Promise.all([
      setDoc(docRef, {
        ...sanitizedData,
        id: 'company-settings',
        updatedAt: serverTimestamp()
      }, { merge: true }),
      setDoc(backupDocRef, {
        ...sanitizedData,
        id: 'company',
        updatedAt: serverTimestamp()
      }, { merge: true })
    ]);

    // 5-second timeout protection for network resilience
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore write request timed out')), 5000)
    );

    await Promise.race([firestoreSave, timeoutPromise]);
  } catch (error: any) {
    console.warn('Firebase saveSettings notice:', error?.message || error);
    // If cloud timed out, local cache is already saved
  }
}
