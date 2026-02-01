'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef, useCallback } from 'react';

export interface RotateTextProps extends HTMLAttributes<HTMLSpanElement> {
  prefix?: string;
  suffix?: string;
  words: string[];
  animation?: 'up' | 'down' | 'left' | 'right' | 'flip' | 'fade' | 'zoom' | 'blur';
  duration?: number;
  speed?: 'fast' | 'normal' | 'slow';
  highlight?: boolean;
  highlightColor?: string;
  underline?: boolean;
  bracket?: boolean;
  bracketColor?: string;
  pauseOnHover?: boolean;
  cursor?: boolean;
  onChange?: (word: string, index: number) => void;
}

const speedDurations = { fast: 'duration-300', normal: 'duration-500', slow: 'duration-700' };

const getTransform = (animation: string, state: 'hidden' | 'active' | 'exit') => {
  const transforms: Record<string, Record<string, string>> = {
    up: { hidden: 'translate-y-full opacity-0', active: 'translate-y-0 opacity-100', exit: '-translate-y-full opacity-0' },
    down: { hidden: '-translate-y-full opacity-0', active: 'translate-y-0 opacity-100', exit: 'translate-y-full opacity-0' },
    left: { hidden: 'translate-x-full opacity-0', active: 'translate-x-0 opacity-100', exit: '-translate-x-full opacity-0' },
    right: { hidden: '-translate-x-full opacity-0', active: 'translate-x-0 opacity-100', exit: 'translate-x-full opacity-0' },
    fade: { hidden: 'opacity-0', active: 'opacity-100', exit: 'opacity-0' },
    zoom: { hidden: 'scale-0 opacity-0', active: 'scale-100 opacity-100', exit: 'scale-150 opacity-0' },
    blur: { hidden: 'translate-y-1/2 opacity-0 blur-sm', active: 'translate-y-0 opacity-100 blur-0', exit: '-translate-y-1/2 opacity-0 blur-sm' },
    flip: { hidden: 'rotateX-90 opacity-0', active: 'rotateX-0 opacity-100', exit: '-rotateX-90 opacity-0' },
  };
  return transforms[animation]?.[state] || '';
};

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
      className = '',
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
      return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [rotate, duration]);

    const handleMouseEnter = () => { if (pauseOnHover) isPaused.current = true; };
    const handleMouseLeave = () => { if (pauseOnHover) isPaused.current = false; };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-2 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {prefix && <span>{prefix}</span>}
        {bracket && <span style={{ color: bracketColor }}>[</span>}
        <span 
          className="relative inline-block overflow-hidden"
          style={{ width: `${maxWidth}ch`, height: '1.2em' }}
        >
          {words.map((word, i) => {
            const isActive = i === currentIndex;
            const isExit = i === exitIndex;
            const state = isActive ? 'active' : isExit ? 'exit' : 'hidden';
            
            return (
              <span
                key={i}
                className={`absolute top-0 left-0 w-full transition-all ease-out ${speedDurations[speed]} ${getTransform(animation, state)} ${
                  isActive && highlight ? 'drop-shadow-lg' : ''
                } ${isActive && underline ? 'underline underline-offset-4' : ''}`}
                style={isActive && highlight ? { color: highlightColor, textShadow: `0 0 10px ${highlightColor}` } : undefined}
              >
                {word}
              </span>
            );
          })}
        </span>
        {bracket && <span style={{ color: bracketColor }}>]</span>}
        {suffix && <span>{suffix}</span>}
        {cursor && <span className="animate-pulse">|</span>}
      </span>
    );
  }
);

RotateText.displayName = 'RotateText';
export default RotateText;
