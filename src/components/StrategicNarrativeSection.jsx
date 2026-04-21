import React from 'react';

const StrategicNarrativeSection = () => {
  return (
    <section className="py-[120px] bg-[#F7F8FA] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="text-[12px] text-gray-500 tracking-[6px] uppercase font-bold mb-6">
              Strategic Narrative
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-dark leading-[1.05] tracking-tight">
              Why Content Depth Matters For Brand Growth
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className="text-[17px] md:text-[19px] text-gray-600 leading-[1.9]">
              In today&apos;s market, audiences make faster judgments with higher expectations. Strong visuals can
              attract attention, but sustained growth comes from clear and credible communication that explains why
              your offer matters, who it is for, and what outcomes it creates. That is why we design every campaign
              with layered messaging: first to capture interest, then to build understanding, and finally to move
              confident decisions.
            </p>

            <p className="text-[17px] md:text-[19px] text-gray-600 leading-[1.9]">
              Our approach balances storytelling with commercial precision. We map brand language to audience intent,
              align creative direction with channel behavior, and ensure each touchpoint contributes to one consistent
              market narrative. The result is communication that feels premium on the surface, strategic in structure,
              and measurable in business impact over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicNarrativeSection;
