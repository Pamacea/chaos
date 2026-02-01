'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './cyber-input.module.css';

export interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Neon color variant */
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  /** Label above input */
  label?: string;
  /** Error message */
  error?: string;
}

export const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  (
    {
      variant = 'cyan',
      label,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const wrapperClasses = [
      styles.wrapper,
      styles[variant],
      error && styles.hasError,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputWrapper}>
          <input ref={ref} className={styles.input} {...props} />
          <span className={styles.border} />
          <span className={styles.glow} />
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

CyberInput.displayName = 'CyberInput';

export default CyberInput;
