'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef, useCallback } from 'react';
import styles from './rotate-text.module.css';

export interface RotateTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Static text before rotating words */
  prefix?: string;
  /** Static text after rotating words */
  suffix?: string;
  /** Words to rotate through */
  words: string[];
  /** Rotation direction/animation */
  animation?: 'up' | 'down' | 'left' | 'right' | 'flip' | 'fade' | 'zoom' | 'blur';
  /** Duration each word is shown (ms) */
  duration?: number;
  /** Animation speed */
  speed?: 'fast' | 'normal' | 'slow';
  /** Highlight active word */
  highlight?: boolean;
  /** Highlight color */
  highlightColor?: string;
  /** Show underline on active */
  underline?: boolean;
  /** Show brackets around rotator */
  bracket?: boolean;
  /** Bracket color */
  bracketColor?: string;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Show typing cursor */
  cursor?: boolean;
  /** Callback when word changes */
  onChange?: (word: string, index: number) => void;
}

export const RotateText = forwardRef<HTMLSpanElement, RotateTextProps>(
  (
    {
      prefix,
      suffix,
      words,
      animation = 'up',
      duration = 2000,
      speed = 'normal',
      highlight = false,
      highlightColor = '#ff0040',
      underline = false,
      bracket = false,
      bracketColor = '#666',
      pauseOnHover = false,
      cursor = false,
      onChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitIndex, setExitIndex] = useState<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout>();
    const isPaused = useRef(false);

    const maxWidth = Math.max(...words.map(w => w.length));

    const rotate = useCallback(() => {
      if (isPaused.current) return;
      
      setExitIndex(currentIndex);
      const nextIndex = (currentIndex + 1) % words.length;
      setCurrentIndex(nextIndex);
      onChange?.(words[nextIndex], nextIndex);
      
      setTimeout(() => setExitIndex(null), 500);
    }, [currentIndex, words, onChange]);

    useEffect(() => {
      intervalRef.current = setInterval(rotate, duration);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [rotate, duration]);

    const handleMouseEnter = () => {
      if (pauseOnHover) isPaused.current = true;
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) isPaused.current = false;
    };

    const containerClasses = [
      styles.container,
      styles[animation],
      styles[speed],
      highlight && styles.highlight,
      underline && styles.underline,
      bracket && styles.bracket,
      pauseOnHover && styles.pauseOnHover,
      cursor && styles.cursor,
      className
    ].filter(Boolean).join(' ');

    return (
      <span
        ref={ref}
        className={containerClasses}
        style={{
          '--highlight-color': highlightColor,
          '--bracket-color': bracketColor,
          ...style
        } as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {prefix && <span className={styles.static}>{prefix} </span>}
        <span 
          className={styles.rotator}
          style={{ width: `${maxWidth}ch` }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={`${styles.word} ${i === currentIndex ? styles.active : ''} ${i === exitIndex ? styles.exit : ''}`}
            >
              {word}
            </span>
          ))}
        </span>
        {suffix && <span className={styles.static}> {suffix}</span>}
      </span>
    );
  }
);

RotateText.displayName = 'RotateText';
export default RotateText;
