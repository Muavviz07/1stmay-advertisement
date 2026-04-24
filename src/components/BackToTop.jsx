import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[150] bg-[#05050A] text-white p-3 md:p-4 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-secondary/50 transition-all duration-300 group"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-secondary" />
          
          {/* Subtle glow effect on hover */}
          <span className="absolute inset-0 rounded-full bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
