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
          <h1 ref={headlineRef} className="text-[36px] md:text-[58px] lg:text-[68px] xl:text-[72px] font-display font-bold text-white leading-[1.08] mb-[24px] tracking-tight drop-shadow-lg">
            <span className="block overflow-hidden pb-[4px]">
              <span className="headline-line block translate-y-[50px] opacity-0">ADVERTISING THAT</span>
            </span>
            <span className="block overflow-hidden pb-[4px]">
              <span className="headline-line block translate-y-[50px] opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D199CF]">PAYS FOR ITSELF</span>
            </span>
          </h1>
          
          <div className="block overflow-hidden">
            <p className="headline-line translate-y-[30px] opacity-0 text-[16px] md:text-[20px] text-gray-300 font-medium font-sans mb-[48px] max-w-lg border-l-[3px] border-secondary pl-[20px] leading-[1.6]">
              We design high-impact campaigns that convert attention into real business results.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-[24px]">
            <motion.button 
              onClick={openInquiry}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(76,175,80,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="hero-cta opacity-0 translate-y-[20px] bg-secondary text-white px-[32px] md:px-[48px] py-[14px] md:py-[18px] rounded-[8px] font-bold text-[13px] md:text-[15px] tracking-widest uppercase border border-transparent shadow-[0_8px_24px_rgba(76,175,80,0.2)]"
            >
              Get Free Consultation
            </motion.button>
            <motion.button 
              onClick={() => navigate('/portfolio')}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.5)", boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="hero-cta opacity-0 translate-y-[20px] bg-transparent border border-white/30 text-white px-[32px] md:px-[48px] py-[14px] md:py-[18px] rounded-[8px] font-bold text-[13px] md:text-[15px] tracking-widest uppercase"
            >
              See Case Results
            </motion.button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
