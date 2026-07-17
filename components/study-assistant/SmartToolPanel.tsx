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
    // Removed fixed h-[400px] — the panel now grows to fit content.
    // overflow-hidden was clipping graphs; replaced with natural flow.
    <div className="w-full bg-card border rounded-xl shadow-sm flex flex-col">
      <Tabs defaultValue="graph" className="w-full flex flex-col">
        <div className="border-b px-4 py-2 bg-muted/20 shrink-0">
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
        <TabsContent value="graph" className="flex flex-col m-0 data-[state=active]:flex">
          {/* Input bar */}
          <div className="p-4 border-b shrink-0">
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

          {/* Graph display area — min-h-[450px] so it never clips, overflow-auto for large output */}
          <div className="min-h-[450px] bg-muted/10 p-6 flex items-center justify-center relative overflow-auto">
            {graphMode === 'idle' ? (
              <div className="text-muted-foreground text-sm flex flex-col items-center">
                <LineChart className="w-8 h-8 mb-2 opacity-50" />
                <p>Enter an equation above to generate a graph.</p>
              </div>
            ) : (
              <div className="w-full h-full min-h-[380px] relative flex items-center justify-center">
                {/* Mock Graph using pure CSS/SVG — uses preserveAspectRatio="xMidYMid meet" to avoid distortion */}
                <svg
                  className="w-full max-w-lg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ minHeight: 320, maxHeight: 480 }}
                  aria-label={`Graph of ${graphInput}`}
                >
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

        {/* Solution Visualizer Tab */}
        <TabsContent value="visualizer" className="flex flex-col m-0 data-[state=active]:flex">
          {/* Input bar */}
          <div className="p-4 border-b shrink-0">
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

          {/* Visualizer display area — min-h + overflow-auto for large diagrams */}
          <div
            className="min-h-[450px] bg-muted/10 p-6 flex items-center justify-center overflow-auto"
            role="img"
            aria-label={visMode === 'rendering' ? `Visualization of ${visualizerInput}` : 'Visualizer area'}
          >
            {visMode === 'idle' ? (
              <div className="text-muted-foreground text-sm flex flex-col items-center">
                <Network className="w-8 h-8 mb-2 opacity-50" />
                <p>Enter a problem or algorithm to generate a visual workflow.</p>
              </div>
            ) : (
              // overflow-x-auto on the inner wrapper handles very wide diagrams
              <div className="overflow-x-auto w-full">
                <div className="flex items-center gap-4 text-sm font-semibold min-w-max flex-wrap justify-center p-4 mx-auto">
                  {/* Mock Flowchart */}
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-md whitespace-nowrap">
                    Start: {visualizerInput}
                  </div>
                  <ArrowRight className="text-muted-foreground shrink-0" />
                  <div className="bg-card border px-4 py-2 rounded-lg shadow-sm whitespace-nowrap">
                    Analyze Middle Element
                  </div>
                  <ArrowRight className="text-muted-foreground shrink-0" />
                  <div className="bg-card border px-4 py-2 rounded-lg shadow-sm whitespace-nowrap">
                    Condition Check
                  </div>
                  <ArrowRight className="text-muted-foreground shrink-0" />
                  <div className="bg-green-500/10 text-green-700 border border-green-500/20 px-4 py-2 rounded-lg shadow-sm whitespace-nowrap">
                    Result Found
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
