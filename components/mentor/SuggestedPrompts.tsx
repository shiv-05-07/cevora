import { mockSuggestedPrompts } from '@/data/mockMentor';
import { FileText, Building2, Brain, Briefcase, Users, Code, Server, Map } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const iconMap = {
  FileText: FileText,
  Building2: Building2,
  Brain: Brain,
  Briefcase: Briefcase,
  Users: Users,
  Code: Code,
  Server: Server,
  Map: Map
};

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  // Group by category
  const categories = Array.from(new Set(mockSuggestedPrompts.map(p => p.category)));

  return (
    <div className="w-full max-w-4xl space-y-8">
      {categories.map(category => (
        <div key={category} className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider pl-2">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSuggestedPrompts.filter(p => p.category === category).map((p) => {
              const Icon = iconMap[p.icon as keyof typeof iconMap] || Brain;
              return (
                <Card 
                  key={p.id} 
                  className="p-4 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group border-border/60 shadow-sm"
                  onClick={() => onSelect(p.prompt)}
                >
                  <div className="flex flex-col items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{p.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {p.prompt}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
