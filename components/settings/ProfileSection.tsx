'use client';

import * as React from 'react';
import { ProfileSettings } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileStore } from '@/store/useProfileStore';
import { toast } from 'sonner';
import { Camera } from 'lucide-react';

interface ProfileSectionProps {
  data: ProfileSettings;
  onChange: (data: Partial<ProfileSettings>) => void;
}

export function ProfileSection({ data, onChange }: ProfileSectionProps) {
  const { profile, setProfile } = useProfileStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const displayAvatar = profile.avatar || data.avatar;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setProfile({ avatar: dataUrl });
      try {
        const res = await fetch('/api/user', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatarUrl: dataUrl }),
        });
        if (res.ok) {
          const json = await res.json();
          useProfileStore.getState().syncFromUser(json.data, profile.email);
          toast.success('Profile photo saved!');
        }
      } catch {
        toast.error('Failed to persist avatar to backend');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemove = async () => {
    setProfile({ avatar: undefined });
    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl: null }),
      });
      if (res.ok) {
        const json = await res.json();
        useProfileStore.getState().syncFromUser(json.data, profile.email);
        toast.success('Profile photo removed!');
      }
    } catch {
      toast.error('Failed to remove photo from backend');
    }
  };

  const initials = data.name.split(' ').map((n) => n[0]).join('');

  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader className="flex flex-row items-center gap-6 pb-6">
          {/* Clickable avatar with camera overlay */}
          <div className="relative group/avatar shrink-0 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Avatar className="w-24 h-24 border border-border">
              <AvatarImage src={displayAvatar} alt={data.name} />
              <AvatarFallback className="text-2xl font-bold uppercase tracking-wider">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </div>

          <div className="space-y-2 flex-1">
            <CardTitle className="text-2xl">{data.name}</CardTitle>
            <CardDescription className="text-base">{data.email}</CardDescription>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                Upload Avatar
              </Button>
              {profile.avatar && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-xl border border-border/40">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm font-bold">{data.profileCompletion}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${data.profileCompletion}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Complete your profile to improve AI recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={data.name} onChange={(e) => onChange({ name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={data.email} onChange={(e) => onChange({ email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input id="university" value={data.university} onChange={(e) => onChange({ university: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" value={data.degree} onChange={(e) => onChange({ degree: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input id="graduationYear" value={data.graduationYear} onChange={(e) => onChange({ graduationYear: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
