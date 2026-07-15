import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const statusBadgeVariants = cva('', {
  variants: {
    status: {
      success: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-500/20',
      warning: 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 hover:bg-orange-500/20',
      danger: 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-500/20',
      info: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 hover:bg-blue-500/20',
      neutral: 'bg-muted text-muted-foreground hover:bg-muted/80',
    },
  },
  defaultVariants: {
    status: 'neutral',
  },
});

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
}

export function StatusBadge({
  status,
  className,
  children,
  ...props
}: StatusBadgeProps) {
  // We use the "outline" variant as a base to avoid default primary background overrides, 
  // and remove the border since status badges typically don't have borders in this design.
  return (
    <Badge
      variant="outline"
      className={cn('border-transparent font-semibold', statusBadgeVariants({ status }), className)}
      {...props}
    >
      {children}
    </Badge>
  );
}
