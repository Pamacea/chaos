'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './glass-container.module.css';

export interface GlassContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Blur amount in pixels */
  blur?: number;
  /** Opacity of the glass */
  opacity?: number;
  /** Border opacity */
  borderOpacity?: number;
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Glass color tint */
  tint?: 'white' | 'black' | 'neutral' | 'custom';
  /** Custom tint color */
  tintColor?: string;
  /** Glow effect */
  glow?: boolean;
  /** Glow color */
  glowColor?: string;
  /** Glass variant */
  variant?: 'frosted' | 'crystal' | 'dark' | 'light' | 'neon';
}

export const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      blur = 10,
      opacity = 0.7,
      borderOpacity = 0.3,
      rounded = 'lg',
      tint = 'white',
      tintColor,
      glow = false,
      glowColor,
      variant = 'frosted',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.glass} ${styles[rounded]} ${styles[tint]} ${styles[variant]} ${glow ? styles.glow : ''} ${className || ''}`}
        style={
          {
            '--blur': `${blur}px`,
            '--opacity': opacity,
            '--border-opacity': borderOpacity,
            '--tint-color': tintColor || 'transparent',
            '--glow-color': glowColor || 'currentColor',
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassContainer.displayName = 'GlassContainer';

export default GlassContainer;
