'use client';

import { forwardRef, HTMLAttributes, ReactNode, useRef, useState, useEffect, useCallback } from 'react';
import styles from './magnetic-dock.module.css';

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
      bottom: styles.positionBottom,
      top: styles.positionTop,
      left: styles.positionLeft,
      right: styles.positionRight,
    };

    const sizeClasses = {
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
    };

    const dockClasses = [
      styles.magneticDock,
      positionClasses[position],
      sizeClasses[size],
      styles[variant],
      className,
    ].filter(Boolean).join(' ');

    return (
      <nav
        ref={ref as any}
        className={dockClasses}
        {...props}
      >
        <div ref={containerRef} className={styles.container}>
          <div className={styles.dockBackground} />
          <div className={styles.items}>
            {items.map((item, index) => {
              const state = itemStates[index] || { x: 0, y: 0, scale: 1 };
              const Tag = item.href ? 'a' : 'button';

              return (
                <Tag
                  key={item.id}
                  ref={el => { itemRefs.current[index] = el; }}
                  href={item.href}
                  className={`${styles.item} ${item.active ? styles.itemActive : ''} ${item.disabled ? styles.itemDisabled : ''}`}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  style={{
                    transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
                  }}
                >
                  {item.icon && <span className={styles.icon}>{item.icon}</span>}
                  {!iconOnly && item.label && <span className={styles.label}>{item.label}</span>}
                  {item.active && <span className={styles.activeIndicator} />}
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
