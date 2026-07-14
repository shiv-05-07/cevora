import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Reusable Feature Display Card.
 * Adheres to card standards, layout heights, and hover motion states defined in DESIGN_SYSTEM.md.
 */
export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative flex flex-col h-full border border-border bg-card p-6 rounded-xl transition-all duration-300 hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] hover:-translate-y-1">
      {/* Hover background glow accent */}
      <div className="absolute inset-0 bg-primary/[0.01] opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none" />

      {/* Icon frame with smooth transition */}
      <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
      </div>
      
      {/* Title */}
      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
}
