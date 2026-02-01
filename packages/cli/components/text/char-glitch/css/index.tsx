'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useCallback, useRef } from 'react';
import styles from './char-glitch.module.css';

export interface CharGlitchProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text to display */
  children: string;
  /** Glitch intensity */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Visual variant */
  variant?: 'blood' | 'cyber' | 'matrix' | 'corrupt';
  /** Trigger mode */
  mode?: 'random' | 'hover' | 'continuous' | 'wave';
  /** Interval between random glitches in ms */
  interval?: number;
  /** Characters to use for scramble effect */
  glitchChars?: string;
  /** Enable scramble reveal effect */
  scramble?: boolean;
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const CharGlitch = forwardRef<HTMLSpanElement, CharGlitchProps>(
  (
    {
      children,
      intensity = 'medium',
      variant = 'blood',
      mode = 'random',
      interval = 100,
      glitchChars = GLITCH_CHARS,
      scramble = false,
      className,
      ...props
    },
    ref
  ) => {
    const [glitchingIndices, setGlitchingIndices] = useState<Set<number>>(new Set());
    const [scrambledChars, setScrambledChars] = useState<string[]>([]);
    const [revealed, setRevealed] = useState<boolean[]>([]);
    const intervalRef = useRef<NodeJS.Timeout>();

    const triggerGlitch = useCallback((index: number) => {
      setGlitchingIndices(prev => new Set(prev).add(index));
      setTimeout(() => {
        setGlitchingIndices(prev => {
          const next = new Set(prev);
          next.delete(index);
          return next;
        });
      }, intensity === 'subtle' ? 300 : intensity === 'intense' ? 80 : 150);
    }, [intensity]);

    useEffect(() => {
      if (scramble) {
        setScrambledChars(children.split('').map(() => 
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ));
        setRevealed(new Array(children.length).fill(false));
        
        let index = 0;
        const revealInterval = setInterval(() => {
          if (index < children.length) {
            setRevealed(prev => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
            index++;
          } else {
            clearInterval(revealInterval);
          }
        }, 50);
        
        return () => clearInterval(revealInterval);
      }
    }, [children, scramble, glitchChars]);

    useEffect(() => {
      if (mode === 'random' && !scramble) {
        intervalRef.current = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * children.length);
          triggerGlitch(randomIndex);
        }, interval);

        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }

      if (mode === 'continuous' && !scramble) {
        children.split('').forEach((_, i) => {
          setTimeout(() => triggerGlitch(i), i * 50);
        });
        
        intervalRef.current = setInterval(() => {
          children.split('').forEach((_, i) => {
            setTimeout(() => triggerGlitch(i), i * 50);
          });
        }, interval * children.length);

        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }

      if (mode === 'wave' && !scramble) {
        let waveIndex = 0;
        intervalRef.current = setInterval(() => {
          triggerGlitch(waveIndex % children.length);
          waveIndex++;
        }, interval);

        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
    }, [mode, interval, children, triggerGlitch, scramble]);

    const containerClasses = [
      styles.container,
      styles[intensity],
      styles[variant],
      mode === 'hover' && styles.hover,
      scramble && styles.scramble,
      className
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={containerClasses} {...props}>
        {children.split('').map((char, i) => {
          const isGlitching = glitchingIndices.has(i);
          const displayChar = scramble && !revealed[i] ? scrambledChars[i] : char;
          
          return (
            <span
              key={i}
              className={`${styles.char} ${isGlitching ? styles.glitching : ''} ${scramble && !revealed[i] ? styles.scrambling : ''}`}
              data-char={displayChar}
            >
              {displayChar}
            </span>
          );
        })}
      </span>
    );
  }
);

CharGlitch.displayName = 'CharGlitch';
export default CharGlitch;
