'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';

export interface BloodDripProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  variant?: 'blood' | 'acid' | 'cyber' | 'void' | 'chrome';
  intensity?: 'light' | 'medium' | 'heavy';
  dripsPerChar?: 1 | 2 | 3;
  duration?: number;
  glowing?: boolean;
  melting?: boolean;
  showPool?: boolean;
  pauseOnHover?: boolean;
  static?: boolean;
  dripColor?: string;
  dripProbability?: number;
}

const variantColors = {
  blood: '#ff0040',
  acid: '#aaff00',
  cyber: '#00ffff',
  void: '#0a0a0a',
  chrome: '#888888',
};

const dripWidths = { light: 2, medium: 4, heavy: 6 };
const dropletSizes = { light: 4, medium: 8, heavy: 12 };

export const BloodDrip = forwardRef<HTMLSpanElement, BloodDripProps>(
  (
    {
      children,
      variant = 'blood',
      intensity = 'medium',
      dripsPerChar = 1,
      duration = 2,
      glowing = false,
      melting = false,
      showPool = false,
      pauseOnHover = false,
      static: isStatic = false,
      dripColor,
      dripProbability = 0.7,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const chars = children.split('');
    const color = dripColor || variantColors[variant];
    const dripWidth = dripWidths[intensity];
    const dropletSize = dropletSizes[intensity];
    
    const dripMap = useMemo(() => {
      return chars.map(() => Math.random() < dripProbability);
    }, [chars.length, dripProbability]);

    const glowStyle = glowing ? { textShadow: `0 0 10px ${color}, 0 0 20px ${color}` } : {};

    return (
      <span
        ref={ref}
        className={`relative inline-block ${pauseOnHover ? 'hover:[&_.drip]:pause' : ''} ${className}`}
        style={{ ...glowStyle, ...style }}
        {...props}
      >
        {chars.map((char, i) => {
          const hasDrip = dripMap[i] && char !== ' ';
          const delay = Math.random() * 2;
          
          return (
            <span
              key={i}
              className={`inline-block relative ${melting ? 'animate-pulse' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
              {hasDrip && (
                <span
                  className="drip absolute left-1/2 top-full -translate-x-1/2"
                  style={{
                    width: dripWidth,
                    height: isStatic ? 40 : 0,
                    background: color,
                    borderRadius: '0 0 50% 50%',
                    animation: isStatic ? 'none' : `drip ${duration}s ease-in infinite`,
                    animationDelay: `${delay}s`,
                  }}
                >
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: dropletSize,
                      height: dropletSize,
                      background: color,
                      opacity: isStatic ? 1 : 0,
                      animation: isStatic ? 'none' : `droplet ${duration}s ease-in infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                </span>
              )}
            </span>
          );
        })}
        {showPool && (
          <span
            className="absolute -bottom-5 left-0 right-0 h-2.5 rounded-full opacity-50 blur-sm"
            style={{ background: color }}
          />
        )}
        <style>{`
          @keyframes drip {
            0% { height: 0; opacity: 1; }
            20% { height: 20px; opacity: 1; }
            80% { height: 60px; opacity: 1; }
            100% { height: 80px; opacity: 0; }
          }
          @keyframes droplet {
            0%, 70% { opacity: 0; transform: translateX(-50%) scale(1); }
            75% { opacity: 1; transform: translateX(-50%) scale(1); }
            100% { opacity: 0; transform: translateX(-50%) scale(0) translateY(20px); }
          }
        `}</style>
      </span>
    );
  }
);

BloodDrip.displayName = 'BloodDrip';
export default BloodDrip;
