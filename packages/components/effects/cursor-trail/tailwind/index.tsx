'use client';

import { HTMLAttributes, useEffect, useRef, useState } from 'react';

export interface CursorTrailProps extends HTMLAttributes<HTMLDivElement> { 
  trailCount?: number; trailSize?: number; trailColor?: string; blendMode?: 'normal' | 'difference' | 'screen'; hasCenterDot?: boolean; 
}

export const CursorTrailTailwind = ({ trailCount = 3, trailSize = 20, trailColor = '#fff', hasCenterDot = true, className = '', ...props }: CursorTrailProps) => {
  const [trails, setTrails] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTrails(prev => [{ x: e.clientX, y: e.clientY }, ...prev].slice(0, trailCount));
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [trailCount]);

  return (
    <div className={`relative w-full h-full cursor-none ${className}`} {...props}>
      {trails.map((pos, i) => (
        <div key={i} className="fixed border-2 pointer-events-none z-[9999] transition-transform" style={{ 
          left: (pos.x - trailSize / 2) + 'px', top: (pos.y - trailSize / 2) + 'px', width: trailSize + 'px', height: trailSize + 'px',
          borderColor: trailColor, mixBlendMode: 'difference', transform: `scale(${1 - i * 0.15}) rotate(${i * 5}deg)` 
        }} />
      ))}
      {hasCenterDot && trails[0] && (
        <div className="fixed w-1 h-1 bg-red-500 rounded-full pointer-events-none z-[10000]" style={{ left: (trails[0].x - 2) + 'px', top: (trails[0].y - 2) + 'px' }} />
      )}
    </div>
  );
};
