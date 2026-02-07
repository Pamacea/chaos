'use client';

import { forwardRef, useEffect, useState, HTMLAttributes } from 'react';
import styles from './countdown-phase.module.css';

export interface Phase {
  /** Phase label */
  label: string;
  /** Phase description */
  description: string;
  /** Duration in seconds */
  duration: number;
}

export interface CountdownPhaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Phases configuration */
  phases: Phase[];
  /** Auto-start countdown on mount */
  autoStart?: boolean;
  /** On countdown complete callback */
  onComplete?: () => void;
  /** On phase change callback */
  onPhaseChange?: (phaseIndex: number) => void;
  /** Accent color */
  accentColor?: string;
  /** Show phase descriptions */
  showDescriptions?: boolean;
  /** Progress bar style */
  progressStyle?: 'solid' | 'glow' | 'pulsing' | 'glitch';
  /** Color variant */
  variant?: 'default' | 'danger' | 'warning' | 'info' | 'success';
  /** Size variant */
  size?: 'default' | 'compact' | 'large';
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Enable urgent mode when low time */
  urgentThreshold?: number;
}

export const CountdownPhase = forwardRef<HTMLDivElement, CountdownPhaseProps>(
  (
    {
      phases,
      autoStart = true,
      onComplete,
      onPhaseChange,
      accentColor = '#00ff00',
      showDescriptions = true,
      progressStyle = 'glow',
      variant = 'default',
      size = 'default',
      orientation = 'horizontal',
      urgentThreshold = 10,
      className,
      ...props
    },
    ref
  ) => {
    const [isRunning, setIsRunning] = useState(autoStart);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [timeLeft, setTimeLeft] = useState(phases[0]?.duration || 0);
    const [totalElapsed, setTotalElapsed] = useState(0);

    const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);

    useEffect(() => {
      if (!isRunning) return;

      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Phase complete
            const nextPhase = currentPhase + 1;
            if (nextPhase < phases.length) {
              setCurrentPhase(nextPhase);
              onPhaseChange?.(nextPhase);
              return phases[nextPhase].duration;
            } else {
              setIsRunning(false);
              onComplete?.();
              return 0;
            }
          }
          return prev - 1;
        });

        setTotalElapsed((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [isRunning, currentPhase, phases, onComplete, onPhaseChange]);

    // Reset when phases change
    useEffect(() => {
      setCurrentPhase(0);
      setTimeLeft(phases[0]?.duration || 0);
      setTotalElapsed(0);
      setIsRunning(autoStart);
    }, [phases, autoStart]);

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (totalElapsed / totalDuration) * 100;
    const isUrgent = timeLeft <= urgentThreshold && timeLeft > 0;

    return (
      <div
        ref={ref}
        className={`${styles.container} ${styles[size]} ${styles[variant]} ${styles[orientation]} ${isUrgent ? styles.urgent : ''} ${className || ''}`}
        style={{ '--accent': accentColor } as React.CSSProperties}
        {...props}
      >
        <div className={styles.header}>
          <span className={styles.label}>
            Phase {currentPhase + 1}/{phases.length}
          </span>
          <div className={styles.timeDisplay}>
            <span className={styles.time}>{formatTime(timeLeft)}</span>
            <span className={styles.suffix}>REMAINING</span>
          </div>
        </div>

        <div className={styles.phases}>
          {phases.map((phase, index) => {
            const isCompleted = index < currentPhase;
            const isActive = index === currentPhase;
            const isUpcoming = index > currentPhase;

            return (
              <div key={index} className={styles.phase}>
                <div
                  className={`${styles.phaseDot} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
                />
                <div
                  className={`${styles.phaseLine} ${isCompleted ? styles.filled : ''}`}
                  style={{ width: orientation === 'vertical' ? '2px' : '100%' }}
                />
                <span
                  className={`${styles.phaseLabel} ${isActive ? styles.active : ''}`}
                >
                  {phase.label}
                </span>
                {showDescriptions && isActive && (
                  <span className={`${styles.phaseDescription} ${isActive ? styles.active : ''}`}>
                    {phase.description}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.progressTrack}>
          <div
            className={`${styles.progressFill} ${styles[progressStyle]}`}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>
    );
  }
);

CountdownPhase.displayName = 'CountdownPhase';

export default CountdownPhase;
