'use client';

import React from 'react';
import styles from './collapsed-nav.module.css';

export interface NavItem { label: string; href: string; isActive?: boolean; }
export interface CollapsedNavProps { items: NavItem[]; chaosLevel?: 'low' | 'medium' | 'high'; className?: string; }

export const CollapsedNav = ({ items, chaosLevel = 'medium', className = '' }: CollapsedNavProps) => {
  const positions = [
    { top: '30px', left: '40px', transform: 'rotate(-2deg)' },
    { top: '80px', right: '120px', transform: 'rotate(1deg)' },
    { top: '200px', left: '200px', transform: 'rotate(3deg)' },
    { bottom: '100px', right: '40px', transform: 'rotate(-1deg)' },
    { top: '50%', left: '20px', transform: 'rotate(90deg) translateY(-50%)' },
  ];

  return (
    <nav className={`${styles.nav} ${className || ''}`}>
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          className={`${styles.item} ${item.isActive ? styles.itemActive : ''}`}
          style={{ ...positions[i % positions.length] } as React.CSSProperties}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};
export default CollapsedNav;
