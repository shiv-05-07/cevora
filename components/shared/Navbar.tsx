'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Sticky Navigation Header.
 * Features responsive logo, routes (Features, About, Roadmap), Sign In/Get Started actions,
 * and a mobile navigation dropdown panel with Framer Motion slide height transitions.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Roadmap', href: '#roadmap' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-muted-foreground/90 hover:text-foreground transition-colors duration-200 relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-1.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Sign In / Register / Theme) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'text-[13px] font-semibold hover:bg-muted/60 active:scale-[0.98] transition-all'
            )}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'text-[13px] font-semibold active:scale-[0.98] transition-all shadow-sm'
            )}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 rounded-lg hover:bg-muted/80"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Panel with Smooth Height/Opacity Transition */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.25,
              ease: 'easeInOut',
            }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-lg px-4 py-4 space-y-4 overflow-hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <hr className="border-border/60" />
            <div className="flex flex-col gap-2.5 px-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'w-full justify-center text-sm py-2.5 hover:bg-muted/60'
                )}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'sm' }),
                  'w-full justify-center text-sm py-2.5 shadow-sm'
                )}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
