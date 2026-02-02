'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface CornerNavProps extends HTMLAttributes<HTMLElement> {
  /** Corner position */
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Navigation items */
  items: Array<{
    id: string;
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: string;
    active?: boolean;
  }>;
  /** Nav style */
  style?: 'ornate' | 'minimal' | 'brutal' | 'neon';
  /** Orientation of items */
  orientation?: 'horizontal' | 'vertical' | 'diagonal';
  /** Show corner decorations */
  decorations?: boolean;
}

const cornerClasses: Record<string, string> = {
  'top-left': 'top-6 left-6',
  'top-right': 'top-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'bottom-right': 'bottom-6 right-6',
};

const orientationClasses: Record<string, string> = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
  diagonal: 'flex-col',
};

const styleClasses: Record<string, { nav: string; item: string; activeItem: string }> = {
  ornate: {
    nav: '',
    item: 'rounded-sm',
    activeItem: 'font-bold',
  },
  minimal: {
    nav: '',
    item: 'rounded-sm',
    activeItem: 'font-bold',
  },
  brutal: {
    nav: '',
    item: 'bg-black text-white border-2 border-rose-500 px-4 py-2',
    activeItem: 'font-bold',
  },
  neon: {
    nav: '',
    item: 'text-cyan-400 text-cyan-400 border border-cyan-400 bg-cyan-400/10 shadow-[0_0_10px_#00ffff]',
    activeItem: 'font-bold',
  },
};

export const CornerNav = forwardRef<HTMLElement, CornerNavProps>(
  (
    {
      corner = 'top-left',
      items,
      style: navStyle = 'ornate',
      orientation = 'horizontal',
      decorations = true,
      className,
      ...props
    },
    ref
  ) => {
    const styleConfig = styleClasses[navStyle];

    return (
      <nav
        ref={ref}
        className={`fixed z-[100] flex gap-4 font-mono text-xs uppercase tracking-widest ${cornerClasses[corner]} ${styleConfig.nav} ${className || ''}`}
        {...props}
      >
        {decorations && (
          <>
            <div className="absolute bg-current opacity-50" aria-hidden="true" style={{ width: '20px', height: '2px' }} />
            <div className="absolute bg-current opacity-50" aria-hidden="true" style={{ width: '2px', height: '20px' }} />
          </>
        )}

        <div className={`flex gap-4 ${orientationClasses[orientation]} ${navStyle === 'brutal' ? 'gap-2' : ''}`}>
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 text-current no-underline opacity-70 transition-all duration-300 px-2 py-1 ${styleConfig.item} ${item.active ? `opacity-100 ${styleConfig.activeItem}` : ''} hover:opacity-100 hover:-translate-y-0.5 ${navStyle === 'brutal' ? 'hover:bg-rose-500' : ''} ${navStyle === 'neon' ? 'hover:bg-cyan-400/20 hover:shadow-[0_0_20px_#00ffff,inset_0_0_20px_rgba(0,255,255,0.1)]' : ''}`}
              onClick={item.onClick}
            >
              {item.icon && <span className="text-sm opacity-80">{item.icon}</span>}
              <span className="whitespace-nowrap">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    );
  }
);

CornerNav.displayName = 'CornerNav';

export default CornerNav;
