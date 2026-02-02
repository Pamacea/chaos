'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './noise-pattern.module.css';

export interface NoisePatternProps extends HTMLAttributes<HTMLDivElement> {
  /** Noise opacity */
  opacity?: number;
  /** Noise frequency */
  frequency?: number;
  /** Noise type */
  type?: 'fractal' | 'turbulence' | 'uniform' | 'grain';
  /** Animation speed (0 = static) */
  speed?: number;
  /** Color */
  color?: string;
  /** Blend mode */
  blendMode?: string;
}

export const NoisePattern = forwardRef<HTMLDivElement, NoisePatternProps>(
  (
    {
      opacity = 0.1,
      frequency = 0.8,
      type = 'fractal',
      speed = 0,
      color = '#000',
      blendMode = 'overlay',
      className,
      ...props
    },
    ref
  ) => {
    const svgId = `noise-${type}-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div
        ref={ref}
        className={`${styles.noisePattern} ${speed > 0 ? styles.animated : ''} ${className || ''}`}
        style={
          {
            '--noise-opacity': opacity,
            '--noise-frequency': frequency,
            '--noise-color': color,
            '--animation-speed': `${speed}s`,
            mixBlendMode: blendMode,
          } as React.CSSProperties
        }
        {...props}
      >
        <svg className={styles.svg} style={{ display: 'none' }}>
          <defs>
            {type === 'fractal' && (
              <filter id={svgId}>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={frequency}
                  numOctaves={4}
                  stitchTiles="stitch"
                />
              </filter>
            )}
            {type === 'turbulence' && (
              <filter id={svgId}>
                <feTurbulence
                  type="turbulence"
                  baseFrequency={frequency}
                  numOctaves={2}
                  stitchTiles="stitch"
                />
              </filter>
            )}
            {type === 'uniform' && (
              <filter id={svgId}>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={frequency * 2}
                  numOctaves={3}
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            )}
            {type === 'grain' && (
              <filter id={svgId}>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={frequency * 5}
                  numOctaves={5}
                  stitchTiles="stitch"
                />
              </filter>
            )}
          </defs>
        </svg>

        <div
          className={styles.noise}
          style={{ filter: `url(#${svgId})` } as React.CSSProperties}
        />
      </div>
    );
  }
);

NoisePattern.displayName = 'NoisePattern';

export default NoisePattern;
