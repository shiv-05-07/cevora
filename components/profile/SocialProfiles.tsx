'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AggregatedProfile } from '@/types/profile';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, GitBranch, Briefcase, Mail, Code, Terminal, BookOpen, CheckCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface SocialProfilesProps {
  profile: AggregatedProfile;
  recruiterMode: boolean;
}

export function SocialProfiles({ profile, recruiterMode }: SocialProfilesProps) {
  const { settings } = profile;

  const handleConnect = (provider: string) => {
    toast.success(`Connecting to ${provider}...`);
  };

  const mapProviderToIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'github': return GitBranch;
      case 'linkedin': return Briefcase;
      case 'google': return Mail;
      case 'leetcode': return Code;
      case 'codeforces': return Terminal;
      case 'geeksforgeeks': return BookOpen;
      default: return Globe;
    }
  };

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Social & Coding Profiles
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {settings.accounts.map((account) => {
            const Icon = mapProviderToIcon(account.provider);
            const isConnected = account.status === 'Connected';

            return (
              <div 
                key={account.id}
                className="p-4 border border-border/50 bg-muted/10 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 hover:border-border/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border/50 shrink-0">
                    <Icon className="w-5 h-5 text-foreground/80" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">{account.provider}</span>
                    {isConnected ? (
                      <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Connected
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground font-medium">Not Connected</span>
                    )}
                  </div>
                </div>

                {!recruiterMode && (
                  <Button 
                    variant={isConnected ? "outline" : "default"} 
                    size="sm" 
                    className="h-8 text-xs px-3"
                    onClick={() => handleConnect(account.provider)}
                  >
                    {isConnected ? 'Connected' : (
                      <>
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Connect
                      </>
                    )}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
