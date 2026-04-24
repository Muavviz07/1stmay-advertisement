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
import VideoTeaser from '../components/VideoTeaser';

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <PartnersRibbon />
      <ServicesGrid />
      <StrategicNarrativeSection />
      <WhyChooseUs />
      <AboutBrief />
      <TestimonialsSection />
      <VideoTeaser />
      {/* <PortfolioSection /> */}
      <StatsSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
