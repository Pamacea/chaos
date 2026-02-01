'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef } from 'react';
import styles from './reveal-text.module.css';

export interface RevealTextProps extends HTMLAttributes<HTMLDivElement> {
  /** Text to reveal */
  children: string;
  /** Split mode */
  splitBy?: 'word' | 'char' | 'line';
  /** Reveal direction */
  direction?: 'fromBottom' | 'fromTop' | 'fromLeft' | 'fromRight';
  /** Additional effect */
  effect?: 'none' | 'blur' | 'scale' | 'rotate';
  /** Stagger delay between elements in ms */
  stagger?: number;
  /** Animation speed */
  speed?: 'fast' | 'normal' | 'slow';
  /** Trigger threshold (0-1) */
  threshold?: number;
  /** Only animate once */
  once?: boolean;
  /** Show highlight underline */
  highlight?: boolean;
  /** Highlight color */
  highlightColor?: string;
  /** Trigger immediately without scroll */
  immediate?: boolean;
}

export const RevealText = forwardRef<HTMLDivElement, RevealTextProps>(
  (
    {
      children,
      splitBy = 'word',
      direction = 'fromBottom',
      effect = 'none',
      stagger = 50,
      speed = 'normal',
      threshold = 0.2,
      once = true,
      highlight = false,
      highlightColor = '#ff0040',
      immediate = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    const elements = splitBy === 'line' 
      ? children.split('\n') 
      : splitBy === 'char' 
        ? children.split('') 
        : children.split(' ');

    useEffect(() => {
      if (immediate) {
        elements.forEach((_, i) => {
          setTimeout(() => {
            setVisibleIndices(prev => new Set(prev).add(i));
          }, i * stagger);
        });
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            hasAnimated.current = true;
            elements.forEach((_, i) => {
              setTimeout(() => {
                setVisibleIndices(prev => new Set(prev).add(i));
              }, i * stagger);
            });
          } else if (!entry.isIntersecting && !once) {
            setVisibleIndices(new Set());
          }
        },
        { threshold }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, [elements, stagger, threshold, once, immediate]);

    const containerClasses = [
      styles.container,
      styles[speed],
      className
    ].filter(Boolean).join(' ');

    const renderWord = (word: string, index: number) => {
      const isVisible = visibleIndices.has(index);
      const wordClasses = [
        styles.word,
        styles[direction],
        effect !== 'none' && styles[effect],
        isVisible && styles.visible,
        highlight && styles.highlight
      ].filter(Boolean).join(' ');

      return (
        <span
          key={index}
          className={wordClasses}
          style={{ 
            transitionDelay: `${index * stagger}ms`,
            '--highlight-color': highlightColor
          } as React.CSSProperties}
        >
          <span className={styles.wordInner}>{word}</span>
        </span>
      );
    };

    const renderChar = (char: string, index: number) => {
      const isVisible = visibleIndices.has(index);
      return (
        <span
          key={index}
          className={`${styles.char} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: `${index * stagger}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    };

    const renderLine = (line: string, index: number) => {
      const isVisible = visibleIndices.has(index);
      const lineClasses = [
        styles.line,
        styles[direction],
        isVisible && styles.visible
      ].filter(Boolean).join(' ');

      return (
        <span
          key={index}
          className={lineClasses}
          style={{ transitionDelay: `${index * stagger}ms` }}
        >
          <span className={styles.lineInner}>{line}</span>
        </span>
      );
    };

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={containerClasses}
        style={style}
        {...props}
      >
        {elements.map((el, i) => 
          splitBy === 'line' 
            ? renderLine(el, i)
            : splitBy === 'char' 
              ? renderChar(el, i)
              : renderWord(el, i)
        )}
      </div>
    );
  }
);

RevealText.displayName = 'RevealText';
export default RevealText;
