'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface SplitTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** The text to split */
  children: string;
  /** Split by: words, chars, or lines */
  splitBy?: 'words' | 'chars' | 'lines';
  /** Animation delay per unit in ms */
  delay?: number;
  /** Animation duration per unit */
  duration?: number;
  /** Preset animation class */
  variant?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'stagger';
  /** Preserve whitespace for word splits */
  preserveSpaces?: boolean;
}

const variantClasses = {
  fade: 'animate-[fade-split_var(--duration)_ease_forwards]',
  'slide-up': 'animate-[slide-up-split_var(--duration)_ease_forwards]',
  'slide-down': 'animate-[slide-down-split_var(--duration)_ease_forwards]',
  scale: 'animate-[scale-split_var(--duration)_ease_forwards]',
  stagger: 'animate-[stagger-split_var(--duration)_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]',
};

export const SplitText = forwardRef<HTMLSpanElement, SplitTextProps>(
  (
    {
      children,
      splitBy = 'words',
      delay = 50,
      duration = 400,
      variant = 'fade',
      preserveSpaces = true,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    let elements: JSX.Element[] = [];
    let units: string[];

    switch (splitBy) {
      case 'chars':
        units = children.split('');
        break;
      case 'lines':
        units = children.split('\n');
        break;
      case 'words':
      default:
        units = children.split(' ');
        break;
    }

    elements = units.map((unit, index) => {
      const isLast = index === units.length - 1;
      const spaceAfter = splitBy === 'words' && !isLast && preserveSpaces ? ' ' : '';
      const lineBreak = splitBy === 'lines' && !isLast ? <br /> : '';

      return (
        <span
          key={index}
          className={`inline-block opacity-0 ${variantClasses[variant]}`}
          style={{
            animationDelay: `${index * delay}ms`,
            animationDuration: `${duration}ms`,
            '--duration': `${duration}ms`,
          } as React.CSSProperties}
        >
          {unit}
          {spaceAfter}
          {lineBreak}
        </span>
      );
    });

    return (
      <span ref={ref} className={`inline ${className}`} style={style} {...props}>
        {elements}
      </span>
    );
  }
);

SplitText.displayName = 'SplitText';

export default SplitText;
