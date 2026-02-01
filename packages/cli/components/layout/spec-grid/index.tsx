'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './spec-grid.module.css';

export interface SpecItem {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: string;
  highlighted?: boolean;
}

export interface SpecGridProps extends HTMLAttributes<HTMLDivElement> {
  specs: SpecItem[];
  variant?: 'cyan' | 'green' | 'amber' | 'blood';
  columns?: number;
  showHeader?: boolean;
  headerTitle?: string;
  compact?: boolean;
  striped?: boolean;
}

export const SpecGrid = forwardRef<HTMLDivElement, SpecGridProps>(
  ({ specs, variant = 'cyan', columns, showHeader = false, headerTitle = 'SYSTEM SPECS', compact = false, striped = false, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.grid} ${styles[variant]} ${compact ? styles.compact : ''} ${striped ? styles.striped : ''} ${className || ''}`}
        style={{ gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : undefined, ...style }}
        {...props}
      >
        {showHeader && (
          <div className={styles.header}>
            <span>{headerTitle}</span>
            <div className={styles.headerDots}><span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} /></div>
          </div>
        )}
        {specs.map((spec, index) => (
          <div key={index} className={`${styles.item} ${spec.icon ? styles.hasIcon : ''} ${spec.highlighted ? styles.highlighted : ''}`}>
            {spec.icon && <span className={styles.icon}>{spec.icon}</span>}
            <div className={styles.content}>
              <span className={styles.label}>{spec.label}</span>
              <span className={styles.value}>{spec.value}{spec.unit && <span className={styles.unit}>{spec.unit}</span>}</span>
              {spec.description && <span className={styles.description}>{spec.description}</span>}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

SpecGrid.displayName = 'SpecGrid';
export default SpecGrid;
