'use client';

import { forwardRef, HTMLAttributes } from 'react';

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

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

const variantStyles = {
  frosted: 'shadow-lg',
  crystal: 'border-2 hover:-translate-y-0.5 hover:shadow-xl transition-transform',
  dark: 'border-white/20',
  light: 'border-black/20',
  neon: 'shadow-lg',
};

const tintBgClasses = {
  white: 'before:bg-white/80 after:bg-gradient-to-br after:from-white/40 after:to-white/10',
  black: 'before:bg-black/60 after:bg-black/60',
  neutral: 'before:bg-gray-500/30 after:bg-gray-500/30',
  custom: '',
};

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
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const getTintStyle = (): React.CSSProperties => {
      if (tint === 'custom' && tintColor) {
        return { backgroundColor: tintColor };
      }
      if (variant === 'dark') {
        return { backgroundColor: 'rgba(0, 0, 0, 0.6)' };
      }
      if (variant === 'light') {
        return { backgroundColor: 'rgba(255, 255, 255, 0.85)' };
      }
      if (variant === 'neon') {
        return { backgroundColor: 'rgba(0, 0, 0, 0.3)' };
      }
      return {};
    };

    const getGlowStyle = (): React.CSSProperties => {
      if (glow || variant === 'neon') {
        return {
          boxShadow: `0 0 20px ${glowColor || 'currentColor'}, inset 0 0 20px ${glowColor || 'currentColor'}`,
        };
      }
      if (variant === 'frosted') {
        return { boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)' };
      }
      return {};
    };

    return (
      <div
        ref={ref}
        className={`
          relative backdrop-blur-[var(--blur)] saturate-180
          before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none
          before:border before:border-current before:opacity-[var(--border-opacity)]
          after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none
          after:opacity-[var(--opacity)] transition-all duration-300
          ${roundedClasses[rounded]} ${variantStyles[variant]}
          ${tint !== 'custom' ? tintBgClasses[tint] : ''}
          ${glow ? 'shadow-[0_0_20px_var(--glow-color,currentColor),inset_0_0_20px_var(--glow-color,currentColor)]' : ''}
          hover:opacity-100
          ${className}
        `}
        style={{
          '--blur': `${blur}px`,
          '--opacity': opacity,
          '--border-opacity': borderOpacity,
          '--glow-color': glowColor || 'currentColor',
          ...getTintStyle(),
          ...getGlowStyle(),
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassContainer.displayName = 'GlassContainer';

export default GlassContainer;
