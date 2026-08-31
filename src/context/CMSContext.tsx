import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CMSSettings,
  DirectorItem,
  ProductItem,
  MachineryItem,
  TestingEquipmentItem,
  ClientPartner,
  CMSGalleryItem,
  CMSBrochure,
  CMSPageContent
} from '../types';
import {
  subscribeToSettings,
  subscribeToDirectors,
  subscribeToProducts,
  subscribeToMachinery,
  subscribeToTestingEquipment,
  subscribeToClients,
  subscribeToGallery,
  subscribeToBrochures,
  subscribeToPages,
  DEFAULT_SETTINGS,
  DEFAULT_DIRECTORS,
  DEFAULT_PAGES
} from '../firebase/cms';
import {
  productsData,
  machineryData,
  testingEquipmentData,
  clientPartnersData
} from '../data/companyData';

interface CMSContextType {
  settings: CMSSettings;
  directors: DirectorItem[];
  products: ProductItem[];
  machinery: MachineryItem[];
  testingEquipment: TestingEquipmentItem[];
  clients: ClientPartner[];
  gallery: CMSGalleryItem[];
  brochures: CMSBrochure[];
  pages: Record<string, CMSPageContent>;
  loading: boolean;
}

const CMSContext = createContext<CMSContextType>({
  settings: DEFAULT_SETTINGS,
  directors: DEFAULT_DIRECTORS,
  products: productsData,
  machinery: machineryData,
  testingEquipment: testingEquipmentData,
  clients: clientPartnersData,
  gallery: [],
  brochures: [],
  pages: DEFAULT_PAGES,
  loading: true
});

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CMSSettings>(DEFAULT_SETTINGS);
  const [directors, setDirectors] = useState<DirectorItem[]>(DEFAULT_DIRECTORS);
  const [products, setProducts] = useState<ProductItem[]>(productsData);
  const [machinery, setMachinery] = useState<MachineryItem[]>(machineryData);
  const [testingEquipment, setTestingEquipment] = useState<TestingEquipmentItem[]>(testingEquipmentData);
  const [clients, setClients] = useState<ClientPartner[]>(clientPartnersData);
  const [gallery, setGallery] = useState<CMSGalleryItem[]>([]);
  const [brochures, setBrochures] = useState<CMSBrochure[]>([]);
  const [pages, setPages] = useState<Record<string, CMSPageContent>>(DEFAULT_PAGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeSubs = true;

    const unsubSettings = subscribeToSettings((data) => {
      if (activeSubs && data) setSettings(data);
    });

    const unsubDirectors = subscribeToDirectors((data) => {
      if (activeSubs && data) setDirectors(data);
    });

    const unsubProducts = subscribeToProducts((data) => {
      if (activeSubs && data) setProducts(data);
    });

    const unsubMachinery = subscribeToMachinery((data) => {
      if (activeSubs && data) setMachinery(data);
    });

    const unsubTesting = subscribeToTestingEquipment((data) => {
      if (activeSubs && data) setTestingEquipment(data);
    });

    const unsubClients = subscribeToClients((data) => {
      if (activeSubs && data) setClients(data);
    });

    const unsubGallery = subscribeToGallery((data) => {
      if (activeSubs && data) setGallery(data);
    });

    const unsubBrochures = subscribeToBrochures((data) => {
      if (activeSubs && data) setBrochures(data);
    });

    const unsubPages = subscribeToPages((data) => {
      if (activeSubs && data) setPages(data);
    });

    setLoading(false);

    return () => {
      activeSubs = false;
      unsubSettings();
      unsubDirectors();
      unsubProducts();
      unsubMachinery();
      unsubTesting();
      unsubClients();
      unsubGallery();
      unsubBrochures();
      unsubPages();
    };
  }, []);

  return (
    <CMSContext.Provider
      value={{
        settings,
        directors,
        products,
        machinery,
        testingEquipment,
        clients,
        gallery,
        brochures,
        pages,
        loading
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
