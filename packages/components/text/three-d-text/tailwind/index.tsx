'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface ThreeDTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text to display */
  children: string;
  /** Number of shadow layers for depth */
  depth?: number;
  /** Direction of the 3D extrusion */
  direction?: 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left';
  /** Shadow color */
  color?: string;
  /** Shadow opacity (0-1) */
  opacity?: number;
  /** Pixels between each layer */
  spacing?: number;
}

export const ThreeDText = forwardRef<HTMLSpanElement, ThreeDTextProps>(
  (
    {
      children,
      depth = 5,
      direction = 'bottom-right',
      color = '#000000',
      opacity = 0.8,
      spacing = 2,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Generate shadow string based on direction and depth
    const generateShadow = () => {
      const shadows = [];
      const safeDepth = Math.max(1, Math.min(depth, 20));
      const safeOpacity = Math.max(0, Math.min(opacity, 1));

      for (let i = 1; i <= safeDepth; i++) {
        const offset = i * spacing;
        const layerOpacity = safeOpacity * (1 - (i - 1) / safeDepth * 0.5);
        let x = 0;
        let y = 0;

        switch (direction) {
          case 'top-left':
            x = -offset;
            y = -offset;
            break;
          case 'top':
            x = 0;
            y = -offset;
            break;
          case 'top-right':
            x = offset;
            y = -offset;
            break;
          case 'right':
            x = offset;
            y = 0;
            break;
          case 'bottom-right':
            x = offset;
            y = offset;
            break;
          case 'bottom':
            x = 0;
            y = offset;
            break;
          case 'bottom-left':
            x = -offset;
            y = offset;
            break;
          case 'left':
            x = -offset;
            y = 0;
            break;
        }

        // Convert hex color to rgba for opacity
        const hexToRgb = (hex: string) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
              }
            : { r: 0, g: 0, b: 0 };
        };

        const rgb = hexToRgb(color);
        shadows.push(`${x}px ${y}px 0 rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerOpacity})`);
      }

      return shadows.join(', ');
    };

    return (
      <span
        ref={ref}
        className={`relative inline-block font-bold select-none hover:-translate-x-px hover:-translate-y-px transition-transform ${className}`}
        style={{
          textShadow: generateShadow(),
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

ThreeDText.displayName = 'ThreeDText';

export default ThreeDText;
