'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Next-Themes Provider wrapper to enable Client Side theme toggling.
 * Configured to work seamlessly with Tailwind CSS v4 variables in globals.css.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
