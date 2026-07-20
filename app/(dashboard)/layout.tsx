'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider } from '@/providers/SidebarProvider';
import { WorkspaceProvider } from '@/providers/WorkspaceProvider';
import { AppShell } from '@/components/dashboard/AppShell';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useCevoraAuth } from '@/hooks/useCevoraAuth';

/**
 * Route guard: if the user is not logged in and the path starts with /dashboard,
 * redirect them to /login. Uses isLoaded to avoid acting before localStorage is read.
 */
function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoaded, isLoggedIn } = useCevoraAuth();

  React.useEffect(() => {
    if (!isLoaded) return;
    if (!isLoggedIn && pathname.startsWith('/')) {
      router.replace('/login');
    }
  }, [isLoaded, isLoggedIn, pathname, router]);

  // Show nothing until auth state is resolved (prevents flash of dashboard)
  if (!isLoaded || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard>
      <SidebarProvider>
        <WorkspaceProvider>
          <TooltipProvider delay={200}>
            <AppShell>{children}</AppShell>
          </TooltipProvider>
        </WorkspaceProvider>
      </SidebarProvider>
    </RouteGuard>
  );
}
