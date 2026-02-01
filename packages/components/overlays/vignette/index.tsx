'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './vignette.module.css';

export interface VignetteProps extends HTMLAttributes<HTMLDivElement> {
  /** Vignette intensity (0-1) */
  intensity?: number;
  /** Vignette color */
  color?: string;
  /** Vignette spread (0-1, how far the effect extends) */
  spread?: number;
  /** Fixed position (covers viewport) or absolute (covers parent) */
  position?: 'fixed' | 'absolute';
}

export const Vignette = forwardRef<HTMLDivElement, VignetteProps>(
  (
    {
      intensity = 0.8,
      color = '#000000',
      spread = 0.5,
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Convert hex to rgba for gradient
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const innerStop = Math.max(0, (1 - spread) * 100);

    return (
      <div
        ref={ref}
        className={`${styles.vignette} ${className || ''}`}
        style={{
          position,
          background: `radial-gradient(ellipse at center, transparent ${innerStop}%, ${hexToRgba(color, intensity)} 100%)`,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Vignette.displayName = 'Vignette';

export default Vignette;
