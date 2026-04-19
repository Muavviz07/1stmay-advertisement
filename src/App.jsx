import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import MobileActionHub from './components/MobileActionHub';
import InquiryModal from './components/InquiryModal';
import { InquiryProvider, useInquiry } from './components/InquiryContext';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Lenis initialization inside a wrapper to ensure it captures all page content
const AppContent = () => {
  const { isInquiryOpen, closeInquiry } = useInquiry();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-bg-light font-sans text-text-main selection:bg-secondary selection:text-white pb-0 overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <MobileActionHub />
      <Footer />
      <InquiryModal isOpen={isInquiryOpen} onClose={closeInquiry} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <InquiryProvider>
        <AppContent />
      </InquiryProvider>
    </Router>
  );
}

export default App;
