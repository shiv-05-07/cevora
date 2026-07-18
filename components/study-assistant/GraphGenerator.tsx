import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { evaluate } from 'mathjs';

interface GraphGeneratorProps {
  equation: string;
}

export function GraphGenerator({ equation }: GraphGeneratorProps) {
  const data = React.useMemo(() => {
    const points = [];
    let eq = equation.replace(/\s+/g, "");
    if (eq.includes("y=")) {
      eq = eq.split("=")[1];
    }
    
    for (let x = -10; x <= 10; x += 0.5) {
      try {
        const y = evaluate(eq, { x });
        if (isFinite(y)) {
          // Clamp Y to reasonable view bounds to prevent huge spikes
          let clampedY = y;
          if (clampedY > 100) clampedY = 100;
          if (clampedY < -100) clampedY = -100;
          points.push({ x: Number(x.toFixed(2)), y: Number(clampedY.toFixed(2)) });
        }
      } catch (e) {
        // Ignore error for invalid equations
      }
    }
    return points;
  }, [equation]);

  return (
    <div className="w-full h-full min-h-[350px] relative">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} />
            <YAxis />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '8px', border: 'none', color: '#fff' }}
              itemStyle={{ color: '#60a5fa' }}
            />
            <ReferenceLine x={0} stroke="#888" strokeWidth={2} />
            <ReferenceLine y={0} stroke="#888" strokeWidth={2} />
            <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} animationDuration={1000} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
          Enter a valid mathematical equation (e.g., y = 2x + 1)
        </div>
      )}
      <div className="absolute top-2 left-4 bg-background/80 backdrop-blur-sm border px-3 py-1.5 rounded-md text-xs font-mono font-bold shadow-sm z-10 pointer-events-none">
        {equation}
      </div>
    </div>
  );
}
