import * as React from 'react';
import { ReactFlow, MiniMap, Controls, Background, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface FlowVisualizerProps {
  problem: string;
}

function detectType(input: string) {
  const p = input.toLowerCase();
  if (p.includes('sort') || p.includes('search')) return 'algorithm';
  if (p.includes('equation') || p.includes('math')) return 'math';
  if (p.includes('system') || p.includes('login') || p.includes('auth')) return 'system';
  return 'general';
}

function generateSteps(input: string) {
  const type = detectType(input);

  if (type === 'algorithm') {
    return [
      'Start',
      'Initialize variables',
      'Apply algorithm logic',
      'Iterate / recursion',
      'Return result',
    ];
  }

  if (type === 'math') {
    return [
      'Understand equation',
      'Apply formula',
      'Simplify terms',
      'Solve step-by-step',
      'Final answer',
    ];
  }

  if (type === 'system') {
    return [
      'User sends request',
      'Backend processes',
      'Database interaction',
      'Response generated',
      'Result returned',
    ];
  }

  return [
    'Understand problem',
    'Break into steps',
    'Apply logic',
    'Solve',
    'Output result',
  ];
}

export function FlowVisualizer({ problem }: FlowVisualizerProps) {
  const { nodes, edges } = React.useMemo(() => {
    const rawSteps = generateSteps(problem);

    const newNodes: Node[] = rawSteps.map((step, index) => ({
      id: `node-${index}`,
      position: { x: 250, y: index * 80 + 20 },
      data: { label: step },
      style: {
        background: index === 0 ? '#eff6ff' : index === rawSteps.length - 1 ? '#f0fdf4' : '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        width: 200,
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px'
      }
    }));

    const newEdges: Edge[] = [];
    for (let i = 0; i < rawSteps.length - 1; i++) {
      newEdges.push({
        id: `edge-${i}`,
        source: `node-${i}`,
        target: `node-${i + 1}`,
        animated: true,
        style: { stroke: '#94a3b8', strokeWidth: 2 }
      });
    }

    return { nodes: newNodes, edges: newEdges };
  }, [problem]);

  return (
    <div className="w-full h-full min-h-[400px] border border-border/50 rounded-xl overflow-hidden bg-muted/5 relative">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
      <div className="absolute top-2 left-16 bg-background/80 backdrop-blur-sm border px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm z-10 pointer-events-none">
        Visualizing: {problem} ({detectType(problem)})
      </div>
    </div>
  );
}
