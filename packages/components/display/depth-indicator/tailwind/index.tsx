'use client';

import { HTMLAttributes } from 'react';

export interface DepthIndicatorProps extends HTMLAttributes<HTMLDivElement> { 
  currentDepth: number; minDepth?: number; maxDepth?: number; unit?: string; label?: string; 
  position?: 'left' | 'right'; showValue?: boolean; 
}

export const DepthIndicatorTailwind = ({ 
  currentDepth, minDepth = 0, maxDepth = 100, unit = 'm', label = 'DEPTH', position = 'left', showValue = true, className = '', ...props 
}: DepthIndicatorProps) => {
  const percentage = Math.min(100, Math.max(0, ((currentDepth - minDepth) / (maxDepth - minDepth)) * 100));

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 h-[60vh] flex flex-col items-center gap-5 z-50 ${position === 'left' ? 'left-10' : 'right-10'} ${className}`} {...props}>
      <span className="text-xs writing-mode-vertical tracking-[0.3em] opacity-40 rotate-180">{label}</span>
      <div className="w-1 h-full bg-white/10 relative">
        <div className="absolute bottom-0 left-0 right-0 bg-current transition-all duration-300" style={{ height: `${percentage}%` }} />
      </div>
      {showValue && <span className="font-mono text-xs tabular-nums opacity-60">{currentDepth}{unit}</span>}
    </div>
  );
};
