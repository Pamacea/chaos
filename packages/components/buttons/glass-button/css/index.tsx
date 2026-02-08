'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './glass-button.module.css';

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
    const customStyle: React.CSSProperties = {
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
        className={`${styles.button} ${className || ''}`}
        style={customStyle}
        {...props}
      >
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;
