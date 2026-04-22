import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const MobileServicesCarousel = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const cardWidth = container.clientWidth * 0.85 + 24; // card width + gap
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(services.length - 1, index)));
  };

  return (
    <div className="md:hidden w-full overflow-hidden">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-0 pb-8 no-scrollbar scroll-smooth"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="flex-shrink-0 w-[85%] snap-center"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-white/10 active:border-white/30 transition-colors">
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[12px] font-bold tracking-[3px] uppercase text-secondary mb-2 block drop-shadow-md">{service.id}</span>
                <h4 className="text-[28px] font-display font-bold mb-4 leading-[1.1]">{service.title}</h4>
                <div className="w-[44px] h-[44px] rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center border border-white/20">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <p className="text-[15px] text-gray-500 leading-[1.8] px-2 font-medium">
              {service.description}
            </p>
          </motion.div>
        ))}
        {/* Spacer for end */}
        <div className="flex-shrink-0 w-6" />
      </div>
      
      {/* Visual Indicator */}
      <div className="flex justify-center gap-2 mt-4">
         {services.map((_, i) => (
           <div
             key={i}
             className={`rounded-full transition-all motion-reduce:transition-none duration-300 ${
               i === activeIndex ? 'w-6 h-1.5 bg-primary-dark' : 'w-1.5 h-1.5 bg-gray-300'
             }`}
           ></div>
         ))}
      </div>
    </div>
  );
};

export default MobileServicesCarousel;
