'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  icon?: string;
}

export interface MinimalNavProps extends HTMLAttributes<HTMLElement> {
  /** Navigation items */
  items: NavItem[];
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Alignment */
  align?: 'left' | 'center' | 'right';
  /** Show counter/progress */
  showCounter?: boolean;
  /** Counter format */
  counterFormat?: (index: number, total: number) => string;
  /** Show dividers between items */
  dividers?: boolean;
  /** Minimal style */
  style?: 'clean' | 'dotted' | 'solid' | 'ghost';
}

const orientationClasses: Record<string, string> = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
};

const alignClasses: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const styleClasses: Record<string, string> = {
  clean: 'px-2 py-1 hover:bg-black/5',
  dotted: 'border-b border-dotted border-current pb-1 hover:border-b-solid',
  solid: 'border-b border-b-solid border-current pb-1 hover:border-b-2',
  ghost: 'px-2 py-1 border-none hover:bg-rose-500 hover:text-white',
};

const activeStyleClasses: Record<string, string> = {
  clean: 'text-rose-500',
  dotted: 'border-b-2 border-rose-500',
  solid: 'border-b-2 border-rose-500',
  ghost: 'bg-rose-500 text-white',
};

export const MinimalNav = forwardRef<HTMLElement, MinimalNavProps>(
  (
    {
      items,
      orientation = 'horizontal',
      align = 'left',
      showCounter = false,
      counterFormat = (i, t) => `${i + 1}/${t}`,
      dividers = false,
      style: navStyle = 'clean',
      className,
      ...props
    },
    ref
  ) => {
    const activeIndex = items.findIndex(item => item.active);

    return (
      <nav
        ref={ref}
        className={`flex font-mono text-sm uppercase tracking-wider gap-4 ${orientationClasses[orientation]} ${alignClasses[align]} ${className || ''}`}
        {...props}
      >
        {showCounter && (
          <span className="opacity-50 text-xs whitespace-nowrap">
            {counterFormat(activeIndex + 1, items.length)}
          </span>
        )}

        <div className={`flex items-center gap-4 ${orientation === 'vertical' ? 'flex-col items-start' : ''} ${align === 'right' && orientation === 'vertical' ? 'items-end' : ''}`}>
          {items.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 text-current no-underline rounded-sm transition-all duration-200 relative ${styleClasses[navStyle]} ${item.active ? `font-bold ${activeStyleClasses[navStyle]}` : ''}`}
              onClick={item.onClick}
            >
              {item.icon && <span className="opacity-70">{item.icon}</span>}
              <span className="whitespace-nowrap">{item.label}</span>
              {item.active && (
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-current ${orientation === 'vertical' ? 'w-0.5 h-full top-0 left-0 translate-x-0' : 'w-full h-0.5'}`} />
              )}
              {dividers && index < items.length - 1 && (
                <span className={`opacity-30 ${orientation === 'vertical' ? 'relative right-auto bottom-[-0.5rem] left-1/2 -translate-x-1/2' : 'absolute -right-3'}`}>/</span>
              )}
            </a>
          ))}
        </div>
      </nav>
    );
  }
);

MinimalNav.displayName = 'MinimalNav';

export default MinimalNav;
