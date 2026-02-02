'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface ShadowGlitchProps extends HTMLAttributes<HTMLSpanElement> {
  /** The text to display with glitch shadows */
  children: string;
  /** Primary shadow color */
  shadowColor1?: string;
  /** Secondary shadow color */
  shadowColor2?: string;
  /** Shadow offset distance in pixels */
  offset?: number;
  /** Glitch intensity: subtle, medium, intense */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Enable animation on hover */
  hover?: boolean;
}

const intensityStyles = {
  subtle: (offset: number, color1: string, color2: string) => ({
  textShadow: `${offset * 0.5}px ${offset * 0.5}px 0 ${color1}, ${-offset * 0.5}px ${-offset * 0.5}px 0 ${color2}`,
}),
  medium: (offset: number, color1: string, color2: string) => ({
  textShadow: `${offset}px ${offset}px 0 ${color1}, ${-offset}px ${-offset}px 0 ${color2}`,
}),
  intense: (offset: number, color1: string, color2: string) => ({
  textShadow: `${offset * 1.5}px ${offset}px 0 ${color1}, ${-offset * 1.5}px ${-offset}px 0 ${color2}`,
}),
};

export const ShadowGlitch = forwardRef<HTMLSpanElement, ShadowGlitchProps>(
  (
    {
      children,
      shadowColor1 = '#ff0040',
      shadowColor2 = '#00ffff',
      offset = 3,
      intensity = 'medium',
      hover = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const baseStyle = intensityStyles[intensity](offset, shadowColor1, shadowColor2);

    return (
      <span
        ref={ref}
        className={`inline-block relative ${hover ? 'hover:animate-[glitch-shadows_0.3s_infinite]' : ''} ${className}`}
        style={{ ...baseStyle, ...style }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

ShadowGlitch.displayName = 'ShadowGlitch';

export default ShadowGlitch;
