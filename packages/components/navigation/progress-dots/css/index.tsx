'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './progress-dots.module.css';

export interface ProgressDotItem {
  id: string;
  label?: string;
  href?: string;
}

export interface ProgressDotsProps extends HTMLAttributes<HTMLDivElement> {
  items: ProgressDotItem[];
  activeId?: string;
  variant?: 'default' | 'gold' | 'minimal';
  direction?: 'vertical' | 'horizontal';
  showConnector?: boolean;
  onDotClick?: (id: string) => void;
}

export const ProgressDots = forwardRef<HTMLDivElement, ProgressDotsProps>(
  ({ items, activeId, variant = 'default', direction = 'vertical', showConnector = false, onDotClick, className, ...props }, ref) => {
    const containerClasses = [
      styles.container,
      variant === 'gold' && styles.variantGold,
      variant === 'minimal' && styles.variantMinimal,
      direction === 'horizontal' && styles.horizontal,
      showConnector && styles.withConnector,
      className,
    ].filter(Boolean).join(' ');

    const handleClick = (id: string, href?: string) => {
      if (onDotClick) {
        onDotClick(id);
      }
      if (href) {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {items.map((item) => (
          <button
            key={item.id}
            className={`${styles.dot} ${item.label ? styles.dotWithLabel : ''} ${activeId === item.id ? styles.dotActive : ''}`}
            onClick={() => handleClick(item.id, item.href)}
            aria-label={item.label || `Go to section ${item.id}`}
          >
            {item.label && <span className={styles.label}>{item.label}</span>}
          </button>
        ))}
      </div>
    );
  }
);

ProgressDots.displayName = 'ProgressDots';
export default ProgressDots;
