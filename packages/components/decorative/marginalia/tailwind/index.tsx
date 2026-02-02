'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface MarginaliaProps extends HTMLAttributes<HTMLSpanElement> {
  /** Note content */
  children: string;
  /** Note position */
  position?: 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Note style */
  style?: 'pencil' | 'ink' | 'highlighter' | 'sticker';
  /** Note rotation */
  rotation?: number;
  /** Show arrow pointing to text */
  showArrow?: boolean;
  /** Note label/prefix */
  label?: string;
}

const positionClasses = {
  left: 'right-[calc(100%+1rem)] top-0 text-right',
  right: 'left-[calc(100%+1rem)] top-0 text-left',
  'top-left': 'bottom-[calc(100%+0.5rem)] left-0',
  'top-right': 'bottom-[calc(100%+0.5rem)] right-0 text-right',
  'bottom-left': 'top-[calc(100%+0.5rem)] left-0',
  'bottom-right': 'top-[calc(100%+0.5rem)] right-0 text-right',
};

const styleClasses = {
  pencil: 'text-neutral-600 bg-[rgba(255,255,200,0.3)] px-2 py-1 rounded-sm border border-dashed border-neutral-400',
  ink: 'text-black font-semibold uppercase tracking-[0.05em] px-3 py-1 border-l-[3px] border-l-black',
  highlighter: 'text-black bg-gradient-to-b from-yellow-300/40 to-yellow-300/20 px-2 rounded-sm',
  sticker: 'bg-gradient-to-br from-yellow-300 to-yellow-400 text-black px-3 py-2 shadow-md font-semibold',
};

const arrowColors = {
  pencil: 'text-red-600',
  ink: 'text-red-600',
  highlighter: 'text-red-600',
  sticker: 'text-red-600',
};

export const Marginalia = forwardRef<HTMLSpanElement, MarginaliaProps>(
  (
    {
      children,
      position = 'right',
      style: noteStyle = 'pencil',
      rotation = -5,
      showArrow = true,
      label,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`absolute inline-flex items-center gap-2 font-mono text-xs italic leading-relaxed pointer-events-none ${positionClasses[position]} ${styleClasses[noteStyle]} ${className || ''}`}
        style={
          noteStyle === 'sticker'
            ? ({ transform: `rotate(${rotation}deg) translateY(-5px)` } as React.CSSProperties)
            : ({ transform: `rotate(${rotation}deg)` } as React.CSSProperties)
        }
        {...props}
      >
        {label && (
          <span className="font-bold uppercase text-[0.625rem] tracking-[0.1em] opacity-70 mr-1">
            {label}
          </span>
        )}
        <span className="flex-1">{children}</span>
        {showArrow && (
          <span className={`font-bold animate-arrow-bounce ${arrowColors[noteStyle]}`}>
            &rarr;
          </span>
        )}
      </span>
    );
  }
);

Marginalia.displayName = 'Marginalia';

export default Marginalia;
