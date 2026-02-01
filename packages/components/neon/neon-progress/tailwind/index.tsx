'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface NeonProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const variantStyles = {
  cyan: { bg: 'bg-cyan-400', text: 'text-cyan-400', glow: 'shadow-[0_0_10px_#00f0ff]' },
  pink: { bg: 'bg-fuchsia-500', text: 'text-fuchsia-500', glow: 'shadow-[0_0_10px_#ff00ff]' },
  green: { bg: 'bg-emerald-400', text: 'text-emerald-400', glow: 'shadow-[0_0_10px_#00ff88]' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-500', glow: 'shadow-[0_0_10px_#a855f7]' },
};

const sizeStyles = { sm: 'h-1', md: 'h-2', lg: 'h-3' };

export const NeonProgress = forwardRef<HTMLDivElement, NeonProgressProps>(
  ({ value, max = 100, variant = 'cyan', size = 'md', showValue = false, className = '', ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100);
    const styles = variantStyles[variant];
    
    return (
      <div ref={ref} className={`flex items-center gap-3 ${className}`} {...props}>
        <div className={`relative flex-1 ${sizeStyles[size]} bg-white/10 rounded-full overflow-hidden`}>
          <div 
            className={`h-full ${styles.bg} ${styles.glow} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <span className={`font-['Orbitron',sans-serif] text-xs font-bold ${styles.text} min-w-[40px] text-right`}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

NeonProgress.displayName = 'NeonProgress';
export default NeonProgress;
