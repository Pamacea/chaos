'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './arcane-circle.module.css';

export interface ArcaneCircleProps extends HTMLAttributes<HTMLDivElement> {
  /** Intensity of the magical effect */
  intensity?: 'mild' | 'medium' | 'extreme';
  /** Primary color of the arcane magic */
  color?: string;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

export const ArcaneCircle = forwardRef<HTMLDivElement, ArcaneCircleProps>(
  (
    {
      intensity = 'medium',
      color = '#8b5cf6',
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Generate runes in a circular pattern
    const runeCount = 12;
    const runes = Array.from({ length: runeCount }, (_, i) => {
      const angle = (i / runeCount) * 360 - 90;
      const radius = 35; // percentage
      const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
      const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
      const symbol = RUNES[i % RUNES.length];

      return { id: i, x, y, symbol, angle };
    });

    return (
      <div
        ref={ref}
        className={`${styles.container} ${className || ''}`}
        style={{
          position,
          '--arcane-color-internal': color,
          '--arcane-intensity-internal': intensity,
          ...style,
        } as React.CSSProperties}
        data-intensity={intensity}
        aria-hidden="true"
        {...props}
      >
        <div className={styles.energy} />

        <div className={`${styles.circle} ${styles.outer}`} />
        <div className={`${styles.circle} ${styles.middle}`} />
        <div className={`${styles.circle} ${styles.inner}`} />
        <div className={`${styles.circle} ${styles.core}`} />

        {runes.map((rune) => (
          <span
            key={rune.id}
            className={styles.rune}
            style={{
              left: `${rune.x}%`,
              top: `${rune.y}%`,
              transform: `translate(-50%, -50%) rotate(${rune.angle + 90}deg)`,
            }}
          >
            {rune.symbol}
          </span>
        ))}
      </div>
    );
  }
);

ArcaneCircle.displayName = 'ArcaneCircle';

export default ArcaneCircle;
