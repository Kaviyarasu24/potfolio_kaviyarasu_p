import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    images: ['/project01_01.png'],
    imageLayout: 'landscape',
    gridSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    number: '02',
    category: 'AI · Python · Voice Assistant',
    name: 'J.A.R.V.I.S — Personal Voice Assistant',
    description: 'J.A.R.V.I.S is a Windows-first AI voice assistant built in Python, upgraded to a goal-based agent architecture. Instead of rigid command matching, it understands user intent, plans tool actions, and executes them step-by-step. The cinematic desktop UI adds a transcript panel, task widgets, and full speech controls.',
    githubUrl: 'https://github.com/Kaviyarasu24/JARVIS.git',
    images: ['/project02_01.png', '/project02_02.png', '/project02_03.png'],
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
      '/financeflow-01.jpeg',
      '/financeflow-02.jpeg',
      '/financeflow-03.jpeg',
      '/financeflow-04.jpeg',
      '/financeflow-05.jpeg',
      '/financeflow-06.jpeg',
      '/financeflow-07.jpeg',
      '/financeflow-08.jpeg',
      '/financeflow-09.jpeg'
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
    images: ['/project04_01.png', '/project04_02.png', '/project04_03.png'],
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
    imageLayout: 'terminal',
    terminalTitle: 'auto-mail-reply — python main.py',
    terminalLines: [
      '$ python main.py',
      '✔  Connected to Gmail IMAP — inbox ready',
      '📬  Fetching unread emails... found 3',
      '',
      '── Email 1 ──────────────────────────────',
      '  From    : client@example.com',
      '  Subject : Inquiry about your services',
      '  Keyword : "inquiry"  →  match score 94',
      '  Action  : Sending reply...',
      '  ✔  Reply sent successfully',
      '',
      '── Email 2 ──────────────────────────────',
      '  From    : hr@company.com',
      '  Subject : Job application follow-up',
      '  Keyword : "follow-up"  →  match score 87',
      '  Action  : Sending reply...',
      '  ✔  Reply sent successfully',
      '',
      '── Email 3 ──────────────────────────────',
      '  From    : unknown@domain.net',
      '  Subject : Random newsletter',
      '  Keyword : no match found (score < 80)',
      '  Action  : Skipped',
      '',
      '✔  Run complete — 2 replied, 1 skipped',
      '📦  Logged to emails.db',
    ],
    gridSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    number: '06',
    category: 'Python · LangChain · OpenRouter',
    name: 'Agentic Coding AI — React App Generator',
    description: 'An interactive CLI coding agent that generates complete, production-ready React 18+ applications from a single text prompt. Powered by OpenRouter API and LangChain, it outputs TypeScript + Tailwind CSS projects automatically.',
    githubUrl: 'https://github.com/Kaviyarasu24/Agentic-Coding-AI',
    images: [],
    imageLayout: 'terminal',
    terminalTitle: 'agentic-coding-ai — python app.py',
    terminalLines: [
      '$ python app.py',
      '',
      '  ╔══════════════════════════════════════╗',
      '  ║       Agentic Coding AI  🤖           ║',
      '  ╚══════════════════════════════════════╝',
      '',
      '  Describe the app you want:',
      '  > create a simple calculator',
      '',
      '🧠  Sending prompt to LLM via OpenRouter...',
      '✔  Response received — parsing file structure',
      '',
      '── Generating project files ─────────────',
      '  ✔  metadata.json',
      '  ✔  index.html',
      '  ✔  index.tsx',
      '  ✔  App.tsx',
      '  ✔  components/Calculator.tsx',
      '',
      '── metadata.json ────────────────────────',
      '  {',
      '    "name": "Simple Calculator",',
      '    "description": "A responsive calculator',
      '     built with React and TypeScript."',
      '  }',
      '',
      '✔  Project saved to generated_project/',
      '🚀  Ready — open in VS Code and run npm i',
    ],
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
    imageLayout: 'terminal',
    terminalTitle: 'farm-sage — pnpm dev',
    terminalLines: [
      '$ pnpm dev',
      '✔  Next.js ready on http://localhost:3000',
      '',
      '── Incoming chat request ────────────────',
      '  Language : Tamil',
      '  Location : 11.0168° N, 76.9558° E',
      '',
      '🌦  Fetching weather via Open-Meteo...',
      '  Temperature  : 31°C',
      '  Humidity     : 78%',
      '  Rainfall     : 4.2 mm',
      '',
      '📍  Reverse geocoding via Nominatim...',
      '  Place : Coimbatore, Tamil Nadu, India',
      '',
      '🧠  Building farming system prompt...',
      '  Context injected: weather + location',
      '  Language target : Tamil',
      '',
      '🤖  Calling OpenRouter LLM...',
      '✔  Response received',
      '',
      '── Assistant reply ──────────────────────',
      '  "இன்றைய வெப்பநிலை 31°C மற்றும் ஈரப்பதம்',
      '   78% உள்ளது. நெல் பயிருக்கு இப்போது...',
      '',
      '✔  Reply streamed to client',
    ],
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
          className="h-full w-full object-contain max-h-[260px] lg:max-h-[380px] transition-transform duration-500 group-hover:scale-[1.03]"
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
            className="h-full w-full object-contain max-h-[260px] lg:max-h-[380px] transition-transform duration-500 group-hover:scale-[1.03]"
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
      {/* Small dot indicators at the bottom of the screen */}
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

/* ── Terminal preview ── */
const TerminalPreview = ({ lines, title }: { lines: string[]; title?: string }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount >= lines.length) return;
    const delay = lines[visibleCount] === '' ? 120 : lines[visibleCount].startsWith('──') ? 180 : 90;
    const id = setTimeout(() => setVisibleCount(c => c + 1), delay);
    return () => clearTimeout(id);
  }, [visibleCount, lines]);

  // Keep terminal auto-scrolled to bottom
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount]);

  return (
    <div className="w-full h-full min-h-[180px] overflow-hidden rounded-[16px] bg-[#0a0a0a] border border-[#D7E2EA]/10 flex flex-col transition-all duration-500 group-hover:border-[#D7E2EA]/20">
      {/* Window header */}
      <div className="flex items-center gap-1.5 px-3.5 py-2 border-b border-[#D7E2EA]/10 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28c840] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#28c840]"></span>
        </span>
        <span className="ml-2 text-[10px] font-mono text-[#D7E2EA]/30 tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">{title ?? 'terminal'}</span>
      </div>

      {/* Terminal logs */}
      <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-3.5 font-mono" style={{ scrollbarWidth: 'none' }}>
        {lines.slice(0, visibleCount).map((line, i) => {
          const isCommand  = line.startsWith('$');
          const isSuccess  = line.includes('✔');
          const isSkipped  = line.includes('Skipped') || line.includes('no match');
          const isSeparator = line.startsWith('──');
          const isEmpty    = line === '';

          return (
            <div
              key={i}
              className={`leading-normal whitespace-pre-wrap ${
                isEmpty      ? 'h-2'
                : isCommand  ? 'text-[#D7E2EA] font-bold'
                : isSuccess  ? 'text-[#28c840]'
                : isSkipped  ? 'text-[#febc2e]'
                : isSeparator ? 'text-[#D7E2EA]/20'
                : 'text-[#D7E2EA]/60'
              }`}
              style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}
            >
              {line}
              {i === visibleCount - 1 && visibleCount < lines.length && (
                <span className="inline-block w-[6px] h-[11px] bg-[#D7E2EA]/70 ml-0.5 align-middle animate-pulse" />
              )}
            </div>
          );
        })}
        {visibleCount >= lines.length && (
          <div className="text-[#D7E2EA]/60 leading-normal" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}>
            <span className="inline-block w-[6px] h-[11px] bg-[#D7E2EA]/70 align-middle animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Carousel Router ── */
const ImageCarousel = ({
  images,
  name,
  layout,
  terminalLines,
  terminalTitle,
}: {
  images: string[];
  name: string;
  layout?: 'landscape' | 'portrait' | 'terminal';
  terminalLines?: string[];
  terminalTitle?: string;
}) => {
  if (layout === 'terminal') return <TerminalPreview lines={terminalLines ?? []} title={terminalTitle} />;
  
  if (layout === 'portrait') {
    // Swipeable full vertical phone frame simulation
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

/* ── Project Bento Card ── */
interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isPortrait = project.imageLayout === 'portrait';
  const isWide = project.gridSpan?.includes('lg:col-span-2');

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

  // Wide layout (horizontal side-by-side on desktop)
  if (isWide) {
    return (
      <FadeIn
        delay={index * 0.05}
        y={30}
        className={`relative flex flex-col lg:flex-row justify-between overflow-hidden rounded-[32px] sm:rounded-[40px] border border-[#D7E2EA]/10 bg-[#121214] p-5 sm:p-7 transition-all duration-500 hover:border-[#D7E2EA]/30 hover:bg-[#161619] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 group lg:gap-8 ${project.gridSpan}`}
        style={{ minHeight: '420px' }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="absolute inset-0 z-0 pointer-events-none rounded-[inherit]"
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
          style={{
            background: `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, rgba(215, 226, 234, 0.055), transparent 75%)`,
          }}
        />

        {/* Left Column (Info + Actions) */}
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:w-[45%] lg:shrink-0">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40 group-hover:text-[#D7E2EA]/60 transition-colors duration-300">
                Project Category
              </span>
              <span className="font-mono text-xs font-semibold text-[#D7E2EA]/30 select-none group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-all duration-500">
                // {project.number}
              </span>
            </div>

            <h3 className="font-black uppercase text-[#D7E2EA] tracking-tight leading-tight text-lg sm:text-xl md:text-2xl mt-1.5 transition-colors duration-300 group-hover:text-white">
              {project.name}
            </h3>

            <p className="font-light text-[#D7E2EA]/60 leading-relaxed text-xs sm:text-sm mt-1">
              {project.description}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#1e1e22] text-[#D7E2EA]/75 border border-[#D7E2EA]/10 transition-all duration-300 group-hover:border-[#D7E2EA]/20 hover:!border-[#D7E2EA]/40 hover:bg-[#D7E2EA]/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full pt-1">
            {project.githubUrl && (
              <LiveProjectButton href={project.githubUrl} label="GitHub" compact className="flex-1 sm:flex-initial" />
            )}
            {project.liveUrl && (
              <LiveProjectButton href={project.liveUrl} label="Live" compact className="flex-1 sm:flex-initial" />
            )}
          </div>
        </div>

        {/* Right Column (Visual Preview) */}
        <div className="relative z-10 flex-grow flex-shrink min-h-0 mt-4 mb-2 lg:my-0 flex items-start lg:items-start justify-center overflow-hidden w-full lg:h-full lg:w-[50%]">
          <ImageCarousel
            images={project.images}
            name={project.name}
            layout={project.imageLayout}
            terminalLines={project.terminalLines}
            terminalTitle={project.terminalTitle}
          />
        </div>
      </FadeIn>
    );
  }

  // Vertical layout (for columns/normal cards)
  return (
    <FadeIn
      delay={index * 0.05}
      y={30}
      className={`relative flex flex-col justify-between overflow-hidden rounded-[32px] sm:rounded-[40px] border border-[#D7E2EA]/10 bg-[#121214] p-5 sm:p-7 transition-all duration-500 hover:border-[#D7E2EA]/30 hover:bg-[#161619] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 group ${project.gridSpan}`}
      style={{
        minHeight: isPortrait ? '580px' : '400px',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 z-0 pointer-events-none rounded-[inherit]"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(215, 226, 234, 0.055), transparent 75%)`,
        }}
      />

      {/* Top info and actions grouped together */}
      <div className="relative z-10 flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40 group-hover:text-[#D7E2EA]/60 transition-colors duration-300">
              Project Category
            </span>
            <span className="font-mono text-xs font-semibold text-[#D7E2EA]/30 select-none group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-all duration-500">
              // {project.number}
            </span>
          </div>

          <h3 className="font-black uppercase text-[#D7E2EA] tracking-tight leading-tight text-lg sm:text-xl md:text-2xl mt-1.5 transition-colors duration-300 group-hover:text-white">
            {project.name}
          </h3>

          <p className="font-light text-[#D7E2EA]/60 leading-relaxed text-xs sm:text-sm mt-1">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {techs.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#1e1e22] text-[#D7E2EA]/75 border border-[#D7E2EA]/10 transition-all duration-300 group-hover:border-[#D7E2EA]/20 hover:!border-[#D7E2EA]/40 hover:bg-[#D7E2EA]/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons directly below description */}
        <div className="flex items-center gap-2 w-full pt-1">
          {project.githubUrl && (
            <LiveProjectButton href={project.githubUrl} label="GitHub" compact className="flex-1 sm:flex-initial" />
          )}
          {project.liveUrl && (
            <LiveProjectButton href={project.liveUrl} label="Live" compact className="flex-1 sm:flex-initial" />
          )}
        </div>
      </div>

      {/* Visual Preview at the bottom */}
      <div
        className={`relative z-10 flex-grow flex-shrink min-h-0 mt-6 flex items-end justify-center overflow-hidden w-full ${
          isPortrait ? 'h-[360px] sm:h-[420px] lg:h-[480px]' : 'h-[180px] sm:h-[220px]'
        }`}
      >
        <ImageCarousel
          images={project.images}
          name={project.name}
          layout={project.imageLayout}
          terminalLines={project.terminalLines}
          terminalTitle={project.terminalTitle}
        />
      </div>
    </FadeIn>
  );
};

/* ── Dynamic Call to Action Card ── */
const CTACard = () => {
  return (
    <FadeIn
      delay={0.35}
      y={30}
      className="relative flex flex-col justify-between rounded-[32px] sm:rounded-[40px] border border-[#D7E2EA]/15 p-6 sm:p-7 md:col-span-2 lg:col-span-3 transition-all duration-500 hover:border-[#D7E2EA]/35 hover:-translate-y-1 hover:shadow-[0_10px_35px_-10px_rgba(215,226,234,0.12)] group"
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

      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
          />
        ))}
        <CTACard />
      </div>
    </section>
  );
};

export default ProjectsSection;
