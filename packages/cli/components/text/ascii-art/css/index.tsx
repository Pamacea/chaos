'use client';

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import styles from './ascii-art.module.css';

export interface AsciiArtProps extends HTMLAttributes<HTMLPreElement> {
  /** ASCII art content (multi-line string) */
  children: string;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  variant?: 'default' | 'blood' | 'cyber' | 'matrix' | 'amber' | 'ghost' | 'gradient';
  /** Animation effect */
  animation?: 'none' | 'typing' | 'reveal' | 'glitch' | 'flicker' | 'pulse';
  /** Show scanlines overlay */
  scanlines?: boolean;
  /** Show border */
  bordered?: boolean;
  /** Border title */
  title?: string;
  /** Delay between lines for reveal animation (ms) */
  revealDelay?: number;
  /** Custom color */
  color?: string;
}

export const AsciiArt = forwardRef<HTMLPreElement, AsciiArtProps>(
  (
    {
      children,
      size = 'md',
      variant = 'default',
      animation = 'none',
      scanlines = false,
      bordered = false,
      title,
      revealDelay = 100,
      color,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [revealedLines, setRevealedLines] = useState<number>(0);
    const lines = children.split('\n');

    useEffect(() => {
      if (animation === 'reveal') {
        setRevealedLines(0);
        let lineIndex = 0;
        
        const interval = setInterval(() => {
          if (lineIndex < lines.length) {
            setRevealedLines(lineIndex + 1);
            lineIndex++;
          } else {
            clearInterval(interval);
          }
        }, revealDelay);

        return () => clearInterval(interval);
      }
    }, [animation, lines.length, revealDelay, children]);

    const containerClasses = [
      styles.container,
      styles[size],
      variant !== 'default' && styles[variant],
      animation !== 'none' && styles[animation],
      scanlines && styles.scanlines,
      bordered && styles.bordered,
      className
    ].filter(Boolean).join(' ');

    const renderContent = () => {
      if (animation === 'reveal') {
        return lines.map((line, i) => (
          <span
            key={i}
            className={styles.line}
            style={{
              opacity: i < revealedLines ? 1 : 0,
              animationDelay: `${i * revealDelay}ms`,
              transform: i < revealedLines ? 'translateX(0)' : 'translateX(-10px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {line}
            {'\n'}
          </span>
        ));
      }
      return children;
    };

    return (
      <pre
        ref={ref}
        className={containerClasses}
        style={{ 
          color: color,
          ...style 
        }}
        data-text={animation === 'glitch' ? children : undefined}
        data-title={bordered ? title : undefined}
        {...props}
      >
        {renderContent()}
      </pre>
    );
  }
);

AsciiArt.displayName = 'AsciiArt';
export default AsciiArt;
