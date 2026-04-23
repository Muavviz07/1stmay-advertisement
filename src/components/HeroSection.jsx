import React, { useEffect, useRef } from 'react';
import { animate, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useInquiry } from './InquiryContext';
import HeroScene from './HeroScene';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { openInquiry } = useInquiry();
  const navigate = useNavigate();
  const headlineRef = useRef(null);
  
  useEffect(() => {
    // 1. Entrance Animations
    const tl = gsap.timeline();
    tl.to('.hero-bg', { opacity: 1, duration: 1.5, ease: 'power2.inOut' })
      .to('.headline-line', { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'power3.out' 
      }, 0.5)
      .to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      }, 1.2);

    // 2. Scroll-Trigger Fade Out
    gsap.to('.hero-content-wrapper', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      opacity: 0,
      y: 60,
      ease: 'none'
    });

    // 3. Mobile Touch Interaction
    const handleTouchMove = (e) => {
      if (window.innerWidth >= 768) return;
      const touch = e.touches[0];
      const glow = document.getElementById('mobile-touch-glow');
      if (glow) {
        gsap.to(glow, {
          x: touch.clientX - 150,
          y: touch.clientY - 150,
          opacity: 0.6,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="hero-section relative min-h-screen flex items-center pt-[80px] overflow-hidden bg-bg-dark">
      
      {/* 3D/SVG Background Animation */}
      <HeroScene />

      {/* Mobile-Only Interactive Glow */}
      <div 
        id="mobile-touch-glow"
        className="md:hidden absolute w-[300px] h-[300px] bg-primary/40 rounded-full blur-[80px] pointer-events-none opacity-0 z-0"
      />
      
      {/* Deep Radial Glow behind text */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 25% 50%, rgba(93,32,87,0.85) 0%, rgba(93,32,87,0.4) 45%, rgba(93,32,87,0) 80%)" }}
      ></div>

      <div className="hero-content-wrapper max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center py-[120px]">
        
        {/* Left Side Content */}
        <div className="w-full md:w-[65%]">
          <div className="headline-line translate-y-[30px] opacity-0 inline-block px-4 py-2 bg-secondary mb-6 text-white text-[12px] md:text-[13px] font-bold tracking-[2px] uppercase">
            15+ Years of Excellence
          </div>

          <h1 ref={headlineRef} className="text-[52px] md:text-[58px] lg:text-[68px] xl:text-[76px] font-display font-black text-white leading-[0.95] mb-[24px] tracking-tighter uppercase">
            <span className="block overflow-hidden pb-[4px]">
            <span className="headline-line block translate-y-[50px] opacity-0">CRAFTING</span>
            </span>
            <span className="block overflow-hidden pb-[4px]">
              <span className="headline-line block translate-y-[50px] opacity-0 text-white">STRATEGIC</span>
            </span>
            <span className="block overflow-hidden pb-[4px]">
              <span className="headline-line block translate-y-[50px] opacity-0 text-[#D199CF]">LEGACIES</span>
            </span>
          </h1>
          
          <div className="block overflow-hidden">
            <p className="headline-line translate-y-[30px] opacity-0 text-[18px] md:text-[20px] text-gray-200 font-medium mb-[40px] max-w-xl border-l-[6px] border-white pl-[16px] md:pl-[24px] leading-[1.4]">
              Engineering high-impact advertising systems that combine strategy, storytelling, and execution. We ensure your brand earns stronger recall and measurable growth.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-[16px]">
            <motion.button 
              onClick={openInquiry}
              className="hero-cta opacity-0 translate-y-[20px] bg-white text-black px-8 py-4 font-bold uppercase tracking-[2px] text-[14px] hover:bg-secondary hover:text-white transition-colors duration-300 text-center"
            >
              Get Started
            </motion.button>
            <motion.button 
              onClick={() => navigate('/portfolio')}
              className="hero-cta opacity-0 translate-y-[20px] border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-[2px] text-[14px] hover:bg-white hover:text-black transition-colors duration-300 text-center"
            >
              View Work
            </motion.button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
