'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Backdrop blur amount (default: '10px') */
  blur?: string;
  /** Background opacity 0-1 (default: 0.1) */
  bgOpacity?: number;
  /** Border opacity 0-1 (default: 0.2) */
  borderOpacity?: number;
  /** Hover background opacity 0-1 (default: 0.2) */
  hoverOpacity?: number;
  /** Glow intensity 0-1 (default: 0) */
  glowAmount?: number;
  /** Custom glass color (rgba or hex with alpha) */
  glassColor?: string;
  /** Custom border color */
  borderColor?: string;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      children,
      blur = '10px',
      bgOpacity = 0.1,
      borderOpacity = 0.2,
      hoverOpacity = 0.2,
      glowAmount = 0,
      glassColor,
      borderColor,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const cssVars: React.CSSProperties = {
      '--glass-blur': blur,
      '--glass-bg-opacity': bgOpacity,
      '--glass-border-opacity': borderOpacity,
      '--glass-hover-opacity': hoverOpacity,
      '--glass-glow': glowAmount,
      ...(glassColor && { '--glass-color': glassColor }),
      ...(borderColor && { '--glass-border': borderColor }),
      ...style,
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center
          px-8 py-3.5
          font-inherit text-sm font-medium tracking-normal
          text-inherit rounded-lg
          cursor-pointer overflow-hidden
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          hover:-translate-y-px hover:shadow-[0_0_20px_rgba(255,255,255,var(--glass-glow,0)),0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]
          active:translate-y-0 active:scale-[0.98] active:shadow-[0_0_10px_rgba(255,255,255,var(--glass-glow,0)),0_2px_6px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(0,0,0,0.1)]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none
          before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-1/2 before:h-full
          before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
          before:skew-x-[-25deg] before:transition-left before:duration-500 before:pointer-events-none
          hover:before:left-[150%]
          after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:p-px
          after:bg-gradient-[135deg,rgba(255,255,255,0.3)_0%,transparent_50%,rgba(255,255,255,0.1)_100%]
          after:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
          after:[mask-composite:exclude] after:pointer-events-none after:opacity-70
          group
          ${className || ''}
        `}
        style={cssVars}
        {...props}
      >
        <style>{`
          button[data-glass] {
            background: var(--glass-color, rgba(255, 255, 255, var(--glass-bg-opacity, 0.1)));
            border-color: var(--glass-border, rgba(255, 255, 255, var(--glass-border-opacity, 0.2)));
            backdrop-filter: blur(var(--glass-blur, 10px));
            -webkit-backdrop-filter: blur(var(--glass-blur, 10px));
          }
          button[data-glass]:hover {
            background: var(--glass-hover-color, rgba(255, 255, 255, var(--glass-hover-opacity, 0.2)));
          }
        `}</style>
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;
