'use client';

import { forwardRef, HTMLAttributes, useId } from 'react';

export interface ScreenDistortionProps extends HTMLAttributes<HTMLDivElement> {
  /** Distortion type */
  type?: 'wave' | 'glitch' | 'chromatic' | 'noise';
  /** Distortion intensity */
  intensity?: 'subtle' | 'medium' | 'intense';
  /** Animation speed */
  speed?: 'slow' | 'normal' | 'fast';
  /** Only show on hover (requires parent with :hover) */
  hoverOnly?: boolean;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

export const ScreenDistortion = forwardRef<HTMLDivElement, ScreenDistortionProps>(
  (
    {
      type = 'glitch',
      intensity = 'medium',
      speed = 'normal',
      hoverOnly = false,
      position = 'fixed',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const id = useId();

    const intensityValues = {
      subtle: { shift: '2px', opacity: 0.01 },
      medium: { shift: '5px', opacity: 0.02 },
      intense: { shift: '10px', opacity: 0.04 },
    }[intensity];

    const durationValues = {
      slow: 6,
      normal: 4,
      fast: 2,
    }[speed];

    return (
      <>
        <style>{`
          @keyframes wave-distort-${id} {
            0%, 100% { transform: scaleY(1) skewX(0); }
            25% { transform: scaleY(1.002) skewX(0.5deg); }
            50% { transform: scaleY(0.998) skewX(0); }
            75% { transform: scaleY(1.001) skewX(-0.5deg); }
          }
          @keyframes glitch-distort-1-${id} {
            0%, 85%, 100% { opacity: 0; clip-path: inset(0 0 100% 0); }
            86% { opacity: 1; clip-path: inset(20% 0 60% 0); transform: translateX(-${intensityValues.shift}); background: hsl(347 100% 50% / ${intensityValues.opacity * 5}); }
            88% { opacity: 1; clip-path: inset(50% 0 30% 0); transform: translateX(${intensityValues.shift}); }
            90% { opacity: 0; }
          }
          @keyframes glitch-distort-2-${id} {
            0%, 85%, 100% { opacity: 0; clip-path: inset(0 0 100% 0); }
            87% { opacity: 1; clip-path: inset(40% 0 40% 0); transform: translateX(calc(${intensityValues.shift} * 0.6)); background: hsl(180 100% 50% / ${intensityValues.opacity * 5}); }
            89% { opacity: 1; clip-path: inset(70% 0 10% 0); transform: translateX(calc(${intensityValues.shift} * -0.6)); }
            91% { opacity: 0; }
          }
          @keyframes chromatic-r-${id} {
            0%, 100% { transform: translate(0); }
            50% { transform: translate(${intensityValues.shift}, calc(${intensityValues.shift} * -0.5)); }
          }
          @keyframes chromatic-c-${id} {
            0%, 100% { transform: translate(0); }
            50% { transform: translate(calc(${intensityValues.shift} * -1), ${intensityValues.shift}); }
          }
          @keyframes noise-animate-${id} {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-1px, 1px); }
            50% { transform: translate(1px, -1px); }
            75% { transform: translate(-1px, -1px); }
            100% { transform: translate(0, 0); }
          }
          .distortion-${id} {
            position: ${position};
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9990;
            ${hoverOnly ? 'opacity: 0;' : ''}
          }
          ${hoverOnly ? `
            .distortion-${id}:hover, *:hover > .distortion-${id} {
              opacity: 1;
            }
          ` : ''}
          ${type === 'wave' ? `
            .distortion-wave-${id}::before {
              content: '';
              position: absolute;
              inset: 0;
              background: inherit;
              animation: wave-distort-${id} ${durationValues}s ease-in-out infinite;
            }
          ` : ''}
          ${type === 'glitch' ? `
            .distortion-glitch-${id}::before,
            .distortion-glitch-${id}::after {
              content: '';
              position: absolute;
              inset: 0;
              background: inherit;
              opacity: 0;
            }
            .distortion-glitch-${id}::before {
              animation: glitch-distort-1-${id} ${durationValues}s infinite;
            }
            .distortion-glitch-${id}::after {
              animation: glitch-distort-2-${id} ${durationValues}s infinite;
            }
          ` : ''}
          ${type === 'chromatic' ? `
            .distortion-chromatic-${id}::before,
            .distortion-chromatic-${id}::after {
              content: '';
              position: absolute;
              inset: 0;
              mix-blend-mode: screen;
            }
            .distortion-chromatic-${id}::before {
              background: rgba(255, 0, 0, ${intensityValues.opacity});
              animation: chromatic-r-${id} ${durationValues}s ease-in-out infinite;
            }
            .distortion-chromatic-${id}::after {
              background: rgba(0, 255, 255, ${intensityValues.opacity});
              animation: chromatic-c-${id} ${durationValues}s ease-in-out infinite reverse;
            }
          ` : ''}
          ${type === 'noise' ? `
            .distortion-noise-${id} {
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
              opacity: ${intensityValues.opacity};
              animation: noise-animate-${id} 0.2s steps(5) infinite;
            }
          ` : ''}
        `}</style>
        <div
          ref={ref}
          className={`distortion-${id} distortion-${type}-${id} ${className}`}
          style={{ position, ...style }}
          aria-hidden="true"
          {...props}
        />
      </>
    );
  }
);

ScreenDistortion.displayName = 'ScreenDistortion';

export default ScreenDistortion;
