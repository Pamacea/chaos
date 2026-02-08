'use client';

import { forwardRef, HTMLAttributes, ReactNode, Children, cloneElement, isValidElement, useMemo } from 'react';
import styles from './animated-list.module.css';

export type AnimationType = 'fade' | 'slide' | 'scale' | 'blur';
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface AnimatedListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'animation'> {
  /** List items (should be valid React elements) */
  children: ReactNode;
  /** Animation type */
  animation?: AnimationType;
  /** Delay between items in ms */
  staggerDelay?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Direction for slide animations */
  direction?: Direction;
  /** Element type to render */
  as?: 'ul' | 'ol' | 'div';
}

const animationClassMap: Record<AnimationType, string> = {
  fade: styles.itemFade,
  slide: styles.itemSlideUp,
  scale: styles.itemScale,
  blur: styles.itemBlur,
};

const slideDirectionMap: Record<Direction, string> = {
  up: styles.itemSlideUp,
  down: styles.itemSlideDown,
  left: styles.itemSlideLeft,
  right: styles.itemSlideRight,
};

export const AnimatedList = forwardRef<HTMLUListElement, AnimatedListProps>(
  (
    {
      children,
      animation = 'fade',
      staggerDelay = 100,
      duration = 400,
      direction = 'up',
      as = 'ul',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const childrenArray = Children.toArray(children);

    const itemClass = useMemo(() => {
      if (animation === 'slide') {
        return slideDirectionMap[direction];
      }
      return animationClassMap[animation];
    }, [animation, direction]);

    const containerStyle = useMemo(() => ({
      '--anim-duration': `${duration}ms`,
      '--anim-delay': `${staggerDelay}ms`,
      ...style,
    }) as React.CSSProperties;

    const Element = as;

    return (
      <Element
        ref={ref}
        className={`${styles.list} ${className || ''}`}
        style={containerStyle}
        {...props}
      >
        {childrenArray.map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              key: child.key ?? index,
              className: `${styles.item} ${itemClass} ${child.props.className || ''}`,
              style: {
                '--item-delay': `${index * staggerDelay}ms`,
                ...child.props.style,
              } as React.CSSProperties,
            });
          }
          return (
            <li
              key={index}
              className={`${styles.item} ${itemClass}`}
              style={{ '--item-delay': `${index * staggerDelay}ms` } as React.CSSProperties}
            >
              {child}
            </li>
          );
        })}
      </Element>
    );
  }
);

AnimatedList.displayName = 'AnimatedList';

export default AnimatedList;
