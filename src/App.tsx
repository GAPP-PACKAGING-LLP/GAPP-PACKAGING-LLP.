import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { QuoteModal } from './components/modals/QuoteModal';
import { BrochureModal } from './components/modals/BrochureModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { PlantTourPage } from './pages/PlantTourPage';
import { QualityPage } from './pages/QualityPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ClientsPage } from './pages/ClientsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLogin } from './pages/AdminLogin';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UsersCMS } from './pages/admin/UsersCMS';
import { DirectorsCMS } from './pages/admin/DirectorsCMS';
import { PagesCMS } from './pages/admin/PagesCMS';
import { ProductsCMS } from './pages/admin/ProductsCMS';
import { MachineryCMS } from './pages/admin/MachineryCMS';
import { TestingEquipmentCMS } from './pages/admin/TestingEquipmentCMS';
import { ClientsCMS } from './pages/admin/ClientsCMS';
import { GalleryCMS } from './pages/admin/GalleryCMS';
import { BrochuresCMS } from './pages/admin/BrochuresCMS';
import { InquiriesCMS } from './pages/admin/InquiriesCMS';
import { SettingsCMS } from './pages/admin/SettingsCMS';
import { CMSProvider } from './context/CMSContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

// App Layout wrapper to handle Navbar/Footer display for admin pages vs public site
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Dynamic document title and SEO meta tag controller
  useEffect(() => {
    let robotsMeta = document.querySelector('meta[name="robots"]');
    
    if (isAdminRoute) {
      document.title = 'GAPP Packaging LLP | Admin CMS Portal';
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      // Set public titles based on route
      const routeTitles: Record<string, string> = {
        '/': 'GAPP Packaging LLP | Corrugated Box Manufacturer Mandideep, Bhopal',
        '/about': 'About Us | GAPP Packaging LLP - Mandideep Plant & Profile',
        '/products': 'Corrugated Products & Boxes | 3-Ply, 5-Ply, 7-Ply | GAPP Packaging',
        '/industries': 'Industries Served | Pharma, Auto, FMCG Packaging | GAPP Packaging',
        '/infrastructure': 'Manufacturing Infrastructure & 12 Conversion Lines | GAPP Packaging',
        '/plant-tour': 'Virtual Plant Tour | 8-Stage Manufacturing Flow | GAPP Packaging',
        '/quality': 'Quality Assurance & In-House Testing Lab | GAPP Packaging',
        '/calculator': 'Box Configurator & RFQ Estimator | GAPP Packaging',
        '/clients': 'Industrial Clients & Trust Partners | GAPP Packaging',
        '/faq': 'Procurement FAQ & B2B Buyer Guide | GAPP Packaging',
        '/contact': 'Contact & Request Quote | GAPP Packaging LLP Mandideep',
      };
      
      document.title = routeTitles[location.pathname] || 'GAPP Packaging LLP | Industrial Corrugated Packaging Solutions';
      
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
      }
    }
  }, [location.pathname, isAdminRoute]);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [prefilledQuoteData, setPrefilledQuoteData] = useState<{
    boxType?: string;
    dimensions?: { length: string; width: string; height: string; unit: 'mm' | 'inches' };
  }>({});

  const handleOpenQuoteModal = (
    boxType?: string, 
    dimensions?: { length: string; width: string; height: string; unit: 'mm' | 'inches' }
  ) => {
    setPrefilledQuoteData({ boxType, dimensions });
    setIsQuoteModalOpen(true);
  };

  const handleOpenBrochureModal = () => {
    setIsBrochureModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#334155] font-sans antialiased selection:bg-[#0F4C5C] selection:text-white">
      {/* Sticky Header (shown on public site only) */}
      {!isAdminRoute && (
        <Navbar 
          onOpenQuoteModal={() => handleOpenQuoteModal()} 
          onOpenBrochureModal={handleOpenBrochureModal} 
        />
      )}

      {/* Page Routes */}
      <div className="flex-1">
        <Routes>
          {/* Public Pages */}
          <Route 
            path="/" 
            element={
              <HomePage 
                onOpenQuoteModal={handleOpenQuoteModal} 
                onOpenBrochureModal={handleOpenBrochureModal} 
              />
            } 
          />
          <Route 
            path="/about" 
            element={
              <AboutPage 
                onOpenQuoteModal={() => handleOpenQuoteModal()} 
                onOpenBrochureModal={handleOpenBrochureModal} 
              />
            } 
          />
          <Route 
            path="/products" 
            element={
              <ProductsPage 
                onOpenQuoteModal={handleOpenQuoteModal} 
              />
            } 
          />
          <Route 
            path="/industries" 
            element={
              <IndustriesPage 
                onOpenQuoteModal={handleOpenQuoteModal} 
              />
            } 
          />
          <Route 
            path="/infrastructure" 
            element={
              <InfrastructurePage 
                onOpenQuoteModal={() => handleOpenQuoteModal()} 
              />
            } 
          />
          <Route 
            path="/plant-tour" 
            element={
              <PlantTourPage 
                onOpenQuoteModal={() => handleOpenQuoteModal()} 
              />
            } 
          />
          <Route 
            path="/quality" 
            element={
              <QualityPage 
                onOpenQuoteModal={() => handleOpenQuoteModal()} 
                onOpenBrochureModal={handleOpenBrochureModal} 
              />
            } 
          />
          <Route 
            path="/calculator" 
            element={
              <CalculatorPage 
                onOpenQuoteModal={handleOpenQuoteModal} 
                onOpenBrochureModal={handleOpenBrochureModal} 
              />
            } 
          />
          <Route 
            path="/clients" 
            element={
              <ClientsPage 
                onOpenQuoteModal={() => handleOpenQuoteModal()} 
              />
            } 
          />
          <Route 
            path="/faq" 
            element={
              <FaqPage 
                onOpenQuoteModal={() => handleOpenQuoteModal()} 
              />
            } 
          />
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />

          {/* Admin Authentication Login */}
          <Route 
            path="/admin/login" 
            element={<AdminLogin />} 
          />

          {/* Admin Protected CMS Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <UsersCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/pages" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PagesCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/products" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ProductsCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/machinery" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <MachineryCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/testing-equipment" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <TestingEquipmentCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/clients" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ClientsCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/gallery" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <GalleryCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/brochures" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <BrochuresCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/inquiries" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <InquiriesCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/directors" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <DirectorsCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <SettingsCMS />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />

          {/* Fallback 404 to Home */}
          <Route 
            path="*" 
            element={
              <HomePage 
                onOpenQuoteModal={handleOpenQuoteModal} 
                onOpenBrochureModal={handleOpenBrochureModal} 
              />
            } 
          />
        </Routes>
      </div>

      {/* Footer (hidden on all admin routes) */}
      {!isAdminRoute && (
        <Footer 
          onOpenQuoteModal={() => handleOpenQuoteModal()} 
          onOpenBrochureModal={handleOpenBrochureModal} 
        />
      )}

      {/* WhatsApp Floating Action Button (public routes only) */}
      {!isAdminRoute && <WhatsAppButton />}

      {/* Interactive Quote RFQ Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        prefilledBoxType={prefilledQuoteData.boxType}
        prefilledDimensions={prefilledQuoteData.dimensions}
      />

      {/* Technical Brochure Modal */}
      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout />
      </BrowserRouter>
    </CMSProvider>
  );
}

