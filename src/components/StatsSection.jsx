import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "BRANDS SERVED", value: 800, suffix: "+" },
  { label: "CAMPAIGNS", value: 200, suffix: "+" },
  { label: "PROJECTS", value: 1050, suffix: "+" },
  { label: "YEARS EXP", value: 22, suffix: "" }
];

const StatsSection = () => {
  const countersRef = useRef([]);

  useEffect(() => {
    gsap.fromTo('.stat-left-text',
      { opacity: 0, x: -30 },
      { scrollTrigger: { trigger: '.stats-section', start: 'top 75%' }, x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo('.stat-grid-item',
      { opacity: 0, y: 30 },
      { scrollTrigger: { trigger: '.stats-section', start: 'top 75%' }, y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
    );

    countersRef.current.forEach((counter, i) => {
      if (!counter) return;
      const targetNumber = stats[i].value;

      gsap.to(counter, {
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%'
        },
        innerText: targetNumber,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: 'power2.out',
        onUpdate: function() {
          counter.innerHTML = Math.round(this.targets()[0].innerText);
        }
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="stats-section py-[80px] md:py-[160px] bg-white relative overflow-hidden border-t-4 border-b-4 border-black">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-[40px] md:gap-[80px]">
        
        {/* Left Typography Column */}
        <div className="stat-left-text w-full lg:w-[45%] border-l-[6px] border-secondary pl-4 md:pl-8">
           <h2 className="text-[14px] text-black tracking-[4px] uppercase font-bold mb-[16px]">Strategic Scale</h2>
           <h3 className="text-[42px] md:text-[64px] font-display font-black text-black mb-[24px] leading-[1] tracking-tighter uppercase">
             Impact that <br/> commands respect.
           </h3>
           <p className="text-[16px] md:text-[18px] text-black leading-[1.6] max-w-md font-medium">
             With decades of proven market command, we build data-informed campaign frameworks that expand qualified reach, strengthen brand credibility, and convert attention into consistent business outcomes for our partners.
           </p>
        </div>

        {/* Right Stacked Bento Stats */}
        <div className="w-full lg:w-[50%] grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-grid-item flex flex-col justify-center p-[32px] md:p-[56px_40px] bg-white border-4 border-black"
            >
              <div className="text-[48px] md:text-[64px] font-display font-black text-black mb-[8px] tracking-tighter flex items-baseline">
                <span ref={el => countersRef.current[index] = el}>0</span>
                <span className="text-secondary ml-1">{stat.suffix}</span>
              </div>
              <p className="text-[12px] md:text-[14px] text-black uppercase tracking-[2px] font-bold leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
