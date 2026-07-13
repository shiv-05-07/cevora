import Link from 'next/link';
import { APP_CONFIG } from '@/constants/app';

/**
 * Clean, typographic logo with a simple placeholder mark.
 * Pulls branding dynamically from APP_CONFIG.
 */
export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 group focus:outline-none">
      {/* Simple MVP placeholder logo mark */}
      <div className="w-8 h-8 bg-primary text-primary-foreground font-extrabold text-sm flex items-center justify-center rounded-lg select-none shadow-sm transition-transform group-hover:scale-105">
        C
      </div>
      <span className="font-bold tracking-tight text-lg text-foreground group-hover:text-primary transition-colors select-none">
        {APP_CONFIG.name}
      </span>
    </Link>
  );
}
