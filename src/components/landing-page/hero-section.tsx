import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

import heroImage from '../../../public/Digital transformation-bro.svg';

const HeroSection = () => {
  return (
    <>
      {/* Large screen hero section */}
      <section className="hidden lg:block h-full">
        <div className="mt-12 grid grid-cols-2">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-left font-extrabold text-7xl text-primary-600  tracking-wide leading-[5.3rem]">
              More than just shorter links
            </h1>
            <p className="text-xl font-semibold pt-2">
              Build your brand&apos;s recognition and get detailed insights on how your links are performing.
            </p>
            <Button className="w-1/4 mt-10" asChild>
              <Link href="/sign-in">Get started</Link>
            </Button>
          </div>
          <div className="right">
            <Image src={heroImage} alt="hero section image" />
          </div>
        </div>
        <div className="mt-12 mb-16 flex flex-col items-center justify-center">
          <div className="flex items-center justify-around w-[300px]">
            <div className="relative w-[25px] h-[45px] border-4 border-primary-foreground/40 rounded-[60px]">
              <div className="absolute top-[5px] left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] bg-primary-foreground/40 rounded-full opacity-100 animate-wheel"></div>
            </div>
          </div>
          <p className="flex justify-center text-sm text-primary-foreground/40 font-semibold pt-2">Scroll Down</p>
        </div>
      </section>
      {/* Mobile screen hero section */}
      <section className="lg:hidden">
        <div className="my-12 flex flex-col items-center space-y-8 text-center">
          <h1 className="font-extrabold text-5xl text-primary-600 tracking-wide">More than just shorter links</h1>
          <p className="text-xl font-semibold mt-4">
            Build your brand&apos;s recognition and get detailed insights on how your links are performing.
          </p>
          <Button className="w-2/4 mt-10" asChild>
            <Link href="/sign-in">Get started</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
