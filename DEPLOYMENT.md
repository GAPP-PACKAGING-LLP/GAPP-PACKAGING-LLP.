# 🚀 GAPP Packaging LLP - Production Deployment Guide

This guide provides step-by-step instructions for deploying the **GAPP Packaging LLP Website & Admin CMS** to **GitHub** and **Vercel** with complete Firebase Authentication, Firestore, and Storage integration.

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Vercel SPA Configuration (`vercel.json`)](#vercel-spa-configuration)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Firebase Console Production Checklist](#firebase-console-production-checklist)
6. [Google Cloud OAuth Configuration](#google-cloud-oauth-configuration)
7. [Deploying via GitHub to Vercel](#deploying-via-github-to-vercel)
8. [Production Verification & Troubleshooting](#production-verification--troubleshooting)

---

## 1. Project Overview
- **Frontend Stack**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Motion
- **Backend & Database**: Firebase Firestore + Firebase Authentication (Google OAuth) + Firebase Storage
- **Admin CMS**: Protected multi-module management portal (`/admin`, `/admin/pages`, `/admin/products`, `/admin/machinery`, `/admin/testing-equipment`, `/admin/clients`, `/admin/gallery`, `/admin/brochures`, `/admin/inquiries`, `/admin/settings`)
- **Hosting Target**: Vercel (Edge Network Static Single Page Application)

---

## 2. Prerequisites
- A GitHub account and Git installed locally.
- A [Vercel](https://vercel.com) account.
- Access to the [Firebase Console](https://console.firebase.google.com).
- Access to the [Google Cloud Console](https://console.cloud.google.com).

---

## 3. Vercel SPA Configuration

The repository includes a root `vercel.json` file ensuring that:
1. All client-side React Router routes (such as `/admin`, `/products`, `/admin/inquiries`) correctly fallback to `/index.html` on direct browser refresh without triggering `404 Not Found`.
2. Static assets in `/assets/*` are served with long-term immutable caching.
3. Standard production security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) are applied.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 4. Environment Variables Setup

When deploying to Vercel, configure the following Environment Variables under **Project Settings > Environment Variables**:

| Variable Name | Description | Example / Source |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSy...` (from Firebase Console) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `<project-id>.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `<project-id>` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `<project-id>.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID | `439177960963` |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | `1:439177960963:web:...` |
| `VITE_FIREBASE_FIRESTORE_DATABASE_ID` | Firestore Database ID | `(default)` |
| `VITE_APPROVED_ADMIN_EMAIL` | Authorized Admin Email | `satpuda.sanskriti.shodh.sansthan@gmail.com` |
| `SITE_URL` / `VITE_SITE_URL` | Production Domain (for Sitemap) | `https://www.gapppackaging.com` |

*(Note: In local development, these can be set in a `.env.local` file modeled after `.env.example`)*

---

## 4.1 Automatic SEO Sitemap & Robots.txt Generation

During every production build (`npm run build`), the build runner executes `scripts/generate-sitemap.js`:
- Generates a valid XML sitemap (`/sitemap.xml`) including all indexed public routes (`/`, `/about`, `/products`, `/infrastructure`, `/quality`, `/contact`).
- Generates `robots.txt` (`/robots.txt`) with proper crawl allowances and blocks `/admin/*` routes from search crawler indexing.
- Output files are placed in `public/` and automatically bundled into `dist/`.

---

## 5. Firebase Console Production Checklist

### A. Authorized Domains (Crucial for Google Sign-In)
Firebase Authentication blocks sign-in requests from domains that are not explicitly authorized.

1. Go to [Firebase Console](https://console.firebase.google.com).
2. Select your project: **`ai-studio-gapppackagingllp`**.
3. In the left navigation, click **Build > Authentication**.
4. Select the **Settings** tab.
5. Click on **Authorized domains**.
6. Ensure the following domains are in the list:
   - `localhost`
   - `ai-studio-gapppackagingllp.firebaseapp.com`
   - `ai-studio-gapppackagingllp.web.app`
   - Your Vercel domain: `<your-project-name>.vercel.app`
   - Your custom domain (e.g. `gapppackaging.com`, `www.gapppackaging.com`)

> ⚠️ **If Google Sign-In fails with `auth/unauthorized-domain`**, your deployed domain is missing from this list. Add it and save.

---

### B. Firestore Security Rules
Ensure your Firestore rules protect admin data while allowing public inquiries:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Function to check if user is an approved admin
    function isAdmin() {
      return request.auth != null && 
        (request.auth.token.email == 'satpuda.sanskriti.shodh.sansthan@gmail.com' ||
         request.auth.token.email == 'industriesgapp@gmail.com');
    }

    // Public RFQ / Inquiry submissions
    match /inquiries/{inquiryId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }

    // CMS Collections (Publicly readable, Admin writable)
    match /settings/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /cms_pages/{pageId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /machinery/{machineId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /testing_equipment/{equipmentId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /clients/{clientId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /gallery/{imageId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /brochures/{brochureId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Users / Admin profiles
    match /users/{userId} {
      allow read, write: if request.auth != null && (request.auth.uid == userId || isAdmin());
    }
  }
}
```

---

## 6. Google Cloud OAuth Configuration

If you configured a custom Google Cloud OAuth client:

1. Open [Google Cloud Console > Credentials](https://console.cloud.google.com/apis/credentials).
2. Click on your **OAuth 2.0 Client IDs** (Web application).
3. Under **Authorized JavaScript origins**, add:
   - `https://<your-project-name>.vercel.app`
   - `https://yourcustomdomain.com`
4. Under **Authorized redirect URIs**, add:
   - `https://<your-firebase-project-id>.firebaseapp.com/__/auth/handler`
   - `https://<your-project-name>.vercel.app/__/auth/handler` (if using custom auth handler)
5. Click **Save**.

---

## 7. Deploying via GitHub to Vercel

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "feat: complete GAPP Packaging website and admin CMS production build"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." > "Project"**.
2. Connect your GitHub repository.
3. In **Build and Output Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (or `vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Expand **Environment Variables** and add all `VITE_FIREBASE_*` variables from `.env.example`.
5. Click **Deploy**.

---

## 8. Production Verification & Troubleshooting

### Verification Checklist:
- [ ] **Public Navigation**: Verify `/`, `/about`, `/products`, `/infrastructure`, `/quality`, `/contact`.
- [ ] **SPA Route Refresh**: Open `/admin/products` and refresh the browser (`Ctrl + R` / `Cmd + R`). It should reload smoothly without a 404 error.
- [ ] **RFQ Submission**: Submit a quote request on the homepage or `/contact` page. Confirm it appears immediately in Firestore and in `/admin/inquiries`.
- [ ] **Admin Google Sign-In**: Navigate to `/admin/login` and sign in with an approved Google account (`satpuda.sanskriti.shodh.sansthan@gmail.com`).
- [ ] **CMS Updates**: Edit plant details or a product in the CMS and verify updates reflect instantly on the public website.
- [ ] **Brochure Download**: Test downloading the technical catalog from the modal.

### Common Solutions:
| Issue | Root Cause | Solution |
|---|---|---|
| `404 Not Found on Refresh` | Missing SPA redirect | Ensure `vercel.json` with rewrite to `/index.html` is in repo root. |
| `auth/unauthorized-domain` | Vercel domain not whitelisted | Add your `.vercel.app` domain in Firebase Console > Authentication > Settings > Authorized domains. |
| `Missing or insufficient permissions` | Firestore security rules | Deploy updated `firestore.rules` allowing authenticated admin writes. |
| `Popup closed by user / Popup blocked` | Browser blocked popup | Allow popups for the website domain in browser settings. |
