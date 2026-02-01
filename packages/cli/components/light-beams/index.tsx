'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './light-beams.module.css';

export interface LightBeamsProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of beam colors */
  colors?: string[];
  /** Number of beams */
  count?: number;
  /** Beam width in pixels */
  beamWidth?: number;
  /** Beam opacity (0-1) */
  opacity?: number;
  /** Animation duration range [min, max] in seconds */
  durationRange?: [number, number];
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

export const LightBeams = forwardRef<HTMLDivElement, LightBeamsProps>(
  (
    {
      colors = ['#7c3aed', '#06b6d4', '#ec4899', '#10b981', '#f59e0b'],
      count = 5,
      beamWidth = 2,
      opacity = 0.15,
      durationRange = [15, 25],
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const beams = Array.from({ length: count }, (_, i) => {
      const duration = durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]);
      const delay = Math.random() * -duration;
      const color = colors[i % colors.length];
      const positionX = ((i + 1) / (count + 1)) * 100;

      return {
        id: i,
        duration,
        delay,
        color,
        positionX,
      };
    });

    return (
      <div
        ref={ref}
        className={`${styles.container} ${className || ''}`}
        style={{ position, ...style }}
        aria-hidden="true"
        {...props}
      >
        {beams.map((beam) => (
          <div
            key={beam.id}
            className={styles.beam}
            style={{
              left: `${beam.positionX}%`,
              width: beamWidth,
              background: `linear-gradient(180deg, transparent, ${beam.color}, transparent)`,
              opacity,
              animationDuration: `${beam.duration}s`,
              animationDelay: `${beam.delay}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

LightBeams.displayName = 'LightBeams';

export default LightBeams;
