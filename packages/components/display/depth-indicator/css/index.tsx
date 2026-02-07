'use client';

import { HTMLAttributes } from 'react';
import styles from './depth-indicator.module.css';

export interface DepthIndicatorProps extends HTMLAttributes<HTMLDivElement> { 
  currentDepth: number; minDepth?: number; maxDepth?: number; unit?: string; label?: string; 
  position?: 'left' | 'right'; showValue?: boolean; barWidth?: number; barHeight?: number; 
}

export const DepthIndicator = ({ 
  currentDepth, minDepth = 0, maxDepth = 100, unit = 'm', label = 'DEPTH', 
  position = 'left', showValue = true, className = '', ...props 
}: DepthIndicatorProps) => {
  const percentage = Math.min(100, Math.max(0, ((currentDepth - minDepth) / (maxDepth - minDepth)) * 100));

  return (
    <div className={`${styles.indicator} ${styles[`indicator${position.charAt(0).toUpperCase() + position.slice(1)}`} ${className || ''}`} {...props}>
      <span className={styles.label}>{label}</span>
      <div className={styles.barContainer} style={{ width: '4px', height: `${Math.min(60, barHeight || 60)}vh` }}>
        <div className={styles.barFill} style={{ height: `${percentage}%` }} />
      </div>
      {showValue && <span className={styles.value}>{currentDepth}{unit}</span>}
    </div>
  );
};
export default DepthIndicator;
