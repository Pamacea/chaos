'use client';

import React from 'react';
import styles from './broken-grid.module.css';

export interface GridItem { title: string; description?: string; span?: [number, number]; }
export interface BrokenGridProps { items: GridItem[]; columns?: number; chaosLevel?: number; truncateText?: boolean; hoverShadow?: boolean; borderStyle?: 'solid' | 'dashed' | 'double'; className?: string; }

export const BrokenGrid = ({ items, columns = 3, chaosLevel = 0.5, truncateText = true, hoverShadow = true, borderStyle = 'solid', className = '' }: BrokenGridProps) => {
  const getTransform = (i: number) => {
    const rot = (Math.sin(i) * chaosLevel * 5);
    const transX = (Math.cos(i * 1.5) * chaosLevel * 20);
    const transY = (Math.sin(i * 2.3) * chaosLevel * 15);
    return `translate(${transX}px, ${transY}px) rotate(${rot}deg)`;
  };

  return (
    <div className={`${styles.grid} ${className || ''}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {items.map((item, i) => (
        <div key={i} className={styles.item} style={{ transform: getTransform(i), borderStyle, gridColumn: item.span ? `span ${item.span[0]}` : 'auto', gridRow: item.span ? `span ${item.span[1]}` : 'auto' }}>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '15px', color: '#e8c72e' }}>{item.title}</h3>
          {item.description && (
            <p className={truncateText ? styles.truncated : ''} style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.7 }}>
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
export default BrokenGrid;
