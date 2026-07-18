'use client';

import * as React from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfilePreviewCard } from './ProfilePreviewCard';

export function TopProfileSection() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div 
      className="relative flex items-center justify-center cursor-pointer group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <ProfileAvatar className="w-8 h-8 transition-transform group-hover:scale-110" />
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <ProfilePreviewCard />
        </div>
      )}
    </div>
  );
}
