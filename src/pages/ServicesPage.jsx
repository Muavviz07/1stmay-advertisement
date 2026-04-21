import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTASection from '../components/CTASection';
import SecondaryHero from '../components/SecondaryHero';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Advertising Films',
    label: 'Lights, camera, action',
    desc: 'High-impact brand stories for TV, web, and social campaigns.',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    tags: ['Film', 'Brand', 'Story']
  },
  {
    id: '02',
    title: 'Print Ads',
    label: 'Editorial precision',
    desc: 'Eye-catching layouts that turn headlines into memorable brand moments.',
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Print', 'Design', 'Retail']
  },
  {
    id: '03',
    title: 'Corporate Films',
    label: 'Brand authority',
    desc: 'Clear, polished video for company stories, launches, and presentations.',
    img: 'https://images.unsplash.com/photo-1491972690050-ba117db4dc09?auto=format&fit=crop&w=1200&q=80',
    tags: ['Corporate', 'Story', 'Video']
  },
  {
    id: '04',
    title: 'Music Videos',
    label: 'Aesthetic rhythm',
    desc: 'Rhythm-led visuals that connect performance, story, and style.',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    tags: ['Music', 'Motion', 'Culture']
  },
  {
    id: '05',
    title: 'Media Planning',
    label: 'Strategic reach',
    desc: 'Papers, websites, television channels — placed where your message performs best.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Media', 'Strategy', 'Reach']
  },
  {
    id: '06',
    title: 'Digital Advertising',
    label: 'Conversion engine',
    desc: 'Campaigns designed for reach, engagement, and measurable growth.',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tags: ['Digital', 'Growth', 'Performance']
  },
  {
    id: '07',
    title: 'Radio Ads',
    label: 'Audio authority',
    desc: 'Saleable audio scripts and spots made to sound sharp, clear, and persuasive.',
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    tags: ['Audio', 'Copy', 'Impact']
  },
  {
    id: '08',
    title: 'Animations',
    label: 'Motion made meaningful',
    desc: 'State-of-the-art visuals that simplify complex ideas and amplify brand voice.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['Motion', 'Explainer', 'Design']
  },
  {
    id: '09',
    title: 'Outdoor Advertising',
    label: 'Big-format visibility',
    desc: 'Billboards, posters, hoardings that keep your brand in view all day.',
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    tags: ['Outdoor', 'Visibility', 'Scale']
  }
];

const pillars = [
  { title: 'Story-first', detail: 'We start with creative ideas, not checklist features.' },
  { title: 'Channel-ready', detail: 'Every asset is built for its role in the campaign mix.' },
  { title: 'Visual precision', detail: 'Design that looks polished, bold, and unmistakably modern.' },
  { title: 'Performance aware', detail: 'Creative with real-world attention and impact in mind.' }
];

const steps = [
  { title: 'Discover', desc: 'We explore your market, brand voice, and audience behaviour before we ideate.' },
  { title: 'Design', desc: 'We build ideas into polished expressions across film, print, digital, and audio.' },
  { title: 'Deploy', desc: 'We activate campaigns with media clarity, timeliness, and creative consistency.' },
  { title: 'Scale', desc: 'We sharpen what works and expand it into more winning touchpoints.' }
];

const ServicesPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo('.services-hero-title',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo('.services-hero-copy',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.3 }
    );

    gsap.utils.toArray('.feature-card').forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.08
        }
      );
    });

    gsap.utils.toArray('.service-panel').forEach((panel, index) => {
      gsap.fromTo(panel,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.06
        }
      );
    });

    gsap.utils.toArray('.process-step').forEach((step, index) => {
      gsap.fromTo(step,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.08
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">
      <SecondaryHero
        pagePath="/services"
        title="Creative Services Built"
        highlight="For Business Impact."
        subtitle="From film to digital, every deliverable is crafted to strengthen recall, sharpen positioning, and support measurable growth."
        titleClassName="services-hero-title"
        subtitleClassName="services-hero-copy"
      />

      <section className="relative py-[120px] bg-slate-50 overflow-hidden">
        <div className="absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-secondary/10 blur-[90px]" />
        <div className="absolute left-0 bottom-0 h-[260px] w-[260px] rounded-full bg-primary/10 blur-[90px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
            <div className="space-y-6">
              <p className="text-[13px] uppercase tracking-[8px] text-secondary font-semibold">What we deliver</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.0] text-slate-900">
                A service suite that feels like a creative toolkit, not a checklist.
              </h2>
              <p className="max-w-xl text-[18px] leading-[1.9] text-slate-600">
                Every offering is designed to work together — from film and radio to print, digital, and ambient experiences.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="feature-card rounded-[32px] border border-slate-200/70 bg-white shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)] p-6">
                  <h3 className="text-[1.4rem] font-semibold text-slate-900 mb-3">{pillar.title}</h3>
                  <p className="text-[15px] leading-[1.8] text-slate-600">{pillar.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-[120px] bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-2xl">
              <p className="text-accent-red font-bold text-lg mb-4 flex items-center gap-2">
                <span className="opacity-50">/</span> Services We Offer
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[0.95] text-slate-900">
                Certified<br />Excellence
              </h2>
            </div>
            
            <div className="lg:max-w-md lg:mt-16">
              <p className="text-slate-600 text-[18px] leading-relaxed mb-8">
                From high-impact brand stories to strategic media planning, we've got you covered. 
                Choose precision, choose 1st May for your next creative campaign.
              </p>
              <div className="flex flex-col sm:flex-row gap-8">
                <Link to="/contact" className="text-accent-red font-bold flex items-center gap-2 group transition-all">
                  Call For Booking <span className="group-hover:translate-x-1 transition-transform">›</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="relative group overflow-hidden rounded-[48px] shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white">
                <div className="relative h-[480px] w-full">
                  {/* Image with Notch Mask */}
                  <div className="card-notch-curved absolute inset-0 overflow-hidden">
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Subtle Overlay to maintain color while ensuring text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-90" />
                  </div>
                  
                  {/* Title */}
                  <div className="absolute bottom-10 left-10 z-10 pointer-events-none">
                    <h3 className="text-white text-[1.6rem] font-bold tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Notch Button (Bottom Right) - Standardized color & position */}
                  <div className="absolute bottom-0 right-0 z-20">
                    <Link 
                      to="/contact"
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="rotate-0 transition-transform group-hover:rotate-45"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-[120px] bg-slate-50 overflow-hidden">
        <div className="absolute right-0 top-0 h-[220px] w-[220px] rounded-full bg-secondary/10 blur-[90px]" />
        <div className="absolute left-0 bottom-0 h-[240px] w-[240px] rounded-full bg-primary/10 blur-[90px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid gap-10 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="process-step rounded-[32px] border border-slate-200/70 bg-white shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)] p-8">
                <div className="flex items-center justify-between mb-5 gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">{index + 1}</div>
                  <span className="text-[12px] uppercase tracking-[4px] text-slate-500">{step.title}</span>
                </div>
                <h3 className="text-[1.8rem] font-display text-slate-900 leading-tight mb-4">{step.title}</h3>
                <p className="text-[15px] leading-[1.9] text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default ServicesPage;
