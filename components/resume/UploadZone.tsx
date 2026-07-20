import * as React from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { ResumeAnalysisState } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  status: ResumeAnalysisState;
  progressText: string;
}

export function UploadZone({ onUpload, status, progressText }: UploadZoneProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    // Basic validation, mock accepts anything basically
    if (file.type === 'application/pdf' || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      onUpload(file);
    } else {
      alert("Please upload a PDF or DOCX file.");
    }
  };

  const steps = [
    'Uploading Resume...',
    'Parsing Document...',
    'Extracting Sections...',
    'Analyzing ATS Compatibility...',
    'Matching Keywords...',
    'Calculating Resume Score...',
    'Generating AI Suggestions...',
    'Analysis Complete'
  ];

  const currentStepIndex = steps.indexOf(progressText);

  if (status === 'Uploading' || status === 'Analyzing') {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-border/60 rounded-3xl bg-card/50 backdrop-blur-sm shadow-sm relative overflow-hidden transition-all duration-500 min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 animate-pulse" />
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-md w-full">
          
          <div className="relative mb-4">
            <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse" />
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center relative">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          </div>
          
          <div className="w-full space-y-3">
            {steps.map((step, idx) => {
              const isCompleted = currentStepIndex > idx || currentStepIndex === steps.length - 1;
              const isCurrent = currentStepIndex === idx && currentStepIndex !== steps.length - 1;
              const isPending = currentStepIndex < idx;
              
              if (isPending && idx > currentStepIndex + 1) return null; // Only show up to one future step

              return (
                <div key={step} className={cn(
                  "flex items-center gap-3 transition-all duration-500",
                  isCompleted ? "text-emerald-500 opacity-100" :
                  isCurrent ? "text-primary opacity-100 scale-105 transform origin-left" :
                  "text-muted-foreground opacity-40"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground shrink-0" />
                  )}
                  <span className={cn("font-bold text-sm", isCompleted && "text-foreground")}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "w-full flex flex-col items-center justify-center p-12 md:p-20 border-2 border-dashed rounded-3xl transition-all duration-300 cursor-pointer relative overflow-hidden group",
        dragActive 
          ? "border-primary bg-primary/5 shadow-[0_0_30px_-5px_rgba(var(--primary),0.2)]" 
          : "border-border/60 bg-card hover:border-primary/50 hover:bg-muted/30"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
      />
      
      <div className="flex flex-col items-center gap-6 text-center z-10">
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500",
          dragActive ? "bg-primary text-primary-foreground scale-110" : "bg-muted text-muted-foreground group-hover:scale-105 group-hover:text-primary group-hover:bg-primary/10"
        )}>
          <UploadCloud className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold tracking-tight">Upload your Resume</h3>
          <p className="text-muted-foreground font-medium">
            Drag and drop your file here, or click to browse
          </p>
        </div>
        
        <div className="flex gap-4 items-center text-sm font-semibold text-muted-foreground mt-4">
          <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-md border border-border/40">
            <FileText className="w-4 h-4 text-rose-500" /> PDF
          </div>
          <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-md border border-border/40">
            <FileText className="w-4 h-4 text-blue-500" /> DOCX
          </div>
        </div>
        
        <Button 
          variant={dragActive ? "default" : "secondary"} 
          className="mt-4 pointer-events-none transition-all duration-300 shadow-sm"
        >
          Select File
        </Button>
      </div>
    </div>
  );
}
