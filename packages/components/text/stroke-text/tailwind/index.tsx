'use client';

import { forwardRef, HTMLAttributes } from 'react';

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
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`relative inline-block ${animated ? 'animate-[stroke-pulse_2s_ease-in-out_infinite]' : ''} ${className}`}
        style={
          {
            '-webkit-text-stroke': `${strokeWidth}px ${strokeColor}`,
            '-webkit-text-stroke-width': `${strokeWidth}px`,
            '-webkit-text-stroke-color': strokeColor,
            color: fillColor,
            '-webkit-text-fill-color': fillColor,
          } as React.CSSProperties
        }
        data-text={children}
        {...props}
      >
        {children}
        {doubleStroke && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={
              {
                content: `"${children}"`,
                '-webkit-text-stroke': `${strokeWidth + 1}px ${outerStrokeColor}`,
                '-webkit-text-fill-color': 'transparent',
              } as React.CSSProperties
            }
          >
            {children}
          </span>
        )}
      </span>
    );
  }
);

StrokeText.displayName = 'StrokeText';

export default StrokeText;
