'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useProfileStore } from '@/store/useProfileStore';

interface ProfileAvatarProps {
  className?: string;
  fallbackClassName?: string;
}

export function ProfileAvatar({ className, fallbackClassName }: ProfileAvatarProps) {
  const { profile } = useProfileStore();
  // Zustand persist hydrates from localStorage after mount — guard prevents SSR mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2);

  const avatarSrc = mounted ? profile.avatar : undefined;

  return (
    <Avatar className={cn('w-8 h-8 shrink-0 select-none border border-white/20', className)}>
      {avatarSrc ? (
        <AvatarImage src={avatarSrc} alt={profile.name} className="object-cover" />
      ) : (
        <AvatarFallback className={cn('text-xs uppercase font-semibold bg-primary/10 text-primary', fallbackClassName)}>
          {getInitials(profile.name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
