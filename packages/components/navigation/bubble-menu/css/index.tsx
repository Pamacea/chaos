'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState, useCallback, MouseEvent } from 'react';
import styles from './bubble-menu.module.css';

export interface BubbleMenuItem {
  id: string;
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface BubbleMenuProps extends HTMLAttributes<HTMLElement> {
  /** Menu items to display */
  items: BubbleMenuItem[];
  /** Size of each bubble in px (default: 60) */
  bubbleSize?: number;
  /** Spacing between bubbles in px (default: 16) */
  spacing?: number;
  /** Enable floating animation (default: true) */
  floating?: boolean;
  /** Alignment of bubbles (default: 'center') */
  align?: 'center' | 'left' | 'right';
  /** Style variant */
  variant?: 'glass' | 'solid' | 'neon' | 'pastel';
  /** Animation speed multiplier (default: 1) */
  animationSpeed?: number;
}

interface BubbleState {
  hovered: boolean;
  popOffset: number;
}

export const BubbleMenu = forwardRef<HTMLElement, BubbleMenuProps>(
  (
    {
      items,
      bubbleSize = 60,
      spacing = 16,
      floating = true,
      align = 'center',
      variant = 'glass',
      animationSpeed = 1,
      className,
      ...props
    },
    ref
  ) => {
    const [bubbleStates, setBubbleStates] = useState<BubbleState[]>(
      items.map(() => ({ hovered: false, popOffset: 0 }))
    );

    const handleBubbleEnter = useCallback((index: number) => {
      setBubbleStates(prev => {
        const newStates = [...prev];
        newStates[index] = { hovered: true, popOffset: 8 };
        return newStates;
      });
    }, []);

    const handleBubbleLeave = useCallback((index: number) => {
      setBubbleStates(prev => {
        const newStates = [...prev];
        newStates[index] = { hovered: false, popOffset: 0 };
        return newStates;
      });
    }, []);

    const alignClasses = {
      center: styles.alignCenter,
      left: styles.alignLeft,
      right: styles.alignRight,
    };

    const menuClasses = [
      styles.bubbleMenu,
      alignClasses[align],
      styles[variant],
      !floating && styles.noFloat,
      className,
    ].filter(Boolean).join(' ');

    // Generate unique animation delays for each bubble
    const getAnimationDelay = (index: number) => {
      const baseDelay = index * 0.15;
      return `${baseDelay}s`;
    };

    const getAnimationDuration = () => {
      return `${3 / animationSpeed}s`;
    };

    return (
      <nav
        ref={ref as any}
        className={menuClasses}
        {...props}
      >
        <div
          className={styles.bubbleContainer}
          style={{
            gap: `${spacing}px`,
          }}
        >
          {items.map((item, index) => {
            const { hovered, popOffset } = bubbleStates[index] || { hovered: false, popOffset: 0 };
            const Tag = item.href ? 'a' : 'button';

            return (
              <Tag
                key={item.id}
                href={item.href}
                className={`
                  ${styles.bubble}
                  ${item.active ? styles.bubbleActive : ''}
                  ${item.disabled ? styles.bubbleDisabled : ''}
                  ${hovered ? styles.bubbleHovered : ''}
                `}
                onClick={item.onClick}
                disabled={item.disabled}
                onMouseEnter={() => handleBubbleEnter(index)}
                onMouseLeave={() => handleBubbleLeave(index)}
                style={{
                  width: `${bubbleSize}px`,
                  height: `${bubbleSize}px`,
                  animationDelay: getAnimationDelay(index),
                  animationDuration: getAnimationDuration(),
                  transform: hovered ? `translateY(-${popOffset}px) scale(1.1)` : 'translateY(0) scale(1)',
                }}
                aria-label={item.label}
              >
                <span className={styles.bubbleInner}>
                  <span className={styles.iconWrapper}>
                    {item.icon}
                  </span>
                  {item.label && (
                    <span className={styles.bubbleLabel}>{item.label}</span>
                  )}
                </span>

                {/* Ripple effect elements */}
                <span className={styles.ripple} />
                <span className={styles.ripple} style={{ animationDelay: '0.5s' }} />
                <span className={styles.ripple} style={{ animationDelay: '1s' }} />

                {item.active && (
                  <span className={styles.activeRing} />
                )}
              </Tag>
            );
          })}
        </div>
      </nav>
    );
  }
);

BubbleMenu.displayName = 'BubbleMenu';

export default BubbleMenu;
