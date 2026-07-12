import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const Char = ({ char, index, total, progress }: CharProps) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0.2 }}>{char}</span>
      <motion.span
        style={{
          opacity,
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
        }}
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
};

const AnimatedText = ({ text, className, style }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Split into words to preserve natural line-wrapping at word boundaries.
  // Build a flat list of characters (excluding trailing space of last word)
  // so totalChars exactly matches the highest index used.
  const words = text.split(' ');
  const chars: { char: string; globalIndex: number }[][] = [];
  let runningIndex = 0;

  words.forEach((word, wi) => {
    const wordChars = Array.from(word).map((ch, ci) => ({
      char: ch,
      globalIndex: runningIndex + ci,
    }));
    chars.push(wordChars);
    // Only add +1 for the space if this is NOT the last word
    runningIndex += wordChars.length + (wi < words.length - 1 ? 1 : 0);
  });

  const totalChars = runningIndex; // exact count, no trailing +1

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((_, wi) => (
        <span
          key={wi}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {chars[wi].map(({ char, globalIndex }) => (
            <Char
              key={globalIndex}
              char={char}
              index={globalIndex}
              total={totalChars}
              progress={scrollYProgress}
            />
          ))}
          {wi < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </p>
  );
};

export default AnimatedText;
