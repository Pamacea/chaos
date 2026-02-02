'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './chromatic-aberration.module.css';

export interface ChromaticAberrationProps extends HTMLAttributes<HTMLDivElement> {
  /** Aberration intensity */
  intensity?: 'subtle' | 'medium' | 'intense' | 'extreme';
  /** Red channel offset in pixels */
  redOffset?: number;
  /** Green channel offset in pixels */
  greenOffset?: number;
  /** Blue channel offset in pixels */
  blueOffset?: number;
  /** Enable on hover only */
  hoverOnly?: boolean;
  /** Animate the effect */
  animated?: boolean;
  /** Animation speed */
  animationSpeed?: number;
}

export const ChromaticAberration = forwardRef<HTMLDivElement, ChromaticAberrationProps>(
  (
    {
      intensity = 'medium',
      redOffset,
      greenOffset,
      blueOffset,
      hoverOnly = false,
      animated = false,
      animationSpeed = 1,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const offsets = {
      subtle: { red: 1, green: 0, blue: -1 },
      medium: { red: 3, green: 0, blue: -3 },
      intense: { red: 6, green: 0, blue: -6 },
      extreme: { red: 10, green: 0, blue: -10 },
    }[intensity];

    const finalRedOffset = redOffset ?? offsets.red;
    const finalGreenOffset = greenOffset ?? offsets.green;
    const finalBlueOffset = blueOffset ?? offsets.blue;

    return (
      <div
        ref={ref}
        className={`${styles.chromaticAberration} ${styles[intensity]} ${hoverOnly ? styles.hoverOnly : ''} ${
          animated ? styles.animated : ''
        } ${className || ''}`}
        style={
          {
            '--red-offset': `${finalRedOffset}px`,
            '--green-offset': `${finalGreenOffset}px`,
            '--blue-offset': `${finalBlueOffset}px`,
            '--animation-speed': `${animationSpeed}s`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={styles.channel} style={{ '--offset': 'var(--red-offset)', '--color': 'red' }}>
          {children}
        </div>
        <div className={styles.channel} style={{ '--offset': 'var(--green-offset)', '--color': 'green' }}>
          {children}
        </div>
        <div className={styles.channel} style={{ '--offset': 'var(--blue-offset)', '--color': 'blue' }}>
          {children}
        </div>
      </div>
    );
  }
);

ChromaticAberration.displayName = 'ChromaticAberration';

export default ChromaticAberration;
