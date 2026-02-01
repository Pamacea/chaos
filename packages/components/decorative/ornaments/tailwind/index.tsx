'use client';

import { forwardRef, HTMLAttributes } from 'react';

export const ORNAMENT_SYMBOLS = {
  cross: '✝', maltese: '✠', orthodox: '☦', fleurDeLis: '⚜', star: '✦',
  diamond: '◆', heart: '❧', leaf: '❦', dagger: '†', doubleDagger: '‡',
  asterisk: '✽', florette: '✿', skull: '☠', crown: '♔', swords: '⚔',
};

export interface OrnamentsProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'divider' | 'corner' | 'frame' | 'fleuron' | 'symbols';
  symbol?: keyof typeof ORNAMENT_SYMBOLS | string;
  symbols?: (keyof typeof ORNAMENT_SYMBOLS | string)[];
  variant?: 'gold' | 'bone' | 'blood' | 'iron';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'all';
}

const variantColors = {
  gold: 'text-amber-600',
  bone: 'text-stone-400',
  blood: 'text-red-800',
  iron: 'text-zinc-500',
};

const sizeClasses = {
  sm: { symbol: 'text-sm', fleuron: 'text-xl' },
  md: { symbol: 'text-xl', fleuron: 'text-3xl' },
  lg: { symbol: 'text-2xl', fleuron: 'text-5xl' },
};

const getSymbol = (s: keyof typeof ORNAMENT_SYMBOLS | string): string =>
  ORNAMENT_SYMBOLS[s as keyof typeof ORNAMENT_SYMBOLS] || s;

export const Ornaments = forwardRef<HTMLDivElement, OrnamentsProps>(
  ({ type = 'divider', symbol = 'cross', symbols, variant = 'gold', size = 'md', animated = false, position = 'all', className = '', ...props }, ref) => {
    const color = variantColors[variant];
    const sizes = sizeClasses[size];
    const sym = getSymbol(symbol);
    const animClass = animated ? 'animate-pulse' : '';

    if (type === 'divider') {
      return (
        <div ref={ref} className={`flex items-center justify-center gap-4 w-full ${color} ${className}`} {...props}>
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent" />
          <span className={`${sizes.symbol} opacity-80 ${animClass}`}>{sym}</span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent via-current to-transparent" />
        </div>
      );
    }

    if (type === 'fleuron') {
      return (
        <div ref={ref} className={`flex items-center justify-center ${color} ${className}`} {...props}>
          <span className={`${sizes.fleuron} opacity-70 ${animClass}`}>{sym}</span>
        </div>
      );
    }

    if (type === 'symbols') {
      const syms = symbols || ['star', 'diamond', 'star'];
      return (
        <div ref={ref} className={`flex gap-2 opacity-60 ${color} ${className}`} {...props}>
          {syms.map((s, i) => (
            <span key={i} className={`${sizes.symbol} ${animClass}`}>{getSymbol(s)}</span>
          ))}
        </div>
      );
    }

    if (type === 'corner') {
      const cornerPositions = {
        'top-left': 'top-0 left-0',
        'top-right': 'top-0 right-0 -scale-x-100',
        'bottom-left': 'bottom-0 left-0 -scale-y-100',
        'bottom-right': 'bottom-0 right-0 -scale-100',
      };
      const corners = position === 'all' ? Object.keys(cornerPositions) : [position];

      return (
        <>
          {corners.map((pos) => (
            <div
              key={pos}
              ref={pos === corners[0] ? ref : undefined}
              className={`absolute w-10 h-10 ${cornerPositions[pos as keyof typeof cornerPositions]} ${color} ${className}`}
              {...props}
            >
              <span className="absolute top-2 left-0 w-[30px] h-px bg-current" />
              <span className="absolute top-0 left-2 w-px h-[30px] bg-current" />
              <span className="absolute top-1 left-1 text-xs">{sym}</span>
            </div>
          ))}
        </>
      );
    }

    if (type === 'frame') {
      return (
        <div ref={ref} className={`absolute inset-0 pointer-events-none ${color} ${className}`} {...props}>
          <div className="absolute -top-[0.5em] left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="w-15 h-px bg-current" />
            <span className="text-sm">{sym}</span>
            <span className="w-15 h-px bg-current" />
          </div>
          <div className="absolute -bottom-[0.5em] left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="w-15 h-px bg-current" />
            <span className="text-sm">{sym}</span>
            <span className="w-15 h-px bg-current" />
          </div>
        </div>
      );
    }

    return null;
  }
);

Ornaments.displayName = 'Ornaments';
export default Ornaments;
