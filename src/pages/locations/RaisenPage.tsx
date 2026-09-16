import React from 'react';
import { LocationPageTemplate } from '../../components/locations/LocationPageTemplate';

interface RaisenPageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const RaisenPage: React.FC<RaisenPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  return (
    <LocationPageTemplate
      locationName="Raisen"
      h1="Packaging Materials and Solutions in Raisen"
      introduction={
        <>
          <p>
            For businesses looking for a reliable packaging supplier in Raisen, GAPP Packaging LLP offers comprehensive corrugated box manufacturing services. Based nearby in Mandideep, we seamlessly supply high-performance packaging materials to agricultural, industrial, and commercial sectors across the Raisen district.
          </p>
          <p>
            We understand the diverse packaging requirements of the region, providing everything from standard 3-ply corrugated boxes for light retail to heavy-duty 5-ply and 7-ply cartons for bulk transport. Our commitment is to deliver durable, cost-effective packaging solutions that safeguard your products.
          </p>
        </>
      }
      productsOffered={[
        'Agricultural & Produce Packaging',
        '3-Ply Corrugated Cartons',
        '5-Ply Transit Master Boxes',
        'Heavy-Duty 7-Ply Cartons',
        'Custom Sized Packaging Boxes'
      ]}
      industriesServed={[
        'Agriculture & Food Processing',
        'Local Manufacturing & Retail',
        'Warehousing & Distribution',
        'Textiles & Garments',
        'General Industrial Supplies'
      ]}
      serviceStatement="We actively serve selected areas throughout the Raisen district. Delivery availability and logistics may depend on your specific location and total order quantity. Please request a quotation to confirm service details."
      faqs={[
        {
          question: 'Are your corrugated boxes suitable for agricultural produce?',
          answer: 'Yes, our corrugated boxes are designed to withstand varying transit conditions, making them ideal for safely transporting agricultural and food products from Raisen.'
        },
        {
          question: 'Can I estimate the cost of my packaging before ordering?',
          answer: 'Absolutely. We provide an online Packaging Calculator on our website where you can enter your box dimensions and requirements to receive an instant estimate.'
        },
        {
          question: 'How do you handle deliveries to Raisen?',
          answer: 'We coordinate freight and delivery logistics from our Mandideep plant to your facility in Raisen based on the bulk volume of your order.'
        }
      ]}
      onOpenQuoteModal={onOpenQuoteModal}
      onOpenBrochureModal={onOpenBrochureModal}
    />
  );
};
