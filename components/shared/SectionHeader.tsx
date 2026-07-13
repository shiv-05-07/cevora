import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * Reusable Section Header.
 * Supports eyebrow labels, main section titles, description paragraphs, and alignments.
 * Built according to the Typography hierarchy in DESIGN_SYSTEM.md.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl w-full mb-12 sm:mb-16 flex flex-col',
        align === 'center' && 'mx-auto items-center text-center',
        align === 'left' && 'items-start text-left',
        align === 'right' && 'ml-auto items-end text-right',
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-wider text-primary uppercase mb-2 bg-primary/5 px-2.5 py-1 rounded-full">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
