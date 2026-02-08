'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './aurora.module.css';

export interface AuroraProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of aurora colors (5 colors will be used) */
  colors?: string[];
  /** Animation duration in seconds */
  speed?: number;
  /** Opacity/strength of the aurora effect */
  intensity?: number;
  /** Blur amount in pixels */
  blur?: number;
  /** Position the aurora effect */
  position?: 'fixed' | 'absolute';
  /** Animation style variant */
  variant?: 'default' | 'subtle' | 'dynamic';
  /** Constrain aurora to specific area */
  region?: 'full' | 'top' | 'bottom' | 'left' | 'right';
  /** Custom CSS blend mode */
  blendMode?: string;
}

export const Aurora = forwardRef<HTMLDivElement, AuroraProps>(
  (
    {
      colors = ['#00ff00', '#00ffff', '#ff00ff', '#00ff80', '#8000ff'],
      speed = 20,
      intensity = 0.5,
      blur = 100,
      position = 'fixed',
      variant = 'default',
      region = 'full',
      blendMode = 'screen',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const auroraStyle = {
      '--aurora-speed': `${speed}s`,
      '--aurora-intensity': intensity,
      '--aurora-blur': `${blur}px`,
      '--color-1': colors[0] || colors[0],
      '--color-2': colors[1] || colors[0],
      '--color-3': colors[2] || colors[0],
      '--color-4': colors[3] || colors[1] || colors[0],
      '--color-5': colors[4] || colors[2] || colors[0],
      mixBlendMode: blendMode,
      ...style,
    } as React.CSSProperties;

    const regionClass = region !== 'full' ? styles[region] : '';
    const variantClass = variant !== 'default' ? styles[variant] : '';

    const containerStyle = {
      position,
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={`${styles.container} ${className || ''}`}
        style={containerStyle}
        aria-hidden="true"
        {...props}
      >
        <div
          className={`${styles.aurora} ${regionClass} ${variantClass}`}
          style={auroraStyle}
        >
          <div className={styles.layer1} />
          <div className={styles.layer2} />
          <div className={styles.layer3} />
          <div className={styles.layer4} />
          <div className={styles.layer5} />
        </div>
      </div>
    );
  }
);

Aurora.displayName = 'Aurora';

export default Aurora;
