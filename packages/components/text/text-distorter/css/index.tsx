'use client';

import { forwardRef, useEffect, useState, useRef, HTMLAttributes } from 'react';
import styles from './text-distorter.module.css';

export type DistortionMode = 'glitch' | 'wave' | 'scramble' | 'noise' | 'split' | 'blink' | 'drip';
export type IntensityLevel = 'mild' | 'medium' | 'intense';
export type TriggerType = 'none' | 'hover' | 'click' | 'mount' | 'continuous';

export interface TextDistorterProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text to distort */
  children: string;
  /** Distortion mode */
  mode?: DistortionMode;
  /** Intensity level */
  intensity?: IntensityLevel;
  /** When to trigger distortion */
  trigger?: TriggerType;
  /** Custom color for glitch effect */
  glitchColor1?: string;
  /** Secondary glitch color */
  glitchColor2?: string;
  /** Color variant */
  variant?: 'default' | 'neon' | 'fire' | 'matrix' | 'corruption';
  /** Size variant */
  size?: 'default' | 'small' | 'large' | 'xl';
  /** Scramble characters */
  scrambleChars?: string;
  /** Distortion speed (ms) */
  speed?: number;
  /** Wave delay between characters (ms) */
  waveDelay?: number;
}

const DEFAULT_SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const TextDistorter = forwardRef<HTMLSpanElement, TextDistorterProps>(
  (
    {
      children,
      mode = 'glitch',
      intensity = 'medium',
      trigger = 'continuous',
      glitchColor1 = '#ff00ff',
      glitchColor2 = '#00ffff',
      variant = 'default',
      size = 'default',
      scrambleChars = DEFAULT_SCRAMBLE_CHARS,
      speed = 50,
      waveDelay = 50,
      className,
      ...props
    },
    ref
  ) => {
    const [displayText, setDisplayText] = useState(children);
    const [isDistorting, setIsDistorting] = useState(trigger === 'continuous' || trigger === 'mount');
    const scrambleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Apply scramble effect
    const scrambleText = (targetText: string, duration: number) => {
      const startTime = Date.now();
      const length = targetText.length;

      const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        let newText = '';
        for (let i = 0; i < length; i++) {
          const charProgress = Math.max(0, progress * length - i * 0.5);
          if (charProgress >= 1 || Math.random() > charProgress) {
            newText += targetText[i];
          } else {
            newText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }

        setDisplayText(newText);

        if (progress < 1) {
          scrambleTimeoutRef.current = setTimeout(update, speed);
        } else {
          setDisplayText(targetText);
        }
      };

      update();
    };

    // Handle mount trigger
    useEffect(() => {
      if (trigger === 'mount') {
        if (mode === 'scramble') {
          scrambleText(children, 1000);
        }
        const timer = setTimeout(() => setIsDistorting(false), 2000);
        return () => clearTimeout(timer);
      }
    }, [children, trigger, mode]);

    // Handle continuous trigger
    useEffect(() => {
      if (trigger === 'continuous' && mode === 'scramble') {
        const interval = setInterval(() => {
          scrambleText(children, 500);
        }, 3000);
        return () => clearInterval(interval);
      }
    }, [children, trigger, mode]);

    // Handle interaction
    const handleInteraction = () => {
      if (trigger === 'hover' || trigger === 'click') {
        if (mode === 'scramble') {
          scrambleText(children, 800);
        }
        setIsDistorting(true);
        setTimeout(() => setIsDistorting(false), 1000);
      }
    };

    // Split text into characters for wave/split modes
    const renderChars = () => {
      return displayText.split('').map((char, index) => {
        const delay = mode === 'wave' ? index * waveDelay : 0;
        return (
          <span
            key={index}
            className={styles.char}
            style={{
              animationDelay: `${delay}ms`,
            } as React.CSSProperties}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      });
    };

    const shouldUseChars = mode === 'wave' || mode === 'split' || mode === 'blink';

    return (
      <span
        ref={ref}
        className={`${styles.distorter} ${styles[mode]} ${styles[intensity]} ${styles[variant]} ${styles[size]} ${
          trigger === 'hover' ? styles['trigger-hover'] : ''
        } ${isDistorting ? styles.scrambling : ''} ${className || ''}`}
        data-text={children}
        style={
          {
            '--glitch-color-1': glitchColor1,
            '--glitch-color-2': glitchColor2,
          } as React.CSSProperties
        }
        onMouseEnter={trigger === 'hover' ? handleInteraction : undefined}
        onClick={trigger === 'click' ? handleInteraction : undefined}
        {...props}
      >
        {shouldUseChars ? renderChars() : displayText}
      </span>
    );
  }
);

TextDistorter.displayName = 'TextDistorter';

export default TextDistorter;
