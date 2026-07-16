'use client';

import * as React from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Settings, RefreshCw, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeEditorProps {
  language: string;
  setLanguage: (lang: string) => void;
  code: string;
  onChange: (value: string | undefined) => void;
  onReset: () => void;
}

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python 3' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

export function CodeEditor({
  language,
  setLanguage,
  code,
  onChange,
  onReset,
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const monaco = useMonaco();

  React.useEffect(() => {
    if (monaco) {
      // Custom theme setup can go here
      monaco.editor.defineTheme('cevora-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#00000000', // transparent to let container show
        }
      });
    }
  }, [monaco]);

  const editorTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'light';

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Editor Header / Toolbar */}
      <div className="flex flex-none items-center justify-between px-4 py-2 border-b border-border/60 bg-muted/20">
        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={(val) => setLanguage(val || 'javascript')}>
            <SelectTrigger className="h-7 w-[130px] text-xs font-semibold bg-transparent border-border/60">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(lang => (
                <SelectItem key={lang.value} value={lang.value} className="text-xs">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1.5">
          <Button 
            variant="ghost" 
            size="icon-xs" 
            onClick={onReset}
            title="Reset to starter code"
            className="text-muted-foreground"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon-xs" className="text-muted-foreground">
            <Settings className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon-xs" className="text-muted-foreground hidden sm:flex">
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 min-h-0 pt-2">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme={editorTheme}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineHeight: 22,
            padding: { top: 12, bottom: 12 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
            fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
          loading={
            <div className="flex items-center justify-center h-full text-muted-foreground text-xs animate-pulse">
              Loading editor...
            </div>
          }
        />
      </div>
    </div>
  );
}
