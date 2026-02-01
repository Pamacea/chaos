'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface VerticalNavItemProps {
  href?: string;
  glyph: string;
  label?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface VerticalNavProps extends HTMLAttributes<HTMLElement> {
  items?: VerticalNavItemProps[];
  runeTop?: string;
  runeBottom?: string;
  variant?: 'default' | 'dark';
  size?: 'default' | 'compact';
  children?: ReactNode;
}

export const VerticalNavItem = forwardRef<HTMLAnchorElement, VerticalNavItemProps>(
  ({ href, glyph, label, active, onClick, ...props }, ref) => {
    const baseClasses = `
      w-10 h-10 flex items-center justify-center font-display text-base
      border transition-all duration-300 relative group
      ${active 
        ? 'text-amber-500 border-amber-500 shadow-[0_0_15px_rgba(201,162,39,0.3)]' 
        : 'text-stone-500 border-stone-700 hover:text-amber-500 hover:border-amber-500 hover:bg-amber-500/10'
      }
    `;

    const labelEl = label && (
      <span className="absolute left-[60px] text-[0.6rem] tracking-[0.3em] text-stone-500 uppercase whitespace-nowrap opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
        {label}
      </span>
    );

    if (href) {
      return (
        <a ref={ref} href={href} className={baseClasses} onClick={onClick} {...props}>
          {glyph}
          {labelEl}
        </a>
      );
    }
    return (
      <button className={baseClasses} onClick={onClick} {...props}>
        {glyph}
        {labelEl}
      </button>
    );
  }
);

VerticalNavItem.displayName = 'VerticalNavItem';

export const VerticalNav = forwardRef<HTMLElement, VerticalNavProps>(
  ({ items, runeTop = 'ᛟ', runeBottom = 'ᛞ', variant = 'default', size = 'default', children, className, ...props }, ref) => {
    const navClasses = `
      fixed left-0 top-0 bottom-0 z-50 flex flex-col items-center justify-between
      ${size === 'compact' ? 'w-[50px] py-4' : 'w-20 py-8'}
      ${variant === 'dark' 
        ? 'bg-gradient-to-r from-black to-transparent border-r border-red-500' 
        : 'bg-gradient-to-r from-stone-900 to-transparent border-r border-stone-700'
      }
      ${className || ''}
    `;

    const runeClasses = `
      text-2xl animate-pulse
      ${variant === 'dark' ? 'text-red-500' : 'text-amber-700'}
    `;

    return (
      <nav ref={ref} className={navClasses} {...props}>
        <div className={runeClasses}>{runeTop}</div>
        <div className="flex flex-col gap-12">
          {items?.map((item, i) => (
            <VerticalNavItem key={i} {...item} />
          ))}
          {children}
        </div>
        <div className={runeClasses}>{runeBottom}</div>
      </nav>
    );
  }
);

VerticalNav.displayName = 'VerticalNav';
export default VerticalNav;
