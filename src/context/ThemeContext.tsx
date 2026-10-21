import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import type { ThemeId } from '../lib/themes';

interface ThemeContextValue {
  theme: ThemeId;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'prime',
});

/**
 * Returns the distinct theme assigned to a route:
 * - EV pages -> 'ev' (EV Drive)
 * - Manpower pages -> 'talent' (Talent Pro)
 * - All other pages -> 'prime' (Pinnacle Prime)
 */
export function getThemeForPath(pathname: string): ThemeId {
  if (pathname === '/tech-ev') return 'ev';
  if (pathname === '/staffing') return 'talent';
  return 'prime';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const theme = getThemeForPath(location.pathname);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
