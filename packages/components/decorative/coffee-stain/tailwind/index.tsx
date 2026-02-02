'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface CoffeeStainProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of stain */
  size?: 'small' | 'medium' | 'large' | 'random';
  /** Intensity of stain (opacity/color strength) */
  intensity?: 'light' | 'medium' | 'dark';
  /** Stain variant */
  variant?: 'classic' | 'ring' | 'splash' | 'drip' | 'random';
  /** Rotation angle */
  rotation?: number;
  /** Position: absolute positioning coordinates */
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  /** Number of drips (for drip variant) */
  dripCount?: number;
  /** Enable animation (slow fading/movement) */
  animated?: boolean;
}

const sizeClasses = {
  small: 'w-10 h-10',
  medium: 'w-15 h-15',
  large: 'w-20 h-20',
  random: '',
};

const intensityColors = {
  light: 'rgba(101, 67, 33, 0.05)',
  medium: 'rgba(101, 67, 33, 0.12)',
  dark: 'rgba(101, 67, 33, 0.2)',
};

const animationPulse = 'animate-stain-pulse';

export const CoffeeStain = forwardRef<HTMLDivElement, CoffeeStainProps>(
  (
    {
      size = 'medium',
      intensity = 'medium',
      variant = 'classic',
      rotation = 0,
      position,
      dripCount = 3,
      animated = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Generate random values for 'random' variants
    const randomSize = Math.random() * 60 + 40; // 40-100px
    const randomRotation = Math.random() * 360;

    const finalSize = size === 'random' ? randomSize : undefined;
    const finalRotation = variant === 'random' ? randomRotation : rotation;
    const finalVariant = variant === 'random' ? ['classic', 'ring', 'splash', 'drip'][Math.floor(Math.random() * 4)] : variant;

    const stainColor = intensityColors[intensity];

    // Generate drips
    const drips = Array.from({ length: dripCount }, (_, i) => ({
      id: i,
      angle: (360 / dripCount) * i + Math.random() * 30 - 15,
      length: Math.random() * 20 + 10,
      delay: Math.random() * 2,
    }));

    return (
      <div
        ref={ref}
        className={`absolute pointer-events-none select-none ${animated ? animationPulse : ''} ${size === 'random' ? '' : sizeClasses[size]} ${className || ''}`}
        style={{
          transform: `rotate(${finalRotation}deg)`,
          width: finalSize ? `${finalSize}px` : undefined,
          height: finalSize ? `${finalSize}px` : undefined,
          ...position,
          ...style,
        }}
        {...props}
      >
        {/* Main stain body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: finalVariant === 'classic'
              ? `radial-gradient(ellipse at 40% 40%, transparent 20%, ${stainColor} 40%, ${stainColor} 60%, transparent 70%)`
              : `radial-gradient(ellipse at center, transparent 30%, ${stainColor} 70%, transparent 100%)`,
          }}
        />

        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)' opacity='0.3'/></svg>")`,
          }}
        />

        {/* Outer ring (for ring variant) */}
        {finalVariant === 'ring' && (
          <div
            className="absolute inset-[10%] rounded-full"
            style={{
              background: `radial-gradient(ellipse at center, transparent 80%, ${stainColor} 90%, transparent 100%)`,
            }}
          />
        )}

        {/* Splash marks (for splash variant) */}
        {finalVariant === 'splash' && (
          <div className="absolute -inset-5">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                  backgroundColor: stainColor,
                  transform: `rotate(${(360 / 8) * i}deg) translateY(-${Math.random() * 30 + 20}px)`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                }}
              />
            ))}
          </div>
        )}

        {/* Drips (for drip variant) */}
        {finalVariant === 'drip' && (
          <div className="absolute inset-0">
            {drips.map((drip) => (
              <div
                key={drip.id}
                className="absolute top-1/2 left-1/2 w-1 origin-top animate-drip-fall"
                style={{
                  backgroundColor: stainColor,
                  transform: `rotate(${drip.angle}deg)`,
                  animationDelay: `${drip.delay}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

CoffeeStain.displayName = 'CoffeeStain';

export default CoffeeStain;
