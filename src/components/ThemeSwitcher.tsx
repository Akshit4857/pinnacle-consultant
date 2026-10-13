import { useEffect, useRef, useState } from 'react';
import { Palette, Check, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { THEMES } from '../lib/themes';
import { cn } from '../lib/utils';

interface ThemeSwitcherProps {
  inline?: boolean;
}

export default function ThemeSwitcher({ inline = false }: ThemeSwitcherProps) {
  const { theme, mode, setTheme, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={cn(
        inline ? 'relative inline-block' : 'fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40'
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: inline ? -10 : 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: inline ? -10 : 12, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={cn(
              'w-64 rounded-2xl border border-brand-edge bg-brand-card/95 p-2 shadow-2xl backdrop-blur-lg z-50',
              inline ? 'absolute top-full right-0 mt-2' : 'absolute bottom-full left-0 mb-3'
            )}
            role="menu"
            aria-label="Choose color theme"
          >
            <div className="flex items-center justify-between px-3 pt-2 pb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                Color Theme
              </span>
              <div className="flex items-center rounded-full bg-brand-tint-2 p-0.5" role="group" aria-label="Light or dark mode">
                <button
                  onClick={() => setMode('light')}
                  aria-label="Light mode"
                  aria-pressed={mode === 'light'}
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full transition-colors',
                    mode === 'light' ? 'bg-brand-light text-brand-onaccent shadow-sm' : 'text-brand-muted hover:text-brand-ink'
                  )}
                >
                  <Sun className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setMode('dark')}
                  aria-label="Dark mode"
                  aria-pressed={mode === 'dark'}
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full transition-colors',
                    mode === 'dark' ? 'bg-brand-dark text-brand-light shadow-sm' : 'text-brand-muted hover:text-brand-ink'
                  )}
                >
                  <Moon className="h-3 w-3" />
                </button>
              </div>
            </div>
            {THEMES.map((t) => {
              const active = theme === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  role="menuitemradio"
                  aria-checked={active}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                    active ? 'bg-brand-tint-2' : 'hover:bg-brand-tint-1/60'
                  )}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: t.dark }}
                  >
                    <Icon className="h-4 w-4" style={{ color: t.light }} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className={cn(
                        'block text-sm font-bold leading-tight',
                        active ? 'text-brand-ink' : 'text-brand-ink/85'
                      )}
                    >
                      {t.name}
                    </span>
                    <span className="block text-[11px] font-medium text-brand-muted leading-tight mt-0.5">
                      {t.blurb}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center -space-x-1">
                    <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: t.dark }} />
                    <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: t.light }} />
                    <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: t.bg }} />
                  </span>
                  {active && <Check className="h-4 w-4 shrink-0 text-brand-light-2" aria-hidden />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          inline
            ? 'flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-brand-onaccent text-xs font-bold transition-all'
            : 'group flex h-12 w-12 items-center justify-center rounded-full border border-brand-edge bg-brand-light text-brand-onaccent shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-brand-card hover:shadow-[0_0_32px_var(--color-brand-light)]'
        )}
        aria-label="Change color theme"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Palette
          className={cn(
            inline ? 'h-3.5 w-3.5' : 'h-5 w-5',
            'transition-transform duration-300',
            open ? 'rotate-90 scale-110' : 'group-hover:rotate-12'
          )}
        />
        {inline && <span>Theme</span>}
      </button>
    </div>
  );
}
