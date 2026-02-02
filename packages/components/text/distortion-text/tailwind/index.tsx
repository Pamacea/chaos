'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface DistortionTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** The text to display */
  children: string;
  /** Distortion type */
  type?: 'wave' | 'shake' | 'skew' | 'blur';
  /** Animation speed: slow, normal, fast */
  speed?: 'slow' | 'normal' | 'fast';
  /** Distortion intensity */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Only animate on hover */
  hoverOnly?: boolean;
}

const typeAnimations = {
  wave: {
    subtle: 'animate-[wave-subtle_4s_ease-in-out_infinite]',
    medium: 'animate-[wave-medium_2s_ease-in-out_infinite]',
    intense: 'animate-[wave-intense_0.8s_ease-in-out_infinite]',
  },
  shake: {
    subtle: 'animate-[shake-subtle_1s_linear_infinite]',
    medium: 'animate-[shake-medium_0.5s_linear_infinite]',
    intense: 'animate-[shake-intense_0.2s_linear_infinite]',
  },
  skew: {
    subtle: 'animate-[skew-subtle_4s_ease-in-out_infinite]',
    medium: 'animate-[skew-medium_3s_ease-in-out_infinite]',
    intense: 'animate-[skew-intense_2s_ease-in-out_infinite]',
  },
  blur: {
    subtle: 'animate-[blur-subtle_4s_ease-in-out_infinite]',
    medium: 'animate-[blur-medium_2s_ease-in-out_infinite]',
    intense: 'animate-[blur-intense_0.8s_ease-in-out_infinite]',
  },
};

export const DistortionText = forwardRef<HTMLSpanElement, DistortionTextProps>(
  (
    {
      children,
      type = 'wave',
      speed = 'normal',
      intensity = 'medium',
      hoverOnly = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const animationClass = typeAnimations[type][intensity];

    return (
      <span
        ref={ref}
        className={`inline-block ${hoverOnly ? 'hover:' : ''}${animationClass} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

DistortionText.displayName = 'DistortionText';

export default DistortionText;
