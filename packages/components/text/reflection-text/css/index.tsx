'use client';

import { forwardRef, HTMLAttributes, cloneElement, ReactElement } from 'react';
import styles from './reflection-text.module.css';

export interface ReflectionTextProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to display with reflection effect */
  children: React.ReactNode;
  /** Reflection opacity (0-1, default: 0.3) */
  reflectionOpacity?: number;
  /** Blur amount in pixels for the reflection (default: 2) */
  blur?: number;
  /** Skew transformation in degrees (default: 0) */
  skew?: number;
  /** Gap between text and reflection in pixels (default: 8) */
  gap?: number;
}

export const ReflectionText = forwardRef<HTMLDivElement, ReflectionTextProps>(
  (
    {
      children,
      reflectionOpacity = 0.3,
      blur = 2,
      skew = 0,
      gap = 8,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.reflectionContainer} ${className || ''}`}
        style={{
          '--reflection-opacity': reflectionOpacity,
          '--reflection-blur': `${blur}px`,
          '--reflection-skew': `${skew}deg`,
          '--reflection-gap': `${gap}px`,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <div className={styles.originalContent}>{children}</div>
        <div className={styles.reflection} aria-hidden="true">
          {children}
        </div>
      </div>
    );
  }
);

ReflectionText.displayName = 'ReflectionText';

export default ReflectionText;
