'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ChaosButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Chaos level */
  chaos?: 'mild' | 'medium' | 'extreme';
  /** Button variant */
  variant?: 'solid' | 'outline' | 'broken';
  /** Accent color (hex or CSS color) */
  accentColor?: string;
}

const chaosClasses = {
  mild: 'data-[chaos]:debris-opacity-30 data-[chaos]:ghost-anim-duration-300',
  medium: '',
  extreme: 'data-[chaos]:debris-lg data-[chaos]:ghost-anim-duration-80 data-[chaos]:shake-on-hover',
};

const variantClasses = {
  solid: 'bg-[var(--accent)] text-black',
  outline: 'bg-transparent border border-current text-inherit',
  broken: 'bg-transparent border border-current text-inherit [clip-path:polygon(0_0,100%_0,100%_30%,95%_30%,95%_70%,100%_70%,100%_100%,0_100%)]',
};

export const ChaosButton = forwardRef<HTMLButtonElement, ChaosButtonProps>(
  (
    {
      children,
      chaos = 'medium',
      variant = 'solid',
      accentColor = '#ff0040',
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center
          px-10 py-4
          font-inherit text-sm font-semibold tracking-widest uppercase
          border-none cursor-pointer overflow-visible
          transition-transform active:scale-[0.98]
          ${variantClasses[variant]}
          ${chaosClasses[chaos]}
          group hover:debris-visible
          ${className || ''}
        `}
        style={{ '--accent': accentColor, ...style } as React.CSSProperties}
        data-chaos={chaos}
        {...props}
      >
        {/* Debris elements */}
        <span className="absolute pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100
          w-5 h-0.5 -top-1.5 left-[15%] -rotate-[5deg] bg-[var(--accent)]" />
        <span className="absolute pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100
          w-0.5 h-4 -bottom-2.5 right-[20%] bg-[var(--accent)]" />
        <span className="absolute pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100
          w-4 h-0.5 top-[40%] -right-3 bg-[var(--accent)]" />
        <span className="absolute pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100
          w-2 h-2 -bottom-1.5 -left-1.5 bg-transparent border border-[var(--accent)] rotate-45" />

        {/* Glitch slice */}
        <span className="absolute top-1/2 left-[-5%] right-[-5%] h-0.5 -translate-y-1/2
          bg-[var(--accent)] opacity-0 group-hover:animate-[slice_0.3s_steps(4)_infinite]" />

        {/* Noise overlay */}
        <span className="absolute inset-0 opacity-0 mix-blend-overlay pointer-events-none
          group-hover:opacity-15
          bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%270%200%20256%20256%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.9%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23n)%27/%3E%3C/svg%3E')]" />

        {/* Main content */}
        <span className="relative z-10">{children}</span>

        {/* Ghost layers */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0
          text-[var(--accent)] group-hover:opacity-60 group-hover:animate-[ghost1_0.15s_infinite]">
          {children}
        </span>
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0
          text-[var(--accent-alt,cyan)] group-hover:opacity-40 group-hover:animate-[ghost2_0.15s_infinite]">
          {children}
        </span>

        <style>{`
          @keyframes slice {
            0% { opacity: 0.8; clip-path: inset(0 80% 0 0); }
            25% { opacity: 0.6; clip-path: inset(0 30% 0 40%); }
            50% { opacity: 0.8; clip-path: inset(0 0 0 70%); }
            75% { opacity: 0.4; clip-path: inset(0 50% 0 20%); }
            100% { opacity: 0; }
          }
          @keyframes ghost1 {
            0%, 100% { transform: translate(0); clip-path: inset(0 0 60% 0); }
            50% { transform: translate(-3px, 2px); clip-path: inset(30% 0 30% 0); }
          }
          @keyframes ghost2 {
            0%, 100% { transform: translate(0); clip-path: inset(60% 0 0 0); }
            50% { transform: translate(3px, -2px); clip-path: inset(20% 0 50% 0); }
          }
          @keyframes shake {
            0%, 100% { transform: translate(0); }
            25% { transform: translate(2px, 1px); }
            50% { transform: translate(-1px, -2px); }
            75% { transform: translate(1px, -1px); }
          }
          [data-chaos="extreme"]:hover { animation: shake 0.1s infinite; }
          [data-chaos="mild"] .group-hover\\:animate-\\[ghost1_0\\.15s_infinite\\] { animation-duration: 0.3s; }
          [data-chaos="mild"] .group-hover\\:animate-\\[ghost2_0\\.15s_infinite\\] { animation-duration: 0.3s; }
          [data-chaos="extreme"] .group-hover\\:animate-\\[ghost1_0\\.15s_infinite\\] { animation-duration: 0.08s; }
          [data-chaos="extreme"] .group-hover\\:animate-\\[ghost2_0\\.15s_infinite\\] { animation-duration: 0.08s; }
        `}</style>
      </button>
    );
  }
);

ChaosButton.displayName = 'ChaosButton';

export default ChaosButton;
