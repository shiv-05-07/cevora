import { mockTools } from '@/data/mockMentor';
import { FileText, Map, Code, Calendar, Video, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const iconMap = {
  FileText: FileText,
  Map: Map,
  Code: Code,
  Calendar: Calendar,
  Video: Video,
  Linkedin: Briefcase
};

export function MentorTools() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold tracking-tight mb-4">Quick Tools</h3>
      <div className="grid grid-cols-2 gap-3">
        {mockTools.map((tool) => {
          const Icon = iconMap[tool.icon as keyof typeof iconMap] || FileText;
          return (
            <Link key={tool.id} href={tool.href}>
              <Card className="p-3 border-border/60 shadow-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group h-full flex flex-col justify-center items-center text-center">
                <div className="p-2 bg-muted rounded-lg mb-2 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </div>
                <h4 className="font-bold text-xs">{tool.title}</h4>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
