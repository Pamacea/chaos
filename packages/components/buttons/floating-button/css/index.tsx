'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './floating-button.module.css';

export interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Animation duration in seconds (default: 3) */
  floatSpeed?: number;
  /** Float distance in pixels (default: 10) */
  floatAmplitude?: number;
  /** Shadow blur size (default: 20) */
  shadowSize?: number;
  /** Shadow opacity 0-1 (default: 0.3) */
  shadowOpacity?: number;
}

export const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  (
    {
      children,
      floatSpeed = 3,
      floatAmplitude = 10,
      shadowSize = 20,
      shadowOpacity = 0.3,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const customStyle: React.CSSProperties = {
      '--float-speed': `${floatSpeed}s`,
      '--float-amplitude': `${floatAmplitude}px`,
      '--shadow-size': `${shadowSize}px`,
      '--shadow-opacity': shadowOpacity,
      ...style,
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        className={`${styles.button} ${className || ''}`}
        style={customStyle}
        {...props}
      >
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

FloatingButton.displayName = 'FloatingButton';

export default FloatingButton;
