'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from '../timeline-nav.module.css';

export interface TimelineEra {
  /** Era identifier/index */
  value: string | number;
  /** Label to display (e.g., year or era name) */
  label: string;
  /** Optional aria label for accessibility */
  ariaLabel?: string;
  /** Whether this era is currently active */
  active?: boolean;
  /** Additional data attributes */
  data?: Record<string, any>;
}

export interface TimelineNavProps extends HTMLAttributes<HTMLElement> {
  /** Array of eras/timeline points */
  eras: TimelineEra[];
  /** Orientation of the timeline */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when an era is clicked */
  onEraClick?: (era: TimelineEra, index: number) => void;
  /** Show labels */
  showLabels?: boolean;
  /** Show connecting line */
  showLine?: boolean;
  /** Dot size */
  dotSize?: 'small' | 'medium' | 'large';
}

export const TimelineNav = forwardRef<HTMLElement, TimelineNavProps>(
  (
    {
      eras,
      orientation = 'horizontal',
      onEraClick,
      showLabels = true,
      showLine = true,
      dotSize = 'medium',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={`${styles.timelineNav} ${styles[orientation]} ${styles[dotSize]} ${className || ''}`}
        aria-label="Timeline navigation"
        {...props}
      >
        {showLine && <div className={styles.timelineLine} />}

        <div className={styles.erasContainer}>
          {eras.map((era, index) => (
            <button
              key={era.value}
              type="button"
              className={`${styles.eraMarker} ${era.active ? styles.active : ''}`}
              onClick={() => onEraClick?.(era, index)}
              aria-label={era.ariaLabel || `Era: ${era.label}`}
              aria-current={era.active ? 'step' : undefined}
              {...era.data}
            >
              <span className={styles.eraDot} aria-hidden="true" />
              {showLabels && <span className={styles.eraLabel}>{era.label}</span>}
            </button>
          ))}
        </div>
      </nav>
    );
  }
);

TimelineNav.displayName = 'TimelineNav';

export default TimelineNav;
