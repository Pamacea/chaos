'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './cta-brutal.module.css';

export interface CtaBrutalProps extends HTMLAttributes<HTMLButtonElement> {
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Full width */
  fullWidth?: boolean;
  /** Show arrow icon */
  showArrow?: boolean;
  /** Arrow direction */
  arrowDirection?: 'right' | 'left' | 'up' | 'down';
  /** Enable hover glitch effect */
  glitchOnHover?: boolean;
  /** Animated background */
  animated?: boolean;
}

export const CtaBrutal = forwardRef<HTMLButtonElement, CtaBrutalProps>(
  (
    {
      size = 'medium',
      variant = 'primary',
      fullWidth = false,
      showArrow = false,
      arrowDirection = 'right',
      glitchOnHover = false,
      animated = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const arrowIcons = {
      right: '→',
      left: '←',
      up: '↑',
      down: '↓',
    };

    return (
      <button
        ref={ref}
        className={`${styles.ctaBrutal} ${styles[size]} ${styles[variant]} ${
          fullWidth ? styles.fullWidth : ''
        } ${showArrow ? styles.withArrow : ''} ${arrowDirection ? styles[arrowDirection] : ''} ${
          glitchOnHover ? styles.glitch : ''
        } ${animated ? styles.animated : ''} ${className || ''}`}
        {...props}
      >
        <span className={styles.content}>
          {children}
          {showArrow && <span className={styles.arrow}>{arrowIcons[arrowDirection]}</span>}
        </span>
      </button>
    );
  }
);

CtaBrutal.displayName = 'CtaBrutal';

export default CtaBrutal;
