import * as React from 'react';
import { Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

export interface DataSourceFooterProps {
  isMockData?: boolean;
}

export function DataSourceFooter({ isMockData = true }: DataSourceFooterProps) {
  return (
    <footer className="mt-8 p-4 rounded-xl border border-border/60 bg-muted/30 text-xs text-muted-foreground space-y-2">
      <div className="flex items-start gap-2.5">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="font-bold text-foreground text-xs">About Cevora Interview Data</h5>
          <p className="leading-relaxed">
            Company-specific DSA question lists are aggregated from publicly available candidate interview reports and company-tagged coding question datasets (e.g. LeetCode company tags).
          </p>
          <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
            Question appearance in company interviews is dynamic and varies by role, geographic location, interview loop type, and candidate level. These lists serve as a strategic preparation guide rather than a guaranteed interview topic list.
          </p>
        </div>
      </div>

      {isMockData && (
        <div className="flex items-center gap-2 pt-2 border-t border-border/40 text-[11px] text-amber-700 dark:text-amber-400">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>
            <strong>Development Data Mode:</strong> Currently displaying curated seed dataset. The system is architected to consume live API data feeds without UI changes.
          </span>
        </div>
      )}
    </footer>
  );
}
