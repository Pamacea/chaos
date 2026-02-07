'use client';

import { HTMLAttributes } from 'react';
import styles from './light-beams.module.css';

export interface LightBeamsProps extends HTMLAttributes<HTMLDivElement> {
  /** Beam color */
  color?: string;
  /** Animation intensity */
  intensity?: 'subtle' | 'moderate' | 'intense';
  /** Blur amount */
  blur?: 'sharp' | 'medium' | 'blurred';
  /** Animation duration in seconds */
  duration?: number;
  /** Which beams to show */
  position?: 'edges' | 'corners' | 'all';
  /** Custom class for beams container */
  beamsClassName?: string;
}

export function LightBeams({
  color = 'rgba(255, 255, 255, 0.8)',
  intensity = 'moderate',
  blur = 'medium',
  duration = 4,
  position = 'all',
  beamsClassName,
  className,
  style,
  children,
  ...props
}: LightBeamsProps) {
  const intensityClass = styles[`intensity-${intensity}`];
  const blurClass = styles[blur];

  const renderBeams = () => {
    const beams = [];
    const delayClasses = [
      styles.delay1,
      styles.delay2,
      styles.delay3,
      styles.delay4,
    ];

    if (position === 'edges' || position === 'all') {
      beams.push(
        <div
          key="top"
          className={`${styles.beam} ${styles.top} ${styles.vertical} ${intensityClass} ${blurClass} ${delayClasses[0]}`}
          style={{ '--beam-color': color, animationDuration: `${duration}s` } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="bottom"
          className={`${styles.beam} ${styles.bottom} ${styles.vertical} ${intensityClass} ${blurClass} ${delayClasses[1]}`}
          style={{ '--beam-color': color, animationDuration: `${duration}s` } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="left"
          className={`${styles.beam} ${styles.left} ${styles.horizontal} ${intensityClass} ${blurClass} ${delayClasses[2]}`}
          style={{ '--beam-color': color, animationDuration: `${duration}s` } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="right"
          className={`${styles.beam} ${styles.right} ${styles.horizontal} ${intensityClass} ${blurClass} ${delayClasses[3]}`}
          style={{ '--beam-color': color, animationDuration: `${duration}s` } as React.CSSProperties}
          aria-hidden="true"
        />
      );
    }

    if (position === 'corners' || position === 'all') {
      beams.push(
        <div
          key="topLeft"
          className={`${styles.beam} ${styles.topLeft} ${styles.diagonal} ${intensityClass} ${blurClass}`}
          style={{ '--beam-color': color, animationDuration: `${duration * 1.25}s` } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="topRight"
          className={`${styles.beam} ${styles.topRight} ${styles.diagonal} ${intensityClass} ${blurClass}`}
          style={{ '--beam-color': color, animationDuration: `${duration * 1.25}s` } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="bottomLeft"
          className={`${styles.beam} ${styles.bottomLeft} ${styles.diagonal} ${intensityClass} ${blurClass}`}
          style={{ '--beam-color': color, animationDuration: `${duration * 1.25}s` } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="bottomRight"
          className={`${styles.beam} ${styles.bottomRight} ${styles.diagonal} ${intensityClass} ${blurClass}`}
          style={{ '--beam-color': color, animationDuration: `${duration * 1.25}s` } as React.CSSProperties}
          aria-hidden="true"
        />
      );
    }

    return beams;
  };

  return (
    <div className={`${styles.container} ${className || ''}`} style={style} {...props}>
      <div className={`${styles.beams} ${beamsClassName || ''}`}>{renderBeams()}</div>
      {children}
    </div>
  );
}

LightBeams.displayName = 'LightBeams';

export default LightBeams;
