import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import configJson from '../../firebase-applet-config.json';

// Safe environment variable accessor for Vite
const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};

// Firebase configuration using config with env fallback
export const firebaseConfig = {
  apiKey: configJson.apiKey || env.VITE_FIREBASE_API_KEY,
  authDomain: configJson.authDomain || env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: configJson.projectId || env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: configJson.storageBucket || env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: configJson.messagingSenderId || env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: configJson.appId || env.VITE_FIREBASE_APP_ID,
};

export const firestoreDatabaseId = 
  configJson.firestoreDatabaseId || 
  env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || 
  'ai-studio-gapppackagingllp-8aae7773-3162-42e9-838a-a5b0639ea025';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore Database strictly with the target databaseId (CRITICAL: App will fail with Database 'default' not found without this)
export const db = getFirestore(app, firestoreDatabaseId);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;

