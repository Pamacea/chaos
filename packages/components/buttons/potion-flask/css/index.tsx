'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './potion-flask.module.css';

export type PotionColor = 'health' | 'mana' | 'poison' | 'strength' | 'invisibility';

export interface PotionFlaskProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Type of potion for color and effect */
  potionColor?: PotionColor;
  /** Number of bubbles to show */
  bubbles?: boolean | number;
  /** Size of the flask */
  size?: 'sm' | 'md' | 'lg';
}

const potionColors: Record<PotionColor, { liquid: string; glow: string; cork: string }> = {
  health: { liquid: '#e53935', glow: '#ff5252', cork: '#8d6e63' },
  mana: { liquid: '#1e88e5', glow: '#42a5f5', cork: '#8d6e63' },
  poison: { liquid: '#43a047', glow: '#66bb6a', cork: '#6d4c41' },
  strength: { liquid: '#ff9800', glow: '#ffb74d', cork: '#8d6e63' },
  invisibility: { liquid: '#9e9e9e', glow: '#e0e0e0', cork: '#8d6e63' },
};

export const PotionFlask = forwardRef<HTMLButtonElement, PotionFlaskProps>(
  (
    {
      children,
      potionColor = 'health',
      bubbles = true,
      size = 'md',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const colors = potionColors[potionColor];
    const bubbleCount = typeof bubbles === 'number' ? bubbles : bubbles ? 8 : 0;

    return (
      <button
        ref={ref}
        className={`${styles.potionFlask} ${styles[size]} ${className || ''}`}
        style={{
          '--potion-liquid': colors.liquid,
          '--potion-glow': colors.glow,
          '--potion-cork': colors.cork,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <svg className={styles.flaskSvg} viewBox="0 0 100 140" aria-hidden="true">
          <defs>
            <clipPath id="flask-clip">
              <path d="M35 20 L35 40 L20 80 Q15 90 25 100 L75 100 Q85 90 80 80 L65 40 L65 20 Z" />
            </clipPath>
            <linearGradient id="liquid-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="var(--potion-liquid)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--potion-glow)" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Flask outline */}
          <path
            className={styles.flaskOutline}
            d="M35 20 L35 40 L20 80 Q15 90 25 100 L75 100 Q85 90 80 80 L65 40 L65 20"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />

          {/* Liquid */}
          <g clipPath="url(#flask-clip)">
            <rect
              className={styles.liquid}
              x="10"
              y="60"
              width="80"
              height="50"
              fill="url(#liquid-gradient)"
            />
            {/* Liquid surface wave */}
            <ellipse
              className={styles.liquidSurface}
              cx="50"
              cy="60"
              rx="30"
              ry="5"
              fill="var(--potion-glow)"
            />
          </g>

          {/* Cork */}
          <rect
            className={styles.cork}
            x="32"
            y="8"
            width="36"
            height="14"
            rx="2"
            fill="var(--potion-cork)"
          />
          <rect
            className={styles.corkTop}
            x="35"
            y="5"
            width="30"
            height="6"
            rx="1"
            fill="rgba(0,0,0,0.2)"
          />

          {/* Glass highlight */}
          <path
            className={styles.highlight}
            d="M28 50 Q25 70 28 85"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Bubbles */}
          {bubbleCount > 0 && (
            <g className={styles.bubbles}>
              {Array.from({ length: bubbleCount }).map((_, i) => (
                <circle
                  key={i}
                  className={styles.bubble}
                  cx={30 + (i % 3) * 20}
                  cy={90 - Math.floor(i / 3) * 15}
                  r={2 + (i % 3)}
                  fill="rgba(255,255,255,0.6)"
                  style={{ '--bubble-delay': `${i * 0.3}s` } as React.CSSProperties}
                />
              ))}
            </g>
          )}
        </svg>

        {/* Glow effect */}
        <span className={styles.glow} aria-hidden="true" />

        {/* Optional label */}
        {children && <span className={styles.content}>{children}</span>}
      </button>
    );
  }
);

PotionFlask.displayName = 'PotionFlask';

export default PotionFlask;
