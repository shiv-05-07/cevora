'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  onClick,
  disabled = false,
  className,
}: QuickActionCardProps) {
  const isLink = !!href && !disabled;
  const isButton = !!onClick && !disabled;
  const isClickable = isLink || isButton;

  const content = (
    <Card
      className={cn(
        'group relative overflow-hidden p-6 transition-all duration-300 border-border/60 bg-card',
        isClickable && 'hover:border-primary/30 hover:shadow-md cursor-pointer',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      <div className="flex flex-col h-full items-start gap-4">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300',
            isClickable && 'group-hover:bg-primary group-hover:text-primary-foreground'
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="font-semibold text-foreground tracking-tight">{title}</h4>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        
        {isClickable && (
          <div className="mt-auto pt-2 flex items-center text-xs font-semibold text-primary/80 group-hover:text-primary transition-colors">
            Get Started
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        )}
      </div>

      {isClickable && (
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
          initial={false}
        />
      )}
    </Card>
  );

  if (disabled) {
    return <div>{content}</div>;
  }

  if (isLink) {
    return (
      <Link href={href!} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
        {content}
      </Link>
    );
  }

  if (isButton) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
        type="button"
      >
        {content}
      </button>
    );
  }

  return <div>{content}</div>;
}
