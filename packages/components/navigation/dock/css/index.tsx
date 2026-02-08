'use client';

import { forwardRef, HTMLAttributes, ReactNode, useRef, useState, useEffect, useCallback, MouseEvent } from 'react';
import styles from './dock.module.css';

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
      bottom: styles.positionBottom,
      top: styles.positionTop,
      left: styles.positionLeft,
      right: styles.positionRight,
    };

    const dockClasses = [
      styles.dock,
      positionClasses[position],
      styles[variant],
      className,
    ].filter(Boolean).join(' ');

    const isHorizontal = position === 'bottom' || position === 'top';

    return (
      <nav
        ref={ref as any}
        className={dockClasses}
        {...props}
      >
        <div ref={containerRef} className={styles.container}>
          <div className={styles.dockBackground} />
          <div
            className={styles.items}
            style={{
              gap: `${spacing}px`,
              flexDirection: isHorizontal ? 'row' : 'column',
            }}
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
                    ${styles.item}
                    ${item.active ? styles.itemActive : ''}
                    ${item.disabled ? styles.itemDisabled : ''}
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
                  <span className={styles.iconWrapper}>
                    {item.icon}
                  </span>
                  {item.badge && (
                    <span className={styles.badge}>
                      {item.badge}
                    </span>
                  )}
                  {item.active && (
                    <span className={styles.activeIndicator} />
                  )}
                  <span className={styles.tooltip}>
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
