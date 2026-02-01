'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useCallback, useRef } from 'react';

export interface CharGlitchProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  intensity?: 'subtle' | 'medium' | 'intense';
  variant?: 'blood' | 'cyber' | 'matrix' | 'corrupt';
  mode?: 'random' | 'hover' | 'continuous' | 'wave';
  interval?: number;
  glitchChars?: string;
  scramble?: boolean;
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const variantColors = {
  blood: { primary: 'text-rose-500', shadow: 'drop-shadow-[0_0_2px_#ff0040]' },
  cyber: { primary: 'text-cyan-400', shadow: 'drop-shadow-[0_0_2px_#00ffff]' },
  matrix: { primary: 'text-green-400', shadow: 'drop-shadow-[0_0_2px_#00ff00]' },
  corrupt: { primary: 'text-white', shadow: 'drop-shadow-[0_0_2px_#ffffff]' },
};

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
      className = '',
      ...props
    },
    ref
  ) => {
    const [glitchingIndices, setGlitchingIndices] = useState<Set<number>>(new Set());
    const [scrambledChars, setScrambledChars] = useState<string[]>([]);
    const [revealed, setRevealed] = useState<boolean[]>([]);
    const intervalRef = useRef<NodeJS.Timeout>();

    const durations = { subtle: 300, medium: 150, intense: 80 };

    const triggerGlitch = useCallback((index: number) => {
      setGlitchingIndices(prev => new Set(prev).add(index));
      setTimeout(() => {
        setGlitchingIndices(prev => {
          const next = new Set(prev);
          next.delete(index);
          return next;
        });
      }, durations[intensity]);
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
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
      }

      if (mode === 'wave' && !scramble) {
        let waveIndex = 0;
        intervalRef.current = setInterval(() => {
          triggerGlitch(waveIndex % children.length);
          waveIndex++;
        }, interval);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
      }
    }, [mode, interval, children, triggerGlitch, scramble]);

    return (
      <span ref={ref} className={`inline-block ${className}`} {...props}>
        {children.split('').map((char, i) => {
          const isGlitching = glitchingIndices.has(i);
          const displayChar = scramble && !revealed[i] ? scrambledChars[i] : char;
          const { primary, shadow } = variantColors[variant];
          
          return (
            <span
              key={i}
              className={`inline-block relative transition-transform duration-100 ${
                isGlitching ? `${primary} ${shadow} animate-pulse scale-110` : ''
              } ${mode === 'hover' ? 'hover:animate-pulse hover:scale-110' : ''}`}
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
