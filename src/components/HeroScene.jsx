import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const HeroScene = () => {
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5);
      const yPos = (clientY / window.innerHeight - 0.5);

      if (shape1Ref.current) {
        gsap.to(shape1Ref.current, {
          x: xPos * 60,
          y: yPos * 60,
          duration: 0.8,
          ease: "power2.out"
        });
      }
      if (shape2Ref.current) {
        gsap.to(shape2Ref.current, {
          x: -xPos * 90,
          y: -yPos * 90,
          duration: 1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden hero-bg opacity-0 bg-[#0A0A14]">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B0B14] via-[#16162A] to-[#0A0A17]"></div>
      
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 mix-blend-overlay opacity-[0.2] pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      ></div>

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        
        {/* Shape 1: Premium Glass Icosahedron Mockup */}
        <div ref={shape1Ref} className="absolute right-[10%] top-[25%] w-[280px] h-[280px] md:w-[480px] md:h-[480px] will-change-transform opacity-60">
          {/* Ambient Glow - Reduced Opacity */}
          <div className="absolute inset-0 bg-[#5D2057] opacity-[0.12] blur-[120px] rounded-full scale-125 animate-pulse"></div>
          
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(93,32,87,0.2)]">
            <defs>
              <linearGradient id="glassGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D199CF" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#5D2057" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3A1236" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            <motion.path
              d="M100,20 L180,70 L180,130 L100,180 L20,130 L20,70 Z"
              fill="url(#glassGrad1)"
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.15"
              animate={{
                rotate: 360
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="backdrop-blur-[2px]"
            />
          </svg>
        </div>

        {/* Shape 2: Premium Glass Ring */}
        <div ref={shape2Ref} className="absolute left-[10%] bottom-[20%] w-[220px] h-[220px] md:w-[400px] md:h-[400px] will-change-transform opacity-40">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[#4CAF50] opacity-[0.05] blur-[100px] rounded-full scale-110"></div>
          
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="glassGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            <motion.circle
              cx="100" cy="100" r="70"
              fill="none"
              stroke="url(#glassGrad2)"
              strokeWidth="15"
              strokeDasharray="15 15"
              animate={{
                rotate: -360
              }}
              transition={{ 
                rotate: { duration: 40, repeat: Infinity, ease: "linear" }
              }}
            />
          </svg>
        </div>
      </div>

      {/* Optimized Star Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
          />
        ))}
      </div>
    </div>
  );
};

export default HeroScene;

