import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';

const InquiryModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-white/60 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-8 md:p-14">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <span className="text-accent-red font-bold text-sm uppercase tracking-widest mb-4 block">
                    / Let's Build Something
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-8 tracking-tight">
                    Start Your Project
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-slate-400 ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Your Name"
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-900" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-semibold text-slate-400 ml-1">Your City</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Chennai, India"
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-900" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-slate-400 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="email@example.com"
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-900" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-slate-400 ml-1">Tell us about your project</label>
                      <textarea 
                        required
                        rows="4" 
                        placeholder="Project details..."
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-900 resize-none font-sans"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-slate-950 text-white font-bold py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
                    >
                      Send Inquiry <Send className="w-5 h-5" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                    className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-8"
                  >
                    <CheckCircle className="w-10 h-10 text-secondary" />
                  </motion.div>
                  <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">Inquiry Received!</h3>
                  <p className="text-slate-600 mb-8 max-w-[320px] mx-auto leading-relaxed">
                    Thank you for choosing 1st May. Our strategists will review your inquiry and reach out within 24 hours.
                  </p>
                  <button 
                    onClick={onClose}
                    className="bg-slate-950 text-white px-8 py-4 rounded-xl font-bold transition-all hover:bg-slate-800"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InquiryModal;
