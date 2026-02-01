'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './neon-toggle.module.css';

export interface NeonToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Current checked state */
  checked: boolean;
  /** Change callback */
  onChange: (checked: boolean) => void;
  /** Neon color variant */
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  /** Toggle size */
  size?: 'sm' | 'md' | 'lg';
}

export const NeonToggle = forwardRef<HTMLButtonElement, NeonToggleProps>(
  (
    {
      checked,
      onChange,
      variant = 'cyan',
      size = 'md',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.toggle,
      styles[variant],
      styles[size],
      checked && styles.checked,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={classes}
        onClick={() => !disabled && onChange(!checked)}
        {...props}
      >
        <span className={styles.track} />
        <span className={styles.thumb} />
      </button>
    );
  }
);

NeonToggle.displayName = 'NeonToggle';

export default NeonToggle;
