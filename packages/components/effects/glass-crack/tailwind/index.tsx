'use client';

import { forwardRef, HTMLAttributes, useId } from 'react';

export interface GlassCrackProps extends HTMLAttributes<HTMLDivElement> {
  /** Crack intensity */
  intensity?: 'light' | 'medium' | 'heavy';
  /** Crack pattern */
  pattern?: 'spiderweb' | 'lightning' | 'shattered' | 'random';
  /** Crack color */
  color?: string;
  /** Show glow effect */
  glow?: boolean;
  /** Number of crack lines */
  crackCount?: number;
}

export const GlassCrack = forwardRef<HTMLDivElement, GlassCrackProps>(
  (
    {
      intensity = 'medium',
      pattern = 'spiderweb',
      color = 'rgba(255, 255, 255, 0.5)',
      glow = false,
      crackCount = 12,
      className = '',
      ...props
    },
    ref
  ) => {
    const id = useId();

    // Generate crack lines
    const cracks = Array.from({ length: crackCount }, (_, i) => ({
      id: i,
      angle: (360 / crackCount) * i + Math.random() * 20 - 10,
      length: 30 + Math.random() * 50,
      curve: Math.random() * 20 - 10,
      branches: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
    }));

    const strokeWidth = intensity === 'heavy' ? 2 : intensity === 'light' ? 0.5 : 1;
    const opacity = intensity === 'heavy' ? 1 : intensity === 'light' ? 0.7 : 0.8;

    return (
      <>
        <style>{`
          @keyframes branch-grow-${id} {
            to { stroke-dashoffset: 0; }
          }
          @keyframes crack-grow-${id} {
            to { stroke-dashoffset: 0; }
          }
          @keyframes shatter-${id} {
            from {
              transform: translate(-50%, -50%) rotate(var(--angle)) scale(0);
              opacity: 0;
            }
            to {
              transform: translate(-50%, -50%) rotate(var(--angle)) scale(1);
              opacity: 1;
            }
          }
          .glass-crack-${id} .crack-branch-${id} {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: branch-grow-${id} 0.5s ease-out var(--delay, 0s) forwards;
          }
          ${pattern === 'spiderweb' ? `
            .glass-crack-${id} .crack-path-${id} {
              stroke-dasharray: 50;
              stroke-dashoffset: 0;
            }
            .glass-crack-${id} .crack-svg-${id} {
              animation: crack-grow-${id} 0.8s ease-out forwards;
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
            }
          ` : ''}
          ${pattern === 'shattered' ? `
            .glass-crack-${id} .crack-svg-${id} {
              animation: shatter-${id} 0.3s ease-out forwards;
            }
          ` : ''}
          ${glow ? `
            .glass-crack-${id} .crack-path-${id} {
              filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor);
            }
            .glass-crack-${id} .crack-branch-${id} {
              filter: drop-shadow(0 0 2px currentColor);
            }
          ` : ''}
        `}</style>
        <div
          ref={ref}
          className={`glass-crack-${id} absolute inset-0 pointer-events-none overflow-hidden ${className}`}
          style={{ '--crack-color': color } as React.CSSProperties}
          {...props}
        >
          {cracks.map((crack) => (
            <svg
              key={crack.id}
              className={`crack-svg-${id} absolute top-1/2 left-1/2 w-[100px] h-[100px]`}
              viewBox="0 0 100 100"
              style={
                {
                  '--angle': `${crack.angle}deg`,
                  '--length': `${crack.length}px`,
                  '--curve': `${crack.curve}px`,
                  transform: `translate(-50%, -50%) rotate(${crack.angle}deg)`,
                  color,
                } as React.CSSProperties
              }
            >
              <path
                d={`M 50 50 Q ${50 + crack.curve} 25 50 ${0}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={opacity}
                className={`crack-path-${id}`}
              />
              {crack.branches > 0 && (
                <>
                  {Array.from({ length: crack.branches }).map((_, bi) => (
                    <path
                      key={bi}
                      d={`M ${50} ${50 - bi * 5} Q ${50 + crack.curve + 10} ${50 - bi * 5 - 15} ${50 + 20} ${50 - bi * 5 - 25}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={0.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`crack-branch-${id}`}
                      style={{ '--delay': `${bi * 0.1}s` } as React.CSSProperties}
                    />
                  ))}
                </>
              )}
            </svg>
          ))}
        </div>
      </>
    );
  }
);

GlassCrack.displayName = 'GlassCrack';

export default GlassCrack;
