import React from 'react';
import HeroSection from '../components/HeroSection';
import PartnersRibbon from '../components/PartnersRibbon';
import ServicesGrid from '../components/ServicesGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutBrief from '../components/AboutBrief';
import TestimonialsSection from '../components/TestimonialsSection';
import PortfolioSection from '../components/PortfolioSection';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';
import StrategicNarrativeSection from '../components/StrategicNarrativeSection';

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <PartnersRibbon />
      <ServicesGrid />
      <StrategicNarrativeSection />
      <StatsSection />
      <WhyChooseUs />
      <AboutBrief />
      <TestimonialsSection />
      <PortfolioSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
