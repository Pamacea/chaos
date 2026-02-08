'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './gradient-text.module.css';

export interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** The text to display with gradient effect */
  children: string;
  /** Array of colors for the gradient */
  colors?: string[];
  /** Animation duration in seconds */
  speed?: number;
  /** Animation direction */
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  /** Gradient angle in degrees (overrides direction if set) */
  angle?: number;
  /** Gradient size percentage */
  size?: number;
  /** Pause animation on hover */
  pauseOnHover?: boolean;
}

export const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  (
    {
      children,
      colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'],
      speed = 3,
      direction = 'horizontal',
      angle,
      size = 200,
      pauseOnHover = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Calculate angle based on direction if not explicitly set
    const gradientAngle = angle ?? {
      horizontal: 90,
      vertical: 180,
      diagonal: 135,
    }[direction];

    return (
      <span
        ref={ref}
        className={`${styles.gradientText} ${pauseOnHover ? styles.pauseOnHover : ''} ${className || ''}`}
        style={{
          '--gradient-colors': colors.join(', '),
          '--gradient-speed': `${speed}s`,
          '--gradient-angle': `${gradientAngle}deg`,
          '--gradient-size': `${size}%`,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </span>
    );
  }
);

GradientText.displayName = 'GradientText';

export default GradientText;
