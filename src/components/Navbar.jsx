import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useInquiry } from './InquiryContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { openInquiry } = useInquiry();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/', isPage: true },
    { name: 'About', href: '/about', isPage: true },
    { name: 'Portfolio', href: '/portfolio', isPage: true },
    { name: 'Services', href: '/services', isPage: true },
    { name: 'Contact', href: '/contact', isPage: true }
  ];

  const menuVariants = {
    closed: { opacity: 0, x: '100%', transition: { duration: 0.5, ease: "easeInOut" } },
    open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <nav className={`fixed top-0 left-0 w-full transition-all duration-300 flex items-center ${isOpen ? 'z-[200]' : 'z-[100]'} ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm h-[85px]' : 'bg-primary-dark/80 backdrop-blur-sm h-[110px]'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center group relative h-full py-2">
          {/* Subtle glow for logo clarity on dark background */}
          {!scrolled && !isOpen && (
            <div className="absolute inset-0 bg-white/5 blur-[30px] rounded-full pointer-events-none" />
          )}
          <img
            src={logo}
            alt="1st May Logo"
            loading="lazy"
            className={`transition-all duration-300 relative z-10 w-auto object-contain ${scrolled || isOpen ? 'h-[65px]' : 'h-[85px] brightness-0 invert opacity-95'}`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {link.isPage ? (
                  <Link to={link.href} className={`text-[15px] font-semibold transition-colors ${scrolled ? 'text-text-main' : 'text-white'}`}>
                    {link.name}
                  </Link>
                ) : (
                  <a href={link.href} className={`text-[15px] font-semibold transition-colors ${scrolled ? 'text-text-main' : 'text-white'}`}>
                    {link.name}
                  </a>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
          <button
            onClick={openInquiry}
            className={`hover:bg-secondary-dark text-white px-6 py-2.5 rounded-[8px] text-[14px] font-bold transition-all duration-300 shadow-sm hover:shadow-card hover:-translate-y-0.5 ${scrolled ? 'bg-secondary' : 'bg-secondary'}`}
          >
            GET STARTED
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className={`md:hidden p-3 -mr-3 relative transition-all duration-300 ${isOpen ? 'z-[210] text-white' : 'z-[110]'}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={32} /> : <Menu size={28} className={scrolled ? 'text-primary' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Nav Menu (Cinematic Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 w-full h-screen bg-[#05050A] z-[200] flex flex-col pt-32 pb-12 px-8 overflow-y-auto"
          >
            {/* Background Architectural Accent */}
            <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#5D2057] rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#4CAF50] rounded-full blur-[100px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5 rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5 -rotate-45"></div>
            </div>

            <div className="flex flex-col h-full max-w-lg mx-auto w-full">
              {/* Staggered Navigation Links */}
              <ul className="flex flex-col gap-6 text-center">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    custom={i}
                    variants={linkVariants}
                  >
                    <Link
                      to={link.href}
                      className="text-4xl md:text-5xl font-display font-medium text-white hover:text-secondary transition-all"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.li custom={navLinks.length} variants={linkVariants} className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      openInquiry();
                      setIsOpen(false);
                    }}
                    className="w-full max-w-[280px] bg-secondary text-white py-3.5 rounded-xl font-bold text-base shadow-xl active:scale-95 transition-transform"
                  >
                    GET STARTED NOW
                  </button>
                </motion.li>
              </ul>

              {/* Bottom Info Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-auto pt-12 border-t border-white/10 grid grid-cols-2 gap-8 text-[12px] uppercase tracking-widest text-gray-500"
              >
                <div>
                  <span className="block mb-2 text-white">Contact</span>
                  <a href="mailto:admin@1stmay.in" className="lowercase block mb-1">admin@1stmay.in</a>
                  <a href="tel:+914448594307" className="block">+91 44 4859 4307</a>
                </div>
                <div className="text-right">
                  <span className="block mb-2 text-white">Follow</span>
                  <div className="flex justify-end gap-4">
                    <a href="#" className="hover:text-secondary">LN</a>
                    <a href="#" className="hover:text-secondary">IG</a>
                    <a href="#" className="hover:text-secondary">FB</a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
