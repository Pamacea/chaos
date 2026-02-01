'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface TensionBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  labelLeft?: string;
  labelRight?: string;
  showPercentage?: boolean;
  showMarkers?: boolean;
  markerCount?: number;
  variant?: 'default' | 'gold' | 'danger' | 'segmented' | 'dramatic';
  size?: 'sm' | 'md' | 'lg';
  innerText?: string;
  animated?: boolean;
  dangerThreshold?: number;
}

const sizeHeights: Record<string, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-4',
};

const variantColors: Record<string, { fill: string; text: string }> = {
  default: { fill: 'bg-red-500', text: 'text-red-500' },
  gold: { fill: 'bg-gradient-to-r from-amber-700 to-amber-500', text: 'text-amber-500' },
  danger: { fill: 'bg-red-500', text: 'text-red-500' },
  segmented: { fill: 'bg-red-500', text: 'text-red-500' },
  dramatic: { fill: 'bg-red-500', text: 'text-red-500' },
};

export const TensionBar = forwardRef<HTMLDivElement, TensionBarProps>(
  ({ value, max = 100, labelLeft, labelRight, showPercentage = false, showMarkers = false, markerCount = 10, variant = 'default', size = 'md', innerText, animated = false, dangerThreshold = 80, className, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const isHigh = variant === 'danger' && percentage >= dangerThreshold;
    const colors = variantColors[variant];
    const height = sizeHeights[size];

    const renderSegmented = () => {
      const filledCount = Math.floor((percentage / 100) * markerCount);
      return (
        <div className="flex gap-0.5">
          {Array.from({ length: markerCount }).map((_, i) => (
            <div 
              key={i} 
              className={`
                flex-1 ${height} transition-colors
                ${i < filledCount ? colors.fill : 'bg-gray-800'}
              `}
            />
          ))}
        </div>
      );
    };

    return (
      <div ref={ref} className={`w-full relative font-mono ${className || ''}`} {...props}>
        {(labelLeft || labelRight) && (
          <div className="flex justify-between mb-2 text-[0.65rem] tracking-[0.2em] uppercase">
            <span className="text-gray-500">{labelLeft}</span>
            <span className={colors.text}>{labelRight}</span>
          </div>
        )}
        
        <div className={`
          relative overflow-hidden bg-gray-800
          ${innerText ? 'h-8 flex items-center px-4' : height}
          ${isHigh ? 'animate-pulse shadow-[0_0_10px_#ff0040]' : ''}
        `}>
          {innerText && (
            <span className="absolute left-4 text-xs text-stone-200 uppercase tracking-widest z-10">
              {innerText}
            </span>
          )}
          
          {variant === 'segmented' ? (
            renderSegmented()
          ) : (
            <div 
              className={`
                h-full transition-[width] duration-500 ease-out relative
                ${colors.fill}
                ${animated ? 'bg-[length:200%_100%] animate-[stripeMove_1s_linear_infinite] bg-[repeating-linear-gradient(45deg,#ff0040,#ff0040_10px,#cc0033_10px,#cc0033_20px)]' : ''}
              `}
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-r from-transparent to-white/30 animate-pulse" />
            </div>
          )}
          
          {showPercentage && (
            <span className={`absolute -top-6 right-0 text-xs font-bold ${colors.text}`}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>

        {showMarkers && variant !== 'segmented' && (
          <div className="flex justify-between mt-1">
            {Array.from({ length: markerCount + 1 }).map((_, i) => {
              const markerPercent = (i / markerCount) * 100;
              return (
                <div 
                  key={i} 
                  className={`
                    w-px h-1.5 transition-colors
                    ${markerPercent <= percentage ? colors.fill : 'bg-gray-700'}
                  `}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

TensionBar.displayName = 'TensionBar';
export default TensionBar;
