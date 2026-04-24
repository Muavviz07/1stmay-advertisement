import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTASection from '../components/CTASection';
import SecondaryHero from '../components/SecondaryHero';
import projectsData from '../data/projects.json';

gsap.registerPlugin(ScrollTrigger);

// Video Modal Component
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-bold tracking-[2px] uppercase"
          >
            <span>Close</span>
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X size={16} />
            </div>
          </button>

          {/* Video Title */}
          <p className="text-white/60 text-sm font-mono mb-3 line-clamp-1">{title}</p>

          {/* YouTube Embed */}
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
    </AnimatePresence>
  );
};

const ProjectsPage = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeVideo, setActiveVideo] = useState(null);

  const openVideo = useCallback((project) => setActiveVideo(project), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo('.projects-hero-title',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  useEffect(() => {
    const items = gsap.utils.toArray('.project-card');
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, [visibleCount]);

  const loadMore = () => setVisibleCount(prev => prev + 6);
  const displayedProjects = projectsData.slice(0, visibleCount);
  const hasMore = visibleCount < projectsData.length;

  return (
    <div className="bg-bg-light min-h-screen">
      {/* Video Player Modal */}
      {activeVideo && (
        <VideoModal
          videoId={activeVideo.id}
          title={activeVideo.title}
          onClose={closeVideo}
        />
      )}

      <SecondaryHero
        pagePath="/projects"
        title="Our Cinematic"
        highlight="Showcase."
        subtitle="Explore our latest visual narratives and strategic campaigns. Hand-crafted video productions designed to captivate and convert."
        titleClassName="projects-hero-title"
      />

      {/* Video Grid */}
      <section className="py-[120px] bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section Header */}
          <div className="flex justify-between items-end mb-16 border-b border-gray-200 pb-8">
            <div>
              <h3 className="text-[13px] text-gray-500 tracking-[6px] uppercase font-bold mb-4">Video Archive</h3>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-primary-dark">
                Latest Productions
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
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
                  className="project-card group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div
                    className="relative aspect-video rounded-xl overflow-hidden mb-5 bg-gray-200 ring-1 ring-gray-200/50"
                    onClick={() => openVideo(project)}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = `https://i.ytimg.com/vi/${project.id}/hqdefault.jpg`;
                      }}
                    />
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/50 transition-all duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_0_24px_rgba(212,175,55,0.6)]">
                        <Play size={22} fill="currentColor" className="ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] text-gray-400 font-mono">{project.publishedText}</span>
                    <span className="text-[11px] text-gray-400 font-mono">{project.viewCount}</span>
                  </div>

                  {/* Title */}
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
                onClick={loadMore}
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

      <CTASection />
    </div>
  );
};

export default ProjectsPage;
