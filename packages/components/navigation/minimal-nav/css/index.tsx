'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from '../minimal-nav.module.css';

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
        className={`${styles.minimalNav} ${styles[orientation]} ${styles[align]} ${styles[navStyle]} ${
          dividers ? styles.dividers : ''
        } ${className || ''}`}
        {...props}
      >
        {showCounter && (
          <span className={styles.counter}>
            {counterFormat(activeIndex + 1, items.length)}
          </span>
        )}

        <div className={styles.items}>
          {items.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              className={`${styles.item} ${item.active ? styles.active : ''} ${
                dividers && index < items.length - 1 ? styles.withDivider : ''
              }`}
              onClick={item.onClick}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span className={styles.label}>{item.label}</span>
              {item.active && <span className={styles.indicator} />}
            </a>
          ))}
        </div>
      </nav>
    );
  }
);

MinimalNav.displayName = 'MinimalNav';

export default MinimalNav;
