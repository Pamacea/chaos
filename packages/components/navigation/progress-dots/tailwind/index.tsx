'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface ProgressDotItem {
  id: string;
  label?: string;
  href?: string;
}

export interface ProgressDotsProps extends HTMLAttributes<HTMLDivElement> {
  items: ProgressDotItem[];
  activeId?: string;
  variant?: 'default' | 'gold' | 'minimal';
  direction?: 'vertical' | 'horizontal';
  showConnector?: boolean;
  onDotClick?: (id: string) => void;
}

const variantColors: Record<string, { border: string; active: string; shadow: string }> = {
  default: { border: 'border-gray-600', active: 'border-red-500 shadow-[0_0_10px_rgba(255,0,64,0.5)]', shadow: 'bg-red-500' },
  gold: { border: 'border-amber-700', active: 'border-amber-500 shadow-[0_0_10px_rgba(201,162,39,0.5)]', shadow: 'bg-amber-500' },
  minimal: { border: 'border-gray-600', active: 'border-red-500', shadow: 'bg-red-500' },
};

export const ProgressDots = forwardRef<HTMLDivElement, ProgressDotsProps>(
  ({ items, activeId, variant = 'default', direction = 'vertical', showConnector = false, onDotClick, className, ...props }, ref) => {
    const colors = variantColors[variant];
    
    const containerClasses = `
      fixed z-50 flex gap-6
      ${direction === 'vertical' 
        ? 'right-8 top-1/2 -translate-y-1/2 flex-col' 
        : 'bottom-8 left-1/2 -translate-x-1/2 flex-row'
      }
      ${className || ''}
    `;

    const handleClick = (id: string, href?: string) => {
      if (onDotClick) onDotClick(id);
      if (href) {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          const dotSize = variant === 'minimal' ? 'w-2 h-2 border' : 'w-3 h-3 border-2';
          
          return (
            <button
              key={item.id}
              className={`
                ${dotSize} rounded-full bg-transparent cursor-pointer transition-all relative group
                ${isActive ? colors.active : `${colors.border} hover:border-red-500`}
              `}
              onClick={() => handleClick(item.id, item.href)}
              aria-label={item.label || `Go to section ${item.id}`}
            >
              {/* Inner dot */}
              <span className={`
                absolute inset-[2px] rounded-full transition-transform
                ${colors.shadow}
                ${isActive ? 'scale-100' : 'scale-0 group-hover:scale-50'}
              `} />
              
              {/* Label */}
              {item.label && (
                <span className={`
                  absolute whitespace-nowrap text-[0.6rem] tracking-[0.2em] uppercase font-mono
                  transition-opacity
                  ${direction === 'vertical' 
                    ? 'right-full top-1/2 -translate-y-1/2 pr-4' 
                    : 'bottom-full left-1/2 -translate-x-1/2 pb-2'
                  }
                  ${isActive ? 'opacity-100 text-red-500' : 'opacity-0 group-hover:opacity-100 text-gray-500'}
                `}>
                  {item.label}
                </span>
              )}
              
              {/* Connector */}
              {showConnector && (
                <span className={`
                  absolute bg-gray-700
                  ${direction === 'vertical' 
                    ? 'top-full left-1/2 -translate-x-1/2 w-px h-6' 
                    : 'left-full top-1/2 -translate-y-1/2 h-px w-6'
                  }
                  last:hidden
                `} />
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

ProgressDots.displayName = 'ProgressDots';
export default ProgressDots;
