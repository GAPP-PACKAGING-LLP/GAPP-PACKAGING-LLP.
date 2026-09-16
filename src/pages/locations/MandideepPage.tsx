import React from 'react';
import { LocationPageTemplate } from '../../components/locations/LocationPageTemplate';

interface MandideepPageProps {
  onOpenQuoteModal: (boxType?: string, dimensions?: any) => void;
  onOpenBrochureModal: () => void;
}

export const MandideepPage: React.FC<MandideepPageProps> = ({ onOpenQuoteModal, onOpenBrochureModal }) => {
  return (
    <LocationPageTemplate
      locationName="Mandideep"
      h1="Industrial Packaging Solutions in Mandideep"
      introduction={
        <>
          <p>
            GAPP Packaging LLP operates its primary manufacturing facility directly within the Mandideep Industrial Area. As a local packaging company in Mandideep, we offer unparalleled speed, convenience, and hands-on service to neighboring industrial plants and manufacturing units.
          </p>
          <p>
            Our facility produces industrial-grade corrugated packaging, including robust 5-ply and 7-ply heavy-duty shipping cartons designed to protect heavy machinery, automotive components, and bulk goods. We take pride in contributing to the local manufacturing ecosystem by supplying certified, burst-resistant corrugated boxes.
          </p>
        </>
      }
      productsOffered={[
        '5-Ply Master Shippers (Double Wall)',
        '7-Ply Heavy Duty Industrial Containers',
        '3-Ply Lightweight Retail Cartons',
        'Custom Die-Cut Corrugated Inserts',
        'Branded Packaging Solutions'
      ]}
      industriesServed={[
        'Automotive OEM & Spares',
        'Heavy Engineering & Fabrication',
        'Chemicals & Fertilizers',
        'Export Processing Units',
        'FMCG & Consumer Goods'
      ]}
      serviceStatement="As our factory is located at Survey No. 13/1/1/3 Khanpura Rd, Industrial Area, Mandideep, we provide immediate support, quick turnaround times, and flexible delivery options for all businesses operating within the Mandideep region."
      faqs={[
        {
          question: 'Can we visit your packaging factory in Mandideep?',
          answer: 'Yes, we welcome our B2B clients to visit our manufacturing facility in the Mandideep Industrial Area to inspect our corrugation lines, printing capabilities, and quality testing lab.'
        },
        {
          question: 'Do you provide testing certificates for your corrugated boxes?',
          answer: 'Yes. Every batch manufactured in our Mandideep plant undergoes strict quality checks in our in-house laboratory. We provide certificates for Bursting Strength (BS), Grammage (GSM), and Cobb tests.'
        },
        {
          question: 'How fast can you deliver urgent packaging orders within Mandideep?',
          answer: 'Because we are locally based, we can often accommodate urgent order requests and rapid turnarounds for neighboring businesses, depending on raw material availability and production schedules.'
        }
      ]}
      onOpenQuoteModal={onOpenQuoteModal}
      onOpenBrochureModal={onOpenBrochureModal}
    />
  );
};
