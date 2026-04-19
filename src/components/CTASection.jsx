import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
        className="max-w-[900px] w-full mx-auto px-6 relative z-20 text-center flex flex-col items-center"
      >
        <span className="text-[14px] font-bold tracking-[6px] text-gray-400 uppercase mb-[32px]">
          Connect With Us
        </span>
        
        <h2 className="text-[56px] md:text-[80px] lg:text-[96px] font-display font-medium text-white mb-[40px] leading-[1.05] tracking-tight">
          Ready to leave <br/> your mark?
        </h2>
        
        <p className="text-[20px] text-gray-400 mb-[64px] max-w-2xl leading-[1.6]">
          At 1st May, we don't just execute campaigns; we architect realities that command attention and drive measurable growth.
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
          whileTap={{ scale: 0.95 }}
          className="bg-transparent border border-white/30 text-white px-[56px] py-[24px] rounded-full font-bold text-[16px] tracking-[2px] uppercase transition-colors duration-500 hover:border-white shadow-[0_0_40px_rgba(255,255,255,0)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-4"
        >
          Start A Project
          <div className="w-[8px] h-[8px] rounded-full bg-secondary"></div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CTASection;
