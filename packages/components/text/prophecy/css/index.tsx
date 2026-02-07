'use client';

import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import styles from './prophecy.module.css';

export interface ProphecyProps extends HTMLAttributes<HTMLDivElement> {
  /** The prophecy text to reveal */
  children: string;
  /** Speed of character reveal: slow, medium, fast, instant */
  revealSpeed?: 'slow' | 'medium' | 'fast' | 'instant';
  /** Use ancient/deteriorated font style */
  ancientFont?: boolean;
  /** Delay before revelation starts (ms) */
  startDelay?: number;
  /** Loop the revelation animation */
  loop?: boolean;
  /** Callback when revelation completes */
  onComplete?: () => void;
}

export const Prophecy = forwardRef<HTMLDivElement, ProphecyProps>(
  (
    {
      children,
      revealSpeed = 'medium',
      ancientFont = true,
      startDelay = 500,
      loop = false,
      onComplete,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [revealedChars, setRevealedChars] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
        setRevealedChars(0);

      const speedMap = {
        slow: 150,
        medium: 80,
        fast: 40,
        instant: 10,
      };

      const interval = setInterval(() => {
        setRevealedChars((prev) => {
          const next = prev + 1;
          if (next >= children.length) {
            clearInterval(interval);
            onComplete?.();

            if (loop) {
              setTimeout(() => {
                setRevealedChars(0);
              }, 2000);
            }

            return next;
          }
          return next;
        });
      }, speedMap[revealSpeed]);

      intervalRef.current = interval;
    }, startDelay);

    timeoutRef.current = startTimeout;
    }

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [hasStarted, children.length, revealSpeed, startDelay, loop, onComplete]);

  const chars = children.split('');

  return (
    <div
      ref={(node) => {
        if (typeof ref === 'function') ref(node);
        containerRef.current = node;
      }}
      className={`${styles.prophecy} ${ancientFont ? styles.ancientFont : ''} ${className || ''}`}
      style={style}
      {...props}
    >
      <span className={styles.hiddenText} aria-hidden="true">
        {children}
      </span>
      <span className={styles.visibleText}>
        {chars.map((char, index) => (
          <span
            key={index}
            className={`${styles.char} ${index < revealedChars ? styles.revealed : styles.hidden}`}
            style={{
              animationDelay: hasStarted ? `${index * (revealSpeed === 'slow' ? 0.15 : revealSpeed === 'medium' ? 0.08 : 0.04)}s` : undefined,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </div>
  );
});

Prophecy.displayName = 'Prophecy';

export default Prophecy;
