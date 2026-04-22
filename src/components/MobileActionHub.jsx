import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Home, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileActionHub = () => {
  const { pathname } = useLocation();

  const actions = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <Info size={20} />, label: 'About', path: '/about' },
    { icon: <Briefcase size={20} />, label: 'Portfolio', path: '/portfolio' },
    { icon: <Mail size={20} />, label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "circOut" }}
        className="bg-primary-dark/90 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-between items-center"
      >
        {actions.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.label} 
              to={item.path}
              className="flex flex-col items-center gap-1 flex-1 relative group active:scale-[0.92] transition-transform duration-200"
            >
              <div className={`p-2.5 rounded-full transition-all motion-reduce:transition-none duration-300 ${isActive ? 'bg-secondary text-white shadow-[0_0_15px_rgba(76,175,80,0.4)]' : 'text-gray-400 active:text-white'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-secondary' : 'text-gray-500'}`}>
                {item.label}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute -top-1 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_10px_rgba(76,175,80,0.8)]"
                />
              )}
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MobileActionHub;
