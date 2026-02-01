'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './static-flicker.module.css';

export interface StaticFlickerProps extends HTMLAttributes<HTMLDivElement> {
  /** Noise opacity (0-1) */
  opacity?: number;
  /** Flicker speed: slow, normal, fast */
  speed?: 'slow' | 'normal' | 'fast';
  /** Noise frequency */
  frequency?: number;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

export const StaticFlicker = forwardRef<HTMLDivElement, StaticFlickerProps>(
  (
    {
      opacity = 0.03,
      speed = 'normal',
      frequency = 0.9,
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${frequency}' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

    return (
      <div
        ref={ref}
        className={`${styles.static} ${styles[speed]} ${className || ''}`}
        style={{
          position,
          opacity,
          backgroundImage: noiseSvg,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

StaticFlicker.displayName = 'StaticFlicker';

export default StaticFlicker;
