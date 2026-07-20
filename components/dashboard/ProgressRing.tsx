'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ProgressRingProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  animated?: boolean;
  color?: string; // CSS color or Tailwind class
  className?: string;
  trackClassName?: string;
  indicatorClassName?: string;
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 10,
  label,
  subtitle,
  animated = true,
  color,
  className,
  trackClassName,
  indicatorClassName,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const safeValue = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = circumference - (safeValue / 100) * circumference;

  return (
    <div
      className={cn('relative flex flex-col items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={cn('fill-transparent stroke-muted', trackClassName)}
        />
        
        {/* Indicator */}
        {animated ? (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className={cn('fill-transparent stroke-primary', indicatorClassName)}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeLinecap="round"
            style={color ? { stroke: color } : undefined}
          />
        ) : (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className={cn('fill-transparent stroke-primary transition-all duration-300 ease-out', indicatorClassName)}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={color ? { stroke: color } : undefined}
          />
        )}
      </svg>
      
      {/* Content centered inside ring */}
      {(label || subtitle) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {label && (
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {label}
            </span>
          )}
          {subtitle && (
            <span className="text-xs font-medium text-muted-foreground">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
