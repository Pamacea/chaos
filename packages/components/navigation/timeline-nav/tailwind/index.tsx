'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface TimelineEra {
  /** Era identifier/index */
  value: string | number;
  /** Label to display (e.g., year or era name) */
  label: string;
  /** Optional aria label for accessibility */
  ariaLabel?: string;
  /** Whether this era is currently active */
  active?: boolean;
  /** Additional data attributes */
  data?: Record<string, any>;
}

export interface TimelineNavProps extends HTMLAttributes<HTMLElement> {
  /** Array of eras/timeline points */
  eras: TimelineEra[];
  /** Orientation of the timeline */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when an era is clicked */
  onEraClick?: (era: TimelineEra, index: number) => void;
  /** Show labels */
  showLabels?: boolean;
  /** Show connecting line */
  showLine?: boolean;
  /** Dot size */
  dotSize?: 'small' | 'medium' | 'large';
}

const orientationClasses: Record<string, string> = {
  horizontal: 'flex-row items-center gap-6',
  vertical: 'flex-col items-center gap-8',
};

const lineClasses: Record<string, string> = {
  horizontal: 'top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-current to-transparent',
  vertical: 'left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-current to-transparent',
};

const dotSizeClasses: Record<string, string> = {
  small: 'w-2 h-2',
  medium: 'w-3 h-3',
  large: 'w-4.5 h-4.5',
};

const activeDotSizeClasses: Record<string, string> = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-9 h-9',
};

const labelClasses: Record<string, string> = {
  horizontal: 'top-full mt-2',
  vertical: 'left-full ml-3',
};

export const TimelineNav = forwardRef<HTMLElement, TimelineNavProps>(
  (
    {
      eras,
      orientation = 'horizontal',
      onEraClick,
      showLabels = true,
      showLine = true,
      dotSize = 'medium',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={`relative flex p-4 font-mono ${orientationClasses[orientation]} ${className || ''}`}
        aria-label="Timeline navigation"
        {...props}
      >
        {showLine && (
          <div className={`absolute bg-current opacity-30 ${lineClasses[orientation]}`} />
        )}

        <div className={`flex ${orientation === 'horizontal' ? 'flex-row items-center gap-6' : 'flex-col items-center gap-8'}`}>
          {eras.map((era) => (
            <button
              key={era.value}
              type="button"
              className={`flex items-center justify-center bg-transparent border-none cursor-pointer p-2 transition-all duration-300 relative z-10 ${orientation === 'horizontal' ? 'flex-col gap-2' : 'flex-row gap-3'} ${era.active ? 'scale-110' : 'hover:scale-110'}`}
              onClick={() => onEraClick?.(era, eras.indexOf(era))}
              aria-label={era.ariaLabel || `Era: ${era.label}`}
              aria-current={era.active ? 'step' : undefined}
              {...era.data}
            >
              {era.active && (
                <span className={`absolute rounded-full bg-current opacity-30 animate-[ring-expand_2s_ease-out_infinite] ${activeDotSizeClasses[dotSize]}`} />
              )}
              <span
                className={`rounded-full bg-current border-2 border-current transition-all duration-300 relative ${dotSizeClasses[dotSize]} ${era.active ? 'shadow-[0_0_20px_currentColor,0_0_40px_currentColor] animate-pulse' : 'hover:scale-125 hover:shadow-[0_0_20px_currentColor]'}`}
                aria-hidden="true"
              />
              {showLabels && (
                <span className={`absolute text-xs font-semibold tracking-wider uppercase whitespace-nowrap opacity-70 transition-all duration-300 ${labelClasses[orientation]} ${era.active ? 'opacity-100 font-bold' : ''} ${era.active ? '[text-shadow:0_0_10px_currentColor]' : ''}`}>
                  {era.label}
                </span>
              )}
            </button>
          ))}
        </div>

        <style>{`
          @keyframes ring-expand {
            0% { transform: scale(0.5); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
          }
        `}</style>
      </nav>
    );
  }
);

TimelineNav.displayName = 'TimelineNav';

export default TimelineNav;
