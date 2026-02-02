'use client';

import { forwardRef, useState, HTMLAttributes } from 'react';

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

const animationStyles = {
  fade: {
    secret: 'absolute top-full left-0 z-10 p-4 pointer-events-none opacity-0 transition-all',
    revealed: 'pointer-events-auto opacity-100 translate-y-2',
  },
  slide: {
    secret: 'absolute top-full left-0 z-10 p-4 pointer-events-none opacity-0 transition-all',
    revealed: 'pointer-events-auto opacity-100 translate-y-2',
    up: 'top-auto bottom-full',
    upRevealed: '-translate-y-2',
    left: 'left-auto right-0',
    leftRevealed: 'translate-x-2',
    rightRevealed: 'translate-x-2',
  },
  blur: {
    secret: 'absolute top-full left-0 z-10 p-4 pointer-events-none opacity-0 blur-md scale-95 transition-all',
    revealed: 'pointer-events-auto opacity-100 blur-0 scale-100',
  },
  glitch: {
    secret: 'absolute top-full left-0 z-10 p-4 pointer-events-none opacity-0',
    revealed: 'pointer-events-auto opacity-100',
  },
  typewriter: {
    secret: 'absolute top-full left-0 z-10 p-4 pointer-events-none opacity-0 overflow-hidden whitespace-nowrap max-w-0 transition-all',
    revealed: 'pointer-events-auto opacity-100',
  },
};

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
      className = '',
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

    const getSecretClasses = () => {
      let classes = 'absolute top-full left-0 z-10 p-4 pointer-events-none transition-all';

      if (animation === 'blur') {
        classes += revealed ? ' opacity-100 blur-0 scale-100' : ' opacity-0 blur-md scale-95';
      } else if (animation === 'slide') {
        if (direction === 'up') {
          classes += revealed ? ' bottom-full opacity-100 -translate-y-2' : ' bottom-full opacity-0';
        } else if (direction === 'left') {
          classes += revealed ? ' left-auto right-0 opacity-100 translate-x-2' : ' left-auto right-0 opacity-0';
        } else if (direction === 'right') {
          classes += revealed ? ' opacity-100 translate-x-2' : ' opacity-0';
        } else {
          classes += revealed ? ' opacity-100 translate-y-2' : ' opacity-0';
        }
      } else {
        classes += revealed ? ' opacity-100 translate-y-2 pointer-events-auto' : ' opacity-0';
      }

      if (animation === 'typewriter' && revealed) {
        classes += ' animate-[typewriter_500ms_steps(40,end)_forwards]';
      }

      if (animation === 'glitch' && !revealed) {
        classes += ' animate-[glitchSecret_0.3s_infinite]';
      }

      return classes;
    };

    return (
      <div
        ref={ref}
        className={`relative inline-block cursor-pointer ${className}`}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        style={{ '--reveal-duration': `${duration}ms` } as React.CSSProperties}
        {...props}
      >
        <div className="relative z-2 transition-all duration-300">
          {trigger}
        </div>

        {showHint && !revealed && (
          <span className="block mt-2 text-xs opacity-50 transition-opacity hover:opacity-80">
            {hintText}
          </span>
        )}

        <div className={getSecretClasses()}>
          {secret}
        </div>

        <style>{`
          @keyframes glitchSecret {
            0%, 100% { transform: translate(0); opacity: 0; }
            20% { transform: translate(-2px, 2px); opacity: 0.3; }
            40% { transform: translate(2px, -2px); opacity: 0.5; }
            60% { transform: translate(-1px, -1px); opacity: 0.7; }
            80% { transform: translate(1px, 1px); opacity: 0.2; }
          }
          @keyframes typewriter {
            from { max-width: 0; }
            to { max-width: 100%; }
          }
        `}</style>
      </div>
    );
  }
);

SecretReveal.displayName = 'SecretReveal';

export default SecretReveal;
