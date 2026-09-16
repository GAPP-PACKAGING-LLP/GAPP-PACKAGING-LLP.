import React from 'react';
import { LocationPageTemplate } from '../../components/locations/LocationPageTemplate';

interface IndorePageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const IndorePage: React.FC<IndorePageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  return (
    <LocationPageTemplate
      locationName="Indore"
      h1="Packaging Solutions for Indore Businesses"
      introduction={
        <>
          <p>
            GAPP Packaging LLP extends its premium corrugated packaging solutions to the vibrant industrial and commercial hubs of Indore. As a dedicated packaging material supplier, we cater to the high-volume demands of businesses operating in Indore, Dewas, Pithampur, and surrounding areas.
          </p>
          <p>
            Whether you require custom-printed e-commerce boxes, pharmaceutical cartons, or heavy-duty industrial shipping containers, our 3-ply, 5-ply, and 7-ply corrugated boxes are engineered for optimal strength. We support Indore's fast-paced industries with scalable, reliable, and high-quality packaging manufacturing.
          </p>
        </>
      }
      productsOffered={[
        'Pharmaceutical & Healthcare Packaging',
        'FMCG & Retail Corrugated Boxes',
        '5-Ply & 7-Ply Industrial Shippers',
        'E-commerce Transit Boxes',
        'Precision Die-Cut Cartons with Flexo Printing'
      ]}
      industriesServed={[
        'Pharmaceuticals',
        'FMCG & Food Processing',
        'Automotive & Engineering (Pithampur)',
        'E-commerce & Retail Logistics',
        'Textiles & Garments'
      ]}
      serviceStatement="We regularly supply high-volume corrugated packaging to businesses across Indore and the Pithampur industrial area. Logistics and delivery schedules are optimized based on bulk order quantities. Contact us to confirm service availability for your specific requirements."
      faqs={[
        {
          question: 'Do you supply corrugated boxes to the Pithampur industrial area?',
          answer: 'Yes, we provide heavy-duty packaging solutions to automotive and manufacturing companies located in Pithampur and the broader Indore region.'
        },
        {
          question: 'What types of flute profiles do you offer for Indore clients?',
          answer: 'We offer single-wall (B, C, E flutes), double-wall (BC, BB flutes), and triple-wall profiles to meet varying stacking and transit requirements.'
        },
        {
          question: 'How can I get a quotation for bulk packaging delivery to Indore?',
          answer: 'You can use our online Packaging Calculator for an initial estimate, or submit a direct RFQ (Request for Quotation) for a detailed commercial proposal including logistics.'
        }
      ]}
      onOpenQuoteModal={onOpenQuoteModal}
      onOpenBrochureModal={onOpenBrochureModal}
    />
  );
};
