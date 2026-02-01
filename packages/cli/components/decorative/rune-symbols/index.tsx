'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './rune-symbols.module.css';

export const RUNES = {
  fehu: 'ᚠ', uruz: 'ᚢ', thurisaz: 'ᚦ', ansuz: 'ᚨ', raidho: 'ᚱ', kenaz: 'ᚲ',
  gebo: 'ᚷ', wunjo: 'ᚹ', hagalaz: 'ᚺ', nauthiz: 'ᚾ', isaz: 'ᛁ', jera: 'ᛃ',
  eihwaz: 'ᛇ', perthro: 'ᛈ', algiz: 'ᛉ', sowilo: 'ᛊ', tiwaz: 'ᛏ', berkano: 'ᛒ',
  ehwaz: 'ᛖ', mannaz: 'ᛗ', laguz: 'ᛚ', ingwaz: 'ᛝ', dagaz: 'ᛞ', othala: 'ᛟ',
};

export interface RuneSymbolsProps extends HTMLAttributes<HTMLDivElement> {
  runes?: (keyof typeof RUNES | string)[];
  count?: number;
  variant?: 'gold' | 'blood' | 'bone' | 'iron' | 'cyan';
  animation?: 'glow' | 'floating' | 'pulsing' | 'flickering' | 'none';
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  scattered?: boolean;
}

const getRandomRunes = (count: number): string[] => {
  const runeValues = Object.values(RUNES);
  return Array.from({ length: count }, () => runeValues[Math.floor(Math.random() * runeValues.length)]);
};

export const RuneSymbols = forwardRef<HTMLDivElement, RuneSymbolsProps>(
  ({ runes, count = 6, variant = 'gold', animation = 'glow', direction = 'horizontal', size = 'md', scattered = false, className, style, ...props }, ref) => {
    const resolvedRunes = runes ? runes.map(r => RUNES[r as keyof typeof RUNES] || r) : getRandomRunes(count);
    const animationClass = animation !== 'none' ? styles[animation] : '';

    return (
      <div
        ref={ref}
        className={`${styles.container} ${styles[variant]} ${styles[size]} ${direction === 'vertical' ? styles.vertical : ''} ${scattered ? styles.scattered : ''} ${animationClass} ${className || ''}`}
        style={style}
        {...props}
      >
        {resolvedRunes.map((rune, i) => (
          <span
            key={i}
            className={styles.rune}
            style={{ '--delay': `${i * 0.5}s`, ...(scattered ? { left: `${Math.random() * 80 + 10}%`, top: `${Math.random() * 80 + 10}%` } : {}) } as React.CSSProperties}
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
