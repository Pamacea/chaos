'use client';

import { forwardRef, useEffect, useState, HTMLAttributes } from 'react';
import styles from './word-by-word-reveal.module.css';

export interface WordByWordRevealProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text to reveal word by word */
  children: string;
  /** Delay between words in ms */
  wordDelay?: number;
  /** Animation duration per word */
  duration?: number;
  /** Delay before starting */
  startDelay?: number;
  /** Animation style */
  style?: 'fade' | 'slide' | 'scale' | 'blur' | 'glitch';
  /** Direction (for slide) */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Stagger lines */
  staggerLines?: boolean;
}

export const WordByWordReveal = forwardRef<HTMLSpanElement, WordByWordRevealProps>(
  (
    {
      children,
      wordDelay = 100,
      duration = 400,
      startDelay = 0,
      style = 'fade',
      direction = 'up',
      staggerLines = false,
      className,
      ...props
    },
    ref
  ) => {
    const [visibleWords, setVisibleWords] = useState<number[]>([]);

    useEffect(() => {
      const words = children.split(' ');
      const timer = setTimeout(() => {
        words.forEach((_, index) => {
          setTimeout(() => {
            setVisibleWords((prev) => [...prev, index]);
          }, index * wordDelay);
        });
      }, startDelay);

      return () => clearTimeout(timer);
    }, [children, wordDelay, startDelay]);

    const words = children.split(' ');

    return (
      <span
        ref={ref}
        className={`${styles.wordByWord} ${styles[style]} ${styles[direction]} ${className || ''}`}
        style={
          {
            '--duration': `${duration}ms`,
            '--word-delay': `${wordDelay}ms`,
          } as React.CSSProperties
        }
        {...props}
      >
        {words.map((word, index) => (
          <span
            key={index}
            className={`${styles.word} ${visibleWords.includes(index) ? styles.visible : ''}`}
            style={{ '--index': index } as React.CSSProperties}
          >
            {word}
            {index < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    );
  }
);

WordByWordReveal.displayName = 'WordByWordReveal';

export default WordByWordReveal;
