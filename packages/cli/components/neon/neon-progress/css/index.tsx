'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './neon-progress.module.css';

export interface NeonProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current progress value */
  value: number;
  /** Maximum value */
  max?: number;
  /** Neon color variant */
  variant?: 'cyan' | 'pink' | 'green' | 'purple' | 'rainbow';
  /** Bar size */
  size?: 'sm' | 'md' | 'lg';
  /** Shimmer animation */
  animated?: boolean;
  /** Show percentage value */
  showValue?: boolean;
}

export const NeonProgress = forwardRef<HTMLDivElement, NeonProgressProps>(
  (
    {
      value,
      max = 100,
      variant = 'cyan',
      size = 'md',
      animated = true,
      showValue = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
      <div 
        ref={ref} 
        className={`${styles.container} ${className || ''}`}
        {...props}
      >
        <div className={`${styles.track} ${styles[size]}`}>
          <div 
            className={`${styles.bar} ${styles[variant]} ${animated ? styles.animated : ''}`}
            style={{ width: `${percentage}%` }}
          />
          <div 
            className={styles.glow}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <span className={`${styles.value} ${styles[variant]}`}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

NeonProgress.displayName = 'NeonProgress';

export default NeonProgress;
