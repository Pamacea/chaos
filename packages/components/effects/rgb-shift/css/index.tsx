'use client';

import { useState, useCallback, cloneElement, ReactElement, HTMLAttributes } from 'react';
import styles from './rgb-shift.module.css';

export interface RgbShiftProps extends HTMLAttributes<HTMLDivElement> {
  /** Child element to apply RGB shift to */
  children: ReactElement;
  /** Shift intensity */
  intensity?: 'subtle' | 'moderate' | 'intense' | 'extreme';
  /** Shift direction */
  direction?: 'horizontal' | 'vertical' | 'diagonal' | 'random';
  /** Animation style */
  animation?: 'none' | 'pulse' | 'glitch' | 'shimmer';
  /** Transition speed */
  transition?: 'instant' | 'fast' | 'normal' | 'slow' | 'bounce';
  /** Trigger on click instead of hover */
  clickToTrigger?: boolean;
  /** Custom shift amount in pixels */
  customShift?: number;
}

export function RgbShift({
  children,
  intensity = 'moderate',
  direction = 'horizontal',
  animation = 'none',
  transition = 'normal',
  clickToTrigger = false,
  customShift,
  className,
  style,
  ...props
}: RgbShiftProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = useCallback(() => {
    if (clickToTrigger) {
      setIsActive(prev => !prev);
    }
  }, [clickToTrigger]);

  const containerStyle = customShift ? {
    '--shift-x': `-${customShift}px`,
    '--shift-x-positive': `${customShift}px`,
  } as React.CSSProperties : undefined;

  return (
    <div
      className={`${styles.container} ${styles[`intensity-${intensity}`]} ${styles[`direction-${direction}`]} ${animation !== 'none' ? styles[`animate-${animation}`] : ''} ${styles[`transition-${transition}`]} ${isActive ? styles.active : ''} ${className || ''}`}
      style={{ ...containerStyle, ...style }}
      onClick={handleClick}
      {...props}
    >
      <div className={styles.wrapper}>
        {/* Red channel */}
        <div className={`${styles.layer} ${styles.red}`}>
          {cloneElement(children, {
            style: {
              ...children.props.style,
              color: 'transparent',
              textShadow: '2px 0 0.3px rgba(255, 0, 0, 0.8)',
            },
          })}
        </div>
        {/* Green channel */}
        <div className={`${styles.layer} ${styles.green}`}>
          {cloneElement(children, {
            style: {
              ...children.props.style,
              color: 'transparent',
              textShadow: '-1px 0 0.3px rgba(0, 255, 0, 0.8)',
            },
          })}
        </div>
        {/* Blue channel */}
        <div className={`${styles.layer} ${styles.blue}`}>
          {cloneElement(children, {
            style: {
              ...children.props.style,
              color: 'transparent',
              textShadow: '-1px 0 0.3px rgba(0, 0, 255, 0.8)',
            },
          })}
        </div>
        {/* Original content */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

RgbShift.displayName = 'RgbShift';

export default RgbShift;
