'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface TensionMeterProps extends HTMLAttributes<HTMLDivElement> {
  /** Current tension level (0-100) */
  tension: number;
  /** Maximum tension */
  max?: number;
  /** Show numeric value */
  showValue?: boolean;
  /** Meter variant */
  variant?: 'critical' | 'warning' | 'normal' | 'auto';
  /** Bar style */
  barStyle?: 'solid' | 'segmented' | 'pulsing' | 'glitch';
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Label text */
  label?: string;
  /** Custom color for critical level */
  criticalColor?: string;
  /** Custom color for warning level */
  warningColor?: string;
  /** Custom color for normal level */
  normalColor?: string;
}

const variantColors = {
  critical: 'bg-red-500',
  warning: 'bg-amber-500',
  normal: 'bg-green-500',
};

export const TensionMeter = forwardRef<HTMLDivElement, TensionMeterProps>(
  (
    {
      tension,
      max = 100,
      showValue = true,
      variant = 'auto',
      barStyle = 'solid',
      orientation = 'horizontal',
      label,
      criticalColor = '#ff0000',
      warningColor = '#ffaa00',
      normalColor = '#00ff00',
      className = '',
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (tension / max) * 100));

    const finalVariant =
      variant === 'auto'
        ? percentage >= 80
          ? 'critical'
          : percentage >= 50
          ? 'warning'
          : 'normal'
        : variant;

    const getBarColor = () => {
      switch (finalVariant) {
        case 'critical':
          return criticalColor;
        case 'warning':
          return warningColor;
        case 'normal':
          return normalColor;
      }
    };

    const getBarClasses = () => {
      let classes = 'absolute transition-all duration-300';
      if (barStyle === 'pulsing') {
        classes += ' animate-[barPulse_1s_ease-in-out_infinite]';
      } else if (barStyle === 'glitch') {
        classes += ' animate-[barGlitch_0.3s_infinite]';
      } else {
        classes += finalVariant === 'critical' ? ' animate-[criticalBlink_0.5s_ease-in-out_infinite]' : '';
      }
      return classes;
    };

    const getTrackClasses = () => {
      if (orientation === 'horizontal') {
        return 'relative w-[200px] h-3 bg-black/30 rounded-md overflow-hidden';
      }
      return 'relative w-3 h-[200px] bg-black/30 rounded-md overflow-hidden';
    };

    const getBarPositionClasses = () => {
      if (orientation === 'horizontal') {
        return 'top-0 left-0 h-full';
      }
      return 'bottom-0 left-0 w-full';
    };

    return (
      <div
        ref={ref}
        className={`flex items-center gap-4 font-mono ${className}`}
        {...props}
      >
        {label && (
          <label className="text-xs font-semibold uppercase tracking-[0.1em] opacity-70 whitespace-nowrap">
            {label}
          </label>
        )}

        <div className={getTrackClasses()}>
          <div
            className={getBarClasses()}
            style={{
              ...getBarPositionClasses().split(' ').reduce((acc: Record<string, string>, cls: string) => {
                if (cls.includes('top-')) acc.top = cls.replace('top-', '');
                if (cls.includes('bottom-')) acc.bottom = cls.replace('bottom-', '');
                if (cls.includes('left-')) acc.left = cls.replace('left-', '');
                if (cls.includes('h-full')) acc.height = '100%';
                if (cls.includes('w-full')) acc.width = '100%';
                return acc;
              }, {}),
              width: orientation === 'horizontal' ? `${percentage}%` : '100%',
              height: orientation === 'vertical' ? `${percentage}%` : '100%',
              backgroundColor: getBarColor(),
              boxShadow: barStyle === 'solid' ? `0 0 10px ${getBarColor()}` : undefined,
            } as React.CSSProperties}
          >
            {barStyle === 'segmented' && (
              <>
                <span className="absolute top-0 bottom-0 w-0.5 bg-black/30" style={{ left: '0%' }} />
                <span className="absolute top-0 bottom-0 w-0.5 bg-black/30" style={{ left: '20%' }} />
                <span className="absolute top-0 bottom-0 w-0.5 bg-black/30" style={{ left: '40%' }} />
                <span className="absolute top-0 bottom-0 w-0.5 bg-black/30" style={{ left: '60%' }} />
                <span className="absolute top-0 bottom-0 w-0.5 bg-black/30" style={{ left: '80%' }} />
              </>
            )}
          </div>
        </div>

        {showValue && (
          <div className="flex items-baseline gap-0.5 font-bold">
            <span className="text-lg min-w-[3ch] text-right" style={{ color: getBarColor() }}>
              {Math.round(tension)}
            </span>
            <span className="text-xs opacity-70">%</span>
          </div>
        )}

        {finalVariant === 'critical' && (
          <div className="text-base animate-[warningPulse_0.5s_ease-in-out_infinite]" role="alert" aria-label="Critical tension">
            ⚠
          </div>
        )}

        <style>{`
          @keyframes warningPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          @keyframes barPulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 10px currentColor; }
            50% { opacity: 0.8; box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
          }
          @keyframes barGlitch {
            0%, 90%, 100% { transform: translateX(0); filter: hue-rotate(0deg); }
            92% { transform: translateX(-2px); filter: hue-rotate(90deg); }
            94% { transform: translateX(2px); filter: hue-rotate(180deg); }
            96% { transform: translateX(-1px); filter: hue-rotate(270deg); }
            98% { transform: translateX(1px); filter: hue-rotate(360deg); }
          }
          @keyframes criticalBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
      </div>
    );
  }
);

TensionMeter.displayName = 'TensionMeter';

export default TensionMeter;
