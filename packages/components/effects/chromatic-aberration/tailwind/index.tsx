'use client';

import { forwardRef, HTMLAttributes, useId } from 'react';

export interface ChromaticAberrationProps extends HTMLAttributes<HTMLDivElement> {
  /** Aberration intensity */
  intensity?: 'subtle' | 'medium' | 'intense' | 'extreme';
  /** Red channel offset in pixels */
  redOffset?: number;
  /** Green channel offset in pixels */
  greenOffset?: number;
  /** Blue channel offset in pixels */
  blueOffset?: number;
  /** Enable on hover only */
  hoverOnly?: boolean;
  /** Animate the effect */
  animated?: boolean;
  /** Animation speed */
  animationSpeed?: number;
}

export const ChromaticAberration = forwardRef<HTMLDivElement, ChromaticAberrationProps>(
  (
    {
      intensity = 'medium',
      redOffset,
      greenOffset,
      blueOffset,
      hoverOnly = false,
      animated = false,
      animationSpeed = 1,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const id = useId();

    const offsets = {
      subtle: { red: 1, green: 0, blue: -1 },
      medium: { red: 3, green: 0, blue: -3 },
      intense: { red: 6, green: 0, blue: -6 },
      extreme: { red: 10, green: 0, blue: -10 },
    }[intensity];

    const finalRedOffset = redOffset ?? offsets.red;
    const finalGreenOffset = greenOffset ?? offsets.green;
    const finalBlueOffset = blueOffset ?? offsets.blue;

    const hoverOnlyStyle = hoverOnly
      ? `
        .chromatic-aberration-hover-${id} .chromatic-channel-red-${id} { transform: translateX(0); }
        .chromatic-aberration-hover-${id} .chromatic-channel-green-${id} { transform: translateX(0); }
        .chromatic-aberration-hover-${id} .chromatic-channel-blue-${id} { transform: translateX(0); }
        .chromatic-aberration-hover-${id}:hover .chromatic-channel-red-${id} { transform: translateX(${finalRedOffset}px); }
        .chromatic-aberration-hover-${id}:hover .chromatic-channel-green-${id} { transform: translateX(${finalGreenOffset}px); }
        .chromatic-aberration-hover-${id}:hover .chromatic-channel-blue-${id} { transform: translateX(${finalBlueOffset}px); }
      `
      : `
        .chromatic-channel-red-${id} { transform: translateX(${finalRedOffset}px); }
        .chromatic-channel-green-${id} { transform: translateX(${finalGreenOffset}px); }
        .chromatic-channel-blue-${id} { transform: translateX(${finalBlueOffset}px); }
      `;

    return (
      <>
        <style>{`
          .chromatic-aberration-${id} {
            position: relative;
            display: contents;
          }
          .chromatic-channel-${id} {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            mix-blend-mode: screen;
          }
          ${hoverOnlyStyle}
          ${animated ? `
            @keyframes chromatic-pulse-${id} {
              0%, 100% {
                transform: translateX(${finalRedOffset}px);
              }
              50% {
                transform: translateX(${finalRedOffset + 2}px);
              }
            }
            .chromatic-channel-animated-${id} {
              animation: chromatic-pulse-${id} ${animationSpeed}s ease-in-out infinite;
            }
            .chromatic-channel-animated-blue-${id} {
              animation: chromatic-pulse-blue-${id} ${animationSpeed}s ease-in-out infinite;
            }
            @keyframes chromatic-pulse-blue-${id} {
              0%, 100% {
                transform: translateX(${finalBlueOffset}px);
              }
              50% {
                transform: translateX(${finalBlueOffset - 2}px);
              }
            }
          ` : ''}
        `}</style>
        <div
          ref={ref}
          className={`chromatic-aberration-${id} ${hoverOnly ? `chromatic-aberration-hover-${id}` : ''} ${className}`}
          {...props}
        >
          <div className={`chromatic-channel-${id} chromatic-channel-red-${id} ${animated ? 'chromatic-channel-animated-' + id : ''}`}>
            <span className="text-red-500" style={{ textShadow: '0 0 0 red' }}>{children}</span>
          </div>
          <div className={`chromatic-channel-${id} chromatic-channel-green-${id}`}>
            <span className="text-lime-500" style={{ textShadow: '0 0 0 lime' }}>{children}</span>
          </div>
          <div className={`chromatic-channel-${id} chromatic-channel-blue-${id} ${animated ? 'chromatic-channel-animated-blue-' + id : ''}`}>
            <span className="text-blue-500" style={{ textShadow: '0 0 0 blue' }}>{children}</span>
          </div>
        </div>
      </>
    );
  }
);

ChromaticAberration.displayName = 'ChromaticAberration';

export default ChromaticAberration;
