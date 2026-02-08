'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './scanlines-overlay.module.css';

export interface ScanlinesOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Scanline thickness in pixels */
  thickness?: number;
  /** Scanline opacity (0-1) */
  opacity?: number;
  /** Scanline color */
  color?: string;
  /** Add CRT flicker effect */
  flicker?: boolean;
  /** Fixed position (covers viewport) or absolute (covers parent) */
  position?: 'fixed' | 'absolute';
}

export const ScanlinesOverlay = forwardRef<HTMLDivElement, ScanlinesOverlayProps>(
  (
    {
      thickness = 2,
      opacity = 0.15,
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
        className={`${styles.scanlinesOverlay} ${flicker ? styles.flicker : ''} ${className || ''}`}
        style={{
          position,
          opacity,
          background: `repeating-linear-gradient(
            0deg,
            ${color},
            ${color} ${thickness}px,
            transparent ${thickness}px,
            transparent ${thickness * 2}px
          )`,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

ScanlinesOverlay.displayName = 'ScanlinesOverlay';

export default ScanlinesOverlay;
