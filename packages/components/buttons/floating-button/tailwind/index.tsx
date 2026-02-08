'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Animation duration in seconds (default: 3) */
  floatSpeed?: number;
  /** Float distance in pixels (default: 10) */
  floatAmplitude?: number;
  /** Shadow blur size (default: 20) */
  shadowSize?: number;
  /** Shadow opacity 0-1 (default: 0.3) */
  shadowOpacity?: number;
}

export const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  (
    {
      children,
      floatSpeed = 3,
      floatAmplitude = 10,
      shadowSize = 20,
      shadowOpacity = 0.3,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const cssVars: React.CSSProperties = {
      '--float-speed': `${floatSpeed}s`,
      '--float-amplitude': `${floatAmplitude}px`,
      '--shadow-size': `${shadowSize}px`,
      '--shadow-opacity': shadowOpacity,
      ...style,
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center
          px-8 py-3.5
          font-inherit text-sm font-medium tracking-normal
          text-white rounded-lg
          cursor-pointer overflow-hidden
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          hover:scale-[1.02] hover:-translate-y-[calc(var(--float-amplitude)_*_0.5)]
          active:scale-[0.98] active:translate-y-[calc(var(--float-amplitude)_*_0.5)] active:duration-100
          disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none disabled:transform-none
          before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-1/2 before:h-full
          before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
          before:skew-x-[-25deg] before:transition-left before:duration-600 before:ease-out before:pointer-events-none
          hover:before:left-[150%]
          after:content-[''] after:absolute after:inset-0 after:rounded-[inherit]
          after:opacity-0 after:transition-opacity after:duration-300 after:pointer-events-none
          hover:after:opacity-100 hover:after:animate-gradient-shift
          ${className || ''}
        `}
        style={cssVars}
        {...props}
      >
        <style>{`
          button[data-float] {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow:
              0 var(--shadow-size) calc(var(--shadow-size) * 1.5) rgba(102, 126, 234, var(--shadow-opacity)),
              0 calc(var(--shadow-size) * 0.5) var(--shadow-size) rgba(118, 75, 162, calc(var(--shadow-opacity) * 0.5));
            animation: float var(--float-speed) ease-in-out infinite;
          }
          button[data-float]:hover {
            animation-play-state: paused;
            box-shadow:
              0 calc(var(--shadow-size) * 1.5) calc(var(--shadow-size) * 2) rgba(102, 126, 234, calc(var(--shadow-opacity) * 1.5)),
              0 var(--shadow-size) calc(var(--shadow-size) * 1.5) rgba(118, 75, 162, calc(var(--shadow-opacity) * 0.8));
          }
          button[data-float]:active {
            box-shadow:
              0 calc(var(--shadow-size) * 0.5) var(--shadow-size) rgba(102, 126, 234, calc(var(--shadow-opacity) * 0.8)),
              0 calc(var(--shadow-size) * 0.25) calc(var(--shadow-size) * 0.5) rgba(118, 75, 162, calc(var(--shadow-opacity) * 0.4));
          }
          button[data-float]:disabled {
            box-shadow: 0 var(--shadow-size) calc(var(--shadow-size) * 1.5) rgba(0, 0, 0, 0.1);
          }
          button[data-float]::after {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #764ba2 75%, #667eea 100%);
            background-size: 300% 300%;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(calc(var(--float-amplitude) * -1)); }
          }
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
        <span className="relative z-10 inline-flex items-center gap-2 font-semibold">
          {children}
        </span>
      </button>
    );
  }
);

FloatingButton.displayName = 'FloatingButton';

export default FloatingButton;
