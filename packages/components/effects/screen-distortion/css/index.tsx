'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './screen-distortion.module.css';

export interface ScreenDistortionProps extends HTMLAttributes<HTMLDivElement> {
  /** Distortion type */
  type?: 'wave' | 'glitch' | 'chromatic' | 'noise';
  /** Distortion intensity */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Animation speed */
  speed?: 'slow' | 'normal' | 'fast';
  /** Only show on hover (requires parent with :hover) */
  hoverOnly?: boolean;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

export const ScreenDistortion = forwardRef<HTMLDivElement, ScreenDistortionProps>(
  (
    {
      type = 'glitch',
      intensity = 'medium',
      speed = 'normal',
      hoverOnly = false,
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
        className={`
          ${styles.distortion}
          ${styles[type]}
          ${styles[intensity]}
          ${styles[speed]}
          ${hoverOnly ? styles.hoverOnly : ''}
          ${className || ''}
        `}
        style={{ position, ...style }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

ScreenDistortion.displayName = 'ScreenDistortion';

export default ScreenDistortion;
