'use client';

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';

export interface ScrollIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  showArrow?: boolean;
  showPercentage?: boolean;
  variant?: 'default' | 'blood' | 'minimal';
  position?: 'right' | 'left';
  trackHeight?: number;
}

const variantStyles: Record<string, { track: string; thumb: string; text: string }> = {
  default: {
    track: 'bg-stone-700',
    thumb: 'bg-amber-500 shadow-[0_0_10px_rgba(201,162,39,0.3)]',
    text: 'text-stone-500',
  },
  blood: {
    track: 'bg-red-500/20',
    thumb: 'bg-red-500 shadow-[0_0_10px_rgba(255,0,64,0.5)]',
    text: 'text-gray-500',
  },
  minimal: {
    track: 'bg-stone-700',
    thumb: 'bg-amber-500',
    text: 'text-stone-500',
  },
};

export const ScrollIndicator = forwardRef<HTMLDivElement, ScrollIndicatorProps>(
  ({ text = 'SCROLL', showArrow = false, showPercentage = false, variant = 'default', position = 'right', trackHeight = 100, className, ...props }, ref) => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const colors = variantStyles[variant];
    const thumbTop = (scrollProgress / 100) * (trackHeight - 20);
    const isMinimal = variant === 'minimal';

    return (
      <div 
        ref={ref} 
        className={`
          fixed top-0 bottom-0 w-[60px] flex items-center justify-center z-50
          ${position === 'left' ? 'left-0' : 'right-0'}
          ${className || ''}
        `} 
        {...props}
      >
        <div className="flex flex-col items-center gap-4">
          {showArrow && (
            <span className={`animate-bounce ${variant === 'blood' ? 'text-red-500' : 'text-amber-500'}`}>
              ↓
            </span>
          )}
          
          <div 
            className={`relative rounded-sm ${isMinimal ? 'w-px' : 'w-0.5'} ${colors.track}`}
            style={{ height: trackHeight }}
          >
            <div 
              className={`
                absolute rounded transition-all duration-300
                ${isMinimal ? 'w-[3px] h-[10px] -left-px' : 'w-1.5 h-5 -left-0.5'}
                ${colors.thumb}
              `}
              style={{ top: thumbTop }}
            />
          </div>
          
          {text && !isMinimal && (
            <span className={`
              [writing-mode:vertical-rl] text-[0.5rem] tracking-[0.4em] uppercase font-serif
              ${position === 'left' ? '' : 'rotate-180'}
              ${colors.text}
            `}>
              {text}
            </span>
          )}
          
          {showPercentage && (
            <span className={`font-mono text-[0.6rem] ${variant === 'blood' ? 'text-red-500' : 'text-amber-500'}`}>
              {Math.round(scrollProgress)}%
            </span>
          )}
        </div>
      </div>
    );
  }
);

ScrollIndicator.displayName = 'ScrollIndicator';
export default ScrollIndicator;
