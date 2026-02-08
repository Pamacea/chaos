'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './neon-glow.module.css';

export interface NeonGlowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Neon glow color (default: '#00ffff') */
  color?: string;
  /** Glow blur radius in pixels (default: 20) */
  glowSize?: number;
  /** Pulse animation duration in seconds (default: 2) */
  pulseSpeed?: number;
  /** Add realistic neon flicker effect (default: false) */
  flicker?: boolean;
}

export const NeonGlow = forwardRef<HTMLButtonElement, NeonGlowProps>(
  (
    {
      children,
      color = '#00ffff',
      glowSize = 20,
      pulseSpeed = 2,
      flicker = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const customStyle: React.CSSProperties = {
      '--neon-color': color,
      '--glow-size': `${glowSize}px`,
      '--pulse-speed': `${pulseSpeed}s`,
      ...style,
    } as React.CSSProperties;

    const classes = [
      styles.button,
      flicker && styles.flicker,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        style={customStyle}
        {...props}
      >
        <span className={styles.content}>{children}</span>
        <span className={styles.glowLayer1} aria-hidden="true" />
        <span className={styles.glowLayer2} aria-hidden="true" />
        <span className={styles.glowLayer3} aria-hidden="true" />
      </button>
    );
  }
);

NeonGlow.displayName = 'NeonGlow';

export default NeonGlow;
