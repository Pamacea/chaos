'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './neon-divider.module.css';

export interface NeonDividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'cyan' | 'pink' | 'green' | 'purple' | 'gradient';
  animated?: boolean;
  text?: string;
}

export const NeonDivider = forwardRef<HTMLDivElement, NeonDividerProps>(
  ({ variant = 'cyan', animated = false, text, className, ...props }, ref) => {
    const classes = [styles.divider, styles[variant], animated && styles.animated, className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes} {...props}>
        <span className={styles.line} />
        {text && <span className={styles.text}>{text}</span>}
        <span className={styles.line} />
      </div>
    );
  }
);

NeonDivider.displayName = 'NeonDivider';
export default NeonDivider;
