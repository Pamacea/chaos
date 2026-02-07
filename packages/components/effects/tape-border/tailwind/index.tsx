'use client';

import { forwardRef, HTMLAttributes, useId } from 'react';

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
      texture = 'clean',
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const id = useId();

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
          return ['top', 'bottom', 'left', 'right'];
      }
    };

    const activeEdges = getEdges();

    const getEdgeStyles = (edge: string) => {
      const isHorizontal = edge === 'top' || edge === 'bottom';
      const isVertical = edge === 'left' || edge === 'right';
      const isCorner = edge.includes('Left') || edge.includes('Right');

      let baseClasses = 'absolute pointer-events-none z-10';
      let positionStyles: React.CSSProperties = {};
      let sizeStyles: React.CSSProperties = {};

      if (edge === 'top') {
        baseClasses += ' top-0 left-0 right-0';
        sizeStyles = { height: `${size}px` };
      } else if (edge === 'bottom') {
        baseClasses += ' bottom-0 left-0 right-0';
        sizeStyles = { height: `${size}px` };
      } else if (edge === 'left') {
        baseClasses += ' top-0 bottom-0 left-0';
        sizeStyles = { width: `${size}px` };
      } else if (edge === 'right') {
        baseClasses += ' top-0 bottom-0 right-0';
        sizeStyles = { width: `${size}px` };
      } else if (edge === 'topLeft') {
        baseClasses += ' top-0 left-0';
        sizeStyles = { width: `${size}px`, height: `${size}px` };
      } else if (edge === 'topRight') {
        baseClasses += ' top-0 right-0';
        sizeStyles = { width: `${size}px`, height: `${size}px` };
      } else if (edge === 'bottomLeft') {
        baseClasses += ' bottom-0 left-0';
        sizeStyles = { width: `${size}px`, height: `${size}px` };
      } else if (edge === 'bottomRight') {
        baseClasses += ' bottom-0 right-0';
        sizeStyles = { width: `${size}px`, height: `${size}px` };
      }

      const gradientAngle = isVertical ? '-45deg' : '45deg';

      return { baseClasses, sizeStyles, gradientAngle };
    };

    const getEffectClasses = () => {
      switch (effect) {
        case 'raised':
          return 'shadow-md';
        case 'inset':
          return 'shadow-inner';
        case 'glow':
          return `shadow-[0_0_10px_${stripeColor1},0_0_20px_${stripeColor1}]`;
        default:
          return '';
      }
    };

    const getTextureClasses = () => {
      switch (texture) {
        case 'rough':
          return 'border-2 border-dashed border-black/30';
        case 'jagged':
          return '';
        default:
          return '';
      }
    };

    return (
      <>
        <style>{`
          @keyframes stripe-scroll-${id} {
            from { background-position: 0 0; }
            to { background-position: ${size * 2}px 0; }
          }
          .tape-stripe-${id} {
            background: repeating-linear-gradient(
              45deg,
              ${stripeColor1},
              ${stripeColor1} 10px,
              ${stripeColor2} 10px,
              ${stripeColor2} 20px
            );
            ${animated ? `animation: stripe-scroll-${id} ${animationSpeed}s linear infinite;` : ''}
          }
        `}</style>
        <div ref={ref} className={`relative ${className}`} style={style} {...props}>
          {activeEdges.map((edge) => {
            const { baseClasses, sizeStyles, gradientAngle } = getEdgeStyles(edge);
            const effectClasses = getEffectClasses();
            const textureClasses = getTextureClasses();

            return (
              <div
                key={edge}
                className={`${baseClasses} ${effectClasses} ${textureClasses}`}
                style={sizeStyles}
                aria-hidden="true"
              >
                <div
                  className={`tape-stripe-${id} absolute inset-0`}
                  style={{
                    background: `repeating-linear-gradient(${gradientAngle}, ${stripeColor1}, ${stripeColor1} 10px, ${stripeColor2} 10px, ${stripeColor2} 20px)`,
                  }}
                />
              </div>
            );
          })}
          {children}
        </div>
      </>
    );
  }
);

TapeBorder.displayName = 'TapeBorder';

export default TapeBorder;
