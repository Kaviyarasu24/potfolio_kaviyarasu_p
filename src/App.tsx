import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import CertificatesSection from './components/CertificatesSection';
import ContactSection from './components/ContactSection';
import FloatingDock from './components/FloatingDock';
import Preloader from './components/Preloader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <main
        className="relative w-full"
        style={{
          overflowX: 'clip',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
      >
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
        <FloatingDock />
      </main>
    </>
  );
};

export default App;
