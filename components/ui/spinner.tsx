import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('animate-spin text-muted-foreground', {
  variants: {
    size: {
      default: 'w-4 h-4',
      sm: 'w-3 h-3',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  inline?: boolean;
  centered?: boolean;
}

export function Spinner({
  className,
  size,
  inline = false,
  centered = false,
  ...props
}: SpinnerProps) {
  const containerClasses = cn(
    centered && 'flex items-center justify-center w-full h-full min-h-[100px]',
    inline && 'inline-flex items-center justify-center',
    className
  );

  const spinner = <Loader2 className={cn(spinnerVariants({ size }))} />;

  if (centered || inline) {
    return (
      <div className={containerClasses} {...props}>
        {spinner}
      </div>
    );
  }

  return (
    <div className={className} {...props}>
      {spinner}
    </div>
  );
}
