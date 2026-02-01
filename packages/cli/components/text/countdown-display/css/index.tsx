'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef } from 'react';
import styles from './countdown-display.module.css';

export interface CountdownDisplayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Target date/time or duration in seconds */
  target: Date | number;
  /** Display format */
  format?: 'full' | 'hms' | 'ms' | 'dhms';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'minimal' | 'neon' | 'brutal' | 'glitch';
  /** Accent color */
  accentColor?: string;
  /** Show labels under numbers */
  showLabels?: boolean;
  /** Compact mode (less spacing) */
  compact?: boolean;
  /** Enable flip animation */
  flip?: boolean;
  /** Urgent mode threshold (seconds) - when to show urgency effect */
  urgentThreshold?: number;
  /** Callback when countdown reaches zero */
  onComplete?: () => void;
  /** Labels customization */
  labels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownDisplay = forwardRef<HTMLDivElement, CountdownDisplayProps>(
  (
    {
      target,
      format = 'hms',
      size = 'md',
      variant = 'default',
      accentColor = '#ff0040',
      showLabels = true,
      compact = false,
      flip = false,
      urgentThreshold = 60,
      onComplete,
      labels = {},
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isUrgent, setIsUrgent] = useState(false);
    const [changing, setChanging] = useState<string[]>([]);
    const prevValues = useRef<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const completedRef = useRef(false);

    const defaultLabels = {
      days: labels.days || 'DAYS',
      hours: labels.hours || 'HOURS',
      minutes: labels.minutes || 'MIN',
      seconds: labels.seconds || 'SEC',
    };

    useEffect(() => {
      const calculateTimeLeft = (): TimeLeft => {
        let totalSeconds: number;
        
        if (target instanceof Date) {
          totalSeconds = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000));
        } else {
          totalSeconds = Math.max(0, target);
        }

        return {
          days: Math.floor(totalSeconds / (24 * 60 * 60)),
          hours: Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)),
          minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
          seconds: totalSeconds % 60,
        };
      };

      const tick = () => {
        const newTime = calculateTimeLeft();
        const totalSeconds = newTime.days * 86400 + newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds;
        
        // Detect changes for flip animation
        if (flip) {
          const changed: string[] = [];
          if (newTime.days !== prevValues.current.days) changed.push('days');
          if (newTime.hours !== prevValues.current.hours) changed.push('hours');
          if (newTime.minutes !== prevValues.current.minutes) changed.push('minutes');
          if (newTime.seconds !== prevValues.current.seconds) changed.push('seconds');
          setChanging(changed);
          setTimeout(() => setChanging([]), 300);
        }

        prevValues.current = newTime;
        setTimeLeft(newTime);
        setIsUrgent(totalSeconds <= urgentThreshold && totalSeconds > 0);

        if (totalSeconds === 0 && !completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      };

      tick();
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    }, [target, urgentThreshold, flip, onComplete]);

    const pad = (num: number) => String(num).padStart(2, '0');

    const containerClasses = [
      styles.container,
      styles[size],
      styles[variant],
      flip && styles.flip,
      isUrgent && styles.urgent,
      !showLabels && styles.hideLabels,
      compact && styles.compact,
      className
    ].filter(Boolean).join(' ');

    const renderBlock = (value: number, label: string, key: string) => (
      <div className={styles.block} key={key}>
        <span 
          className={`${styles.value} ${changing.includes(key) ? styles.changing : ''}`}
          data-value={pad(value)}
        >
          {pad(value)}
        </span>
        {showLabels && <span className={styles.label}>{label}</span>}
      </div>
    );

    const renderSeparator = (key: number) => (
      <span className={styles.separator} key={`sep-${key}`}>:</span>
    );

    const renderBlocks = () => {
      const blocks = [];

      if (format === 'dhms' || format === 'full') {
        blocks.push(renderBlock(timeLeft.days, defaultLabels.days, 'days'));
        blocks.push(renderSeparator(1));
      }

      if (format !== 'ms') {
        blocks.push(renderBlock(timeLeft.hours, defaultLabels.hours, 'hours'));
        blocks.push(renderSeparator(2));
      }

      blocks.push(renderBlock(timeLeft.minutes, defaultLabels.minutes, 'minutes'));
      blocks.push(renderSeparator(3));
      blocks.push(renderBlock(timeLeft.seconds, defaultLabels.seconds, 'seconds'));

      return blocks;
    };

    return (
      <div
        ref={ref}
        className={containerClasses}
        style={{ 
          '--accent-color': accentColor,
          ...style 
        } as React.CSSProperties}
        {...props}
      >
        {renderBlocks()}
      </div>
    );
  }
);

CountdownDisplay.displayName = 'CountdownDisplay';
export default CountdownDisplay;
