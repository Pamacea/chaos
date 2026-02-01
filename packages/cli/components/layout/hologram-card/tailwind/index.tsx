'use client';

import { forwardRef, HTMLAttributes, useId } from 'react';

export interface HologramCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  scanlines?: boolean;
}

const variantStyles = {
  cyan: { border: 'border-cyan-400', bg: 'bg-cyan-400/5', glow: 'hover:shadow-[0_0_20px_#00f0ff]', color: '#00f0ff' },
  pink: { border: 'border-fuchsia-500', bg: 'bg-fuchsia-500/5', glow: 'hover:shadow-[0_0_20px_#ff00ff]', color: '#ff00ff' },
  green: { border: 'border-emerald-400', bg: 'bg-emerald-400/5', glow: 'hover:shadow-[0_0_20px_#00ff88]', color: '#00ff88' },
  purple: { border: 'border-purple-500', bg: 'bg-purple-500/5', glow: 'hover:shadow-[0_0_20px_#a855f7]', color: '#a855f7' },
};

export const HologramCard = forwardRef<HTMLDivElement, HologramCardProps>(
  ({ children, variant = 'cyan', scanlines = true, className = '', ...props }, ref) => {
    const id = useId();
    const styles = variantStyles[variant];
    
    return (
      <>
        <style>{`
          @keyframes scan-${id} {
            0% { top: 0; opacity: 1; }
            50% { opacity: 0.5; }
            100% { top: 100%; opacity: 1; }
          }
        `}</style>
        <div
          ref={ref}
          className={`
            relative p-6 rounded border ${styles.border} ${styles.bg}
            overflow-hidden transition-shadow duration-300 ${styles.glow}
            ${className}
          `}
          {...props}
        >
          <div
            className="absolute left-0 right-0 h-0.5"
            style={{
              background: `linear-gradient(90deg, transparent, ${styles.color}, transparent)`,
              animation: `scan-${id} 3s linear infinite`,
            }}
          />
          <div className="relative z-10">{children}</div>
          {scanlines && (
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}
            />
          )}
        </div>
      </>
    );
  }
);

HologramCard.displayName = 'HologramCard';
export default HologramCard;
