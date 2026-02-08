'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface WavyTextProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to display with wave effect */
  children: string;
  /** Wave height in pixels (default: 5) */
  amplitude?: number;
  /** Number of wave cycles (default: 1) */
  frequency?: number;
  /** Animation duration in seconds (default: 2) */
  speed?: number;
  /** Wave direction (default: 'vertical') */
  direction?: 'vertical' | 'horizontal';
}

export const WavyText = forwardRef<HTMLDivElement, WavyTextProps>(
  (
    {
      children,
      amplitude = 5,
      frequency = 1,
      speed = 2,
      direction = 'vertical',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const letters = children.split('');
    const animationClass =
      direction === 'horizontal'
        ? 'animate-[wavy-horizontal_2s_ease-in-out_infinite]'
        : 'animate-[wavy-vertical_2s_ease-in-out_infinite]';

    return (
      <div
        ref={ref}
        className={`inline-flex ${className}`}
        style={style}
        {...props}
      >
        {letters.map((letter, index) => {
          const delay = (index / letters.length) * speed;
          const phase = (index / letters.length) * frequency * Math.PI * 2;

          return (
            <span
              key={index}
              className={`inline-block will-change-transform ${animationClass}`}
              style={
                {
                  '--wave-delay': `${delay}s`,
                  '--wave-phase': `${phase}rad`,
                  '--wave-amplitude': `${amplitude}px`,
                  animationDelay: `var(--wave-delay)`,
                  animationDuration: `${speed}s`,
                } as React.CSSProperties
              }
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          );
        })}
      </div>
    );
  }
);

WavyText.displayName = 'WavyText';

export default WavyText;
