import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTASection from '../components/CTASection';
import SecondaryHero from '../components/SecondaryHero';

gsap.registerPlugin(ScrollTrigger);

const portfolio = [
  { id: "01", title: "Visual Momentum", category: "Advertising Film", type: "film", client: "Aero Dynamics", format: "8K Cinema", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80", featured: true },
  { id: "02", title: "Editorial Precision", category: "Print Ads", type: "print", client: "Vogue Collective", format: "Medium Format", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80", featured: false },
  { id: "03", title: "Sonic Rhythm", category: "Music Video", type: "film", client: "Studio 1st May", format: "RAW 12-bit", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80", featured: true },
  { id: "04", title: "Market Presence", category: "Outdoor Ads", type: "print", client: "Urban Pulse", format: "Billboard Master", img: "https://images.unsplash.com/photo-1542319630-55fb7f7c944a?auto=format&fit=crop&w=1200&q=80", featured: false },
  { id: "05", title: "Brand Monolith", category: "Advertising Film", type: "film", client: "Iconic Brands", format: "Anamorphic", img: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&q=80", featured: true },
  { id: "06", title: "Kinetic Flow", category: "Animation", type: "digital", client: "Synth Media", format: "3D Render", img: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80", featured: false },
];

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'film', 'print', 'digital'];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Hero animation
    gsap.fromTo('.portfolio-hero-title',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );

    // Filter animation
    gsap.fromTo('.filter-item',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 1 }
    );

    // Portfolio items reveal
    const items = gsap.utils.toArray('.portfolio-item');
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.type === selectedCategory);

  return (
    <div className="bg-white min-h-screen">
      <SecondaryHero
        pagePath="/portfolio"
        title="Selected Work With"
        highlight="Real-World Outcomes."
        subtitle="Explore campaigns designed to earn attention, crafted with strategic precision, and executed to move brand perception and revenue performance together over time."
        titleClassName="portfolio-hero-title"
      />

      {/* 2. Category Filter Section */}
      <section className="py-[120px] bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-[60px]">
            <h2 className="text-[13px] text-gray-400 tracking-[8px] uppercase font-bold mb-[24px]">Explore Our Work</h2>
            <p className="text-[16px] text-gray-600 max-w-xl mx-auto">
              Filter through our portfolio to explore how each execution style - film, print, and digital - was shaped around specific audience behavior, business goals, and measurable campaign outcomes.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-item px-8 py-4 text-[14px] font-bold tracking-[3px] uppercase transition-all duration-300 relative ${
                  selectedCategory === category 
                    ? 'text-primary-dark bg-secondary/10' 
                    : 'text-gray-400 hover:text-primary-dark hover:bg-gray-50'
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-secondary"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Portfolio Showcase */}
      <section className="py-[120px] bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className="portfolio-item group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="flex gap-4">
                        {item.type === 'film' ? (
                          <button className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-secondary/80 transition-colors">
                            <Play size={20} />
                          </button>
                        ) : (
                          <button className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-secondary/80 transition-colors">
                            <Eye size={20} />
                          </button>
                        )}
                        <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                          <ArrowUpRight size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {item.featured && (
                      <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 text-[10px] font-bold tracking-[2px] uppercase rounded">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[12px] text-gray-400 font-bold tracking-[3px] uppercase">{item.id}</span>
                      <span className="text-[10px] text-secondary font-bold tracking-[2px] uppercase">{item.category}</span>
                    </div>
                    
                    <h3 className="text-[20px] font-display font-medium text-primary-dark mb-2 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-[14px] text-gray-600 mb-4">
                      {item.client} • {item.format}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-gray-400 uppercase tracking-[1px]">{item.type}</span>
                      <ArrowUpRight size={16} className="text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-[120px] bg-[#F7F8FA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-[12px] text-gray-500 tracking-[6px] uppercase font-bold mb-6">
                Case Method
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-dark leading-[1.05] tracking-tight">
                How We Build Performance Into Creative Work
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <p className="text-[17px] md:text-[19px] text-gray-600 leading-[1.9]">
                Every project in our portfolio begins with strategic framing: business objective, audience behavior,
                and channel reality. We then shape the creative direction around that context, ensuring visuals,
                messaging, and production quality all serve a clear commercial purpose instead of isolated aesthetic
                goals.
              </p>
              <p className="text-[17px] md:text-[19px] text-gray-600 leading-[1.9]">
                During execution, we focus on consistency and decision discipline. This means preserving brand voice
                across formats, maintaining timeline integrity, and measuring performance signals early so outcomes can
                be improved while campaigns are live. The result is work that is not only memorable, but meaningfully
                effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Work Highlight */}
      <section className="py-[120px] bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-[80px]">
            <h2 className="text-[13px] text-secondary tracking-[8px] uppercase font-bold mb-[24px]">Featured Excellence</h2>
            <h3 className="text-4xl md:text-6xl font-display font-medium tracking-tighter leading-[0.9] mb-[32px]">
              STANDOUT <br/> <span className="text-secondary italic">CREATIONS</span>
            </h3>
            <p className="text-[18px] text-gray-300 max-w-2xl mx-auto">
              A curated set of our most impactful campaigns, where creative ambition and strategic discipline worked together to redefine narratives and deliver measurable business results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {portfolio.filter(item => item.featured).map((item, index) => (
              <div key={item.id} className="group relative">
                <div className="aspect-[3/4] bg-bg-light/10 rounded-lg overflow-hidden mb-6">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <h4 className="text-[24px] font-display font-medium text-white mb-2 group-hover:text-secondary transition-colors">
                  {item.title}
                </h4>
                <p className="text-[14px] text-gray-400 uppercase tracking-[2px]">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default PortfolioPage;
