'use client';

import * as React from 'react';
import { SettingsData } from '@/types/settings';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { User, BrainCircuit, LayoutGrid, ShieldAlert, Info } from 'lucide-react';
import { ProfileSection } from './ProfileSection';
import { CareerPreferencesSection } from './CareerPreferencesSection';
import { AIPreferencesSection } from './AIPreferencesSection';
import { NotificationsSection } from './NotificationsSection';
import { AppearanceSection } from './AppearanceSection';
import { ConnectedAccountsSection } from './ConnectedAccountsSection';
import { IntegrationsSection } from './IntegrationsSection';
import { PrivacySecuritySection } from './PrivacySecuritySection';
import { AboutSection } from './AboutSection';

interface SettingsClientProps {
  initialData: SettingsData;
}

const GROUPS = [
  { id: 'account', label: 'Account', icon: User, sections: ['profile', 'career'] },
  { id: 'ai-experience', label: 'AI Experience', icon: BrainCircuit, sections: ['ai', 'notifications'] },
  { id: 'workspace', label: 'Workspace', icon: LayoutGrid, sections: ['appearance', 'accounts', 'integrations'] },
  { id: 'security', label: 'Security', icon: ShieldAlert, sections: ['privacy'] },
  { id: 'about', label: 'About', icon: Info, sections: ['about'] },
];

export function SettingsClient({ initialData }: SettingsClientProps) {
  const [data, setData] = React.useState<SettingsData>(initialData);
  const [isDirty, setIsDirty] = React.useState(false);
  const [activeGroup, setActiveGroup] = React.useState('account');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // If multiple are visible, pick the one closest to the top
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

    GROUPS.forEach((group) => {
      const el = document.getElementById(group.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSave = () => {
    setIsDirty(false);
    toast.success('Settings saved successfully.', {
      description: 'Your preferences have been updated across the workspace.'
    });
  };

  const handleReset = () => {
    setData(initialData);
    setIsDirty(false);
    toast.error('Changes discarded.');
  };

  const updateSection = <K extends keyof SettingsData>(section: K, newData: Partial<SettingsData[K]>) => {
    setData(prev => {
      const sectionData = prev[section];
      
      // If it's an array, assume complete replacement (like accounts/integrations)
      if (Array.isArray(sectionData)) {
        return { ...prev, [section]: newData as SettingsData[K] };
      }
      
      // Otherwise merge
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
          <Button variant="ghost" size="sm" onClick={handleReset}>Reset</Button>
          <Button variant="default" size="sm" onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="sticky top-40 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none">
            {GROUPS.map((group) => {
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

        </main>
      </div>
    </div>
  );
}
