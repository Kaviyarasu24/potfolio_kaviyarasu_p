import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [textVisible, setTextVisible] = useState(true);

  // Lock body scrolling when mounted, restore when unmounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Timer lifecycle for the loader
  useEffect(() => {
    // Snappy fade out of loading text
    const textTimer = setTimeout(() => {
      setTextVisible(false);
    }, 450);

    // Snappy completion of loader after 700ms total
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const text = 'LOADING';
  const letters = text.split('');

  // Framer Motion variant configuration for text stagger reveal
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  } as any;

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 18,
      },
    },
  } as any;

  // Top panel wave morph variants
  const pathVariantsTop = {
    initial: {
      d: 'M0 0 L1440 0 C1080 100, 360 100, 0 0 Z',
    },
    exit: {
      d: 'M0 0 L1440 0 C1080 0, 360 0, 0 0 Z',
      transition: {
        duration: 0.55,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
  };

  // Bottom panel wave morph variants
  const pathVariantsBottom = {
    initial: {
      d: 'M0 100 L1440 100 C1080 0, 360 0, 0 100 Z',
    },
    exit: {
      d: 'M0 100 L1440 100 C1080 100, 360 100, 0 100 Z',
      transition: {
        duration: 0.55,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <>
      {/* Loading Text Overlay - Positioned vertically centered, spreading edge-to-edge horizontally */}
      <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-[10000] pointer-events-none select-none">
        <AnimatePresence>
          {textVisible && (
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit={{ 
                opacity: 0, 
                y: -25,
                transition: { duration: 0.4, ease: 'easeInOut' }
              }}
              className="w-full flex justify-between px-6 sm:px-12 md:px-16"
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="font-kanit font-black text-[12vw] sm:text-[11vw] md:text-[10vw] leading-none uppercase tracking-tighter text-[#FFFDF7] drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top Split Panel (slides up) */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: '-50vh' }}
        transition={{
          duration: 0.55,
          ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        }}
        className="fixed top-0 left-0 w-full h-[50vh] bg-theme-text z-[9999] pointer-events-none select-none"
      >
        <svg
          className="absolute top-full left-0 w-full h-[100px] fill-theme-text pointer-events-none"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <motion.path
            variants={pathVariantsTop}
            initial="initial"
            exit="exit"
          />
        </svg>
      </motion.div>

      {/* Bottom Split Panel (slides down) */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: '50vh' }}
        transition={{
          duration: 0.55,
          ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        }}
        className="fixed bottom-0 left-0 w-full h-[50vh] bg-theme-text z-[9999] pointer-events-none select-none"
      >
        <svg
          className="absolute bottom-full left-0 w-full h-[100px] fill-theme-text pointer-events-none"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <motion.path
            variants={pathVariantsBottom}
            initial="initial"
            exit="exit"
          />
        </svg>
      </motion.div>
    </>
  );
};

export default Preloader;
