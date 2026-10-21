import { Zap, Users, Cpu, BarChart3, Award, type LucideIcon } from 'lucide-react';

export type ThemeId = 'ev' | 'talent' | 'industry' | 'intel' | 'prime';
export type ThemeMode = 'light' | 'dark';

export interface Theme {
  id: ThemeId;
  name: string;
  blurb: string;
  icon: LucideIcon;
  dark: string;
  light: string;
  bg: string;
}

export const THEMES: Theme[] = [
  {
    id: 'ev',
    name: 'EV Drive',
    blurb: 'Charging-network emerald',
    icon: Zap,
    dark: '#003D4C',
    light: '#45D69B',
    bg: '#F2FAF6',
  },
  {
    id: 'talent',
    name: 'Talent Pro',
    blurb: 'Workforce trust blue',
    icon: Users,
    dark: '#0F1941',
    light: '#4C8DFF',
    bg: '#F3F6FC',
  },
  {
    id: 'industry',
    name: 'Industry 4.0',
    blurb: 'Automation blaze amber',
    icon: Cpu,
    dark: '#2E1409',
    light: '#FF7A1A',
    bg: '#FFF7F0',
  },
  {
    id: 'intel',
    name: 'Market Intel',
    blurb: 'Research-grade violet',
    icon: BarChart3,
    dark: '#251558',
    light: '#A18BFA',
    bg: '#F7F5FF',
  },
  {
    id: 'prime',
    name: 'Pinnacle Prime',
    blurb: 'Champagne & midnight gold',
    icon: Award,
    dark: '#1B1730',
    light: '#EBCA7E',
    bg: '#FBF9F4',
  },
];

/** Old theme ids → new vertical ids (keeps saved user preferences working). */
export const THEME_MIGRATION: Record<string, ThemeId> = {
  forest: 'ev',
  ocean: 'talent',
  sunset: 'industry',
  royal: 'intel',
  crimson: 'prime',
};

export function migrateThemeId(value: string | null | undefined): ThemeId | null {
  if (!value) return null;
  if (value in THEME_MIGRATION) return THEME_MIGRATION[value];
  if (value === 'ev' || value === 'talent' || value === 'industry' || value === 'intel' || value === 'prime') {
    return value;
  }
  return null;
}

export const DEFAULT_THEME: ThemeId = 'prime';
export const THEME_STORAGE_KEY = 'pc-theme';
export const MODE_STORAGE_KEY = 'pc-mode';
