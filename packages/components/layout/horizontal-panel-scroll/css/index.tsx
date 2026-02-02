'use client';

import { forwardRef, useRef, useEffect, useState, HTMLAttributes } from 'react';
import styles from './horizontal-panel-scroll.module.css';

export interface Panel {
  /** Unique identifier */
  id: string;
  /** Panel content */
  content: React.ReactNode;
  /** Optional label/title */
  label?: string;
  /** Optional aria label */
  ariaLabel?: string;
}

export interface HorizontalPanelScrollProps extends HTMLAttributes<HTMLElement> {
  /** Array of panels to display */
  panels: Panel[];
  /** Panel width percentage (default 100%) */
  panelWidth?: number;
  /** Scroll snap alignment */
  snapAlign?: 'start' | 'center' | 'end';
  /** Enable navigation dots */
  showNavDots?: boolean;
  /** Show scrollbar */
  showScrollbar?: boolean;
  /** Enable mouse drag scroll */
  dragScroll?: boolean;
  /** Auto-scroll interval (ms), 0 = disabled */
  autoScroll?: number;
  /** Scroll direction for auto-scroll */
  autoScrollDirection?: 'left' | 'right';
  /** Current active panel index (controlled) */
  activeIndex?: number;
  /** Callback when panel changes */
  onPanelChange?: (index: number, panel: Panel) => void;
  /** Gap between panels */
  gap?: string;
}

export const HorizontalPanelScroll = forwardRef<HTMLElement, HorizontalPanelScrollProps>(
  (
    {
      panels,
      panelWidth = 100,
      snapAlign = 'start',
      showNavDots = true,
      showScrollbar = false,
      dragScroll = true,
      autoScroll = 0,
      autoScrollDirection = 'right',
      activeIndex: controlledIndex,
      onPanelChange,
      gap = '0',
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [internalIndex, setInternalIndex] = useState(0);

    const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

    // Handle drag scrolling
    useEffect(() => {
      const container = containerRef.current;
      if (!container || !dragScroll) return;

      const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(container.scrollLeft);
        container.style.cursor = 'grabbing';
        container.style.userSelect = 'none';
      };

      const handleMouseLeave = () => {
        setIsDragging(false);
        if (container) {
          container.style.cursor = 'grab';
          container.style.userSelect = '';
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        if (container) {
          container.style.cursor = 'grab';
          container.style.userSelect = '';
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      };

      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mousemove', handleMouseMove);

      return () => {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }, [dragScroll, isDragging, startX, scrollLeft]);

    // Handle scroll to detect active panel
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleScroll = () => {
        const panelElements = container.children;
        const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        Array.from(panelElements).forEach((panel, index) => {
          const panelCenter = panel.getBoundingClientRect().left + panel.offsetWidth / 2;
          const distance = Math.abs(containerCenter - panelCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (controlledIndex === undefined && closestIndex !== internalIndex) {
          setInternalIndex(closestIndex);
          onPanelChange?.(closestIndex, panels[closestIndex]);
        }
      };

      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }, [controlledIndex, internalIndex, panels, onPanelChange]);

    // Auto-scroll
    useEffect(() => {
      if (autoScroll <= 0) return;

      const container = containerRef.current;
      if (!container) return;

      const interval = setInterval(() => {
        const scrollAmount = autoScrollDirection === 'right' ? 1 : -1;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }, autoScroll);

      return () => clearInterval(interval);
    }, [autoScroll, autoScrollDirection]);

    // Scroll to panel when activeIndex changes (controlled)
    useEffect(() => {
      if (controlledIndex === undefined) return;

      const container = containerRef.current;
      if (!container) return;

      const panel = container.children[controlledIndex];
      if (panel) {
        panel.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: snapAlign,
        });
      }
    }, [controlledIndex, snapAlign]);

    const scrollToPanel = (index: number) => {
      const container = containerRef.current;
      if (!container) return;

      const panel = container.children[index];
      if (panel) {
        panel.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: snapAlign,
        });
      }

      if (controlledIndex === undefined) {
        setInternalIndex(index);
        onPanelChange?.(index, panels[index]);
      }
    };

    return (
      <section
        ref={ref}
        className={`${styles.horizontalScroll} ${className || ''}`}
        {...props}
      >
        <div
          ref={containerRef}
          className={styles.track}
          style={{
            gap,
          }}
        >
          {panels.map((panel) => (
            <article
              key={panel.id}
              className={styles.panel}
              style={{ width: `${panelWidth}%` }}
              aria-label={panel.ariaLabel}
            >
              {panel.label && <header className={styles.panelLabel}>{panel.label}</header>}
              {panel.content}
            </article>
          ))}
        </div>

        {showNavDots && (
          <nav className={styles.navDots} aria-label="Panel navigation">
            {panels.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                onClick={() => scrollToPanel(index)}
                aria-label={`Go to panel ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </nav>
        )}

        {!showScrollbar && <div className={styles.hideScrollbar} />}
      </section>
    );
  }
);

HorizontalPanelScroll.displayName = 'HorizontalPanelScroll';

export default HorizontalPanelScroll;
