'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './warning-tape.module.css';

export interface WarningTapeProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to scroll */
  children: string;
  /** Background color */
  bgColor?: string;
  /** Text color */
  textColor?: string;
  /** Scroll speed in seconds */
  duration?: number;
  /** Rotation angle in degrees */
  rotation?: number;
  /** Reverse scroll direction */
  reverse?: boolean;
}

export const WarningTape = forwardRef<HTMLDivElement, WarningTapeProps>(
  (
    {
      children,
      bgColor = '#ff0040',
      textColor = '#000000',
      duration = 20,
      rotation = -1,
      reverse = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Repeat text for seamless scroll
    const repeatedText = `${children} • `.repeat(20);

    return (
      <div
        ref={ref}
        className={`${styles.tape} ${className || ''}`}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          transform: `rotate(${rotation}deg) scale(1.1)`,
          ...style,
        }}
        {...props}
      >
        <span
          className={`${styles.scroll} ${reverse ? styles.reverse : ''}`}
          style={{ animationDuration: `${duration}s` }}
        >
          {repeatedText}
        </span>
      </div>
    );
  }
);

WarningTape.displayName = 'WarningTape';

export default WarningTape;
