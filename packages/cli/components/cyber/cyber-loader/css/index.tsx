'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './cyber-loader.module.css';

export interface CyberLoaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Loader style */
  variant?: 'spinner' | 'dots' | 'bars' | 'pulse' | 'hexagon';
  /** Neon color */
  color?: 'cyan' | 'pink' | 'green' | 'purple';
  /** Loader size */
  size?: 'sm' | 'md' | 'lg';
}

export const CyberLoader = forwardRef<HTMLDivElement, CyberLoaderProps>(
  (
    {
      variant = 'spinner',
      color = 'cyan',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.loader,
      styles[variant],
      styles[color],
      styles[size],
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {variant === 'dots' && (
          <>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </>
        )}
        {variant === 'bars' && (
          <>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </>
        )}
      </div>
    );
  }
);

CyberLoader.displayName = 'CyberLoader';

export default CyberLoader;
