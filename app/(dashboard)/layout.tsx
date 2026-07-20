'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider } from '@/providers/SidebarProvider';
import { WorkspaceProvider } from '@/providers/WorkspaceProvider';
import { AppShell } from '@/components/dashboard/AppShell';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';

/**
 * Route guard: if the user is not logged in and the path starts with /dashboard,
 * redirect them to /login. Uses isLoaded to avoid acting before localStorage is read.
 */
function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading: authLoading, isAuthenticated } = useAuth();
  const [profileLoading, setProfileLoading] = React.useState(true);
  const [isAllowed, setIsAllowed] = React.useState(false);

  React.useEffect(() => {
    if (authLoading) return;
    
    if (!isAuthenticated) {
      if (pathname.startsWith('/')) {
        router.replace('/login');
      }
      return;
    }

    const checkProfile = async () => {
      try {
        const res = await fetch('/api/learning-profile');
        if (res.ok) {
          const json = await res.json();
          const profile = json.data;
          
          if (!profile || !profile.onboardingCompleted) {
            if (!pathname.startsWith('/onboarding')) {
              router.replace('/onboarding/goal');
            } else {
              setIsAllowed(true);
            }
          } else {
            // onboarding completed
            if (pathname.startsWith('/onboarding')) {
              router.replace('/dashboard');
            } else {
              setIsAllowed(true);
            }
          }
        } else if (res.status === 404) {
          // No profile exists, redirect to onboarding
          if (!pathname.startsWith('/onboarding')) {
            router.replace('/onboarding/goal');
          } else {
            setIsAllowed(true);
          }
        } else {
          setIsAllowed(true);
        }
      } catch (err) {
        setIsAllowed(true);
      } finally {
        setProfileLoading(false);
      }
    };

    checkProfile();
  }, [authLoading, isAuthenticated, pathname, router]);

  // Show nothing until auth state is resolved (prevents flash of dashboard)
  if (authLoading || profileLoading || !isAllowed) {
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
