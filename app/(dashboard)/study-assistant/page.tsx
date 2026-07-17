'use client';

import * as React from 'react';
import { FileText, Upload, Loader2, Sparkles } from 'lucide-react';
import { AIChatEngine } from '@/components/study-assistant/AIChatEngine';
import { SmartToolPanel } from '@/components/study-assistant/SmartToolPanel';
import { Button } from '@/components/ui/button';

export default function PremiumStudyAssistantPage() {
  const [extractedText, setExtractedText] = React.useState<string>('');
  const [fileName, setFileName] = React.useState<string>('No file uploaded');
  const [isScanning, setIsScanning] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setIsScanning(true);

    try {
      if (file.type.startsWith('image/')) {
        const { createWorker } = await import('tesseract.js');
        const worker = await createWorker('eng', 1);
        const { data } = await worker.recognize(url);
        setExtractedText(data.text);
        await worker.terminate();
      } else if (file.type === 'application/pdf') {
        // Mock PDF text extraction
        setTimeout(() => {
          setExtractedText("This is mock extracted text from the PDF document. It contains formulas like E=mc^2 and concepts like Binary Search.");
          setIsScanning(false);
        }, 1500);
        return;
      }
    } catch (err) {
      console.error("Extraction error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-background p-6 gap-6 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Study Workspace</h1>
          <p className="text-sm text-muted-foreground">AI-Powered Document Analysis & Smart Tools</p>
        </div>
      </div>

      {/* 1. TOP: FILE UPLOAD SECTION */}
      <section className="bg-card border rounded-xl p-6 shadow-sm flex flex-col items-center justify-center border-dashed border-2 hover:border-primary/50 transition-colors">
        <input 
          type="file" 
          accept="image/*,application/pdf" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
        />
        
        {isScanning ? (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="font-semibold">Analyzing document...</p>
            <p className="text-sm text-muted-foreground">Extracting text context</p>
          </div>
        ) : extractedText ? (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-bold">{fileName}</span>
            </div>
            <div className="w-full max-h-32 overflow-y-auto bg-muted/30 rounded-md p-3 text-xs text-muted-foreground border mb-4">
              {extractedText}
            </div>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} size="sm">
              <Upload className="w-4 h-4 mr-2" /> Replace File
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Upload Document</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
              Upload a PDF or Image. The AI will extract the content and prepare it for analysis.
            </p>
            <Button onClick={() => fileInputRef.current?.click()} className="font-semibold shadow-sm px-8">
              Browse Files
            </Button>
          </div>
        )}
      </section>

      {/* 2. MIDDLE: CHAT INTERFACE */}
      <section className="flex flex-col h-[500px] border rounded-xl overflow-hidden shadow-sm">
        <div className="bg-muted/20 px-4 py-2 border-b text-sm font-semibold flex items-center justify-between">
          <span>Chat with Document</span>
          {extractedText && (
            <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-700 rounded-full">
              Context Loaded
            </span>
          )}
        </div>
        <div className="flex-1 overflow-hidden relative">
          <AIChatEngine documentContext={extractedText} />
        </div>
      </section>

      {/* 3. BOTTOM: SMART TOOL PANEL */}
      <section className="flex flex-col">
        <SmartToolPanel />
      </section>

    </div>
  );
}
