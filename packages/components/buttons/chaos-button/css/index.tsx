'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './chaos-button.module.css';

export interface ChaosButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Chaos level */
  chaos?: 'mild' | 'medium' | 'extreme';
  /** Button variant */
  variant?: 'solid' | 'outline' | 'broken';
  /** Accent color */
  accentColor?: string;
}

export const ChaosButton = forwardRef<HTMLButtonElement, ChaosButtonProps>(
  (
    {
      children,
      chaos = 'medium',
      variant = 'solid',
      accentColor = '#ff0040',
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[chaos]} ${styles[variant]} ${className || ''}`}
        style={{ '--accent': accentColor, ...style } as React.CSSProperties}
        {...props}
      >
        {/* Debris */}
        <span className={styles.debris1} />
        <span className={styles.debris2} />
        <span className={styles.debris3} />
        <span className={styles.debris4} />

        {/* Glitch slice */}
        <span className={styles.slice} />

        {/* Noise */}
        <span className={styles.noise} />

        {/* Content */}
        <span className={styles.content}>{children}</span>

        {/* Ghost layers */}
        <span className={styles.ghost1}>{children}</span>
        <span className={styles.ghost2}>{children}</span>
      </button>
    );
  }
);

ChaosButton.displayName = 'ChaosButton';

export default ChaosButton;
