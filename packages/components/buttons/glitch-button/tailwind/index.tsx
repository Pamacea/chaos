'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface GlitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'default' | 'outline' | 'ghost';
  /** Glitch intensity on hover */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Primary glitch color (hex or CSS color) */
  glitchColor?: string;
  /** Secondary glitch color (hex or CSS color) */
  glitchColorAlt?: string;
}

const variantClasses = {
  default: 'bg-neutral-950 text-neutral-50 border border-neutral-800',
  outline: 'bg-transparent text-neutral-50 border-2 border-current',
  ghost: 'bg-transparent text-neutral-50 border-none',
};

const intensityClasses = {
  subtle: {
    layer1: 'hover:opacity-50 hover:animate-[glitch-subtle_0.5s_infinite]',
    layer2: 'hover:opacity-30 hover:animate-[glitch-subtle-alt_0.5s_infinite]',
    button: '',
  },
  medium: {
    layer1: 'hover:opacity-70 hover:animate-[glitch-medium_0.2s_infinite]',
    layer2: 'hover:opacity-50 hover:animate-[glitch-medium-alt_0.2s_infinite]',
    button: '',
  },
  intense: {
    layer1: 'hover:opacity-90 hover:animate-[glitch-intense_0.1s_infinite]',
    layer2: 'hover:opacity-70 hover:animate-[glitch-intense-alt_0.1s_infinite]',
    button: 'hover:animate-[button-shake_0.1s_infinite]',
  },
};

export const GlitchButton = forwardRef<HTMLButtonElement, GlitchButtonProps>(
  (
    {
      children,
      variant = 'default',
      intensity = 'medium',
      glitchColor = '#ff0040',
      glitchColorAlt = '#00ffff',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const intensityClass = intensityClasses[intensity];

    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center overflow-hidden
          px-6 py-3
          font-inherit text-sm font-semibold tracking-widest uppercase
          border-none cursor-pointer
          transition-transform active:scale-[0.98]
          ${variantClasses[variant]}
          ${intensityClass.button}
          group
          ${className || ''}
        `}
        style={{
          '--glitch-color': glitchColor,
          '--glitch-color-alt': glitchColorAlt,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {/* Content layer */}
        <span className="relative z-10">{children}</span>

        {/* Glitch layer 1 */}
        <span
          className={`
            absolute inset-0 flex items-center justify-center
            opacity-0 pointer-events-none z-0
            ${intensityClass.layer1}
          `}
          style={{ color: 'var(--glitch-color)' }}
          aria-hidden="true"
        >
          {children}
        </span>

        {/* Glitch layer 2 */}
        <span
          className={`
            absolute inset-0 flex items-center justify-center
            opacity-0 pointer-events-none z-[1]
            ${intensityClass.layer2}
          `}
          style={{ color: 'var(--glitch-color-alt)' }}
          aria-hidden="true"
        >
          {children}
        </span>

        {/* Noise layer */}
        <span
          className={`
            absolute inset-0 opacity-0 mix-blend-overlay pointer-events-none z-20
            group-hover:opacity-15 group-hover:animate-[noise-shift_0.2s_steps(5)_infinite]
            bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%270%200%20256%20256%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27noise%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.9%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23noise)%27/%3E%3C/svg%3E')]
          `}
          aria-hidden="true"
        />

        <style>{`
          @keyframes glitch-subtle {
            0%, 100% { transform: translate(0); clip-path: inset(0 0 70% 0); }
            25% { transform: translate(-1px, 1px); clip-path: inset(20% 0 50% 0); }
            50% { transform: translate(1px, -1px); clip-path: inset(40% 0 30% 0); }
            75% { transform: translate(-1px, -1px); clip-path: inset(60% 0 10% 0); }
          }
          @keyframes glitch-subtle-alt {
            0%, 100% { transform: translate(0); clip-path: inset(70% 0 0 0); }
            25% { transform: translate(1px, -1px); clip-path: inset(50% 0 20% 0); }
            50% { transform: translate(-1px, 1px); clip-path: inset(30% 0 40% 0); }
            75% { transform: translate(1px, 1px); clip-path: inset(10% 0 60% 0); }
          }
          @keyframes glitch-medium {
            0%, 100% { transform: translate(0); clip-path: inset(0 0 60% 0); }
            20% { transform: translate(-2px, 2px); clip-path: inset(10% 0 50% 0); }
            40% { transform: translate(2px, -2px); clip-path: inset(30% 0 30% 0); }
            60% { transform: translate(-2px, -2px); clip-path: inset(50% 0 10% 0); }
            80% { transform: translate(2px, 2px); clip-path: inset(70% 0 0 0); }
          }
          @keyframes glitch-medium-alt {
            0%, 100% { transform: translate(0); clip-path: inset(60% 0 0 0); }
            20% { transform: translate(2px, -2px); clip-path: inset(50% 0 10% 0); }
            40% { transform: translate(-2px, 2px); clip-path: inset(30% 0 30% 0); }
            60% { transform: translate(2px, 2px); clip-path: inset(10% 0 50% 0); }
            80% { transform: translate(-2px, -2px); clip-path: inset(0 0 70% 0); }
          }
          @keyframes glitch-intense {
            0% { transform: translate(0); clip-path: inset(0 0 50% 0); }
            10% { transform: translate(-3px, 3px); clip-path: inset(5% 0 45% 0); }
            20% { transform: translate(3px, -3px); clip-path: inset(15% 0 35% 0); }
            30% { transform: translate(-3px, -3px); clip-path: inset(25% 0 25% 0); }
            40% { transform: translate(3px, 3px); clip-path: inset(35% 0 15% 0); }
            50% { transform: translate(-3px, 0); clip-path: inset(45% 0 5% 0); }
            60% { transform: translate(3px, 0); clip-path: inset(55% 0 0 0); }
            70% { transform: translate(0, 3px); clip-path: inset(65% 0 0 0); }
            80% { transform: translate(0, -3px); clip-path: inset(75% 0 0 0); }
            90% { transform: translate(-3px, 3px); clip-path: inset(85% 0 0 0); }
            100% { transform: translate(0); clip-path: inset(95% 0 0 0); }
          }
          @keyframes glitch-intense-alt {
            0% { transform: translate(0); clip-path: inset(50% 0 0 0); }
            10% { transform: translate(3px, -3px); clip-path: inset(45% 0 5% 0); }
            20% { transform: translate(-3px, 3px); clip-path: inset(35% 0 15% 0); }
            30% { transform: translate(3px, 3px); clip-path: inset(25% 0 25% 0); }
            40% { transform: translate(-3px, -3px); clip-path: inset(15% 0 35% 0); }
            50% { transform: translate(3px, 0); clip-path: inset(5% 0 45% 0); }
            60% { transform: translate(-3px, 0); clip-path: inset(0 0 55% 0); }
            70% { transform: translate(0, -3px); clip-path: inset(0 0 65% 0); }
            80% { transform: translate(0, 3px); clip-path: inset(0 0 75% 0); }
            90% { transform: translate(3px, -3px); clip-path: inset(0 0 85% 0); }
            100% { transform: translate(0); clip-path: inset(0 0 95% 0); }
          }
          @keyframes button-shake {
            0%, 100% { transform: translate(0); }
            25% { transform: translate(1px, 1px); }
            50% { transform: translate(-1px, -1px); }
            75% { transform: translate(1px, -1px); }
          }
          @keyframes noise-shift {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-2px, 1px); }
            40% { transform: translate(1px, -1px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(-1px, -2px); }
            100% { transform: translate(0, 0); }
          }
        `}</style>
      </button>
    );
  }
);

GlitchButton.displayName = 'GlitchButton';

export default GlitchButton;
