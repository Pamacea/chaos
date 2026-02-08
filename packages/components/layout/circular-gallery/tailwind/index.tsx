'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState, useRef, useCallback, Children } from 'react';

export interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  radius?: number;
  autoRotate?: boolean;
  rotateSpeed?: number;
  itemSize?: number;
  onItemClick?: (index: number) => void;
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
      className = '',
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

    const getItemStyle = (index: number) => {
      const angle = (index / itemCount) * 360;
      return {
        '--item-angle': `${angle}deg`,
      } as React.CSSProperties;
    };

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={`relative flex items-center justify-center w-full ${className}`}
        style={{
          minHeight: `${radius * 2 + itemSize * 2}px`,
          padding: '2rem',
          ...style,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          className={`absolute rounded-full border border-dashed border-cyan-400/30 ${autoRotate && !isPaused ? 'animate-[rotate_var(--circular-duration)_linear_infinite]' : ''}`}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            '--circular-duration': `${rotateSpeed}s`,
          }}
        >
          {/* Inner circle decoration */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50"
            style={{ width: '20%', height: '20%' }}
          />

          {/* Outer ring with segments */}
          <div
            className="absolute -in-[10px] rounded-full opacity-20 animate-[rotate_var(--circular-duration)_linear_infinite]"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 240, 255, 0.3) 90deg, transparent 180deg, rgba(0, 240, 255, 0.3) 270deg, transparent 360deg)',
              '--circular-duration': `${rotateSpeed}s`,
            }}
          />
        </div>

        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className={`
                absolute top-1/2 left-1/2 cursor-pointer transition-all duration-300
                ${isActive ? 'opacity-100 z-10' : 'opacity-60 grayscale'}
                hover:opacity-100 hover:grayscale-0 hover:scale-110
              `}
              style={{
                width: `${itemSize}px`,
                height: `${itemSize}px`,
                transform: `translate(-50%, -50%) rotate(var(--item-angle)) translateY(-${radius}px) rotate(calc(var(--item-angle) * -1))`,
                ...getItemStyle(index),
              }}
              onClick={() => handleItemClick(index)}
            >
              {item}
              {isActive && (
                <>
                  <div className="absolute -in-1 border-2 border-cyan-400 rounded-full animate-[pulse-ring_2s_ease-in-out_infinite]" />
                  <div className="absolute -in-1 border-2 border-cyan-400 rounded-full animate-[item-glitch_0.3s_ease-out]" />
                </>
              )}
            </div>
          );
        })}

        {/* Center display for active item */}
        <div className="relative z-5 flex items-center justify-center animate-[float_3s_ease-in-out_infinite]" style={{ width: `${itemSize * 1.5}px`, height: `${itemSize * 1.5}px` }}>
          {items[activeIndex]}
        </div>

        <style>{`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-ring {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes item-glitch {
            0% { transform: translate(-50%, -50%) rotate(var(--item-angle)) translateY(-${radius}px) rotate(calc(var(--item-angle) * -1)) scale(1.3); }
            50% { transform: translate(-50%, -50%) rotate(calc(var(--item-angle) + 5deg)) translateY(-${radius}px) rotate(calc(var(--item-angle) * -1)) scale(1.2); }
            100% { transform: translate(-50%, -50%) rotate(var(--item-angle)) translateY(-${radius}px) rotate(calc(var(--item-angle) * -1)) scale(1); }
          }
        `}</style>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';
export default CircularGallery;
