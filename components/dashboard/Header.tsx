'use client';

import * as React from 'react';
import { OverlaySidebar } from '@/components/shared/OverlaySidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { GlobalSearch } from './GlobalSearch';
import { NotificationDropdown } from './NotificationDropdown';
import { UserMenu } from './UserMenu';
import { cn } from '@/lib/utils';
import { MAIN_NAVIGATION } from '@/constants/navigation';

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 h-14 w-full border-b border-border/80 bg-background/80 backdrop-blur-md dark:border-border/40 select-none flex items-center justify-between px-4 sm:px-6 transition-colors duration-200',
        className
      )}
    >
      {/* Left side: Hamburger (Mobile Only) & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile Navigation Drawer Trigger */}
        <OverlaySidebar
          triggerClassName="md:hidden"
          navigationGroups={[
            { title: '', items: MAIN_NAVIGATION }
          ]}
          showWorkspaceCard={true}
          showUserFooter={true}
        />

        {/* Dynamic Breadcrumbs */}
        <Breadcrumbs />
      </div>

      {/* Right side: Global Search, Notification bell, User profile */}
      <div className="flex items-center gap-3">
        {/* Global Search Component */}
        <GlobalSearch />

        {/* Separation line on Desktop */}
        <div className="hidden sm:block h-4 w-[1px] bg-border/80 dark:bg-border/40" />

        {/* Notifications Dropdown */}
        <NotificationDropdown />

        {/* User Menu Profile Dropdown */}
        <UserMenu />
      </div>
    </header>
  );
}
