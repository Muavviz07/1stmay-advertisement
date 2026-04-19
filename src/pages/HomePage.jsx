import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutBrief from '../components/AboutBrief';
import TestimonialsSection from '../components/TestimonialsSection';
import PortfolioSection from '../components/PortfolioSection';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <ServicesGrid />
      <WhyChooseUs />
      <AboutBrief />
      <TestimonialsSection />
      <PortfolioSection />
      <StatsSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
