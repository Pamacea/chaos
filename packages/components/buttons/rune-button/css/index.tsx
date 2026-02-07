'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './rune-button.module.css';

export type RuneType = 'power' | 'protection' | 'wisdom' | 'shadow';

export interface RuneButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Type of rune symbol */
  runeType?: RuneType;
  /** Custom glow color */
  glowColor?: string;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
}

const runeSymbols: Record<RuneType, string> = {
  power: 'ᛈ',
  protection: 'ᛟ',
  wisdom: 'ᚨ',
  shadow: 'ᚦ',
};

const defaultColors: Record<RuneType, string> = {
  power: '#ffd700',
  protection: '#4169e1',
  wisdom: '#9370db',
  shadow: '#2f4f4f',
};

export const RuneButton = forwardRef<HTMLButtonElement, RuneButtonProps>(
  (
    {
      children,
      runeType = 'power',
      glowColor,
      size = 'md',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const color = glowColor || defaultColors[runeType];
    const symbol = runeSymbols[runeType];

    return (
      <button
        ref={ref}
        className={`${styles.runeButton} ${styles[size]} ${className || ''}`}
        style={{
          '--rune-glow': color,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <svg className={styles.runeSvg} aria-hidden="true" viewBox="0 0 100 100">
          <defs>
            <filter id={`glow-${runeType}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle className={styles.ring} cx="50" cy="50" r="45" />
          <circle className={styles.ringInner} cx="50" cy="50" r="35" />
          <text
            className={styles.runeSymbol}
            x="50"
            y="58"
            textAnchor="middle"
            fontSize="32"
            filter={`url(#glow-${runeType})`}
          >
            {symbol}
          </text>
        </svg>
        <span className={styles.content}>{children}</span>
        <span className={styles.glowOverlay} aria-hidden="true" />
      </button>
    );
  }
);

RuneButton.displayName = 'RuneButton';

export default RuneButton;
