'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface GlowOrbsProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of orb colors (will cycle through) */
  colors?: string[];
  /** Number of orbs */
  count?: number;
  /** Orb size range [min, max] in pixels */
  sizeRange?: [number, number];
  /** Blur amount in pixels */
  blur?: number;
  /** Animation duration range [min, max] in seconds */
  durationRange?: [number, number];
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

export const GlowOrbs = forwardRef<HTMLDivElement, GlowOrbsProps>(
  (
    {
      colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent, 300 100% 50%))', 'hsl(var(--muted))'],
      count = 5,
      sizeRange = [100, 300],
      blur = 80,
      durationRange = [15, 25],
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Generate random orbs
    const orbs = Array.from({ length: count }, (_, i) => {
      const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
      const duration = durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]);
      const delay = Math.random() * -duration;
      const color = colors[i % colors.length];
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      return {
        id: i,
        size,
        duration,
        delay,
        color,
        startX,
        startY,
      };
    });

    return (
      <div
        ref={ref}
        className={`inset-0 w-full h-full overflow-hidden pointer-events-none z-[1] ${className || ''}`}
        style={{ position, ...style }}
        aria-hidden="true"
        {...props}
      >
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full opacity-30 animate-float -translate-x-1/2 -translate-y-1/2"
            style={{
              width: orb.size,
              height: orb.size,
              background: orb.color,
              filter: `blur(${blur}px)`,
              left: `${orb.startX}%`,
              top: `${orb.startY}%`,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

GlowOrbs.displayName = 'GlowOrbs';

export default GlowOrbs;
