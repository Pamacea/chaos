'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface SpecItem {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: string;
  highlighted?: boolean;
}

export interface SpecGridProps extends HTMLAttributes<HTMLDivElement> {
  specs: SpecItem[];
  variant?: 'cyan' | 'green' | 'amber' | 'blood';
  columns?: number;
  showHeader?: boolean;
  headerTitle?: string;
  compact?: boolean;
  striped?: boolean;
}

const variantStyles = {
  cyan: { accent: 'text-cyan-400', headerBg: 'bg-cyan-400', hoverBg: 'hover:bg-cyan-400/5', borderHighlight: 'border-l-cyan-400' },
  green: { accent: 'text-emerald-400', headerBg: 'bg-emerald-400', hoverBg: 'hover:bg-emerald-400/5', borderHighlight: 'border-l-emerald-400' },
  amber: { accent: 'text-amber-400', headerBg: 'bg-amber-400', hoverBg: 'hover:bg-amber-400/5', borderHighlight: 'border-l-amber-400' },
  blood: { accent: 'text-red-800', headerBg: 'bg-red-800', hoverBg: 'hover:bg-red-800/5', borderHighlight: 'border-l-red-800' },
};

export const SpecGrid = forwardRef<HTMLDivElement, SpecGridProps>(
  ({ specs, variant = 'cyan', columns, showHeader = false, headerTitle = 'SYSTEM SPECS', compact = false, striped = false, className = '', style, ...props }, ref) => {
    const colors = variantStyles[variant];
    const gridCols = columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : {};

    return (
      <div
        ref={ref}
        className={`
          grid auto-rows-auto gap-px border border-white/10 bg-white/10
          font-['Share_Tech_Mono',monospace]
          ${!columns ? 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))]' : ''}
          ${className}
        `}
        style={{ ...gridCols, ...style }}
        {...props}
      >
        {showHeader && (
          <div className={`col-span-full py-3 px-6 ${colors.headerBg} text-black text-[0.7rem] font-bold uppercase tracking-[0.2em] flex justify-between items-center`}>
            <span>{headerTitle}</span>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-black/30" />
              <span className="w-2 h-2 rounded-full bg-black/30" />
              <span className="w-2 h-2 rounded-full bg-black/30" />
            </div>
          </div>
        )}

        {specs.map((spec, index) => (
          <div
            key={index}
            className={`
              ${compact ? 'p-4' : 'p-6'} bg-black/50 flex gap-4 transition-all duration-300
              ${colors.hoverBg}
              ${spec.icon ? 'flex-row items-start' : 'flex-col gap-2'}
              ${spec.highlighted ? `bg-cyan-400/10 border-l-2 ${colors.borderHighlight}` : ''}
              ${striped && index % 2 === 1 ? 'bg-white/[0.02]' : ''}
            `}
          >
            {spec.icon && <span className={`text-2xl ${colors.accent} opacity-60`}>{spec.icon}</span>}
            <div className="flex flex-col gap-1 flex-1">
              <span className={`text-[0.65rem] uppercase tracking-[0.2em] ${colors.accent} opacity-80`}>
                {spec.label}
              </span>
              <span className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-white leading-tight`}>
                {spec.value}
                {spec.unit && <span className="text-xs text-white/40 ml-1">{spec.unit}</span>}
              </span>
              {spec.description && (
                <span className="text-xs text-white/50 mt-2">{spec.description}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

SpecGrid.displayName = 'SpecGrid';
export default SpecGrid;
