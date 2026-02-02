'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface GlitchTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** The text to display with glitch effect */
  children: string;
  /** Glitch intensity: subtle, medium, intense */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Glitch color (CSS color for the offset layers) */
  glitchColor?: string;
  /** Secondary glitch color */
  glitchColorAlt?: string;
  /** Disable animation (static glitch) */
  static?: boolean;
}

const intensityClasses = {
  subtle: 'before:animate-[glitch-subtle-1_3s_infinite_alternate-reverse] after:animate-[glitch-subtle-2_3s_infinite_alternate-reverse]',
  medium: 'before:animate-[glitch-medium-1_0.3s_infinite_alternate-reverse] after:animate-[glitch-medium-2_0.3s_infinite_alternate-reverse]',
  intense: 'before:animate-[glitch-intense-1_0.15s_infinite_alternate-reverse] after:animate-[glitch-intense-2_0.15s_infinite_alternate-reverse]',
};

const clipPaths = {
  subtle: {
    before: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
    after: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
  },
  medium: {
    before: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
    after: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
  },
  intense: {
    before: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
    after: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
  },
};

export const GlitchText = forwardRef<HTMLSpanElement, GlitchTextProps>(
  (
    {
      children,
      intensity = 'medium',
      glitchColor = '#ff0040',
      glitchColorAlt = '#00ffff',
      static: isStatic = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`relative inline-block ${className}`}
        data-text={children}
        style={style}
        {...props}
      >
        <span
          className={`absolute inset-0 pointer-events-none ${isStatic ? '' : intensityClasses[intensity]}`}
          style={{
            color: glitchColor,
            zIndex: -1,
            clipPath: clipPaths[intensity].before,
            ...(isStatic ? { transform: 'translate(-2px, 2px)' } : {}),
          } as React.CSSProperties}
        >
          {children}
        </span>
        <span
          className={`absolute inset-0 pointer-events-none ${isStatic ? '' : intensityClasses[intensity]}`}
          style={{
            color: glitchColorAlt,
            zIndex: -2,
            clipPath: clipPaths[intensity].after,
            opacity: 0.8,
            ...(isStatic ? { transform: 'translate(2px, -2px)' } : {}),
          } as React.CSSProperties}
        >
          {children}
        </span>
        {children}
      </span>
    );
  }
);

GlitchText.displayName = 'GlitchText';

export default GlitchText;
