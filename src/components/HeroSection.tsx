import { useState, useRef } from 'react';
import { Mail, Volume2, VolumeX } from 'lucide-react';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const STATS = [
  { value: '8.7', label: 'CGPA' },
  { value: '7+', label: 'Projects' },
  { value: '3', label: 'Roles' },
  { value: '2027', label: 'B.Tech AI & DS' },
];

const HERO_MARQUEE = [
  'AI/ML',
  'Power BI',
  'React',
  'Python',
  'GenAI',
  'Data Analytics',
  'Dashboards',
  'Automation',
];

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section id="hero" className="editorial-grid relative min-h-screen w-full overflow-hidden bg-theme-bg px-5 py-5 text-theme-text sm:px-8 md:px-10 transition-colors duration-400">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-7xl flex-col overflow-hidden rounded-[28px] border border-theme-border/60 bg-theme-card shadow-[0_24px_80px_rgba(0,0,0,0.05)] transition-all duration-400">
        <FadeIn delay={0} y={-18}>
          <nav className="flex flex-col gap-5 px-5 py-5 sm:px-7 md:flex-row md:items-center md:justify-between md:px-9">
            <a href="#" className="text-lg font-black uppercase tracking-tight text-theme-text">
              Kaviyarasu P
            </a>

            <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-theme-muted transition hover:text-theme-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="mailto:Kaviyarasup24@gmail.com"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-theme-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:-translate-y-0.5 hover:opacity-90"
            >
              <Mail size={15} />
              Email me
            </a>
          </nav>
        </FadeIn>

        <div className="grid flex-1 items-center gap-10 px-5 pb-8 pt-6 sm:px-7 md:grid-cols-[1.05fr_0.95fr] md:px-9 md:pb-12 lg:gap-14">
          <div className="flex flex-col items-start">
            <FadeIn delay={0.15} y={24}>
              <div className="mb-5 flex flex-wrap gap-2.5">
                <span className="rounded-full border border-theme-border bg-theme-accentMuted px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-theme-accent select-none">
                  Learn &gt; Build &gt; Analyze
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open to Internship & Full-time
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.28} y={34}>
              <h1
                className="max-w-4xl font-black uppercase leading-[0.9] tracking-tight text-theme-text"
                style={{ fontSize: 'clamp(2.5rem, 7.5vw, 5.8rem)' }}
              >
                <span className="kinetic-word block">Data Analyst</span>
                <span className="kinetic-word block text-theme-accent">Developer</span>
                <span className="kinetic-word block text-theme-text">Engineer</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.42} y={22}>
              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-theme-muted sm:text-lg">
                AI & Data Science student building intelligent apps, Power BI dashboards,
                and GenAI products with a practical, project-first mindset.
              </p>
            </FadeIn>

            <FadeIn delay={0.55} y={18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactButton label="Start a conversation" href="#contact" />
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full border-2 border-theme-text/80 px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-theme-text transition hover:bg-theme-text hover:text-theme-bg sm:px-8 sm:py-3"
                >
                  View projects
                </a>
                <a
                  href="/resume.pdf"
                  download="Kaviyarasu_P_Resume.pdf"
                  className="inline-flex items-center justify-center rounded-full border border-theme-accent bg-theme-accentMuted/20 hover:bg-theme-accent/20 px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-theme-accent transition sm:px-8 sm:py-3"
                >
                  Download CV
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.35} x={40} y={0}>
            <div className="relative">
              <div className="absolute -right-4 -top-4 hidden h-28 w-28 rounded-full bg-theme-accent md:block" />
              {/* Removed selected work pill */}
              <div className="relative overflow-hidden rounded-[34px] border-[10px] border-theme-border bg-theme-border shadow-[18px_18px_0_var(--accent-color)] transition-all duration-400">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="aspect-[4/5] h-full w-full object-cover opacity-95"
                >
                  <source src="/intro.mp4" type="video/mp4" />
                </video>

                <button
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                  className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-theme-card text-theme-text shadow-lg transition hover:scale-105"
                >
                  {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.7} y={18}>
          <div className="grid border-t border-theme-border/60 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-theme-border/60 px-6 py-5 sm:border-r last:border-r-0">
                <div className="text-3xl font-black tracking-tight text-theme-text">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-theme-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>


      </div>
    </section>
  );
};

export default HeroSection;
