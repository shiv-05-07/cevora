'use client';

import * as React from 'react';
import Link from 'next/link';
import { User, Settings, Palette, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserMenu() {
  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ring-offset-background hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Avatar className="w-8 h-8 cursor-pointer select-none">
          <AvatarFallback className="text-xs uppercase tracking-wider font-semibold">JD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal select-none">
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-bold text-foreground">John Doe</p>
            <p className="text-[10px] text-muted-foreground truncate">john.doe@student.iit.edu</p>
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
