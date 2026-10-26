import { useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';

const coarsePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Keep small (3–8) for large panels. */
  maxTilt?: number;
  /** Lift on hover, in px. */
  lift?: number;
  /** Cursor-following radial sheen. */
  sheen?: boolean;
  scale?: number;
  /** Removes the element from the a11y tree and hit-testing when true. */
  inert?: boolean;
}

/**
 * Pointer-driven 3D tilt + cursor-following sheen.
 * Pure interaction wrapper — pair with ScrollReveal/stagger for entrance.
 * Ignored on touch devices.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  lift = 6,
  sheen = true,
  scale = 1.01,
  inert = false,
}: TiltCardProps) {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springConfig);

  const handleEnter = () => {
    if (reduceMotion || coarsePointer) return;
    setActive(true);
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || coarsePointer) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx);
    py.set(ny);
    if (sheen) {
      e.currentTarget.style.setProperty('--sheen-x', `${(nx * 100).toFixed(1)}%`);
      e.currentTarget.style.setProperty('--sheen-y', `${(ny * 100).toFixed(1)}%`);
    }
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    setActive(false);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full" inert={inert}>
      <motion.div
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        animate={{
          rotateX: active ? rotateX : 0,
          rotateY: active ? rotateY : 0,
          y: active ? -lift : 0,
          scale: active ? scale : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: active ? 'transform' : 'auto',
        }}
        className={`relative h-full ${className}`}
      >
        {sheen && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(420px circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(255,255,255,0.20), transparent 65%)',
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}
