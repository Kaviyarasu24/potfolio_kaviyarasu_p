import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

const EDUCATION = [
  {
    number: '01',
    type: 'Under Graduate',
    institution: 'K. S. Rangasamy College of Technology',
    location: 'Tiruchengode, Tamil Nadu',
    degree: 'B.Tech in Artificial Intelligence and Data Science',
    year: '2023 – 2027',
    score: '8.7',
    scoreLabel: 'CGPA · up to 5th Semester',
    tags: ['Machine Learning', 'Data Analytics', 'Power BI', 'GenAI', 'React'],
  },
  {
    number: '02',
    type: 'Higher Secondary',
    institution: 'Sankar Ponnar Higher Secondary School',
    location: 'Palani, Tamil Nadu',
    degree: 'Higher Secondary Certificate — State Board',
    year: '2022 – 2023',
    score: '89%',
    scoreLabel: 'Percentage · State Board',
    tags: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
  },
];

interface EduCardProps {
  edu: (typeof EDUCATION)[0];
  index: number;
  total: number;
}

const EduCard = ({ edu, index, total }: EduCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#0C0C0C]/10 bg-white p-6 sm:p-8 md:p-10 hover:border-[#0C0C0C]/30 transition-colors duration-500 shadow-sm hover:shadow-md"
      >
        {/* Top row: number + meta */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 mb-8 sm:mb-10">
          <div className="flex flex-row items-start gap-4 sm:gap-8 md:gap-12">
            {/* Number */}
            <div
              className="shrink-0 font-black text-[#0C0C0C]/20 leading-none select-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 120px)' }}
            >
              {edu.number}
            </div>

            {/* Type + Institution */}
            <div className="flex flex-col gap-2 pt-1 sm:pt-2 md:pt-3">
              <span
                className="font-medium uppercase tracking-widest text-[#0C0C0C]/55"
                style={{ fontSize: 'clamp(0.65rem, 1.1vw, 0.9rem)' }}
              >
                {edu.type} · {edu.year}
              </span>
              <h3
                className="font-bold uppercase text-[#0C0C0C] leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2rem)' }}
              >
                {edu.institution}
              </h3>
              <p
                className="font-medium text-[#0C0C0C]/55 uppercase tracking-widest"
                style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)' }}
              >
                {edu.location}
              </p>
            </div>
          </div>

          {/* Score badge — top right */}
          <div className="shrink-0 flex flex-col items-end gap-1 pt-1 sm:pt-2">
            <span
              className="font-black text-[#0C0C0C] leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {edu.score}
            </span>
            <span
              className="font-light uppercase tracking-widest text-[#0C0C0C]/60 text-right"
              style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)' }}
            >
              {edu.scoreLabel}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#0C0C0C]/15 mb-8 sm:mb-10" />

        {/* Bottom row: degree + tags */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          {/* Degree */}
          <p
            className="font-medium text-[#0C0C0C]/75 leading-relaxed max-w-xl"
            style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.25rem)' }}
          >
            {edu.degree}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {edu.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#0C0C0C]/25 bg-[#0C0C0C]/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0C0C0C]/70 hover:border-[#0C0C0C]/50 hover:text-[#0C0C0C] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section
      id="education"
      className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
        <FadeIn y={40}>
          <h2
            className="text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28 text-[#0C0C0C]"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Education
          </h2>
        </FadeIn>

        <div className="mx-auto max-w-7xl flex flex-col gap-6 sm:gap-8">
          {EDUCATION.map((edu, i) => (
            <EduCard
              key={edu.number}
              edu={edu}
              index={i}
              total={EDUCATION.length}
            />
          ))}
        </div>
    </section>
  );
};

export default ServicesSection;
