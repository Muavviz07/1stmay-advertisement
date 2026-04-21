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
    <section className="stats-section py-[160px] bg-white relative overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-[80px]">
        
        {/* Left Typography Column */}
        <div className="stat-left-text w-full lg:w-[45%]">
           <h2 className="text-[12px] text-gray-500 tracking-[6px] uppercase font-bold mb-[24px]">Strategic Scale</h2>
           <h3 className="text-[48px] md:text-[64px] font-display font-extrabold text-primary-dark mb-[32px] leading-[1.05] tracking-tighter uppercase">
             Impact that <br/> commands respect.
           </h3>
           <p className="text-[18px] text-gray-600 leading-[1.8] max-w-md font-normal">
             With decades of proven market command, we build data-informed campaign frameworks that expand qualified reach, strengthen brand credibility, and convert attention into consistent business outcomes for our partners.
           </p>
        </div>

        {/* Right Stacked Bento Stats */}
        <div className="w-full lg:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-gray-200 rounded-[32px] overflow-hidden border border-gray-200 p-[1px] shadow-2xl">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-grid-item flex flex-col justify-center p-[56px_40px] bg-white group hover:bg-slate-50 transition-colors duration-500 cursor-default"
            >
              <div className="text-[64px] font-display font-extrabold text-primary-dark mb-[8px] tracking-tighter flex items-baseline">
                <span ref={el => countersRef.current[index] = el}>0</span>
                <span className="text-secondary ml-1">{stat.suffix}</span>
              </div>
              <p className="text-[12px] text-gray-400 uppercase tracking-[4px] font-bold leading-tight group-hover:text-primary transition-colors">
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
