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
    <div className="md:hidden fixed bottom-0 left-0 w-full z-[90]">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "circOut" }}
        className="bg-black border-t-4 border-secondary flex justify-between items-center px-4 py-4"
      >
        {actions.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.label} 
              to={item.path}
              className="flex flex-col items-center gap-2 flex-1 relative group"
            >
              <div className={`transition-all duration-300 ${isActive ? 'text-secondary' : 'text-white'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-[2px] ${isActive ? 'text-secondary' : 'text-white'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MobileActionHub;
