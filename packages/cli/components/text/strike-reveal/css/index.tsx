'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef } from 'react';
import styles from './strike-reveal.module.css';

export interface StrikeRevealProps extends HTMLAttributes<HTMLSpanElement> {
  /** Original text to strike through */
  children: string;
  /** Text to reveal after strike */
  revealText?: string;
  /** Visual variant */
  variant?: 'permanent' | 'crossout' | 'redacted' | 'censored' | 'glitch';
  /** Color variant */
  color?: 'default' | 'blood' | 'cyber' | 'acid' | 'void';
  /** Trigger mode */
  trigger?: 'auto' | 'hover' | 'scroll' | 'click';
  /** Delay before animation (ms) */
  delay?: number;
  /** Double strike line */
  double?: boolean;
  /** Custom strike color */
  strikeColor?: string;
  /** Callback when reveal completes */
  onReveal?: () => void;
}

export const StrikeReveal = forwardRef<HTMLSpanElement, StrikeRevealProps>(
  (
    {
      children,
      revealText,
      variant = 'permanent',
      color = 'default',
      trigger = 'auto',
      delay = 0,
      double = false,
      strikeColor,
      onReveal,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (trigger === 'auto') {
        const timeout = setTimeout(() => {
          setIsActive(true);
          setTimeout(() => onReveal?.(), 700);
        }, delay);
        return () => clearTimeout(timeout);
      }

      if (trigger === 'scroll') {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setIsActive(true);
                setTimeout(() => onReveal?.(), 700);
              }, delay);
            }
          },
          { threshold: 0.5 }
        );

        if (containerRef.current) {
          observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
      }
    }, [trigger, delay, onReveal]);

    const handleClick = () => {
      if (trigger === 'click') {
        setIsActive(true);
        setTimeout(() => onReveal?.(), 700);
      }
    };

    const containerClasses = [
      styles.container,
      styles[variant],
      color !== 'default' && styles[color],
      double && styles.double,
      trigger === 'hover' && styles.hover,
      isActive && styles.active,
      className
    ].filter(Boolean).join(' ');

    return (
      <span
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={containerClasses}
        style={{ 
          '--strike-color': strikeColor,
          '--delay': `${delay}ms`,
          ...style 
        } as React.CSSProperties}
        onClick={handleClick}
        {...props}
      >
        <span className={styles.text}>
          {children}
          <span className={styles.strike} />
        </span>
        {revealText && (
          <span className={styles.revealed}>{revealText}</span>
        )}
      </span>
    );
  }
);

StrikeReveal.displayName = 'StrikeReveal';
export default StrikeReveal;
