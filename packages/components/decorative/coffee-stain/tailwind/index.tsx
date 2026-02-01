'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';

export interface StainConfig {
  type?: 'stain' | 'ring';
  size?: 'sm' | 'md' | 'lg';
  position: { top?: string; right?: string; bottom?: string; left?: string };
  rotation?: number;
}

export interface CoffeeStainProps extends HTMLAttributes<HTMLDivElement> {
  mode?: 'overlay' | 'inline';
  intensity?: 'light' | 'medium' | 'heavy';
  variant?: 'coffee' | 'tea' | 'wine' | 'ink';
  count?: number;
  stains?: StainConfig[];
  agedPaper?: boolean;
  paperTexture?: boolean;
  burnEdges?: boolean;
  edgeDarkening?: boolean;
}

const generateRandomStains = (count: number): StainConfig[] => {
  return Array.from({ length: count }, () => ({
    type: Math.random() > 0.7 ? 'ring' : 'stain',
    size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
    position: { top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` },
    rotation: Math.random() * 360,
  }));
};

const stainColors = {
  coffee: { base: 'rgba(61, 43, 31,', ring: 'border-amber-900/20' },
  tea: { base: 'rgba(139, 115, 85,', ring: 'border-amber-700/20' },
  wine: { base: 'rgba(100, 30, 40,', ring: 'border-red-900/20' },
  ink: { base: 'rgba(20, 20, 40,', ring: 'border-slate-800/20' },
};

const intensityOpacity = { light: 0.5, medium: 0.75, heavy: 1 };

const sizeClasses = {
  sm: { stain: 'w-16 h-14', ring: 'w-14 h-14' },
  md: { stain: 'w-24 h-22', ring: 'w-20 h-20' },
  lg: { stain: 'w-36 h-32', ring: 'w-20 h-20' },
};

export const CoffeeStain = forwardRef<HTMLDivElement, CoffeeStainProps>(
  ({ mode = 'overlay', intensity = 'medium', variant = 'coffee', count = 3, stains: customStains, agedPaper = false, paperTexture = false, burnEdges = false, edgeDarkening = false, className = '', ...props }, ref) => {
    const stains = useMemo(() => customStains || generateRandomStains(count), [customStains, count]);
    const colors = stainColors[variant];
    const opacity = intensityOpacity[intensity];

    return (
      <div
        ref={ref}
        className={`
          relative pointer-events-none
          ${mode === 'overlay' ? 'fixed inset-0 z-[1]' : 'w-full h-full'}
          ${className}
        `}
        {...props}
      >
        {stains.map((stain, i) => {
          const sizes = sizeClasses[stain.size || 'md'];
          
          if (stain.type === 'ring') {
            return (
              <div
                key={i}
                className={`absolute rounded-full border-2 ${colors.ring} shadow-[inset_0_0_10px_rgba(61,43,31,0.2),0_0_15px_rgba(61,43,31,0.15)] ${sizes.ring}`}
                style={{ ...stain.position, transform: `rotate(${stain.rotation || 0}deg)`, opacity }}
              />
            );
          }

          return (
            <div
              key={i}
              className={`absolute rounded-full ${sizes.stain}`}
              style={{
                ...stain.position,
                transform: `rotate(${stain.rotation || 0}deg)`,
                opacity,
                background: `radial-gradient(ellipse at ${40 + Math.random() * 20}% ${40 + Math.random() * 20}%, ${colors.base} 0.25) 0%, ${colors.base} 0.12) 40%, transparent 70%)`,
              }}
            />
          );
        })}

        {agedPaper && (
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-900/[0.03] to-transparent pointer-events-none" />
        )}

        {paperTexture && (
          <div 
            className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {burnEdges && (
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] pointer-events-none" />
        )}

        {edgeDarkening && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-[60px] bg-gradient-to-r from-stone-900/80 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-[60px] bg-gradient-to-l from-stone-900/80 to-transparent" />
          </>
        )}
      </div>
    );
  }
);

CoffeeStain.displayName = 'CoffeeStain';
export default CoffeeStain;
