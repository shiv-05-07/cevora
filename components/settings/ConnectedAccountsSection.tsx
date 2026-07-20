import { ConnectedAccount } from '@/types/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitBranch, Briefcase, Mail, Code, Terminal, BookOpen, Link } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConnectedAccountsSectionProps {
  data: ConnectedAccount[];
  onChange: (data: ConnectedAccount[]) => void;
}

export function ConnectedAccountsSection({ data, onChange }: ConnectedAccountsSectionProps) {
  
  const getIcon = (provider: string) => {
    switch (provider) {
      case 'GitHub': return GitBranch;
      case 'LinkedIn': return Briefcase;
      case 'Google': return Mail;
      case 'LeetCode': return Code;
      case 'Codeforces': return Terminal;
      case 'GeeksforGeeks': return BookOpen;
      default: return Link;
    }
  };

  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Link your external profiles to enrich AI Mentor insights and analytics data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((account) => {
              const Icon = getIcon(account.provider);
              const isConnected = account.status === 'Connected';

              return (
                <div key={account.id} className="p-4 border border-border/50 rounded-xl bg-card hover:border-border transition-colors flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-md", isConnected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{account.provider}</h4>
                        <p className={cn("text-xs font-medium", isConnected ? "text-emerald-500" : "text-muted-foreground")}>
                          {account.status}
                        </p>
                      </div>
                    </div>
                    <Button variant={isConnected ? "outline" : "default"} size="sm">
                      {isConnected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                  
                  {isConnected && (
                    <div className="pt-3 border-t border-border/40 text-xs text-muted-foreground grid grid-cols-2 gap-2">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider opacity-70">Last Sync</span>
                        <span className="font-medium text-foreground">{account.lastSync}</span>
                      </div>
                      {account.details?.repositories !== undefined && (
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider opacity-70">Repositories</span>
                          <span className="font-medium text-foreground">{account.details.repositories}</span>
                        </div>
                      )}
                      {account.details?.connections !== undefined && (
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider opacity-70">Connections</span>
                          <span className="font-medium text-foreground">{account.details.connections}</span>
                        </div>
                      )}
                      {account.details?.problemsSolved !== undefined && (
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider opacity-70">Problems</span>
                          <span className="font-medium text-foreground">{account.details.problemsSolved}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </CardContent>
      </Card>
    </section>
  );
}
