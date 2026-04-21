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
        <h2 className="text-[12px] text-gray-500 tracking-[6px] uppercase font-bold mb-[24px]">Market Command</h2>
        <h3 className="text-[7vw] leading-[1.0] font-display font-extrabold text-[#0F172A] tracking-tighter uppercase">
          ELEVATING THE <br/> STANDARD.
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
            <h4 className="text-[34px] md:text-[58px] lg:text-[76px] font-display font-bold tracking-tighter mb-[32px] leading-[1.05] uppercase">
              Precision Engineering <br className="hidden md:block"/> for Market Command.
            </h4>
            
            <div className="w-[100px] h-[3px] bg-secondary mb-[40px]"></div>

            <p className="text-[18px] md:text-[24px] text-gray-200 max-w-3xl font-normal leading-[1.6] mb-[64px] tracking-tight">
              With decades of strategic expertise, we bridge the gap between creative vision and undeniable market dominance.
            </p>

            <Link to="/about" className="btn-primary">
               Start Project
            </Link>
         </div>
      </div>

    </section>
  );
};

export default AboutBrief;
