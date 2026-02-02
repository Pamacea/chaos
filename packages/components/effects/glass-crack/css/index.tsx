'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './glass-crack.module.css';

export interface GlassCrackProps extends HTMLAttributes<HTMLDivElement> {
  /** Crack intensity */
  intensity?: 'light' | 'medium' | 'heavy';
  /** Crack pattern */
  pattern?: 'spiderweb' | 'lightning' | 'shattered' | 'random';
  /** Crack color */
  color?: string;
  /** Show glow effect */
  glow?: boolean;
  /** Number of crack lines */
  crackCount?: number;
}

export const GlassCrack = forwardRef<HTMLDivElement, GlassCrackProps>(
  (
    {
      intensity = 'medium',
      pattern = 'spiderweb',
      color = 'rgba(255, 255, 255, 0.5)',
      glow = false,
      crackCount = 12,
      className,
      ...props
    },
    ref
  ) => {
    // Generate crack lines
    const cracks = Array.from({ length: crackCount }, (_, i) => ({
      id: i,
      angle: (360 / crackCount) * i + Math.random() * 20 - 10,
      length: 30 + Math.random() * 50,
      curve: Math.random() * 20 - 10,
      branches: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
    }));

    return (
      <div
        ref={ref}
        className={`${styles.glassCrack} ${styles[intensity]} ${styles[pattern]} ${glow ? styles.glow : ''} ${className || ''}`}
        style={{ '--crack-color': color } as React.CSSProperties}
        {...props}
      >
        {cracks.map((crack) => (
          <svg
            key={crack.id}
            className={styles.crack}
            viewBox="0 0 100 100"
            style={
              {
                '--angle': `${crack.angle}deg`,
                '--length': `${crack.length}px`,
                '--curve': `${crack.curve}px`,
              } as React.CSSProperties
            }
          >
            <path
              d={`M 50 50 Q ${50 + crack.curve} 25 50 ${0}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={intensity === 'heavy' ? 2 : 1}
              className={styles.crackPath}
            />
            {crack.branches > 0 && (
              <>
                {Array.from({ length: crack.branches }).map((_, bi) => (
                  <path
                    key={bi}
                    d={`M ${50} ${50 - bi * 5} Q ${50 + crack.curve + 10} ${50 - bi * 5 - 15} ${50 + 20} ${50 - bi * 5 - 25}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={0.5}
                    className={styles.branch}
                    style={{ '--delay': `${bi * 0.1}s` } as React.CSSProperties }
                  />
                ))}
              </>
            )}
          </svg>
        ))}
      </div>
    );
  }
);

GlassCrack.displayName = 'GlassCrack';

export default GlassCrack;
