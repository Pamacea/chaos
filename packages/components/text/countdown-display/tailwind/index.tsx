'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef } from 'react';

export interface CountdownDisplayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  target: Date | number;
  format?: 'full' | 'hms' | 'ms' | 'dhms';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'neon' | 'brutal' | 'glitch';
  accentColor?: string;
  showLabels?: boolean;
  compact?: boolean;
  flip?: boolean;
  urgentThreshold?: number;
  onComplete?: () => void;
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string; };
}

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

const sizeClasses = {
  sm: { value: 'text-3xl md:text-5xl', separator: 'text-xl md:text-3xl', label: 'text-[0.5rem]' },
  md: { value: 'text-5xl md:text-7xl', separator: 'text-3xl md:text-5xl', label: 'text-[0.6rem]' },
  lg: { value: 'text-7xl md:text-9xl', separator: 'text-5xl md:text-7xl', label: 'text-[0.7rem]' },
};

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
      className = '',
      ...props
    },
    ref
  ) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isUrgent, setIsUrgent] = useState(false);
    const completedRef = useRef(false);

    const defaultLabels = {
      days: labels.days || 'DAYS', hours: labels.hours || 'HOURS',
      minutes: labels.minutes || 'MIN', seconds: labels.seconds || 'SEC',
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
          days: Math.floor(totalSeconds / 86400),
          hours: Math.floor((totalSeconds % 86400) / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      };

      const tick = () => {
        const newTime = calculateTimeLeft();
        const totalSeconds = newTime.days * 86400 + newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds;
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
    }, [target, urgentThreshold, onComplete]);

    const pad = (num: number) => String(num).padStart(2, '0');
    const { value: valueClass, separator: sepClass, label: labelClass } = sizeClasses[size];

    const getValueStyle = () => {
      switch (variant) {
        case 'neon':
          return { color: accentColor, textShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}, 0 0 40px ${accentColor}` };
        case 'brutal':
          return { background: accentColor, color: '#0a0a0a', padding: '0 0.25em', WebkitTextFillColor: '#0a0a0a' };
        case 'minimal':
          return { color: '#fafafa' };
        default:
          return { background: 'linear-gradient(180deg, #fafafa 0%, #888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };
      }
    };

    const renderBlock = (value: number, label: string) => (
      <div className="flex flex-col items-center relative">
        <span
          className={`${valueClass} font-extrabold leading-none tracking-tight ${isUrgent ? 'animate-pulse' : ''}`}
          style={getValueStyle()}
        >
          {pad(value)}
        </span>
        {showLabels && (
          <span className={`${labelClass} tracking-[0.3em] text-gray-600 mt-2 uppercase font-normal`}>
            {label}
          </span>
        )}
      </div>
    );

    const renderSeparator = (key: number) => (
      <span
        key={`sep-${key}`}
        className={`${sepClass} font-extrabold text-gray-700 animate-pulse self-start mt-2`}
        style={variant === 'neon' ? { color: accentColor, textShadow: `0 0 10px ${accentColor}` } : undefined}
      >
        :
      </span>
    );

    const blocks = [];
    if (format === 'dhms' || format === 'full') {
      blocks.push(<div key="days">{renderBlock(timeLeft.days, defaultLabels.days)}</div>);
      blocks.push(renderSeparator(1));
    }
    if (format !== 'ms') {
      blocks.push(<div key="hours">{renderBlock(timeLeft.hours, defaultLabels.hours)}</div>);
      blocks.push(renderSeparator(2));
    }
    blocks.push(<div key="minutes">{renderBlock(timeLeft.minutes, defaultLabels.minutes)}</div>);
    blocks.push(renderSeparator(3));
    blocks.push(<div key="seconds">{renderBlock(timeLeft.seconds, defaultLabels.seconds)}</div>);

    return (
      <div
        ref={ref}
        className={`flex items-center justify-center ${compact ? 'gap-2' : 'gap-4 md:gap-8'} font-sans ${className}`}
        {...props}
      >
        {blocks}
      </div>
    );
  }
);

CountdownDisplay.displayName = 'CountdownDisplay';
export default CountdownDisplay;
