'use client';

import { forwardRef, HTMLAttributes } from 'react';

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

const variantStyles = {
  gold: 'text-amber-600',
  blood: 'text-red-800',
  bone: 'text-stone-400',
  iron: 'text-zinc-500',
  cyan: 'text-cyan-400',
};

const sizeClasses = {
  sm: 'text-base gap-3',
  md: 'text-3xl gap-6',
  lg: 'text-5xl gap-8',
  xl: 'text-6xl gap-12',
};

const getRandomRunes = (count: number): string[] => {
  const runeValues = Object.values(RUNES);
  return Array.from({ length: count }, () => runeValues[Math.floor(Math.random() * runeValues.length)]);
};

export const RuneSymbols = forwardRef<HTMLDivElement, RuneSymbolsProps>(
  ({ runes, count = 6, variant = 'gold', animation = 'glow', direction = 'horizontal', size = 'md', scattered = false, className = '', style, ...props }, ref) => {
    const resolvedRunes = runes ? runes.map(r => RUNES[r as keyof typeof RUNES] || r) : getRandomRunes(count);

    const animationClass = {
      glow: 'animate-[runeGlow_4s_ease-in-out_infinite]',
      floating: 'animate-[runeFloat_6s_ease-in-out_infinite]',
      pulsing: 'animate-[runePulse_2s_ease-in-out_infinite]',
      flickering: 'animate-[runeFlicker_0.5s_steps(2)_infinite]',
      none: '',
    }[animation];

    return (
      <div
        ref={ref}
        className={`
          flex ${sizeClasses[size]}
          ${direction === 'vertical' ? 'flex-col' : ''}
          ${scattered ? 'relative w-full h-full' : ''}
          ${className}
        `}
        style={style}
        {...props}
      >
        <style>{`
          @keyframes runeGlow {
            0%, 100% { opacity: 0.4; text-shadow: none; }
            50% { opacity: 0.8; text-shadow: 0 0 15px currentColor; }
          }
          @keyframes runeFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
            25% { transform: translateY(-10px) rotate(5deg); opacity: 0.7; }
            50% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
            75% { transform: translateY(10px) rotate(-5deg); opacity: 0.7; }
          }
          @keyframes runePulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.15); opacity: 1; text-shadow: 0 0 25px currentColor; }
          }
          @keyframes runeFlicker {
            0% { opacity: 0.3; } 25% { opacity: 0.8; } 50% { opacity: 0.5; } 75% { opacity: 0.9; } 100% { opacity: 0.3; }
          }
        `}</style>
        {resolvedRunes.map((rune, i) => (
          <span
            key={i}
            className={`
              ${variantStyles[variant]} opacity-60 transition-all duration-400
              hover:opacity-100 hover:scale-110 hover:[text-shadow:0_0_20px_currentColor]
              ${animationClass}
              ${scattered ? 'absolute' : ''}
            `}
            style={{
              animationDelay: `${i * 0.5}s`,
              ...(scattered ? { left: `${Math.random() * 80 + 10}%`, top: `${Math.random() * 80 + 10}%` } : {}),
            }}
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
