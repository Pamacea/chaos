'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef } from 'react';
import styles from './terminal-output.module.css';

export interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success' | 'warning' | 'info';
  content: string;
  prompt?: string;
  delay?: number;
}

export interface TerminalOutputProps extends HTMLAttributes<HTMLDivElement> {
  /** Lines to display */
  lines: TerminalLine[];
  /** Default prompt string */
  prompt?: string;
  /** Visual variant */
  variant?: 'default' | 'hacker' | 'blood' | 'cyber';
  /** Show window header with dots */
  showHeader?: boolean;
  /** Window title */
  title?: string;
  /** Animate lines appearing */
  animated?: boolean;
  /** Base delay between animated lines (ms) */
  animationDelay?: number;
  /** Show typing cursor on last command */
  typingCursor?: boolean;
  /** Enable scanlines overlay */
  scanlines?: boolean;
  /** Enable glow effect */
  glowing?: boolean;
  /** Show interactive input */
  showInput?: boolean;
  /** Input placeholder */
  inputPlaceholder?: string;
  /** Callback when command is submitted */
  onCommand?: (command: string) => void;
  /** Auto-scroll to bottom */
  autoScroll?: boolean;
}

export const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(
  (
    {
      lines,
      prompt = '❯',
      variant = 'default',
      showHeader = true,
      title = 'terminal',
      animated = false,
      animationDelay = 100,
      typingCursor = false,
      scanlines = false,
      glowing = false,
      showInput = false,
      inputPlaceholder = 'Type a command...',
      onCommand,
      autoScroll = true,
      className,
      ...props
    },
    ref
  ) => {
    const [visibleLines, setVisibleLines] = useState<number>(animated ? 0 : lines.length);
    const [inputValue, setInputValue] = useState('');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (animated) {
        setVisibleLines(0);
        let index = 0;
        
        const showLine = () => {
          if (index < lines.length) {
            const line = lines[index];
            const delay = line.delay ?? animationDelay;
            
            setTimeout(() => {
              setVisibleLines(index + 1);
              index++;
              showLine();
            }, delay);
          }
        };
        
        showLine();
      } else {
        setVisibleLines(lines.length);
      }
    }, [lines, animated, animationDelay]);

    useEffect(() => {
      if (autoScroll && contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    }, [visibleLines, autoScroll]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        onCommand?.(inputValue);
        setInputValue('');
      }
    };

    const containerClasses = [
      styles.container,
      styles[variant],
      animated && styles.animated,
      scanlines && styles.scanlines,
      glowing && styles.glowing,
      className
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {showHeader && (
          <div className={styles.header}>
            <div className={styles.dots}>
              <span className={`${styles.dot} ${styles.red}`} />
              <span className={`${styles.dot} ${styles.yellow}`} />
              <span className={`${styles.dot} ${styles.green}`} />
            </div>
            <span className={styles.title}>{title}</span>
          </div>
        )}
        
        <div ref={contentRef} className={styles.content}>
          {lines.slice(0, visibleLines).map((line, i) => {
            const isLastCommand = i === visibleLines - 1 && line.type === 'command' && typingCursor;
            const lineClasses = [
              styles.line,
              line.type !== 'command' && line.type !== 'output' && styles[line.type]
            ].filter(Boolean).join(' ');

            return (
              <div
                key={i}
                className={lineClasses}
                style={animated ? { animationDelay: `${i * 50}ms` } : undefined}
              >
                {line.type === 'command' && (
                  <>
                    <span className={styles.prompt}>{line.prompt || prompt}</span>
                    <span className={`${styles.command} ${isLastCommand ? styles.typing : ''}`}>
                      {line.content}
                    </span>
                  </>
                )}
                {line.type !== 'command' && (
                  <span className={styles.output}>{line.content}</span>
                )}
              </div>
            );
          })}
          
          {showInput && (
            <form onSubmit={handleSubmit} className={styles.inputLine}>
              <span className={styles.prompt}>{prompt}</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputPlaceholder}
                className={styles.input}
                autoFocus
              />
            </form>
          )}
        </div>
      </div>
    );
  }
);

TerminalOutput.displayName = 'TerminalOutput';
export default TerminalOutput;
