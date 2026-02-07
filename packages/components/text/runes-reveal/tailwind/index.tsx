'use client';

import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';

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

const RUNE_STYLE_MAP = {
  nordic: {
    container: 'font-serif text-slate-400',
    illuminated: 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]',
    translation: 'font-serif text-slate-200',
  },
  elven: {
    container: 'font-serif italic text-emerald-200',
    illuminated: 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]',
    translation: 'font-serif italic text-emerald-100',
  },
  draconic: {
    container: 'font-black text-red-300',
    illuminated: 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.9)]',
    translation: 'font-serif uppercase tracking-wider text-red-100',
  },
};

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
    const intervalRef = useRef<NodeJS.Timeout>();
    const timeoutRef = useRef<NodeJS.Timeout>();

    const styleClasses = RUNE_STYLE_MAP[runeStyle];

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
      className={cn('relative inline-block cursor-pointer select-none', className)}
      style={style}
      onClick={triggerReveal}
      {...props}
    >
      <div className={cn('flex flex-wrap gap-1 mb-2', styleClasses.container)}>
        {runes.map((rune, index) => (
          <span
            key={index}
            className={cn(
              'inline-flex items-center justify-center w-8 h-8 text-xl transition-all duration-300',
              index <= revealedIndex
                ? cn('opacity-100 scale-100', styleClasses.illuminated)
                : 'opacity-30 grayscale'
            )}
          >
            {rune}
          </span>
        ))}
      </div>
      <p
        className={cn(
          'text-sm tracking-wide min-h-6 transition-all duration-500',
          styleClasses.translation,
          showTranslation
            ? 'opacity-100 translate-y-0 blur-0'
            : 'opacity-0 -translate-y-2 blur-sm'
        )}
      >
        {translation}
      </p>
    </div>
  );
});

RunesReveal.displayName = 'RunesReveal';

export default RunesReveal;
