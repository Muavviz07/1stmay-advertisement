import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ChevronLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    heading: "A Game Changer.",
    quote: "Working with 1st May shifted our entire market trajectory. Their campaigns consistently deliver far beyond our most ambitious expectations.",
    name: "Ravi Kumar",
    title: "CEO, TechStart Solutions",
  },
  {
    heading: "True Visionaries.",
    quote: "The team understands narrative storytelling on a profound level. They transformed a simple launch into an unforgettable cultural event.",
    name: "Anjali Mehta",
    title: "Head of Growth, Stellar Brands",
  },
  {
    heading: "Flawless Execution.",
    quote: "From initial concept to final market execution, 1st May delivered absolute excellence. Their commitment to measurable results is unmatched.",
    name: "Ramesh Verma",
    title: "Founder, Verma Foods",
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    gsap.fromTo('.test-typography-container', 
      { opacity: 0, y: 50 },
      { scrollTrigger: { trigger: '.test-typography-section', start: 'top 75%' }, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="test-typography-section py-[80px] md:py-[180px] bg-[#f4f4f4] relative overflow-hidden border-b-4 border-black">
      
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col items-start md:items-center">
        
        <div className="test-typography-container w-full flex flex-col items-start md:items-center text-left md:text-center">
          {/* Increased minimum height specifically to prevent text/name from overlapping the bottom arrows when content wraps */}
          <div className="w-full relative min-h-[450px] flex items-center justify-start md:justify-center mb-[24px] md:mb-0">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-x-0 mx-auto max-w-5xl flex flex-col items-start md:items-center"
              >
                <div className="md:hidden text-[120px] font-serif leading-none text-black mb-4">“</div>
                <span className="text-[14px] md:text-[20px] text-black font-bold tracking-[4px] uppercase mb-[24px] border-l-4 border-secondary pl-4 md:border-l-0 md:pl-0">
                  {testimonials[currentIndex].heading}
                </span>
                
                <h2 className="text-[32px] md:text-[56px] lg:text-[72px] font-display font-black text-black leading-[1] mb-[40px] tracking-tighter uppercase pr-4 md:pr-0">
                  "{testimonials[currentIndex].quote}"
                </h2>
                
                <div className="flex flex-col items-start md:items-center w-full">
                  <div className="hidden md:block w-[40px] h-[4px] bg-black mb-[16px]"></div>
                  <h4 className="font-display font-bold text-[20px] md:text-[20px] text-black uppercase tracking-[2px]">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-[14px] text-gray-600 tracking-[1px] mt-[4px] uppercase font-bold">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>
          
          {/* Navigation Controls securely pushed below the relative AnimatePresence container */}
          <div className="flex items-center gap-[16px] md:gap-[32px] mt-[40px] md:mt-[80px] w-full md:w-auto justify-between md:justify-center">
             <button 
                onClick={prevTestimonial}
                className="w-[64px] h-[64px] flex items-center justify-center border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
             >
               <ChevronLeft className="w-8 h-8" />
             </button>
             
             <div className="hidden md:flex gap-[16px] items-center px-4">
               {testimonials.map((_, idx) => (
                 <div key={idx} className="relative cursor-pointer py-4" onClick={() => setCurrentIndex(idx)}>
                    <div className="w-[40px] h-[4px] bg-gray-300 overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: idx === currentIndex ? '100%' : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-black"
                      />
                    </div>
                 </div>
               ))}
             </div>
             
             <button 
                onClick={nextTestimonial}
                className="w-[64px] h-[64px] flex items-center justify-center border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
             >
               <ChevronRight className="w-8 h-8" />
             </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
