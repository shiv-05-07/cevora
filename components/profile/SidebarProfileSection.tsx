'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfilePreviewCard } from './ProfilePreviewCard';
import { useProfileStore } from '@/store/useProfileStore';

interface SidebarProfileSectionProps {
  isExpanded: boolean;
}

export function SidebarProfileSection({ isExpanded }: SidebarProfileSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { profile } = useProfileStore();

  return (
    <div 
      className="relative flex items-center gap-2 group cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <ProfileAvatar className="transition-transform group-hover:scale-105" />
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="leading-none text-left"
        >
          <p className="text-xs font-bold text-foreground truncate max-w-[120px]">{profile.name}</p>
          <p className="text-[9px] text-muted-foreground capitalize font-medium">{profile.role}</p>
        </motion.div>
      )}

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <ProfilePreviewCard />
        </div>
      )}
    </div>
  );
}
