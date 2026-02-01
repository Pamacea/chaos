'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './tension-bar.module.css';

export interface TensionBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  labelLeft?: string;
  labelRight?: string;
  showPercentage?: boolean;
  showMarkers?: boolean;
  markerCount?: number;
  variant?: 'default' | 'gold' | 'danger' | 'segmented' | 'dramatic';
  size?: 'sm' | 'md' | 'lg';
  innerText?: string;
  animated?: boolean;
  dangerThreshold?: number;
}

export const TensionBar = forwardRef<HTMLDivElement, TensionBarProps>(
  ({ value, max = 100, labelLeft, labelRight, showPercentage = false, showMarkers = false, markerCount = 10, variant = 'default', size = 'md', innerText, animated = false, dangerThreshold = 80, className, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const isHigh = variant === 'danger' && percentage >= dangerThreshold;

    const containerClasses = [
      styles.container,
      variant === 'gold' && styles.variantGold,
      variant === 'danger' && styles.variantDanger,
      variant === 'segmented' && styles.variantSegmented,
      variant === 'dramatic' && styles.variantDramatic,
      size === 'sm' && styles.sizeSm,
      size === 'lg' && styles.sizeLg,
      innerText && styles.withText,
      animated && styles.animated,
      isHigh && styles.high,
      className,
    ].filter(Boolean).join(' ');

    const renderSegmented = () => {
      const segments = [];
      const filledCount = Math.floor((percentage / 100) * markerCount);
      for (let i = 0; i < markerCount; i++) {
        segments.push(
          <div 
            key={i} 
            className={`${styles.segment} ${i < filledCount ? styles.segmentFilled : ''}`}
          />
        );
      }
      return segments;
    };

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {(labelLeft || labelRight) && (
          <div className={styles.labels}>
            <span className={styles.labelLeft}>{labelLeft}</span>
            <span className={styles.labelRight}>{labelRight}</span>
          </div>
        )}
        
        <div className={styles.track}>
          {innerText && <span className={styles.innerText}>{innerText}</span>}
          
          {variant === 'segmented' ? (
            renderSegmented()
          ) : (
            <div className={styles.fill} style={{ width: `${percentage}%` }} />
          )}
          
          {showPercentage && (
            <span className={styles.percentage}>{Math.round(percentage)}%</span>
          )}
        </div>

        {showMarkers && variant !== 'segmented' && (
          <div className={styles.markers}>
            {Array.from({ length: markerCount + 1 }).map((_, i) => {
              const markerPercent = (i / markerCount) * 100;
              return (
                <div 
                  key={i} 
                  className={`${styles.marker} ${markerPercent <= percentage ? styles.markerActive : ''}`}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

TensionBar.displayName = 'TensionBar';
export default TensionBar;
