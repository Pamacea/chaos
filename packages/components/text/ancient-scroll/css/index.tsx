'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './ancient-scroll.module.css';

export interface AncientScrollProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to display on the scroll */
  children: string;
  /** Level of paper decay: pristine, aged, weathered, crumbling */
  decay?: 'pristine' | 'aged' | 'weathered' | 'crumbling';
  /** Ink color style: black, brown, red, gold */
  inkColor?: 'black' | 'brown' | 'red' | 'gold';
  /** Enable flowing ink animation */
  flowingInk?: boolean;
  /** Show aged paper texture */
  showTexture?: boolean;
}

export const AncientScroll = forwardRef<HTMLDivElement, AncientScrollProps>(
  (
    {
      children,
      decay = 'aged',
      inkColor = 'brown',
      flowingInk = true,
      showTexture = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const inkColorMap = {
      black: '#1a1a1a',
      brown: '#4a3728',
      red: '#8b2942',
      gold: '#c9a227',
    };

    const selectedInkColor = inkColorMap[inkColor];

    return (
      <div
        ref={ref}
        className={`${styles.scroll} ${styles[decay]} ${showTexture ? styles.texture : ''} ${className || ''}`}
        style={style}
        {...props}
      >
        <div
          className={`${styles.paper} ${flowingInk ? styles.flowingInk : ''}`}
          style={{ '--ink-color': selectedInkColor } as React.CSSProperties}
        >
          <div className={styles.agedEdge} />
          <div className={styles.content}>
            {children.split('\n').map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={styles.char}
                    style={{
                      animationDelay: `${(index * 100 + charIndex * 20)}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </p>
            ))}
          </div>
          <div className={styles.waxSeal} />
        </div>
      </div>
    );
  }
);

AncientScroll.displayName = 'AncientScroll';

export default AncientScroll;
