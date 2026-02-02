'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface HandwrittenTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text content */
  children: string;
  /** Handwriting style */
  font?: 'cursive' | 'script' | 'signature' | 'messy' | 'neat' | 'custom';
  /** Custom font family */
  customFont?: string;
  /** Size variation (for natural feel) */
  sizeVariation?: boolean;
  /** Rotation variation (for natural feel) */
  rotationVariation?: boolean;
  /** Baseline shift (for natural feel) */
  baselineShift?: boolean;
  /** Ink bleed effect */
  inkBleed?: boolean;
  /** Paper texture behind */
  paperBackground?: boolean;
}

const fontClasses = {
  cursive: 'font-["Brush_Script_MT",_"Lucida_Calligraphy",_"Comic_Sans_MS",cursive]',
  script: 'font-["Great_Vibes",_"Pinyon_Script",_"Brush_Script_MT",cursive]',
  signature: 'font-["Sacramento",_"Great_Vibes",cursive]',
  messy: 'font-["Marker_Felt",_"Comic_Sans_MS",cursive]',
  neat: 'font-["Snell_Roundhand",_"Lucida_Handwriting",cursive]',
  custom: '',
};

export const HandwrittenText = forwardRef<HTMLSpanElement, HandwrittenTextProps>(
  (
    {
      children,
      font = 'cursive',
      customFont,
      sizeVariation = true,
      rotationVariation = true,
      baselineShift = true,
      inkBleed = false,
      paperBackground = false,
      className = '',
      ...props
    },
    ref
  ) => {
    // Process text to apply variations to each character
    const chars = children.split('').map((char, index) => {
      const sizeMod = sizeVariation ? (Math.random() * 0.2 + 0.9) : 1;
      const rotMod = rotationVariation ? (Math.random() * 6 - 3) : 0;
      const baselineMod = baselineShift ? (Math.random() * 4 - 2) : 0;

      return (
        <span
          key={index}
          className="inline-block"
          style={
            {
              '--size-mod': sizeMod,
              '--rot-mod': `${rotMod}deg`,
              '--baseline-mod': `${baselineMod}px`,
              transform: `rotate(var(--rot-mod, 0deg)) translateY(var(--baseline-mod, 0px))`,
              fontSize: `calc(1em * var(--size-mod, 1))`,
            } as React.CSSProperties
          }
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });

    return (
      <span
        ref={ref}
        className={`inline-block italic leading-relaxed ${
          font !== 'custom' ? fontClasses[font] : ''
        } ${
          inkBleed ? '[text-shadow:0_0_1px_currentColor,0_0_2px_currentColor,0_0_3px_currentColor]' : ''
        } ${paperBackground ? 'relative' : ''} ${className}`}
        style={customFont ? { fontFamily: customFont } : undefined}
        {...props}
      >
        {chars}
        {paperBackground && (
          <span
            className="absolute -inset-1 bg-[#f5f0e6] border border-[#d4c9b8] rounded-sm -z-10 -rotate-1"
            aria-hidden="true"
          />
        )}
      </span>
    );
  }
);

HandwrittenText.displayName = 'HandwrittenText';

export default HandwrittenText;
