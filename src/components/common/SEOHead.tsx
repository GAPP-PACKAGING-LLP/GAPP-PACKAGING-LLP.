import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  structuredData?: Record<string, any>;
  noIndex?: boolean;
}

const SITE_URL = 'https://gapp-packaging-llp.vercel.app';
const DEFAULT_OG_IMAGE = 'https://gapp-packaging-llp.vercel.app/logo.svg';

export const PAGE_SEO_CONFIG: Record<string, {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  breadcrumbs: Array<{ name: string; path: string }>;
}> = {
  '/': {
    title: 'GAPP Packaging LLP | Top Corrugated Box Manufacturer Mandideep, Bhopal MP',
    description: 'Leading B2B corrugated box manufacturer in Mandideep Industrial Area & Bhopal (Madhya Pradesh). Automatic 3-ply, 5-ply, 7-ply heavy duty boxes, printed cartons, die-cut packaging & fast custom quotes.',
    keywords: 'corrugated box manufacturer in Mandideep, corrugated box manufacturer in Bhopal, packaging boxes supplier Madhya Pradesh, 3 ply 5 ply 7 ply carton boxes, heavy duty shipping boxes Bhopal, custom corrugated boxes factory Indore Mandideep, industrial packaging solutions Central India, printed cartons factory MP',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },
  '/products': {
    title: 'Corrugated Boxes & Packaging Range | 3-Ply, 5-Ply, 7-Ply | GAPP Packaging',
    description: 'Explore industrial grade 3-ply retail cartons, 5-ply master shippers, 7-ply heavy machinery export containers, die-cut custom packaging, and printed boxes with certified bursting strength.',
    keywords: '3 ply corrugated boxes, 5 ply shipping cartons, 7 ply heavy duty boxes, die cut boxes manufacturer Bhopal, custom printed corrugated boxes, industrial carton boxes supplier MP, corrugated packaging product catalog',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
    ],
  },
  '/calculator': {
    title: 'Corrugated Box Size & RFQ Cost Estimator | Instant Quote | GAPP Packaging',
    description: 'Online Box Configurator & RFQ Estimator. Calculate length, width, height, ply count, bursting strength (BS), and get instant competitive factory pricing for bulk box orders.',
    keywords: 'corrugated box price calculator, box dimension cost estimator, 5 ply box weight calculator, RFQ box quotation online, custom packaging price calculator Bhopal Mandideep',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Box Calculator', path: '/calculator' },
    ],
  },
  '/industries': {
    title: 'Packaging Solutions for Pharma, Auto, Food & FMCG | GAPP Packaging LLP',
    description: 'Customized industrial packaging for Pharmaceuticals, Automotive Components, Food & Beverage, E-commerce, Heavy Engineering, and Agricultural exports across Madhya Pradesh.',
    keywords: 'pharmaceutical packaging boxes MP, automotive spare parts corrugated cartons, food grade printed boxes, FMCG master shippers Bhopal, e commerce packaging boxes manufacturer',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Industries Served', path: '/industries' },
    ],
  },
  '/infrastructure': {
    title: 'Manufacturing Infrastructure & 12 Conversion Lines | GAPP Packaging Mandideep',
    description: 'State-of-the-art 35,000+ sq.ft. plant in Mandideep with high-speed 5-ply corrugator, 2-colour flexo printing, auto die-cutters, high-capacity rotary slotters & stitching lines.',
    keywords: 'corrugated box plant infrastructure Mandideep, corrugation machinery line Bhopal, 2 color flexo printer slotter, auto platen die cutting machine, high volume carton production MP',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Infrastructure', path: '/infrastructure' },
    ],
  },
  '/plant-tour': {
    title: 'Virtual Plant Tour & 8-Stage Manufacturing Process | GAPP Packaging',
    description: 'Take a virtual tour of our Mandideep corrugation facility. From raw Kraft paper conditioning, corrugation, flute bonding, precision slotting to laboratory batch clearance.',
    keywords: 'corrugated box manufacturing process, virtual factory tour packaging plant, kraft paper corrugation plant tour, box quality inspection process MP',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Plant Tour', path: '/plant-tour' },
    ],
  },
  '/quality': {
    title: 'Quality Assurance & In-House Testing Laboratory | GAPP Packaging LLP',
    description: 'IS/ASTM certified in-house packaging testing laboratory. Rigorous Bursting Strength (BS), Cobb 60 moisture test, GSM analysis, moisture meter, and batch quality certificates.',
    keywords: 'corrugated box quality testing lab Bhopal, bursting factor testing machine, Cobb sizing tester Mandideep, GSM test paper packaging, ISO quality certified corrugated boxes',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Quality & Testing', path: '/quality' },
    ],
  },
  '/clients': {
    title: 'Our Industrial Clients & Corporate Partners | GAPP Packaging LLP',
    description: 'Trusted packaging partner for 150+ leading enterprises across pharma, automotive, food processing, FMCG, and heavy engineering in Bhopal, Mandideep, Indore & Central India.',
    keywords: 'corrugated box suppliers to top industries, packaging clients Bhopal Indore, corporate carton supplier Madhya Pradesh, industrial packaging partners',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Clients', path: '/clients' },
    ],
  },
  '/faq': {
    title: 'B2B Procurement FAQ & Corrugated Box Buying Guide | GAPP Packaging',
    description: 'Find answers to common questions on MOQ, delivery timelines in MP, flute profiles, paper bursting factors (BF), custom printing options, and payment terms.',
    keywords: 'corrugated box FAQ, carton box procurement guide, MOQ corrugated box order Bhopal, difference 3 ply 5 ply box, kraft paper GSM selection guide',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
  },
  '/about': {
    title: 'About Us | Premier Packaging Box Factory Mandideep | GAPP Packaging LLP',
    description: 'Established in 2020, GAPP Packaging LLP is committed to manufacturing sustainable, high-strength corrugated carton packaging with uncompromising precision in Mandideep, Bhopal.',
    keywords: 'about GAPP Packaging LLP, corrugated box manufacturer company profile, packaging factory founders Mandideep, sustainable packaging manufacturer MP',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ],
  },
  '/contact': {
    title: 'Contact Us & Request Fast Quote | Mandideep Factory | GAPP Packaging',
    description: 'Get in touch with GAPP Packaging LLP. Visit our plant at Khanpura Road, Mandideep Industrial Area or call +91 9806419199 / +91 9981280902 for wholesale quotes within 2 hours.',
    keywords: 'contact corrugated box manufacturer, GAPP packaging address Mandideep Bhopal, carton box factory phone number, request packaging quotation MP',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact Us', path: '/contact' },
    ],
  },
};

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  structuredData,
  noIndex = false,
}: SEOProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    const config = PAGE_SEO_CONFIG[pathname] || PAGE_SEO_CONFIG['/'];
    
    // 1. Set Title
    const finalTitle = isAdmin 
      ? 'GAPP Packaging LLP | Admin CMS Portal' 
      : (title || config?.title || 'GAPP Packaging LLP | Industrial Corrugated Packaging Solutions');
    document.title = finalTitle;

    // Helper to safely set meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper for link tags (canonical)
    const setLinkTag = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Robots Meta
    if (isAdmin || noIndex) {
      setMetaTag('robots', 'noindex, nofollow, noarchive');
    } else {
      setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    if (!isAdmin) {
      const finalDescription = description || config?.description || 'Premier Corrugated Box Manufacturer in Mandideep, Bhopal (MP). High-capacity 3-ply, 5-ply, 7-ply cartons & custom packaging.';
      const finalKeywords = keywords || config?.keywords || 'corrugated boxes, manufacturer Mandideep, packaging boxes Bhopal, 3 ply 5 ply 7 ply boxes MP';
      const finalCanonical = canonicalUrl || `${SITE_URL}${pathname === '/' ? '' : pathname}`;
      const finalOgImage = ogImage || config?.ogImage || DEFAULT_OG_IMAGE;

      setMetaTag('description', finalDescription);
      setMetaTag('keywords', finalKeywords);
      setLinkTag('canonical', finalCanonical);

      // Open Graph Tags
      setMetaTag('og:title', finalTitle, true);
      setMetaTag('og:description', finalDescription, true);
      setMetaTag('og:url', finalCanonical, true);
      setMetaTag('og:image', finalOgImage, true);
      setMetaTag('og:type', ogType, true);
      setMetaTag('og:site_name', 'GAPP Packaging LLP', true);
      setMetaTag('og:locale', 'en_IN', true);

      // Twitter Cards
      setMetaTag('twitter:card', 'summary_large_image');
      setMetaTag('twitter:title', finalTitle);
      setMetaTag('twitter:description', finalDescription);
      setMetaTag('twitter:image', finalOgImage);

      // Geo Tags for Central India & Madhya Pradesh
      setMetaTag('geo.region', 'IN-MP');
      setMetaTag('geo.placename', 'Mandideep, Bhopal, Obedullaganj, Raisen, Indore');
      setMetaTag('geo.position', '23.0645;77.5256');
      setMetaTag('ICBM', '23.0645, 77.5256');

      // Inject Breadcrumb Schema for Current Route
      const breadcrumbs = config?.breadcrumbs || [{ name: 'Home', path: '/' }];
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': crumb.name,
          'item': `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
        })),
      };

      // Remove existing dynamic schemas
      const existingDynamicBreadcrumb = document.getElementById('dynamic-breadcrumb-schema');
      if (existingDynamicBreadcrumb) {
        existingDynamicBreadcrumb.remove();
      }

      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'dynamic-breadcrumb-schema';
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(breadcrumbScript);

      // Custom page-level structured data if provided
      if (structuredData) {
        const existingCustomData = document.getElementById('dynamic-page-schema');
        if (existingCustomData) {
          existingCustomData.remove();
        }
        const customScript = document.createElement('script');
        customScript.id = 'dynamic-page-schema';
        customScript.type = 'application/ld+json';
        customScript.text = JSON.stringify(structuredData);
        document.head.appendChild(customScript);
      }
    }
  }, [pathname, title, description, keywords, canonicalUrl, ogImage, ogType, structuredData, noIndex, isAdmin]);

  return null;
}
