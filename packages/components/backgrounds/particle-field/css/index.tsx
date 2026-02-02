'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import styles from './particle-field.module.css';

export interface ParticleFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of particles */
  count?: number;
  /** Particle color */
  color?: string;
  /** Particle size range [min, max] in pixels */
  sizeRange?: [number, number];
  /** Animation duration range [min, max] in seconds */
  durationRange?: [number, number];
  /** Particle opacity */
  opacity?: number;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

export const ParticleField = forwardRef<HTMLDivElement, ParticleFieldProps>(
  (
    {
      count = 50,
      color = '#ffffff',
      sizeRange = [1, 3],
      durationRange = [10, 20],
      opacity = 0.5,
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const particles = useMemo(() => {
      return Array.from({ length: count }, (_, i) => {
        const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
        const duration = durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]);
        const delay = Math.random() * -duration;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 100;

        return { id: i, size, duration, delay, startX, startY, drift };
      });
    }, [count, sizeRange, durationRange]);

    return (
      <div
        ref={ref}
        className={`${styles.container} ${className || ''}`}
        style={{ position, ...style }}
        aria-hidden="true"
        {...props}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className={styles.particle}
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: color,
              opacity,
              left: `${p.startX}%`,
              top: `${p.startY}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    );
  }
);

ParticleField.displayName = 'ParticleField';

export default ParticleField;
