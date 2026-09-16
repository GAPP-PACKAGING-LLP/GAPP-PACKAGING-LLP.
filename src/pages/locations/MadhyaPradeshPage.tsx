import React from 'react';
import { LocationPageTemplate } from '../../components/locations/LocationPageTemplate';

interface MadhyaPradeshPageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const MadhyaPradeshPage: React.FC<MadhyaPradeshPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  return (
    <LocationPageTemplate
      locationName="Madhya Pradesh"
      h1="Packaging Manufacturer Serving Madhya Pradesh"
      introduction={
        <>
          <p>
            As a leading packaging manufacturer based in the heart of Central India, GAPP Packaging LLP offers comprehensive corrugated packaging solutions across Madhya Pradesh. We are the strategic packaging partner for industries ranging from pharmaceuticals to heavy engineering.
          </p>
          <p>
            Our state-of-the-art facility in Mandideep ensures that businesses throughout Bhopal, Indore, Dewas, Sehore, Vidisha, Ujjain, Mandsaur, Neemuch, and Narmadapuram have access to premium 3-ply, 5-ply, and 7-ply corrugated boxes. We combine high-capacity manufacturing with rigorous quality testing to deliver packaging that meets strict IS and ASTM standards.
          </p>
        </>
      }
      productsOffered={[
        '3-Ply, 5-Ply, and 7-Ply Corrugated Boxes',
        'Custom Die-Cut Cartons & Inserts',
        'Heavy-Duty Industrial Master Shippers',
        '2-Colour Flexo Printed Brand Packaging',
        'Automated Flap Pasting & Stitching Solutions'
      ]}
      industriesServed={[
        'Pharmaceuticals & Healthcare',
        'Automotive OEMs & Spares',
        'FMCG, Food & Beverage Processing',
        'E-commerce & Retail Logistics',
        'Heavy Engineering & Export'
      ]}
      serviceStatement="We serve B2B clients across major industrial corridors in Madhya Pradesh, including Bhopal, Indore, Dewas, and Pithampur. Delivery logistics, timelines, and freight costs are evaluated based on the destination and bulk order volume. Contact us to discuss your statewide supply chain needs."
      faqs={[
        {
          question: 'Do you supply packaging to cities like Sehore, Vidisha, and Dewas?',
          answer: 'Yes, we supply corrugated packaging to numerous industrial areas across Madhya Pradesh, including Sehore, Vidisha, Dewas, Ujjain, and Narmadapuram, depending on the order scale.'
        },
        {
          question: 'How do you ensure consistent quality for bulk packaging orders?',
          answer: 'Our Mandideep plant features an in-house testing laboratory where every production batch is tested for Bursting Strength (BS), Cobb moisture absorption, and GSM, guaranteeing consistent quality across all deliveries.'
        },
        {
          question: 'Can you handle continuous supply contracts for large enterprises in MP?',
          answer: 'Yes. With a monthly production capacity exceeding 500 MT, we are well-equipped to handle ongoing supply contracts and scheduled deliveries for large-scale manufacturers and corporate clients.'
        }
      ]}
      onOpenQuoteModal={onOpenQuoteModal}
      onOpenBrochureModal={onOpenBrochureModal}
    />
  );
};
