import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import FloatingDock from './components/FloatingDock';

const App = () => {
  const [theme, setTheme] = useState<'cream' | 'obsidian'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      return (saved as 'cream' | 'obsidian') || 'cream';
    }
    return 'cream';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'cream' ? 'obsidian' : 'cream'));
  };

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <main
      className={`relative w-full ${theme === 'obsidian' ? 'theme-obsidian' : ''}`}
      style={{
        overflowX: 'clip',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <FloatingDock theme={theme} toggleTheme={toggleTheme} />
    </main>
  );
};

export default App;
