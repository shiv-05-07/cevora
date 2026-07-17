import { AppearanceSettings } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Sun, Moon, Monitor, LayoutTemplate } from 'lucide-react';

interface AppearanceSectionProps {
  data: AppearanceSettings;
  onChange: (data: Partial<AppearanceSettings>) => void;
}

export function AppearanceSection({ data, onChange }: AppearanceSectionProps) {
  
  const ThemeOption = ({ theme, icon: Icon, current }: { theme: 'Light' | 'Dark' | 'System', icon: any, current: string }) => {
    const isSelected = current === theme;
    return (
      <button
        onClick={() => onChange({ theme })}
        className={cn(
          "flex flex-col items-center justify-center p-4 border rounded-xl transition-all",
          isSelected 
            ? "border-primary bg-primary/10 text-primary" 
            : "border-border/50 bg-background text-muted-foreground hover:bg-muted hover:border-border"
        )}
      >
        <Icon className="w-6 h-6 mb-2" />
        <span className="text-sm font-medium">{theme}</span>
      </button>
    );
  };

  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Theme</Label>
            <div className="grid grid-cols-3 gap-4">
              <ThemeOption theme="Light" icon={Sun} current={data.theme} />
              <ThemeOption theme="Dark" icon={Moon} current={data.theme} />
              <ThemeOption theme="System" icon={Monitor} current={data.theme} />
            </div>
          </div>

          <div className="p-4 bg-muted/20 border border-border/40 rounded-xl space-y-4">
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
              <LayoutTemplate className="w-4 h-4" />
              Live Preview
            </div>
            <div className="h-32 w-full rounded-lg border border-border bg-background overflow-hidden flex flex-col">
              <div className="h-8 border-b border-border bg-muted flex items-center px-4 gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
              </div>
              <div className="flex-1 p-4 flex gap-4">
                <div className="w-16 h-full bg-muted/50 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-primary/20 rounded" />
                  <div className="h-12 w-full bg-muted/50 rounded" />
                </div>
              </div>
            </div>
          </div>

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
