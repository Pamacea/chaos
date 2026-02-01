'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useCallback } from 'react';
import styles from './typing-text.module.css';

export interface TypingTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Text to type out */
  text: string;
  /** Typing speed in ms per character */
  speed?: number;
  /** Delay before starting in ms */
  delay?: number;
  /** Show cursor */
  showCursor?: boolean;
  /** Cursor style */
  cursorStyle?: 'block' | 'line' | 'underscore';
  /** Visual variant */
  variant?: 'default' | 'terminal' | 'hacker' | 'cyber' | 'ghost';
  /** Loop the animation */
  loop?: boolean;
  /** Pause between loops in ms */
  loopDelay?: number;
  /** Delete speed when looping */
  deleteSpeed?: number;
  /** Callback when typing completes */
  onComplete?: () => void;
}

export const TypingText = forwardRef<HTMLSpanElement, TypingTextProps>(
  (
    {
      text,
      speed = 50,
      delay = 0,
      showCursor = true,
      cursorStyle = 'block',
      variant = 'default',
      loop = false,
      loopDelay = 2000,
      deleteSpeed = 30,
      onComplete,
      className,
      ...props
    },
    ref
  ) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const typeText = useCallback(() => {
      setIsTyping(true);
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          
          if (loop) {
            setTimeout(() => {
              setIsDeleting(true);
              let deleteIndex = text.length;
              
              const deleteInterval = setInterval(() => {
                if (deleteIndex > 0) {
                  setDisplayText(text.slice(0, deleteIndex - 1));
                  deleteIndex--;
                } else {
                  clearInterval(deleteInterval);
                  setIsDeleting(false);
                  setTimeout(typeText, delay);
                }
              }, deleteSpeed);
            }, loopDelay);
          } else {
            onComplete?.();
          }
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, [text, speed, loop, loopDelay, deleteSpeed, delay, onComplete]);

    useEffect(() => {
      const timeout = setTimeout(typeText, delay);
      return () => clearTimeout(timeout);
    }, [typeText, delay]);

    const containerClasses = [
      styles.container,
      variant !== 'default' && styles[variant],
      className
    ].filter(Boolean).join(' ');

    const cursorClasses = [
      styles.cursor,
      styles[cursorStyle],
      !isTyping && !isDeleting && !loop && styles.cursorHidden
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={containerClasses} {...props}>
        <span className={styles.text}>{displayText}</span>
        {showCursor && <span className={cursorClasses} />}
      </span>
    );
  }
);

TypingText.displayName = 'TypingText';
export default TypingText;
