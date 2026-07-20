import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const sectionCardVariants = cva('w-full transition-colors', {
  variants: {
    variant: {
      default: 'border-border/60 bg-card shadow-sm',
      outlined: 'border-border bg-transparent shadow-none',
      filled: 'border-transparent bg-muted/30 shadow-none',
      compact: 'border-border/60 bg-card shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface SectionCardProps extends VariantProps<typeof sectionCardVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  variant,
  className,
  headerClassName,
  contentClassName,
}: SectionCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card className={cn(sectionCardVariants({ variant }), className)}>
      {(title || description || actions) && (
        <CardHeader
          className={cn(
            'flex flex-row items-start justify-between gap-4',
            isCompact ? 'p-4 pb-2' : 'p-6 pb-4',
            headerClassName
          )}
        >
          <div className="space-y-1.5 flex-1">
            {title && (
              <CardTitle className={cn(isCompact ? 'text-base' : 'text-lg')}>
                {title}
              </CardTitle>
            )}
            {description && (
              <CardDescription className={cn(isCompact && 'text-xs')}>
                {description}
              </CardDescription>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </CardHeader>
      )}
      {children && (
        <CardContent
          className={cn(
            isCompact ? 'p-4 pt-0' : 'p-6 pt-0',
            !title && !description && !actions && (isCompact ? 'pt-4' : 'pt-6'),
            contentClassName
          )}
        >
          {children}
        </CardContent>
      )}
    </Card>
  );
}
