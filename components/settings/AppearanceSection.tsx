'use client';

import { AppearanceSettings } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Sun, Moon, Monitor, LayoutTemplate } from 'lucide-react';
import { useTheme } from 'next-themes';

interface AppearanceSectionProps {
  data: AppearanceSettings;
  onChange: (data: Partial<AppearanceSettings>) => void;
}

export function AppearanceSection({ data, onChange }: AppearanceSectionProps) {
  // useTheme() is the real next-themes hook — it drives the actual CSS class on <html>
  const { setTheme, resolvedTheme } = useTheme();

  // When user clicks a theme button:
  // 1. Update real next-themes theme (instantly changes the site)
  // 2. Persist selection into local settings state so Save Changes stores it
  const handleThemeChange = (theme: 'Light' | 'Dark' | 'System') => {
    const nextThemeValue = theme === 'Light' ? 'light' : theme === 'Dark' ? 'dark' : 'system';
    setTheme(nextThemeValue);
    onChange({ theme });
  };

  // The live preview colors should reflect the *resolved* theme (what the user actually sees),
  // so we derive them from resolvedTheme rather than data.theme which may lag.
  const isDarkPreview = resolvedTheme === 'dark';

  const ThemeOption = ({
    theme,
    icon: Icon,
    current,
  }: {
    theme: 'Light' | 'Dark' | 'System';
    icon: React.ElementType;
    current: string;
  }) => {
    const isSelected = current === theme;
    return (
      <button
        type="button"
        onClick={() => handleThemeChange(theme)}
        className={cn(
          'flex flex-col items-center justify-center p-4 border rounded-xl transition-all',
          isSelected
            ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/30'
            : 'border-border/50 bg-background text-muted-foreground hover:bg-muted hover:border-border'
        )}
        aria-pressed={isSelected}
        aria-label={`${theme} theme`}
      >
        <Icon className="w-6 h-6 mb-2" />
        <span className="text-sm font-medium">{theme}</span>
      </button>
    );
  };

  return (
    <section className="space-y-6" aria-label="Appearance settings">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">

          {/* Theme Selector */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Theme</Label>
            <div className="grid grid-cols-3 gap-4">
              <ThemeOption theme="Light" icon={Sun} current={data.theme} />
              <ThemeOption theme="Dark" icon={Moon} current={data.theme} />
              <ThemeOption theme="System" icon={Monitor} current={data.theme} />
            </div>
          </div>

          {/* Live Preview — updates in real-time using resolvedTheme */}
          <div className="p-4 bg-muted/20 border border-border/40 rounded-xl space-y-4">
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
              <LayoutTemplate className="w-4 h-4" />
              Live Preview
            </div>

            {/* The preview renders with explicit dark/light classes independent of the wrapper,
                so it always accurately shows what the selected theme looks like */}
            <div
              className={cn(
                'h-36 w-full rounded-lg border overflow-hidden flex flex-col transition-colors duration-300',
                isDarkPreview
                  ? 'bg-zinc-950 border-zinc-800'
                  : 'bg-white border-zinc-200'
              )}
            >
              {/* Titlebar */}
              <div
                className={cn(
                  'h-8 border-b flex items-center px-4 gap-2 shrink-0',
                  isDarkPreview ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
                )}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <div
                  className={cn(
                    'ml-2 h-3.5 w-28 rounded-sm',
                    isDarkPreview ? 'bg-zinc-700' : 'bg-zinc-300'
                  )}
                />
              </div>

              {/* Content area */}
              <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <div
                  className={cn(
                    'w-14 h-full border-r flex flex-col gap-1.5 p-2',
                    isDarkPreview ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  )}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-3 rounded-sm w-full',
                        i === 1
                          ? 'bg-blue-500/70'
                          : isDarkPreview ? 'bg-zinc-700' : 'bg-zinc-300'
                      )}
                    />
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-3 space-y-2">
                  <div
                    className={cn(
                      'h-3 w-1/3 rounded',
                      isDarkPreview ? 'bg-zinc-600' : 'bg-zinc-300'
                    )}
                  />
                  <div
                    className={cn(
                      'h-14 w-full rounded',
                      isDarkPreview ? 'bg-zinc-800' : 'bg-zinc-100'
                    )}
                  />
                  <div className="flex gap-2">
                    <div className="h-5 w-16 rounded bg-blue-500/80" />
                    <div
                      className={cn(
                        'h-5 w-12 rounded',
                        isDarkPreview ? 'bg-zinc-700' : 'bg-zinc-200'
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Preview updates in real-time as you switch themes.
            </p>
          </div>

          {/* Toggle options */}
          <div className="space-y-4 bg-muted/20 border border-border/40 rounded-xl p-4">
            <div className="flex items-center justify-between space-x-2 py-3 border-b border-border/40 last:border-0 last:pb-0">
              <div className="space-y-0.5">
                <Label htmlFor="compactMode" className="text-sm font-medium">Compact Mode</Label>
                <p className="text-xs text-muted-foreground">Reduces padding and increases data density.</p>
              </div>
              <Switch
                id="compactMode"
                checked={data.compactMode}
                onCheckedChange={(c) => onChange({ compactMode: c })}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 py-3 border-b border-border/40 last:border-0 last:pb-0">
              <div className="space-y-0.5">
                <Label htmlFor="reduceAnimations" className="text-sm font-medium">Reduce Animations</Label>
                <p className="text-xs text-muted-foreground">Disables non-essential motion effects.</p>
              </div>
              <Switch
                id="reduceAnimations"
                checked={data.reduceAnimations}
                onCheckedChange={(c) => onChange({ reduceAnimations: c })}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 py-3 border-b border-border/40 last:border-0 last:pb-0">
              <div className="space-y-0.5">
                <Label htmlFor="highContrast" className="text-sm font-medium">High Contrast</Label>
                <p className="text-xs text-muted-foreground">Increases visibility of borders and text.</p>
              </div>
              <Switch
                id="highContrast"
                checked={data.highContrast}
                onCheckedChange={(c) => onChange({ highContrast: c })}
              />
            </div>
          </div>

        </CardContent>
      </Card>
    </section>
  );
}
