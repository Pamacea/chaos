'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'pink' | 'green' | 'purple' | 'red' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
}

const variantStyles = {
  cyan: 'text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:shadow-[0_0_20px_#00f0ff,0_0_40px_#00f0ff]',
  pink: 'text-fuchsia-500 border-fuchsia-500 hover:bg-fuchsia-500 hover:shadow-[0_0_20px_#ff00ff,0_0_40px_#ff00ff]',
  green: 'text-emerald-400 border-emerald-400 hover:bg-emerald-400 hover:shadow-[0_0_20px_#00ff88,0_0_40px_#00ff88]',
  purple: 'text-purple-500 border-purple-500 hover:bg-purple-500 hover:shadow-[0_0_20px_#a855f7,0_0_40px_#a855f7]',
  red: 'text-rose-500 border-rose-500 hover:bg-rose-500 hover:shadow-[0_0_20px_#ff0040,0_0_40px_#ff0040]',
  yellow: 'text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:shadow-[0_0_20px_#ffff00,0_0_40px_#ffff00]',
};

const sizeStyles = {
  sm: 'px-5 py-2 text-xs tracking-wide',
  md: 'px-8 py-3 text-sm tracking-wider',
  lg: 'px-12 py-4 text-base tracking-widest',
};

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ children, variant = 'cyan', size = 'md', glowing = false, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center
          font-['Orbitron',sans-serif] font-bold uppercase
          bg-transparent border-2 cursor-pointer overflow-hidden
          transition-all duration-300 ease-out
          hover:text-[#0a0a0f] active:scale-[0.98]
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${glowing ? 'animate-pulse' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeonButton.displayName = 'NeonButton';
export default NeonButton;
