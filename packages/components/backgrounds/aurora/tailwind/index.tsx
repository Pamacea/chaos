'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface AuroraProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of aurora colors (5 colors will be used) */
  colors?: string[];
  /** Animation duration in seconds */
  speed?: number;
  /** Opacity/strength of the aurora effect */
  intensity?: number;
  /** Blur amount in pixels */
  blur?: number;
  /** Position the aurora effect */
  position?: 'fixed' | 'absolute';
  /** Animation style variant */
  variant?: 'default' | 'subtle' | 'dynamic';
  /** Constrain aurora to specific area */
  region?: 'full' | 'top' | 'bottom' | 'left' | 'right';
  /** Custom CSS blend mode */
  blendMode?: string;
}

export const Aurora = forwardRef<HTMLDivElement, AuroraProps>(
  (
    {
      colors = ['#00ff00', '#00ffff', '#ff00ff', '#00ff80', '#8000ff'],
      speed = 20,
      intensity = 0.5,
      blur = 100,
      position = 'fixed',
      variant = 'default',
      region = 'full',
      blendMode = 'screen',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getSpeedModifier = () => {
      switch (variant) {
        case 'subtle': return 1.5;
        case 'dynamic': return 0.6;
        default: return 1;
      }
    };

    const layerAnimation = `aurora-move ${speed * getSpeedModifier()}s ease-in-out infinite`;

    const layerStyles = {
      '--aurora-color-1': colors[0] || '#00ff00',
      '--aurora-color-2': colors[1] || colors[0],
      '--aurora-color-3': colors[2] || colors[0],
      '--aurora-color-4': colors[3] || colors[1] || colors[0],
      '--aurora-color-5': colors[4] || colors[2] || colors[0],
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={`inset-0 w-full h-full overflow-hidden pointer-events-none z-[1] ${className || ''}`}
        style={{ position, ...style }}
        aria-hidden="true"
        {...props}
      >
        <style>{`
          @keyframes aurora-move {
            0% { transform: translate(-30%, -30%) rotate(0deg) scale(1); }
            25% { transform: translate(30%, -20%) rotate(90deg) scale(1.1); }
            50% { transform: translate(20%, 30%) rotate(180deg) scale(1.05); }
            75% { transform: translate(-25%, 20%) rotate(270deg) scale(1.15); }
            100% { transform: translate(-30%, -30%) rotate(360deg) scale(1); }
          }
        `}</style>
        <div
          className={`absolute inset-0 ${region !== 'full' ? '' : ''}`}
          style={{
            opacity: intensity,
            filter: `blur(${blur}px)`,
            mixBlendMode: blendMode,
          }}
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 50%, var(--aurora-color-1) 0%, transparent 70%)',
              animation: layerAnimation,
              animationDelay: '0s',
              transform: 'rotate(0deg) scale(1.2)',
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 50%, var(--aurora-color-2) 0%, transparent 70%)',
              animation: layerAnimation,
              animationDelay: `${speed * -0.25}s`,
              transform: 'rotate(60deg) scale(1.1)',
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 50%, var(--aurora-color-3) 0%, transparent 70%)',
              animation: layerAnimation,
              animationDelay: `${speed * -0.5}s`,
              transform: 'rotate(120deg) scale(1.3)',
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 50%, var(--aurora-color-4) 0%, transparent 70%)',
              animation: layerAnimation,
              animationDelay: `${speed * -0.75}s`,
              transform: 'rotate(180deg) scale(1.15)',
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 50%, var(--aurora-color-5) 0%, transparent 70%)',
              animation: layerAnimation,
              animationDelay: `${speed * -0.33}s`,
              transform: 'rotate(240deg) scale(1.25)',
            }}
          />
        </div>
      </div>
    );
  }
);

Aurora.displayName = 'Aurora';

export default Aurora;
