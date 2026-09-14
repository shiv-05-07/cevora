'use client';

import * as React from 'react';
import { ResumeAnalysisState, ATSAnalysisData } from '@/types/resume';
import { StatCard } from '@/components/dashboard/StatCard';
import { FileText, Target, AlertCircle, CheckCircle2, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

const PIPELINE_STEPS = [
  'Uploading Resume...',
  'Parsing Document...',
  'Extracting Sections...',
  'Analyzing ATS Compatibility...',
  'Matching Keywords...',
  'Calculating Resume Score...',
  'Generating AI Suggestions...',
  'Analysis Complete',
];

export function ResumeAnalyzerClient() {
  const [status, setStatus] = React.useState<ResumeAnalysisState>('Idle');
  const [progressText, setProgressText] = React.useState('');
  const [data, setData] = React.useState<ATSAnalysisData | null>(null);
  const [reportOpen, setReportOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [resumeId, setResumeId] = React.useState<string | null>(null);
  const [fileType, setFileType] = React.useState<string | null>(null);
  const [uploadDate, setUploadDate] = React.useState<Date | null>(null);
  const [totalAnalyzedCount, setTotalAnalyzedCount] = React.useState<number>(0);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Load previous completed analysis on initial page load
  React.useEffect(() => {
    let isMounted = true;
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/resume/latest');
        if (!res.ok) return;
        const json = await res.json();
        if (isMounted && json.success) {
          if (json.totalCount !== undefined) {
            setTotalAnalyzedCount(json.totalCount);
          }
          if (json.hasData && json.data) {
            setData(json.data);
            setFileName(json.resume?.fileName || 'resume.pdf');
            setResumeId(json.resume?.id || null);
            setFileType(json.resume?.fileType || 'pdf');
            setUploadDate(json.resume?.createdAt ? new Date(json.resume.createdAt) : new Date());
            setStatus('Completed');
          }
        }
      } catch (err) {
        // Silently keep Idle if fetch fails
      }
    };

    fetchLatest();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpload = async (file: File) => {
    setStatus('Uploading');
    setProgressText(PIPELINE_STEPS[0]);
    setFileName(file.name);
    setUploadDate(new Date());
    setErrorMessage(null);

    // Progressive stage transitions reflecting real pipeline
    let stepIndex = 0;
    const progressInterval = setInterval(() => {
      stepIndex += 1;
      if (stepIndex < PIPELINE_STEPS.length - 1) {
        setProgressText(PIPELINE_STEPS[stepIndex]);
        if (stepIndex >= 1) {
          setStatus('Analyzing');
        }
      }
    }, 1100);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/resume/analyze', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || json.error || "Couldn't analyze this resume. Please try uploading a different PDF or DOCX.");
      }

      setProgressText('Analysis Complete');
      setData(json.data);
      if (json.resume) {
        setResumeId(json.resume.id);
        setFileType(json.resume.fileType);
        setFileName(json.resume.fileName);
        setUploadDate(new Date(json.resume.createdAt));
      }
      setTotalAnalyzedCount((prev) => prev + 1);
      setStatus('Completed');
      toast.success('Resume analyzed successfully with Gemini!');
    } catch (err: any) {
      clearInterval(progressInterval);
      setStatus('Error');
      setErrorMessage(err?.message || "Couldn't analyze this resume. Please try uploading a different PDF or DOCX.");
      toast.error('Resume analysis failed.');
    }
  };

  const handleReset = () => {
    setStatus('Idle');
    setData(null);
    setProgressText('');
    setFileName(null);
    setResumeId(null);
    setFileType(null);
    setUploadDate(null);
    setErrorMessage(null);
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
          className={
            data?.overallScore
              ? data.overallScore >= 80
                ? '[&_svg]:text-emerald-500'
                : '[&_svg]:text-orange-500'
              : ''
          }
        />
        <StatCard
          title="Skills Found"
          value={data?.detectedSkills ? data.detectedSkills.length.toString() : '--'}
          icon={CheckCircle2}
          className="[&_svg]:text-emerald-500"
        />
        <StatCard
          title="Missing Keywords"
          value={data?.missingKeywords ? data.missingKeywords.length.toString() : '--'}
          icon={AlertCircle}
          className="[&_svg]:text-orange-500"
        />
        <StatCard
          title="Analyzed Resumes"
          value={totalAnalyzedCount.toString()}
          icon={FileText}
        />
      </div>

      {status === 'Idle' || status === 'Uploading' || status === 'Analyzing' ? (
        <UploadZone onUpload={handleUpload} status={status} progressText={progressText} />
      ) : status === 'Completed' && data ? (
        <>
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Left Column (Preview & Score) */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8 sticky top-24">
              <ResumePreview
                fileName={fileName || 'resume.pdf'}
                date={uploadDate || new Date()}
                onReplace={handleReset}
                resumeId={resumeId || undefined}
                fileType={fileType || undefined}
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
        /* Cevora Styled Error Panel */
        <div className="p-8 md:p-12 border border-red-500/30 rounded-3xl bg-card shadow-sm flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-foreground">Analysis Could Not Complete</h3>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-md">
              {errorMessage || "Couldn't analyze this resume. Please try uploading a different PDF or DOCX."}
            </p>
          </div>
          <Button onClick={handleReset} className="font-bold shadow-sm mt-2" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
