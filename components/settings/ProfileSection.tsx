import { ProfileSettings } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileSectionProps {
  data: ProfileSettings;
  onChange: (data: Partial<ProfileSettings>) => void;
}

export function ProfileSection({ data, onChange }: ProfileSectionProps) {
  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader className="flex flex-row items-center gap-6 pb-6">
          <Avatar className="w-24 h-24 border border-border">
            <AvatarImage src={data.avatar} alt={data.name} />
            <AvatarFallback className="text-2xl font-bold uppercase tracking-wider">
              {data.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 flex-1">
            <CardTitle className="text-2xl">{data.name}</CardTitle>
            <CardDescription className="text-base">{data.email}</CardDescription>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm">Upload Avatar</Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">Remove</Button>
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
              <Input 
                id="name" 
                value={data.name} 
                onChange={(e) => onChange({ name: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                value={data.email} 
                onChange={(e) => onChange({ email: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input 
                id="university" 
                value={data.university} 
                onChange={(e) => onChange({ university: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input 
                id="degree" 
                value={data.degree} 
                onChange={(e) => onChange({ degree: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input 
                id="graduationYear" 
                value={data.graduationYear} 
                onChange={(e) => onChange({ graduationYear: e.target.value })} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
