'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface FlickerTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** The text to display */
  children: string;
  /** Flicker speed: slow, normal, fast, erratic */
  speed?: 'slow' | 'normal' | 'fast' | 'erratic';
  /** Minimum opacity during flicker */
  minOpacity?: number;
  /** Flicker only on hover */
  hoverOnly?: boolean;
}

const speedAnimations = {
  slow: 'animate-[flicker-slow_4s_infinite]',
  normal: 'animate-[flicker-normal_2s_infinite]',
  fast: 'animate-[flicker-fast_0.5s_infinite]',
  erratic: 'animate-[flicker-erratic_3s_infinite]',
};

export const FlickerText = forwardRef<HTMLSpanElement, FlickerTextProps>(
  (
    {
      children,
      speed = 'normal',
      minOpacity = 0,
      hoverOnly = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`inline-block ${hoverOnly ? 'hover:' : ''}${speedAnimations[speed]} ${className}`}
        style={{
          '--min-opacity': minOpacity,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </span>
    );
  }
);

FlickerText.displayName = 'FlickerText';

export default FlickerText;
