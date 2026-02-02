'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './tension-meter.module.css';

export interface TensionMeterProps extends HTMLAttributes<HTMLDivElement> {
  /** Current tension level (0-100) */
  tension: number;
  /** Maximum tension */
  max?: number;
  /** Show numeric value */
  showValue?: boolean;
  /** Meter variant */
  variant?: 'critical' | 'warning' | 'normal' | 'auto';
  /** Bar style */
  barStyle?: 'solid' | 'segmented' | 'pulsing' | 'glitch';
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Label text */
  label?: string;
  /** Custom color for critical level */
  criticalColor?: string;
  /** Custom color for warning level */
  warningColor?: string;
  /** Custom color for normal level */
  normalColor?: string;
}

export const TensionMeter = forwardRef<HTMLDivElement, TensionMeterProps>(
  (
    {
      tension,
      max = 100,
      showValue = true,
      variant = 'auto',
      barStyle = 'solid',
      orientation = 'horizontal',
      label,
      criticalColor = '#ff0000',
      warningColor = '#ffaa00',
      normalColor = '#00ff00',
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (tension / max) * 100));

    // Auto-determine variant based on percentage
    const finalVariant =
      variant === 'auto'
        ? percentage >= 80
          ? 'critical'
          : percentage >= 50
          ? 'warning'
          : 'normal'
        : variant;

    const getColor = () => {
      switch (finalVariant) {
        case 'critical':
          return criticalColor;
        case 'warning':
          return warningColor;
        case 'normal':
          return normalColor;
      }
    };

    return (
      <div
        ref={ref}
        className={`${styles.tensionMeter} ${styles[orientation]} ${styles[barStyle]} ${styles[finalVariant]} ${className || ''}`}
        style={
          {
            '--percentage': `${percentage}%`,
            '--color': getColor(),
            '--critical-color': criticalColor,
            '--warning-color': warningColor,
            '--normal-color': normalColor,
          } as React.CSSProperties
        }
        {...props}
      >
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.track}>
          <div className={styles.bar}>
            {barStyle === 'segmented' && (
              <>
                <div className={styles.segment} style={{ left: '0%' }} />
                <div className={styles.segment} style={{ left: '20%' }} />
                <div className={styles.segment} style={{ left: '40%' }} />
                <div className={styles.segment} style={{ left: '60%' }} />
                <div className={styles.segment} style={{ left: '80%' }} />
              </>
            )}
          </div>
        </div>

        {showValue && (
          <div className={styles.value}>
            <span className={styles.number}>{Math.round(tension)}</span>
            <span className={styles.percent}>%</span>
          </div>
        )}

        {finalVariant === 'critical' && (
          <div className={styles.warningIndicator} aria-label="Critical tension" role="alert">
            ⚠
          </div>
        )}
      </div>
    );
  }
);

TensionMeter.displayName = 'TensionMeter';

export default TensionMeter;
