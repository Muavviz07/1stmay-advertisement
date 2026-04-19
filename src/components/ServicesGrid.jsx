import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import MobileServicesCarousel from './MobileServicesCarousel';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: '01', title: "Advertising Films", tag: "Visual Storytelling", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80", description: "Cinematic, high-energy television and digital campaigns designed to capture immediate attention and drive intent." },
  { id: '02', title: "Print Campaigns", tag: "Editorial Excellence", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80", description: "Striking printed collateral tailored for high-end magazines, expansive billboards, and physical landscapes." },
  { id: '03', title: "Corporate Video", tag: "Brand Architecture", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", description: "Bespoke company narratives crafted to secure B2B engagement and foster deep internal cultural strength." },
  { id: '04', title: "Digital Reach", tag: "Algorithmic Growth", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80", description: "Precision-engineered ad placements across social and search ecosystems built purely for conversion." },
  { id: '05', title: "Motion Graphics", tag: "Dynamic Narrative", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80", description: "Fluid, high-fidelity 2D/3D motion pieces that distill complex products into effortlessly consumable media." }
];

const ServicesCreative = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.fromTo('.services-title', 
      { opacity: 0, y: 50 },
      { scrollTrigger: { trigger: '.services-creative', start: 'top 75%' }, y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <section id="services" className="services-creative min-h-[120vh] bg-[#FAFAFC] relative flex flex-col justify-center py-[160px]">
      
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10">
        
        <div className="services-title mb-[80px] md:mb-[120px] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[14px] text-gray-500 tracking-[4px] uppercase font-bold mb-[16px]">Capabilities</h2>
            <h3 className="text-[48px] md:text-[64px] lg:text-[80px] font-display font-medium text-primary-dark tracking-tight leading-[1]">
              Our Expertise
            </h3>
          </div>
          <p className="text-[18px] text-gray-500 max-w-sm hidden md:block">
            Engineering bespoke creative solutions designed to dominate every medium.
          </p>
        </div>

        <div className="hidden lg:flex flex-col lg:flex-row gap-[60px] lg:gap-[100px] h-full items-center">
          
          {/* Left Side: Interactive Bounding Box for Image Mask */}
          <div className="w-full lg:w-[45%] h-[50vh] md:h-[60vh] rounded-[24px] overflow-hidden relative shadow-2xl order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={services[activeIndex].img}
                alt={services[activeIndex].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Right Side: Massive Interactive List */}
          <div className="w-full lg:w-[55%] flex flex-col gap-0 border-t border-gray-200 order-1 lg:order-2">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  key={service.id}
                  className="group relative cursor-pointer border-b border-gray-200 overflow-hidden"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <motion.div 
                    initial={false}
                    animate={{ backgroundColor: isActive ? '#f0f0f5' : 'transparent' }}
                    className="p-[32px] md:p-[48px] flex flex-col md:flex-row md:items-center justify-between transition-colors duration-500 ease-out"
                  >
                     <div className="flex items-center gap-[32px] md:gap-[48px] mb-4 md:mb-0">
                       <span className={`text-[16px] md:text-[20px] font-bold tracking-widest transition-colors duration-500 ${isActive ? 'text-secondary' : 'text-gray-400 group-hover:text-gray-600'}`}>
                         {service.id}
                       </span>
                       <h4 className={`text-[32px] md:text-[48px] font-display font-medium tracking-tight transition-colors duration-500 ${isActive ? 'text-primary-dark translate-x-4' : 'text-gray-400 group-hover:text-gray-800'}`}>
                         {service.title}
                       </h4>
                     </div>
                     
                     <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all duration-500 transform ${isActive ? 'bg-primary-dark text-white scale-100 rotate-0' : 'bg-gray-100 text-gray-400 scale-0 -rotate-45 group-hover:scale-100 group-hover:text-gray-800'}`}>
                        <ArrowUpRight className="w-5 h-5" />
                     </div>
                  </motion.div>
                  
                  {/* Detailed Description Dropdown linked strictly to active state */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden bg-[#f0f0f5]"
                      >
                         <p className="px-[32px] md:px-[48px] pb-[40px] pl-[110px] md:pl-[145px] text-[16px] text-gray-500 leading-[1.7] max-w-xl">
                           {service.description}
                         </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* Mobile Interest Section: Horizontal Scroller */}
        <div className="lg:hidden">
           <MobileServicesCarousel services={services} />
        </div>

      </div>
    </section>
  );
};

export default ServicesCreative;
