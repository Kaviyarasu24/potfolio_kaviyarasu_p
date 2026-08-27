import { useState } from 'react';
import { Award, CheckCircle, ExternalLink, Download, LayersIcon } from 'lucide-react';
import FadeIn from './FadeIn';

/* ─────────────────────────── Types ─────────────────────────── */
interface Certificate {
  id: string;
  badge: string;
  title: string;
  issuer: string;

  description: string;
  credentialId: string;
  certificationNumber?: string;
  dateEarned: string;
  expirationDate?: string;
  skills: string[];
  verifyUrl: string;
  /** Single image path, or for grouped cards this is the primary image */
  image: string;
  /** Optional second image for grouped cards (e.g. TN Skill Level 1 + Level 2) */
  image2?: string;
  image2Label?: string;
  imageLabel?: string;
  pdfUrl: string;
}

/* ──────────────────────── Certificate data ──────────────────── */
const CERTIFICATES: Certificate[] = [
  {
    id: 'certificate-1',
    badge: 'Microsoft Certified',
    title: 'Microsoft Certified: Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    description:
      'Demonstrates proven expertise in cleaning, transforming, and modeling data, and designing and building scalable data visualization solutions using Microsoft Power BI to deliver actionable insights and maximize business value.',
    credentialId: 'E84EF6488C61191',
    certificationNumber: '12D803-0Z1755',
    dateEarned: 'August 23, 2026',
    expirationDate: 'August 24, 2027',
    skills: [
      'Power BI',
      'Data Analysis',
      'Data Visualization',
      'Data Modeling',
      'DAX (Data Analysis Expressions)',
      'Data Ingestion & Transformation',
    ],
    verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/KaviyarasuP/E84EF6488C61191',
    image: '/certificates/Microsoft Certified Power BI Data Analyst Associate.webp',
    pdfUrl: '/certificates/Microsoft Certified Power BI Data Analyst Associate.webp',
  },
  {
    id: 'certificate-2',
    badge: 'Microsoft Certified',
    title: 'Microsoft Certified: Fabric Analytics Engineer Associate',
    issuer: 'Microsoft',
    description:
      'Demonstrates proven expertise in designing, developing, and deploying enterprise-scale data analytics solutions using Microsoft Fabric. Covers end-to-end analytics workflows, including lakehouse architecture, data ingestion and transformation, Delta Lake, data pipelines, semantic modeling, Power BI, and real-time analytics.',
    credentialId: '75C9A244BB1367C3',
    certificationNumber: '86Q53B-F328A7',
    dateEarned: 'August 15, 2026',
    expirationDate: 'August 16, 2027',
    skills: [
      'Microsoft Fabric',
      'Data Analytics',
      'Data Engineering',
      'Data Modeling',
      'Power BI',
    ],
    verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/KaviyarasuP/75C9A244BB1367C3',
    image: '/certificates/Microsoft Certified Fabric Analytics Engineer Associate.webp',
    pdfUrl: '/certificates/Microsoft Certified Fabric Analytics Engineer Associate.webp',
  },
  {
    id: 'certificate-3',
    badge: 'Oracle Certified',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    description:
      'Demonstrates foundational expertise in artificial intelligence and machine learning concepts, including generative AI, large language models, AI services, and core AI technologies within Oracle Cloud Infrastructure.',
    credentialId: '1024944150CI25AICFA',
    dateEarned: 'September 01, 2025',
    skills: [
      'Artificial Intelligence',
      'Machine Learning',
      'Generative AI',
      'Large Language Models (LLMs)',
      'Oracle Cloud Infrastructure (OCI)',
    ],
    verifyUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=1024944150CI25AICFA',
    image: '/certificates/Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate_pages-to-jpg-0001.webp',
    pdfUrl: '/certificates/Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate_pages-to-jpg-0001.webp',
  },
  {
    id: 'certificate-4',
    badge: 'TN Skills 2025',
    title: 'TN Skills 2025 – Cloud Computing Competition',
    issuer: 'Tamil Nadu Skill Development Corporation (TNSDC)',
    description:
      'Recognized participation in the TN Skills 2025 Cloud Computing competition, demonstrating practical knowledge and technical competency in cloud computing through progressive Level 1 and Level 2 competition stages.',
    credentialId: 'N/A',
    dateEarned: 'September 2025 – December 2025',
    skills: [
      'Cloud Computing',
      'Cloud Infrastructure',
      'Cloud Services',
      'Cloud Architecture',
      'Technical Problem Solving',
    ],
    verifyUrl: 'https://skilltn.gov.in/verify',
    image: '/certificates/TN Skill Level 1.webp',
    imageLabel: 'Level 1',
    image2: '/certificates/TN  Skill Level 2.webp',
    image2Label: 'Level 2',
    pdfUrl: '/certificates/TN Skill Level 1.webp',
  },
];

/* ──────────────────────── Image component ───────────────────── */
const CertificateImage = ({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label?: string;
}) => {
  const [error, setError] = useState(false);

  return (
    <div className="relative flex-1 min-w-0">
      {label && (
        <span className="absolute top-2.5 left-2.5 z-10 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {label}
        </span>
      )}
      {error ? (
        <div className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-theme-border/60 bg-theme-card flex flex-col items-center justify-center text-center select-none p-4">
          <Award size={36} className="text-theme-accent mb-2 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-theme-text/70">
            {label ?? 'Certificate'}
          </span>
          <span className="text-[9px] text-theme-muted mt-1 leading-relaxed">
            {src}
          </span>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-theme-border/50 shadow-lg transition-transform duration-500 hover:scale-[1.01]">
          <a href={src} target="_blank" rel="noopener noreferrer" title={alt}>
            <img
              src={src}
              alt={alt}
              onError={() => setError(true)}
              className="w-full h-auto object-cover opacity-95 transition-opacity hover:opacity-100"
              loading="lazy"
              draggable={false}
            />
          </a>
        </div>
      )}
    </div>
  );
};

/* ───────────────────────── Section ─────────────────────────── */
const CertificatesSection = () => (
  <section
    id="certificates"
    className="relative z-10 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-theme-bg px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 md:px-10 md:pt-32 transition-colors duration-400"
  >
    <div className="mx-auto max-w-7xl">
      {/* ── Section Title ── */}
      <div className="w-full flex flex-col items-center mb-12 sm:mb-16 lg:mb-24">
        <FadeIn y={30}>
          <h2
            className="hero-heading text-center font-black uppercase tracking-tight leading-none text-theme-text"
            style={{ fontSize: 'clamp(2.3rem, 7vw, 100px)' }}
          >
            Certificates
          </h2>
        </FadeIn>
        <div className="w-32 h-[3px] bg-theme-accent rounded-full mt-3 shadow-[0_0_8px_var(--accent-muted)]" />
      </div>

      {/* ── Cards ── */}
      <div className="flex flex-col gap-10 sm:gap-14 md:gap-16">
        {CERTIFICATES.map((cert, idx) => (
          <FadeIn key={cert.id} delay={idx * 0.1} y={40}>
            <div className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-theme-border/60 bg-theme-card p-6 sm:p-8 lg:p-11 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.04)] hover:border-theme-accent transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                {/* ── Left: Details ── */}
                <div className="lg:col-span-7 flex flex-col gap-5">

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-theme-accent bg-theme-accentMuted/10 px-3 py-1.5 rounded-full border border-theme-accent/20 select-none">
                      {cert.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                      <CheckCircle size={10} className="shrink-0" />
                      Online Verifiable
                    </span>
                    {cert.image2 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-accent/20 bg-theme-accent/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-theme-accent">
                        <LayersIcon size={10} className="shrink-0" />
                        Level 1 &amp; Level 2
                      </span>
                    )}
                  </div>

                  {/* Title + Awarded by + Description */}
                  <div className="flex flex-col gap-1 text-left">
                    <h3 className="font-black uppercase text-theme-text tracking-tight leading-[1.05] text-xl sm:text-2xl">
                      {cert.title}
                    </h3>
                    <p className="text-theme-accent font-semibold text-xs sm:text-sm mt-1">
                      Awarded by {cert.issuer}
                    </p>
                    <p className="font-normal text-theme-muted leading-relaxed text-[11px] sm:text-xs lg:text-sm mt-3">
                      {cert.description}
                    </p>
                  </div>

                  {/* Metadata grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="rounded-xl border border-theme-border/40 bg-theme-bg/30 p-3 sm:p-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-theme-muted/50 block mb-1">
                        Credential ID
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-theme-text select-all">
                        {cert.credentialId}
                      </span>
                    </div>

                    {cert.certificationNumber ? (
                      <div className="rounded-xl border border-theme-border/40 bg-theme-bg/30 p-3 sm:p-4">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-theme-muted/50 block mb-1">
                          Certification Number
                        </span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-theme-text select-all">
                          {cert.certificationNumber}
                        </span>
                      </div>
                    ) : null}

                    <div className="rounded-xl border border-theme-border/40 bg-theme-bg/30 p-3 sm:p-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-theme-muted/50 block mb-1">
                        Date Earned
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-theme-text">
                        {cert.dateEarned}
                      </span>
                    </div>

                    {cert.expirationDate && (
                      <div className="rounded-xl border border-theme-border/40 bg-theme-bg/30 p-3 sm:p-4">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-theme-muted/50 block mb-1">
                          Expiration Date
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-theme-text">
                          {cert.expirationDate}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="text-left">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-theme-text mb-3">
                      Skills Measured &amp; Validated:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1.5 rounded-lg border border-theme-border bg-theme-bg/50 text-[10px] text-theme-text font-medium select-none"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-theme-text/70 bg-theme-text/10 px-6 py-2.5 lg:px-8 lg:py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-theme-text transition hover:bg-theme-text/20 hover:scale-[1.02] active:scale-[0.98] w-full"
                    >
                      Open in New Tab
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={cert.pdfUrl}
                      download={`Kaviyarasu_P_${cert.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-theme-accent bg-theme-accentMuted/15 hover:bg-theme-accent/25 px-6 py-2.5 lg:px-8 lg:py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-theme-accent transition hover:scale-[1.02] active:scale-[0.98] w-full"
                    >
                      Download
                      <Download size={13} />
                    </a>
                  </div>
                </div>

                {/* ── Right: Image(s) ── */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  {cert.image2 ? (
                    /* Grouped: two images side by side */
                    <>
                      <div className="flex gap-3">
                        <CertificateImage
                          src={cert.image}
                          alt={`${cert.title} – ${cert.imageLabel ?? 'Level 1'}`}
                          label={cert.imageLabel ?? 'Level 1'}
                        />
                        <CertificateImage
                          src={cert.image2}
                          alt={`${cert.title} – ${cert.image2Label ?? 'Level 2'}`}
                          label={cert.image2Label ?? 'Level 2'}
                        />
                      </div>
                      <p className="text-center text-theme-muted/50 text-[10px] select-none">
                        🔍 Click any certificate to view in full resolution
                      </p>
                    </>
                  ) : (
                    /* Single image */
                    <>
                      <CertificateImage src={cert.image} alt={cert.title} />
                      <p className="text-center text-theme-muted/50 text-[10px] select-none">
                        🔍 Click certificate to inspect in full resolution
                      </p>
                    </>
                  )}
                </div>

              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default CertificatesSection;
