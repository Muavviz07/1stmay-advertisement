import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInquiry } from './InquiryContext';

const CTASection = () => {
  const { openInquiry } = useInquiry();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yPos = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="cta-section py-[200px] relative overflow-hidden bg-[#05050A]">
      
      {/* Optimized CSS Background Effects (Replaces Three.js) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] animate-float"></div>
      </div>

      {/* Radial Gradient for Cleanliness */}
      <div className="absolute inset-0 z-10" style={{ background: "radial-gradient(circle at center, rgba(5,5,10,0.6) 0%, rgba(5,5,10,1) 80%)" }}></div>

      <motion.div 
        style={{ y: yPos, opacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <h2 className="text-[12px] text-secondary font-bold tracking-[6px] uppercase mb-[32px]">Direct Command</h2>
        <h3 className="text-[40px] md:text-[64px] font-display font-extrabold text-white mb-[40px] leading-[1.05] tracking-tighter uppercase">
          READY TO SCALE <br/> YOUR MARKET IMPACT?
        </h3>
        <p className="text-[18px] md:text-[22px] text-gray-300 mb-[64px] max-w-2xl mx-auto leading-relaxed font-normal">
          Partner with a veteran agency that prioritizes strategic precision and measurable growth.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={openInquiry}
            className="btn-primary !px-12"
          >
            START PROJECT
          </button>
          <Link 
            to="/portfolio" 
            className="text-white font-bold tracking-[3px] uppercase text-[12px] hover:text-secondary px-8 py-4 transition-colors"
          >
            VIEW CASE STUDIES
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
