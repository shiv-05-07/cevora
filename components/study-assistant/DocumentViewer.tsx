'use client';

import * as React from 'react';
import { Upload, ZoomIn, ZoomOut, Maximize, FileText, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DetectedRegion } from './SmartScanner'; // Reuse types

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface DocumentViewerProps {
  onExtract: (text: string, regions: DetectedRegion[]) => void;
  onRegionClick: (region: DetectedRegion) => void;
  onPageChange: (current: number, total: number) => void;
  onFileNameChange: (name: string) => void;
}

export function DocumentViewer({ onExtract, onRegionClick, onPageChange, onFileNameChange }: DocumentViewerProps) {
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const [fileType, setFileType] = React.useState<'image' | 'pdf' | null>(null);
  
  const [numPages, setNumPages] = React.useState<number>(1);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [scale, setScale] = React.useState<number>(1.0);
  
  const [isScanning, setIsScanning] = React.useState(false);
  const [regions, setRegions] = React.useState<DetectedRegion[]>([]);
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    onPageChange(pageNumber, numPages);
  }, [pageNumber, numPages, onPageChange]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onFileNameChange(file.name);
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setRegions([]);
    setPageNumber(1);
    setScale(1.0);

    if (file.type === 'application/pdf') {
      setFileType('pdf');
      // For MVP, we skip OCR on PDFs and assume the user uses text selection or we just mock regions
      mockDetectRegions();
    } else if (file.type.startsWith('image/')) {
      setFileType('image');
      setNumPages(1);
      runOCR(url);
    }
  };

  const runOCR = async (url: string) => {
    setIsScanning(true);
    try {
      const worker = await createWorker('eng', 1);
      const { data } = await worker.recognize(url);
      
      interface OCRBlock {
        text: string;
        bbox: { x0: number; y0: number; x1: number; y1: number };
      }
      
      const pageData = data as unknown as { lines: OCRBlock[] };
      const detected: DetectedRegion[] = (pageData.lines || []).map((p: OCRBlock, i: number) => {
        const text = p.text.trim();
        let type: DetectedRegionType = 'text';
        
        if (text.includes('?') || text.toLowerCase().startsWith('what') || text.toLowerCase().startsWith('how')) {
          type = 'question';
        } else if (text.includes('=') || text.includes('+') || text.includes('\\')) {
          type = 'formula';
        } else if (text.includes('function') || text.includes('const') || text.includes('import') || text.includes('{')) {
          type = 'code';
        }
        
        return {
          id: `region-${i}`,
          type,
          text,
          bbox: p.bbox
        };
      }).filter((r: DetectedRegion) => r.text.length > 0);

      setRegions(detected);
      onExtract(data.text, detected);
      await worker.terminate();
    } catch (err) {
      console.error('OCR Error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const mockDetectRegions = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Mocked regions for PDF demo
      const mockRegions: DetectedRegion[] = [
        { id: '1', type: 'question', text: 'What is the significance of this architecture?', bbox: { x0: 50, y0: 100, x1: 500, y1: 150 } },
        { id: '2', type: 'formula', text: 'E = mc^2', bbox: { x0: 50, y0: 200, x1: 300, y1: 250 } },
        { id: '3', type: 'code', text: 'console.log("Hello")', bbox: { x0: 50, y0: 300, x1: 400, y1: 400 } }
      ];
      setRegions(mockRegions);
      onExtract("Mock PDF Text", mockRegions);
      setIsScanning(false);
    }, 1500);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const zoomIn = () => setScale(s => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale(s => Math.max(s - 0.25, 0.5));
  const resetZoom = () => setScale(1);

  const getRegionColor = (type: DetectedRegionType) => {
    switch (type) {
      case 'question': return 'border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'formula': return 'border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300';
      case 'code': return 'border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300';
      default: return 'border-zinc-500 bg-zinc-500/10 hover:bg-zinc-500/20 text-zinc-700 dark:text-zinc-300';
    }
  };

  type DetectedRegionType = 'question' | 'formula' | 'code' | 'text';

  return (
    <div className="flex flex-col h-full bg-muted/10 relative">
      {/* Viewer Toolbar */}
      <div className="h-12 border-b border-border/60 px-4 flex items-center justify-between bg-card shrink-0">
        <div className="flex items-center gap-2">
          {fileType === 'pdf' && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs font-medium px-2">Page {pageNumber} of {numPages}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPageNumber(p => Math.min(numPages, p + 1))} disabled={pageNumber >= numPages}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomOut} disabled={!fileUrl}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs font-medium w-12 text-center">{Math.round(scale * 100)}%</span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomIn} disabled={!fileUrl}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetZoom} disabled={!fileUrl}>
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Viewer Area */}
      <div className="flex-1 overflow-auto relative flex justify-center bg-muted/30 p-8">
        {!fileUrl ? (
          <div className="m-auto flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border/60 rounded-xl bg-card max-w-sm">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload Document</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Drop a PDF or Image here to start analyzing. We'll extract text, formulas, and code.
            </p>
            <Button onClick={() => fileInputRef.current?.click()} className="font-semibold shadow-sm w-full">
              <Upload className="w-4 h-4 mr-2" />
              Browse Files
            </Button>
            <input 
              type="file" 
              accept="image/*,application/pdf" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
          </div>
        ) : (
          <div 
            className="relative bg-background shadow-lg border border-border/40 transition-transform origin-top"
            style={{ transform: `scale(${scale})` }}
          >
            {isScanning && (
              <div className="absolute inset-0 z-50 bg-background/50 backdrop-blur-[2px] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            )}

            {fileType === 'pdf' ? (
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className="pdf-document"
              >
                <Page 
                  pageNumber={pageNumber} 
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="pdf-page"
                />
              </Document>
            ) : (
              <img src={fileUrl} alt="Document" className="max-w-[800px] h-auto object-contain pointer-events-none" />
            )}

            {/* Render interactive regions */}
            {!isScanning && regions.map(region => (
              <div
                key={region.id}
                onClick={() => onRegionClick(region)}
                className={cn(
                  "absolute border-2 rounded cursor-pointer transition-colors group",
                  getRegionColor(region.type)
                )}
                style={{
                  left: region.bbox.x0,
                  top: region.bbox.y0,
                  width: region.bbox.x1 - region.bbox.x0,
                  height: region.bbox.y1 - region.bbox.y0,
                }}
              >
                <div className="absolute -top-6 right-0 hidden group-hover:flex items-center gap-1 bg-background shadow-sm border border-border/60 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider text-foreground whitespace-nowrap z-10">
                  Select Context
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
