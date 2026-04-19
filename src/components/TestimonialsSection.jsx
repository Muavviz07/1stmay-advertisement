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
    <section className="test-typography-section py-[120px] md:py-[180px] bg-white relative overflow-hidden">
      
      {/* Massive Background Quotation Mark */}
      <div className="absolute top-[5%] md:top-[10%] left-[50%] -translate-x-1/2 text-[300px] md:text-[600px] font-serif leading-none text-gray-100/50 select-none pointer-events-none z-0">
        “
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        <div className="test-typography-container w-full flex flex-col items-center text-center">
          {/* Increased minimum height specifically to prevent text/name from overlapping the bottom arrows when content wraps */}
          <div className="w-full relative min-h-[500px] md:min-h-[450px] flex items-center justify-center mb-[40px] md:mb-0">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
                className="absolute inset-x-0 mx-auto max-w-5xl flex flex-col items-center"
              >
                <span className="text-[16px] md:text-[20px] text-secondary font-bold tracking-[4px] uppercase mb-[32px]">
                  {testimonials[currentIndex].heading}
                </span>
                
                <h2 className="text-[32px] md:text-[56px] lg:text-[72px] font-display font-medium text-primary-dark leading-[1.1] mb-[48px] tracking-tight px-4">
                  "{testimonials[currentIndex].quote}"
                </h2>
                
                <div className="flex flex-col items-center">
                  <div className="w-[40px] h-[2px] bg-secondary mb-[16px]"></div>
                  <h4 className="font-display font-bold text-[18px] md:text-[20px] text-primary-dark uppercase tracking-widest">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-[13px] md:text-[14px] text-gray-500 tracking-widest mt-[8px]">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>
          
          {/* Navigation Controls securely pushed below the relative AnimatePresence container */}
          <div className="flex items-center gap-[24px] md:gap-[32px] mt-[40px] md:mt-[80px]">
             <button 
                onClick={prevTestimonial}
                className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-full flex items-center justify-center border border-gray-200 text-primary-dark hover:bg-black hover:border-black hover:text-white hover:scale-105 transition-all duration-300 group"
             >
               <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
             </button>
             
             <div className="flex gap-[12px] md:gap-[16px] items-center px-4">
               {testimonials.map((_, idx) => (
                 <div key={idx} className="relative cursor-pointer py-4" onClick={() => setCurrentIndex(idx)}>
                    <div className="w-[30px] md:w-[40px] h-[3px] bg-gray-200 overflow-hidden relative rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: idx === currentIndex ? '100%' : 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-primary-dark rounded-full"
                      />
                    </div>
                 </div>
               ))}
             </div>
             
             <button 
                onClick={nextTestimonial}
                className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-full flex items-center justify-center border border-gray-200 text-primary-dark hover:bg-black hover:border-black hover:text-white hover:scale-105 transition-all duration-300 group"
             >
               <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
