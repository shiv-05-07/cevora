'use client';

import * as React from 'react';
import { Bell, Check, ClipboardList, FileText, UserCheck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'resume' | 'deadline' | 'workspace';
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Resume Approved',
      description: 'Prof. Sharma signed off on your CSE-Core-Resume draft.',
      time: '15m ago',
      read: false,
      type: 'resume',
    },
    {
      id: '2',
      title: 'Google OA Deadline',
      description: 'Google screening assessments are scheduled to lock in 5 days.',
      time: '2h ago',
      read: false,
      type: 'deadline',
    },
    {
      id: '3',
      title: 'Workspace Enrolled',
      description: 'You joined CSE 2026 Batch - Section A workspace.',
      time: '1d ago',
      read: true,
      type: 'workspace',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'resume':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'deadline':
        return <ClipboardList className="w-4 h-4 text-amber-500" />;
      case 'workspace':
        return <UserCheck className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="sr-only">Notifications</span>
        <Bell className="w-[1.1rem] h-[1.1rem]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2 select-none">
          <span className="text-xs font-bold text-foreground">Notifications</span>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[10px] text-primary font-bold hover:underline flex items-center gap-0.5 focus-visible:outline-none"
            >
              <Check className="w-3 h-3" />
              <span>Mark all read</span>
            </button>
          )}
        </div>
        <DropdownMenuSeparator className="my-0" />
        
        <div className="max-h-[260px] overflow-y-auto divide-y divide-border/40 select-none">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`flex gap-3 p-3 transition-colors hover:bg-muted/40 ${
                  !n.read ? 'bg-primary/[0.02]' : ''
                }`}
              >
                <div className="w-8 h-8 bg-muted/60 dark:bg-muted/40 rounded-lg flex items-center justify-center shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs font-semibold text-foreground truncate ${!n.read ? 'font-bold' : ''}`}>
                      {n.title}
                    </p>
                    <span className="text-[9px] text-muted-foreground/60 shrink-0 font-medium">{n.time}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-normal mt-0.5 select-none">
                    {n.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem className="w-full justify-center text-primary font-semibold py-2 text-xs rounded-none hover:bg-muted/40 transition-colors cursor-pointer select-none">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
