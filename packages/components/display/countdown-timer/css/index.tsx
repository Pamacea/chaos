'use client';

import { forwardRef, useEffect, useState, HTMLAttributes } from 'react';
import styles from './countdown-timer.module.css';

export interface CountdownTimerProps extends HTMLAttributes<HTMLDivElement> {
  /** Target date/time */
  targetDate: Date;
  /** On complete callback */
  onComplete?: () => void;
  /** Show days */
  showDays?: boolean;
  /** Show hours */
  showHours?: boolean;
  /** Show minutes */
  showMinutes?: boolean;
  /** Show seconds */
  showSeconds?: boolean;
  /** Separator between units */
  separator?: string;
  /** Number of digits per unit */
  padZeros?: boolean;
  /** Label style */
  labelStyle?: 'above' | 'below' | 'inline' | 'none';
}

export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(
  (
    {
      targetDate,
      onComplete,
      showDays = true,
      showHours = true,
      showMinutes = true,
      showSeconds = true,
      separator = ':',
      padZeros = true,
      labelStyle = 'below',
      className,
      ...props
    },
    ref
  ) => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    const [completed, setCompleted] = useState(false);

    useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime();

        if (difference <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          if (!completed) {
            setCompleted(true);
            onComplete?.();
          }
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }, [targetDate, completed, onComplete]);

    const format = (value: number) => padZeros ? String(value).padStart(2, '0') : String(value);

    const units = [
      { value: timeLeft.days, label: 'DAYS', show: showDays },
      { value: timeLeft.hours, label: 'HOURS', show: showHours },
      { value: timeLeft.minutes, label: 'MINUTES', show: showMinutes },
      { value: timeLeft.seconds, label: 'SECONDS', show: showSeconds },
    ].filter((u) => u.show);

    return (
      <div ref={ref} className={`${styles.countdown} ${styles[labelStyle]} ${className || ''}`} {...props}>
        {units.map((unit, index) => (
          <div key={unit.label} className={styles.unit}>
            <span className={styles.value}>{format(unit.value)}</span>
            {labelStyle !== 'none' && <span className={styles.label}>{unit.label}</span>}
            {index < units.length - 1 && <span className={styles.separator}>{separator}</span>}
          </div>
        ))}
      </div>
    );
  }
);

CountdownTimer.displayName = 'CountdownTimer';

export default CountdownTimer;
