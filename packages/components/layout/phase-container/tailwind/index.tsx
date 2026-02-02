'use client';

import { forwardRef, useState, HTMLAttributes } from 'react';

export interface Phase {
  /** Unique phase identifier */
  id: string;
  /** Phase content */
  content: React.ReactNode;
  /** Whether this phase can be skipped */
  skippable?: boolean;
  /** Minimum duration (ms) before showing next button */
  minDuration?: number;
}

export interface PhaseContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of phases */
  phases: Phase[];
  /** Current phase index (controlled) */
  currentPhase?: number;
  /** Callback when phase changes */
  onPhaseChange?: (index: number, phase: Phase) => void;
  /** Show progress indicator */
  showProgress?: boolean;
  /** Progress position */
  progressPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Show phase counter */
  showCounter?: boolean;
  /** Counter label */
  counterLabel?: string;
  /** Transition animation */
  transition?: 'fade' | 'slide' | 'scale' | 'blur' | 'glitch' | 'none';
  /** Transition duration in ms */
  transitionDuration?: number;
  /** Allow skipping phases */
  allowSkip?: boolean;
  /** Skip button label */
  skipLabel?: string;
  /** Show back button */
  showBack?: boolean;
  /** Back button label */
  backLabel?: string;
}

const transitionAnimations = {
  fade: {
    enter: 'animate-fade-in',
    exit: 'animate-fade-out',
  },
  slide: {
    enter: 'animate-slide-in',
    exit: 'animate-slide-out',
  },
  scale: {
    enter: 'animate-scale-in',
    exit: 'animate-scale-out',
  },
  blur: {
    enter: 'animate-blur-in',
    exit: 'animate-blur-out',
  },
  glitch: {
    enter: 'animate-glitch-in',
    exit: 'animate-glitch-out',
  },
  none: {
    enter: '',
    exit: '',
  },
};

export const PhaseContainer = forwardRef<HTMLDivElement, PhaseContainerProps>(
  (
    {
      phases,
      currentPhase: controlledIndex,
      onPhaseChange,
      showProgress = true,
      progressPosition = 'bottom',
      showCounter = true,
      counterLabel = 'PHASE',
      transition = 'fade',
      transitionDuration = 500,
      allowSkip = true,
      skipLabel = 'Skip →',
      showBack = true,
      backLabel = '← Back',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [internalIndex, setInternalIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
    const currentPhase = phases[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === phases.length - 1;

    const goToPhase = (index: number) => {
      if (transitioning || index < 0 || index >= phases.length) return;

      const phase = phases[index];

      setTransitioning(true);

      setTimeout(() => {
        if (controlledIndex === undefined) {
          setInternalIndex(index);
        }
        onPhaseChange?.(index, phase);
        setTransitioning(false);
      }, transitionDuration);
    };

    const goNext = () => {
      if (!isLast) {
        goToPhase(currentIndex + 1);
      }
    };

    const goBack = () => {
      if (!isFirst) {
        goToPhase(currentIndex - 1);
      }
    };

    const progressPositionClasses = {
      top: 'top-0 left-0 right-0',
      bottom: 'bottom-0 left-0 right-0',
      left: 'top-0 left-0 bottom-0 flex-col',
      right: 'top-0 right-0 bottom-0 flex-col',
    };

    const anim = transitionAnimations[transition];

    return (
      <div
        ref={ref}
        className={`
          relative flex flex-col min-h-screen w-full
          ${transitioning ? 'pointer-events-none' : ''}
          ${className}
        `}
        style={
          {
            '--transition-duration': `${transitionDuration}ms`,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Progress Bar */}
        {showProgress && (
          <div className={`absolute flex items-center gap-4 p-4 z-10 ${progressPositionClasses[progressPosition]}`} aria-label="Progress">
            <div className={`flex-1 ${progressPosition === 'left' || progressPosition === 'right' ? 'w-0.5 h-full' : 'h-0.5'} bg-current opacity-30 overflow-hidden`}>
              <div
                className={`bg-current transition-all duration-[var(--transition-duration)] ${progressPosition === 'left' || progressPosition === 'right' ? 'w-full h-full' : 'h-full'}`}
                style={
                  progressPosition === 'left' || progressPosition === 'right'
                    ? { height: `${((currentIndex + 1) / phases.length) * 100}%` }
                    : { width: `${((currentIndex + 1) / phases.length) * 100}%` }
                }
              />
            </div>
            {showCounter && (
              <span className="font-mono text-xs font-semibold tracking-widest uppercase whitespace-nowrap opacity-70">
                {counterLabel} {currentIndex + 1}/{phases.length}
              </span>
            )}
          </div>
        )}

        {/* Phase Content */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
          <article className={`w-full max-w-2xl ${anim.enter}`}>
            {currentPhase?.content}
          </article>
        </div>

        {/* Navigation */}
        <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          {showBack && !isFirst && (
            <button
              type="button"
              className="px-6 py-3 bg-transparent border-2 border-current text-current font-mono text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-current hover:text-[var(--bg,#000)] disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={goBack}
              disabled={transitioning}
            >
              {backLabel}
            </button>
          )}

          {!isLast && allowSkip && currentPhase?.skippable !== false && (
            <button
              type="button"
              className="px-6 py-3 bg-transparent border-2 border-current opacity-70 text-current font-mono text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-current hover:text-[var(--bg,#000)] hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={goNext}
              disabled={transitioning}
            >
              {skipLabel}
            </button>
          )}

          {!isLast && !allowSkip && (
            <button
              type="button"
              className="px-6 py-3 bg-transparent border-2 border-current text-current font-mono text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-current hover:text-[var(--bg,#000)] disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={goNext}
              disabled={transitioning}
            >
              Continue
            </button>
          )}

          {isLast && (
            <button
              type="button"
              className="px-6 py-3 bg-current text-[var(--bg,#000)] border-2 border-current font-mono text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 shadow-[0_0_20px_currentColor]"
            >
              Complete
            </button>
          )}
        </nav>

        {/* Inline styles for animations since Tailwind doesn't have these by default */}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes slide-in {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slide-out {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-30px); }
          }
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes scale-out {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(1.1); }
          }
          @keyframes blur-in {
            from { opacity: 0; filter: blur(10px); }
            to { opacity: 1; filter: blur(0); }
          }
          @keyframes blur-out {
            from { opacity: 1; filter: blur(0); }
            to { opacity: 0; filter: blur(10px); }
          }
          @keyframes glitch-in {
            0% { opacity: 0; transform: translate(-10px, 0); filter: hue-rotate(0deg); }
            20% { opacity: 0.5; transform: translate(10px, 0); filter: hue-rotate(90deg); }
            40% { opacity: 0.7; transform: translate(-10px, 0); filter: hue-rotate(180deg); }
            60% { opacity: 0.3; transform: translate(5px, 5px); filter: hue-rotate(270deg); }
            80% { opacity: 0.9; transform: translate(-5px, -5px); filter: hue-rotate(360deg); }
            100% { opacity: 1; transform: translate(0); filter: hue-rotate(0deg); }
          }
          @keyframes glitch-exit {
            0% { opacity: 1; transform: translate(0); }
            20% { opacity: 0.8; transform: translate(-3px, 2px); }
            40% { opacity: 0.6; transform: translate(3px, -2px); }
            60% { opacity: 0.4; transform: translate(-2px, -1px); }
            80% { opacity: 0.2; transform: translate(2px, 1px); }
            100% { opacity: 0; transform: translate(0); }
          }
          .animate-fade-in { animation: fade-in var(--transition-duration, 500ms) ease forwards; }
          .animate-fade-out { animation: fade-out var(--transition-duration, 500ms) ease forwards; }
          .animate-slide-in { animation: slide-in var(--transition-duration, 500ms) ease forwards; }
          .animate-slide-out { animation: slide-out var(--transition-duration, 500ms) ease forwards; }
          .animate-scale-in { animation: scale-in var(--transition-duration, 500ms) ease forwards; }
          .animate-scale-out { animation: scale-out var(--transition-duration, 500ms) ease forwards; }
          .animate-blur-in { animation: blur-in var(--transition-duration, 500ms) ease forwards; }
          .animate-blur-out { animation: blur-out var(--transition-duration, 500ms) ease forwards; }
          .animate-glitch-in { animation: glitch-in var(--transition-duration, 500ms) ease forwards; }
          .animate-glitch-out { animation: glitch-exit var(--transition-duration, 500ms) ease forwards; }
        `}</style>
      </div>
    );
  }
);

PhaseContainer.displayName = 'PhaseContainer';

export default PhaseContainer;
