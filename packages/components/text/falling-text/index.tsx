'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './falling-text.module.css';

export interface FallingTextProps extends HTMLAttributes<HTMLDivElement> {
  /** Text to display falling */
  children: string;
  /** Fall duration in seconds */
  duration?: number;
  /** Stagger delay between letters in ms */
  stagger?: number;
  /** Loop the animation */
  loop?: boolean;
  /** Fall direction */
  direction?: 'down' | 'up';
}

export const FallingText = forwardRef<HTMLDivElement, FallingTextProps>(
  (
    {
      children,
      duration = 2,
      stagger = 100,
      loop = true,
      direction = 'down',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const letters = children.split('');

    return (
      <div
        ref={ref}
        className={`${styles.container} ${className || ''}`}
        style={style}
        {...props}
      >
        {letters.map((letter, i) => (
          <span
            key={i}
            className={`${styles.letter} ${styles[direction]} ${loop ? styles.loop : ''}`}
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${i * stagger}ms`,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    );
  }
);

FallingText.displayName = 'FallingText';

export default FallingText;
