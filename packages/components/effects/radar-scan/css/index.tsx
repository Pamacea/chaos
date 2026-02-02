'use client';

import { forwardRef, useEffect, useRef, HTMLAttributes } from 'react';
import styles from './radar-scan.module.css';

export interface RadarScanProps extends HTMLAttributes<HTMLDivElement> {
  /** Scan color */
  color?: string;
  /** Scan line speed (rotation per second) */
  speed?: number;
  /** Radar size in pixels */
  size?: number;
  /** Number of rings */
  rings?: number;
  /** Number of blips/targets to show */
  blips?: Array<{ angle: number; distance: number }>;
  /** Enable pulse effect on blips */
  pulseBlips?: boolean;
  /** Scan width */
  scanWidth?: number;
}

export const RadarScan = forwardRef<HTMLDivElement, RadarScanProps>(
  (
    {
      color = 'rgba(0, 255, 0, 0.8)',
      speed = 1,
      size = 300,
      rings = 4,
      blips = [],
      pulseBlips = true,
      scanWidth = 2,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const scanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const scan = scanRef.current;
      if (!scan) return;

      scan.style.animationDuration = `${1 / speed}s`;
    }, [speed]);

    return (
      <div
        ref={ref}
        className={`${styles.radar} ${className || ''}`}
        style={{
          width: size,
          height: size,
          '--radar-color': color,
          '--scan-width': `${scanWidth}px`,
          ...style,
        }}
        {...props}
      >
        {/* Rings */}
        <div className={styles.rings}>
          {Array.from({ length: rings }).map((_, i) => (
            <div
              key={i}
              className={styles.ring}
              style={{ width: `${((i + 1) / rings) * 100}%`, height: `${((i + 1) / rings) * 100}%` }}
            />
          ))}
        </div>

        {/* Crosshairs */}
        <div className={styles.crosshairs}>
          <div className={styles.crosshair} style={{ transform: 'rotate(0deg)' }} />
          <div className={styles.crosshair} style={{ transform: 'rotate(90deg)' }} />
        </div>

        {/* Blips/Targets */}
        <div className={styles.blips}>
          {blips.map((blip, i) => (
            <div
              key={i}
              className={`${styles.blip} ${pulseBlips ? styles.pulse : ''}`}
              style={{
                '--angle': `${blip.angle}deg`,
                '--distance': `${blip.distance}%`,
              }}
            />
          ))}
        </div>

        {/* Scan Line */}
        <div ref={scanRef} className={styles.scanLine} />

        {/* Glow effect */}
        <div className={styles.glow} />
      </div>
    );
  }
);

RadarScan.displayName = 'RadarScan';

export default RadarScan;
