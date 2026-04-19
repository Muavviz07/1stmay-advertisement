import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const portfolioItems = [
  { id: '01', title: 'Summer Refresh', category: 'Advertising', metric: '10M+ Views', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80', description: "A high-energy television and digital campaign targeting the modern youth demographic." },
  { id: '02', title: 'Global Tech', category: 'Corporate', metric: 'Award Winning', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80', description: "Establishing a new visual vocabulary for a leading multinational SaaS ecosystem." },
  { id: '03', title: 'Urban Lifestyle', category: 'Print & OOH', metric: 'Global Reach', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80', description: "Dominating cityscapes with raw, unedited photography for a premium street brand." },
  { id: '04', title: 'Future Concepts', category: 'Animation', metric: 'Innovation', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', description: "Boundary-pushing 3D motion graphics explaining complex Web3 mechanics with ease." },
];

const PortfolioModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      >
        <div className="absolute inset-0 bg-[#05050A]/95 backdrop-blur-md" onClick={onClose} />
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-[16px] overflow-hidden shadow-2xl max-w-5xl w-full flex flex-col pointer-events-auto"
        >
          <button onClick={onClose} className="absolute top-6 right-6 z-10 w-[40px] h-[40px] bg-black/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black">
             <X className="w-5 h-5" />
          </button>
          
          <div className="w-full h-[50vh] relative">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-8">
               <div>
                  <h2 className="text-[48px] font-display font-medium text-white mb-2 tracking-tight">{item.title}</h2>
               </div>
            </div>
          </div>
          
          <div className="p-8 bg-white flex flex-col md:flex-row gap-8 justify-between">
             <div className="max-w-2xl">
                <p className="text-gray-600 leading-[1.8]">{item.description}</p>
             </div>
             <div>
                <p className="text-[12px] text-gray-400 font-bold tracking-widest uppercase mb-1">Key Result</p>
                <p className="text-[24px] font-bold text-primary-dark">{item.metric}</p>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PortfolioSection = () => {
  const [hoveredItem, setHoveredItem] = useState(portfolioItems[0]);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (activeItem) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeItem]);

  return (
    <>
      <section id="portfolio" className="relative min-h-[110vh] bg-[#F4F4F6] flex flex-col justify-center overflow-hidden">
        
        {/* Dynamic Background Image layer blending cleanly into Light Grey bounds */}
        <div className="absolute inset-x-4 inset-y-4 md:inset-x-8 md:inset-y-8 rounded-[24px] overflow-hidden z-0">
           <AnimatePresence mode="popLayout">
             <motion.img 
               key={hoveredItem.id}
               src={hoveredItem.img}
               initial={{ opacity: 0, scale: 1.05 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.8, ease: "easeInOut" }}
               className="absolute inset-0 w-full h-full object-cover"
               loading="lazy"
             />
           </AnimatePresence>
           {/* Gradient overlay so the text remains readable regardless of image */}
           <div className="absolute inset-0 bg-black/60 transition-colors duration-500 hover:bg-black/40"></div>
        </div>

        {/* Foreground Interactive Links */}
        <div className="max-w-7xl w-full mx-auto px-6 md:px-16 relative z-10 py-[120px]">
          
          <div className="flex items-center gap-[16px] mb-[80px]">
             <div className="w-[40px] h-[2px] bg-secondary"></div>
             <h2 className="text-[14px] text-white tracking-[4px] uppercase font-bold">Selected Work</h2>
          </div>

          <div className="flex flex-col gap-0 border-t border-white/20">
            {portfolioItems.map((item) => (
              <div 
                key={item.id}
                onMouseEnter={() => setHoveredItem(item)}
                onClick={() => setActiveItem(item)}
                className="group border-b border-white/20 py-[40px] md:py-[60px] cursor-pointer flex flex-col md:flex-row md:items-center justify-between transition-all duration-300"
              >
                 <div className="flex items-center gap-[40px] md:gap-[80px]">
                    <span className="text-[20px] md:text-[24px] font-serif text-white/50 italic group-hover:text-secondary transition-colors duration-500">
                      {item.id}
                    </span>
                    <h3 className="text-[40px] md:text-[72px] lg:text-[96px] font-display font-medium text-white tracking-tight leading-none group-hover:pl-[20px] transition-all duration-500">
                      {item.title}
                    </h3>
                 </div>
                 
                 <div className="mt-6 md:mt-0 opacity-0 md:group-hover:opacity-100 flex items-center gap-4 transition-all duration-500 transform md:-translate-x-8 md:group-hover:translate-x-0">
                    <span className="text-white text-[18px] uppercase tracking-widest">{item.category}</span>
                    <div className="w-[64px] h-[64px] rounded-full bg-white flex items-center justify-center text-black">
                       <ArrowRight className="w-6 h-6 transform -rotate-45" />
                    </div>
                 </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {activeItem && <PortfolioModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </>
  );
};

export default PortfolioSection;
