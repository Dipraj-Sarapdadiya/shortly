import React from 'react';

import Link from 'next/link';

import { Link2, Check, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OfferSection = () => {
  return (
    <div className='pt-20 flex flex-col gap-y-4'>
      <div className='title font-semibold flex flex-col justify-center items-center gap-y-4'>
        <h2 className='text-4xl text-primary-600'>What we offer</h2>
        <p className='text-lg text-center text-primary-foreground-500'>
          Discover a unified platform to create seamless brand interactions,
          manage links and QR Codes, and engage audiences worldwide, all in one
          place.
        </p>
      </div>
      <div className='offer-card flex items-center justify-center gap-x-16 pt-8'>
        <div className='card-one w-2/6 h-auto border-2 rounded-md border-primary-foreground/40 flex flex-col px-6'>
          <div className='card-title flex gap-x-2 pt-5 justify-center text-xl font-semibold'>
            <Link2 />
            <h3>URL Shortener</h3>
          </div>
          <p className='text-center text-sm pt-2'>
            An all-in-one solution designed to amplify every interaction between
            your content and your audience.
          </p>

          <div className='card-feature flex flex-col py-5'>
            <h4 className='text-sm font-semibold'>
              Explore the Top Link Management Features:
            </h4>
            <ul className='text-md font-semibold'>
              <li className='flex justify-start gap-x-4 py-1 pt-2'>
                <Check /> URL shortening at scale
              </li>
              <li className='flex file:justify-start gap-x-4 py-1'>
                <Check /> Custom links with your brand
              </li>
              <li className='flex justify-start gap-x-4 py-1'>
                <Check /> URL redirects
              </li>
              <li className='flex justify-start gap-x-4 py-1'>
                <Check /> Advanced analytics & tracking
              </li>
            </ul>
          </div>
          <Button variant='default' className='mb-4 mt-2' asChild>
            <Link href='/products/url-shortener'>Learn more</Link>
          </Button>
        </div>
        <div className='card-two w-2/6 h-auto border-2 rounded-md border-primary-foreground/40 flex flex-col px-6'>
          <div className='card-title flex gap-x-2 pt-5 justify-center text-xl font-semibold'>
            <QrCode />
            <h3>QR Codes</h3>
          </div>
          <p className='text-center text-sm pt-2 pb-6'>
          Tailored QR Code Solutions for Every Brand, Business, and Customer Journey.
          </p>

          <div className='card-feature flex flex-col py-5'>
            <h4 className='text-sm font-semibold'>
              Explore the Top Link Management Features:
            </h4>
            <ul className='text-md font-semibold'>
              <li className='flex justify-start gap-x-4 py-1 pt-2'>
                <Check /> URL shortening at scale
              </li>
              <li className='flex file:justify-start gap-x-4 py-1'>
                <Check /> Custom links with your brand
              </li>
              <li className='flex justify-start gap-x-4 py-1'>
                <Check /> URL redirects
              </li>
              <li className='flex justify-start gap-x-4 py-1'>
                <Check /> Advanced analytics & tracking
              </li>
            </ul>
          </div>
          <Button variant='default' className='mb-4 mt-2' asChild>
            <Link href='/products/qr-codes'>Learn more</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
