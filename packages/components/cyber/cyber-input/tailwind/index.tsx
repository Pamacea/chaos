'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

export interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  label?: string;
  error?: string;
}

const variantStyles = {
  cyan: 'focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,240,255,0.3)]',
  pink: 'focus:border-fuchsia-500 focus:shadow-[0_0_10px_rgba(255,0,255,0.3)]',
  green: 'focus:border-emerald-400 focus:shadow-[0_0_10px_rgba(0,255,136,0.3)]',
  purple: 'focus:border-purple-500 focus:shadow-[0_0_10px_rgba(168,85,247,0.3)]',
};

const labelColors = {
  cyan: 'text-cyan-400',
  pink: 'text-fuchsia-500',
  green: 'text-emerald-400',
  purple: 'text-purple-500',
};

export const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  ({ variant = 'cyan', label, error, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <label className={`font-['Rajdhani',sans-serif] text-xs font-semibold uppercase tracking-widest ${labelColors[variant]}`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3
            font-['Share_Tech_Mono',monospace] text-sm text-white
            bg-black/50 border border-white/10
            outline-none transition-all duration-300
            placeholder:text-white/30
            ${error ? 'border-rose-500 focus:border-rose-500' : variantStyles[variant]}
          `}
          {...props}
        />
        {error && (
          <span className="font-['Share_Tech_Mono',monospace] text-xs text-rose-500">{error}</span>
        )}
      </div>
    );
  }
);

CyberInput.displayName = 'CyberInput';
export default CyberInput;
