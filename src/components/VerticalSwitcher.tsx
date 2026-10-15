import { useEffect, useId, useState } from 'react';
import { Users, Zap, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import type { ThemeId } from '../lib/themes';

type Side = Extract<ThemeId, 'talent' | 'ev'>;

interface Option {
  id: Side;
  label: string;
  icon: LucideIcon;
  path: string;
}

const OPTIONS: Option[] = [
  { id: 'talent', label: 'Manpower', icon: Users, path: '/staffing' },
  { id: 'ev', label: 'EV', icon: Zap, path: '/tech-ev' },
];

export default function VerticalSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const uid = useId().replace(/:/g, '');

  const [side, setSide] = useState<Side>(() => {
    if (location.pathname === '/tech-ev') return 'ev';
    if (location.pathname === '/staffing') return 'talent';
    return theme === 'talent' ? 'talent' : 'ev';
  });

  // Sync side & silent theme when route changes
  useEffect(() => {
    if (location.pathname === '/tech-ev') {
      setSide('ev');
      if (theme !== 'ev') {
        setTheme('ev', { silent: true });
      }
    } else if (location.pathname === '/staffing') {
      setSide('talent');
      if (theme !== 'talent') {
        setTheme('talent', { silent: true });
      }
    } else if (theme === 'ev' || theme === 'talent') {
      setSide(theme);
    }
  }, [location.pathname, theme, setTheme]);

  // When user clicks EV or Manpower, directly navigate without flashing old page theme
  const select = (id: Side) => {
    setSide(id);
    const targetPath = id === 'ev' ? '/tech-ev' : '/staffing';
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  return (
    <div
      role="group"
      aria-label="Switch business vertical"
      className={cn(
        'relative inline-grid grid-cols-2 gap-1 rounded-full bg-white/10 p-1 ring-1 ring-inset ring-white/15 backdrop-blur-sm',
        className
      )}
    >
      {OPTIONS.map((opt) => {
        const active = side === opt.id;
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => select(opt.id)}
            aria-pressed={active}
            aria-label={`Switch to ${opt.label} vertical`}
            className={cn(
              'relative flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors duration-200 cursor-pointer',
              active ? 'text-brand-dark' : 'text-white/70 hover:text-white'
            )}
          >
            {active && (
              <motion.span
                layoutId={`vertical-thumb-${uid}`}
                className="absolute inset-0 rounded-full bg-white shadow-md ring-1 ring-black/5"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <Icon className="relative h-3.5 w-3.5" />
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
