'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './neon-button.module.css';

export interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Neon color variant */
  variant?: 'cyan' | 'pink' | 'green' | 'purple' | 'red' | 'yellow';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Continuous glow pulse animation */
  glowing?: boolean;
  /** Animated gradient border */
  animated?: boolean;
  /** Cut corner style */
  cut?: boolean;
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    {
      children,
      variant = 'cyan',
      size = 'md',
      glowing = false,
      animated = false,
      cut = false,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      glowing && styles.glowing,
      animated && styles.animated,
      cut && styles.cut,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classes} {...props}>
        <span className={styles.text}>{children}</span>
        <span className={styles.glow} aria-hidden="true" />
      </button>
    );
  }
);

NeonButton.displayName = 'NeonButton';

export default NeonButton;
