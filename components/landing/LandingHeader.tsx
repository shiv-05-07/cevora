'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { CevoraLogo } from '@/components/shared/CevoraLogo';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { OverlaySidebar } from '@/components/shared/OverlaySidebar';
import { MAIN_NAVIGATION } from '@/constants/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OnboardingModal } from '@/components/auth/OnboardingModal';
import { useCevoraAuth } from '@/hooks/useCevoraAuth';
import { cn } from '@/lib/utils';

export function LandingHeader({ className }: { className?: string }) {
  const router = useRouter();
  const { user, isLoaded, isLoggedIn, logout } = useCevoraAuth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    router.refresh();
  };

  const initials = user?.profile?.name
    ? user.profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'JD';

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

            {/* Only render auth buttons once localStorage is loaded — avoids hydration flicker */}
            {isLoaded && (
              isLoggedIn ? (
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
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus-visible:outline-none">
                      <Avatar className="w-8 h-8 cursor-pointer hover:opacity-90 transition-opacity">
                        <AvatarFallback className="text-xs font-bold uppercase tracking-wider">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <div className="px-3 py-2 space-y-0.5">
                        <p className="text-xs font-bold text-foreground truncate">
                          {user?.profile?.name ?? 'User'}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {user?.profile?.email ?? ''}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        render={<button className="w-full" />}
                        onClick={() => router.push('/dashboard')}
                        className="cursor-pointer text-xs"
                      >
                        <User className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        render={<button className="w-full" />}
                        onClick={handleLogout}
                        className="cursor-pointer text-xs text-destructive focus:text-destructive"
                      >
                        <LogOut className="w-3.5 h-3.5 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
