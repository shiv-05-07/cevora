import { ATSAnalysisData } from '@/types/resume';
import { Download, FileText, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ScoreBreakdown } from './ScoreBreakdown';
import { KeywordAnalysis } from './KeywordAnalysis';
import { SkillAnalysis } from './SkillAnalysis';
import { ImprovementSuggestions } from './ImprovementSuggestions';
import { SectionAnalysis } from './SectionAnalysis';
import { toast } from 'sonner';
import { generateATSReportPDF } from '@/lib/pdfExport';

interface ResumeReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: ATSAnalysisData;
  fileName: string;
}

export function ResumeReportDialog({ isOpen, onClose, data, fileName }: ResumeReportDialogProps) {
  const handleDownload = () => {
    try {
      generateATSReportPDF(data, fileName);
      toast.success("PDF report downloaded successfully.");
    } catch (e) {
      toast.error("Failed to generate PDF report.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-[95vw] sm:max-w-[1400px] w-full h-[95vh] sm:h-[90vh] p-0 flex flex-col overflow-hidden bg-card border-border/60">
        
        {/* Sticky Header */}
        <DialogHeader className="p-6 border-b border-border/40 bg-muted/10 shrink-0 sticky top-0 z-10 flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1 pr-6">
            <DialogTitle className="text-2xl font-extrabold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              ATS Analysis Report
            </DialogTitle>
            <div className="text-sm font-medium text-muted-foreground">
              Document: <span className="text-foreground">{fileName}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:flex font-bold shadow-sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download PDF Report
            </Button>
            <DialogClose render={<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" />}>
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto bg-muted/5">
          <div className="p-6 sm:p-10 space-y-12 max-w-6xl mx-auto">
            
            {/* Executive Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 p-8 rounded-2xl bg-card border border-border/60 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Overall Score</div>
                <div className="text-7xl font-black text-primary">{data.overallScore}</div>
                <div className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {data.rating}
                </div>
              </div>
              <div className="md:col-span-2 p-8 rounded-2xl bg-card border border-border/60 shadow-sm space-y-4 flex flex-col justify-center">
                <h3 className="text-xl font-bold">Executive Summary</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  Your resume scores <strong className="text-foreground">{data.overallScore}/100</strong>, indicating it is <strong>{data.rating.toLowerCase()}</strong>. 
                  {data.recommendation}
                  <br /><br />
                  While your structural formatting and education sections are exceptionally strong, 
                  you are missing several key recruiter keywords such as <strong className="text-foreground">{data.missingKeywords.slice(0, 2).map(k => k.word).join(' and ')}</strong>. 
                  Addressing the high-priority suggestions below will significantly improve your callback rate.
                </p>
              </div>
            </div>
            
            <hr className="border-border/40" />

            {/* Score Breakdown */}
            <div>
              <h3 className="text-2xl font-extrabold mb-6">Score Breakdown</h3>
              <ScoreBreakdown categories={data.scoreBreakdown} />
            </div>
            
            <hr className="border-border/40" />

            {/* Skills & Keywords */}
            <div>
              <h3 className="text-2xl font-extrabold mb-6">Keyword & Skill Optimization</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SkillAnalysis detected={data.detectedSkills} missing={data.missingSkills} />
                <KeywordAnalysis 
                  match={data.keywordMatchPercentage}
                  missing={data.missingKeywords}
                  top={data.topMatchingKeywords}
                  density={data.keywordDensity}
                />
              </div>
            </div>
            
            <hr className="border-border/40" />
            
            {/* Sections */}
            <div>
              <h3 className="text-2xl font-extrabold mb-6">Section Analysis</h3>
              <SectionAnalysis sections={data.sectionAnalysis} />
            </div>

            <hr className="border-border/40" />

            {/* Suggestions */}
            <div>
              <h3 className="text-2xl font-extrabold mb-6">Action Plan</h3>
              <ImprovementSuggestions suggestions={data.suggestions} />
            </div>
            
          </div>
        </div>
        
        {/* Sticky Mobile Footer */}
        <div className="p-4 border-t border-border/40 bg-card sm:hidden shrink-0">
          <Button className="w-full font-bold shadow-sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" /> Download Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
