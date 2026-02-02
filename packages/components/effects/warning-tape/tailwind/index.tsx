'use client';

import { forwardRef, HTMLAttributes, useId } from 'react';

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
      bgColor,
      textColor,
      duration = 20,
      rotation = -1,
      reverse = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const id = useId();

    // Repeat text for seamless scroll
    const repeatedText = `${children} • `.repeat(20);

    return (
      <>
        <style>{`
          @keyframes scroll-left-${id} {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes scroll-right-${id} {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          .tape-scroll-${id} {
            display: inline-block;
            animation: ${reverse ? `scroll-right-${id}` : `scroll-left-${id}`} ${duration}s linear infinite;
          }
        `}</style>
        <div
          ref={ref}
          className={`w-full py-3 overflow-hidden whitespace-nowrap font-bold text-xs tracking-widest uppercase ${className}`}
          style={{
            backgroundColor: bgColor || 'hsl(347 100% 50%)',
            color: textColor || 'hsl(0 0% 100%)',
            transform: `rotate(${rotation}deg) scale(1.1)`,
            ...style,
          }}
          {...props}
        >
          <span className={`tape-scroll-${id}`}>{repeatedText}</span>
        </div>
      </>
    );
  }
);

WarningTape.displayName = 'WarningTape';

export default WarningTape;
