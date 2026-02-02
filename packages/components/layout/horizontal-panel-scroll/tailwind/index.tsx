'use client';

import { forwardRef, useRef, useEffect, useState, HTMLAttributes } from 'react';

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
      className = '',
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

    const snapAlignClass = snapAlign === 'start' ? 'snap-start' : snapAlign === 'center' ? 'snap-center' : 'snap-end';

    return (
      <section
        ref={ref}
        className={`relative w-full overflow-hidden ${className}`}
        {...props}
      >
        <div
          ref={containerRef}
          className={`
            flex overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab
            active:cursor-grabbing -webkit-overflow-scrolling touch
            ${!showScrollbar ? 'scrollbar-hide' : 'scrollbar-thin scrollbar-auto'}
          `}
          style={{ gap }}
        >
          {panels.map((panel) => (
            <article
              key={panel.id}
              className={`flex-shrink-0 ${snapAlignClass} p-0`}
              style={{ width: `${panelWidth}%` }}
              aria-label={panel.ariaLabel}
            >
              {panel.label && (
                <header className="px-4 py-4 font-mono text-xs uppercase tracking-widest opacity-70">
                  {panel.label}
                </header>
              )}
              {panel.content}
            </article>
          ))}
        </div>

        {showNavDots && (
          <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10" aria-label="Panel navigation">
            {panels.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`
                  w-3 h-3 rounded-full border-2 border-current cursor-pointer transition-all duration-300
                  ${index === activeIndex
                    ? 'opacity-100 scale-125 shadow-[0_0_20px_currentColor]'
                    : 'opacity-30 hover:opacity-70 hover:scale-120'
                  }
                `}
                onClick={() => scrollToPanel(index)}
                aria-label={`Go to panel ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </nav>
        )}
      </section>
    );
  }
);

HorizontalPanelScroll.displayName = 'HorizontalPanelScroll';

export default HorizontalPanelScroll;
