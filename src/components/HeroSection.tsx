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
    <section className="editorial-grid relative min-h-screen w-full overflow-hidden bg-[#F7F1E6] px-5 py-5 text-[#17130D] sm:px-8 md:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-7xl flex-col overflow-hidden rounded-[28px] border border-[#17130D]/10 bg-[#FFFDF7] shadow-[0_24px_80px_rgba(23,19,13,0.08)]">
        <FadeIn delay={0} y={-18}>
          <nav className="flex flex-col gap-5 px-5 py-5 sm:px-7 md:flex-row md:items-center md:justify-between md:px-9">
            <a href="#" className="text-lg font-black uppercase tracking-tight">
              Kaviyarasu P
            </a>

            <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-[#17130D]/60 transition hover:text-[#17130D]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="mailto:Kaviyarasup24@gmail.com"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F4B942] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#17130D] transition hover:-translate-y-0.5 hover:bg-[#e7aa2d]"
            >
              <Mail size={15} />
              Email me
            </a>
          </nav>
        </FadeIn>

        <div className="grid flex-1 items-center gap-10 px-5 pb-8 pt-6 sm:px-7 md:grid-cols-[1.05fr_0.95fr] md:px-9 md:pb-12 lg:gap-14">
          <div className="flex flex-col items-start">
            <FadeIn delay={0.15} y={24}>
              <p className="mb-5 rounded-full border border-[#17130D]/10 bg-[#F4B942]/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#5F4A24]">
                Learn &gt; Build &gt; Analyze
              </p>
            </FadeIn>

            <FadeIn delay={0.28} y={34}>
              <h1
                className="max-w-4xl font-black uppercase leading-[0.9] tracking-tight text-[#17130D]"
                style={{ fontSize: 'clamp(3.8rem, 11vw, 8.8rem)' }}
              >
                <span className="kinetic-word block">Data</span>
                <span className="kinetic-word block text-[#F4B942]">Developer</span>
                <span className="kinetic-word block text-[#17130D]">Builder</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.42} y={22}>
              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-[#17130D]/70 sm:text-lg">
                AI & Data Science student building intelligent apps, Power BI dashboards,
                and GenAI products with a practical, project-first mindset.
              </p>
            </FadeIn>

            <FadeIn delay={0.55} y={18}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ContactButton label="Start a conversation" href="#contact" />
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[#17130D] px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#17130D] transition hover:bg-[#17130D] hover:text-[#F7F1E6] sm:px-10 sm:py-3.5 sm:text-sm"
                >
                  View projects
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.35} x={40} y={0}>
            <div className="relative">
              <div className="absolute -right-4 -top-4 hidden h-28 w-28 rounded-full bg-[#F4B942] md:block" />
              <div className="absolute -left-5 bottom-14 z-10 hidden rounded-full border border-[#17130D] bg-[#FFFDF7] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] shadow-lg lg:block">
                Selected work / 2024-2026
              </div>
              <div className="relative overflow-hidden rounded-[34px] border-[10px] border-[#17130D] bg-[#17130D] shadow-[18px_18px_0_#F4B942]">
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
                  className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFDF7] text-[#17130D] shadow-lg transition hover:scale-105"
                >
                  {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.7} y={18}>
          <div className="grid border-t border-[#17130D]/10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-[#17130D]/10 px-6 py-5 sm:border-r last:border-r-0">
                <div className="text-3xl font-black tracking-tight text-[#17130D]">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#17130D]/55">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="overflow-hidden border-t border-[#17130D]/10 bg-[#17130D] py-3 text-[#F7F1E6]">
          <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
            {[...HERO_MARQUEE, ...HERO_MARQUEE].map((item, index) => (
              <span key={`${item}-${index}`} className="text-sm font-black uppercase tracking-[0.22em]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
