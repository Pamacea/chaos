'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface TerminalMessageProps extends HTMLAttributes<HTMLDivElement> {
  /** Message content */
  children: string;
  /** Prompt text */
  prompt?: string;
  /** Message type */
  type?: 'system' | 'info' | 'warning' | 'error' | 'success';
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Typing animation */
  typing?: boolean;
  /** Typing speed in ms per character */
  typingSpeed?: number;
}

const typeStyles = {
  system: { color: 'text-green-500', prefix: '' },
  info: { color: 'text-sky-500', prefix: '[INFO] ' },
  warning: { color: 'text-amber-500', prefix: '[WARN] ' },
  error: { color: 'text-red-500', prefix: '[ERROR] ' },
  success: { color: 'text-green-500', prefix: '[OK] ' },
};

export const TerminalMessage = forwardRef<HTMLDivElement, TerminalMessageProps>(
  (
    {
      children,
      prompt = '>',
      type = 'system',
      showCursor = false,
      typing = false,
      typingSpeed = 50,
      className = '',
      ...props
    },
    ref
  ) => {
    const styles = typeStyles[type];

    return (
      <div
        ref={ref}
        className={`flex items-start gap-2 font-["Courier_New",_Courier,monospace] text-sm leading-relaxed py-2 ${styles.color} ${className}`}
        style={typing ? ({ '--typing-speed': `${typingSpeed * 40}ms` } as React.CSSProperties) : undefined}
        {...props}
      >
        <span className={`${styles.color} font-bold whitespace-nowrap select-none`}>
          {prompt}
        </span>
        <span className={`flex-1 break-words ${type === 'error' ? 'font-bold' : ''} ${typing ? 'overflow-hidden whitespace-nowrap animate-[typing_var(--typing-speed,_2s)_steps(40,end)_forwards]' : ''}`}>
          {type !== 'system' && styles.prefix}{children}
        </span>
        {showCursor && (
          <span className="inline-block w-2.5 h-1.2em bg-green-500 animate-[cursorBlink_1s_step-end_infinite]" />
        )}

        <style>{`
          @keyframes cursorBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes typing {
            from { max-width: 0; }
            to { max-width: 100%; }
          }
        `}</style>
      </div>
    );
  }
);

TerminalMessage.displayName = 'TerminalMessage';

export default TerminalMessage;
