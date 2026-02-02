'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './glitch-button.module.css';

export interface GlitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'default' | 'outline' | 'ghost';
  /** Glitch intensity on hover */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Primary glitch color */
  glitchColor?: string;
  /** Secondary glitch color */
  glitchColorAlt?: string;
}

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
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[intensity]} ${className || ''}`}
        style={{
          '--glitch-color': glitchColor,
          '--glitch-color-alt': glitchColorAlt,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <span className={styles.content}>{children}</span>
        <span className={styles.glitchLayer} aria-hidden="true">{children}</span>
        <span className={styles.glitchLayerAlt} aria-hidden="true">{children}</span>
        <span className={styles.noiseLayer} aria-hidden="true" />
      </button>
    );
  }
);

GlitchButton.displayName = 'GlitchButton';

export default GlitchButton;
