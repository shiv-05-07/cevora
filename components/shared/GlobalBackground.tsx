'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function GlobalBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Don't render anything on server to prevent flash
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none transition-opacity duration-500">
      {/* Fallback gradients if images fail or haven't loaded */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 ease-in-out bg-gradient-to-br from-blue-50 to-purple-50"
        style={{ opacity: isDark ? 0 : 1 }}
      />
      <div 
        className="absolute inset-0 transition-opacity duration-500 ease-in-out bg-gradient-to-br from-slate-900 via-indigo-950 to-black"
        style={{ opacity: isDark ? 1 : 0 }}
      />

      {/* Light Mode Image */}
      <Image
        src="/bg-light.png"
        alt="Light Theme Background"
        fill
        quality={90}
        priority
        className="object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity: isDark ? 0 : 1 }}
      />
      
      {/* Dark Mode Image */}
      <Image
        src="/bg-dark.png"
        alt="Dark Theme Background"
        fill
        quality={90}
        priority
        className="object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity: isDark ? 1 : 0 }}
      />

      {/* Overlays to ensure text readability */}
      <div 
        className="absolute inset-0 transition-colors duration-700 ease-in-out"
        style={{ 
          backgroundColor: isDark ? 'rgba(10, 10, 20, 0.6)' : 'rgba(255, 255, 255, 0.6)' 
        }}
      />
    </div>
  );
}
