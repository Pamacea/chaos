'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface DeadButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  icon?: ReactNode;
  gradient?: 1 | 2 | 3 | 4;
  size?: 'sm' | 'md' | 'lg';
  showStrike?: boolean;
}

const gradientClasses: Record<number, string> = {
  1: 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_4px_15px_rgba(102,126,234,0.4)]',
  2: 'bg-gradient-to-br from-fuchsia-400 to-rose-500 shadow-[0_4px_15px_rgba(245,87,108,0.4)]',
  3: 'bg-gradient-to-br from-blue-400 to-cyan-400 shadow-[0_4px_15px_rgba(79,172,254,0.4)]',
  4: 'bg-gradient-to-br from-pink-400 to-yellow-300 shadow-[0_4px_15px_rgba(250,112,154,0.4)]',
};

const sizeClasses: Record<string, { container: string; text: string; rounded: string }> = {
  sm: { container: 'w-[200px] h-[45px]', text: 'text-sm', rounded: 'rounded-xl' },
  md: { container: 'w-[280px] h-[60px]', text: 'text-base', rounded: 'rounded-2xl' },
  lg: { container: 'w-[340px] h-[70px]', text: 'text-lg', rounded: 'rounded-[20px]' },
};

export const DeadButton = forwardRef<HTMLDivElement, DeadButtonProps>(
  ({ children, icon, gradient = 1, size = 'md', showStrike = true, className, ...props }, ref) => {
    const sizes = sizeClasses[size];

    return (
      <div 
        ref={ref} 
        className={`
          relative cursor-not-allowed
          animate-[shake_0.1s_infinite]
          hover:animate-[shakeHard_0.05s_infinite]
          ${sizes.container}
          ${className || ''}
        `}
        style={{
          // @ts-ignore - CSS custom properties
          '--tw-animate-shake': 'shake 0.1s infinite',
        }}
        {...props}
      >
        {/* Clean button layer */}
        <div className={`
          absolute inset-0 flex items-center justify-center gap-3
          font-semibold text-white font-sans tracking-wide
          ${gradientClasses[gradient]}
          ${sizes.text}
          ${sizes.rounded}
        `}>
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </div>
        
        {/* Destruction layer */}
        <div className={`
          absolute inset-0 mix-blend-multiply
          ${sizes.rounded}
          bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,0,64,0.1)_2px,rgba(255,0,64,0.1)_4px),repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.3)_3px,rgba(0,0,0,0.3)_4px)]
        `} />
        
        {/* Noise layer */}
        <div className={`
          absolute inset-0 opacity-15 mix-blend-overlay
          ${sizes.rounded}
          animate-[noiseMove_0.2s_steps(5)_infinite]
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        />
        
        {/* Glitch layers */}
        <div className={`absolute inset-0 ${sizes.rounded} pointer-events-none bg-red-500 mix-blend-color-dodge opacity-0 animate-[glitchSlice1_3s_infinite]`} />
        <div className={`absolute inset-0 ${sizes.rounded} pointer-events-none bg-cyan-400 mix-blend-color-dodge opacity-0 animate-[glitchSlice2_3s_infinite]`} />
        
        {/* Strikethrough */}
        {showStrike && (
          <div className="absolute top-1/2 -left-2.5 -right-2.5 h-[3px] bg-red-500 -rotate-3 shadow-[0_0_10px_#ff0040]" />
        )}
      </div>
    );
  }
);

DeadButton.displayName = 'DeadButton';
export default DeadButton;
