'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './scattered-nav.module.css';

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

export const ScatteredNavItem = forwardRef<HTMLAnchorElement | HTMLDivElement, ScatteredNavItemProps>(
  ({ href, children, variant = 'default', scattered, glitchText, ...props }, ref) => {
    const classes = [
      styles.item,
      variant === 'logo' && styles.logo,
      variant === 'corrupt' && styles.corrupt,
      variant === 'status' && styles.status,
      variant === 'blink' && styles.blink,
      scattered && styles[`scattered${scattered}`],
    ].filter(Boolean).join(' ');

    const content = glitchText ? (
      <span className={styles.glitch} data-text={glitchText}>{children}</span>
    ) : variant === 'status' ? (
      <><span className={styles.statusDot} />{children}</>
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
      <nav ref={ref} className={`${styles.nav} ${className || ''}`} {...props}>
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
