'use client';

import * as React from 'react';
import { Upload, Scan, Loader2, Image as ImageIcon } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type DetectedRegionType = 'question' | 'formula' | 'code' | 'text';

export interface DetectedRegion {
  id: string;
  type: DetectedRegionType;
  text: string;
  bbox: { x0: number; y0: number; x1: number; y1: number };
}

interface SmartScannerProps {
  onExtract: (text: string, regions: DetectedRegion[]) => void;
  onRegionClick: (region: DetectedRegion) => void;
}

export function SmartScanner({ onExtract, onRegionClick }: SmartScannerProps) {
  const [isScanning, setIsScanning] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<number>(0);
  const [regions, setRegions] = React.useState<DetectedRegion[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setRegions([]);
    setIsScanning(true);
    setProgress(0);

    try {
      const worker = await createWorker('eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });

      const { data } = await worker.recognize(imageUrl);
      
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

  const getRegionColor = (type: DetectedRegionType) => {
    switch (type) {
      case 'question': return 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300';
      case 'formula': return 'border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-300';
      case 'code': return 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300';
      default: return 'border-zinc-500 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300';
    }
  };

  return (
    <Card className="flex flex-col h-full border-border/80 dark:border-border/40 shadow-sm overflow-hidden relative">
      <CardContent className="flex-1 p-0 flex flex-col relative overflow-hidden bg-muted/10">
        {!image ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border/60 rounded-lg m-4 hover:bg-muted/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Scan className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Scanner</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Upload an image of a math problem, coding snippet, or theory question. Our AI will scan and solve it.
            </p>
            <Button onClick={() => fileInputRef.current?.click()} className="font-semibold shadow-sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
          </div>
        ) : (
          <div className="flex-1 relative overflow-auto p-4 flex justify-center items-start">
            <div className="relative inline-block rounded-md shadow-sm bg-background/50">
              <img 
                src={image} 
                alt="Scanned document" 
                className={cn("max-w-full h-auto object-contain rounded-md transition-opacity duration-300", isScanning && "opacity-50 blur-sm")}
              />
              
              {!isScanning && regions.map(region => {
                return (
                  <div
                    key={region.id}
                    onClick={() => onRegionClick(region)}
                    className={cn(
                      "absolute border-2 rounded-sm cursor-pointer hover:bg-opacity-30 opacity-60 transition-all group flex items-start justify-end p-1",
                      getRegionColor(region.type)
                    )}
                    style={{
                      left: region.bbox.x0,
                      top: region.bbox.y0,
                      width: region.bbox.x1 - region.bbox.x0,
                      height: region.bbox.y1 - region.bbox.y0,
                    }}
                    title={`Click to solve ${region.type}`}
                  >
                    <div className="hidden group-hover:flex items-center gap-1 bg-background shadow-sm border border-border/60 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider -mt-6">
                      Solve this
                    </div>
                  </div>
                );
              })}

              {isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-background/90 backdrop-blur-sm p-6 rounded-xl shadow-xl flex flex-col items-center border border-border/40">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <h4 className="font-bold text-lg mb-1">Scanning Document</h4>
                    <p className="text-sm text-muted-foreground mb-4">Extracting text and identifying regions...</p>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-xs font-semibold mt-2">{progress}%</span>
                  </div>
                </div>
              )}
            </div>
            
            {!isScanning && (
              <div className="absolute top-4 right-4 flex gap-2">
                 <Button size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                   <Upload className="w-4 h-4 mr-2" />
                   Scan Another
                 </Button>
                 <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
