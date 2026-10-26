import { useReducedMotion } from 'motion/react';

interface FloatingOrbProps {
  /** Tailwind position classes, e.g. "top-0 right-0" or "-top-40 -left-32". */
  className?: string;
  /** Diameter in px. */
  size?: number;
  /** Tailwind bg class for the orb color, e.g. "bg-brand-light/10". */
  colorClass?: string;
  /** Tailwind blur class, e.g. "blur-[120px]". */
  blurClass?: string;
  /** Animation delay so multiple orbs desync. */
  delay?: number;
}

/**
 * Ambient blurred orb that slowly floats — adds life to dark sections/heroes.
 * Decorative only (pointer-events-none, aria-hidden).
 * Renders as a static orb when the user prefers reduced motion.
 */
export default function FloatingOrb({
  className = '',
  size = 480,
  colorClass = 'bg-brand-light/10',
  blurClass = 'blur-[120px]',
  delay = 0,
}: FloatingOrbProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`absolute rounded-full pointer-events-none ${colorClass} ${blurClass} ${className}`}
      style={{
        width: size,
        height: size,
        animation: reduceMotion
          ? undefined
          : `float-orb ${9 + (delay % 4)}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}
