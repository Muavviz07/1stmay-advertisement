import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileServicesCarousel from './MobileServicesCarousel';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: '01', title: "Ads That Hook in 3 Seconds", tag: "Higher Watch-Through", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80", description: "Short-form and film campaigns engineered to stop scrolls fast and move high-intent audiences to action." },
  { id: '02', title: "Print That Drives Store Visits", tag: "Offline Demand", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80", description: "OOH and print campaigns built to improve recall, increase footfall, and strengthen local market share." },
  { id: '03', title: "Corporate Videos That Build Trust", tag: "Faster Decision Cycles", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", description: "Clear brand and product narratives that help buyers understand your value faster and convert with confidence." },
  { id: '04', title: "Performance Campaigns That Lower CAC", tag: "ROI-Focused Growth", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80", description: "Channel strategy and paid execution optimized for qualified leads, stronger ROAS, and scalable revenue." },
  { id: '05', title: "Motion Explainers That Convert", tag: "Clarity to Conversion", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80", description: "2D and 3D explainers that simplify complex offers, reduce drop-off, and increase conversion intent." }
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
          <div className="max-w-3xl">
            <h2 className="text-[12px] text-gray-500 tracking-[8px] uppercase font-bold mb-[16px]">Precision Services</h2>
            <h3 className="text-[48px] md:text-[64px] lg:text-[80px] font-display font-extrabold text-primary-dark tracking-tighter leading-[1] uppercase">
              MARKETING THAT <br className="hidden md:block" /> COMMANDS RESULTS.
            </h3>
          </div>
          <div className="hidden md:flex flex-col items-start md:items-end gap-5">
            <p className="text-[18px] text-gray-500 max-w-sm text-left md:text-right font-normal leading-relaxed">
              Every service we engineer is built for one outcome: measurable growth in authority and revenue.
            </p>
            <Link
              to="/services"
              className="btn-dark !px-8 !py-3 !text-[12px]"
            >
              View All Services
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex flex-col lg:flex-row gap-[50px] lg:gap-[72px] h-full items-stretch">
          
          {/* Left Side: Interactive Bounding Box for Image Mask */}
          <div className="w-full lg:w-[42%] h-[54vh] md:h-[64vh] rounded-[24px] overflow-hidden relative shadow-2xl order-2 lg:order-1 lg:self-center">
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
          <div className="w-full lg:w-[58%] flex flex-col gap-0 border-t border-gray-200 order-1 lg:order-2">
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
                       <h4 className={`text-[34px] md:text-[40px] lg:text-[42px] xl:text-[46px] leading-[1.08] font-display font-medium tracking-tight transition-colors duration-500 ${isActive ? 'text-primary-dark translate-x-3' : 'text-gray-400 group-hover:text-gray-800'}`}>
                         {service.title}
                       </h4>
                     </div>
                     
                     <div className={`w-[44px] h-[44px] md:w-[46px] md:h-[46px] rounded-full flex items-center justify-center transition-all duration-500 transform ${isActive ? 'bg-black text-white scale-100 rotate-0' : 'bg-black/85 text-white/80 scale-0 -rotate-45 group-hover:scale-100 group-hover:text-white'}`}>
                        <ArrowUpRight className="w-4 h-4 md:w-[17px] md:h-[17px]" />
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
           <div className="mt-6 flex justify-center">
             <Link
               to="/services"
               className="inline-flex items-center gap-2 rounded-full border border-primary-dark/20 bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[2px] text-primary-dark"
             >
               View All Services
               <ArrowUpRight className="h-4 w-4" />
             </Link>
           </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesCreative;
