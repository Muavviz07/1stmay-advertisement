import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutBrief = () => {
  const containerRef = useRef(null);
  const clipImageRef = useRef(null);
  const innerImageRef = useRef(null);
  const textContentRef = useRef(null);

  useEffect(() => {
    // Setup a unified timeline for the entire section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%", 
        scrub: true, // 1:1 mapping to avoid "lag" or "snapping"
        pin: true,
        anticipatePin: 1,
      }
    });

    // 1. Initial State: Elegant Intro Typography
    tl.to('.about-intro-text', {
      opacity: 0,
      y: -100,
      duration: 1,
    }, 0);

    // 2. Cinematic Wide Reveal (More stable than circle)
    tl.fromTo(clipImageRef.current,
      { clipPath: 'inset(45% 45% 45% 45%)' },
      { 
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 2,
        ease: "power2.inOut"
      }, 0);

    tl.fromTo(innerImageRef.current,
      { scale: 1.15 },
      { scale: 1, duration: 2, ease: "power2.inOut" }, 0);

    // 3. Fade in text (Centered & Sharp)
    tl.fromTo(textContentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }, 1.2);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="about" className="h-screen bg-bg-light relative overflow-hidden flex items-center justify-center">
      
      {/* 1. Initial State: Elegant Intro Typography */}
      <div className="about-intro-text absolute z-10 flex flex-col items-center text-center px-6 pointer-events-none">
        <h2 className="text-[14px] text-gray-500 tracking-[5px] uppercase font-bold mb-[24px]">Our Story</h2>
        <h3 className="text-[6vw] leading-[0.95] font-display font-bold text-[#5D2057] tracking-tighter">
          WE ARCHITECT <br/> REALITY.
        </h3>
      </div>

      {/* 2. Revealed State: The Masking Image & Content */}
      <div 
        ref={clipImageRef} 
        className="absolute inset-0 z-20 overflow-hidden"
        style={{ clipPath: 'inset(45% 45% 45% 45%)' }}
      >
        <div ref={innerImageRef} className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80" 
            alt="1st May Agency Studio" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        
        {/* Superior Gradient Layer for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        {/* Centered Premium Content */}
        <div 
          ref={textContentRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto text-white"
        >
           <h4 className="text-[32px] md:text-[56px] lg:text-[72px] font-display font-medium tracking-tight mb-[40px] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
             We Don't Just Create Ads. <br className="hidden md:block"/> We Build Outcomes.
           </h4>
           
           <div className="w-[60px] h-[2px] bg-secondary mb-[40px]"></div>

           <p className="text-[18px] md:text-[22px] text-gray-300 max-w-2xl font-light leading-[1.6] mb-[64px]">
             Every decision we make, from concept to execution, is focused on delivering measurable business impact.
           </p>

           <Link to="/about" className="group flex items-center gap-4 text-[14px] font-bold tracking-[3px] uppercase">
              <span>Our Vision</span>
              <div className="w-[40px] h-[2px] bg-white group-hover:w-[60px] transition-all duration-300"></div>
           </Link>
        </div>
      </div>

    </section>
  );
};

export default AboutBrief;
