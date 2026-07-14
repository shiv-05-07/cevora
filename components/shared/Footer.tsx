import { APP_CONFIG } from '@/constants/app';
import { Logo } from './Logo';

/**
 * Platform footer component.
 * Houses branding assets, placeholder resources (Documentation, GitHub), privacy terms,
 * and copyright statements.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo and brief description */}
        <div className="flex flex-col items-center md:items-start gap-2 max-w-sm">
          <Logo />
          <p className="text-xs text-muted-foreground text-center md:text-left mt-2 leading-relaxed">
            {APP_CONFIG.description}
          </p>
        </div>

        {/* Dynamic footer links */}
        <div className="flex flex-col sm:flex-row gap-6 md:gap-12 flex-wrap items-center">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Quick Links</span>
            <div className="flex gap-4 mt-1 flex-wrap justify-center sm:justify-start">
              <a href="#features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#solutions" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Solutions</a>
              <a href="#faculty" className="text-xs text-muted-foreground hover:text-foreground transition-colors">For Faculty</a>
              <a href="#roadmap" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Roadmap</a>
              <a href="#about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About</a>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a
              href="#docs"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Documentation
            </a>
            <a
              href="#github"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline"
            >
              GitHub
            </a>
            <a
              href="#privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Terms
            </a>
            <a
              href="#contact"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Copyright stamp */}
      <div className="border-t border-border/60 py-6 text-center text-[11px] text-muted-foreground/80">
        &copy; {currentYear} {APP_CONFIG.name}. All rights reserved. Version {APP_CONFIG.version}.
      </div>
    </footer>
  );
}
