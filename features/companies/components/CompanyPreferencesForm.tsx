'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { updateCompanyPreferences } from '../actions';

interface CompanyPreferencesFormProps {
  userId: string;
  initialProfile: any;
  onComplete: () => void;
}

export function CompanyPreferencesForm({ userId, initialProfile, onComplete }: CompanyPreferencesFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    opportunityTypePreference: initialProfile?.opportunityTypePreference || '',
    cgpa: initialProfile?.cgpa || '',
    currentSgpa: initialProfile?.currentSgpa || '',
    tenthPercentage: initialProfile?.tenthPercentage || '',
    twelfthPercentage: initialProfile?.twelfthPercentage || '',
    branch: initialProfile?.branch || initialProfile?.specialization || '',
    currentYear: initialProfile?.currentYear || '',
    graduationYear: initialProfile?.graduationYear || '',
    activeBacklogs: initialProfile?.activeBacklogs || 0,
    previousBacklogs: initialProfile?.previousBacklogs || 0,
    targetRole: initialProfile?.targetRole || '',
    skills: initialProfile?.skills ? initialProfile.skills.join(', ') : '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0);

      await updateCompanyPreferences(userId, {
        opportunityTypePreference: formData.opportunityTypePreference,
        cgpa: parseFloat(formData.cgpa as string) || null,
        currentSgpa: parseFloat(formData.currentSgpa as string) || null,
        tenthPercentage: parseFloat(formData.tenthPercentage as string) || null,
        twelfthPercentage: parseFloat(formData.twelfthPercentage as string) || null,
        branch: formData.branch,
        currentYear: parseInt(formData.currentYear as string) || null,
        graduationYear: parseInt(formData.graduationYear as string) || null,
        activeBacklogs: parseInt(formData.activeBacklogs as string) || 0,
        previousBacklogs: parseInt(formData.previousBacklogs as string) || 0,
        targetRole: formData.targetRole,
        skills: skillsArray,
      });
      
      onComplete();
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-8 shadow-sm border border-border/50 bg-card relative overflow-hidden mt-8">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22h20L12 2zm0 4.2L18.4 19H5.6L12 6.2z"/>
        </svg>
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Find opportunities made for you</h2>
        <p className="text-sm text-muted-foreground mb-8">
          Tell Cevora what you're looking for and we'll match your academic profile, skills and career goals with relevant internship and placement opportunities.
        </p>

        <div className="space-y-8">
          {/* Target Type */}
          <div className="space-y-3">
            <Label className="text-base">What are you looking for?</Label>
            <div className="grid grid-cols-3 gap-3">
              {['INTERNSHIP', 'PLACEMENT', 'BOTH'].map(type => (
                <button
                  key={type}
                  onClick={() => handleChange('opportunityTypePreference', type)}
                  className={`h-24 flex flex-col items-center justify-center rounded-xl border transition-all ${
                    formData.opportunityTypePreference === type
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <span className="font-medium capitalize">{type.toLowerCase()}</span>
                  <span className="text-[10px] text-muted-foreground mt-1">
                    {type === 'INTERNSHIP' ? 'Gain experience' : type === 'PLACEMENT' ? 'Full-time role' : 'Show all'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] w-full bg-border" />

          {/* Academic Profile */}
          <div className="space-y-4">
            <h3 className="font-medium">Your Academic Profile</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CGPA <span className="text-[10px] text-muted-foreground font-normal ml-2">{initialProfile?.cgpa ? '✓ From profile' : ''}</span></Label>
                <Input type="number" step="0.1" value={formData.cgpa} onChange={e => handleChange('cgpa', e.target.value)} placeholder="e.g. 7.4" />
              </div>
              <div className="space-y-2">
                <Label>Current SGPA <span className="text-[10px] text-muted-foreground font-normal ml-2">{initialProfile?.currentSgpa ? '✓ From profile' : ''}</span></Label>
                <Input type="number" step="0.1" value={formData.currentSgpa} onChange={e => handleChange('currentSgpa', e.target.value)} placeholder="e.g. 8.1" />
              </div>
              
              <div className="space-y-2">
                <Label>Branch <span className="text-[10px] text-muted-foreground font-normal ml-2">{(initialProfile?.branch || initialProfile?.specialization) ? '✓ From profile' : ''}</span></Label>
                <Input value={formData.branch} onChange={e => handleChange('branch', e.target.value)} placeholder="e.g. Computer Science & Engineering" />
              </div>
              
              <div className="space-y-2">
                <Label>Graduation Year <span className="text-[10px] text-muted-foreground font-normal ml-2">{initialProfile?.graduationYear ? '✓ From profile' : ''}</span></Label>
                <Input type="number" value={formData.graduationYear} onChange={e => handleChange('graduationYear', e.target.value)} placeholder="e.g. 2027" />
              </div>

              <div className="space-y-2">
                <Label>10th Percentage</Label>
                <Input type="number" value={formData.tenthPercentage} onChange={e => handleChange('tenthPercentage', e.target.value)} placeholder="e.g. 85" />
              </div>
              <div className="space-y-2">
                <Label>12th Percentage</Label>
                <Input type="number" value={formData.twelfthPercentage} onChange={e => handleChange('twelfthPercentage', e.target.value)} placeholder="e.g. 88" />
              </div>

              <div className="space-y-2">
                <Label>Active Backlogs</Label>
                <Input type="number" value={formData.activeBacklogs} onChange={e => handleChange('activeBacklogs', e.target.value)} placeholder="e.g. 0" />
              </div>
              <div className="space-y-2">
                <Label>Historical Backlogs</Label>
                <Input type="number" value={formData.previousBacklogs} onChange={e => handleChange('previousBacklogs', e.target.value)} placeholder="e.g. 0" />
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-border" />

          {/* Skills & Goals */}
          <div className="space-y-4">
            <h3 className="font-medium">Career Goals & Skills</h3>
            
            <div className="space-y-2">
              <Label>Preferred Role</Label>
              <Input value={formData.targetRole} onChange={e => handleChange('targetRole', e.target.value)} placeholder="e.g. Software Engineer" />
            </div>

            <div className="space-y-2">
              <Label>Your Skills <span className="text-xs text-muted-foreground font-normal ml-1">(comma separated)</span> <span className="text-[10px] text-muted-foreground font-normal ml-2">{initialProfile?.skills?.length ? '✓ From profile' : ''}</span></Label>
              <Input value={formData.skills} onChange={e => handleChange('skills', e.target.value)} placeholder="e.g. Java, DSA, SQL, React" />
            </div>
          </div>

          <Button 
            className="w-full h-12 text-base font-medium shadow-lg" 
            onClick={handleSubmit} 
            disabled={loading || !formData.opportunityTypePreference}
          >
            {loading ? 'Analyzing...' : 'Find My Opportunities'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
