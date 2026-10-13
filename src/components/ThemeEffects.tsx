import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { THEMES } from '../lib/themes';

/**
 * Global theme feedback effects:
 * 1. Paint-wipe — an accent-colored circle splashes out from the switcher
 *    corner, momentarily covers the screen, then dissolves into the new theme.
 * 2. Toast — a small pill confirms which theme was applied.
 */
export default function ThemeEffects() {
  const { theme, mode, transitionId } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  useEffect(() => {
    if (transitionId === 0) return;
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 2000);
    return () => clearTimeout(timer);
  }, [transitionId]);

  return (
    <>
      {/* Paint-wipe splash */}
      <AnimatePresence>
        {transitionId > 0 && (
          <motion.div
            key={`wipe-${transitionId}`}
            className="pointer-events-none fixed inset-0 z-[100]"
            aria-hidden
          >
            <motion.div
              className="absolute rounded-full bg-brand-light"
              style={{ left: 48, bottom: 48, height: 96, width: 96, x: '-50%', y: '50%' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 55, 55], opacity: [1, 1, 0] }}
              transition={{ duration: 0.85, times: [0, 0.55, 1], ease: [0.65, 0, 0.35, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme-applied toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key={`toast-${transitionId}`}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 md:bottom-8"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3 rounded-full border border-brand-edge bg-brand-card/90 px-5 py-2.5 shadow-2xl backdrop-blur-lg">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ backgroundColor: active.dark }}
              >
                <active.icon className="h-3.5 w-3.5" style={{ color: active.light }} />
              </span>
              <span className="text-sm font-bold text-brand-ink">{active.name}</span>
              <span className="text-xs font-medium text-brand-muted">{active.blurb}</span>
              <span className="rounded-full bg-brand-tint-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-light-2">
                {mode}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
