'use client';

import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <Sun className="w-[1.1rem] h-[1.1rem] text-amber-500 transition-transform hover:rotate-45 hidden dark:block" />
      <Moon className="w-[1.1rem] h-[1.1rem] text-slate-700 transition-transform hover:-rotate-12 block dark:hidden" />
    </Button>
  );
}
