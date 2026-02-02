'use client';

import { forwardRef, useState, HTMLAttributes } from 'react';
import styles from './secret-reveal.module.css';

export interface SecretRevealProps extends HTMLAttributes<HTMLDivElement> {
  /** Trigger content (what's visible initially) */
  trigger: React.ReactNode;
  /** Hidden content (revealed on interaction) */
  secret: React.ReactNode;
  /** Trigger type: click, hover, both */
  triggerType?: 'click' | 'hover' | 'both';
  /** Animation style */
  animation?: 'fade' | 'slide' | 'blur' | 'glitch' | 'typewriter';
  /** Direction of reveal (for slide animation) */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Duration of reveal animation */
  duration?: number;
  /** Auto-hide after delay (ms), 0 = never */
  autoHide?: number;
  /** Show prompt hint */
  showHint?: boolean;
  /** Hint text */
  hintText?: string;
  /** Initially revealed */
  initiallyRevealed?: boolean;
}

export const SecretReveal = forwardRef<HTMLDivElement, SecretRevealProps>(
  (
    {
      trigger,
      secret,
      triggerType = 'click',
      animation = 'fade',
      direction = 'down',
      duration = 500,
      autoHide = 0,
      showHint = true,
      hintText = 'Click to reveal',
      initiallyRevealed = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [revealed, setRevealed] = useState(initiallyRevealed);

    const handleInteraction = () => {
      if (triggerType === 'hover' && revealed) return;

      setRevealed(true);

      if (autoHide > 0) {
        setTimeout(() => {
          setRevealed(false);
        }, autoHide);
      }
    };

    const handleMouseEnter = () => {
      if (triggerType === 'hover' || triggerType === 'both') {
        handleInteraction();
      }
    };

    const handleClick = () => {
      if (triggerType === 'click' || triggerType === 'both') {
        handleInteraction();
      }
    };

    return (
      <div
        ref={ref}
        className={`${styles.secretReveal} ${styles[animation]} ${styles[direction]} ${className || ''}`}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        style={
          {
            '--reveal-duration': `${duration}ms`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={styles.trigger}>{trigger}</div>

        {showHint && !revealed && (
          <span className={styles.hint}>{hintText}</span>
        )}

        <div className={`${styles.secret} ${revealed ? styles.revealed : ''}`}>
          {secret}
        </div>
      </div>
    );
  }
);

SecretReveal.displayName = 'SecretReveal';

export default SecretReveal;
