'use client';

import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import styles from './runes-reveal.module.css';

export interface RunesRevealProps extends HTMLAttributes<HTMLDivElement> {
  /** The runes to display (ancient symbols) */
  runes: string[];
  /** The translation text to reveal */
  translation: string;
  /** Reveal animation speed: slow, medium, fast */
  revealSpeed?: 'slow' | 'medium' | 'fast';
  /** Rune style: nordic, elven, draconic */
  runeStyle?: 'nordic' | 'elven' | 'draconic';
  /** Auto-start animation on mount */
  autoStart?: boolean;
  /** Delay before start (ms) */
  startDelay?: number;
  /** Callback when translation completes */
  onComplete?: () => void;
}

const DEFAULT_RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

export const RunesReveal = forwardRef<HTMLDivElement, RunesRevealProps>(
  (
    {
      runes,
      translation,
      revealSpeed = 'medium',
      runeStyle = 'nordic',
      autoStart = true,
      startDelay = 1000,
      onComplete,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [isRevealing, setIsRevealing] = useState(false);
    const [revealedIndex, setRevealedIndex] = useState(-1);
    const [showTranslation, setShowTranslation] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (autoStart && !isRevealing) {
      const startTimeout = setTimeout(() => {
        setIsRevealing(true);
        setRevealedIndex(-1);

        const speedMap = {
          slow: 300,
          medium: 150,
          fast: 80,
        };

        const interval = setInterval(() => {
          setRevealedIndex((prev) => {
            const next = prev + 1;
            if (next >= runes.length) {
              clearInterval(interval);
              setShowTranslation(true);
              onComplete?.();
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
  }, [autoStart, runes.length, revealSpeed, startDelay, onComplete, isRevealing]);

  const triggerReveal = () => {
    if (!isRevealing) {
      setIsRevealing(true);
      setRevealedIndex(-1);

      const speedMap = {
        slow: 300,
        medium: 150,
        fast: 80,
      };

      const interval = setInterval(() => {
        setRevealedIndex((prev) => {
          const next = prev + 1;
          if (next >= runes.length) {
            clearInterval(interval);
            setShowTranslation(true);
            onComplete?.();
            return next;
          }
          return next;
        });
      }, speedMap[revealSpeed]);

      intervalRef.current = interval;
    }
  };

  return (
    <div
      ref={ref}
      className={`${styles.runesReveal} ${styles[runeStyle]} ${isRevealing ? styles.revealing : ''} ${showTranslation ? styles.translated : ''} ${className || ''}`}
      style={style}
      onClick={triggerReveal}
      {...props}
    >
      <div className={styles.runesContainer}>
        {runes.map((rune, index) => (
          <span
            key={index}
            className={`${styles.rune} ${index <= revealedIndex ? styles.illuminated : styles.dim} ${showTranslation ? styles.faded : ''}`}
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {rune}
          </span>
        ))}
      </div>
      <div className={`${styles.translation} ${showTranslation ? styles.visible : styles.hidden}`}>
        {translation}
      </div>
    </div>
  );
});

RunesReveal.displayName = 'RunesReveal';

export default RunesReveal;
