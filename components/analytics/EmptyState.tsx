import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  actionHref,
  className 
}: EmptyStateProps) {
  return (
    <Card className={cn("bg-card border-border/50 border-dashed shadow-none", className)}>
      <CardContent className="p-8 flex flex-col items-center justify-center text-center min-h-[250px]">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
        {actionLabel && actionHref && (
          <Link href={actionHref}>
            <Button variant="default" size="sm">
              {actionLabel}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
