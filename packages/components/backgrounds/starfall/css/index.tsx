'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import styles from './starfall.module.css';

export interface StarfallProps extends HTMLAttributes<HTMLDivElement> {
  /** Density of stars */
  density?: 'sparse' | 'normal' | 'dense' | 'cosmic';
  /** Animation speed */
  speed?: 'slow' | 'normal' | 'fast' | 'meteor-shower';
  /** Trail effect intensity */
  trail?: boolean;
  /** Primary color of the stars */
  color?: string;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

export const Starfall = forwardRef<HTMLDivElement, StarfallProps>(
  (
    {
      density = 'normal',
      speed = 'normal',
      trail = true,
      color = '#fbbf24',
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const stars = useMemo(() => {
      const baseCount = density === 'sparse' ? 30 : density === 'normal' ? 60 : density === 'dense' ? 100 : 180;
      return Array.from({ length: baseCount }, (_, i) => {
        const size = Math.random();
        const sizeClass = size > 0.8 ? 'large' : size > 0.4 ? 'medium' : 'small';
        const starSize = size > 0.8 ? 4 : size > 0.4 ? 2.5 : 1.5;
        const x = Math.random() * 100;
        const duration = 4 + Math.random() * 8;
        const delay = Math.random() * -12;
        const drift = (Math.random() - 0.5) * 100;
        const isCross = size > 0.9;

        return {
          id: i,
          starSize,
          sizeClass,
          x,
          duration,
          delay,
          drift,
          isCross,
          withTrail: trail && size > 0.6,
        };
      });
    }, [density, trail]);

    const trails = useMemo(() => {
      if (!trail) return [];
      const count = density === 'sparse' ? 8 : density === 'normal' ? 15 : density === 'dense' ? 25 : 40;
      return Array.from({ length: count }, (_, i) => {
        const x = Math.random() * 100;
        const duration = 2 + Math.random() * 4;
        const delay = Math.random() * -6;
        const drift = (Math.random() - 0.5) * 150;
        const height = 30 + Math.random() * 50;

        return { id: i, x, duration, delay, drift, height };
      });
    }, [density, trail]);

    const bursts = useMemo(() => {
      const count = density === 'sparse' ? 2 : density === 'normal' ? 4 : density === 'dense' ? 6 : 10;
      return Array.from({ length: count }, (_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * -5;
        const size = 4 + Math.random() * 6;

        return { id: i, x, y, delay, size };
      });
    }, [density]);

    return (
      <div
        ref={ref}
        className={`${styles.container} ${className || ''}`}
        style={{
          position,
          '--star-color-internal': color,
          ...style,
        } as React.CSSProperties}
        data-density={density}
        data-speed={speed}
        aria-hidden="true"
        {...props}
      >
        {/* Burst effects */}
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className={styles.burst}
            style={{
              left: `${burst.x}%`,
              top: `${burst.y}%`,
              width: burst.size,
              height: burst.size,
              '--delay': `${burst.delay}s`,
            }}
          />
        ))}

        {/* Falling trails */}
        {trails.map((trailItem) => (
          <div
            key={trailItem.id}
            className={styles.trail}
            style={{
              left: `${trailItem.x}%`,
              height: `${trailItem.height}px`,
              '--duration': `${trailItem.duration}s`,
              '--delay': `${trailItem.delay}s`,
              '--drift': `${trailItem.drift}px`,
            }}
          />
        ))}

        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className={`${styles.star} ${styles[star.sizeClass]} ${star.withTrail ? styles.withTrail : ''} ${star.isCross ? styles.cross : ''}`}
            style={{
              width: star.starSize,
              height: star.starSize,
              left: `${star.x}%`,
              '--duration': `${star.duration}s`,
              '--delay': `${star.delay}s`,
              '--drift': `${star.drift}px`,
            }}
          />
        ))}
      </div>
    );
  }
);

Starfall.displayName = 'Starfall';

export default Starfall;
