'use client';

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import styles from './scroll-indicator.module.css';

export interface ScrollIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  showArrow?: boolean;
  showPercentage?: boolean;
  variant?: 'default' | 'blood' | 'minimal';
  position?: 'right' | 'left';
  trackHeight?: number;
}

export const ScrollIndicator = forwardRef<HTMLDivElement, ScrollIndicatorProps>(
  ({ text = 'SCROLL', showArrow = false, showPercentage = false, variant = 'default', position = 'right', trackHeight = 100, className, ...props }, ref) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isPulsing, setIsPulsing] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
        
        // Trigger pulse effect
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 500);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
      
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const thumbTop = (scrollProgress / 100) * (trackHeight - 20); // 20 = thumb height

    const containerClasses = [
      styles.container,
      variant === 'blood' && styles.variantBlood,
      variant === 'minimal' && styles.variantMinimal,
      position === 'left' && styles.positionLeft,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div className={styles.inner}>
          {showArrow && <span className={styles.arrow}>↓</span>}
          
          <div className={styles.track} style={{ height: trackHeight }}>
            <div 
              className={`${styles.thumb} ${isPulsing ? styles.thumbPulsing : ''}`}
              style={{ top: thumbTop }}
            />
          </div>
          
          {text && <span className={styles.text}>{text}</span>}
          
          {showPercentage && (
            <span className={styles.percentage}>{Math.round(scrollProgress)}%</span>
          )}
        </div>
      </div>
    );
  }
);

ScrollIndicator.displayName = 'ScrollIndicator';
export default ScrollIndicator;
