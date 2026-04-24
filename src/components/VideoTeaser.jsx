import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';

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

const VideoTeaser = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const openVideo = useCallback((v) => setActiveVideo(v), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  const featuredVideos = projectsData.slice(0, 3);

  return (
    <>
      <AnimatePresence>
        {activeVideo && (
          <VideoModal videoId={activeVideo.id} title={activeVideo.title} onClose={closeVideo} />
        )}
      </AnimatePresence>

      <section className="py-[120px] bg-primary-dark relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-[12px] text-secondary tracking-[6px] uppercase font-bold mb-4">In Motion</p>
              <h2 className="text-3xl md:text-5xl font-display font-medium text-white leading-[1.1] tracking-tight">
                See Our Work<br />
                <span className="text-secondary italic">Come Alive.</span>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-[2px] uppercase text-white/60 hover:text-secondary transition-colors shrink-0"
            >
              View All Productions <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* 3-video grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group cursor-pointer"
                onClick={() => openVideo(video)}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-white/5 ring-1 ring-white/10">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-100"
                    onError={(e) => { e.target.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`; }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-secondary/80 group-hover:bg-secondary flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                      <Play size={22} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 text-[11px] font-mono text-white/50">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <h4 className="text-[15px] font-display font-medium text-white/80 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h4>
                <p className="text-[12px] text-white/40 font-mono mt-1">{video.publishedText} · {video.viewCount}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 flex justify-center">
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-sm font-bold tracking-[2px] uppercase text-white hover:border-secondary hover:bg-secondary transition-all duration-300"
            >
              Browse All {projectsData.length} Productions
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoTeaser;
