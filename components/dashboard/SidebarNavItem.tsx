'use client';

import * as React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isExpanded: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export function SidebarNavItem({
  label,
  href,
  icon: Icon,
  isExpanded,
  isActive,
  onClick,
}: SidebarNavItemProps) {
  const itemContent = (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg py-2 px-2.5 text-xs sm:text-sm font-semibold transition-all relative group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        isActive
          ? 'bg-primary text-primary-foreground font-bold shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-muted/40'
      )}
    >
      <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground')} />
      {isExpanded ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="truncate"
        >
          {label}
        </motion.span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </Link>
  );

  if (!isExpanded) {
    return (
      <Tooltip>
        <TooltipTrigger render={itemContent} />
        <TooltipContent side="right" className="text-[10px] font-semibold bg-foreground text-background">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return itemContent;
}
