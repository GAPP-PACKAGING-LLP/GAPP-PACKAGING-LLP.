import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import configJson from '../../firebase-applet-config.json';

// Safe environment variable accessor for Vite
const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};

// Firebase configuration using environment variables with config fallback
export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || configJson.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || configJson.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || configJson.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || configJson.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || configJson.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || configJson.appId,
};

export const firestoreDatabaseId = 
  env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || 
  configJson.firestoreDatabaseId || 
  'ai-studio-gapppackagingllp-8aae7773-3162-42e9-838a-a5b0639ea025';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore Database strictly with the target databaseId
export const db = getFirestore(app, firestoreDatabaseId);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;

