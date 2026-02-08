'use client';

import { forwardRef, HTMLAttributes, ReactNode, useRef, useState, useEffect, useCallback, MouseEvent } from 'react';

export interface DockItem {
  id: string;
  icon: ReactNode;
  label?: string;
  badge?: string | number;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface DockProps extends HTMLAttributes<HTMLElement> {
  /** Dock items to display */
  items: DockItem[];
  /** Maximum scale for hovered item (default: 1.5) */
  maxScale?: number;
  /** Spacing between items in px (default: 8) */
  spacing?: number;
  /** Base icon size in px (default: 48) */
  iconSize?: number;
  /** Position of the dock */
  position?: 'bottom' | 'top' | 'left' | 'right';
  /** Magnification range in px (default: 150) */
  magnificationRange?: number;
  /** Animation duration in ms (default: 200) */
  animationDuration?: number;
  /** Style variant */
  variant?: 'glass' | 'solid' | 'neon';
}

interface ItemScale {
  scale: number;
  x: number;
  y: number;
}

export const Dock = forwardRef<HTMLElement, DockProps>(
  (
    {
      items,
      maxScale = 1.5,
      spacing = 8,
      iconSize = 48,
      position = 'bottom',
      magnificationRange = 150,
      animationDuration = 200,
      variant = 'glass',
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [itemScales, setItemScales] = useState<ItemScale[]>(
      items.map(() => ({ scale: 1, x: 0, y: 0 }))
    );

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }, []);

    const handleMouseLeave = useCallback(() => {
      setMousePos({ x: -1000, y: -1000 });
    }, []);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [handleMouseMove, handleMouseLeave]);

    useEffect(() => {
      const calculateScales = () => {
        if (!containerRef.current) return;

        const newItemScales: ItemScale[] = items.map((_, index) => {
          const itemEl = itemRefs.current[index];
          if (!itemEl) return { scale: 1, x: 0, y: 0 };

          const rect = itemEl.getBoundingClientRect();
          const containerRect = containerRef.current!.getBoundingClientRect();

          const itemCenterX = rect.left - containerRect.left + rect.width / 2;
          const itemCenterY = rect.top - containerRect.top + rect.height / 2;

          const dx = mousePos.x - itemCenterX;
          const dy = mousePos.y - itemCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate scale based on distance using smooth curve
          const influence = Math.max(0, 1 - distance / magnificationRange);
          const scale = 1 + (maxScale - 1) * influence;

          // Calculate subtle offset for magnetic effect
          const offsetStrength = 5;
          const x = dx * influence * (offsetStrength / 100);
          const y = dy * influence * (offsetStrength / 100);

          return { scale, x, y };
        });

        setItemScales(newItemScales);
      };

      calculateScales();
    }, [mousePos, items.length, maxScale, magnificationRange]);

    const positionClasses = {
      bottom: 'bottom-6 left-1/2 -translate-x-1/2',
      top: 'top-6 left-1/2 -translate-x-1/2',
      left: 'left-6 top-1/2 -translate-y-1/2',
      right: 'right-6 top-1/2 -translate-y-1/2',
    };

    const variantClasses = {
      glass: [
        'bg-white/15 backdrop-blur-xl saturate-180',
        'border border-white/25',
        'shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)]',
        'hover:bg-white/20',
      ].join(' '),
      solid: [
        'bg-black/85',
        'border border-white/10',
        'shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
      ].join(' '),
      neon: [
        'bg-cyan-400/8',
        'border border-cyan-400/40',
        'shadow-[0_0_30px_rgba(0,255,255,0.2),0_8px_32px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(0,255,255,0.05)]',
        'hover:shadow-[0_0_40px_rgba(0,255,255,0.3),0_12px_48px_rgba(0,0,0,0.15),inset_0_0_30px_rgba(0,255,255,0.08)]',
      ].join(' '),
    };

    const isHorizontal = position === 'bottom' || position === 'top';

    return (
      <nav
        ref={ref as any}
        className={`fixed z-[1000] font-sans ${positionClasses[position]} ${className || ''}`}
        {...props}
      >
        <div ref={containerRef} className="relative p-2">
          <div className={`absolute inset-0 rounded-3xl transition-all duration-300 ${variantClasses[variant]}`} />

          <div
            className={`relative flex items-center justify-center ${isHorizontal ? 'flex-row' : 'flex-col'}`}
            style={{ gap: `${spacing}px` }}
          >
            {items.map((item, index) => {
              const { scale, x, y } = itemScales[index] || { scale: 1, x: 0, y: 0 };
              const Tag = item.href ? 'a' : 'button';

              return (
                <Tag
                  key={item.id}
                  ref={el => { itemRefs.current[index] = el; }}
                  href={item.href}
                  className={`
                    relative flex items-center justify-center flex-shrink-0
                    bg-transparent border-none rounded-xl cursor-pointer
                    transition-colors duration-200
                    will-change-transform hover:bg-white/10
                    ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                    ${variant === 'neon' && item.active ? 'shadow-[0_0_15px_rgba(0,255,255,0.5)]' : ''}
                  `}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    transform: `translate(${x}px, ${y}px) scale(${scale})`,
                    transition: `transform ${animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                  }}
                  aria-label={item.label}
                >
                  <span className="flex items-center justify-center w-full h-full">
                    {item.icon}
                  </span>

                  {item.badge && (
                    <span className={`
                      absolute top-[-4px] right-[-4px] min-w-[18px] h-[18px] px-[5px]
                      text-[11px] font-semibold leading-[18px] text-center rounded-full
                      pointer-events-none
                      ${variant === 'neon'
                        ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(0,255,255,0.5)]'
                        : 'bg-red-500 text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}

                  {item.active && (
                    <span className={`
                      absolute bg-current rounded-full opacity-80
                      ${isHorizontal
                        ? 'bottom-[-6px] left-1/2 -translate-x-1/2 w-1 h-1'
                        : 'right-[-6px] top-1/2 -translate-y-1/2 w-1 h-1'
                      }
                    `} />
                  )}

                  <span className={`
                    absolute opacity-0 pointer-events-none transition-all duration-200
                    px-3 py-1.5 bg-black/85 text-white text-xs font-medium whitespace-nowrap rounded-lg
                    ${isHorizontal
                      ? 'bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 translate-y-1'
                      : 'top-1/2 -translate-y-1/2 left-[calc(100%+12px)] -translate-x-1'
                    }
                    hover:opacity-100 hover:translate-y-0
                  `}>
                    {item.label}
                  </span>
                </Tag>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }
);

Dock.displayName = 'Dock';

export default Dock;
