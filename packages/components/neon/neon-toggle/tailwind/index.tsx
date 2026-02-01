'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface NeonToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: { track: 'w-10 h-5', thumb: 'w-4 h-4', translate: 'translate-x-5' },
  md: { track: 'w-[52px] h-7', thumb: 'w-5 h-5', translate: 'translate-x-6' },
  lg: { track: 'w-16 h-8', thumb: 'w-6 h-6', translate: 'translate-x-8' },
};

const variantStyles = {
  cyan: { active: 'bg-cyan-400/20 border-cyan-400 shadow-[0_0_10px_#00f0ff]', thumb: 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' },
  pink: { active: 'bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_10px_#ff00ff]', thumb: 'bg-fuchsia-500 shadow-[0_0_10px_#ff00ff]' },
  green: { active: 'bg-emerald-400/20 border-emerald-400 shadow-[0_0_10px_#00ff88]', thumb: 'bg-emerald-400 shadow-[0_0_10px_#00ff88]' },
  purple: { active: 'bg-purple-500/20 border-purple-500 shadow-[0_0_10px_#a855f7]', thumb: 'bg-purple-500 shadow-[0_0_10px_#a855f7]' },
};

export const NeonToggle = forwardRef<HTMLButtonElement, NeonToggleProps>(
  ({ checked, onChange, variant = 'cyan', size = 'md', disabled = false, className = '', ...props }, ref) => {
    const sizes = sizeStyles[size];
    const colors = variantStyles[variant];
    
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`
          relative ${sizes.track} rounded-full border transition-all duration-300
          ${checked ? colors.active : 'bg-white/10 border-white/20'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        onClick={() => !disabled && onChange(!checked)}
        {...props}
      >
        <span className={`
          absolute top-1/2 left-1 -translate-y-1/2
          ${sizes.thumb} rounded-full transition-all duration-300
          ${checked ? `${sizes.translate} ${colors.thumb}` : 'bg-gray-500'}
        `} />
      </button>
    );
  }
);

NeonToggle.displayName = 'NeonToggle';
export default NeonToggle;
