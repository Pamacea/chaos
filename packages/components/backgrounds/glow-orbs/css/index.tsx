'use client';

import { useMemo } from 'react';
import styles from './glow-orbs.module.css';

export interface GlowOrbsProps {
  /** Primary color theme (hex or rgb) */
  color?: string;
  /** Animation speed */
  speed?: 'slow' | 'medium' | 'fast';
  /** Orb intensity */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Number of orbs */
  count?: number;
  /** Container class name */
  className?: string;
}

export function GlowOrbs({
  color = '#ff0040',
  speed = 'medium',
  intensity = 'medium',
  count = 6,
  className,
}: GlowOrbsProps) {
  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 400 + 200;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * -10;
      const duration = Math.random() * 5 + 5;

      return {
        id: i,
        size,
        x,
        y,
        delay,
        duration,
        hue: Math.random() * 60 - 30, // Color variation
      };
    });
  }, [count]);

  const speedClass = speed === 'slow' ? styles.slow : speed === 'fast' ? styles.fast : '';
  const intensityClass = intensity === 'subtle' ? styles.subtle : intensity === 'intense' ? styles.intense : '';

  return (
    <div className={`${styles.container} ${speedClass} ${intensityClass} ${className || ''}`}>
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={styles.orb}
          style={
            {
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              animationDelay: `${orb.delay}s`,
              '--duration': `${orb.duration}s`,
              '--float-duration': `${orb.duration * 2.5}s`,
              filter: `hue-rotate(${orb.hue}deg) blur(80px)`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default GlowOrbs;
