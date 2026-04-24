import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Eye, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTASection from '../components/CTASection';
import SecondaryHero from '../components/SecondaryHero';
import projectsData from '../data/projects.json';

// Shared Video Modal
const VideoModal = ({ videoId, title, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-bold tracking-[2px] uppercase"
        >
          <span>Close</span>
          <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X size={16} />
          </div>
        </button>
        <p className="text-white/60 text-sm font-mono mb-3 line-clamp-1">{title}</p>
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeVideo, setActiveVideo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const openVideo = useCallback((project) => setActiveVideo(project), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  const categories = ['all', 'film', 'print', 'digital'];

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.portfolio-hero-title',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );
    gsap.fromTo('.filter-item',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 1 }
    );
    const items = gsap.utils.toArray('.portfolio-item');
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    });
    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  useEffect(() => {
    const items = gsap.utils.toArray('.project-card');
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none reverse' }
        }
      );
    });
  }, [visibleCount]);

  const filteredItems = selectedCategory === 'all' ? portfolio : portfolio.filter(item => item.type === selectedCategory);
  const displayedVideos = projectsData.slice(0, visibleCount);
  const hasMore = visibleCount < projectsData.length;

  return (
    <div className="bg-white min-h-screen">
      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal videoId={activeVideo.id} title={activeVideo.title} onClose={closeVideo} />
        )}
      </AnimatePresence>

      <SecondaryHero
        pagePath="/portfolio"
        title="Selected Work With"
        highlight="Real-World Outcomes."
        subtitle="Explore campaigns designed to earn attention, crafted with strategic precision, and executed to move brand perception and revenue performance together over time."
        titleClassName="portfolio-hero-title"
      />

      {/* ── FIRST SECTION: Full Video Grid with Pagination ── */}
      <section className="py-[120px] bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section Header */}
          <div className="flex justify-between items-end mb-16 border-b border-gray-200 pb-8">
            <div>
              <h3 className="text-[13px] text-gray-500 tracking-[6px] uppercase font-bold mb-4">Video Archive</h3>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-primary-dark">
                Our Productions
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@1stmayadvertisement755"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm font-bold tracking-[2px] uppercase text-secondary hover:text-primary-dark transition-colors"
            >
              View Channel <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <AnimatePresence>
              {displayedVideos.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
                  className="project-card group cursor-pointer"
                >
                  <div
                    className="relative aspect-video rounded-xl overflow-hidden mb-5 bg-gray-200 ring-1 ring-gray-200/50"
                    onClick={() => openVideo(project)}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.target.src = `https://i.ytimg.com/vi/${project.id}/hqdefault.jpg`; }}
                    />
                    <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/50 transition-all duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_0_24px_rgba(212,175,55,0.6)]">
                        <Play size={22} fill="currentColor" className="ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] text-gray-400 font-mono">{project.publishedText}</span>
                    <span className="text-[11px] text-gray-400 font-mono">{project.viewCount}</span>
                  </div>
                  <h4
                    className="text-[16px] font-display font-medium text-primary-dark group-hover:text-secondary transition-colors leading-snug line-clamp-2 cursor-pointer"
                    onClick={() => openVideo(project)}
                  >
                    {project.title}
                  </h4>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More / End */}
          {hasMore ? (
            <div className="mt-20 flex justify-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="group flex items-center gap-3 px-8 py-4 border border-gray-300 rounded-full text-sm font-bold tracking-[2px] uppercase text-primary-dark hover:border-secondary hover:bg-secondary hover:text-white transition-all duration-300"
              >
                Load More Videos
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="mt-20 text-center text-sm font-mono text-gray-400">
              — End of archive · {projectsData.length} productions total —
            </div>
          )}
        </div>
      </section>

      {/* Category Filter + Static Portfolio Grid */}
      <section className="py-[120px] bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-[60px]">
            <h2 className="text-[13px] text-gray-400 tracking-[8px] uppercase font-bold mb-[24px]">Explore Our Work</h2>
            <p className="text-[16px] text-gray-600 max-w-xl mx-auto">
              Filter through our portfolio to explore how each execution style — film, print, and digital — was shaped around specific audience behavior, business goals, and measurable campaign outcomes.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-[80px]">
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
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-secondary" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="portfolio-item group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="flex gap-4">
                        <button className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-secondary/80 transition-colors">
                          {item.type === 'film' ? <Play size={20} /> : <Eye size={20} />}
                        </button>
                        <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                          <ArrowUpRight size={20} />
                        </button>
                      </div>
                    </div>
                    {item.featured && (
                      <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 text-[10px] font-bold tracking-[2px] uppercase rounded">Featured</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[12px] text-gray-400 font-bold tracking-[3px] uppercase">{item.id}</span>
                      <span className="text-[10px] text-secondary font-bold tracking-[2px] uppercase">{item.category}</span>
                    </div>
                    <h3 className="text-[20px] font-display font-medium text-primary-dark mb-2 group-hover:text-secondary transition-colors">{item.title}</h3>
                    <p className="text-[14px] text-gray-600 mb-4">{item.client} • {item.format}</p>
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

      {/* Case Method */}
      <section className="py-[120px] bg-[#F7F8FA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-[12px] text-gray-500 tracking-[6px] uppercase font-bold mb-6">Case Method</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-dark leading-[1.05] tracking-tight">
                How We Build Performance Into Creative Work
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <p className="text-[17px] md:text-[19px] text-gray-600 leading-[1.9]">
                Every project in our portfolio begins with strategic framing: business objective, audience behavior,
                and channel reality. We then shape the creative direction around that context, ensuring visuals,
                messaging, and production quality all serve a clear commercial purpose instead of isolated aesthetic goals.
              </p>
              <p className="text-[17px] md:text-[19px] text-gray-600 leading-[1.9]">
                During execution, we focus on consistency and decision discipline. This means preserving brand voice
                across formats, maintaining timeline integrity, and measuring performance signals early so outcomes can
                be improved while campaigns are live. The result is work that is not only memorable, but meaningfully effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default PortfolioPage;
