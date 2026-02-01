'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './scanlines.module.css';

export interface ScanlinesProps extends HTMLAttributes<HTMLDivElement> {
  /** Line opacity (0-1) */
  opacity?: number;
  /** Line thickness in pixels */
  lineWidth?: number;
  /** Gap between lines in pixels */
  gap?: number;
  /** Line color */
  color?: string;
  /** Enable flicker animation */
  flicker?: boolean;
  /** Fixed position (covers viewport) or absolute (covers parent) */
  position?: 'fixed' | 'absolute';
}

export const Scanlines = forwardRef<HTMLDivElement, ScanlinesProps>(
  (
    {
      opacity = 0.1,
      lineWidth = 1,
      gap = 2,
      color = '#000000',
      flicker = false,
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.scanlines} ${flicker ? styles.flicker : ''} ${className || ''}`}
        style={{
          position,
          opacity,
          background: `repeating-linear-gradient(
            0deg,
            ${color},
            ${color} ${lineWidth}px,
            transparent ${lineWidth}px,
            transparent ${lineWidth + gap}px
          )`,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Scanlines.displayName = 'Scanlines';

export default Scanlines;
