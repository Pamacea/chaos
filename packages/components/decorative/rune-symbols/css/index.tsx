'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './rune-symbols.module.css';

// Elder Futhark runes
export const RUNES = {
  fehu: 'ᚠ',      // wealth
  uruz: 'ᚢ',      // strength
  thurisaz: 'ᚦ',  // giant
  ansuz: 'ᚨ',     // god
  raidho: 'ᚱ',    // journey
  kenaz: 'ᚲ',     // torch
  gebo: 'ᚷ',      // gift
  wunjo: 'ᚹ',     // joy
  hagalaz: 'ᚺ',   // hail
  nauthiz: 'ᚾ',   // need
  isaz: 'ᛁ',      // ice
  jera: 'ᛃ',      // year
  eihwaz: 'ᛇ',    // yew
  perthro: 'ᛈ',   // mystery
  algiz: 'ᛉ',     // protection
  sowilo: 'ᛊ',    // sun
  tiwaz: 'ᛏ',     // victory
  berkano: 'ᛒ',   // birch
  ehwaz: 'ᛖ',     // horse
  mannaz: 'ᛗ',    // man
  laguz: 'ᛚ',     // water
  ingwaz: 'ᛝ',    // fertility
  dagaz: 'ᛞ',     // day
  othala: 'ᛟ',    // heritage
};

export interface RuneSymbolsProps extends HTMLAttributes<HTMLDivElement> {
  /** Runes to display (array of rune names or custom symbols) */
  runes?: (keyof typeof RUNES | string)[];
  /** Number of random runes to display */
  count?: number;
  /** Color variant */
  variant?: 'gold' | 'blood' | 'bone' | 'iron' | 'cyan';
  /** Animation style */
  animation?: 'glow' | 'floating' | 'pulsing' | 'flickering' | 'none';
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Scattered positioning (requires parent with dimensions) */
  scattered?: boolean;
}

const getRandomRunes = (count: number): string[] => {
  const runeValues = Object.values(RUNES);
  return Array.from({ length: count }, () => 
    runeValues[Math.floor(Math.random() * runeValues.length)]
  );
};

export const RuneSymbols = forwardRef<HTMLDivElement, RuneSymbolsProps>(
  (
    {
      runes,
      count = 6,
      variant = 'gold',
      animation = 'glow',
      direction = 'horizontal',
      size = 'md',
      scattered = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const resolvedRunes = runes 
      ? runes.map(r => RUNES[r as keyof typeof RUNES] || r)
      : getRandomRunes(count);

    const animationClass = animation !== 'none' ? styles[animation] : '';

    return (
      <div
        ref={ref}
        className={`
          ${styles.container} 
          ${styles[variant]} 
          ${styles[size]}
          ${direction === 'vertical' ? styles.vertical : ''}
          ${scattered ? styles.scattered : ''}
          ${animationClass}
          ${className || ''}
        `}
        style={style}
        {...props}
      >
        {resolvedRunes.map((rune, i) => (
          <span
            key={i}
            className={styles.rune}
            style={{
              '--delay': `${i * 0.5}s`,
              ...(scattered ? {
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
              } : {}),
            } as React.CSSProperties}
          >
            {rune}
          </span>
        ))}
      </div>
    );
  }
);

RuneSymbols.displayName = 'RuneSymbols';
export default RuneSymbols;
