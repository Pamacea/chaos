'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './hexagon-menu.module.css';

export interface HexagonMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface HexagonMenuProps extends HTMLAttributes<HTMLElement> {
  items: HexagonMenuItem[];
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg';
}

export const HexagonMenu = forwardRef<HTMLElement, HexagonMenuProps>(
  ({ items, variant = 'cyan', size = 'md', className, ...props }, ref) => {
    return (
      <nav ref={ref} className={`${styles.menu} ${styles[variant]} ${styles[size]} ${className || ''}`} {...props}>
        {items.map((item, i) => (
          <button key={item.id} className={styles.item} onClick={item.onClick} style={{ marginTop: i % 2 === 1 ? 'var(--hex-offset)' : 0 }}>
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </nav>
    );
  }
);

HexagonMenu.displayName = 'HexagonMenu';
export default HexagonMenu;
