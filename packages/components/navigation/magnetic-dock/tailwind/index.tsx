'use client';

import { forwardRef, HTMLAttributes, ReactNode, useRef, useState, useEffect, useCallback } from 'react';

export interface MagneticDockItem {
  id: string;
  label?: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface MagneticDockProps extends HTMLAttributes<HTMLElement> {
  /** Dock items */
  items: MagneticDockItem[];
  /** Position of the dock */
  position?: 'bottom' | 'top' | 'left' | 'right';
  /** Magnetic strength (0-1) */
  magneticStrength?: number;
  /** Spring stiffness for animation */
  stiffness?: number;
  /** Damping for animation */
  damping?: number;
  /** Dock size variant */
  size?: 'small' | 'medium' | 'large';
  /** Icon-only mode */
  iconOnly?: boolean;
  /** Style variant */
  variant?: 'glass' | 'solid' | 'neon' | 'brutal';
}

interface ItemState {
  x: number;
  y: number;
  scale: number;
}

export const MagneticDock = forwardRef<HTMLElement, MagneticDockProps>(
  (
    {
      items,
      position = 'bottom',
      magneticStrength = 0.3,
      stiffness = 0.1,
      damping = 0.8,
      size = 'medium',
      iconOnly = false,
      variant = 'glass',
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [itemStates, setItemStates] = useState<ItemState[]>(
      items.map(() => ({ x: 0, y: 0, scale: 1 }))
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
      const animate = () => {
        setItemStates(prevStates => {
          return prevStates.map((state, index) => {
            const itemEl = itemRefs.current[index];
            if (!itemEl) return state;

            const rect = itemEl.getBoundingClientRect();
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (!containerRect) return state;

            const itemCenterX = rect.left - containerRect.left + rect.width / 2;
            const itemCenterY = rect.top - containerRect.top + rect.height / 2;

            const dx = mousePos.x - itemCenterX;
            const dy = mousePos.y - itemCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 150;
            const influence = Math.max(0, 1 - distance / maxDistance);

            const targetX = dx * influence * magneticStrength * 30;
            const targetY = dy * influence * magneticStrength * 30;
            const targetScale = 1 + influence * 0.4;

            const newX = state.x + (targetX - state.x) * stiffness;
            const newY = state.y + (targetY - state.y) * stiffness;
            const newScale = state.scale + (targetScale - state.scale) * stiffness;

            return {
              x: newX * damping,
              y: newY * damping,
              scale: newScale,
            };
          });
        });

        requestAnimationFrame(animate);
      };

      const animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }, [mousePos, magneticStrength, stiffness, damping]);

    const positionClasses = {
      bottom: 'bottom-8 left-1/2 -translate-x-1/2',
      top: 'top-8 left-1/2 -translate-x-1/2',
      left: 'left-8 top-1/2 -translate-y-1/2',
      right: 'right-8 top-1/2 -translate-y-1/2',
    };

    const sizeClasses = {
      small: 'text-xs',
      medium: 'text-sm',
      large: 'text-base',
    };

    const gapClasses = {
      small: 'gap-1',
      medium: 'gap-2',
      large: 'gap-3',
    };

    const variantClasses = {
      glass: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg',
      solid: 'bg-black border border-white/10',
      neon: 'bg-cyan-400/5 backdrop-blur-xl border border-cyan-400/30 shadow-[0_0_20px_rgba(0,255,255,0.2)]',
      brutal: 'bg-rose-500 border-3 border-black shadow-[4px_4px_0_#000]',
    };

    const activeVariantClasses = {
      glass: 'bg-white/15',
      solid: 'bg-white/10',
      neon: 'text-cyan-400 [text-shadow:0_0_10px_#00ffff]',
      brutal: 'text-black font-bold',
    };

    const isHorizontal = position === 'bottom' || position === 'top';

    return (
      <nav
        ref={ref as any}
        className={`fixed z-[1000] font-sans ${positionClasses[position]} ${sizeClasses[size]} ${className || ''}`}
        {...props}
      >
        <div ref={containerRef} className="relative p-3">
          <div className={`absolute inset-0 rounded-full ${variantClasses[variant]} transition-all duration-300 hover:scale-[1.02]`} />

          <div className={`relative flex items-center ${isHorizontal ? 'flex-row' : 'flex-col'} ${gapClasses[size]}`}>
            {items.map((item, index) => {
              const state = itemStates[index] || { x: 0, y: 0, scale: 1 };
              const Tag = item.href ? 'a' : 'button';

              return (
                <Tag
                  key={item.id}
                  ref={el => { itemRefs.current[index] = el; }}
                  href={item.href}
                  className={`
                    relative flex items-center justify-center gap-2 min-w-[3rem] min-h-[3rem]
                    p-2 px-4 rounded-xl bg-transparent border-none text-current
                    text-decoration-none cursor-pointer transition-all duration-200
                    will-change-transform hover:bg-white/10
                    ${item.active ? activeVariantClasses[variant] : ''}
                    ${item.disabled ? 'opacity-30 cursor-not-allowed' : ''}
                  `}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  style={{
                    transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
                  }}
                >
                  {item.icon && <span className="flex items-center justify-center text-[1.25em]">{item.icon}</span>}
                  {!iconOnly && item.label && <span className="whitespace-nowrap font-medium">{item.label}</span>}
                  {item.active && (
                    <span className={`
                      absolute bg-current rounded-full
                      ${isHorizontal ? 'bottom-[-0.25rem] left-1/2 -translate-x-1/2 w-1 h-1' : 'left-[-0.25rem] top-1/2 -translate-y-1/2 w-1 h-1'}
                    `} />
                  )}
                </Tag>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }
);

MagneticDock.displayName = 'MagneticDock';

export default MagneticDock;
