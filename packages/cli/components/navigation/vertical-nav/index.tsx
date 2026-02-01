'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './vertical-nav.module.css';

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
    const classes = [styles.glyph, active && styles.glyphActive].filter(Boolean).join(' ');
    
    if (href) {
      return <a ref={ref} href={href} className={classes} data-label={label} onClick={onClick} {...props}>{glyph}</a>;
    }
    return <button className={classes} data-label={label} onClick={onClick} {...props}>{glyph}</button>;
  }
);

VerticalNavItem.displayName = 'VerticalNavItem';

export const VerticalNav = forwardRef<HTMLElement, VerticalNavProps>(
  ({ items, runeTop = 'ᛟ', runeBottom = 'ᛞ', variant = 'default', size = 'default', children, className, ...props }, ref) => {
    const classes = [
      styles.nav,
      variant === 'dark' && styles.variantDark,
      size === 'compact' && styles.sizeCompact,
      className,
    ].filter(Boolean).join(' ');

    return (
      <nav ref={ref} className={classes} {...props}>
        <div className={styles.rune}>{runeTop}</div>
        <div className={styles.items}>
          {items?.map((item, i) => <VerticalNavItem key={i} {...item} />)}
          {children}
        </div>
        <div className={styles.rune}>{runeBottom}</div>
      </nav>
    );
  }
);

VerticalNav.displayName = 'VerticalNav';
export default VerticalNav;
