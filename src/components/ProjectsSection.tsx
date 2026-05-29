import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  liveUrl: string;
  liveLabel?: string;
  images: string[];
  imageLayout?: 'landscape' | 'portrait';
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Data Analytics · Power BI',
    name: 'IPL Analysis Dashboard (2008–2024)',
    description: 'Built an interactive Power BI dashboard analyzing IPL data (2008–2024), with visuals showing player performance, team wins, venue outcomes, and toss impact. Used data modeling and DAX to enable advanced filtering and time-series storytelling.',
    liveUrl: 'https://github.com/Kaviyarasu24/IPL-Analysis-Dashboard-Power-Bi.git',
    liveLabel: 'GitHub',
    images: ['/project01_01.png'],
    imageLayout: 'landscape',
  },
  {
    number: '02',
    category: 'AI · Python · Voice Assistant',
    name: 'J.A.R.V.I.S — Personal Voice Assistant',
    description: 'J.A.R.V.I.S is a Windows-first AI voice assistant built in Python, upgraded to a goal-based agent architecture. Instead of rigid command matching, it understands user intent, plans a sequence of tool actions, executes them step-by-step, and synthesizes a final spoken response — enabling natural, multi-step voice interactions. It can launch apps, control system settings, open websites, fetch live information, take screenshots, automate repetitive workflows, and manage files entirely through natural speech. The cinematic desktop UI adds a real-time transcript panel, task and calendar widgets, face authentication, and full speech controls — all powered by the same underlying agent.',
    liveUrl: 'https://github.com/Kaviyarasu24/JARVIS.git',
    liveLabel: 'GitHub',
    images: ['/project02_01.png', '/project02_02.png', '/project02_03.png'],
    imageLayout: 'landscape',
  },
  {
    number: '03',
    category: 'Mobile · React Native · Supabase',
    name: 'FinanceFlow — Personal Finance App',
    description: 'A personal finance mobile app built with Expo, React Native, TypeScript, and Supabase. Features full authentication (sign in, sign up, forgot password), transaction tracking with income/expense types, category management with custom icons and colors, analytics with donut and bar charts, savings rate panel, and profile/settings management — all with real-time Supabase sync.',
    liveUrl: 'https://github.com/Kaviyarasu24/FinanceFlow',
    liveLabel: 'GitHub',
    images: ['/financeflow-01.jpeg', '/financeflow-02.jpeg', '/financeflow-03.jpeg', '/financeflow-04.jpeg', '/financeflow-05.jpeg', '/financeflow-06.jpeg', '/financeflow-07.jpeg', '/financeflow-08.jpeg', '/financeflow-09.jpeg'],
    imageLayout: 'portrait',
  },
  {
    number: '04',
    category: 'Front-end · React',
    name: 'Project 4',
    description: '',
    liveUrl: '#',
    images: ['/notch-hero.png', '/notch-pricing.png', '/notch-mockup.png'],
    imageLayout: 'landscape',
  },
];

/* ── Landscape carousel (one image at a time, full width) ── */
const LandscapeCarousel = ({ images, name }: { images: string[]; name: string }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % images.length), 3000);
    return () => clearInterval(id);
  }, [paused, images.length]);

  if (images.length === 1) {
    return (
      <div className="flex-1 min-h-0 overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px]">
        <img
          src={images[0]}
          alt={`${name} preview`}
          className="h-full w-full object-contain"
          loading="lazy"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      className="flex-1 min-h-0 overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px] relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px]"
          initial={false}
          animate={{ x: `${(i - current) * 100}%` }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        >
          <img
            src={src}
            alt={`${name} preview ${i + 1}`}
            className="h-full w-full object-contain"
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-[#D7E2EA] scale-125' : 'bg-[#D7E2EA]/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Portrait strip (horizontal scroll of phone-frame cards) ── */
const PortraitStrip = ({ images, name }: { images: string[]; name: string }) => {
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    const strip = stripRef.current;
    if (!strip) return;
    const card = strip.children[index] as HTMLElement;
    if (!card) return;
    const stripRect = strip.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset = cardRect.left - stripRect.left - (stripRect.width - cardRect.width) / 2;
    strip.scrollBy({ left: offset, behavior: 'smooth' });
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActive(c => {
        const next = (c + 1) % images.length;
        scrollToCard(next);
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, [images.length]);

  const handleClick = (i: number) => {
    setActive(i);
    scrollToCard(i);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      {/* Scrollable phone strip */}
      <div
        ref={stripRef}
        className="flex-1 min-h-0 flex items-center gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden px-2 pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`shrink-0 overflow-hidden rounded-[18px] sm:rounded-[22px] border-2 transition-all duration-300 focus:outline-none ${
              i === active
                ? 'border-[#D7E2EA] scale-105 shadow-[0_0_20px_rgba(215,226,234,0.25)]'
                : 'border-[#D7E2EA]/20 opacity-60 hover:opacity-90 hover:border-[#D7E2EA]/50'
            }`}
            style={{ height: '100%', aspectRatio: '9/19.5' }}
          >
            <img
              src={src}
              alt={`${name} screen ${i + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </button>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 shrink-0">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? 'bg-[#D7E2EA] w-4 h-2' : 'bg-[#D7E2EA]/30 w-2 h-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Router: pick layout based on image type ── */
const ImageCarousel = ({ images, name, layout }: { images: string[]; name: string; layout?: 'landscape' | 'portrait' }) => {
  if (layout === 'portrait') return <PortraitStrip images={images} name={name} />;
  return <LandscapeCarousel images={images} name={name} />;
};

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[85vh] w-full"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Top row: number + meta + button */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            <div
              className="shrink-0 font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
              {project.description ? (
                <p
                  className="font-light text-[#D7E2EA]/55 leading-relaxed w-full"
                  style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1rem)' }}
                >
                  {project.description}
                </p>
              ) : null}
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto">
            <LiveProjectButton href={project.liveUrl} label={project.liveLabel} className="w-full sm:w-auto" />
          </div>
        </div>

        {/* Image area */}
        <ImageCarousel images={project.images} name={project.name} layout={project.imageLayout} />
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
