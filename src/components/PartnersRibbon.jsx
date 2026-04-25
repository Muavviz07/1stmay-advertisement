import React from 'react';
import { motion } from 'framer-motion';

import c01 from '../assets/clients/01.jpg';
import c02 from '../assets/clients/02.jpg';
import c03 from '../assets/clients/03.jpg';
import c04 from '../assets/clients/04.jpg';
import c05 from '../assets/clients/05.jpg';
import c06 from '../assets/clients/06.jpg';
import c07 from '../assets/clients/07.jpg';
import c08 from '../assets/clients/08.jpg';

const clientLogos = [c01, c02, c03, c04, c05, c06, c07, c08];

const PartnersRibbon = () => {
  return (
    <div className="w-full bg-white border-y border-gray-100 py-16 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      
      <div className="flex flex-col items-center mb-10">
        <span className="text-[12px] text-gray-400 tracking-[4px] uppercase font-bold">Trusted by Industry Leaders</span>
      </div>

      <div className="flex whitespace-nowrap">
        <motion.div
           className="flex gap-20 md:gap-32 items-center"
           animate={{
             x: ["0%", "-50%"]
           }}
           transition={{
             duration: 40,
             ease: "linear",
             repeat: Infinity
           }}
        >
          {/* Double the logos for seamless infinite scroll */}
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
            <div 
              key={index} 
              className="group flex-shrink-0"
            >
              <img 
                src={logo} 
                alt={`Client ${index + 1}`} 
                className="h-10 md:h-14 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnersRibbon;
