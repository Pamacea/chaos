'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './incantation.module.css';

export interface IncantationProps extends HTMLAttributes<HTMLSpanElement> {
  /** The incantation text to display */
  children: string;
  /** Intensity of the magical effect: subtle, medium, intense */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Magical language style: arcane, divine, eldritch */
  language?: 'arcane' | 'divine' | 'eldritch';
  /** Primary glow color */
  glowColor?: string;
  /** Secondary color for the shift effect */
  shiftColor?: string;
  /** Duration of the pulse cycle in seconds */
  pulseDuration?: number;
}

export const Incantation = forwardRef<HTMLSpanElement, IncantationProps>(
  (
    {
      children,
      intensity = 'medium',
      language = 'arcane',
      glowColor = '#a855f7',
      shiftColor = '#fbbf24',
      pulseDuration = 2,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`${styles.incantation} ${styles[intensity]} ${styles[language]} ${className || ''}`}
        style={{
          '--glow-color': glowColor,
          '--shift-color': shiftColor,
          '--pulse-duration': `${pulseDuration}s`,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <span className={styles.text} aria-hidden="true">
          {children}
        </span>
        <span className={styles.glowLayer}>{children}</span>
        <span className={styles.shiftLayer}>{children}</span>
        <span className={styles.vibrationLayer}>{children}</span>
      </span>
    );
  }
);

Incantation.displayName = 'Incantation';

export default Incantation;
