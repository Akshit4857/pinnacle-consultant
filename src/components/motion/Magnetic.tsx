import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0.1–0.5 typical). */
  strength?: number;
  /** Scale up while hovered. */
  hoverScale?: number;
}

/**
 * Magnetic hover — the wrapper eases toward the cursor.
 * Wrap buttons / small CTAs only (not full-width elements).
 * Ignored on touch devices.
 */
export default function Magnetic({ children, className = '', strength = 0.12, hoverScale = 1.02 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block relative z-0 hover:z-10 ${className}`}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: hoverScale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={(e) => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const rawX = (e.clientX - (r.left + r.width / 2)) * strength;
        const rawY = (e.clientY - (r.top + r.height / 2)) * strength;
        // Strict clamp to prevent overlapping adjacent buttons/elements
        const clampedX = Math.max(-8, Math.min(8, rawX));
        const clampedY = Math.max(-8, Math.min(8, rawY));
        x.set(clampedX);
        y.set(clampedY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
