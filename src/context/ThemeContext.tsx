import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  DEFAULT_THEME,
  MODE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  migrateThemeId,
  type ThemeId,
  type ThemeMode,
} from '../lib/themes';

interface ThemeContextValue {
  theme: ThemeId;
  mode: ThemeMode;
  setTheme: (theme: ThemeId) => void;
  setMode: (mode: ThemeMode) => void;
  /** Increments on every user-initiated theme/mode change (0 = initial load). */
  transitionId: number;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  mode: 'light',
  setTheme: () => {},
  setMode: () => {},
  transitionId: 0,
});

function readInitialTheme(): ThemeId {
  if (typeof document !== 'undefined') {
    const migrated = migrateThemeId(document.documentElement.getAttribute('data-theme'));
    if (migrated) return migrated;
  }
  return DEFAULT_THEME;
}

function readInitialMode(): ThemeMode {
  if (typeof document !== 'undefined' && document.documentElement.getAttribute('data-mode') === 'dark') {
    return 'dark';
  }
  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readInitialTheme);
  const [mode, setModeState] = useState<ThemeMode>(readInitialMode);
  const [transitionId, setTransitionId] = useState(0);
  const prevThemeRef = useRef(theme);
  const prevModeRef = useRef(mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage unavailable */
    }
    if (prevThemeRef.current !== theme) {
      prevThemeRef.current = theme;
      setTransitionId((id) => id + 1);
    }
  }, [theme]);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-mode', 'dark');
    } else {
      document.documentElement.removeAttribute('data-mode');
    }
    try {
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      /* storage unavailable */
    }
    if (prevModeRef.current !== mode) {
      prevModeRef.current = mode;
      setTransitionId((id) => id + 1);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{ theme, mode, setTheme: setThemeState, setMode: setModeState, transitionId }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
