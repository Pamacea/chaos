'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface ScanlinesProps extends HTMLAttributes<HTMLDivElement> {
  /** Line opacity (0-1) */
  opacity?: number;
  /** Line thickness in pixels */
  lineWidth?: number;
  /** Gap between lines in pixels */
  gap?: number;
  /** Line color */
  color?: string;
  /** Enable flicker animation */
  flicker?: boolean;
  /** Fixed position (covers viewport) or absolute (covers parent) */
  position?: 'fixed' | 'absolute';
}

export const Scanlines = forwardRef<HTMLDivElement, ScanlinesProps>(
  (
    {
      opacity = 0.1,
      lineWidth = 1,
      gap = 2,
      color = '#000000',
      flicker = false,
      position = 'fixed',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`inset-0 w-full h-full pointer-events-none z-[9998] ${
          flicker ? 'animate-[scanline-flicker_0.1s_infinite]' : ''
        } ${className}`}
        style={{
          position,
          opacity,
          background: `repeating-linear-gradient(
            0deg,
            ${color},
            ${color} ${lineWidth}px,
            transparent ${lineWidth}px,
            transparent ${lineWidth + gap}px
          )`,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Scanlines.displayName = 'Scanlines';

export default Scanlines;
