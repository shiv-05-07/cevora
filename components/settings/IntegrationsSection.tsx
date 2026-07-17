import { Integration } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntegrationsSectionProps {
  data: Integration[];
  onChange: (data: Integration[]) => void;
}

export function IntegrationsSection({ data, onChange }: IntegrationsSectionProps) {
  
  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader>
          <CardTitle>Cevora Ecosystem Integrations</CardTitle>
          <CardDescription>
            Manage connections between Cevora modules. This ensures your data flows seamlessly across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((integration) => {
              const isHealthy = integration.status === 'Healthy';

              return (
                <div key={integration.id} className="p-4 border border-border/50 rounded-xl bg-card hover:border-border transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        {integration.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className={cn("w-1.5 h-1.5 rounded-full", isHealthy ? "bg-emerald-500" : "bg-amber-500")} />
                        <span className={cn("text-xs font-medium", isHealthy ? "text-emerald-500" : "text-amber-500")}>
                          {integration.status}
                        </span>
                        <span className="text-muted-foreground text-xs mx-1">•</span>
                        <span className="text-muted-foreground text-xs">Updated {integration.lastSync}</span>
                      </div>
                    </div>
                    <Switch checked={integration.enabled} onCheckedChange={() => {}} />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Data Sources</span>
                    <div className="flex flex-wrap gap-2">
                      {integration.dataSources.map(source => (
                        <span key={source} className="px-2 py-1 bg-muted rounded-md text-xs text-foreground">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </CardContent>
      </Card>
    </section>
  );
}
