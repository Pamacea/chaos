'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface NeonGlowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Neon glow color (default: '#00ffff') */
  color?: string;
  /** Glow blur radius in pixels (default: 20) */
  glowSize?: number;
  /** Pulse animation duration in seconds (default: 2) */
  pulseSpeed?: number;
  /** Add realistic neon flicker effect (default: false) */
  flicker?: boolean;
}

export const NeonGlow = forwardRef<HTMLButtonElement, NeonGlowProps>(
  (
    {
      children,
      color = '#00ffff',
      glowSize = 20,
      pulseSpeed = 2,
      flicker = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const cssVars: React.CSSProperties = {
      '--neon-color': color,
      '--glow-size': `${glowSize}px`,
      '--pulse-speed': `${pulseSpeed}s`,
      ...style,
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center
          px-10 py-3.5
          font-inherit text-sm font-semibold tracking-widest uppercase
          bg-transparent border-2
          cursor-pointer overflow-hidden
          transition-all duration-300 ease-out
          neon-glow-button
          ${flicker ? 'neon-glow-flicker' : ''}
          ${className || ''}
        `}
        style={cssVars}
        {...props}
      >
        <style>{`
          .neon-glow-button {
            color: var(--neon-color, #00ffff);
            border-color: var(--neon-color, #00ffff);
            box-shadow:
              0 0 var(--glow-size, 20px) var(--neon-color, #00ffff),
              0 0 calc(var(--glow-size, 20px) * 2) var(--neon-color, #00ffff),
              0 0 calc(var(--glow-size, 20px) * 3) var(--neon-color, #00ffff);
            animation: neon-pulse var(--pulse-speed, 2s) ease-in-out infinite;
          }
          .neon-glow-button:hover {
            background: var(--neon-color, #00ffff);
            color: #000;
            box-shadow:
              0 0 calc(var(--glow-size, 20px) * 1.5) var(--neon-color, #00ffff),
              0 0 calc(var(--glow-size, 20px) * 3) var(--neon-color, #00ffff),
              0 0 calc(var(--glow-size, 20px) * 5) var(--neon-color, #00ffff),
              0 0 calc(var(--glow-size, 20px) * 7) var(--neon-color, #00ffff);
          }
          .neon-glow-button:active {
            transform: scale(0.98);
          }
          .neon-glow-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            animation: none;
          }
          .neon-glow-flicker {
            animation:
              neon-pulse var(--pulse-speed, 2s) ease-in-out infinite,
              neon-flicker 0.15s infinite !important;
          }
          @keyframes neon-pulse {
            0%, 100% {
              box-shadow:
                0 0 var(--glow-size, 20px) var(--neon-color, #00ffff),
                0 0 calc(var(--glow-size, 20px) * 1.5) var(--neon-color, #00ffff),
                0 0 calc(var(--glow-size, 20px) * 2) var(--neon-color, #00ffff);
            }
            50% {
              box-shadow:
                0 0 calc(var(--glow-size, 20px) * 1.2) var(--neon-color, #00ffff),
                0 0 calc(var(--glow-size, 20px) * 2.5) var(--neon-color, #00ffff),
                0 0 calc(var(--glow-size, 20px) * 4) var(--neon-color, #00ffff);
            }
          }
          @keyframes neon-flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
              opacity: 1;
            }
            20%, 24%, 55% {
              opacity: 0.7;
            }
            22% {
              opacity: 0.4;
            }
          }
        `}</style>
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
        <span
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: 'radial-gradient(ellipse at center, var(--neon-color) 0%, transparent 70%)',
            opacity: 0.1,
            animation: 'glow-rotate 4s linear infinite',
          }}
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: 'radial-gradient(ellipse at center, var(--neon-color) 0%, transparent 50%)',
            opacity: 0.05,
            animation: 'glow-rotate 6s linear infinite reverse',
          }}
          aria-hidden="true"
        />
        <style>{`
          @keyframes glow-rotate {
            0% {
              transform: rotate(0deg) scale(1);
              opacity: 0.1;
            }
            50% {
              transform: rotate(180deg) scale(1.1);
              opacity: 0.15;
            }
            100% {
              transform: rotate(360deg) scale(1);
              opacity: 0.1;
            }
          }
        `}</style>
        <span
          className="absolute top-0 left-[-100%] w-1/2 h-full pointer-events-none z-[5]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'skewX(-25deg)',
            transition: 'left 0.6s ease',
          }}
          aria-hidden="true"
        />
        <style>{`
          .neon-glow-button:hover span:last-of-type {
            left: 150%;
          }
        `}</style>
      </button>
    );
  }
);

NeonGlow.displayName = 'NeonGlow';

export default NeonGlow;
