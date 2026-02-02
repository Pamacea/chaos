'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './shadow-glitch.module.css';

export interface ShadowGlitchProps extends HTMLAttributes<HTMLSpanElement> {
  /** The text to display with glitch shadows */
  children: string;
  /** Primary shadow color */
  shadowColor1?: string;
  /** Secondary shadow color */
  shadowColor2?: string;
  /** Shadow offset distance in pixels */
  offset?: number;
  /** Glitch intensity: subtle, medium, intense */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Enable animation on hover */
  hover?: boolean;
}

export const ShadowGlitch = forwardRef<HTMLSpanElement, ShadowGlitchProps>(
  (
    {
      children,
      shadowColor1 = '#ff0040',
      shadowColor2 = '#00ffff',
      offset = 3,
      intensity = 'medium',
      hover = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`${styles.shadowGlitch} ${styles[intensity]} ${hover ? styles.hover : ''} ${className || ''}`}
        style={{
          '--shadow-color-1': shadowColor1,
          '--shadow-color-2': shadowColor2,
          '--shadow-offset': `${offset}px`,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </span>
    );
  }
);

ShadowGlitch.displayName = 'ShadowGlitch';

export default ShadowGlitch;
