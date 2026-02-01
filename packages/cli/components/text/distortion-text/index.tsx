'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './distortion-text.module.css';

export interface DistortionTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** The text to display */
  children: string;
  /** Distortion type */
  type?: 'wave' | 'shake' | 'skew' | 'blur';
  /** Animation speed: slow, normal, fast */
  speed?: 'slow' | 'normal' | 'fast';
  /** Distortion intensity */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Only animate on hover */
  hoverOnly?: boolean;
}

export const DistortionText = forwardRef<HTMLSpanElement, DistortionTextProps>(
  (
    {
      children,
      type = 'wave',
      speed = 'normal',
      intensity = 'medium',
      hoverOnly = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`
          ${styles.distortion} 
          ${styles[type]} 
          ${styles[speed]} 
          ${styles[intensity]}
          ${hoverOnly ? styles.hoverOnly : ''}
          ${className || ''}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

DistortionText.displayName = 'DistortionText';

export default DistortionText;
