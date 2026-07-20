'use client';

import * as React from 'react';
import { ResumeAnalysisState, ATSAnalysisData } from '@/types/resume';
import { MockResumeAnalyzer } from '@/lib/mockResumeAnalyzer';

import { StatCard } from '@/components/dashboard/StatCard';
import { FileText, Target, AlertCircle, CheckCircle2 } from 'lucide-react';

import { UploadZone } from './UploadZone';
import { ResumePreview } from './ResumePreview';
import { ATSScoreCard } from './ATSScoreCard';
import { ScoreBreakdown } from './ScoreBreakdown';
import { SkillAnalysis } from './SkillAnalysis';
import { KeywordAnalysis } from './KeywordAnalysis';
import { SectionAnalysis } from './SectionAnalysis';
import { ImprovementSuggestions } from './ImprovementSuggestions';
import { ResumeInsights } from './ResumeInsights';
import { ResumeReportDialog } from './ResumeReportDialog';

export function ResumeAnalyzerClient() {
  const [status, setStatus] = React.useState<ResumeAnalysisState>('Idle');
  const [progressText, setProgressText] = React.useState('');
  const [data, setData] = React.useState<ATSAnalysisData | null>(null);
  const [reportOpen, setReportOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [uploadDate, setUploadDate] = React.useState<Date | null>(null);

  const handleUpload = async (file: File) => {
    setStatus('Uploading');
    setFileName(file.name);
    setUploadDate(new Date());
    
    try {
      const result = await MockResumeAnalyzer.simulateAnalysis((step) => {
        setProgressText(step);
        if (step.includes('Parsing') || step.includes('Extracting') || step.includes('Analyzing') || step.includes('Generating')) {
          setStatus('Analyzing');
        }
      });
      setData(result);
      setStatus('Completed');
    } catch (e) {
      setStatus('Error');
    }
  };

  const handleReset = () => {
    setStatus('Idle');
    setData(null);
    setProgressText('');
    setFileName(null);
    setUploadDate(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top StatCards - Using Dashboard consistency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="ATS Score" 
          value={data?.overallScore ? `${data.overallScore}` : '--'} 
          icon={Target} 
          trend={data ? { value: data.rating, isPositive: data.overallScore >= 80 } : undefined}
          className={data?.overallScore ? (data.overallScore >= 80 ? '[&_svg]:text-emerald-500' : '[&_svg]:text-orange-500') : ''}
        />
        <StatCard 
          title="Skills Found" 
          value={data?.detectedSkills.length.toString() || '--'} 
          icon={CheckCircle2} 
          className="[&_svg]:text-emerald-500"
        />
        <StatCard 
          title="Missing Keywords" 
          value={data?.missingKeywords.length.toString() || '--'} 
          icon={AlertCircle} 
          className="[&_svg]:text-orange-500"
        />
        <StatCard 
          title="Analyzed Resumes" 
          value={data ? "1" : "0"} 
          icon={FileText} 
        />
      </div>

      {status === 'Idle' || status === 'Uploading' || status === 'Analyzing' ? (
        <UploadZone 
          onUpload={handleUpload} 
          status={status} 
          progressText={progressText} 
        />
      ) : status === 'Completed' && data ? (
        <>
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            
            {/* Left Column (Preview & Score) */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8 sticky top-24">
              <ResumePreview 
                fileName={fileName || 'resume.pdf'} 
                date={uploadDate!} 
                onReplace={handleReset} 
              />
              <ATSScoreCard 
                score={data.overallScore} 
                rating={data.rating} 
                recommendation={data.recommendation} 
                percentile={data.percentile}
                interviewReadiness={data.interviewReadiness}
                onViewReport={() => setReportOpen(true)}
              />
            </div>
            
            {/* Right Column (Analysis Details) */}
            <div className="lg:col-span-8 space-y-6 md:space-y-8 pb-12">
              <ResumeInsights insights={data.insights} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <ScoreBreakdown categories={data.scoreBreakdown} />
                 <KeywordAnalysis 
                   match={data.keywordMatchPercentage} 
                   missing={data.missingKeywords} 
                   top={data.topMatchingKeywords} 
                   density={data.keywordDensity} 
                 />
              </div>

              <SkillAnalysis detected={data.detectedSkills} missing={data.missingSkills} />
              
              <SectionAnalysis sections={data.sectionAnalysis} />
              
              <ImprovementSuggestions suggestions={data.suggestions} />
            </div>

          </div>

          <ResumeReportDialog 
            isOpen={reportOpen} 
            onClose={() => setReportOpen(false)} 
            data={data}
            fileName={fileName || 'resume.pdf'}
          />
        </>
      ) : (
        <div className="p-8 text-center text-red-500 font-bold border rounded-2xl">
          An error occurred during analysis.
        </div>
      )}
    </div>
  );
}
