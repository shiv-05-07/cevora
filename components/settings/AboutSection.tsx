import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Code, Users } from 'lucide-react';

export function AboutSection() {
  
  return (
    <section className="space-y-6">
      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
        <CardHeader>
          <CardTitle>About Cevora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border/50 rounded-xl bg-card">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
                <Code className="w-4 h-4 text-primary" />
                Version & Stack
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex justify-between"><span>Version</span> <span className="font-medium text-foreground">0.1.0-hackathon</span></li>
                <li className="flex justify-between"><span>Build Date</span> <span className="font-medium text-foreground">July 2026</span></li>
                <li className="flex justify-between"><span>Framework</span> <span className="font-medium text-foreground">Next.js 16 (App Router)</span></li>
                <li className="flex justify-between"><span>Styling</span> <span className="font-medium text-foreground">Tailwind CSS + shadcn/ui</span></li>
              </ul>
            </div>

            <div className="p-4 border border-border/50 rounded-xl bg-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
                  <Users className="w-4 h-4 text-primary" />
                  Credits
                </div>
                <p className="text-sm text-muted-foreground">
                  Built for the hackathon by Shivam. 
                  Focused on Career Intelligence and AI Mentorship.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/40">
                <a href="#" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <GitBranch className="w-4 h-4" />
                  View GitHub Repository
                </a>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </section>
  );
}
