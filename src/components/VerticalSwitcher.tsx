import { useId, useState, useEffect } from 'react';
import { Users, Zap, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

type Side = 'talent' | 'ev';

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

export default function VerticalSwitcher({
  className,
  idPrefix = 'desktop',
}: {
  className?: string;
  idPrefix?: string;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const reactUid = useId().replace(/:/g, '');
  const uid = `${idPrefix}-${reactUid}`;

  const currentRouteSide: Side | null =
    location.pathname === '/tech-ev'
      ? 'ev'
      : location.pathname === '/staffing'
      ? 'talent'
      : null;

  const [optimisticSide, setOptimisticSide] = useState<Side | null>(currentRouteSide);

  // Sync optimistic side with route if user navigates via other links (e.g. navbar or footer)
  useEffect(() => {
    setOptimisticSide(currentRouteSide);
  }, [currentRouteSide]);

  const activeSide = optimisticSide;

  const select = (opt: Option) => {
    setOptimisticSide(opt.id);
    if (location.pathname !== opt.path) {
      navigate(opt.path);
    }
  };

  return (
    <div
      role="group"
      aria-label="Switch business vertical"
      className={cn(
        'relative inline-grid grid-cols-2 gap-1 rounded-full bg-white/10 p-1 ring-1 ring-inset ring-white/15 backdrop-blur-md select-none',
        className
      )}
    >
      {OPTIONS.map((opt) => {
        const active = activeSide === opt.id;
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => select(opt)}
            aria-pressed={active}
            aria-label={`Switch to ${opt.label} vertical`}
            className={cn(
              'relative flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs transition-colors duration-150 cursor-pointer active:scale-[0.96]',
              active
                ? 'text-brand-dark font-extrabold'
                : 'text-white/80 hover:text-white font-semibold'
            )}
          >
            {active && (
              <motion.span
                layoutId={`vertical-thumb-${uid}`}
                className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-black/5"
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 30,
                  mass: 0.7,
                }}
              />
            )}
            <Icon className="relative z-10 h-3.5 w-3.5 transition-transform duration-150" />
            <span className="relative z-10 tracking-tight">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
