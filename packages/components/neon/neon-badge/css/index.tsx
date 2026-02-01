'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './neon-badge.module.css';

export interface NeonBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Neon color variant */
  variant?: 'cyan' | 'pink' | 'green' | 'purple' | 'red' | 'yellow';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Continuous pulse animation */
  pulse?: boolean;
  /** Outline style instead of filled */
  outline?: boolean;
}

export const NeonBadge = forwardRef<HTMLSpanElement, NeonBadgeProps>(
  (
    {
      children,
      variant = 'cyan',
      size = 'md',
      pulse = false,
      outline = false,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.badge,
      styles[variant],
      styles[size],
      pulse && styles.pulse,
      outline && styles.outline,
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

NeonBadge.displayName = 'NeonBadge';

export default NeonBadge;
