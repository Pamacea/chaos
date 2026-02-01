'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface NeonDividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'cyan' | 'pink' | 'green' | 'purple' | 'gradient';
  text?: string;
}

const variantStyles = {
  cyan: { line: 'from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#00f0ff]', text: 'text-cyan-400' },
  pink: { line: 'from-transparent via-fuchsia-500 to-transparent shadow-[0_0_8px_#ff00ff]', text: 'text-fuchsia-500' },
  green: { line: 'from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#00ff88]', text: 'text-emerald-400' },
  purple: { line: 'from-transparent via-purple-500 to-transparent shadow-[0_0_8px_#a855f7]', text: 'text-purple-500' },
  gradient: { line: 'from-cyan-400 via-fuchsia-500 to-emerald-400', text: 'text-white' },
};

export const NeonDivider = forwardRef<HTMLDivElement, NeonDividerProps>(
  ({ variant = 'cyan', text, className = '', ...props }, ref) => {
    const styles = variantStyles[variant];
    return (
      <div ref={ref} className={`flex items-center gap-4 ${className}`} {...props}>
        <span className={`flex-1 h-px bg-gradient-to-r ${styles.line}`} />
        {text && (
          <span className={`flex-shrink-0 px-2 font-['Orbitron',sans-serif] text-[11px] font-semibold uppercase tracking-widest ${styles.text}`}>
            {text}
          </span>
        )}
        <span className={`flex-1 h-px bg-gradient-to-r ${styles.line}`} />
      </div>
    );
  }
);

NeonDivider.displayName = 'NeonDivider';
export default NeonDivider;
