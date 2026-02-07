'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './tape-border.module.css';

export interface TapeBorderProps extends HTMLAttributes<HTMLDivElement> {
  /** Which edges to apply tape to */
  edges?: ('top' | 'bottom' | 'left' | 'right' | 'all' | 'corners' | 'top-bottom' | 'left-right');
  /** Tape size in pixels */
  size?: number;
  /** Primary stripe color (yellow by default) */
  stripeColor1?: string;
  /** Secondary stripe color (black by default) */
  stripeColor2?: string;
  /** Animate the stripes */
  animated?: boolean;
  /** Animation speed in seconds */
  animationSpeed?: number;
  /** Visual effect style */
  effect?: 'flat' | 'raised' | 'inset' | 'glow';
  /** Corner style */
  cornerStyle?: 'square' | 'outer' | 'inner';
  /** Edge texture style */
  texture?: 'clean' | 'rough' | 'jagged';
}

export const TapeBorder = forwardRef<HTMLDivElement, TapeBorderProps>(
  (
    {
      edges = 'all',
      size = 24,
      stripeColor1 = '#facc15',
      stripeColor2 = '#000000',
      animated = true,
      animationSpeed = 20,
      effect = 'flat',
      cornerStyle = 'square',
      texture = 'clean',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const getEdges = () => {
      switch (edges) {
        case 'all':
          return ['top', 'bottom', 'left', 'right'];
        case 'corners':
          return ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
        case 'top-bottom':
          return ['top', 'bottom'];
        case 'left-right':
          return ['left', 'right'];
        default:
          return Array.isArray(edges) ? edges : ['all'];
      }
    };

    const activeEdges = getEdges();

    const tapeStyle = {
      '--tape-size': `${size}px`,
      '--stripe-color-1': stripeColor1,
      '--stripe-color-2': stripeColor2,
      '--scroll-distance': `${size * 2}px`,
    } as React.CSSProperties;

    return (
      <div ref={ref} className={`${styles.container} ${className || ''}`} style={style} {...props}>
        {activeEdges.map((edge) => {
          const isVertical = edge === 'left' || edge === 'right';
          const cornerClass = cornerStyle === 'outer' ? styles.cornerOuter :
            cornerStyle === 'inner' ? styles.cornerInner : '';
          const textureClass = texture !== 'clean' ? styles[texture] : '';
          const isCorner = edge.includes('Left') || edge.includes('Right');

          return (
            <div
              key={edge}
              className={`${styles.tapeBorder} ${styles[edge]} ${animated ? styles.animated : ''} ${styles[effect]} ${cornerClass} ${textureClass}`}
              style={{
                ...tapeStyle,
                animationDuration: animated ? `${animationSpeed}s` : undefined,
              } as React.CSSProperties}
              aria-hidden="true"
            />
          );
        })}
        {children}
      </div>
    );
  }
);

TapeBorder.displayName = 'TapeBorder';

export default TapeBorder;
