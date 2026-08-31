import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp, 
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { InquiryInput, InquiryDocument, InquiryStatus } from '../types';

const INQUIRIES_COLLECTION = 'inquiries';

/**
 * Creates a new customer inquiry in Firestore 'inquiries' collection.
 * Conforms strictly to required fields: name, company, phone, email, message, status, createdAt.
 */
export async function createInquiry(data: InquiryInput): Promise<{ id: string; inquiryRef: string }> {
  try {
    const generatedRef = data.inquiryRef || `GAPP-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Prepare document data with required fields
    const inquiryPayload = {
      name: (data.name || '').trim(),
      company: (data.company || '').trim(),
      phone: (data.phone || '').trim(),
      email: (data.email || '').trim().toLowerCase(),
      message: (data.message || '').trim(),
      status: (data.status || 'new') as InquiryStatus,
      createdAt: serverTimestamp(),
      inquiryRef: generatedRef,
      // Optional packaging specifications if provided
      boxType: data.boxType || 'Standard Corrugated Box',
      plyCount: data.plyCount || '5-ply',
      dimensionsLength: data.dimensionsLength || '',
      dimensionsWidth: data.dimensionsWidth || '',
      dimensionsHeight: data.dimensionsHeight || '',
      dimensionUnit: data.dimensionUnit || 'mm',
      monthlyQuantity: data.monthlyQuantity || '',
      deliveryLocation: data.deliveryLocation || '',
      printRequirement: data.printRequirement || '',
      source: data.source || 'contact_page'
    };

    const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), inquiryPayload);
    
    return {
      id: docRef.id,
      inquiryRef: generatedRef
    };
  } catch (error) {
    console.error('Error creating inquiry in Firestore:', error);
    throw error;
  }
}

/**
 * Fetches all inquiries from Firestore, optionally filtered by status.
 */
export async function getInquiries(filterStatus?: string): Promise<InquiryDocument[]> {
  try {
    const inquiriesRef = collection(db, INQUIRIES_COLLECTION);
    let q = query(inquiriesRef, orderBy('createdAt', 'desc'));
    
    if (filterStatus && filterStatus !== 'all') {
      q = query(inquiriesRef, where('status', '==', filterStatus), orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    const results: InquiryDocument[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      results.push({
        id: docSnap.id,
        name: data.name || '',
        company: data.company || '',
        phone: data.phone || '',
        email: data.email || '',
        message: data.message || '',
        status: (data.status || 'new') as InquiryStatus,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt || new Date(),
        updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : data.updatedAt,
        adminNotes: data.adminNotes || '',
        boxType: data.boxType,
        plyCount: data.plyCount,
        dimensionsLength: data.dimensionsLength,
        dimensionsWidth: data.dimensionsWidth,
        dimensionsHeight: data.dimensionsHeight,
        dimensionUnit: data.dimensionUnit,
        monthlyQuantity: data.monthlyQuantity,
        deliveryLocation: data.deliveryLocation,
        printRequirement: data.printRequirement,
        inquiryRef: data.inquiryRef,
        source: data.source
      });
    });

    return results;
  } catch (error) {
    console.error('Error fetching inquiries from Firestore:', error);
    throw error;
  }
}

/**
 * Subscribes to real-time updates for inquiries.
 */
export function subscribeToInquiries(
  callback: (inquiries: InquiryDocument[]) => void,
  onError?: (error: Error) => void
): () => void {
  const inquiriesRef = collection(db, INQUIRIES_COLLECTION);
  const q = query(inquiriesRef, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const results: InquiryDocument[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        results.push({
          id: docSnap.id,
          name: data.name || '',
          company: data.company || '',
          phone: data.phone || '',
          email: data.email || '',
          message: data.message || '',
          status: (data.status || 'new') as InquiryStatus,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : (data.createdAt || new Date()),
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : data.updatedAt,
          adminNotes: data.adminNotes || '',
          boxType: data.boxType,
          plyCount: data.plyCount,
          dimensionsLength: data.dimensionsLength,
          dimensionsWidth: data.dimensionsWidth,
          dimensionsHeight: data.dimensionsHeight,
          dimensionUnit: data.dimensionUnit,
          monthlyQuantity: data.monthlyQuantity,
          deliveryLocation: data.deliveryLocation,
          printRequirement: data.printRequirement,
          inquiryRef: data.inquiryRef,
          source: data.source
        });
      });
      callback(results);
    },
    (err) => {
      console.error('Firestore onSnapshot error:', err);
      if (onError) onError(err);
    }
  );

  return unsubscribe;
}

/**
 * Updates the status and optional admin notes of an inquiry.
 */
export async function updateInquiryStatus(
  id: string, 
  status: InquiryStatus, 
  adminNotes?: string
): Promise<void> {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    const updateData: Record<string, any> = {
      status,
      updatedAt: serverTimestamp()
    };
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error(`Error updating inquiry ${id}:`, error);
    throw error;
  }
}

/**
 * Deletes an inquiry from Firestore.
 */
export async function deleteInquiry(id: string): Promise<void> {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting inquiry ${id}:`, error);
    throw error;
  }
}
