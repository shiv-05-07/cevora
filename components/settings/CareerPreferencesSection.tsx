import { CareerPreferences } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { BrainCircuit } from 'lucide-react';

interface CareerPreferencesSectionProps {
  data: CareerPreferences;
  onChange: (data: Partial<CareerPreferences>) => void;
}

export function CareerPreferencesSection({ data, onChange }: CareerPreferencesSectionProps) {
  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader>
          <CardTitle>Career Preferences</CardTitle>
          <CardDescription>
            Used by Analytics and AI Mentor to personalize recommendations and roadmaps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="targetRole">Target Role</Label>
              <Input 
                id="targetRole" 
                value={data.targetRole} 
                onChange={(e) => onChange({ targetRole: e.target.value })} 
              />
              <p className="text-xs text-muted-foreground">Used by Analytics and AI Mentor to personalize recommendations.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companies">Preferred Companies (comma separated)</Label>
              <Input 
                id="companies" 
                value={data.preferredCompanies.join(', ')} 
                onChange={(e) => onChange({ preferredCompanies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} 
              />
              <p className="text-xs text-muted-foreground">Determines company readiness analysis and roadmap suggestions.</p>
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select 
                value={data.experienceLevel} 
                onValueChange={(val: any) => onChange({ experienceLevel: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Availability</Label>
              <Select 
                value={data.availability} 
                onValueChange={(val: any) => onChange({ availability: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Immediate">Immediate</SelectItem>
                  <SelectItem value="1 Month">1 Month</SelectItem>
                  <SelectItem value="2 Months">2 Months</SelectItem>
                  <SelectItem value="3+ Months">3+ Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="techStack">Preferred Tech Stack (comma separated)</Label>
              <Input 
                id="techStack" 
                value={data.techStack.join(', ')} 
                onChange={(e) => onChange({ techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedPackage">Expected Package</Label>
              <Input 
                id="expectedPackage" 
                value={data.expectedPackage} 
                onChange={(e) => onChange({ expectedPackage: e.target.value })} 
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Work Mode Preferences</Label>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remote" 
                  checked={data.workMode.remote} 
                  onCheckedChange={(c) => onChange({ workMode: { ...data.workMode, remote: !!c } })} 
                />
                <Label htmlFor="remote" className="font-normal cursor-pointer">Remote</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hybrid" 
                  checked={data.workMode.hybrid} 
                  onCheckedChange={(c) => onChange({ workMode: { ...data.workMode, hybrid: !!c } })} 
                />
                <Label htmlFor="hybrid" className="font-normal cursor-pointer">Hybrid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="onsite" 
                  checked={data.workMode.onsite} 
                  onCheckedChange={(c) => onChange({ workMode: { ...data.workMode, onsite: !!c } })} 
                />
                <Label htmlFor="onsite" className="font-normal cursor-pointer">On-site</Label>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4 text-primary font-medium">
              <BrainCircuit className="w-5 h-5" />
              <h3>AI Career Preferences Preview</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your AI will optimize for:
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium">{data.targetRole || 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Companies</span>
                <span className="font-medium">{data.preferredCompanies.join(' • ') || 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Tech Stack</span>
                <span className="font-medium">{data.techStack.join(' • ') || 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Experience Level</span>
                <span className="font-medium">{data.experienceLevel || 'Not set'}</span>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </section>
  );
}
