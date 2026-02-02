'use client';

import { forwardRef, useEffect, useState, HTMLAttributes } from 'react';

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

const styleClasses = {
  fade: 'animate-[fade-word_var(--duration)_ease_forwards]',
  slide: '',
  scale: 'animate-[scale-word_var(--duration)_ease_forwards]',
  blur: 'animate-[blur-word_var(--duration)_ease_forwards]',
  glitch: 'animate-[glitch-word_0.3s_ease_forwards]',
};

const directionClasses = {
  up: 'translate-y-5',
  down: '-translate-y-5',
  left: 'translate-x-5',
  right: '-translate-x-5',
};

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
      className = '',
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

    const getAnimationClass = (index: number) => {
      if (!visibleWords.includes(index)) return '';

      if (style === 'slide') {
        return `animate-[slide-${direction}_var(--duration)_ease_forwards] ${directionClasses[direction]}`;
      }
      return styleClasses[style];
    };

    return (
      <span
        ref={ref}
        className={`inline ${className}`}
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
            className={`inline-block opacity-0 transition-all ${getAnimationClass(index)} ${
              visibleWords.includes(index) ? 'opacity-100' : ''
            }`}
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
