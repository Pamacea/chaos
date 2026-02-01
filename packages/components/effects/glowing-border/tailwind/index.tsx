'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface GlowingBorderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  animated?: boolean;
}

const variantStyles = {
  cyan: 'bg-cyan-400 shadow-[0_0_15px_#00f0ff]',
  pink: 'bg-fuchsia-500 shadow-[0_0_15px_#ff00ff]',
  green: 'bg-emerald-400 shadow-[0_0_15px_#00ff88]',
  purple: 'bg-purple-500 shadow-[0_0_15px_#a855f7]',
};

export const GlowingBorder = forwardRef<HTMLDivElement, GlowingBorderProps>(
  ({ children, variant = 'cyan', animated = true, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          relative p-0.5 rounded-lg
          ${variantStyles[variant]}
          ${animated ? 'animate-pulse' : ''}
          hover:brightness-125 transition-all duration-300
          ${className}
        `}
        {...props}
      >
        <div className="relative bg-[#0a0a0f] rounded-md">
          {children}
        </div>
      </div>
    );
  }
);

GlowingBorder.displayName = 'GlowingBorder';
export default GlowingBorder;
