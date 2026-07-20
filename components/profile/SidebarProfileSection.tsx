'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfileStore } from '@/store/useProfileStore';

interface SidebarProfileSectionProps {
  isExpanded: boolean;
}

export function SidebarProfileSection({ isExpanded }: SidebarProfileSectionProps) {
  const { profile } = useProfileStore();

  return (
    <Link
      href="/profile"
      className="relative flex items-center gap-2 group cursor-pointer rounded-lg px-1 py-1 hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      title="View Profile"
    >
      <ProfileAvatar className="transition-transform group-hover:scale-105 shrink-0" />

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="leading-none text-left overflow-hidden"
        >
          <p className="text-xs font-bold text-foreground truncate max-w-[120px]">{profile.name}</p>
          <p className="text-[9px] text-muted-foreground capitalize font-medium">{profile.role}</p>
        </motion.div>
      )}
    </Link>
  );
}
