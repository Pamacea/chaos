'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';

export interface GridItem {
  title: string;
  description?: string;
  span?: [number, number]; // [col, row] span
}

export interface BrokenGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Grid items to display */
  items: GridItem[];
  /** Number of columns (1-12) */
  columns?: number;
  /** Chaos level: 0-1, affects rotation/offset amount */
  chaosLevel?: number;
  /** Truncate text with █████ pattern */
  truncateText?: boolean;
  /** Add shadow on hover */
  hoverShadow?: boolean;
  /** Border style */
  borderStyle?: 'solid' | 'dashed' | 'double';
  /** Color variant */
  variant?: 'default' | 'dark' | 'accent';
}

/**
 * Pseudo-random number generator for consistent chaos per item
 */
function randomForIndex(index: number, seed: number = 12345): number {
  const x = Math.sin(index + seed) * 10000;
  return x - Math.floor(x);
}

function getChaosTransform(
  index: number,
  chaosLevel: number = 0.5
): { rotate: string; translate: string; zIndex: number } {
  const r1 = randomForIndex(index);
  const r2 = randomForIndex(index + 1000);
  const r3 = randomForIndex(index + 2000);

  // Rotation between -3deg and 3deg, scaled by chaosLevel
  const rotate = (r1 - 0.5) * 6 * chaosLevel;
  // Translation between -40px and 40px, scaled by chaosLevel
  const translateX = (r2 - 0.5) * 80 * chaosLevel;
  const translateY = (r3 - 0.5) * 80 * chaosLevel;
  // Random z-index for overlapping effect
  const zIndex = Math.floor(r1 * 5) + 1;

  return {
    rotate: `${rotate.toFixed(2)}deg`,
    translate: `${translateX.toFixed(0)}px, ${translateY.toFixed(0)}px`,
    zIndex,
  };
}

export const BrokenGrid = forwardRef<HTMLDivElement, BrokenGridProps>(
  (
    {
      items,
      columns = 3,
      chaosLevel = 0.5,
      truncateText = false,
      hoverShadow = false,
      borderStyle = 'solid',
      variant = 'default',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Generate transforms once on mount
    const transforms = useMemo(
      () => items.map((_, i) => getChaosTransform(i, chaosLevel)),
      [items.length, chaosLevel]
    );

    // Shadow color based on variant
    const shadowColor = variant === 'accent' ? '#c23a22' : '#e8c72e';
    const gridCols = columns > 0 && columns <= 12 ? `grid-cols-${columns}` : 'grid-cols-3';

    return (
      <div
        ref={ref}
        className={`grid gap-5 relative w-full ${gridCols} ${className}`}
        style={style}
        {...props}
      >
        {items.map((item, index) => {
          const { rotate, translate, zIndex } = transforms[index];
          const [colSpan, rowSpan] = item.span || [1, 1];

          return (
            <div
              key={index}
              className={`
                relative p-8 cursor-default overflow-hidden
                bg-neutral-800/30 border border-neutral-600
                transition-transform duration-200
                hover:z-10 hover:rotate-0 hover:translate-x-0 hover:translate-y-0
                ${borderStyle === 'dashed' ? 'border-dashed' : ''}
                ${borderStyle === 'double' ? 'border-2' : ''}
                ${hoverShadow ? `hover:[box-shadow:8px_8px_0_${shadowColor}]` : ''}
              `}
              style={{
                transform: `rotate(${rotate}) translate(${translate})`,
                zIndex,
                gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
                gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
              }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-yellow-500">
                {item.title}
              </h3>
              {item.description && (
                <p
                  className={`text-sm leading-relaxed opacity-70 text-neutral-300 ${
                    truncateText ? 'overflow-hidden max-h-[4.8em] relative' : ''
                  }`}
                >
                  {item.description}
                  {truncateText && (
                    <span className="absolute bottom-0 right-0 bg-neutral-800/30 text-neutral-600 pl-2 text-xs">
                      █████████
                    </span>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

BrokenGrid.displayName = 'BrokenGrid';

export default BrokenGrid;
