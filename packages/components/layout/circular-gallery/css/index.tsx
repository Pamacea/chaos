'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState, useRef, useCallback, Children, cloneElement, ReactElement } from 'react';
import styles from './circular-gallery.module.css';

export interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  /** Items to display in the circle */
  children: ReactNode;
  /** Circle radius in pixels */
  radius?: number;
  /** Enable auto-rotation */
  autoRotate?: boolean;
  /** Rotation duration in seconds */
  rotateSpeed?: number;
  /** Size of each item in pixels */
  itemSize?: number;
  /** Callback when an item is clicked */
  onItemClick?: (index: number) => void;
  /** Index of the currently focused item */
  activeIndex?: number;
}

export const CircularGallery = forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      children,
      radius = 200,
      autoRotate = true,
      rotateSpeed = 30,
      itemSize = 80,
      onItemClick,
      activeIndex: controlledActiveIndex,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [internalActiveIndex, setInternalActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeIndex = controlledActiveIndex ?? internalActiveIndex;

    const items = Children.toArray(children);
    const itemCount = items.length;

    const handleItemClick = useCallback(
      (index: number) => {
        setInternalActiveIndex(index);
        onItemClick?.(index);
      },
      [onItemClick]
    );

    const handleMouseEnter = useCallback(() => {
      if (autoRotate) setIsPaused(true);
    }, [autoRotate]);

    const handleMouseLeave = useCallback(() => {
      if (autoRotate) setIsPaused(false);
    }, [autoRotate]);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={`${styles.container} ${className || ''}`}
        style={
          {
            '--circular-radius': `${radius}px`,
            '--circular-item-size': `${itemSize}px`,
            '--circular-duration': `${rotateSpeed}s`,
            ...style,
          } as React.CSSProperties
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          className={`${styles.rotator} ${autoRotate && !isPaused ? styles.rotating : ''}`}
          style={
            {
              '--item-count': itemCount,
            } as React.CSSProperties
          }
        >
          {items.map((item, index) => {
            const angle = (index / itemCount) * 360;
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                style={
                  {
                    '--item-angle': `${angle}deg`,
                  } as React.CSSProperties
                }
                onClick={() => handleItemClick(index)}
              >
                {item}
              </div>
            );
          })}
        </div>

        {/* Center display for active item */}
        {items[activeIndex] && (
          <div className={styles.centerDisplay}>
            {items[activeIndex]}
          </div>
        )}
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';
export default CircularGallery;
