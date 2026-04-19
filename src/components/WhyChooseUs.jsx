import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Zap, Wallet, Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: "Proven Track Record",
    description: "Trusted by 800+ brands across India. Measurable performance metrics in every campaign.",
    icon: <Award className="w-[28px] h-[28px]" />
  },
  {
    title: "Creative Excellence",
    description: "Innovative concepts that stand out. Merging high-level strategy with artistic execution.",
    icon: <Zap className="w-[28px] h-[28px]" />
  },
  {
    title: "Budget Discipline",
    description: "Quality production within agreed budgets. We believe financial discipline actively builds trust.",
    icon: <Wallet className="w-[28px] h-[28px]" />
  },
  {
    title: "Channel Fit",
    description: "Cinema, print, radio, digital, outdoor. We meticulously match your message to your audience.",
    icon: <Target className="w-[28px] h-[28px]" />
  },
  {
    title: "Practical Impact",
    description: "Campaigns that align visionary ideas with execution. Generating real results that move markets.",
    icon: <CheckCircle2 className="w-[28px] h-[28px]" />
  }
];

const WhyChooseUs = () => {
  useEffect(() => {
    gsap.fromTo('.why-header',
      { opacity: 0, y: 20 },
      { scrollTrigger: { trigger: '.why-choose-us', start: 'top 75%' }, y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    gsap.fromTo('.why-card', 
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: '.why-grid',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <section className="why-choose-us py-[160px] bg-[#0A0A14] relative overflow-hidden">
      {/* Premium subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#3D1E6D] opacity-[0.05] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="why-header text-center mb-[100px] max-w-3xl mx-auto">
          <h2 className="text-[14px] text-gray-400 tracking-[3px] uppercase font-bold mb-[16px]">Our Promise</h2>
          <h3 className="text-[40px] md:text-[56px] font-display font-medium text-white tracking-tight leading-[1.1]">
            Why world-class brands choose to partner with us.
          </h3>
        </div>

        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[40px] md:gap-[32px]">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              className="why-card flex flex-col group cursor-default"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-[56px] h-[56px] rounded-full bg-white/5 text-secondary flex justify-center items-center shrink-0 border border-white/10 mb-[24px] transform transition-transform duration-[0.5s] group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20">
                {reason.icon}
              </div>
              
              <h4 className="font-display font-semibold text-[20px] text-white mb-[12px] group-hover:text-secondary transition-colors duration-[0.5s]">
                {reason.title}
              </h4>
              <p className="text-[15px] text-gray-400 leading-[1.7]">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
