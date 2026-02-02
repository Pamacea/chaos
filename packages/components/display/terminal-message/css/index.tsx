'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './terminal-message.module.css';

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

export const TerminalMessage = forwardRef<HTMLDivElement, TerminalMessageProps>(
  (
    {
      children,
      prompt = '>',
      type = 'system',
      showCursor = false,
      typing = false,
      typingSpeed = 50,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.terminalMessage} ${styles[type]} ${typing ? styles.typing : ''} ${className || ''}`}
        {...props}
      >
        <span className={styles.prompt}>{prompt}</span>
        <span className={styles.content}>{children}</span>
        {showCursor && <span className={styles.cursor} />}
      </div>
    );
  }
);

TerminalMessage.displayName = 'TerminalMessage';

export default TerminalMessage;
