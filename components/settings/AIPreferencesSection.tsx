import { AIPreferences } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MessageSquare, Target, Calendar, Map, UserCircle } from 'lucide-react';

interface AIPreferencesSectionProps {
  data: AIPreferences;
  onChange: (data: Partial<AIPreferences>) => void;
}

export function AIPreferencesSection({ data, onChange }: AIPreferencesSectionProps) {
  
  const PreferenceCard = ({
    title,
    description,
    icon: Icon,
    options,
    value,
    onSelect
  }: {
    title: string;
    description: string;
    icon: any;
    options: string[];
    value: string;
    onSelect: (val: string) => void;
  }) => (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 pl-12">
        {options.map((opt) => {
          const isSelected = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={cn(
                "px-3 py-2 text-sm rounded-lg border transition-all text-center",
                isSelected
                  ? "bg-primary/10 border-primary text-primary font-medium"
                  : "bg-background border-border/50 text-muted-foreground hover:border-border hover:bg-muted"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader>
          <CardTitle>AI Preferences</CardTitle>
          <CardDescription>
            Customize how your AI Mentor interacts, assesses, and guides you through your career journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <PreferenceCard
            title="AI Response Style"
            description="Controls how detailed the AI Mentor's explanations and feedback will be."
            icon={MessageSquare}
            options={['Concise', 'Balanced', 'Detailed']}
            value={data.responseStyle}
            onSelect={(val: any) => onChange({ responseStyle: val })}
          />

          <PreferenceCard
            title="Interview Difficulty"
            description="Controls the complexity and depth of AI-generated mock interview questions."
            icon={Target}
            options={['Easy', 'Medium', 'Hard']}
            value={data.interviewDifficulty}
            onSelect={(val: any) => onChange({ interviewDifficulty: val })}
          />

          <PreferenceCard
            title="Study Plan Frequency"
            description="Determines how often the AI generates and updates your personalized study tasks."
            icon={Calendar}
            options={['Daily', 'Weekly', 'Adaptive']}
            value={data.studyPlan}
            onSelect={(val: any) => onChange({ studyPlan: val })}
          />

          <PreferenceCard
            title="Roadmap Style"
            description="Dictates the pace and focus of your generated learning paths."
            icon={Map}
            options={['Fast Track', 'Balanced', 'Deep Learning']}
            value={data.roadmapStyle}
            onSelect={(val: any) => onChange({ roadmapStyle: val })}
          />

          <PreferenceCard
            title="Mentor Personality"
            description="Sets the tone of the AI Mentor during chats and feedback sessions."
            icon={UserCircle}
            options={['Friendly', 'Professional', 'Strict']}
            value={data.mentorPersonality}
            onSelect={(val: any) => onChange({ mentorPersonality: val })}
          />

        </CardContent>
      </Card>
    </section>
  );
}
