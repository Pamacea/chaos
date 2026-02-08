'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface ReflectionTextProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to display with reflection effect */
  children: React.ReactNode;
  /** Reflection opacity (0-1, default: 0.3) */
  reflectionOpacity?: number;
  /** Blur amount in pixels for the reflection (default: 2) */
  blur?: number;
  /** Skew transformation in degrees (default: 0) */
  skew?: number;
  /** Gap between text and reflection in pixels (default: 8) */
  gap?: number;
}

export const ReflectionText = forwardRef<HTMLDivElement, ReflectionTextProps>(
  (
    {
      children,
      reflectionOpacity = 0.3,
      blur = 2,
      skew = 0,
      gap = 8,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`relative inline-block ${className}`}
        style={style}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div
          className="absolute left-0 right-0 top-full pointer-events-none select-none"
          style={{
            marginTop: `${gap}px`,
            transform: `scaleY(-1) skewX(${skew}deg)`,
            transformOrigin: 'top center',
            opacity: reflectionOpacity,
            filter: `blur(${blur}px)`,
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0) 100%)',
          } as React.CSSProperties}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    );
  }
);

ReflectionText.displayName = 'ReflectionText';

export default ReflectionText;
