import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'Kaviyarasup24@gmail.com',
    href: 'mailto:Kaviyarasup24@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 70107 64469',
    href: 'https://wa.me/917010764469?text=Hi%20Kaviyarasu!%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20connect.',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Kaviyarasu P',
    href: 'https://www.linkedin.com/in/kaviyarasup2411',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@kaviyarasu24',
    href: 'https://github.com/kaviyarasu24',
  },
];

const CONTACT_MARQUEE = [
  'Available for internships',
  'Open to collaboration',
  'AI projects',
  'Data dashboards',
  'Let us build it',
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-theme-bg px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 md:px-10 md:pt-32 transition-colors duration-400"
    >
      <div className="mb-14 overflow-hidden border-y border-theme-border/60 py-4">
        <div className="marquee-track-reverse flex w-max gap-10 whitespace-nowrap">
          {[...CONTACT_MARQUEE, ...CONTACT_MARQUEE].map((item, index) => (
            <span key={`${item}-${index}`} className="text-xl font-black uppercase tracking-tight text-theme-text sm:text-3xl">
              {item}
              <span className="ml-10 text-theme-accent">+</span>
            </span>
          ))}
        </div>
      </div>

      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="mb-4 text-center font-black uppercase leading-none tracking-tight text-theme-text"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Get in touch
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="mb-12 text-center font-semibold uppercase tracking-widest text-theme-accent sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          Pick whichever channel suits you
        </p>
      </FadeIn>

      {/* Contact cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = method.icon;
          const isExternal = method.href.startsWith('http');

          return (
            <FadeIn key={method.label} delay={i * 0.1} y={30}>
              <a
                href={method.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative flex h-full flex-col justify-between gap-8 rounded-[24px] border-2 border-theme-border/60 bg-theme-card p-6 shadow-[0_14px_42px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-theme-accent hover:bg-theme-card/90 sm:gap-10 sm:p-7 md:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-full border border-theme-border bg-theme-bg p-3 transition-colors duration-300 group-hover:border-theme-accent group-hover:bg-theme-accentMuted sm:p-3.5">
                    <Icon
                      className="text-theme-text"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <ArrowUpRight
                    className="text-theme-muted/50 transition-all duration-300 group-hover:rotate-12 group-hover:text-theme-text"
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                  <span
                    className="font-semibold uppercase tracking-widest text-theme-accent"
                    style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
                  >
                    {method.label}
                  </span>
                  <span
                    className="break-all font-medium text-theme-text"
                    style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
                  >
                    {method.value}
                  </span>
                </div>
              </a>
            </FadeIn>
          );
        })}
      </div>

      {/* Footer line */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 flex max-w-5xl flex-col items-center border-t border-theme-border/60 pt-8 text-center sm:mt-24 md:mt-28">
          <span
            className="font-semibold uppercase tracking-widest text-theme-muted"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            © 2026 Kaviyarasu P
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
