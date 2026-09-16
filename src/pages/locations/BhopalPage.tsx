import React from 'react';
import { LocationPageTemplate } from '../../components/locations/LocationPageTemplate';

interface BhopalPageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const BhopalPage: React.FC<BhopalPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  return (
    <LocationPageTemplate
      locationName="Bhopal"
      h1="Packaging Solutions for Businesses in Bhopal"
      introduction={
        <>
          <p>
            As a leading packaging manufacturer serving Bhopal, GAPP Packaging LLP provides high-quality corrugated boxes and industrial packaging solutions tailored to the unique needs of local businesses. With our advanced manufacturing unit located in the nearby Mandideep Industrial Area, we are uniquely positioned to offer fast, reliable, and cost-effective packaging materials across the Bhopal region.
          </p>
          <p>
            Whether you operate in manufacturing, FMCG, pharmaceuticals, or e-commerce, our 3-ply, 5-ply, and 7-ply corrugated cartons are engineered to ensure your products remain secure during transit and storage.
          </p>
        </>
      }
      productsOffered={[
        '3-Ply Corrugated Boxes (Single Wall)',
        '5-Ply Corrugated Boxes (Double Wall)',
        '7-Ply Heavy Duty Industrial Containers',
        'Custom Die-Cut Cartons & Partitions',
        '2-Colour Flexo Printed Brand Packaging'
      ]}
      industriesServed={[
        'Pharmaceuticals & Healthcare',
        'Automotive Parts & Components',
        'Food & Beverage Processing',
        'E-commerce & Retail Logistics',
        'Heavy Engineering & Machinery'
      ]}
      serviceStatement="We directly serve industrial and commercial clients throughout Bhopal. With our proximity to the city, we can offer rapid delivery and highly responsive service. Please contact us to confirm specific delivery availability based on your order quantity."
      faqs={[
        {
          question: 'Do you deliver corrugated boxes to all industrial areas in Bhopal?',
          answer: 'Yes, we supply packaging materials to Govindpura Industrial Area, New Kabadkhana, and other major commercial zones in Bhopal. Delivery logistics depend on the bulk quantity ordered.'
        },
        {
          question: 'Can you manufacture custom-printed packaging boxes?',
          answer: 'Absolutely. We offer 2-colour flexo printing on our corrugated boxes, allowing you to include your company logo, handling instructions, and product details directly on the packaging.'
        },
        {
          question: 'What is the minimum order quantity (MOQ) for Bhopal deliveries?',
          answer: 'Our typical minimum order quantity depends on the box specifications and customization requirements. Please use our packaging calculator or contact our sales team for an exact quote.'
        }
      ]}
      onOpenQuoteModal={onOpenQuoteModal}
      onOpenBrochureModal={onOpenBrochureModal}
    />
  );
};
