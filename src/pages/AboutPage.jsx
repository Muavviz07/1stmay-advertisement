import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTASection from '../components/CTASection';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simple reveal for the hero text
    gsap.fromTo('.about-hero-title',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );
  }, []);

  return (
    <div className="pt-[160px] bg-bg-light">
      {/* 1. About Page Hero */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-5">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl">
           <h2 className="text-[14px] text-gray-400 tracking-[8px] uppercase font-bold mb-[32px] opacity-0 animate-fadeIn tracking-wider">Our DNA</h2>
           <h1 className="about-hero-title text-[10vw] md:text-[8vw] lg:text-[7vw] font-display font-bold text-primary-dark leading-[0.9] tracking-tighter mb-[48px]">
             THE ARCHITECTURE <br/> OF <span className="text-secondary">IMPACTFUL</span> <br/> ADVERTISING.
           </h1>
           <p className="text-[18px] md:text-[22px] text-gray-500 max-w-2xl mx-auto leading-[1.6] opacity-0 animate-fadeIn delay-700">
             1st May Advertisement is built on the principle of strategic transparency, crafting campaigns where precision meets purpose to scale your brand effectively.
           </p>
        </div>
      </section>

      {/* 2. Philosophy & Vision: The Perspective Shift */}
      <section className="py-[120px] bg-primary-dark text-white relative overflow-hidden">
         {/* Parallax Background Elements */}
         <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
         
         <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[100px] items-start">
               {/* Left: Content Block */}
               <div className="lg:col-span-6">
                  <h2 className="text-[13px] text-secondary tracking-[8px] uppercase font-bold mb-[32px] flex items-center gap-4">
                    <span className="w-[40px] h-[1px] bg-secondary"></span>
                    Our Vision
                  </h2>
                  <h3 className="text-[48px] md:text-[72px] lg:text-[84px] font-display font-medium tracking-tighter leading-[0.95] mb-[56px]">
                    ARCHITECTING <br/> <span className="text-secondary italic">TRUST</span> THROUGH <br/> TRANSPARENCY.
                  </h3>
                  
                  <div className="space-y-[40px] max-w-xl">
                     <p className="text-[20px] md:text-[24px] text-gray-300 leading-[1.6] font-light">
                        We view every campaign as an architectural milestone. Our mission is to provide **unwavering transparency** while delivering creative support with measurable business value.
                     </p>
                     <p className="text-[17px] text-gray-400 leading-[1.8]">
                        Since our inception, we have focused on one thing: positioning brands where they are not just seen, but remembered. We eliminate media wastage through rigorous research and meticulous execution.
                     </p>
                  </div>

                  <div className="mt-[80px] p-[48px] border-l-2 border-secondary bg-white/5 backdrop-blur-md max-w-lg relative group overflow-hidden">
                     <div className="absolute top-0 left-0 w-0 h-full bg-secondary/10 group-hover:w-full transition-all duration-700"></div>
                     <p className="text-[26px] md:text-[32px] font-display font-medium italic leading-tight relative z-10">
                        "We do exactly what <br className="hidden md:block"/> we say we do."
                     </p>
                  </div>
               </div>
               
               {/* Right: Layered Parallax Image */}
               <div className="lg:col-span-6 pt-[40px]">
                  <div className="relative">
                     <div className="aspect-[4/5] bg-bg-light/10 rounded-[20px] border border-white/5 overflow-hidden translate-x-[-20px] translate-y-[-20px]">
                        <img 
                          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
                          alt="Agency Culture" 
                          className="w-full h-full object-cover grayscale opacity-40 contrast-125"
                        />
                     </div>
                     <div className="absolute inset-0 aspect-[4/5] border-2 border-secondary/30 rounded-[20px] translate-x-[20px] translate-y-[20px] pointer-events-none"></div>
                     
                     {/* Floating Values Overlay */}
                     <div className="absolute top-[20%] right-[-10%] hidden xl:block space-y-4">
                        {["Integrity", "Optimism", "Clarity"].map((val, i) => (
                           <div key={val} className="px-8 py-4 bg-white text-primary-dark font-bold tracking-[4px] uppercase text-[12px] shadow-2xl">
                              {val}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. Our Strong Suit: The Three Pillars (Geometric Approach) */}
      <section className="py-[120px] bg-white relative">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-[120px]">
               <div className="max-w-xl">
                  <h2 className="text-[13px] text-gray-400 tracking-[8px] uppercase font-bold mb-[24px]">Expertise</h2>
                  <h3 className="text-[56px] md:text-[80px] font-display font-bold text-primary-dark leading-[0.9] tracking-tighter">OUR STRONG <br/> <span className="text-secondary underline decoration-[8px] underline-offset-[12px]">SUIT.</span></h3>
               </div>
               <p className="text-gray-500 max-w-sm text-[18px] leading-relaxed border-l-2 border-gray-100 pl-8">
                 Advertising is both commercial and emotional. Our commercials are crafted to be sharp, short, and memorable. 
                 <span className="block mt-4 text-primary font-bold">"Less is more, but reach is greater."</span>
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 divide-y md:divide-y-0 md:divide-x divide-gray-100">
               {[
                  { 
                    title: "Bespoke Campaigns", 
                    desc: "Tailored strategies that mirror your brand's unique DNA, built for maximum impact across every medium.",
                    icon: (
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5"/>
                         <circle cx="20" cy="20" r="8" fill="currentColor"/>
                      </svg>
                    )
                  },
                  { 
                    title: "Strategic Execution", 
                    desc: "Data-backed creative decisions that ensure your message reaches the right audience without compromise.",
                    icon: (
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <rect x="2" y="2" width="36" height="36" stroke="currentColor" strokeWidth="1.5"/>
                         <rect x="12" y="12" width="16" height="16" fill="currentColor"/>
                      </svg>
                    )
                  },
                  { 
                    title: "Financial Integrity", 
                    desc: "Transparent budget management ensuring every investment produces measurable results for your bottom line.",
                    icon: (
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M20 3L37.3205 33H2.67949L20 3Z" stroke="currentColor" strokeWidth="1.5"/>
                         <path d="M20 15L27 27H13L20 15Z" fill="currentColor"/>
                      </svg>
                    )
                  }
               ].map((item, i) => (
                 <div key={i} className="p-[64px] hover:bg-bg-light transition-all duration-500 group">
                    <div className="text-secondary mb-[48px] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">{item.icon}</div>
                    <h4 className="text-[26px] font-display font-bold text-primary-dark mb-6 tracking-tight leading-tight">{item.title}</h4>
                    <p className="text-gray-500 leading-relaxed text-[16px] font-light">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. Fundamental Promise: The DNA List (Interactive Breakdown) */}
      <section className="py-[120px] bg-bg-light">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-[100px]">
               <div className="lg:col-span-8">
                  <h2 className="text-[13px] text-gray-400 tracking-[10px] uppercase font-bold mb-[24px]">Fundamentals</h2>
                  <h3 className="text-[42px] md:text-[64px] font-display font-bold text-primary-dark tracking-tighter leading-none uppercase">Our PROMISE to you.</h3>
               </div>
            </div>
            
            <div className="border-t border-gray-200">
               {[
                 { title: "Sharer Brand Communication", index: "01" },
                 { title: "Design with Precision", index: "02" },
                 { title: "Performance Excellence", index: "03" },
                 { title: "Commercial Clarity", index: "04" }
               ].map((promise, i) => (
                 <div key={i} className="group border-b border-gray-200 py-[48px] flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white px-[40px] transition-all duration-500 cursor-pointer relative overflow-hidden">
                    <span className="text-[14px] font-bold tracking-[4px] text-gray-300 group-hover:text-secondary transition-colors mb-4 md:mb-0">{promise.index}</span>
                    <h4 className="text-[32px] md:text-[42px] font-display font-medium text-primary-dark group-hover:translate-x-4 transition-transform duration-500">{promise.title}</h4>
                    <div className="hidden md:block w-[0px] group-hover:w-[100px] h-[2px] bg-secondary transition-all duration-500"></div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. What Does Advertising Do? (Creative Typography) */}
      <section className="py-[200px] bg-white text-center">
         <div className="max-w-5xl mx-auto px-6">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               className="relative"
            >
               <h2 className="text-[14px] text-gray-400 tracking-[12px] uppercase font-bold mb-[48px]">The Core Mission</h2>
               <p className="text-[32px] md:text-[52px] lg:text-[64px] font-display font-medium tracking-tighter leading-[1.1] text-primary-dark uppercase">
                  Advertising <span className="text-secondary opacity-30 italic">Visibility</span>. <br/>
                  Expanding <span className="text-secondary opacity-30 italic">Market Awareness</span>. <br/>
                  Widen Your <span className="text-secondary opacity-30 italic">Reach</span>. <br/>
                  Maximize <span className="text-secondary font-bold">Sales</span>.
               </p>
            </motion.div>
         </div>
      </section>

      {/* Final Section CTA */}
      <CTASection />
    </div>
  );
};

export default AboutPage;
