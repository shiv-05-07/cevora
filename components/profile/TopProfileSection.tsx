'use client';

import * as React from 'react';
import Link from 'next/link';
import { ProfileAvatar } from './ProfileAvatar';

export function TopProfileSection() {
  return (
    <Link
      href="/profile"
      aria-label="Go to Profile"
      className="relative flex items-center justify-center cursor-pointer group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <ProfileAvatar className="w-8 h-8 transition-transform group-hover:scale-110" />
    </Link>
  );
}
