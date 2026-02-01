'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './hologram-card.module.css';

export interface HologramCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Neon color variant */
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  /** Show CRT scanlines */
  scanlines?: boolean;
  /** Flicker effect */
  flicker?: boolean;
}

export const HologramCard = forwardRef<HTMLDivElement, HologramCardProps>(
  (
    {
      children,
      variant = 'cyan',
      scanlines = true,
      flicker = false,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.card,
      styles[variant],
      flicker && styles.flicker,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className={styles.content}>{children}</div>
        {scanlines && <div className={styles.scanlines} />}
        <div className={styles.glow} />
      </div>
    );
  }
);

HologramCard.displayName = 'HologramCard';

export default HologramCard;
