'use client';

import { forwardRef, useEffect, useState, HTMLAttributes } from 'react';

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
      className = '',
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

    const getUnitClasses = () => {
      if (labelStyle === 'above') return 'flex-col-reverse';
      if (labelStyle === 'inline') return 'flex-row gap-2';
      return 'flex-col';
    };

    const getLabelClasses = () => {
      if (labelStyle === 'inline') return 'text-xs opacity-70';
      return 'text-[10px] font-semibold uppercase tracking-[0.15em] opacity-60';
    };

    return (
      <div
        ref={ref}
        className={`flex items-center justify-center gap-2 font-mono font-bold tracking-[0.1em] ${completed ? 'opacity-70' : ''} ${className}`}
        {...props}
      >
        {units.map((unit, index) => (
          <div key={unit.label} className={`flex items-center gap-1 ${getUnitClasses()}`}>
            <span className="text-4xl leading-none min-w-[3ch] text-center transition-transform duration-300 last:animate-[pulseSecond_1s_ease-in-out_infinite]">
              {format(unit.value)}
            </span>
            {labelStyle !== 'none' && (
              <span className={getLabelClasses()}>{unit.label}</span>
            )}
            {index < units.length - 1 && (
              <span className={`text-3xl opacity-50 ${completed ? '' : 'animate-[blink_1s_ease-in-out_infinite]'}`}>
                {separator}
              </span>
            )}
          </div>
        ))}

        <style>{`
          @keyframes pulseSecond {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes blink {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
);

CountdownTimer.displayName = 'CountdownTimer';

export default CountdownTimer;
