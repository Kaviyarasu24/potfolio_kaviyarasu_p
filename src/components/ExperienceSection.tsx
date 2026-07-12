import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const EXPERIENCE = [
  {
    number: '01',
    type: 'Freelance',
    company: 'K. S. Rangasamy College of Technology',
    location: 'DAKSHAA T26',
    role: 'Full Stack Developer & Data Management Coordinator',
    duration: 'Jan 2026 – Mar 2026',
    description:
      'Contributed as a full stack developer on the team building the official website for DAKSHAA T26 using React, handling both frontend and backend development. Also coordinated content and data management for the platform, including online registration, attendance tracking, payment processing, and certificate generation for participants. Ensured data accuracy and smooth workflow across registration and certification systems, supporting a seamless experience for a large-scale, multi-day national fest.',
    tags: ['React', 'Full Stack Development', 'Data Management', 'Workflow Automation'],
  },
  {
    number: '02',
    type: 'Internship',
    company: 'Inaiyam Innovations',
    location: 'Tiruchengodu, Tamil Nadu',
    role: 'Tech Associate Intern',
    duration: 'Jul 2025 – Oct 2025',
    description:
      'Automated report generation using Python and Excel, reducing manual reporting effort for field data teams. Integrated NDVI and EVI vegetation indices into GIS workflows to support precision crop analysis. Validated datasets and created structured reports from field data for faster decision-making. Collaborated with field and data teams while maintaining technical documentation.',
    tags: ['Python', 'Excel', 'GIS', 'NDVI', 'Data Validation', 'Reporting'],
  },
  {
    number: '03',
    type: 'Internship',
    company: 'EduSkills Foundation',
    location: 'Remote',
    role: 'AI-ML Virtual Intern',
    duration: 'Apr 2025 – Jun 2025',
    description:
      'Worked with Python for data preprocessing and basic machine learning tasks, gaining hands-on experience in data cleaning, feature engineering, and model evaluation while applying problem-solving skills in real-world scenarios. Internship conducted in association with Google Cloud & AICTE.',
    tags: ['Python', 'Machine Learning', 'Data Preprocessing', 'Feature Engineering', 'Google Cloud'],
  },
];

interface ExpCardProps {
  exp: (typeof EXPERIENCE)[0];
  index: number;
}

const ExpCard = ({ exp, index }: ExpCardProps) => {
  const [flipped, setFlipped] = useState(false);

  // Detect pointer type: on touch devices use tap-to-flip,
  // on pointer devices use hover (mouse enter/leave)
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const handleInteractionStart = () => { if (!isTouch) setFlipped(true); };
  const handleInteractionEnd = () => { if (!isTouch) setFlipped(false); };
  const handleTap = () => { if (isTouch) setFlipped(f => !f); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="shrink-0 cursor-pointer group w-full"
      style={{ 
        minHeight: 'clamp(320px, 40vh, 460px)',
        perspective: '1000px'
      }}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onClick={handleTap}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Front Side */}
        <div
          className="relative flex flex-col justify-between gap-6 w-full h-full rounded-[32px] sm:rounded-[40px] border-2 border-[#0C0C0C]/10 bg-white p-6 sm:p-8 transition-colors duration-500 group-hover:border-[#0C0C0C]/30"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Top: number + type + duration */}
          <div className="flex items-start justify-between">
            <span
              className="font-black text-[#0C0C0C]/15 leading-none select-none"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 100px)' }}
            >
              {exp.number}
            </span>
            <div className="flex flex-col items-end gap-1 pt-1">
              <span
                className="font-medium uppercase tracking-widest text-[#0C0C0C]/50"
                style={{ fontSize: 'clamp(0.6rem, 1vw, 0.8rem)' }}
              >
                {exp.type}
              </span>
              <span
                className="font-medium uppercase tracking-widest text-[#0C0C0C]/40"
                style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)' }}
              >
                {exp.duration}
              </span>
            </div>
          </div>

          {/* Middle: company + role + location */}
          <div className="flex flex-col gap-2 mt-auto mb-auto">
            <h3
              className="font-black uppercase text-[#0C0C0C] leading-tight"
              style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.2rem)' }}
            >
              {exp.company}
            </h3>
            <p
              className="font-medium uppercase tracking-widest text-[#0C0C0C]/55"
              style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
            >
              {exp.role} · {exp.location}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#0C0C0C]/10" />

          {/* Bottom: tags + tap hint */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#0C0C0C]/20 bg-[#0C0C0C]/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0C0C0C]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            {isTouch && (
              <p className="text-center text-[10px] uppercase tracking-widest text-[#0C0C0C]/30 pt-1">
                Tap to see details
              </p>
            )}
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 flex flex-col justify-start rounded-[32px] sm:rounded-[40px] border-2 border-[#0C0C0C]/30 bg-[#0C0C0C] p-6 sm:p-8 shadow-xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex flex-col gap-6 h-full">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-white/30"></span>
              <h4 className="font-bold uppercase tracking-widest text-white/50 text-xs sm:text-sm">
                About The Role
              </h4>
            </div>
            <p
              className="font-light text-white/90 leading-relaxed overflow-y-auto flex-1"
              style={{ 
                fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {exp.description}
            </p>
            {/* Tap hint — only visible on touch devices */}
            {isTouch && (
              <p className="text-center text-[10px] uppercase tracking-widest text-white/30 pt-2 border-t border-white/10">
                Tap to flip back
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative w-full bg-white px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 overflow-hidden"
    >
      <FadeIn y={40}>
        <h2
          className="text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28 text-[#0C0C0C]"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6 mx-auto max-w-7xl w-full">
        {EXPERIENCE.map((exp, i) => (
          <ExpCard key={exp.number} exp={exp} index={i} />
        ))}
      </div>

    </section>
  );
};

export default ExperienceSection;
