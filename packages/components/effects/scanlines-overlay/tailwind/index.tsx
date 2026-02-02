'use client';

import { forwardRef, HTMLAttributes, useId } from 'react';

export interface ScanlinesOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Opacity of the scanlines */
  opacity?: number;
  /** Line thickness in pixels */
  lineThickness?: number;
  /** Scanline color */
  color?: string;
  /** Animate the scanlines */
  animated?: boolean;
  /** Animation speed */
  speed?: 'slow' | 'normal' | 'fast';
  /** Flicker effect on scanlines */
  flicker?: boolean;
  /** Curvature effect (CRT) */
  curvature?: boolean;
  /** Blend mode */
  blendMode?: string;
  /** Position type */
  position?: 'fixed' | 'absolute';
}

export const ScanlinesOverlay = forwardRef<HTMLDivElement, ScanlinesOverlayProps>(
  (
    {
      opacity = 0.1,
      lineThickness = 2,
      color = 'rgba(0, 0, 0, 0.5)',
      animated = false,
      speed = 'normal',
      flicker = false,
      curvature = false,
      blendMode = 'overlay',
      position = 'fixed',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const id = useId();

    const speedDuration = speed === 'slow' ? 12 : speed === 'fast' ? 4 : 8;

    return (
      <>
        <style>{`
          @keyframes scanlines-scroll-${id} {
            0% { background-position: 0 0; }
            100% { background-position: 0 ${lineThickness * 2}px; }
          }
          @keyframes flicker-${id} {
            0% { opacity: ${opacity}; }
            5% { opacity: ${opacity * 1.5}; }
            10% { opacity: ${opacity}; }
            15% { opacity: ${opacity * 0.5}; }
            20% { opacity: ${opacity}; }
            30% { opacity: ${opacity * 1.3}; }
            40% { opacity: ${opacity}; }
            50% { opacity: ${opacity * 0.8}; }
            60% { opacity: ${opacity}; }
            70% { opacity: ${opacity * 1.2}; }
            80% { opacity: ${opacity}; }
            90% { opacity: ${opacity * 0.9}; }
            100% { opacity: ${opacity}; }
          }
          @keyframes ambient-glow-${id} {
            0% { opacity: 0.5; }
            100% { opacity: 0.7; }
          }
          .scanlines-inner-${id} {
            background: linear-gradient(
              to bottom,
              transparent 50%,
              ${color} 50%
            );
            background-size: 100% ${lineThickness * 2}px;
            opacity: ${opacity};
            ${animated ? `animation: scanlines-scroll-${id} ${speedDuration}s linear infinite${flicker ? `, flicker-${id} 0.15s infinite` : ''};` : ''}
          }
          .ambient-${id} {
            animation: ambient-glow-${id} 3s ease-in-out infinite alternate;
          }
        `}</style>
        <div
          ref={ref}
          className={`top-0 left-0 right-0 bottom-0 pointer-events-none z-[9999] bg-transparent overflow-hidden ${curvature ? `bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]` : ''} ${className}`}
          style={{
            mixBlendMode: blendMode,
            position,
            ...style,
          }}
          {...props}
        >
          <div className={`w-full h-full scanlines-inner-${id}`} />
          {curvature && (
            <>
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
              <div
                className={`ambient-${id} absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[rgba(18,16,16,0)] via-[rgba(0,0,0,0.1)] to-[rgba(18,16,16,0)] pointer-events-none`}
                style={{ opacity: 0.6 }}
              />
            </>
          )}
        </div>
      </>
    );
  }
);

ScanlinesOverlay.displayName = 'ScanlinesOverlay';

export default ScanlinesOverlay;
