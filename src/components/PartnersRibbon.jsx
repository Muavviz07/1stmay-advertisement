import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  "STRATEGIC PARTNER", "SOLUTIONS INC", "GLOBAL REACH", "INNOVATE CO", "MARKET LEAD",
  "NEXUS BRAND", "VELOCITY MEDIA", "PRIME AGENCY", "VISIONARY CORP", "ELITE SYSTEMS"
];

const PartnersRibbon = () => {
  return (
    <div className="w-full bg-white border-b-4 border-black py-8 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
      
      <div className="flex flex-col items-center mb-6">
        <span className="text-[12px] text-black tracking-[4px] uppercase font-bold border-b-2 border-secondary pb-1">Trusted by Industry Leaders</span>
      </div>

      <div className="flex whitespace-nowrap">
        <motion.div
           className="flex gap-12 md:gap-24 items-center"
           animate={{
             x: ["0%", "-50%"]
           }}
           transition={{
             duration: 30,
             ease: "linear",
             repeat: Infinity
           }}
        >
          {/* First set of logos */}
          {partners.concat(partners).map((partner, index) => (
            <div 
              key={index} 
              className="text-[20px] md:text-[24px] font-display font-black text-gray-400 hover:text-black transition-colors cursor-default select-none tracking-tighter uppercase"
            >
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnersRibbon;
