'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

export interface IncantationProps extends HTMLAttributes<HTMLSpanElement> {
  /** The incantation text to display */
  children: string;
  /** Intensity of the magical effect: subtle, medium, intense */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Magical language style: arcane, divine, eldritch */
  language?: 'arcane' | 'divine' | 'eldritch';
  /** Primary glow color */
  glowColor?: string;
  /** Secondary color for the shift effect */
  shiftColor?: string;
  /** Duration of the pulse cycle in seconds */
  pulseDuration?: number;
}

export const Incantation = forwardRef<HTMLSpanElement, IncantationProps>(
  (
    {
      children,
      intensity = 'medium',
      language = 'arcane',
      glowColor = '#a855f7',
      shiftColor = '#fbbf24',
      pulseDuration = 2,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const intensityClasses = {
      subtle: 'animate-incantation-subtle',
      medium: 'animate-incantation-medium',
      intense: 'animate-incantation-intense',
    };

    const languageClasses = {
      arcane: 'font-serif uppercase tracking-wider',
      divine: 'font-serif italic',
      eldritch: 'font-black uppercase',
    };

    return (
      <span
        ref={ref}
        className={cn('relative inline-block', intensityClasses[intensity], languageClasses[language], className)}
        style={{
          '--glow-color': glowColor,
          '--shift-color': shiftColor,
          '--pulse-duration': `${pulseDuration}s`,
          textShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Incantation.displayName = 'Incantation';

export default Incantation;
