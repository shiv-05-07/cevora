'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { AggregatedProfile } from '@/types/profile';
import {
  MapPin, GraduationCap, Building2, Share2, Download,
  Eye, EyeOff, Check, Copy, Camera, Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useProfileStore } from '@/store/useProfileStore';

interface HeroIdentityCardProps {
  profile: AggregatedProfile;
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
}

export function HeroIdentityCard({ profile, recruiterMode, setRecruiterMode }: HeroIdentityCardProps) {
  const { settings, analytics } = profile;
  const { profile: storedProfile, setProfile } = useProfileStore();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const [copied, setCopied] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Avatar from Zustand store — only after mount to avoid SSR mismatch
  const displayAvatar = (mounted ? storedProfile.avatar : undefined) || settings.profile.avatar;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setProfile({ avatar: dataUrl });
      toast.success('Profile photo updated across all locations!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveAvatar = () => {
    setProfile({ avatar: undefined });
    toast.success('Profile photo removed.');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Profile portfolio link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    toast.info('Downloading portfolio as PDF...');
  };

  const initials = settings.profile.name.split(' ').map((n) => n[0]).join('');

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:border-border/60 hover:shadow-md">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">

          {/* Left — avatar + info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">

            {/* Avatar with upload overlay */}
            <div className="relative group/avatar shrink-0">
              <Avatar className="w-24 h-24 border-2 border-primary/20 ring-4 ring-background">
                <AvatarImage src={displayAvatar} alt={settings.profile.name} className="object-cover" />
                <AvatarFallback className="bg-primary/5 text-primary font-bold text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>

              {/* Camera overlay */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload profile photo"
                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>

              {/* Remove badge */}
              {mounted && storedProfile.avatar && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  aria-label="Remove profile photo"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center shadow-md hover:bg-destructive/80 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            <div className="space-y-2">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{storedProfile.name || settings.profile.name}</h1>
                <p className="text-sm text-muted-foreground font-mono">@{storedProfile.username || storedProfile.email?.split('@')[0] || 'user'}</p>
              </div>
              <p className="text-sm font-medium text-primary flex items-center gap-1.5 justify-center sm:justify-start">
                <Building2 className="w-4 h-4" />
                {settings.career.targetRole}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {settings.profile.university} ({settings.profile.graduationYear})
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {settings.career.preferredLocation}
                </span>
              </div>
              <p className="text-sm max-w-xl text-muted-foreground leading-relaxed">
                Passionate software developer interested in distributed systems, clean code architectures, and scalable web platforms.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-2">
                {settings.career.workMode.remote && <Badge variant="secondary" className="text-[10px]">Open to Remote</Badge>}
                {settings.career.workMode.hybrid && <Badge variant="secondary" className="text-[10px]">Open to Hybrid</Badge>}
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/5">Open to Internship</Badge>
                <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-500 bg-blue-500/5">Open to Full-Time</Badge>
              </div>
            </div>
          </div>

          {/* Right — actions + score */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-4 self-stretch justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRecruiterMode(!recruiterMode)}
                className="text-xs h-9"
              >
                {recruiterMode ? (
                  <><EyeOff className="w-3.5 h-3.5 mr-1.5" />My View</>
                ) : (
                  <><Eye className="w-3.5 h-3.5 mr-1.5" />Recruiter View</>
                )}
              </Button>

              {/* DropdownMenuTrigger renders its own <button> — apply buttonVariants directly, never nest <Button> inside */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'text-xs h-9 gap-1.5')}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleCopyLink} className="text-xs cursor-pointer">
                    {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                    Copy Profile Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadPDF} className="text-xs cursor-pointer">
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Download Resume
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 w-full md:w-48 text-center md:text-right">
              <span className="text-xs text-muted-foreground block font-medium">Placement Score</span>
              <span className="text-3xl font-extrabold text-primary block mt-0.5">{analytics.hero.readinessScore}%</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-1">
                Placement Ready
              </span>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
