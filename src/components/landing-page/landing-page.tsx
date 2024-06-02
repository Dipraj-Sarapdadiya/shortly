import React from 'react';

import Navbar from './nav-bar';
import HeroSection from './hero-section';
import LinkSection from './link-section';
import OfferSection from './offer-section';
import CallToAction from './call-to-action';
import Footer from './footer';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LinkSection />
      <OfferSection />
      <CallToAction />
      <Footer />
    </>
  );
};

export default LandingPage;
