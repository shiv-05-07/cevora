'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Settings, Palette, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfileStore } from '@/store/useProfileStore';
import { useAuth } from '@/hooks/useAuth';

export function UserMenu() {
  const router = useRouter();
  const { profile } = useProfileStore();
  const { signOut } = useAuth();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const avatarSrc = mounted ? profile.avatar : undefined;

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ring-offset-background hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Avatar className="w-8 h-8 cursor-pointer select-none">
          {avatarSrc ? (
            <AvatarImage src={avatarSrc} alt={profile.name} className="object-cover" />
          ) : (
            <AvatarFallback className="text-xs uppercase tracking-wider font-semibold">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal select-none">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 border border-border/50">
              {avatarSrc ? (
                <AvatarImage src={avatarSrc} alt={profile.name} className="object-cover" />
              ) : (
                <AvatarFallback className="text-xs font-bold">{initials}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              <p className="text-xs font-bold text-foreground">{profile.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{profile.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem render={<Link href="/profile" />} className="cursor-pointer">
          <User className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-xs sm:text-sm">Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/settings" />} className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-xs sm:text-sm">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/settings?tab=appearance" />} className="cursor-pointer">
          <Palette className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-xs sm:text-sm">Appearance</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive font-semibold cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          <span className="text-xs sm:text-sm">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
