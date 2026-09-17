'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider } from '@/providers/SidebarProvider';
import { WorkspaceProvider } from '@/providers/WorkspaceProvider';
import { AppShell } from '@/components/dashboard/AppShell';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';
import { useProfileStore } from '@/store/useProfileStore';
import { createClient } from '@/services/supabase/client';

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
  // Ref to track in-flight fetch promise to deduplicate concurrent calls
  const fetchPromiseRef = React.useRef<Promise<any> | null>(null);

  React.useEffect(() => {
    // Don't act while Supabase auth state is still being read from localStorage.
    if (authLoading) return;

    if (!isAuthenticated || !authUser) {
      setIsAllowed(false);
      setFetchError(false);
      setProfileLoading(true);
      router.replace('/login');
      return;
    }

    const currentProfile = useProfileStore.getState().profile;
    const hasValidLoadedProfile = Boolean(currentProfile?.id && currentProfile.id === authUser.id);

    // Helper to evaluate routing rules given a user payload/profile
    const evaluateRoutePermission = (userPayload: any) => {
      const isTeacherOrAdmin = userPayload?.role === 'TEACHER' || userPayload?.role === 'ADMIN' || userPayload?.role === 'Teacher' || userPayload?.role === 'Admin';

      if (isTeacherOrAdmin) {
        const isAllowedTeacherPath =
          pathname.startsWith('/teacher') ||
          pathname.startsWith('/mentor') ||
          pathname.startsWith('/companies') ||
          pathname.startsWith('/settings') ||
          pathname.startsWith('/profile');

        if (!isAllowedTeacherPath) {
          router.replace('/teacher/dashboard');
          return false;
        }
        return true;
      }

      // Student flow: prevent access to teacher-only routes
      if (pathname.startsWith('/teacher')) {
        router.replace('/dashboard');
        return false;
      }

      const onboardingDone = Boolean(
        userPayload?.learningProfile?.onboardingCompleted ?? userPayload?.onboardingCompleted
      );

      if (!onboardingDone) {
        if (!pathname.startsWith('/onboarding')) {
          router.replace('/onboarding/goal');
          return false;
        }
      } else {
        if (pathname.startsWith('/onboarding')) {
          router.replace('/dashboard');
          return false;
        }
      }
      return true;
    };

    // FAST PATH: Profile already fetched and synced for current authUser ID -> 0ms transition!
    if (hasValidLoadedProfile) {
      setFetchError(false);
      setProfileLoading(false);
      const allowed = evaluateRoutePermission(currentProfile);
      setIsAllowed(allowed);
      return;
    }

    // SLOW PATH: First time load or user change -> Fetch /api/user once (deduplicated)
    setFetchError(false);
    setProfileLoading(true);

    const checkProfile = async () => {
      try {
        if (!fetchPromiseRef.current) {
          fetchPromiseRef.current = fetch('/api/user').then((res) => {
            fetchPromiseRef.current = null;
            return res;
          });
        }
        const res = await fetchPromiseRef.current;

        if (res.status === 401) {
          useProfileStore.getState().resetProfile();
          const supabase = createClient();
          await supabase.auth.signOut().catch(() => { });
          router.replace('/login');
          return;
        }

        if (!res.ok) {
          setFetchError(true);
          return;
        }

        const json = await res.json();
        const user = json.data;

        // Synchronize real authenticated user profile into store
        useProfileStore.getState().syncFromUser(user, authUser?.email);

        const allowed = evaluateRoutePermission(user);
        setIsAllowed(allowed);
      } catch {
        setFetchError(true);
      } finally {
        setProfileLoading(false);
      }
    };

    checkProfile();
  }, [authLoading, isAuthenticated, authUser, pathname, router]);

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
