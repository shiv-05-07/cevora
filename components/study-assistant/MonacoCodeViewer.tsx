'use client';

import * as React from 'react';
import Editor from '@monaco-editor/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

interface MonacoCodeViewerProps {
  code: string;
  language?: string;
  onCodeChange?: (newCode: string | undefined) => void;
}

export function MonacoCodeViewer({ code, language = 'javascript', onCodeChange }: MonacoCodeViewerProps) {
  const { theme, resolvedTheme } = useTheme();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  return (
    <Card className="flex flex-col h-full border-border/80 dark:border-border/40 shadow-sm overflow-hidden">
      <CardHeader className="px-4 py-3 border-b border-border/40 flex flex-row items-center justify-between space-y-0 bg-muted/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Code className="w-4 h-4" />
          </div>
          <CardTitle className="text-base font-bold">Code Workspace</CardTitle>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 text-xs font-semibold">
            {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 relative">
        <Editor
          height="100%"
          language={language}
          theme={isDark ? 'vs-dark' : 'light'}
          value={code}
          onChange={onCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
          }}
          className="absolute inset-0"
        />
      </CardContent>
    </Card>
  );
}
