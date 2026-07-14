'use client';

import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Hydration-safe Theme Toggler button.
 * Swaps between light and dark theme mode sets on click.
 * Uses Tailwind CSS hidden/block classes to show the correct icon based on active theme
 * (no client-side hydration delays or mounting state needed).
 */
export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-8 h-8 rounded-lg hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="sr-only">Toggle theme</span>
      {/* Sun icon is shown only in dark mode */}
      <Sun className="w-[1.1rem] h-[1.1rem] text-amber-500 transition-transform hover:rotate-45 hidden dark:block" />
      {/* Moon icon is shown only in light mode */}
      <Moon className="w-[1.1rem] h-[1.1rem] text-slate-700 transition-transform hover:-rotate-12 block dark:hidden" />
    </Button>
  );
}
