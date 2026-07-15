'use client';

import * as React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { OverlaySidebar } from '@/components/shared/OverlaySidebar';
import { LANDING_NAVIGATION, WORKSPACE_NAVIGATION } from '@/constants/navigation';
import { cn } from '@/lib/utils';

export function LandingHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md transition-all duration-200',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left Side: Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <OverlaySidebar
            navigationGroups={[
              { title: 'Platform', items: LANDING_NAVIGATION },
              { title: 'Workspace', items: WORKSPACE_NAVIGATION }
            ]}
            showWorkspaceCard={false}
            showUserFooter={false}
          />
          <Logo />
        </div>

        {/* Right Side: Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
        
      </div>
    </header>
  );
}
