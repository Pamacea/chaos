'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './cyber-slider.module.css';

export interface CyberSliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  showValue?: boolean;
}

export const CyberSlider = forwardRef<HTMLDivElement, CyberSliderProps>(
  ({ value, onChange, min = 0, max = 100, step = 1, variant = 'cyan', showValue = false, className, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return (
      <div ref={ref} className={`${styles.slider} ${styles[variant]} ${className || ''}`} {...props}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${percentage}%` }} />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={styles.input}
          />
          <div className={styles.thumb} style={{ left: `${percentage}%` }} />
        </div>
        {showValue && <span className={styles.value}>{value}</span>}
      </div>
    );
  }
);

CyberSlider.displayName = 'CyberSlider';
export default CyberSlider;
