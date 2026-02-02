'use client';

import { forwardRef, HTMLAttributes } from 'react';

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

const directionAnimations = {
  down: 'animate-[fall-down_var(--duration)_cubic-bezier(0.19,1,0.22,1)_forwards]',
  up: 'animate-[fall-up_var(--duration)_cubic-bezier(0.19,1,0.22,1)_forwards]',
};

export const FallingText = forwardRef<HTMLDivElement, FallingTextProps>(
  (
    {
      children,
      duration = 2,
      stagger = 100,
      loop = true,
      direction = 'down',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const letters = children.split('');

    return (
      <div
        ref={ref}
        className={`inline-flex overflow-hidden ${className}`}
        style={style}
        {...props}
      >
        {letters.map((letter, i) => (
          <span
            key={i}
            className={`inline-block opacity-0 ${directionAnimations[direction]} ${
              loop ? 'animate-infinite' : ''
            }`}
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${i * stagger}ms`,
              '--duration': `${duration}s`,
            } as React.CSSProperties}
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
