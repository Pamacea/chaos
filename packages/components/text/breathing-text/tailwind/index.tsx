'use client';

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';

export interface BreathingTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** The text to display with breathing effect */
  children: string;
  /** Breathing intensity: subtle, medium, intense */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Animation speed in seconds */
  duration?: number;
  /** Split text into words or keep as one unit */
  splitWords?: boolean;
  /** Delay between each word (in seconds) */
  wordDelay?: number;
}

const intensityClasses = {
  subtle: {
    base: 'animate-[breathe-in_1.2s_ease-out_forwards]',
    hover: 'hover:animate-[breathe-subtle_3s_ease-in-out_infinite]',
  },
  medium: {
    base: 'animate-[breathe-in_0.8s_ease-out_forwards]',
    hover: 'hover:animate-[breathe-medium_2s_ease-in-out_infinite]',
  },
  intense: {
    base: 'animate-[breathe-in_0.5s_ease-out_forwards]',
    hover: 'hover:animate-[breathe-intense_1.5s_ease-in-out_infinite]',
  },
};

export const BreathingText = forwardRef<HTMLSpanElement, BreathingTextProps>(
  (
    {
      children,
      intensity = 'medium',
      duration = 2,
      splitWords = false,
      wordDelay = 0.15,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      setIsVisible(true);
    }, [children]);

    const intensityStyle = intensityClasses[intensity];

    if (splitWords) {
      const words = children.split(' ');
      return (
        <span ref={ref} className={`contents ${className}`} {...props}>
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block opacity-0 ${intensityStyle.base} ${intensityStyle.hover}`}
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${index * wordDelay}s`,
              }}
            >
              {word}
              {index < words.length - 1 && ' '}
            </span>
          ))}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={`inline-block opacity-0 ${intensityStyle.base} ${intensityStyle.hover} ${className}`}
        style={{ animationDuration: `${duration}s` }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreathingText.displayName = 'BreathingText';

export default BreathingText;
