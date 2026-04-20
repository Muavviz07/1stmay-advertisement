import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-secondary" />,
      title: 'Direct Line',
      details: ['+91 44 4859 4307', '+91 79045 23814'],
      href: 'tel:+914448594307'
    },
    {
      icon: <Mail className="w-6 h-6 text-secondary" />,
      title: 'Digital Correspondence',
      details: ['admin@1stmay.in'],
      href: 'mailto:admin@1stmay.in'
    },
    {
      icon: <MapPin className="w-6 h-6 text-secondary" />,
      title: 'Project HQ',
      details: ['Chitlapakkam, Chennai - 600064'],
      href: '#'
    }
  ];

  return (
    <main className="bg-white min-h-screen pt-[160px] pb-[120px] overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-[120px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-bold text-lg mb-4 block uppercase tracking-widest">
            / Inquiries
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.9] tracking-tighter text-slate-900 mb-8 uppercase">
            Connect with <br /> our Strategists
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to elevate your brand's architecture? Reach out to us and let's start building your next landmark campaign together.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.href}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 group transition-all duration-300 hover:bg-slate-950 hover:border-slate-900 shadow-sm"
            >
              <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:bg-white/10 transition-colors">
                {info.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors">
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-slate-600 group-hover:text-slate-400 transition-colors">
                  {detail}
                </p>
              ))}
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-[48px] border border-slate-100 p-10 md:p-14 shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-500 ml-1 uppercase tracking-wider">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-500 ml-1 uppercase tracking-wider">Company / City</label>
                    <input
                      required
                      type="text"
                      placeholder="Your Business Location"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-slate-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500 ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500 ml-1">Message</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="How can we help you?"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-slate-900 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-950 text-white font-bold py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  Send Message <Send className="w-5 h-5" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                  className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-8"
                >
                  <CheckCircle className="w-12 h-12 text-secondary" />
                </motion.div>
                <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">Message Sent!</h3>
                <p className="text-slate-600 mb-8 max-w-[280px]">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-full min-h-[500px] w-full bg-slate-100 rounded-[48px] overflow-hidden relative shadow-inner"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.643355523455!2d80.2014136758686!3d13.045620987277252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e746e01761%3A0x89980c62c3f86e!2s1st%20May%20Advertisement!5e0!3m2!1sen!2sin!4v1713508000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          ></iframe>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent h-20 pointer-events-none" />
        </motion.div>
      </section>
    </main>
  );
};

export default ContactPage;
