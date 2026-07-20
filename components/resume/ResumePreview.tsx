import { FileText, Download, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ResumePreviewProps {
  fileName: string;
  date: Date;
  onReplace: () => void;
}

export function ResumePreview({ fileName, date, onReplace }: ResumePreviewProps) {
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = date.toLocaleDateString();

  const handleDownload = () => {
    toast.success("Mock PDF exported successfully.");
  };

  return (
    <div className="border border-border/60 rounded-2xl bg-card shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border/40 bg-muted/20 flex items-center justify-between">
        <h3 className="font-bold text-sm text-foreground/80 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Resume Preview
        </h3>
        <span className="text-xs font-semibold text-muted-foreground bg-background px-2 py-1 rounded-md border border-border/40">
          PDF
        </span>
      </div>
      
      <div className="p-6 flex flex-col items-center justify-center bg-muted/10 relative overflow-hidden group">
        <div className="w-36 h-48 bg-card rounded-md shadow-md border border-border/60 relative overflow-hidden transition-transform duration-300 group-hover:scale-105 p-3 flex flex-col gap-2">
          {/* Header Area */}
          <div className="flex flex-col items-center gap-1 mb-2">
            <div className="w-20 h-1.5 bg-foreground/80 rounded-full" />
            <div className="w-32 h-1 bg-muted-foreground/40 rounded-full" />
            <div className="w-24 h-1 bg-muted-foreground/40 rounded-full" />
          </div>
          
          {/* Experience Section */}
          <div className="space-y-1.5">
            <div className="w-full h-1 bg-primary/40 rounded-full mb-1" />
            <div className="flex justify-between items-center">
              <div className="w-16 h-1.5 bg-foreground/60 rounded-full" />
              <div className="w-10 h-1 bg-muted-foreground/40 rounded-full" />
            </div>
            <div className="w-12 h-1 bg-foreground/40 rounded-full mb-1" />
            <div className="space-y-1 pl-2">
              <div className="w-[90%] h-1 bg-muted-foreground/30 rounded-full flex gap-1 items-center before:content-[''] before:w-0.5 before:h-0.5 before:bg-muted-foreground/50 before:rounded-full" />
              <div className="w-[85%] h-1 bg-muted-foreground/30 rounded-full flex gap-1 items-center before:content-[''] before:w-0.5 before:h-0.5 before:bg-muted-foreground/50 before:rounded-full" />
              <div className="w-[70%] h-1 bg-muted-foreground/30 rounded-full flex gap-1 items-center before:content-[''] before:w-0.5 before:h-0.5 before:bg-muted-foreground/50 before:rounded-full" />
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-1.5 mt-1">
            <div className="w-full h-1 bg-primary/40 rounded-full mb-1" />
            <div className="flex justify-between items-center">
              <div className="w-14 h-1.5 bg-foreground/60 rounded-full" />
              <div className="w-8 h-1 bg-muted-foreground/40 rounded-full" />
            </div>
            <div className="w-20 h-1 bg-muted-foreground/30 rounded-full" />
          </div>
        </div>
        
        <div className="mt-6 text-center space-y-1">
          <div className="font-bold text-sm truncate max-w-[200px]" title={fileName}>
            {fileName}
          </div>
          <div className="text-xs font-medium text-muted-foreground">
            Uploaded {dateString} • {timeString}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-card border-t border-border/40 flex justify-between gap-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs font-bold" onClick={onReplace}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Replace
        </Button>
        <Button variant="outline" size="icon-sm" className="shrink-0" title="Download" onClick={handleDownload}>
          <Download className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon-sm" className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-500/10" title="Remove" onClick={onReplace}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
