'use client';

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import styles from './breathing-text.module.css';

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

export const BreathingText = forwardRef<HTMLSpanElement, BreathingTextProps>(
  (
    {
      children,
      intensity = 'medium',
      duration = 2,
      splitWords = false,
      wordDelay = 0.15,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      setIsVisible(true);
    }, [children]);

    if (splitWords) {
      const words = children.split(' ');
      return (
        <span ref={ref} className={`${styles.breathingContainer} ${className || ''}`} {...props}>
          {words.map((word, index) => (
            <span
              key={index}
              className={`${styles.breathingWord} ${styles[intensity]}`}
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
        className={`${styles.breathingText} ${styles[intensity]} ${className || ''}`}
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
