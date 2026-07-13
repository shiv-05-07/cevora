'use client';

import { useTheme as useNextTheme } from 'next-themes';

/**
 * Custom hook to interact with the active theme state.
 * Simplifies operations like checking if dark mode is active or toggling.
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    resolvedTheme,
    isDarkMode: resolvedTheme === 'dark',
    setTheme,
    toggleTheme,
  };
}
