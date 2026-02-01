'use client';

import { forwardRef, HTMLAttributes, ReactNode, useRef, useState, useEffect } from 'react';

export interface HorizontalScrollProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'cyan' | 'green' | 'amber' | 'blood';
  panelSize?: 'full' | 'large' | 'medium' | 'small';
  fadeEdges?: boolean;
  showIndicators?: boolean;
  gap?: number;
}

const variantStyles = {
  cyan: { scrollbar: 'scrollbar-thumb-cyan-400', indicator: 'border-cyan-400 hover:bg-cyan-400 hover:shadow-[0_0_10px_#00f0ff]' },
  green: { scrollbar: 'scrollbar-thumb-emerald-400', indicator: 'border-emerald-400 hover:bg-emerald-400 hover:shadow-[0_0_10px_#00ff88]' },
  amber: { scrollbar: 'scrollbar-thumb-amber-400', indicator: 'border-amber-400 hover:bg-amber-400 hover:shadow-[0_0_10px_#ffaa00]' },
  blood: { scrollbar: 'scrollbar-thumb-red-800', indicator: 'border-red-800 hover:bg-red-800 hover:shadow-[0_0_10px_#8b1a1a]' },
};

const sizeClasses = {
  full: 'w-screen',
  large: 'w-[80vw]',
  medium: 'w-[60vw]',
  small: 'w-[40vw]',
};

export const HorizontalScroll = forwardRef<HTMLDivElement, HorizontalScrollProps>(
  ({ children, variant = 'cyan', panelSize = 'large', fadeEdges = false, showIndicators = false, gap = 2, className = '', ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [panelCount, setPanelCount] = useState(0);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const panels = container.querySelectorAll('[data-panel]');
      setPanelCount(panels.length);

      const handleScroll = () => {
        if (!container || panels.length === 0) return;
        const panelWidth = container.scrollWidth / panels.length;
        setActiveIndex(Math.round(container.scrollLeft / panelWidth));
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }, [children]);

    const scrollToPanel = (index: number) => {
      const container = containerRef.current;
      if (!container || panelCount === 0) return;
      const panelWidth = container.scrollWidth / panelCount;
      container.scrollTo({ left: panelWidth * index, behavior: 'smooth' });
    };

    const colors = variantStyles[variant];

    return (
      <div className={className}>
        <div
          ref={(node) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={`
            w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth
            scrollbar-thin scrollbar-track-black/30 ${colors.scrollbar}
            ${fadeEdges ? '[mask-image:linear-gradient(90deg,transparent_0%,black_5%,black_95%,transparent_100%)]' : ''}
          `}
          {...props}
        >
          <div className="flex w-max" style={{ gap: `${gap}rem`, padding: '1rem 0' }}>
            {Array.isArray(children)
              ? children.map((child, i) => (
                  <div key={i} data-panel className={`flex-none snap-start ${sizeClasses[panelSize]}`}>
                    {child}
                  </div>
                ))
              : <div data-panel className={`flex-none snap-start ${sizeClasses[panelSize]}`}>{children}</div>
            }
          </div>
        </div>

        {showIndicators && panelCount > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: panelCount }).map((_, i) => (
              <button
                key={i}
                className={`
                  w-2 h-2 rounded-full bg-black/30 border transition-all duration-300
                  ${colors.indicator}
                  ${i === activeIndex ? `${variant === 'cyan' ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : variant === 'green' ? 'bg-emerald-400 shadow-[0_0_10px_#00ff88]' : variant === 'amber' ? 'bg-amber-400 shadow-[0_0_10px_#ffaa00]' : 'bg-red-800 shadow-[0_0_10px_#8b1a1a]'}` : ''}
                `}
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
