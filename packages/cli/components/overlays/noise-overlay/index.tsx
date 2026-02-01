'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './noise-overlay.module.css';

export interface NoiseOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Noise opacity (0-1) */
  opacity?: number;
  /** Noise frequency (higher = finer grain) */
  frequency?: number;
  /** Enable animation */
  animated?: boolean;
  /** Blend mode */
  blendMode?: 'overlay' | 'multiply' | 'screen' | 'soft-light' | 'normal';
  /** Fixed position (covers viewport) or absolute (covers parent) */
  position?: 'fixed' | 'absolute';
}

export const NoiseOverlay = forwardRef<HTMLDivElement, NoiseOverlayProps>(
  (
    {
      opacity = 0.05,
      frequency = 0.8,
      animated = false,
      blendMode = 'overlay',
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Generate SVG noise inline
    const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${frequency}' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

    return (
      <div
        ref={ref}
        className={`${styles.noise} ${animated ? styles.animated : ''} ${className || ''}`}
        style={{
          position,
          opacity,
          mixBlendMode: blendMode,
          backgroundImage: noiseSvg,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

NoiseOverlay.displayName = 'NoiseOverlay';

export default NoiseOverlay;
