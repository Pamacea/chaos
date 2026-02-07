'use client';

import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';

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
    const intervalRef = useRef<NodeJS.Timeout>();
    const timeoutRef = useRef<NodeJS.Timeout>();

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
      ref={ref}
      className={cn(
        'relative inline-block font-serif text-amber-200',
        ancientFont && 'tracking-widest',
        className
      )}
      style={style}
      {...props}
    >
      {chars.map((char, index) => (
        <span
          key={index}
          className={cn(
            'inline-block transition-all duration-300',
            index < revealedChars
              ? 'opacity-100 blur-0 translate-y-0 scale-100'
              : 'opacity-0 blur-[2px] translate-y-1 scale-95 text-amber-700'
          )}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
});

Prophecy.displayName = 'Prophecy';

export default Prophecy;
