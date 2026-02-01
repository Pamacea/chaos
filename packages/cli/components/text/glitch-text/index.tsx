'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './glitch-text.module.css';

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

export const GlitchText = forwardRef<HTMLSpanElement, GlitchTextProps>(
  (
    {
      children,
      intensity = 'medium',
      glitchColor = '#ff0040',
      glitchColorAlt = '#00ffff',
      static: isStatic = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`${styles.glitch} ${styles[intensity]} ${isStatic ? styles.static : ''} ${className || ''}`}
        data-text={children}
        style={{
          '--glitch-color': glitchColor,
          '--glitch-color-alt': glitchColorAlt,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </span>
    );
  }
);

GlitchText.displayName = 'GlitchText';

export default GlitchText;
