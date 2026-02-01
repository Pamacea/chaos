'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import styles from './blood-drip.module.css';

export interface BloodDripProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text to display */
  children: string;
  /** Drip color variant */
  variant?: 'blood' | 'acid' | 'cyber' | 'void' | 'chrome';
  /** Drip intensity */
  intensity?: 'light' | 'medium' | 'heavy';
  /** Number of drips per character (1-3) */
  dripsPerChar?: 1 | 2 | 3;
  /** Base drip duration in seconds */
  duration?: number;
  /** Add text glow effect */
  glowing?: boolean;
  /** Add melting animation */
  melting?: boolean;
  /** Show pool at bottom */
  showPool?: boolean;
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Static drips (no animation) */
  static?: boolean;
  /** Custom drip color */
  dripColor?: string;
  /** Probability of drip per character (0-1) */
  dripProbability?: number;
}

export const BloodDrip = forwardRef<HTMLSpanElement, BloodDripProps>(
  (
    {
      children,
      variant = 'blood',
      intensity = 'medium',
      dripsPerChar = 1,
      duration = 2,
      glowing = false,
      melting = false,
      showPool = false,
      pauseOnHover = false,
      static: isStatic = false,
      dripColor,
      dripProbability = 0.7,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const chars = children.split('');
    
    const dripMap = useMemo(() => {
      return chars.map(() => Math.random() < dripProbability);
    }, [chars.length, dripProbability]);

    const containerClasses = [
      styles.container,
      styles[variant],
      styles[intensity],
      glowing && styles.glowing,
      melting && styles.melting,
      pauseOnHover && styles.pauseOnHover,
      isStatic && styles.static,
      className
    ].filter(Boolean).join(' ');

    return (
      <span
        ref={ref}
        className={containerClasses}
        style={{ 
          '--drip-color': dripColor,
          ...style 
        } as React.CSSProperties}
        {...props}
      >
        {chars.map((char, i) => {
          const hasDrip = dripMap[i] && char !== ' ';
          const delay = Math.random() * 2;
          
          return (
            <span
              key={i}
              className={styles.char}
              style={{ 
                '--char-delay': `${i * 0.1}s`,
                '--drip-delay': `${delay}s`,
                '--drip-duration': `${duration}s`
              } as React.CSSProperties}
            >
              {char === ' ' ? '\u00A0' : char}
              {hasDrip && (
                <>
                  <span className={styles.drip} />
                  {dripsPerChar >= 2 && <span className={`${styles.drip} ${styles.secondary}`} />}
                  {dripsPerChar >= 3 && <span className={`${styles.drip} ${styles.tertiary}`} />}
                </>
              )}
            </span>
          );
        })}
        {showPool && <span className={styles.pool} />}
      </span>
    );
  }
);

BloodDrip.displayName = 'BloodDrip';
export default BloodDrip;
