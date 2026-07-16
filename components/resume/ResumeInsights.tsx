import { ResumeInsight } from '@/types/resume';
import { Eye, FileCheck, Code, Users, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResumeInsights({ insights }: { insights: ResumeInsight[] }) {
  const getIcon = (iconName: string, className?: string) => {
    switch (iconName) {
      case 'eye': return <Eye className={className} />;
      case 'file-check': return <FileCheck className={className} />;
      case 'code': return <Code className={className} />;
      case 'users': return <Users className={className} />;
      default: return <Lightbulb className={className} />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map(insight => (
        <div key={insight.id} className="border border-border/60 rounded-xl bg-card shadow-sm p-4 hover:shadow-md hover:border-primary/30 transition-all duration-300 group cursor-default">
          <div className="flex items-start justify-between mb-3">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              insight.score >= 90 ? "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white" :
              insight.score >= 70 ? "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white" :
              "bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white"
            )}>
              {getIcon(insight.icon, "w-4 h-4")}
            </div>
            <span className={cn(
              "font-black text-sm",
              insight.score >= 90 ? "text-emerald-500" :
              insight.score >= 70 ? "text-orange-500" : "text-red-500"
            )}>
              {insight.score}/100
            </span>
          </div>
          <h4 className="font-bold text-sm text-foreground mb-1">{insight.name}</h4>
          <p className="text-[11px] font-medium text-muted-foreground leading-tight">
            {insight.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}
