import { useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

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
}: TiltCardProps) {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springConfig);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx);
    py.set(ny);
    setPos({ x: nx * 100, y: ny * 100 });
    setActive(true);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    setActive(false);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        animate={{
          rotateX: active ? rotateX : 0,
          rotateY: active ? rotateY : 0,
          y: active ? -lift : 0,
          scale: active ? scale : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        {sheen && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.20), transparent 65%)`,
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}
