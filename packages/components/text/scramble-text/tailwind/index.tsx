'use client';

import { forwardRef, useEffect, useState, HTMLAttributes } from 'react';

export interface ScrambleTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Target text to reveal */
  children: string;
  /** Characters to use for scrambling */
  chars?: string;
  /** Animation duration in ms */
  duration?: number;
  /** Delay before starting */
  delay?: number;
  /** Scramble speed (iterations per frame) */
  speed?: number;
  /** Trigger animation on mount or manually */
  trigger?: 'mount' | 'hover' | 'click' | 'manual';
  /** Whether to trigger animation */
  triggerActive?: boolean;
  /** Scramble effect style */
  style?: 'random' | 'sequential' | 'burst' | 'wave';
}

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const ScrambleText = forwardRef<HTMLSpanElement, ScrambleTextProps>(
  (
    {
      children,
      chars = DEFAULT_CHARS,
      duration = 1000,
      delay = 0,
      speed = 2,
      trigger = 'mount',
      triggerActive = true,
      style: effectStyle = 'sequential',
      className = '',
      ...props
    },
    ref
  ) => {
    const [displayText, setDisplayText] = useState(children);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = () => {
      setIsScrambling(true);
      const startTime = Date.now();
      const targetText = children;
      const length = targetText.length;

      const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        let newText = '';

        for (let i = 0; i < length; i++) {
          if (progress >= 1) {
            newText += targetText[i];
            continue;
          }

          // Calculate character-specific progress based on style
          let charProgress = progress;

          if (effectStyle === 'sequential') {
            charProgress = progress * length - i;
          } else if (effectStyle === 'wave') {
            charProgress = progress + Math.sin(i * 0.5 + elapsed * 0.005) * 0.2;
          } else if (effectStyle === 'burst') {
            const center = length / 2;
            const distance = Math.abs(i - center);
            charProgress = progress * (length / distance) - 0.2;
          }

          charProgress = Math.max(0, Math.min(1, charProgress));

          if (charProgress >= 1) {
            newText += targetText[i];
          } else {
            newText += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        setDisplayText(newText);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setIsScrambling(false);
          setDisplayText(targetText);
        }
      };

      requestAnimationFrame(update);
    };

    useEffect(() => {
      if (trigger === 'mount' && triggerActive) {
        const timer = setTimeout(scramble, delay);
        return () => clearTimeout(timer);
      }
    }, [children, trigger, triggerActive, delay, effectStyle, duration, chars]);

    const handleInteraction = () => {
      if (trigger === 'hover' || trigger === 'click') {
        scramble();
      }
    };

    return (
      <span
        ref={ref}
        className={`inline-block cursor-default font-mono tracking-wider ${
          trigger === 'hover' ? 'hover:cursor-pointer' : ''
        } ${isScrambling ? 'cursor-wait' : ''} ${className}`}
        onMouseEnter={trigger === 'hover' ? handleInteraction : undefined}
        onClick={trigger === 'click' ? handleInteraction : undefined}
        {...props}
      >
        {displayText}
      </span>
    );
  }
);

ScrambleText.displayName = 'ScrambleText';

export default ScrambleText;
