import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const MobileServicesCarousel = ({ services }) => {
  return (
    <div className="md:hidden w-full overflow-hidden">
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-0 pb-8 no-scrollbar scroll-smooth">
        {services.map((service, index) => (
          <div 
            key={service.id}
            className="flex-shrink-0 w-[85%] snap-center"
          >
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6 shadow-2xl">
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[12px] font-bold tracking-[3px] uppercase text-secondary mb-2 block">{service.id}</span>
                <h4 className="text-[28px] font-display font-bold mb-4 leading-tight">{service.title}</h4>
                <div className="w-[40px] h-[40px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <p className="text-[15px] text-gray-500 leading-relaxed px-2">
              {service.description}
            </p>
          </div>
        ))}
        {/* Spacer for end */}
        <div className="flex-shrink-0 w-6" />
      </div>
      
      {/* Visual Indicator */}
      <div className="flex justify-center gap-2 mt-4">
         {services.map((_, i) => (
           <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
         ))}
      </div>
    </div>
  );
};

export default MobileServicesCarousel;
