'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface NeonBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'pink' | 'green' | 'purple' | 'red' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  outline?: boolean;
}

const variantStyles = {
  cyan: { solid: 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]', outline: 'text-cyan-400 border-cyan-400' },
  pink: { solid: 'bg-fuchsia-500 shadow-[0_0_10px_#ff00ff]', outline: 'text-fuchsia-500 border-fuchsia-500' },
  green: { solid: 'bg-emerald-400 shadow-[0_0_10px_#00ff88]', outline: 'text-emerald-400 border-emerald-400' },
  purple: { solid: 'bg-purple-500 shadow-[0_0_10px_#a855f7]', outline: 'text-purple-500 border-purple-500' },
  red: { solid: 'bg-rose-500 shadow-[0_0_10px_#ff0040]', outline: 'text-rose-500 border-rose-500' },
  yellow: { solid: 'bg-yellow-400 shadow-[0_0_10px_#ffff00]', outline: 'text-yellow-400 border-yellow-400' },
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[9px]',
  md: 'px-3 py-1 text-[11px]',
  lg: 'px-4 py-1.5 text-[13px]',
};

export const NeonBadge = forwardRef<HTMLSpanElement, NeonBadgeProps>(
  ({ children, variant = 'cyan', size = 'md', pulse = false, outline = false, className = '', ...props }, ref) => {
    const colors = variantStyles[variant];
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center justify-center
          font-['Orbitron',sans-serif] font-bold uppercase tracking-wide rounded-sm
          ${sizeStyles[size]}
          ${outline ? `bg-transparent border ${colors.outline}` : `text-[#0a0a0f] ${colors.solid}`}
          ${pulse ? 'animate-pulse' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

NeonBadge.displayName = 'NeonBadge';
export default NeonBadge;
