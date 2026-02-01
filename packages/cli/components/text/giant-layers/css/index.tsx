'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './giant-layers.module.css';

export interface GiantLayersProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text to display */
  children: string;
  /** Number of shadow layers (1-3) */
  layers?: 1 | 2 | 3;
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Visual variant */
  variant?: 'blood' | 'cyber' | 'mono' | 'neon';
  /** Shadow offset direction */
  direction?: 'diagonal' | 'horizontal' | 'vertical';
  /** Animate layers */
  animated?: boolean;
  /** Expand on hover */
  hover?: boolean;
  /** Custom layer colors */
  layerColors?: [string, string?, string?];
}

export const GiantLayers = forwardRef<HTMLSpanElement, GiantLayersProps>(
  (
    {
      children,
      layers = 3,
      size = 'lg',
      variant = 'blood',
      direction = 'diagonal',
      animated = false,
      hover = false,
      layerColors,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const containerClasses = [
      styles.container,
      styles[size],
      styles[variant],
      styles[direction],
      animated && styles.animated,
      hover && styles.hover,
      className
    ].filter(Boolean).join(' ');

    const getLayerStyle = (index: number) => {
      if (layerColors && layerColors[index]) {
        return {
          background: `linear-gradient(180deg, ${layerColors[index]} 0%, transparent 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        };
      }
      return undefined;
    };

    return (
      <span
        ref={ref}
        className={containerClasses}
        style={style}
        {...props}
      >
        {/* Shadow layers */}
        {layers >= 3 && (
          <span className={`${styles.layer} ${styles.shadow3}`} style={getLayerStyle(2)} aria-hidden>
            {children}
          </span>
        )}
        {layers >= 2 && (
          <span className={`${styles.layer} ${styles.shadow2}`} style={getLayerStyle(1)} aria-hidden>
            {children}
          </span>
        )}
        {layers >= 1 && (
          <span className={`${styles.layer} ${styles.shadow1}`} style={getLayerStyle(0)} aria-hidden>
            {children}
          </span>
        )}
        {/* Base layer */}
        <span className={`${styles.layer} ${styles.base}`}>
          {children}
        </span>
      </span>
    );
  }
);

GiantLayers.displayName = 'GiantLayers';
export default GiantLayers;
