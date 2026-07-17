'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { APP_CONFIG } from '@/constants/app';
import { useSidebar } from '@/providers/SidebarProvider';
import { useWorkspace } from '@/providers/WorkspaceProvider';
import { MAIN_NAVIGATION } from '@/constants/navigation';
import { WorkspaceCard } from './WorkspaceCard';
import { SidebarNavItem } from './SidebarNavItem';
import { ThemeToggle } from './ThemeToggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CevoraLogo } from '@/components/shared/CevoraLogo';
import { cn } from '@/lib/utils';

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { isExpanded, toggle } = useSidebar();
  const { role } = useWorkspace();

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 bg-card border-r border-border/80 dark:border-border/40 select-none transition-all duration-300 ease-in-out',
        isExpanded ? 'w-64' : 'w-16',
        className
      )}
    >
      {/* Top Header Logo */}
      <div className="h-14 border-b border-border/80 dark:border-border/40 flex items-center px-4 justify-between overflow-hidden">
        <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none">
          <CevoraLogo iconOnly={!isExpanded} size="medium" />
        </Link>

        {isExpanded && (
          <button
            onClick={toggle}
            className="w-5 h-5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center border border-border/40 active:scale-95 transition-all"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Static Workspace Card */}
      <div className={cn('p-3 border-b border-border/80 dark:border-border/40 flex justify-center', !isExpanded && 'px-1')}>
        {isExpanded ? (
          <WorkspaceCard />
        ) : (
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors"
            title="Expand Sidebar"
          >
            <Building2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-1 scrollbar-none">
        {MAIN_NAVIGATION.map((link) => {
          const isLandingAnchor = link.href.startsWith('#');
          const isActive = isLandingAnchor 
            ? false
            : (pathname === link.href || (pathname !== '/' && pathname?.startsWith(link.href + '/')));
          return (
            <SidebarNavItem
              key={link.label}
              label={link.label}
              href={link.href}
              icon={link.icon}
              isExpanded={isExpanded}
              isActive={isActive}
            />
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-border/80 dark:border-border/40 space-y-2.5 bg-card/50">
        <div className={cn('flex items-center justify-between gap-2', !isExpanded && 'flex-col items-center')}>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 shrink-0 select-none">
              <AvatarFallback className="text-xs uppercase font-semibold">JD</AvatarFallback>
            </Avatar>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="leading-none text-left"
              >
                <p className="text-xs font-bold text-foreground">John Doe</p>
                <p className="text-[9px] text-muted-foreground capitalize font-medium">{role}</p>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            {!isExpanded && (
              <button
                onClick={toggle}
                className="w-8 h-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center active:scale-95 transition-all"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {isExpanded && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg py-2 px-2.5 text-xs sm:text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  );
}
