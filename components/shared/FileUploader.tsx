'use client';

import * as React from 'react';
import { UploadCloud, File, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

export interface FileUploaderProps {
  onUpload?: (file: File) => Promise<void>;
  acceptedTypes?: string[]; // e.g. ['.pdf', '.docx', 'image/png', 'image/jpeg']
  maxSizeMB?: number;
  className?: string;
  title?: string;
  description?: string;
}

export function FileUploader({
  onUpload,
  acceptedTypes = ['.pdf', '.docx', 'image/png', 'image/jpeg'],
  maxSizeMB = 5,
  className,
  title = "Upload your file",
  description = "Drag and drop or click to browse"
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [status, setStatus] = React.useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (selectedFile: File) => {
    setError(null);
    const ext = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    
    // Check type
    const isAccepted = acceptedTypes.some(type => {
      if (type.startsWith('.')) return ext === type;
      if (type.includes('/')) return selectedFile.type.match(type);
      return false;
    });

    if (!isAccepted) {
      setError(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`);
      return false;
    }

    // Check size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        handleFileSelection(droppedFile);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        handleFileSelection(selectedFile);
      }
    }
  };

  const handleFileSelection = async (selectedFile: File) => {
    setFile(selectedFile);
    
    if (onUpload) {
      setStatus('uploading');
      setUploadProgress(0);
      
      // Simulate progress for UI purposes if actual progress can't be tracked easily
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      try {
        await onUpload(selectedFile);
        clearInterval(interval);
        setUploadProgress(100);
        setStatus('success');
      } catch (err) {
        clearInterval(interval);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      }
    } else {
      // Just simulate success if no onUpload provided
      setStatus('success');
      setUploadProgress(100);
    }
  };

  const reset = () => {
    setFile(null);
    setError(null);
    setStatus('idle');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 text-center select-none group",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-border/60 hover:border-primary/50 hover:bg-muted/50 dark:border-border/40"
          )}
        >
          <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-foreground mb-1">{title}</h4>
          <p className="text-xs text-muted-foreground mb-4">{description}</p>
          <div className="text-[10px] font-medium text-muted-foreground/80 flex gap-2">
            <span>Max size: {maxSizeMB}MB</span>
            <span>&bull;</span>
            <span>Supported: {acceptedTypes.map(t => t.replace('image/', '')).join(', ')}</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedTypes.join(',')}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-border/80 dark:border-border/40 bg-card shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <File className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 mb-1">
                <p className="text-sm font-semibold text-foreground truncate">{file.name}</p>
                {status !== 'uploading' && (
                  <button onClick={reset} className="text-muted-foreground hover:text-foreground shrink-0 outline-none focus-visible:ring-2 rounded-full p-1">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                {status === 'uploading' && <span className="text-xs font-semibold text-primary animate-pulse">Uploading...</span>}
                {status === 'success' && <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Complete</span>}
                {status === 'error' && <span className="text-xs font-semibold text-destructive flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/> Failed</span>}
              </div>

              {status === 'uploading' && (
                <Progress value={uploadProgress} className="h-1.5 mt-3" />
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4 py-2.5 px-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs font-medium ml-2">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
