'use client';

import { forwardRef, useEffect, useRef, HTMLAttributes, useId } from 'react';

export interface RadarScanProps extends HTMLAttributes<HTMLDivElement> {
  /** Scan color */
  color?: string;
  /** Scan line speed (rotation per second) */
  speed?: number;
  /** Radar size in pixels */
  size?: number;
  /** Number of rings */
  rings?: number;
  /** Number of blips/targets to show */
  blips?: Array<{ angle: number; distance: number }>;
  /** Enable pulse effect on blips */
  pulseBlips?: boolean;
  /** Scan width */
  scanWidth?: number;
}

export const RadarScan = forwardRef<HTMLDivElement, RadarScanProps>(
  (
    {
      color = 'rgba(0, 255, 0, 0.8)',
      speed = 1,
      size = 300,
      rings = 4,
      blips = [],
      pulseBlips = true,
      scanWidth = 2,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const scanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const scan = scanRef.current;
      if (!scan) return;
      scan.style.animationDuration = `${1 / speed}s`;
    }, [speed]);

    return (
      <>
        <style>{`
          @keyframes radar-scan-${id} {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes blip-pulse-${id} {
            0%, 100% {
              opacity: 1;
              transform: rotate(var(--angle)) translate(calc(var(--distance) * 1.5px)) rotate(calc(var(--angle) * -1)) scale(1);
              box-shadow: 0 0 10px ${color};
            }
            50% {
              opacity: 0.6;
              transform: rotate(var(--angle)) translate(calc(var(--distance) * 1.5px)) rotate(calc(var(--angle) * -1)) scale(0.8);
              box-shadow: 0 0 20px ${color};
            }
          }
          .radar-scan-line-${id} {
            animation: radar-scan-${id} 1s linear infinite;
          }
          .radar-blip-pulse-${id} {
            animation: blip-pulse-${id} 2s ease-in-out infinite;
          }
        `}</style>
        <div
          ref={ref}
          className={`relative rounded-full overflow-hidden ${className}`}
          style={{
            width: size,
            height: size,
            background: 'radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
            ...style,
          }}
          {...props}
        >
          {/* Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: rings }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border opacity-50"
                style={{
                  width: `${((i + 1) / rings) * 100}%`,
                  height: `${((i + 1) / rings) * 100}%`,
                  borderColor: color.replace('0.8', '0.3'),
                }}
              />
            ))}
          </div>

          {/* Crosshairs */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/2 w-px h-full"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${color.replace('0.8', '0.5')} 50%, transparent 100%)`,
                transformOrigin: 'center center',
              }}
            />
            <div
              className="absolute top-0 left-1/2 w-px h-full"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${color.replace('0.8', '0.5')} 50%, transparent 100%)`,
                transformOrigin: 'center center',
                transform: 'rotate(90deg)',
              }}
            />
          </div>

          {/* Blips/Targets */}
          <div className="absolute inset-0 pointer-events-none">
            {blips.map((blip, i) => (
              <div
                key={i}
                className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${pulseBlips ? `radar-blip-pulse-${id}` : ''}`}
                style={{
                  '--angle': `${blip.angle}deg`,
                  '--distance': `${blip.distance}%`,
                  background: color,
                  transform: `rotate(${blip.angle}deg) translate(${(size / 2) * (blip.distance / 100)}px) rotate(-${blip.angle}deg)`,
                  boxShadow: `0 0 10px ${color}`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Scan Line */}
          <div
            ref={scanRef}
            className={`radar-scan-line-${id} absolute top-0 left-1/2`}
            style={{
              width: `${scanWidth}px`,
              height: '50%',
              background: color,
              transformOrigin: 'bottom center',
              boxShadow: `0 0 10px ${color.replace('0.8', '0.5')}`,
            }}
          >
            <div
              className="absolute top-0 left-[-25px] w-[50px] h-[200px]"
              style={{
                background: `linear-gradient(180deg, ${color.replace('0.8', '0.4')} 0%, transparent 100%)`,
                filter: 'blur(10px)',
              }}
            />
          </div>

          {/* Glow effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${color.replace('0.8', '0.1')} 0%, transparent 70%)`,
            }}
          />
        </div>
      </>
    );
  }
);

RadarScan.displayName = 'RadarScan';

export default RadarScan;
