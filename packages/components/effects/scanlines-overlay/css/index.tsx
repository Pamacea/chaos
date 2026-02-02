'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './scanlines-overlay.module.css';

export interface ScanlinesOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Opacity of the scanlines */
  opacity?: number;
  /** Line thickness in pixels */
  lineThickness?: number;
  /** Scanline color */
  color?: string;
  /** Animate the scanlines */
  animated?: boolean;
  /** Animation speed */
  speed?: 'slow' | 'normal' | 'fast';
  /** Flicker effect on scanlines */
  flicker?: boolean;
  /** Curvature effect (CRT) */
  curvature?: boolean;
  /** Blend mode */
  blendMode?: string;
  /** Position type */
  position?: 'fixed' | 'absolute';
}

export const ScanlinesOverlay = forwardRef<HTMLDivElement, ScanlinesOverlayProps>(
  (
    {
      opacity = 0.1,
      lineThickness = 2,
      color = 'rgba(0, 0, 0, 0.5)',
      animated = false,
      speed = 'normal',
      flicker = false,
      curvature = false,
      blendMode = 'overlay',
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
        className={`${styles.scanlines} ${animated ? styles.animated : ''} ${
          flicker ? styles.flicker : ''
        } ${curvature ? styles.curvature : ''} ${styles[speed]} ${className || ''}`}
        style={{
          '--scanline-opacity': opacity,
          '--scanline-thickness': `${lineThickness}px`,
          '--scanline-color': color,
          mixBlendMode: blendMode,
          position,
          ...style,
        }}
        {...props}
      >
        <div className={styles.scanlinesInner} />
        {curvature && (
          <>
            <div className={styles.vignette} />
            <div className={styles.ambient} />
          </>
        )}
      </div>
    );
  }
);

ScanlinesOverlay.displayName = 'ScanlinesOverlay';

export default ScanlinesOverlay;
