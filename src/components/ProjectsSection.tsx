import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  images: string[];
  imageLayout?: 'landscape' | 'portrait' | 'terminal';
  terminalLines?: string[];
  terminalTitle?: string;
  gridSpan?: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Data Analytics · Power BI',
    name: 'IPL Analysis Dashboard (2008–2024)',
    description: 'Built an interactive Power BI dashboard analyzing IPL data (2008–2024), with visuals showing player performance, team wins, venue outcomes, and toss impact. Used data modeling and DAX to enable advanced filtering and time-series storytelling.',
    githubUrl: 'https://github.com/Kaviyarasu24/IPL-Analysis-Dashboard-Power-Bi.git',
    images: ['/project01_01.webp'],
    imageLayout: 'landscape',
    gridSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    number: '02',
    category: 'AI · Python · Voice Assistant',
    name: 'J.A.R.V.I.S — Personal Voice Assistant',
    description: 'J.A.R.V.I.S is a Windows-first AI voice assistant built in Python, upgraded to a goal-based agent architecture. Instead of rigid command matching, it understands user intent, plans tool actions, and executes them step-by-step. The cinematic desktop UI adds a transcript panel, task widgets, and full speech controls.',
    githubUrl: 'https://github.com/Kaviyarasu24/JARVIS.git',
    images: ['/project02_01.webp', '/project02_02.webp', '/project02_03.webp'],
    imageLayout: 'landscape',
    gridSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    number: '03',
    category: 'Mobile · React Native · Supabase',
    name: 'FinanceFlow — Personal Finance App',
    description: 'A personal finance mobile app built with Expo, React Native, TypeScript, and Supabase. Features transactions tracking, category management with custom icons, charts analytics, savings rate panel, and profile management with real-time Supabase sync.',
    githubUrl: 'https://github.com/Kaviyarasu24/FinanceFlow',
    images: [
      '/financeflow-01.webp',
      '/financeflow-02.webp',
      '/financeflow-03.webp',
      '/financeflow-04.webp',
      '/financeflow-05.webp',
      '/financeflow-06.webp',
      '/financeflow-07.webp',
      '/financeflow-08.webp',
      '/financeflow-09.webp'
    ],
    imageLayout: 'portrait',
    gridSpan: 'md:col-span-1 lg:col-span-1 lg:row-span-2',
  },
  {
    number: '04',
    category: 'Python · Computer Vision · AI',
    name: 'Farm Vehicle Security Monitoring System',
    description: 'An intelligent farm security system that automates vehicle monitoring using Computer Vision. Processes video footage to detect and identify vehicles via YOLO and OpenCV — performing automatic number plate recognition (ANPR) and logging movements in Excel.',
    githubUrl: 'https://github.com/Kaviyarasu24/security-system.git',
    images: ['/project04_01.webp', '/project04_02.webp', '/project04_03.webp'],
    imageLayout: 'landscape',
    gridSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    number: '05',
    category: 'Python · Automation · AI',
    name: 'Auto-Mail-Reply — Email Automation',
    description: 'An intelligent email automation system that responds to incoming emails using keyword matching with fuzzy logic. Integrates with Gmail via IMAP/SMTP, tracks processed emails in SQLite, and supports dry-run mode for safe testing.',
    githubUrl: 'https://github.com/Kaviyarasu24/Auto-Mail-Reply.git',
    images: [],
    imageLayout: 'landscape',
    gridSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    number: '06',
    category: 'Python · LangChain · OpenRouter',
    name: 'Agentic Coding AI — React App Generator',
    description: 'An interactive CLI coding agent that generates complete, production-ready React 18+ applications from a single text prompt. Powered by OpenRouter API and LangChain, it outputs TypeScript + Tailwind CSS projects automatically.',
    githubUrl: 'https://github.com/Kaviyarasu24/Agentic-Coding-AI',
    images: [],
    imageLayout: 'landscape',
    gridSpan: 'md:col-span-2 lg:col-span-1',
  },
  {
    number: '07',
    category: 'Next.js · OpenRouter · GenAI',
    name: 'Farm Sage — AI Agricultural Assistant',
    description: 'A Next.js web app that gives farmers weather-aware agricultural guidance through a multilingual AI chat interface. Pulls weather via Open-Meteo, detects location, and supports Tamil, English, Hindi, and Marathi.',
    githubUrl: 'https://github.com/Kaviyarasu24/Farm-Sage',
    liveUrl: 'https://farm-sage.kaviyarasup24.workers.dev/',
    images: [],
    imageLayout: 'landscape',
    gridSpan: 'md:col-span-2 lg:col-span-2',
  },
];

/* ── Landscape carousel ── */
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
      <div className="w-full h-full min-h-0 overflow-hidden flex items-start justify-center">
        <img
          src={images[0]}
          alt={`${name} preview`}
          className="h-full w-full object-contain max-h-[340px] lg:max-h-[480px] transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      className="w-full h-full min-h-0 overflow-hidden relative flex items-start justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 overflow-hidden flex items-start justify-center"
          initial={false}
          animate={{ x: `${(i - current) * 100}%` }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        >
          <img
            src={src}
            alt={`${name} preview ${i + 1}`}
            className="h-full w-full object-contain max-h-[340px] lg:max-h-[480px] transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Portrait carousel (Inside phone bezel mockup) ── */
const PortraitCarousel = ({ images, name }: { images: string[]; name: string }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % images.length), 2500);
    return () => clearInterval(id);
  }, [paused, images.length]);

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={`${name} screenshot`}
        className="w-full h-full object-cover rounded-[16px] sm:rounded-[20px] transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        draggable={false}
      />
    );
  }

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 w-full h-full overflow-hidden"
          initial={false}
          animate={{ x: `${(i - current) * 100}%` }}
          transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
        >
          <img
            src={src}
            alt={`${name} screen ${i + 1}`}
            className="w-full h-full object-cover rounded-[16px] sm:rounded-[20px] transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      ))}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 z-10 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Carousel Router ── */
const ImageCarousel = ({
  images,
  name,
  layout,
}: {
  images: string[];
  name: string;
  layout?: 'landscape' | 'portrait' | 'terminal';
}) => {
  if (images.length === 0) {
    return (
      <div className="w-full h-full min-h-[220px] rounded-[24px] border border-dashed border-[#D7E2EA]/20 bg-[#17171a]/40 flex flex-col items-center justify-center p-6 gap-3 text-center transition-all duration-500 group-hover:border-[#D7E2EA]/35 group-hover:bg-[#17171a]/60 w-full">
        <div className="w-12 h-12 rounded-full bg-[#1e1e22] border border-[#D7E2EA]/10 flex items-center justify-center text-[#D7E2EA]/40 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all duration-500 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[#D7E2EA]/70 tracking-wide uppercase">Preview Coming Soon</span>
          <span className="text-[10px] text-[#D7E2EA]/40 font-light max-w-[200px]">We are preparing high-quality screenshots for this project.</span>
        </div>
      </div>
    );
  }

  if (layout === 'portrait') {
    return (
      <div className="w-full h-full flex items-end justify-center overflow-hidden pt-2">
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] border-4 border-[#0c0c0c] bg-[#0c0c0c] shadow-[0_15px_30px_rgba(0,0,0,0.8)] h-full aspect-[9/19.5] transition-transform duration-500 group-hover:scale-105 group-hover:translate-y-1">
          <PortraitCarousel images={images} name={name} />
        </div>
      </div>
    );
  }

  return <LandscapeCarousel images={images} name={name} />;
};

/* ── Active Project Details Card ── */
interface ActiveProjectDetailsProps {
  project: ProjectData;
}

const ActiveProjectDetails = ({ project }: ActiveProjectDetailsProps) => {
  const isPortrait = project.imageLayout === 'portrait';
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const techs = project.category.split('·').map((t) => t.trim());

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col lg:flex-row justify-between overflow-hidden rounded-[32px] sm:rounded-[40px] border border-[#D7E2EA]/15 bg-[#121214] p-8 sm:p-11 transition-all duration-500 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] group lg:gap-10 w-full"
      style={{ minHeight: '600px' }}
    >
      {/* Background Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
        style={{
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(215, 226, 234, 0.05), transparent 75%)`,
        }}
      />

      {/* Left Column (Info + Actions) */}
      <div className="relative z-10 flex flex-col justify-between gap-6 lg:w-[45%] lg:shrink-0">
        <div className="flex flex-col gap-4.5 w-full">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D7E2EA]/50">
              Project Category
            </span>
            <span className="font-mono text-sm font-semibold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] select-none">
              // {project.number}
            </span>
          </div>

          <h3 className="font-black uppercase text-[#D7E2EA] tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl mt-2 transition-colors duration-300 group-hover:text-white">
            {project.name}
          </h3>

          <p className="font-normal text-[#D7E2EA]/90 leading-relaxed text-base sm:text-lg mt-3">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            {techs.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full text-sm font-mono font-medium bg-[#1e1e22] text-[#D7E2EA]/95 border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 hover:bg-[#D7E2EA]/5 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3.5 w-full pt-5">
          {project.githubUrl && (
            <LiveProjectButton href={project.githubUrl} label="GitHub" compact className="flex-1 sm:flex-initial" />
          )}
          {project.liveUrl && (
            <LiveProjectButton href={project.liveUrl} label="Live" compact className="flex-1 sm:flex-initial" />
          )}
        </div>
      </div>

      {/* Right Column (Visual Preview) */}
      <div className={`relative z-10 flex-grow flex-shrink min-h-0 mt-6 lg:mt-0 flex items-start lg:items-center justify-center overflow-hidden w-full lg:w-[51%] lg:self-stretch ${
        isPortrait ? 'h-[460px] sm:h-[540px] lg:h-[580px]' : 'h-[260px] sm:h-[360px] lg:h-[460px]'
      }`}>
        <ImageCarousel
          images={project.images}
          name={project.name}
          layout={project.imageLayout}
        />
      </div>
    </div>
  );
};

/* ── Dynamic Call to Action Card ── */
const CTACard = () => {
  return (
    <FadeIn
      delay={0.1}
      y={30}
      className="relative flex flex-col justify-between rounded-[32px] sm:rounded-[40px] border border-[#D7E2EA]/15 p-6 sm:p-7 transition-all duration-500 hover:border-[#D7E2EA]/35 hover:-translate-y-1 hover:shadow-[0_10px_35px_-10px_rgba(215,226,234,0.12)] group"
      style={{
        minHeight: '320px',
        background: 'radial-gradient(circle at top right, rgba(182, 0, 168, 0.15) 0%, rgba(12, 12, 12, 0) 70%), #121214',
      }}
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40">
          Collaboration
        </span>
        <h3 className="font-black uppercase text-[#D7E2EA] tracking-tight leading-tight text-xl sm:text-2xl mt-1">
          Let's build something amazing
        </h3>
        <p className="font-light text-[#D7E2EA]/60 leading-relaxed text-xs sm:text-sm mt-1.5">
          Looking for an internship, open-source collaboration, or just want to chat about AI & Data Science? Let's connect!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-md">
        <a
          href="mailto:Kaviyarasup24@gmail.com"
          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] w-full"
        >
          Email Me
        </a>
        <a
          href="https://github.com/kaviyarasu24"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/20 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#D7E2EA] transition hover:bg-white/5 hover:border-[#D7E2EA]/50 hover:scale-[1.02] active:scale-[0.98] w-full"
        >
          GitHub Profile
        </a>
      </div>
    </FadeIn>
  );
};

/* ── Main Projects Section ── */
const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<ProjectData>(PROJECTS[0]);

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
          Projects
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-8 items-start relative">
        {/* Sidebar Navigation - Sticky on Desktop */}
        <div className="w-full lg:w-[24%] lg:shrink-0 flex flex-col gap-3.5 lg:sticky lg:top-24 h-fit z-20">
          {/* Mobile Horizontal Tabs */}
          <div
            className="flex lg:hidden overflow-x-auto gap-2 pb-4 scrollbar-none w-full snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PROJECTS.map((project) => {
              const isActive = activeProject.number === project.number;
              return (
                <button
                  key={project.number}
                  onClick={() => setActiveProject(project)}
                  className={`snap-center flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full border transition-all duration-300 ${
                    isActive
                       ? 'bg-[#121214] border-[#D7E2EA]/20 shadow-[0_4px_12px_rgba(0,0,0,0.4)]'
                      : 'bg-[#0f0f11]/30 border-transparent hover:bg-[#121214]/20'
                  }`}
                >
                  <span className={`font-mono text-xs sm:text-sm ${isActive ? 'text-cyan-400 font-black' : 'text-[#D7E2EA]/20'}`}>
                    {project.number}
                  </span>
                  <span className={`font-black text-xs sm:text-sm uppercase tracking-tight transition-colors duration-300 ${
                    isActive ? 'hero-heading' : 'text-[#D7E2EA]/40'
                  }`}>
                    {project.name.split('—')[0].split('(')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop Vertical List */}
          <div className="hidden lg:flex flex-col gap-2.5 w-full">
            {PROJECTS.map((project) => {
              const isActive = activeProject.number === project.number;
              return (
                <button
                  key={project.number}
                  onClick={() => setActiveProject(project)}
                  className={`group flex items-center justify-between text-left p-5 rounded-2xl border transition-all duration-300 w-full ${
                    isActive
                      ? 'bg-[#121214] border-[#D7E2EA]/20 shadow-[0_12px_40px_-8px_rgba(215,226,234,0.1)]'
                      : 'bg-[#0f0f11]/40 border-transparent hover:bg-[#121214]/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-sm sm:text-base ${isActive ? 'text-cyan-400 font-black' : 'text-[#D7E2EA]/20 group-hover:text-[#D7E2EA]/40 transition-colors'}`}>
                      {project.number}
                    </span>
                    <span className={`font-black text-sm sm:text-base uppercase tracking-tight transition-colors duration-300 ${
                      isActive ? 'hero-heading' : 'text-[#D7E2EA]/40 group-hover:text-[#D7E2EA]/85'
                    }`}>
                      {project.name.split('—')[0].split('(')[0].trim()}
                    </span>
                  </div>
                  <div className="flex items-center shrink-0 ml-2">
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Project Details Content Panel */}
        <div className="w-full lg:w-[73%] flex-grow relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full"
            >
              <ActiveProjectDetails project={activeProject} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-8">
        <CTACard />
      </div>
    </section>
  );
};

export default ProjectsSection;
