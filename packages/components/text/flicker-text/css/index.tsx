'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './flicker-text.module.css';

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

export const FlickerText = forwardRef<HTMLSpanElement, FlickerTextProps>(
  (
    {
      children,
      speed = 'normal',
      minOpacity = 0,
      hoverOnly = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`${styles.flicker} ${styles[speed]} ${hoverOnly ? styles.hoverOnly : ''} ${className || ''}`}
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
