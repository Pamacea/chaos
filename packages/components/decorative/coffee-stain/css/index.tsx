'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './coffee-stain.module.css';

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
        className={`${styles.stain} ${styles[size]} ${styles[intensity]} ${styles[finalVariant]} ${
          animated ? styles.animated : ''
        } ${className || ''}`}
        style={{
          '--stain-size': finalSize ? `${finalSize}px` : undefined,
          '--rotation': `${finalRotation}deg`,
          ...position,
          ...style,
        }}
        {...props}
      >
        {/* Main stain body */}
        <div className={styles.stainBody} />

        {/* Outer ring (for ring variant) */}
        {finalVariant === 'ring' && <div className={styles.stainRing} />}

        {/* Splash marks (for splash variant) */}
        {finalVariant === 'splash' && (
          <div className={styles.splashes}>
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={styles.splash}
                style={{
                  '--angle': `${(360 / 8) * i}deg`,
                  '--distance': `${Math.random() * 30 + 20}px`,
                  '--size': `${Math.random() * 10 + 5}px`,
                }}
              />
            ))}
          </div>
        )}

        {/* Drips (for drip variant) */}
        {finalVariant === 'drip' && (
          <div className={styles.drips}>
            {drips.map((drip) => (
              <div
                key={drip.id}
                className={styles.drip}
                style={{
                  '--angle': `${drip.angle}deg`,
                  '--length': `${drip.length}px`,
                  '--delay': `${drip.delay}s`,
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
