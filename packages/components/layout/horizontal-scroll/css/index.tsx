'use client';

import { forwardRef, HTMLAttributes, ReactNode, useRef, useState, useEffect } from 'react';
import styles from './horizontal-scroll.module.css';

export interface HorizontalScrollProps extends HTMLAttributes<HTMLDivElement> {
  /** Panel contents */
  children: ReactNode;
  /** Color variant */
  variant?: 'cyan' | 'green' | 'amber' | 'blood';
  /** Panel size */
  panelSize?: 'full' | 'large' | 'medium' | 'small';
  /** Show fade on edges */
  fadeEdges?: boolean;
  /** Show navigation indicators */
  showIndicators?: boolean;
  /** Gap between panels in rem */
  gap?: number;
}

export const HorizontalScroll = forwardRef<HTMLDivElement, HorizontalScrollProps>(
  (
    {
      children,
      variant = 'cyan',
      panelSize = 'large',
      fadeEdges = false,
      showIndicators = false,
      gap = 2,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [panelCount, setPanelCount] = useState(0);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const panels = container.querySelectorAll(`.${styles.panel}`);
      setPanelCount(panels.length);

      const handleScroll = () => {
        if (!container) return;
        const scrollLeft = container.scrollLeft;
        const panelWidth = container.scrollWidth / panels.length;
        setActiveIndex(Math.round(scrollLeft / panelWidth));
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }, [children]);

    const scrollToPanel = (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const panelWidth = container.scrollWidth / panelCount;
      container.scrollTo({ left: panelWidth * index, behavior: 'smooth' });
    };

    const panelSizeClass = {
      full: styles.panelFull,
      large: styles.panelLarge,
      medium: styles.panelMedium,
      small: styles.panelSmall,
    }[panelSize];

    return (
      <div className={className}>
        <div
          ref={(node) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={`${styles.container} ${styles[variant]} ${fadeEdges ? styles.fadeEdges : ''}`}
          style={{ '--panel-gap': `${gap}rem`, ...style } as React.CSSProperties}
          {...props}
        >
          <div className={styles.track}>
            {Array.isArray(children)
              ? children.map((child, i) => (
                  <div key={i} className={`${styles.panel} ${panelSizeClass}`}>
                    {child}
                  </div>
                ))
              : <div className={`${styles.panel} ${panelSizeClass}`}>{children}</div>
            }
          </div>
        </div>

        {showIndicators && panelCount > 1 && (
          <div className={styles.indicators}>
            {Array.from({ length: panelCount }).map((_, i) => (
              <button
                key={i}
                className={`${styles.indicator} ${i === activeIndex ? styles.indicatorActive : ''}`}
                onClick={() => scrollToPanel(i)}
                aria-label={`Go to panel ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

HorizontalScroll.displayName = 'HorizontalScroll';
export default HorizontalScroll;
