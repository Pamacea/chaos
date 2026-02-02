'use client';

import { forwardRef, useState, HTMLAttributes } from 'react';
import styles from './phase-container.module.css';

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
      className,
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

    return (
      <div
        ref={ref}
        className={`${styles.phaseContainer} ${styles[progressPosition]} ${styles[transition]} ${
          transitioning ? styles.transitioning : ''
        } ${className || ''}`}
        style={
          {
            '--transition-duration': `${transitionDuration}ms`,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Progress Bar */}
        {showProgress && (
          <div className={styles.progress} aria-label="Progress">
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${((currentIndex + 1) / phases.length) * 100}%`,
                }}
              />
            </div>
            {showCounter && (
              <span className={styles.counter}>
                {counterLabel} {currentIndex + 1}/{phases.length}
              </span>
            )}
          </div>
        )}

        {/* Phase Content */}
        <div className={styles.phaseContent}>
          <article
            key={currentIndex}
            className={`${styles.phase} ${transitioning ? styles.exit : styles.enter}`}
          >
            {currentPhase?.content}
          </article>
        </div>

        {/* Navigation */}
        <nav className={styles.navigation}>
          {showBack && !isFirst && (
            <button
              type="button"
              className={styles.navButton}
              onClick={goBack}
              disabled={transitioning}
            >
              {backLabel}
            </button>
          )}

          {!isLast && allowSkip && currentPhase?.skippable !== false && (
            <button
              type="button"
              className={`${styles.navButton} ${styles.skip}`}
              onClick={goNext}
              disabled={transitioning}
            >
              {skipLabel}
            </button>
          )}

          {!isLast && !allowSkip && (
            <button
              type="button"
              className={styles.navButton}
              onClick={goNext}
              disabled={transitioning}
            >
              Continue
            </button>
          )}

          {isLast && (
            <button type="button" className={`${styles.navButton} ${styles.complete}`}>
              Complete
            </button>
          )}
        </nav>
      </div>
    );
  }
);

PhaseContainer.displayName = 'PhaseContainer';

export default PhaseContainer;
