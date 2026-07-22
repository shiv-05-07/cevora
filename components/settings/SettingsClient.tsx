'use client';

import * as React from 'react';
import { SettingsData } from '@/types/settings';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { User, BrainCircuit, LayoutGrid, ShieldAlert, Info, Building2, Bot, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useProfileStore } from '@/store/useProfileStore';
import { ProfileSection } from './ProfileSection';
import { CareerPreferencesSection } from './CareerPreferencesSection';
import { AIPreferencesSection } from './AIPreferencesSection';
import { NotificationsSection } from './NotificationsSection';
import { AppearanceSection } from './AppearanceSection';
import { ConnectedAccountsSection } from './ConnectedAccountsSection';
import { IntegrationsSection } from './IntegrationsSection';
import { PrivacySecuritySection } from './PrivacySecuritySection';
import { AboutSection } from './AboutSection';
import { 
  TeacherProfileSection, 
  TeacherInstitutionSection, 
  TeacherWorkspaceSection, 
  TeacherAISection 
} from './TeacherSettingsSections';

interface SettingsClientProps {
  initialData: SettingsData;
}

export function SettingsClient({ initialData }: SettingsClientProps) {
  const { theme: realTheme } = useTheme();
  const { profile } = useProfileStore();

  const isTeacher = profile.role?.toLowerCase() === 'teacher' || profile.role?.toLowerCase() === 'admin';

  // Merge stored real user data into initialData to replace any placeholders
  const mergedData: SettingsData = React.useMemo(() => ({
    ...initialData,
    profile: {
      ...initialData.profile,
      name: profile.name || initialData.profile.name,
      email: profile.email || initialData.profile.email,
      university: profile.college || profile.institution || initialData.profile.university,
      degree: profile.degree || profile.designation || initialData.profile.degree,
      graduationYear: String(profile.graduationYear || initialData.profile.graduationYear),
      targetRole: profile.targetRole || initialData.profile.targetRole,
      dreamCompany: profile.targetCompany || initialData.profile.dreamCompany,
      avatar: profile.avatar || initialData.profile.avatar,
    },
    career: {
      ...initialData.career,
      targetRole: profile.targetRole || initialData.career.targetRole,
    }
  }), [initialData, profile]);

  const [data, setData] = React.useState<SettingsData>(mergedData);
  const [isDirty, setIsDirty] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [activeGroup, setActiveGroup] = React.useState('account');

  React.useEffect(() => {
    setData(mergedData);
  }, [mergedData]);

  // Keep data.appearance.theme in sync with the real next-themes value.
  React.useEffect(() => {
    if (!realTheme) return;
    const mapped = realTheme === 'light' ? 'Light' : realTheme === 'dark' ? 'Dark' : 'System';
    setData(prev => ({
      ...prev,
      appearance: { ...prev.appearance, theme: mapped as 'Light' | 'Dark' | 'System' }
    }));
  }, [realTheme]);

  const groups = React.useMemo(() => {
    if (isTeacher) {
      return [
        { id: 'account', label: 'Account', icon: User },
        { id: 'institution', label: 'Institution', icon: Building2 },
        { id: 'workspace', label: 'Workspace & Cohorts', icon: LayoutGrid },
        { id: 'ai-teaching', label: 'AI & Insights', icon: Bot },
        { id: 'security', label: 'Security', icon: ShieldAlert },
        { id: 'about', label: 'About', icon: Info },
      ];
    }
    return [
      { id: 'account', label: 'Account', icon: User },
      { id: 'ai-experience', label: 'AI Experience', icon: BrainCircuit },
      { id: 'workspace', label: 'Workspace', icon: LayoutGrid },
      { id: 'security', label: 'Security', icon: ShieldAlert },
      { id: 'about', label: 'About', icon: Info },
    ];
  }, [isTeacher]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => 
            (prev.intersectionRatio > current.intersectionRatio) ? prev : current
          );
          setActiveGroup(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    groups.forEach((group) => {
      const el = document.getElementById(group.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groups]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const gradYear = data.profile.graduationYear ? parseInt(String(data.profile.graduationYear), 10) : undefined;
      
      const payload: Record<string, any> = isTeacher
        ? {
            fullName: profile.name || data.profile.name,
            avatarUrl: profile.avatar || data.profile.avatar || null,
            institution: profile.institution || data.profile.university,
            department: profile.department || 'Computer Science & Engineering',
            designation: profile.designation || 'Senior Faculty & Placement Mentor',
          }
        : {
            fullName: data.profile.name,
            avatarUrl: profile.avatar || data.profile.avatar || null,
            college: data.profile.university,
            degree: data.profile.degree,
            specialization: data.profile.degree,
            graduationYear: isNaN(gradYear as any) ? 2026 : gradYear,
            targetRole: data.career?.targetRole || data.profile.targetRole,
            targetCompany: data.profile.dreamCompany,
          };

      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.message || 'Failed to save settings');
      }

      const json = await res.json();
      const updatedUser = json.data;

      // Synchronize back into Zustand store
      useProfileStore.getState().syncFromUser(updatedUser, profile.email);

      setIsDirty(false);
      toast.success('Settings saved successfully.', {
        description: 'Your changes have been saved to your Prisma profile.'
      });
    } catch (err: any) {
      toast.error('Failed to save settings', {
        description: err.message || 'An unexpected error occurred.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setData(mergedData);
    setIsDirty(false);
    toast.error('Changes discarded.');
  };

  const updateSection = <K extends keyof SettingsData>(section: K, newData: Partial<SettingsData[K]>) => {
    setData(prev => {
      const sectionData = prev[section];
      if (Array.isArray(sectionData)) {
        return { ...prev, [section]: newData as SettingsData[K] };
      }
      return { 
        ...prev, 
        [section]: { ...sectionData, ...newData } 
      };
    });
    setIsDirty(true);
  };

  const scrollToGroup = (id: string) => {
    setActiveGroup(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const markDirty = () => setIsDirty(true);

  return (
    <div className="relative min-h-[calc(100vh-10rem)]">
      
      {/* Sticky Action Bar */}
      <div 
        className={cn(
          "sticky top-20 z-40 flex items-center justify-between p-4 mb-8 bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm transition-all duration-300",
          isDirty ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="text-sm font-medium">Unsaved changes</div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleReset} disabled={isSaving}>Reset</Button>
          <Button variant="default" size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="sticky top-40 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none">
            {groups.map((group) => {
              const Icon = group.icon;
              const isActive = activeGroup === group.id;
              
              return (
                <button
                  key={group.id}
                  onClick={() => scrollToGroup(group.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {group.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Sections */}
        <main className="flex-1 min-w-0 space-y-24 pb-24">
          
          {isTeacher ? (
            /* TEACHER SETTINGS VIEW */
            <>
              <div id="account" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">Faculty Account</h2>
                </div>
                <TeacherProfileSection onDirty={markDirty} />
              </div>

              <div id="institution" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">Institution Details</h2>
                </div>
                <TeacherInstitutionSection onDirty={markDirty} />
              </div>

              <div id="workspace" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">Workspace & Cohorts</h2>
                </div>
                <TeacherWorkspaceSection onDirty={markDirty} />
                <AppearanceSection data={data.appearance} onChange={(d) => updateSection('appearance', d)} />
              </div>

              <div id="ai-teaching" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">AI & Teaching Insights</h2>
                </div>
                <TeacherAISection onDirty={markDirty} />
              </div>

              <div id="security" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">Security</h2>
                </div>
                <PrivacySecuritySection data={data.privacy} onChange={(d) => updateSection('privacy', d)} />
              </div>

              <div id="about" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">About</h2>
                </div>
                <AboutSection />
              </div>
            </>
          ) : (
            /* STUDENT SETTINGS VIEW */
            <>
              <div id="account" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">Account</h2>
                </div>
                <ProfileSection data={data.profile} onChange={(d) => updateSection('profile', d)} />
                <CareerPreferencesSection data={data.career} onChange={(d) => updateSection('career', d)} />
              </div>

              <div id="ai-experience" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">AI Experience</h2>
                </div>
                <AIPreferencesSection data={data.ai} onChange={(d) => updateSection('ai', d)} />
                <NotificationsSection data={data.notifications} onChange={(d) => updateSection('notifications', d)} />
              </div>

              <div id="workspace" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">Workspace</h2>
                </div>
                <AppearanceSection data={data.appearance} onChange={(d) => updateSection('appearance', d)} />
                <ConnectedAccountsSection data={data.accounts} onChange={(d) => updateSection('accounts', d)} />
                <IntegrationsSection data={data.integrations} onChange={(d) => updateSection('integrations', d)} />
              </div>

              <div id="security" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">Security</h2>
                </div>
                <PrivacySecuritySection data={data.privacy} onChange={(d) => updateSection('privacy', d)} />
              </div>

              <div id="about" className="scroll-mt-40 space-y-12">
                <div className="border-b border-border/40 pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">About</h2>
                </div>
                <AboutSection />
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}
