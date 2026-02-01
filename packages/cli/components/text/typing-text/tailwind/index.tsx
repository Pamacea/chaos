'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useCallback } from 'react';

export interface TypingTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  text: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  cursorStyle?: 'block' | 'line' | 'underscore';
  variant?: 'default' | 'terminal' | 'hacker' | 'cyber' | 'ghost';
  loop?: boolean;
  loopDelay?: number;
  deleteSpeed?: number;
  onComplete?: () => void;
}

const variantStyles = {
  default: '',
  terminal: 'text-green-400 drop-shadow-[0_0_5px_#00ff00]',
  hacker: 'text-rose-500 drop-shadow-[0_0_5px_#ff0040]',
  cyber: 'text-cyan-400 drop-shadow-[0_0_5px_#00ffff]',
  ghost: 'text-gray-500 opacity-80',
};

const cursorVariants = {
  default: 'bg-current',
  terminal: 'bg-green-400 shadow-[0_0_5px_#00ff00]',
  hacker: 'bg-rose-500 shadow-[0_0_5px_#ff0040]',
  cyber: 'bg-cyan-400 shadow-[0_0_5px_#00ffff]',
  ghost: 'bg-gray-500',
};

const cursorSizes = {
  block: 'w-[0.6em] h-[1.1em]',
  line: 'w-0.5 h-[1.1em]',
  underscore: 'w-[0.6em] h-0.5',
};

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
      className = '',
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

    const showBlinkingCursor = isTyping || isDeleting || loop;

    return (
      <span
        ref={ref}
        className={`inline-block font-mono ${variantStyles[variant]} ${className}`}
        {...props}
      >
        <span className="whitespace-pre-wrap">{displayText}</span>
        {showCursor && (
          <span
            className={`inline-block ml-0.5 align-text-bottom ${cursorSizes[cursorStyle]} ${cursorVariants[variant]} ${
              showBlinkingCursor ? 'animate-pulse' : 'opacity-0'
            }`}
          />
        )}
      </span>
    );
  }
);

TypingText.displayName = 'TypingText';
export default TypingText;
