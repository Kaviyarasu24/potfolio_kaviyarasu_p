import { useState } from 'react';
import { Award, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface Certificate {
  id: string;
  badge: string;
  title: string;
  issuer: string;
  description: string;
  credentialId: string;
  dateEarned: string;
  skills: string[];
  verifyUrl: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'google-analytics',
    badge: 'GOOGLE PROFESSIONAL CREDENTIAL',
    title: 'Google Advanced Data Analytics Professional Certificate',
    issuer: 'Google Corporation (via Coursera)',
    description: 'Advanced professional mastery in end-to-end data analytics pipelines. Covers Python-based scripting, exploratory data analysis (EDA), regression models, machine learning algorithms, and high-performance visualization systems.',
    credentialId: 'GADA-9371-X29',
    dateEarned: 'January 2025',
    skills: ['Python', 'EDA', 'Regression Analysis', 'Machine Learning', 'Data Visualization', 'Pandas & NumPy'],
    verifyUrl: 'https://coursera.org/verify/professional-cert/google-advanced-data-analytics',
  },
  {
    id: 'microsoft-powerbi',
    badge: 'MICROSOFT CERTIFIED GLOBAL CREDENTIAL',
    title: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
    issuer: 'Microsoft Corporation',
    description: 'Enterprise validation for designing, building, and deploying professional business intelligence reports. Covers Power Query data ingestion, DAX semantic modeling, row-level security (RLS), and collaborative workspaces.',
    credentialId: 'PL300-8472-Y12',
    dateEarned: 'March 2025',
    skills: ['Power BI', 'DAX', 'Data Modeling', 'Power Query', 'Dashboard Design', 'Row-Level Security'],
    verifyUrl: 'https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst-associate',
  },
  {
    id: 'deeplearning-llm',
    badge: 'DEEPLEARNING.AI VALIDATED CREDENTIAL',
    title: 'Generative AI with Large Language Models',
    issuer: 'DeepLearning.AI (via Coursera)',
    description: 'Advanced specialization in generative AI systems and transformers. Covers LLM fine-tuning techniques (PEFT/LoRA), reinforcement learning from human feedback (RLHF), and high-efficiency model orchestration.',
    credentialId: 'DL-GENAI-1982-Z05',
    dateEarned: 'June 2025',
    skills: ['Generative AI', 'LLMs', 'LoRA & PEFT', 'RLHF', 'Transformers', 'Model Evaluation'],
    verifyUrl: 'https://coursera.org/verify/generative-ai-with-llms',
  }
];

const CertificatesSection = () => {
  const [activeId, setActiveId] = useState(CERTIFICATES[0].id);
  const activeCert = CERTIFICATES.find(c => c.id === activeId) || CERTIFICATES[0];

  return (
    <section id="certificates" className="relative z-10 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-theme-bg px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 md:px-10 md:pt-32 transition-colors duration-400">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="w-full flex flex-col items-center mb-10 sm:mb-14 lg:mb-20">
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

        {/* Dual Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch min-h-[500px]">
          
          {/* Left: Certificate Navigation Cards */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4 justify-center">
            {CERTIFICATES.map((cert) => {
              const isActive = cert.id === activeId;
              return (
                <button
                  key={cert.id}
                  onClick={() => setActiveId(cert.id)}
                  className={`group flex items-start gap-4 text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 w-full ${
                    isActive
                      ? 'bg-theme-card border-theme-border/60 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.03)]'
                      : 'bg-theme-card/30 border-transparent hover:bg-theme-card/60'
                  }`}
                >
                  <div className={`p-2 rounded-xl border transition-colors ${
                    isActive 
                      ? 'bg-theme-accent/10 border-theme-accent/30 text-theme-accent' 
                      : 'bg-theme-card border-theme-border/20 text-theme-muted/50 group-hover:text-theme-muted'
                  }`}>
                    <Award size={20} />
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <span className={`font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase ${
                      isActive ? 'text-theme-accent' : 'text-theme-muted/50'
                    }`}>
                      {cert.issuer}
                    </span>
                    <h3 className={`font-black text-sm sm:text-base uppercase tracking-tight leading-snug transition-colors duration-300 ${
                      isActive ? 'text-theme-text' : 'text-theme-text/60 group-hover:text-theme-text'
                    }`}>
                      {cert.title}
                    </h3>
                  </div>

                  <ArrowRight size={16} className={`mt-2 shrink-0 transition-transform ${
                    isActive ? 'translate-x-1 text-theme-accent' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-theme-muted/50'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Certificate Card View */}
          <div className="w-full lg:w-[55%] flex flex-col justify-between rounded-[24px] sm:rounded-[32px] border border-theme-border/60 bg-theme-card p-6 sm:p-8 lg:p-10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-6">
              
              {/* Header tags */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-theme-accent bg-theme-accentMuted/10 px-3 py-1.5 rounded-full border border-theme-accent/20 select-none">
                  {activeCert.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  <CheckCircle size={12} />
                  Verified Active
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2.5 text-left">
                <h3 className="font-black uppercase text-theme-text tracking-tight leading-none text-xl sm:text-2xl lg:text-3.5xl">
                  {activeCert.title}
                </h3>
                <p className="text-theme-muted font-mono text-[10px] sm:text-xs">
                  Awarded by: {activeCert.issuer}
                </p>
                <p className="font-normal text-theme-muted leading-relaxed text-[11px] sm:text-xs lg:text-sm mt-2">
                  {activeCert.description}
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-theme-border/40 bg-theme-bg/30 p-3 sm:p-4 text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-theme-muted/50 block mb-1">
                    Credential ID
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-theme-text select-all">
                    {activeCert.credentialId}
                  </span>
                </div>
                <div className="rounded-xl border border-theme-border/40 bg-theme-bg/30 p-3 sm:p-4 text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-theme-muted/50 block mb-1">
                    Date Awarded
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-theme-text">
                    {activeCert.dateEarned}
                  </span>
                </div>
              </div>

              {/* Skills Validated */}
              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-widest text-theme-text mb-3">
                  Skills Measured & Validated:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeCert.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1.5 rounded-lg border border-theme-border bg-theme-bg/50 text-[10px] text-theme-text font-medium select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Verify Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full">
              <a
                href={activeCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-theme-text/25 bg-theme-text/5 px-6 py-2.5 lg:px-8 lg:py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-theme-text transition hover:bg-theme-text/10 hover:scale-[1.02] active:scale-[0.98] w-full text-center"
              >
                Verify Credential
                <ExternalLink size={14} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
