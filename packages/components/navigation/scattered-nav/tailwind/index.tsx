'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface ScatteredNavItemProps {
  href?: string;
  children: ReactNode;
  variant?: 'default' | 'logo' | 'corrupt' | 'status' | 'blink';
  scattered?: 1 | 2 | 3 | 4 | 5;
  glitchText?: string;
}

export interface ScatteredNavProps extends HTMLAttributes<HTMLElement> {
  items?: ScatteredNavItemProps[];
  children?: ReactNode;
}

const scatteredClasses: Record<number, string> = {
  1: 'translate-y-[3px]',
  2: '-rotate-2 border-l border-red-500',
  3: '-translate-y-[2px] rotate-1',
  4: '-translate-x-[3px]',
  5: 'rotate-[1.5deg] translate-y-[1px]',
};

const variantClasses: Record<string, string> = {
  default: 'text-gray-500 hover:bg-red-500 hover:text-black',
  logo: 'bg-red-500 text-black font-display text-xl px-6',
  corrupt: 'font-mono text-red-500 text-[0.6rem] opacity-50 animate-pulse',
  status: 'ml-auto bg-black/30 px-6 text-[0.6rem]',
  blink: 'text-red-500 animate-pulse',
};

export const ScatteredNavItem = forwardRef<HTMLAnchorElement | HTMLDivElement, ScatteredNavItemProps>(
  ({ href, children, variant = 'default', scattered, glitchText, ...props }, ref) => {
    const classes = `
      flex items-center justify-center px-4 h-full text-[0.7rem] tracking-widest uppercase
      font-mono border-r border-white/10 transition-all
      ${variantClasses[variant]}
      ${scattered ? scatteredClasses[scattered] : ''}
    `;

    const content = variant === 'status' ? (
      <>
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-2" />
        {children}
      </>
    ) : children;

    if (href) {
      return <a ref={ref as any} href={href} className={classes} {...props}>{content}</a>;
    }
    return <div ref={ref as any} className={classes} {...props}>{content}</div>;
  }
);

ScatteredNavItem.displayName = 'ScatteredNavItem';

export const ScatteredNav = forwardRef<HTMLElement, ScatteredNavProps>(
  ({ items, children, className, ...props }, ref) => {
    return (
      <nav 
        ref={ref} 
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] bg-black border-b border-red-500 flex items-center px-4 ${className || ''}`} 
        {...props}
      >
        {items?.map((item, i) => (
          <ScatteredNavItem key={i} {...item} />
        ))}
        {children}
      </nav>
    );
  }
);

ScatteredNav.displayName = 'ScatteredNav';
export default ScatteredNav;
