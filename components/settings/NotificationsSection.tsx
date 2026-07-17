import { NotificationSettings } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface NotificationsSectionProps {
  data: NotificationSettings;
  onChange: (data: Partial<NotificationSettings>) => void;
}

export function NotificationsSection({ data, onChange }: NotificationsSectionProps) {
  
  const NotificationToggle = ({ id, label, description, checked, onCheckedChange }: {
    id: keyof NotificationSettings;
    label: string;
    description: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between space-x-2 py-3 border-b border-border/40 last:border-0 last:pb-0">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch 
        id={id} 
        checked={checked} 
        onCheckedChange={onCheckedChange} 
      />
    </div>
  );

  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how and when Cevora communicates with you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div>
            <h3 className="text-sm font-semibold mb-2">Delivery Channels</h3>
            <div className="bg-muted/20 border border-border/40 rounded-xl p-4">
              <NotificationToggle
                id="emailNotifications"
                label="Email Notifications"
                description="Receive updates and reports via email."
                checked={data.emailNotifications}
                onCheckedChange={(c) => onChange({ emailNotifications: c })}
              />
              <NotificationToggle
                id="pushNotifications"
                label="Push Notifications"
                description="Receive browser push notifications for immediate alerts."
                checked={data.pushNotifications}
                onCheckedChange={(c) => onChange({ pushNotifications: c })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Platform Alerts</h3>
            <div className="bg-muted/20 border border-border/40 rounded-xl p-4">
              <NotificationToggle
                id="interviewReminders"
                label="Interview Reminders"
                description="Get notified before scheduled mock interviews."
                checked={data.interviewReminders}
                onCheckedChange={(c) => onChange({ interviewReminders: c })}
              />
              <NotificationToggle
                id="studyReminder"
                label="Study Reminders"
                description="Daily or weekly nudges based on your study plan."
                checked={data.studyReminder}
                onCheckedChange={(c) => onChange({ studyReminder: c })}
              />
              <NotificationToggle
                id="weeklyReport"
                label="Weekly Career Report"
                description="A summary of your placement readiness and progress."
                checked={data.weeklyReport}
                onCheckedChange={(c) => onChange({ weeklyReport: c })}
              />
              <NotificationToggle
                id="placementUpdates"
                label="Placement Updates"
                description="Alerts about placement seasons and important dates."
                checked={data.placementUpdates}
                onCheckedChange={(c) => onChange({ placementUpdates: c })}
              />
              <NotificationToggle
                id="resumeScoreChanges"
                label="Resume Score Changes"
                description="Get notified when your ATS score improves or drops."
                checked={data.resumeScoreChanges}
                onCheckedChange={(c) => onChange({ resumeScoreChanges: c })}
              />
              <NotificationToggle
                id="companyAlerts"
                label="Company Alerts"
                description="Alerts when you reach readiness thresholds for preferred companies."
                checked={data.companyAlerts}
                onCheckedChange={(c) => onChange({ companyAlerts: c })}
              />
            </div>
          </div>

        </CardContent>
      </Card>
    </section>
  );
}
