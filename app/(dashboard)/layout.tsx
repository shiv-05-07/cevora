'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider } from '@/providers/SidebarProvider';
import { WorkspaceProvider } from '@/providers/WorkspaceProvider';
import { AppShell } from '@/components/dashboard/AppShell';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';
import { useProfileStore } from '@/store/useProfileStore';

/**
 * RouteGuard: the SOLE authority for post-auth routing decisions.
 *
 * Decision matrix:
 *  - Not authenticated          → /login
 *  - /api/user returns 401      → /login  (session invalid/expired)
 *  - /api/user returns 5xx/err  → show error state (never allow access)
 *  - role TEACHER or ADMIN      → /mentor  (from any non-/mentor path)
 *  - role STUDENT, no learning  → /onboarding/goal (if not already there)
 *    profile or onboarding not    
 *    completed
 *  - role STUDENT, onboarding   → /dashboard (if on /onboarding, redirect out)
 *    completed
 */
function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading: authLoading, isAuthenticated, user: authUser } = useAuth();
  const [profileLoading, setProfileLoading] = React.useState(true);
  const [isAllowed, setIsAllowed] = React.useState(false);
  const [fetchError, setFetchError] = React.useState(false);

  React.useEffect(() => {
    // Don't act while Supabase auth state is still being read from localStorage.
    if (authLoading) return;

    // Reset state on every check so stale values don't persist across navigations.
    setIsAllowed(false);
    setFetchError(false);
    setProfileLoading(true);

    if (!isAuthenticated) {
      router.replace('/login');
      // profileLoading stays true → renders spinner until redirect completes.
      return;
    }

    const checkProfile = async () => {
      try {
        const res = await fetch('/api/user');

        if (res.status === 401) {
          // Session is invalid or expired. Redirect to login.
          router.replace('/login');
          return;
        }

        if (!res.ok) {
          // 5xx or unexpected error — do NOT grant access. Show error state.
          setFetchError(true);
          return;
        }

        const json = await res.json();
        const user = json.data;

        // Synchronize real authenticated user profile into store
        useProfileStore.getState().syncFromUser(user, authUser?.email);

        if (user?.role === 'TEACHER' || user?.role === 'ADMIN') {
          // Teacher/Admin flow: primary landing is /teacher/dashboard.
          // AI Mentor (/mentor) is an AI feature accessible to both teachers and students.
          const isAllowedTeacherPath =
            pathname.startsWith('/teacher') ||
            pathname.startsWith('/mentor') ||
            pathname.startsWith('/companies') ||
            pathname.startsWith('/settings') ||
            pathname.startsWith('/profile');

          if (!isAllowedTeacherPath) {
            router.replace('/teacher/dashboard');
          } else {
            setIsAllowed(true);
          }
          return;
        }

        // Student flow: prevent access to teacher-only routes.
        if (pathname.startsWith('/teacher')) {
          router.replace('/dashboard');
          return;
        }

        const profile = user?.learningProfile;
        const onboardingDone = profile?.onboardingCompleted === true;

        if (!onboardingDone) {
          // Onboarding is incomplete — student must stay in /onboarding.
          if (!pathname.startsWith('/onboarding')) {
            router.replace('/onboarding/goal');
            // No setIsAllowed — redirect is in flight.
          } else {
            setIsAllowed(true);
          }
        } else {
          // Onboarding complete — student should not revisit /onboarding.
          if (pathname.startsWith('/onboarding')) {
            router.replace('/dashboard');
            // No setIsAllowed — redirect is in flight.
          } else {
            setIsAllowed(true);
          }
        }
      } catch {
        // Network-level failure — do NOT grant access. Show error state.
        setFetchError(true);
      } finally {
        setProfileLoading(false);
      }
    };

    checkProfile();
  }, [authLoading, isAuthenticated, pathname, router]);

  // While auth or profile is loading, show a neutral spinner.
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Network/server error — never grant access, show recoverable error UI.
  if (fetchError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="text-sm text-muted-foreground">Something went wrong. Please try again.</p>
        <button
          className="text-xs text-primary underline underline-offset-4"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }

  if (!isAllowed) {
    // Redirect is in flight — show spinner while it completes.
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
