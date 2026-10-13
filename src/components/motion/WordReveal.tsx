import { motion, type HTMLMotionProps } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

interface WordRevealProps extends Omit<HTMLMotionProps<'h2'>, 'children'> {
  text: string;
  className?: string;
  delay?: number;
  /** Stagger between words, in seconds. */
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Word-by-word masked reveal on scroll — heading rises out of an invisible slot.
 * Use on plain-text headings (no nested accent spans).
 */
export default function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  as = 'h2',
  ...props
}: WordRevealProps) {
  const words = text.split(' ');
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      {...props}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
