'use client';

import { HTMLAttributes, useId } from 'react';

export interface LightBeamsProps extends HTMLAttributes<HTMLDivElement> {
  /** Beam color */
  color?: string;
  /** Animation intensity */
  intensity?: 'subtle' | 'moderate' | 'intense';
  /** Blur amount */
  blur?: 'sharp' | 'medium' | 'blurred';
  /** Animation duration in seconds */
  duration?: number;
  /** Which beams to show */
  position?: 'edges' | 'corners' | 'all';
}

export function LightBeams({
  color = 'rgba(255, 255, 255, 0.8)',
  intensity = 'moderate',
  blur = 'medium',
  duration = 4,
  position = 'all',
  className = '',
  style,
  children,
  ...props
}: LightBeamsProps) {
  const id = useId();

  const getOpacity = () => {
    switch (intensity) {
      case 'subtle': return 0.3;
      case 'intense': return 0.9;
      default: return 0.6;
    }
  };

  const getWidth = () => {
    switch (intensity) {
      case 'subtle': return '50px';
      case 'intense': return '150px';
      default: return '100px';
    }
  };

  const getBlur = () => {
    switch (blur) {
      case 'sharp': return '0px';
      case 'blurred': return '20px';
      default: return '10px';
    }
  };

  const renderBeams = () => {
    const beams = [];
    const beamStyle = {
      '--beam-color': color,
      '--beam-opacity': getOpacity(),
      '--beam-width': getWidth(),
      '--beam-blur': getBlur(),
    } as React.CSSProperties;

    if (position === 'edges' || position === 'all') {
      beams.push(
        <div
          key="top"
          className="absolute top-0 left-1/2 -translate-x-1/2 scale-y-0 opacity-0 pointer-events-none animate-beam-vertical"
          style={beamStyle}
          aria-hidden="true"
        />,
        <div
          key="bottom"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 scale-y-0 opacity-0 pointer-events-none animate-beam-vertical"
          style={{ ...beamStyle, animationDelay: '0.3s' } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="left"
          className="absolute left-0 top-1/2 -translate-y-1/2 scale-x-0 opacity-0 pointer-events-none animate-beam-horizontal"
          style={{ ...beamStyle, animationDelay: '0.6s' } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="right"
          className="absolute right-0 top-1/2 -translate-y-1/2 scale-x-0 opacity-0 pointer-events-none animate-beam-horizontal"
          style={{ ...beamStyle, animationDelay: '0.9s' } as React.CSSProperties}
          aria-hidden="true"
        />
      );
    }

    if (position === 'corners' || position === 'all') {
      const baseDiagonalClass = "absolute opacity-0 pointer-events-none h-[var(--beam-width)] w-[200%]";
      beams.push(
        <div
          key="topLeft"
          className={`${baseDiagonalClass} top-0 left-0 -rotate-45 scale-y-0 animate-beam-diagonal origin-top-left`}
          style={beamStyle}
          aria-hidden="true"
        />,
        <div
          key="topRight"
          className={`${baseDiagonalClass} top-0 right-0 rotate-45 scale-y-0 animate-beam-diagonal origin-top-right`}
          style={{ ...beamStyle, animationDuration: `${duration * 1.25}s`, animationDelay: '0.5s' } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="bottomLeft"
          className={`${baseDiagonalClass} bottom-0 left-0 rotate-45 scale-y-0 animate-beam-diagonal-reverse origin-bottom-left`}
          style={{ ...beamStyle, animationDuration: `${duration * 1.25}s`, animationDelay: '1s' } as React.CSSProperties}
          aria-hidden="true"
        />,
        <div
          key="bottomRight"
          className={`${baseDiagonalClass} bottom-0 right-0 -rotate-45 scale-y-0 animate-beam-diagonal-reverse origin-bottom-right`}
          style={{ ...beamStyle, animationDuration: `${duration * 1.25}s`, animationDelay: '1.5s' } as React.CSSProperties}
          aria-hidden="true"
        />
      );
    }

    return beams;
  };

  return (
    <>
      <style>{`
        @keyframes beam-vertical-${id} {
          0%, 100% { opacity: 0; transform: translateX(-50%) scaleY(0); }
          50% { opacity: var(--beam-opacity); transform: translateX(-50%) scaleY(1); }
        }
        @keyframes beam-horizontal-${id} {
          0%, 100% { opacity: 0; transform: translateY(-50%) scaleX(0); }
          50% { opacity: var(--beam-opacity); transform: translateY(-50%) scaleX(1); }
        }
        @keyframes beam-diagonal-${id} {
          0%, 100% { opacity: 0; transform: rotate(-45deg) scaleY(0); }
          50% { opacity: var(--beam-opacity); transform: rotate(-45deg) scaleY(1); }
        }
        @keyframes beam-diagonal-reverse-${id} {
          0%, 100% { opacity: 0; transform: rotate(45deg) scaleY(0); }
          50% { opacity: var(--beam-opacity); transform: rotate(45deg) scaleY(1); }
        }
        .animate-beam-vertical { animation: beam-vertical-${id} ${duration}s ease-in-out infinite; }
        .animate-beam-horizontal { animation: beam-horizontal-${id} ${duration}s ease-in-out infinite; }
        .animate-beam-diagonal { animation: beam-diagonal-${id} ${duration * 1.25}s ease-in-out infinite; }
        .animate-beam-diagonal-reverse { animation: beam-diagonal-reverse-${id} ${duration * 1.25}s ease-in-out infinite; }
        .beam-vertical-${id} {
          width: var(--beam-width);
          height: 100%;
          background: linear-gradient(to bottom, transparent, var(--beam-color) 20%, var(--beam-color) 80%, transparent);
          filter: blur(var(--beam-blur));
        }
        .beam-horizontal-${id} {
          width: 100%;
          height: var(--beam-width);
          background: linear-gradient(to right, transparent, var(--beam-color) 20%, var(--beam-color) 80%, transparent);
          filter: blur(var(--beam-blur));
        }
        .beam-diagonal-${id} {
          background: linear-gradient(to right, transparent, var(--beam-color) 15%, var(--beam-color) 85%, transparent);
          filter: blur(var(--beam-blur));
        }
      `}</style>
      <div className={`relative overflow-hidden w-full h-full ${className}`} style={style} {...props}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {renderBeams()}
        </div>
        {children}
      </div>
    </>
  );
}

LightBeams.displayName = 'LightBeams';

export default LightBeams;
