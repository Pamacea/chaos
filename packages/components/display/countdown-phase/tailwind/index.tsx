'use client';

import { forwardRef, useEffect, useState, HTMLAttributes } from 'react';

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

const variantColors = {
  default: '#00ff00',
  danger: '#ff0000',
  warning: '#ffaa00',
  info: '#00aaff',
  success: '#00ff00',
};

export const CountdownPhase = forwardRef<HTMLDivElement, CountdownPhaseProps>(
  (
    {
      phases,
      autoStart = true,
      onComplete,
      onPhaseChange,
      accentColor,
      showDescriptions = true,
      progressStyle = 'glow',
      variant = 'default',
      size = 'default',
      orientation = 'horizontal',
      urgentThreshold = 10,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isRunning, setIsRunning] = useState(autoStart);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [timeLeft, setTimeLeft] = useState(phases[0]?.duration || 0);
    const [totalElapsed, setTotalElapsed] = useState(0);

    const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
    const color = accentColor || variantColors[variant];

    useEffect(() => {
      if (!isRunning) return;

      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
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

    const sizeClasses = {
      compact: { time: 'text-xl', dot: 'w-2 h-2', track: 'h-1' },
      default: { time: 'text-2xl', dot: 'w-3 h-3', track: 'h-2' },
      large: { time: 'text-4xl', dot: 'w-4 h-4', track: 'h-3' },
    };

    const s = sizeClasses[size];

    return (
      <div
        ref={ref}
        className={`flex flex-col items-center gap-4 font-mono ${isUrgent ? 'animate-[urgentBlink_0.5s_ease-in-out_infinite]' : ''} ${className}`}
        {...props}
      >
        <div className="flex items-center justify-between w-full gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] opacity-70">
            Phase {currentPhase + 1}/{phases.length}
          </span>
          <div className="flex items-baseline gap-1">
            <span className={`${s.time} font-bold tabular-nums leading-none`}>
              {formatTime(timeLeft)}
            </span>
            <span className="text-sm opacity-60">REMAINING</span>
          </div>
        </div>

        <div className={`flex items-center gap-2 w-full ${orientation === 'vertical' ? 'flex-col h-[200px]' : ''}`}>
          {phases.map((phase, index) => {
            const isCompleted = index < currentPhase;
            const isActive = index === currentPhase;

            return (
              <div
                key={index}
                className={`flex-1 flex flex-col items-center gap-1 relative ${orientation === 'vertical' ? 'flex-row items-center justify-center h-full' : ''}`}
              >
                <div
                  className={`${s.dot} rounded-full transition-all duration-300 relative z-10 ${
                    isActive
                      ? 'animate-[phasePulse_1s_ease-in-out_infinite]'
                      : ''
                  }`}
                  style={{
                    backgroundColor: isActive || isCompleted ? color : 'rgba(255,255,255,0.2)',
                    boxShadow: isActive ? `0 0 10px ${color}` : 'none',
                  }}
                />
                {/* Phase line */}
                {index < phases.length - 1 && (
                  <div
                    className={`absolute top-1/2 left-1/2 right-0 h-0.5 -translate-y-1/2 z-0 ${
                      isCompleted ? '' : 'bg-white/20'
                    }`}
                    style={{
                      ...(orientation === 'vertical'
                        ? { top: '50%', left: '50%', right: 'auto', bottom: 0, width: '2px', height: 'auto', transform: 'translateX(-50%)' }
                        : {}),
                      backgroundColor: isCompleted ? color : undefined,
                    }}
                  />
                )}
                <span
                  className={`text-[0.625rem] uppercase tracking-[0.05em] mt-1 ${
                    isActive ? 'opacity-100 font-semibold' : 'opacity-50'
                  }`}
                >
                  {phase.label}
                </span>
                {showDescriptions && isActive && (
                  <span className="text-xs opacity-80 max-w-[150px] overflow-hidden whitespace-nowrap ml-2">
                    {phase.description}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div
          className={`w-full ${s.track} bg-black/30 rounded-md overflow-hidden relative`}
        >
          <div
            className="h-full rounded-md transition-all duration-300 relative overflow-hidden"
            style={{
              width: `${Math.min(100, progress)}%`,
              backgroundColor: color,
              boxShadow: progressStyle === 'glow' ? `0 0 10px ${color}` : undefined,
              ...(progressStyle === 'pulsing' || isUrgent
                ? { animation: 'progressPulse 1s ease-in-out infinite' }
                : {}),
              ...(progressStyle === 'glitch' || isUrgent
                ? { animation: 'progressGlitch 0.5s infinite' }
                : {}),
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[progressScan_2s_linear_infinite]" />
          </div>
        </div>

        <style>{`
          @keyframes phasePulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
          }
          @keyframes progressScan {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          @keyframes progressPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          @keyframes progressGlitch {
            0%, 90%, 100% { transform: translateX(0); }
            92% { transform: translateX(-2px); }
            94% { transform: translateX(2px); }
            96% { transform: translateX(-1px); }
            98% { transform: translateX(1px); }
          }
          @keyframes urgentBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }
);

CountdownPhase.displayName = 'CountdownPhase';

export default CountdownPhase;
