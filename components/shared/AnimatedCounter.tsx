'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ value, duration = 1000, className, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);
  const targetValue = typeof value === 'number' ? value : parseInt(value.toString().replace(/[^0-9.-]/g, ''), 10) || 0;

  React.useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function: easeOutQuart
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(easeOut * targetValue));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, duration]);

  // If the original value had a non-numeric string (e.g., "6 Days"), we want to preserve that format,
  // but for the animation to work perfectly, it's easier if we just prepend/append strings.
  // The user specifies prefix/suffix for complex strings.
  
  return (
    <span className={cn("inline-block tabular-nums", className)}>
      {prefix}{count}{suffix}
    </span>
  );
}
