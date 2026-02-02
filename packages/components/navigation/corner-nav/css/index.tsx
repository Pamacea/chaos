'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from '../corner-nav.module.css';

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
    return (
      <nav
        ref={ref}
        className={`${styles.cornerNav} ${styles[corner]} ${styles[navStyle]} ${styles[orientation]} ${
          decorations ? styles.decorated : ''
        } ${className || ''}`}
        {...props}
      >
        {decorations && (
          <>
            <div className={styles.cornerPiece} aria-hidden="true" />
            <div className={styles.cornerPiece} aria-hidden="true" />
          </>
        )}

        <div className={styles.items}>
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`${styles.item} ${item.active ? styles.active : ''}`}
              onClick={item.onClick}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span className={styles.label}>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    );
  }
);

CornerNav.displayName = 'CornerNav';

export default CornerNav;
