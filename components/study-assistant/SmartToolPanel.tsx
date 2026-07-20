'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LineChart, Network, Play } from 'lucide-react';
import { HoverCard } from '@/components/ui/hover-card';
import { GraphGenerator } from './GraphGenerator';
import { FlowVisualizer } from './FlowVisualizer';

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
    <HoverCard className="w-full flex flex-col p-0">
      <div className="w-full bg-transparent border-0 flex flex-col">
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

          {/* Graph display area */}
          <div className="h-[450px] bg-muted/10 flex items-center justify-center relative overflow-hidden w-full">
            {graphMode === 'idle' ? (
              <div className="text-muted-foreground text-sm flex flex-col items-center">
                <LineChart className="w-8 h-8 mb-2 opacity-50" />
                <p>Enter an equation above to generate a graph.</p>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full">
                <GraphGenerator equation={graphInput} />
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

          {/* Visualizer display area */}
          <div className="h-[450px] bg-muted/10 flex items-center justify-center relative overflow-hidden w-full">
            {visMode === 'idle' ? (
              <div className="text-muted-foreground text-sm flex flex-col items-center">
                <Network className="w-8 h-8 mb-2 opacity-50" />
                <p>Enter a problem or algorithm to generate a visual workflow.</p>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full">
                <FlowVisualizer problem={visualizerInput} />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </HoverCard>
  );
}
