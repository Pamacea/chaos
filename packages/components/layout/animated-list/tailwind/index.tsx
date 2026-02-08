'use client';

import { forwardRef, HTMLAttributes, ReactNode, Children, cloneElement, isValidElement, useMemo } from 'react';

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

const animationStyles = {
  fade: 'animate-fadeIn',
  slideUp: 'animate-slideUp',
  slideDown: 'animate-slideDown',
  slideLeft: 'animate-slideLeft',
  slideRight: 'animate-slideRight',
  scale: 'animate-scaleIn',
  blur: 'animate-blurIn',
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
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const childrenArray = Children.toArray(children);

    const itemAnimation = useMemo(() => {
      if (animation === 'slide') {
        const directionMap = {
          up: animationStyles.slideUp,
          down: animationStyles.slideDown,
          left: animationStyles.slideLeft,
          right: animationStyles.slideRight,
        } as const;
        return directionMap[direction];
      }
      return animationStyles[`${animation}Cap` as keyof typeof animationStyles] ?? animationStyles.fade;
    }, [animation, direction]);

    const Element = as;

    return (
      <>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideLeft {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideRight {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes blurIn {
            from { opacity: 0; filter: blur(10px); }
            to { opacity: 1; filter: blur(0); }
          }
        `}</style>
        <Element
          ref={ref}
          className={`list-none p-0 m-0 ${className}`}
          style={style}
          {...props}
        >
          {childrenArray.map((child, index) => {
            const itemStyle = {
              animation: `${itemAnimation} ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * staggerDelay}ms`,
              opacity: 0,
              ...((isValidElement(child) && (child.props as any).style) || {}),
            };

            if (isValidElement(child)) {
              return cloneElement(child, {
                key: child.key ?? index,
                className: child.props.className || '',
                style: itemStyle,
              });
            }
            return (
              <li key={index} className="" style={itemStyle}>
                {child}
              </li>
            );
          })}
        </Element>
      </>
    );
  }
);

AnimatedList.displayName = 'AnimatedList';

export default AnimatedList;
