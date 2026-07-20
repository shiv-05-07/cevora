import * as React from 'react';
import { cn } from '@/lib/utils';

interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function HoverCard({ children, className, ...props }: HoverCardProps) {
  return (
    <div 
      className={cn(
        "transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-400/40 shadow-sm cursor-pointer",
        "bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
