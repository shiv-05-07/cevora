'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useProfileStore } from '@/store/useProfileStore';
import { toast } from 'sonner';
import { Camera, Building2, Bot, Users } from 'lucide-react';

interface TeacherSectionProps {
  onDirty?: () => void;
}

/* --- 1. Teacher Account Section --- */
export function TeacherProfileSection({ onDirty }: TeacherSectionProps) {
  const { profile, setProfile } = useProfileStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const initials = (profile.name || 'Faculty')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
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
          toast.success('Faculty avatar saved to backend!');
        }
      } catch {
        toast.error('Failed to persist avatar');
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
        toast.success('Faculty avatar removed!');
      }
    } catch {
      toast.error('Failed to remove avatar');
    }
  };

  return (
    <Card className="bg-card border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-6 pb-6">
        <div 
          className="relative group/avatar shrink-0 cursor-pointer" 
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar className="w-24 h-24 border border-border">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
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
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl">{profile.name}</CardTitle>
            <Badge variant="default" className="text-xs">Faculty</Badge>
          </div>
          <CardDescription className="text-base">{profile.email}</CardDescription>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Upload Photo
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="t-name">Full Name</Label>
            <Input 
              id="t-name" 
              value={profile.name} 
              onChange={(e) => {
                setProfile({ name: e.target.value });
                onDirty?.();
              }} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="t-email">Work Email</Label>
            <Input 
              id="t-email" 
              value={profile.email} 
              onChange={(e) => {
                setProfile({ email: e.target.value });
                onDirty?.();
              }} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- 2. Teacher Institution Section --- */
export function TeacherInstitutionSection({ onDirty }: TeacherSectionProps) {
  const { profile, setProfile } = useProfileStore();

  return (
    <Card className="bg-card border-border/50 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          <CardTitle>Institution & Faculty Role</CardTitle>
        </div>
        <CardDescription>
          Specify your department, institution details, and official faculty designation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="t-inst">Institution / College</Label>
            <Input 
              id="t-inst" 
              value={profile.institution || 'Tech University'} 
              onChange={(e) => {
                setProfile({ institution: e.target.value, college: e.target.value });
                onDirty?.();
              }} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="t-dept">Department</Label>
            <Input 
              id="t-dept" 
              value={profile.department || 'Computer Science & Engineering'} 
              onChange={(e) => {
                setProfile({ department: e.target.value, specialization: e.target.value });
                onDirty?.();
              }} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="t-desig">Faculty Designation</Label>
            <Input 
              id="t-desig" 
              value={profile.designation || 'Senior Faculty & Placement Mentor'} 
              onChange={(e) => {
                setProfile({ designation: e.target.value, degree: e.target.value });
                onDirty?.();
              }} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="t-id">Faculty Identifier ID</Label>
            <Input 
              id="t-id" 
              value="FAC-2026-089" 
              disabled 
              className="bg-muted/40 font-mono text-xs" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- 3. Teacher Workspace & Cohorts Section --- */
export function TeacherWorkspaceSection({ onDirty }: TeacherSectionProps) {
  const [digestEnabled, setDigestEnabled] = React.useState(true);
  const [autoVerify, setAutoVerify] = React.useState(false);

  return (
    <Card className="bg-card border-border/50 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <CardTitle>Managed Cohorts & Faculty Preferences</CardTitle>
        </div>
        <CardDescription>
          Configure how you receive student placement updates and cohort notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Assigned Batches</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: 'CSE 2026 Batch', count: '64 Students', status: 'Active' },
              { name: 'IT 2026 Batch', count: '48 Students', status: 'Active' },
              { name: 'ECE 2026 Batch', count: '36 Students', status: 'Active' },
            ].map((cohort, i) => (
              <div key={i} className="p-3 rounded-xl border border-border/50 bg-muted/20 space-y-1">
                <p className="font-bold text-xs text-foreground">{cohort.name}</p>
                <p className="text-[11px] text-muted-foreground">{cohort.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-semibold">Weekly Cohort Readiness Digest</Label>
              <p className="text-xs text-muted-foreground">Receive an automated weekly email summarizing batch readiness scores.</p>
            </div>
            <Switch checked={digestEnabled} onCheckedChange={(val) => { setDigestEnabled(val); onDirty?.(); }} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-semibold">Automatic Resume Verification Alert</Label>
              <p className="text-xs text-muted-foreground">Get notified when a student submits a resume scoring &gt;80% ATS score.</p>
            </div>
            <Switch checked={autoVerify} onCheckedChange={(val) => { setAutoVerify(val); onDirty?.(); }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- 4. Teacher AI & Teaching Insights Section --- */
export function TeacherAISection({ onDirty }: TeacherSectionProps) {
  const [mentorAssist, setMentorAssist] = React.useState(true);

  return (
    <Card className="bg-card border-border/50 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <CardTitle>AI Mentor & Teaching Assistant</CardTitle>
        </div>
        <CardDescription>
          Configure how the AI Assistant generates insights for cohort management.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold">AI Teaching Insights</Label>
            <p className="text-xs text-muted-foreground">Allow AI Mentor to analyze student performance trends and suggest intervention strategies.</p>
          </div>
          <Switch checked={mentorAssist} onCheckedChange={(val) => { setMentorAssist(val); onDirty?.(); }} />
        </div>
      </CardContent>
    </Card>
  );
}
