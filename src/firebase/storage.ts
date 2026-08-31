import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';
import { compressImageFile, fileToDataUrl } from '../utils/imageCompressor';

/**
 * Uploads an attachment (drawing, spec sheet, sample box image) to Firebase Storage
 */
export async function uploadInquiryAttachment(
  file: File, 
  inquiryRef: string = 'general'
): Promise<string> {
  let fileToUpload = file;
  let fallbackDataUrl = '';

  try {
    if (file.type.startsWith('image/')) {
      const compressed = await compressImageFile(file, 1200, 1200, 0.8);
      fileToUpload = compressed.file;
      fallbackDataUrl = compressed.dataUrl;
    } else if (file.size <= 750 * 1024) {
      fallbackDataUrl = await fileToDataUrl(file);
    }
  } catch (compErr) {
    console.warn('Inquiry attachment compression notice:', compErr);
  }

  const timestamp = Date.now();
  const cleanFileName = fileToUpload.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storagePath = `inquiries/${inquiryRef}/${timestamp}_${cleanFileName}`;

  const attemptUpload = async () => {
    const storageRef = ref(storage, storagePath);
    const snapshot = await uploadBytes(storageRef, fileToUpload);
    return await getDownloadURL(snapshot.ref);
  };

  const timeoutPromise = new Promise<string>((_, reject) => {
    setTimeout(() => reject(new Error('Storage upload timeout')), 3000);
  });

  try {
    return await Promise.race([attemptUpload(), timeoutPromise]);
  } catch (error) {
    console.warn('Firebase Storage upload notice, using direct data URL fallback:', error);
    if (fallbackDataUrl) {
      return fallbackDataUrl;
    }
    throw error;
  }
}

