'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LogOut, LucideIcon } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { WorkspaceCard } from '@/components/dashboard/WorkspaceCard';
import { APP_CONFIG } from '@/constants/app';
import { cn } from '@/lib/utils';

export interface NavigationGroup {
  title: string;
  items: {
    label: string;
    href: string;
    icon: LucideIcon;
  }[];
}

interface OverlaySidebarProps {
  navigationGroups: NavigationGroup[];
  triggerClassName?: string;
  showWorkspaceCard?: boolean;
  showUserFooter?: boolean;
}

export function OverlaySidebar({
  navigationGroups,
  triggerClassName,
  showWorkspaceCard = false,
  showUserFooter = false,
}: OverlaySidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        triggerClassName
      )}>
        <Menu className="w-5 h-5" />
        <span className="sr-only">Toggle navigation</span>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex flex-col justify-between h-full bg-card border-r border-border/80 dark:border-border/40 max-w-xs">
        <div className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="h-14 shrink-0 border-b border-border/80 dark:border-border/40 flex items-center px-6">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary text-primary-foreground font-extrabold text-sm flex items-center justify-center rounded-lg shadow-sm">
                C
              </div>
              <span className="font-bold tracking-tight text-base text-foreground">
                {APP_CONFIG.name}
              </span>
            </Link>
          </div>

          {showWorkspaceCard && (
            <div className="p-4 border-b border-border/80 dark:border-border/40 shrink-0">
              <WorkspaceCard />
            </div>
          )}

          <nav className="p-3 space-y-4 overflow-y-auto flex-1">
            {navigationGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                <h4 className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 select-none">
                  {group.title}
                </h4>
                {group.items.map((link) => {
                  const Icon = link.icon;
                  // For landing page anchors, we check if pathname is / and href starts with #
                  const isLandingAnchor = link.href.startsWith('#');
                  const isActive = isLandingAnchor 
                    ? false // We could track active section, but false is fine for MVP
                    : (pathname === link.href || (pathname !== '/' && pathname?.startsWith(link.href + '/')));

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-semibold transition-all',
                        isActive
                          ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-muted/40'
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {showUserFooter && (
          <div className="p-4 border-t border-border/80 dark:border-border/40 space-y-3 bg-muted/20 shrink-0">
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
