import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Zap, Wallet, Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: "Proven Track Record",
    description: "Trusted by 800+ brands across India, with delivery models built around clear KPIs, transparent reporting, and campaign performance you can track from awareness to revenue impact.",
    icon: <Award className="w-[28px] h-[28px]" />
  },
  {
    title: "Creative Excellence",
    description: "Original concepts built on real audience insight, combining high-level strategy with high-craft execution so campaigns feel distinctive, memorable, and commercially relevant.",
    icon: <Zap className="w-[28px] h-[28px]" />
  },
  {
    title: "Budget Discipline",
    description: "Production quality delivered within agreed financial guardrails, with proactive optimization that protects media efficiency and builds long-term trust with every engagement.",
    icon: <Wallet className="w-[28px] h-[28px]" />
  },
  {
    title: "Channel Fit",
    description: "From cinema and print to radio, digital, and outdoor, we match message, format, and platform behavior to audience intent for stronger response in every channel mix.",
    icon: <Target className="w-[28px] h-[28px]" />
  },
  {
    title: "Practical Impact",
    description: "Visionary ideas grounded in disciplined execution, producing practical business outcomes such as better recall, higher conversion quality, and sustained market movement.",
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
        <div className="why-header text-center mb-[100px] max-w-4xl mx-auto">
          <h2 className="text-[12px] text-gray-500 tracking-[6px] uppercase font-bold mb-[24px]">Strategic Advantage</h2>
          <h3 className="text-[40px] md:text-[64px] font-display font-extrabold text-white tracking-tight leading-[1.05] uppercase">
            WHY THE WORLD'S BEST <br className="hidden md:block" /> TRUST OUR COMMAND.
          </h3>
          <p className="text-[17px] md:text-[19px] text-gray-400 leading-[1.8] max-w-3xl mx-auto mt-[28px]">
            We operate as an extension of your core team, aligning brand ambition with creative systems, media intelligence, and disciplined execution to deliver outcomes that are both visible and verifiable.
          </p>
        </div>

        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[40px] md:gap-[32px]">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              className="why-card flex flex-col group cursor-default"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-[64px] h-[64px] rounded-2xl bg-white/5 text-secondary flex justify-center items-center shrink-0 border border-white/10 mb-[28px] transform transition-all duration-[0.5s] group-hover:scale-110 group-hover:bg-secondary group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_30px_rgba(76,175,80,0.3)]">
                {reason.icon}
              </div>
              
              <h4 className="font-display font-bold text-[22px] text-white mb-[16px] group-hover:text-secondary transition-colors duration-[0.5s] uppercase tracking-tight">
                {reason.title}
              </h4>
              <p className="text-[15px] text-gray-400 leading-[1.8] font-normal">
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
