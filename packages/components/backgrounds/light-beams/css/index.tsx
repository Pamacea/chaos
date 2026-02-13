'use client';

import { useMemo } from 'react';
import styles from './light-beams.module.css';

export interface LightBeamsProps {
  /** Beam color (hex or rgb) */
  color?: string;
  /** Animation speed */
  speed?: 'slow' | 'medium' | 'fast';
  /** Beam angle */
  angle?: 'shallow' | 'medium' | 'steep';
  /** Number of beams */
  count?: number;
  /** Container class name */
  className?: string;
}

export function LightBeams({
  color = '#00ffff',
  speed = 'medium',
  angle = 'medium',
  count = 8,
  className,
}: LightBeamsProps) {
  const beams = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angleOffset = Math.random() * 20 - 10;
      const duration = Math.random() * 4 + 6;
      const delay = Math.random() * -10;
      const startX = Math.random() * -80 - 10;
      const endX = Math.random() * 80 + 10;
      const opacity = Math.random() * 0.4 + 0.3;
      const height = Math.random() * 100 + 150;

      return {
        id: i,
        angleOffset,
        duration,
        delay,
        startX,
        endX,
        opacity,
        height,
      };
    });
  }, [count]);

  const speedClass = speed === 'slow' ? styles.slow : speed === 'fast' ? styles.fast : '';
  const angleClass = angle === 'shallow' ? styles.shallow : angle === 'steep' ? styles.steep : '';

  return (
    <div className={`${styles.container} ${speedClass} ${angleClass} ${className || ''}`}>
      {beams.map((beam) => (
        <div
          key={beam.id}
          className={styles.beam}
          style={
            {
              left: '50%',
              height: `${beam.height}vh`,
              '--beam-color': color,
              '--duration': `${beam.duration}s`,
              '--delay': `${beam.delay}s`,
              '--start-x': `${beam.startX}vw`,
              '--end-x': `${beam.endX}vw`,
              '--angle': `${25 + beam.angleOffset}deg`,
              '--max-opacity': beam.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default LightBeams;
