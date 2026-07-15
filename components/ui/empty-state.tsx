import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onActionClick,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border/80 rounded-xl max-w-md mx-auto my-12 bg-card/40 dark:border-border/40',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="w-12 h-12 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-4 border border-primary/10 shadow-sm">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-base font-extrabold text-foreground mb-1 select-none">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 select-none">{description}</p>
      {actionText && onActionClick && (
        <Button onClick={onActionClick} variant="outline" size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
}
