import React from 'react';
import { LocationPageTemplate } from '../../components/locations/LocationPageTemplate';

interface RatlamPageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const RatlamPage: React.FC<RatlamPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  return (
    <LocationPageTemplate
      locationName="Ratlam"
      h1="Packaging Solutions for Businesses in Ratlam"
      introduction={
        <>
          <p>
            GAPP Packaging LLP provides robust corrugated packaging solutions to support the growing industrial and commercial activities in Ratlam. As a trusted carton box supplier, we understand the logistical challenges of long-distance transit and provide packaging materials designed to protect your goods effectively.
          </p>
          <p>
            From agricultural produce packaging to specialized industrial shipping cartons, our high-quality 3-ply, 5-ply, and 7-ply boxes deliver exceptional burst strength and stacking capability. We are dedicated to providing Ratlam businesses with reliable and scalable packaging options.
          </p>
        </>
      }
      productsOffered={[
        'Heavy-Duty Transit Cartons (5-Ply & 7-Ply)',
        'Agricultural & Produce Packaging',
        '3-Ply Retail & E-commerce Boxes',
        'Custom Branded Flexo Printed Boxes',
        'Industrial Spares Packaging'
      ]}
      industriesServed={[
        'Agriculture & Produce Export',
        'Chemicals & Fertilizers',
        'Local Manufacturing',
        'Food Processing & FMCG',
        'Warehousing & Distribution'
      ]}
      serviceStatement="We supply corrugated packaging to selected areas in and around Ratlam. As distance is a factor, delivery availability and freight logistics depend significantly on the total order volume. Please request a quotation to confirm service capability."
      faqs={[
        {
          question: 'Are your corrugated boxes suitable for long-distance transit from Ratlam?',
          answer: 'Yes, our 5-ply and 7-ply heavy-duty master shippers are specifically engineered to provide maximum edge crush resistance and burst strength for long-haul transportation.'
        },
        {
          question: 'Do you offer custom dimensions for specific products?',
          answer: 'Absolutely. We manufacture custom-sized packaging boxes tailored exactly to your product dimensions to ensure a secure fit and eliminate transit damage.'
        },
        {
          question: 'How do I determine the right ply and GSM for my packaging needs?',
          answer: 'You can refer to our Packaging Calculator for basic guidance, or consult directly with our packaging engineers who will recommend the optimal paper combination based on your payload weight and transit conditions.'
        }
      ]}
      onOpenQuoteModal={onOpenQuoteModal}
      onOpenBrochureModal={onOpenBrochureModal}
    />
  );
};
