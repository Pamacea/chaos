'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './vignette-overlay.module.css';

export interface VignetteOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Darkness intensity at edges (0-1) */
  intensity?: number;
  /** Gradient size percentage (how far clear area extends) */
  size?: number;
  /** Vignette color */
  color?: string;
  /** Soft edge feathering percentage */
  feather?: number;
  /** Fixed position (covers viewport) or absolute (covers parent) */
  position?: 'fixed' | 'absolute';
}

export const VignetteOverlay = forwardRef<HTMLDivElement, VignetteOverlayProps>(
  (
    {
      intensity = 0.5,
      size = 70,
      color = '#000000',
      feather = 30,
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

    // Calculate gradient stops for smooth feathering
    const clearStop = Math.max(0, size);
    const featherStart = Math.min(100, clearStop + (feather / 2));
    const featherEnd = Math.min(100, clearStop + feather);

    return (
      <div
        ref={ref}
        className={`${styles.vignetteOverlay} ${className || ''}`}
        style={{
          position,
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent ${clearStop}%,
            ${hexToRgba(color, intensity * 0.3)} ${featherStart}%,
            ${hexToRgba(color, intensity * 0.7)} ${featherEnd}%,
            ${hexToRgba(color, intensity)} 100%
          )`,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

VignetteOverlay.displayName = 'VignetteOverlay';

export default VignetteOverlay;
