'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './glowing-border.module.css';

export interface GlowingBorderProps extends HTMLAttributes<HTMLDivElement> {
  /** Neon color variant */
  variant?: 'cyan' | 'pink' | 'green' | 'purple' | 'rainbow';
  /** Pulse animation */
  animated?: boolean;
  /** Glow intensity */
  intensity?: 'low' | 'medium' | 'high';
}

export const GlowingBorder = forwardRef<HTMLDivElement, GlowingBorderProps>(
  (
    {
      children,
      variant = 'cyan',
      animated = true,
      intensity = 'medium',
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.container,
      styles[variant],
      styles[intensity],
      animated && styles.animated,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
);

GlowingBorder.displayName = 'GlowingBorder';

export default GlowingBorder;
