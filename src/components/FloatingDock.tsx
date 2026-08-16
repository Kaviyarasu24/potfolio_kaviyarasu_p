import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, GraduationCap, Briefcase, Code, MessageSquare, Sun, Moon } from 'lucide-react';

interface FloatingDockProps {
  theme: 'cream' | 'obsidian';
  toggleTheme: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
];

const FloatingDock = ({ theme, toggleTheme }: FloatingDockProps) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check each section element
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-theme-border/60 bg-theme-card/75 px-4 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-lg md:px-5 md:py-3 transition-colors duration-300"
      >
        {/* Navigation Items */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full transition-transform active:scale-95 sm:h-11 sm:w-11"
              >
                {/* Active highlight */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockIndicator"
                    className="absolute inset-0 rounded-full bg-theme-accent shadow-lg"
                    style={{
                      boxShadow: theme === 'obsidian' 
                        ? '0 0 15px rgba(6, 182, 212, 0.45)' 
                        : '0 0 12px rgba(244, 185, 66, 0.35)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Icon wrapper */}
                <Icon
                  size={19}
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#17130D]' // Black text on active background
                      : theme === 'obsidian'
                      ? 'text-zinc-400 hover:text-[#06B6D4]'
                      : 'text-[#17130D]/50 hover:text-[#F4B942]'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                {/* Tooltip helper */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-lg border border-theme-border/60 bg-theme-card px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-theme-text shadow-lg whitespace-nowrap"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </a>
            );
          })}
        </div>

        {/* Separator vertical line */}
        <div className="h-6 w-px bg-theme-border/75" />

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          onMouseEnter={() => setHoveredItem('theme')}
          onMouseLeave={() => setHoveredItem(null)}
          className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-transform active:scale-95 sm:h-11 sm:w-11 ${
            theme === 'obsidian'
              ? 'text-yellow-400 hover:bg-zinc-800/50'
              : 'text-[#5F4A24] hover:bg-[#F4B942]/10'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'obsidian' ? <Sun size={20} /> : <Moon size={20} />}

          {/* Tooltip for theme */}
          <AnimatePresence>
            {hoveredItem === 'theme' && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-lg border border-theme-border/60 bg-theme-card px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-theme-text shadow-lg whitespace-nowrap"
              >
                {theme === 'obsidian' ? 'Cream Mode' : 'Obsidian Mode'}
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </div>
  );
};

export default FloatingDock;
