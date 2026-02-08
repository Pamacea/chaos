'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { ReflectionText as ReflectionTextCss } from './css';
import { ReflectionText as ReflectionTextTailwind } from './tailwind';

export interface ReflectionTextProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to display with reflection effect */
  children: React.ReactNode;
  /** Styling variant: 'css' for CSS Modules, 'tailwind' for Tailwind classes */
  variant?: 'css' | 'tailwind';
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
      variant = 'css',
      reflectionOpacity = 0.3,
      blur = 2,
      skew = 0,
      gap = 8,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const Component = variant === 'tailwind' ? ReflectionTextTailwind : ReflectionTextCss;

    return (
      <Component
        ref={ref}
        reflectionOpacity={reflectionOpacity}
        blur={blur}
        skew={skew}
        gap={gap}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

ReflectionText.displayName = 'ReflectionText';

export default ReflectionText;
