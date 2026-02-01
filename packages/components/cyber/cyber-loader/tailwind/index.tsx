'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface CyberLoaderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'spinner' | 'dots' | 'bars';
  color?: 'cyan' | 'pink' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg';
}

const colorStyles = {
  cyan: { bg: 'bg-cyan-400', border: 'border-t-cyan-400', shadow: 'shadow-[0_0_10px_#00f0ff]' },
  pink: { bg: 'bg-fuchsia-500', border: 'border-t-fuchsia-500', shadow: 'shadow-[0_0_10px_#ff00ff]' },
  green: { bg: 'bg-emerald-400', border: 'border-t-emerald-400', shadow: 'shadow-[0_0_10px_#00ff88]' },
  purple: { bg: 'bg-purple-500', border: 'border-t-purple-500', shadow: 'shadow-[0_0_10px_#a855f7]' },
};

const sizeStyles = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };

export const CyberLoader = forwardRef<HTMLDivElement, CyberLoaderProps>(
  ({ variant = 'spinner', color = 'cyan', size = 'md', className = '', ...props }, ref) => {
    const colors = colorStyles[color];
    
    if (variant === 'spinner') {
      return (
        <div
          ref={ref}
          className={`${sizeStyles[size]} rounded-full border-[3px] border-white/10 ${colors.border} ${colors.shadow} animate-spin ${className}`}
          {...props}
        />
      );
    }
    
    if (variant === 'dots') {
      return (
        <div ref={ref} className={`inline-flex items-center gap-2 ${className}`} {...props}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${colors.bg} ${colors.shadow} animate-[bounce_1.4s_ease-in-out_infinite]`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      );
    }
    
    return (
      <div ref={ref} className={`inline-flex items-end gap-1 h-10 ${className}`} {...props}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-1.5 h-full ${colors.bg} ${colors.shadow} animate-[pulse_1.2s_ease-in-out_infinite]`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }
);

CyberLoader.displayName = 'CyberLoader';
export default CyberLoader;
