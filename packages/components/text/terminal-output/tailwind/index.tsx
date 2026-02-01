'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef } from 'react';

export interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success' | 'warning' | 'info';
  content: string;
  prompt?: string;
  delay?: number;
}

export interface TerminalOutputProps extends HTMLAttributes<HTMLDivElement> {
  lines: TerminalLine[];
  prompt?: string;
  variant?: 'default' | 'hacker' | 'blood' | 'cyber';
  showHeader?: boolean;
  title?: string;
  animated?: boolean;
  animationDelay?: number;
  typingCursor?: boolean;
  scanlines?: boolean;
  glowing?: boolean;
  showInput?: boolean;
  inputPlaceholder?: string;
  onCommand?: (command: string) => void;
  autoScroll?: boolean;
}

const variantStyles = {
  default: { border: 'border-gray-800', header: 'bg-gray-900', prompt: 'text-green-400', command: 'text-gray-100', output: 'text-gray-500' },
  hacker: { border: 'border-green-500', header: 'bg-green-950', prompt: 'text-green-400', command: 'text-green-400', output: 'text-green-700' },
  blood: { border: 'border-rose-500', header: 'bg-rose-950', prompt: 'text-rose-500', command: 'text-rose-300', output: 'text-rose-700' },
  cyber: { border: 'border-cyan-500', header: 'bg-cyan-950', prompt: 'text-cyan-400', command: 'text-cyan-200', output: 'text-cyan-700' },
};

const typeColors = { error: 'text-rose-500', success: 'text-green-400', warning: 'text-amber-500', info: 'text-cyan-400' };

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
      className = '',
      ...props
    },
    ref
  ) => {
    const [visibleLines, setVisibleLines] = useState<number>(animated ? 0 : lines.length);
    const [inputValue, setInputValue] = useState('');
    const contentRef = useRef<HTMLDivElement>(null);
    const styles = variantStyles[variant];

    useEffect(() => {
      if (animated) {
        setVisibleLines(0);
        let index = 0;
        
        const showLine = () => {
          if (index < lines.length) {
            const line = lines[index];
            setTimeout(() => {
              setVisibleLines(index + 1);
              index++;
              showLine();
            }, line.delay ?? animationDelay);
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

    return (
      <div
        ref={ref}
        className={`font-mono bg-[#0a0a0a] border ${styles.border} rounded overflow-hidden relative ${
          scanlines ? 'after:absolute after:inset-0 after:bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] after:pointer-events-none' : ''
        } ${className}`}
        {...props}
      >
        {showHeader && (
          <div className={`flex items-center gap-2 px-4 py-3 ${styles.header} border-b border-gray-800`}>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-auto text-xs text-gray-600 tracking-wide">{title}</span>
          </div>
        )}
        
        <div ref={contentRef} className="p-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-[#0a0a0a] scrollbar-thumb-gray-700">
          {lines.slice(0, visibleLines).map((line, i) => {
            const isLastCommand = i === visibleLines - 1 && line.type === 'command' && typingCursor;
            const outputColor = line.type !== 'command' && line.type !== 'output' ? typeColors[line.type] : styles.output;

            return (
              <div
                key={i}
                className={`flex gap-2 mb-1 leading-relaxed text-sm ${animated ? 'animate-[fadeInUp_0.3s_ease-out_forwards]' : ''}`}
                style={animated ? { animationDelay: `${i * 50}ms`, opacity: 0 } : undefined}
              >
                {line.type === 'command' ? (
                  <>
                    <span className={`${styles.prompt} whitespace-nowrap select-none ${glowing ? 'drop-shadow-[0_0_5px_currentColor]' : ''}`}>
                      {line.prompt || prompt}
                    </span>
                    <span className={`${styles.command} ${glowing ? 'drop-shadow-[0_0_5px_currentColor]' : ''}`}>
                      {line.content}
                      {isLastCommand && <span className="animate-pulse ml-0.5">█</span>}
                    </span>
                  </>
                ) : (
                  <span className={`${outputColor} whitespace-pre-wrap break-all`}>{line.content}</span>
                )}
              </div>
            );
          })}
          
          {showInput && (
            <form onSubmit={handleSubmit} className="flex gap-2 mt-2 pt-2 border-t border-gray-800">
              <span className={`${styles.prompt} ${glowing ? 'drop-shadow-[0_0_5px_currentColor]' : ''}`}>{prompt}</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputPlaceholder}
                className="flex-1 bg-transparent border-none text-gray-100 text-sm outline-none caret-green-400 placeholder:text-gray-700"
                autoFocus
              />
            </form>
          )}
        </div>
        
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }
);

TerminalOutput.displayName = 'TerminalOutput';
export default TerminalOutput;
