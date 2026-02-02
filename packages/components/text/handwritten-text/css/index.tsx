'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './handwritten-text.module.css';

export interface HandwrittenTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text content */
  children: string;
  /** Handwriting style */
  font?: 'cursive' | 'script' | 'signature' | 'messy' | 'neat' | 'custom';
  /** Custom font family */
  customFont?: string;
  /** Size variation (for natural feel) */
  sizeVariation?: boolean;
  /** Rotation variation (for natural feel) */
  rotationVariation?: boolean;
  /** Baseline shift (for natural feel) */
  baselineShift?: boolean;
  /** Ink bleed effect */
  inkBleed?: boolean;
  /** Paper texture behind */
  paperBackground?: boolean;
}

export const HandwrittenText = forwardRef<HTMLSpanElement, HandwrittenTextProps>(
  (
    {
      children,
      font = 'cursive',
      customFont,
      sizeVariation = true,
      rotationVariation = true,
      baselineShift = true,
      inkBleed = false,
      paperBackground = false,
      className,
      ...props
    },
    ref
  ) => {
    // Process text to apply variations to each character
    const chars = children.split('').map((char, index) => {
      const sizeMod = sizeVariation ? (Math.random() * 0.2 + 0.9) : 1;
      const rotMod = rotationVariation ? (Math.random() * 6 - 3) : 0;
      const baselineMod = baselineShift ? (Math.random() * 4 - 2) : 0;

      return (
        <span
          key={index}
          className={styles.char}
          style={
            {
              '--size-mod': sizeMod,
              '--rot-mod': `${rotMod}deg`,
              '--baseline-mod': `${baselineMod}px`,
            } as React.CSSProperties
          }
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });

    return (
      <span
        ref={ref}
        className={`${styles.handwritten} ${styles[font]} ${
          inkBleed ? styles.inkBleed : ''
        } ${paperBackground ? styles.paper : ''} ${className || ''}`}
        style={customFont ? { fontFamily: customFont } : undefined}
        {...props}
      >
        {chars}
      </span>
    );
  }
);

HandwrittenText.displayName = 'HandwrittenText';

export default HandwrittenText;
