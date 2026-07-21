'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { CevoraLogo } from '@/components/shared/CevoraLogo';
import { TopProfileSection } from '@/components/profile/TopProfileSection';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { OverlaySidebar } from '@/components/shared/OverlaySidebar';
import { MAIN_NAVIGATION } from '@/constants/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { OnboardingModal } from '@/components/auth/OnboardingModal';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export function LandingHeader({ className }: { className?: string }) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
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
              navigationGroups={[{ title: '', items: MAIN_NAVIGATION }]}
              showWorkspaceCard={false}
              showUserFooter={false}
            />
            <CevoraLogo size="medium" />
          </div>

          {/* Right Side: Auth-aware actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Only render auth buttons once loaded — avoids hydration flicker */}
            {!loading && (
              isAuthenticated ? (
                // ── Logged In: Avatar + Dropdown ──
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[13px] font-semibold hidden sm:inline-flex"
                    onClick={() => router.push('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                  <TopProfileSection />
                </>
              ) : (
                // ── Logged Out: Sign In + Get Started ──
                <>
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'sm' }),
                      'text-[13px] font-semibold hover:bg-muted/60 active:scale-[0.98] transition-all hidden sm:inline-flex'
                    )}
                  >
                    Sign In
                  </Link>
                  <Button
                    size="sm"
                    className="text-[13px] font-semibold active:scale-[0.98] transition-all shadow-sm"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Get Started
                  </Button>
                </>
              )
            )}
          </div>
        </div>
      </header>

      {/* Onboarding modal — lives here so it can overlay the full page */}
      <OnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
