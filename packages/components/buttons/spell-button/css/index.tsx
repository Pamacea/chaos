'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './spell-button.module.css';

export type SpellType = 'fire' | 'ice' | 'lightning' | 'void';

export interface SpellButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Type of spell for visual effects */
  spellType?: SpellType;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Intensity of the cast effect */
  intensity?: 'subtle' | 'normal' | 'epic';
}

const spellColors: Record<SpellType, { primary: string; glow: string; particle: string }> = {
  fire: { primary: '#ff4500', glow: '#ff6b35', particle: '#ffa500' },
  ice: { primary: '#00bfff', glow: '#87ceeb', particle: '#e0ffff' },
  lightning: { primary: '#ff00ff', glow: '#da70d6', particle: '#ffff00' },
  void: { primary: '#4b0082', glow: '#8a2be2', particle: '#9400d3' },
};

export const SpellButton = forwardRef<HTMLButtonElement, SpellButtonProps>(
  (
    {
      children,
      spellType = 'fire',
      size = 'md',
      intensity = 'normal',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const colors = spellColors[spellType];

    return (
      <button
        ref={ref}
        className={`${styles.spellButton} ${styles[size]} ${styles[intensity]} ${className || ''}`}
        style={{
          '--spell-primary': colors.primary,
          '--spell-glow': colors.glow,
          '--spell-particle': colors.particle,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <span className={styles.content}>{children}</span>
        <span className={styles.glowLayer} aria-hidden="true" />
        <span className={styles.particleContainer} aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={styles.particle} style={{ '--delay': `${i * 0.05}s` } as React.CSSProperties} />
          ))}
        </span>
        <span className={styles.ring} aria-hidden="true" />
        <span className={styles.ring2} aria-hidden="true" />
      </button>
    );
  }
);

SpellButton.displayName = 'SpellButton';

export default SpellButton;
