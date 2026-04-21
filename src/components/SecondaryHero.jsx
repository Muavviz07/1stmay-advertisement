import React from 'react';

const SecondaryHero = ({
  pagePath,
  title,
  highlight,
  subtitle,
  titleClassName = '',
  subtitleClassName = ''
}) => {
  return (
    <section className="relative h-[78vh] flex items-center justify-center pt-[80px] overflow-hidden bg-bg-dark">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B0B14] via-[#16162A] to-[#0A0A17]" />

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 25% 50%, rgba(93,32,87,0.85) 0%, rgba(93,32,87,0.4) 45%, rgba(93,32,87,0) 80%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
        <p className="text-[12px] text-secondary tracking-[8px] uppercase font-bold mb-[28px]">
          {pagePath}
        </p>

        <h1
          className={`text-[34px] md:text-[58px] lg:text-[68px] xl:text-[76px] font-display font-extrabold text-white leading-[1.05] tracking-tighter mb-[28px] uppercase text-center ${titleClassName}`}
        >
          {title}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D199CF]">
            {highlight}
          </span>
        </h1>

        <p
          className={`text-[18px] md:text-[22px] text-gray-300 max-w-xl mx-auto leading-[1.6] font-medium text-center ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default SecondaryHero;
