import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Calendar, ExternalLink, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { RecommendationResult } from '../services/recommendationEngine';

interface CompanyCardProps {
  recommendation: RecommendationResult;
}

export function CompanyCard({ recommendation }: CompanyCardProps) {
  const { opportunity, eligibility, matchScore, category } = recommendation;
  const { company } = opportunity;

  // Determine badge color based on eligibility status
  const getStatusBadge = () => {
    switch (eligibility.status) {
      case 'eligible':
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200">Eligible</Badge>;
      case 'unknown':
        return <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200">Needs Verification</Badge>;
      case 'not_eligible':
        if (category === 'Almost Eligible') {
          return <Badge className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-amber-200">Almost Eligible</Badge>;
        }
        return <Badge variant="destructive" className="bg-red-500/10 text-red-700 hover:bg-red-500/20 border-red-200">Not Eligible</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-md transition-shadow h-full border-slate-200 bg-white">
      <CardHeader className="pb-4 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {company.logoUrl ? (
              <div className="w-12 h-12 rounded-md bg-white border border-slate-100 p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-md bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-slate-400">
                <Briefcase className="w-6 h-6" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg text-slate-900 leading-tight">{opportunity.title}</h3>
              <p className="text-slate-500 text-sm font-medium">{company.name}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-slate-600">Profile Match</span>
            <span className={matchScore >= 80 ? "text-green-600" : matchScore >= 50 ? "text-amber-600" : "text-slate-600"}>
              {matchScore}%
            </span>
          </div>
          <Progress value={matchScore} className="h-1.5" />
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow text-sm text-slate-600 space-y-4">
        
        {/* Criteria Checklist */}
        <div className="space-y-1.5">
          {eligibility.criteria.slice(0, 4).map((c, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              {c.status === 'satisfied' ? (
                <span className="text-green-600 font-medium flex items-center gap-1">✓ <span className="text-slate-600 font-normal">{c.key} {c.required.replace('>=', '').replace('<=', '')}</span></span>
              ) : c.status === 'failed' ? (
                <span className="text-red-600 font-medium flex items-center gap-1">✕ <span className="text-slate-600 font-normal">{c.key} (Missing)</span></span>
              ) : (
                <span className="text-amber-600 font-medium flex items-center gap-1">? <span className="text-slate-600 font-normal">{c.key} (Unknown)</span></span>
              )}
            </div>
          ))}
          {eligibility.criteria.length > 4 && (
            <div className="text-xs text-slate-400 pl-4">+{eligibility.criteria.length - 4} more criteria</div>
          )}
        </div>

        {/* Skills */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-slate-900">Skills</p>
          <div className="flex flex-wrap gap-1.5">
             {opportunity.skills.slice(0, 3).map((skill, idx) => (
               <Badge key={idx} variant="outline" className="text-[10px] font-normal text-slate-600 bg-slate-50 border-slate-200">
                 {skill}
               </Badge>
             ))}
             {opportunity.skills.length > 3 && (
               <Badge variant="outline" className="text-[10px] font-normal text-slate-500 bg-transparent border-dashed">
                 +{opportunity.skills.length - 3} more
               </Badge>
             )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-1 border-t border-slate-100">
          {opportunity.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs">{opportunity.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
             <Briefcase className="w-3.5 h-3.5 text-slate-400" />
             <span className="text-xs capitalize">{opportunity.type.toLowerCase().replace('_', ' ')}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex gap-2">
        <Link href={`/companies/${(company as any).slug}`} className="flex-1">
          <Button variant="outline" className="w-full text-sm font-medium bg-white hover:bg-slate-50 border-slate-200">
            View Details
          </Button>
        </Link>
          <a href={opportunity.applyUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button 
              className="w-full text-sm font-medium shadow-sm bg-blue-600 hover:bg-blue-700 text-white" 
            >
              Apply <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </a>
      </CardFooter>
    </Card>
  );
}
