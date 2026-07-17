'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LineChart, Network, Play, ArrowRight } from 'lucide-react';

export function SmartToolPanel() {
  const [graphInput, setGraphInput] = React.useState('');
  const [visualizerInput, setVisualizerInput] = React.useState('');
  
  const [graphMode, setGraphMode] = React.useState<'idle' | 'rendering'>('idle');
  const [visMode, setVisMode] = React.useState<'idle' | 'rendering'>('idle');

  const handleGraphSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!graphInput) return;
    setGraphMode('rendering');
  };

  const handleVisSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visualizerInput) return;
    setVisMode('rendering');
  };

  return (
    <div className="w-full bg-card border rounded-xl overflow-hidden shadow-sm flex flex-col h-[400px]">
      <Tabs defaultValue="graph" className="w-full h-full flex flex-col">
        <div className="border-b px-4 py-2 bg-muted/20">
          <TabsList>
            <TabsTrigger value="graph" className="flex items-center gap-2 text-xs">
              <LineChart className="w-3.5 h-3.5" />
              Graph Generator
            </TabsTrigger>
            <TabsTrigger value="visualizer" className="flex items-center gap-2 text-xs">
              <Network className="w-3.5 h-3.5" />
              Solution Visualizer
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Graph Generator Tab */}
        <TabsContent value="graph" className="flex-1 flex flex-col m-0 data-[state=active]:flex">
          <div className="p-4 border-b">
            <form onSubmit={handleGraphSubmit} className="flex gap-2">
              <Input
                value={graphInput}
                onChange={(e) => setGraphInput(e.target.value)}
                placeholder="Enter equation (e.g., y = x^2 + 2x)"
                className="font-mono text-sm"
              />
              <Button type="submit">
                <Play className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </form>
          </div>
          <div className="flex-1 bg-muted/10 p-6 flex items-center justify-center relative overflow-hidden">
            {graphMode === 'idle' ? (
              <div className="text-muted-foreground text-sm flex flex-col items-center">
                <LineChart className="w-8 h-8 mb-2 opacity-50" />
                <p>Enter an equation above to generate a graph.</p>
              </div>
            ) : (
              <div className="w-full h-full relative flex items-center justify-center">
                {/* Mock Graph using pure CSS/SVG */}
                <svg className="w-full h-full max-w-lg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid */}
                  <g className="text-border/40" stroke="currentColor" strokeWidth="0.5">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(i => (
                      <React.Fragment key={i}>
                        <line x1={0} y1={i} x2={100} y2={i} />
                        <line x1={i} y1={0} x2={i} y2={100} />
                      </React.Fragment>
                    ))}
                  </g>
                  {/* Axes */}
                  <line x1={0} y1={50} x2={100} y2={50} stroke="currentColor" strokeWidth="1" className="text-foreground/80" />
                  <line x1={50} y1={0} x2={50} y2={100} stroke="currentColor" strokeWidth="1" className="text-foreground/80" />
                  {/* Mock Parabola */}
                  <path 
                    d="M 10 10 Q 50 130 90 10" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="text-primary"
                  />
                  {/* Mock Sine wave (if graphInput includes sin) */}
                  {graphInput.toLowerCase().includes('sin') && (
                    <path 
                      d="M 0 50 Q 12.5 10 25 50 T 50 50 T 75 50 T 100 50" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      className="text-amber-500"
                    />
                  )}
                </svg>
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm border px-3 py-1.5 rounded-md text-xs font-mono font-bold shadow-sm">
                  {graphInput}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Visualizer Tab */}
        <TabsContent value="visualizer" className="flex-1 flex flex-col m-0 data-[state=active]:flex">
          <div className="p-4 border-b">
            <form onSubmit={handleVisSubmit} className="flex gap-2">
              <Input
                value={visualizerInput}
                onChange={(e) => setVisualizerInput(e.target.value)}
                placeholder="Enter concept to visualize (e.g., Binary Search)"
              />
              <Button type="submit">
                <Play className="w-4 h-4 mr-2" />
                Visualize
              </Button>
            </form>
          </div>
          <div className="flex-1 bg-muted/10 p-6 flex items-center justify-center overflow-auto">
            {visMode === 'idle' ? (
              <div className="text-muted-foreground text-sm flex flex-col items-center">
                <Network className="w-8 h-8 mb-2 opacity-50" />
                <p>Enter a problem or algorithm to generate a visual workflow.</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-sm font-semibold max-w-2xl flex-wrap justify-center p-4">
                {/* Mock Flowchart */}
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-md whitespace-nowrap">
                  Start: {visualizerInput}
                </div>
                <ArrowRight className="text-muted-foreground" />
                <div className="bg-card border px-4 py-2 rounded-lg shadow-sm whitespace-nowrap">
                  Analyze Middle Element
                </div>
                <ArrowRight className="text-muted-foreground" />
                <div className="bg-card border px-4 py-2 rounded-lg shadow-sm whitespace-nowrap">
                  Condition Check
                </div>
                <ArrowRight className="text-muted-foreground" />
                <div className="bg-green-500/10 text-green-700 border border-green-500/20 px-4 py-2 rounded-lg shadow-sm whitespace-nowrap">
                  Result Found
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
