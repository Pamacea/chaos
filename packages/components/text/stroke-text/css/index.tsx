'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './stroke-text.module.css';

export interface StrokeTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text content */
  children: string;
  /** Stroke width in pixels */
  strokeWidth?: number;
  /** Stroke color */
  strokeColor?: string;
  /** Fill color */
  fillColor?: string;
  /** Stroke style */
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  /** Double stroke effect */
  doubleStroke?: boolean;
  /** Outer stroke color */
  outerStrokeColor?: string;
  /** Enable stroke animation */
  animated?: boolean;
}

export const StrokeText = forwardRef<HTMLSpanElement, StrokeTextProps>(
  (
    {
      children,
      strokeWidth = 2,
      strokeColor = '#000',
      fillColor = 'transparent',
      strokeStyle = 'solid',
      doubleStroke = false,
      outerStrokeColor = '#fff',
      animated = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`${styles.strokeText} ${styles[strokeStyle]} ${doubleStroke ? styles.double : ''} ${
          animated ? styles.animated : ''
        } ${className || ''}`}
        style={
          {
            '--stroke-width': `${strokeWidth}px`,
            '--stroke-color': strokeColor,
            '--fill-color': fillColor,
            '--outer-stroke-color': outerStrokeColor,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </span>
    );
  }
);

StrokeText.displayName = 'StrokeText';

export default StrokeText;
