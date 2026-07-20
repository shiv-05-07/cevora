import { PrivacySecuritySettings } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PrivacySecuritySectionProps {
  data: PrivacySecuritySettings;
  onChange: (data: Partial<PrivacySecuritySettings>) => void;
}

export function PrivacySecuritySection({ data, onChange }: PrivacySecuritySectionProps) {
  
  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader>
          <CardTitle>Privacy & Security</CardTitle>
          <CardDescription>
            Manage your data sharing preferences and account security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="space-y-4 bg-muted/20 border border-border/40 rounded-xl p-4">
            <div className="flex items-center justify-between space-x-2 py-3 border-b border-border/40 last:border-0 last:pb-0">
              <div className="space-y-0.5">
                <Label htmlFor="dataSharing" className="text-sm font-medium">Data Sharing</Label>
                <p className="text-xs text-muted-foreground">Allow anonymized data to be used for improving community insights.</p>
              </div>
              <Switch 
                id="dataSharing" 
                checked={data.dataSharing} 
                onCheckedChange={(c) => onChange({ dataSharing: c })} 
              />
            </div>
            <div className="flex items-center justify-between space-x-2 py-3 border-b border-border/40 last:border-0 last:pb-0">
              <div className="space-y-0.5">
                <Label htmlFor="analyticsCollection" className="text-sm font-medium">Analytics Collection</Label>
                <p className="text-xs text-muted-foreground">Help us improve Cevora by sending crash reports and usage statistics.</p>
              </div>
              <Switch 
                id="analyticsCollection" 
                checked={data.analyticsCollection} 
                onCheckedChange={(c) => onChange({ analyticsCollection: c })} 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
            <div className="border border-destructive/20 bg-destructive/5 rounded-xl p-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-sm text-destructive">Delete History</h4>
                  <p className="text-xs text-muted-foreground">Permanently delete your AI Mentor chat history and study plans.</p>
                </div>
                <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                  Delete History
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-destructive/10">
                <div>
                  <h4 className="font-medium text-sm text-destructive">Export Account</h4>
                  <p className="text-xs text-muted-foreground">Download all your personal data, resumes, and insights.</p>
                </div>
                <Button variant="outline" size="sm" className="border-border">
                  Export Data
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-destructive/10">
                <div>
                  <h4 className="font-medium text-sm text-destructive">Reset Preferences</h4>
                  <p className="text-xs text-muted-foreground">Restore all settings to their default state.</p>
                </div>
                <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                  Reset Preferences
                </Button>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </section>
  );
}
