import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { submitLeadForm } from '../lib/formApi';

const InquiryModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    message: ''
  });

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

  React.useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      setIsSending(false);
      setErrorMessage('');
      setFormData({ name: '', city: '', email: '', message: '' });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);
    setErrorMessage('');

    try {
      await submitLeadForm({
        source: 'Inquiry Modal',
        ...formData
      });
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message || 'Unable to submit inquiry right now.');
    } finally {
      setIsSending(false);
    }
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
                  <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 mb-8 tracking-tighter uppercase">
                    Start Your Project
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">Full Name</label>
                        <input 
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Your Name"
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-900 font-sans" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">Your City</label>
                        <input 
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Mumbai, India"
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-900 font-sans" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">Email Address</label>
                      <input 
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        placeholder="email@example.com"
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-900 font-sans" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">Project details</label>
                      <textarea 
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4" 
                        placeholder="How can we help you?"
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-900 resize-none font-sans"
                      ></textarea>
                    </div>
                    {errorMessage && (
                      <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
                    )}
                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full btn-dark !rounded-2xl"
                    >
                      {isSending ? 'Sending...' : 'Send Inquiry'}
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
