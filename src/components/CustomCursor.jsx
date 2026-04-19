import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true
      });
    };

    const handleHover = (e) => {
      const target = e.target;
      const isActionable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer') || 
        target.closest('.cursor-pointer') !== null;

      if (isActionable) {
        gsap.to(cursor, {
          scale: 3,
          duration: 0.3,
          backgroundColor: 'rgba(255, 107, 107, 0.2)', // Accent color feel
          border: '1px solid rgba(255, 255, 255, 0.5)',
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          border: 'none',
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  // Hide cursor on touch devices or small screens
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    if (isMobile && cursorRef.current) {
      cursorRef.current.style.display = 'none';
      document.body.classList.add('mobile-no-cursor');
    }
  }, []);

  return (
    <>
      <style>
        {`
          @media (pointer: fine) {
            body * { cursor: none !important; }
          }
          
          .custom-cursor {
            pointer-events: none;
            mix-blend-mode: difference;
            will-change: transform;
          }

          @media (max-width: 767px) {
            .custom-cursor { display: none !important; }
          }
        `}
      </style>
      <div 
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-[14px] h-[14px] -ml-[7px] -mt-[7px] rounded-full bg-white z-[9999] hidden md:block"
      />
    </>
  );
};

export default CustomCursor;


