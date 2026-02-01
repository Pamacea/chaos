'use client';

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';

export interface AsciiArtProps extends HTMLAttributes<HTMLPreElement> {
  children: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'blood' | 'cyber' | 'matrix' | 'amber' | 'ghost' | 'gradient';
  animation?: 'none' | 'typing' | 'reveal' | 'glitch' | 'flicker' | 'pulse';
  scanlines?: boolean;
  bordered?: boolean;
  title?: string;
  revealDelay?: number;
  color?: string;
}

const sizeClasses = {
  xs: 'text-[0.5rem]',
  sm: 'text-[0.65rem]',
  md: 'text-[0.8rem]',
  lg: 'text-base',
  xl: 'text-xl',
};

const variantClasses = {
  default: '',
  blood: 'text-rose-500 drop-shadow-[0_0_5px_#ff004080]',
  cyber: 'text-cyan-400 drop-shadow-[0_0_5px_#00ffff80]',
  matrix: 'text-green-400 drop-shadow-[0_0_5px_#00ff0080]',
  amber: 'text-amber-500 drop-shadow-[0_0_5px_#ffaa0080]',
  ghost: 'text-gray-500 opacity-70',
  gradient: 'bg-gradient-to-b from-rose-500 via-cyan-400 to-green-400 bg-clip-text text-transparent',
};

const animationClasses = {
  none: '',
  typing: 'overflow-hidden whitespace-nowrap animate-[typeIn_2s_steps(40,end)_forwards]',
  reveal: '',
  glitch: 'relative',
  flicker: 'animate-pulse',
  pulse: 'animate-[pulse_2s_ease-in-out_infinite]',
};

export const AsciiArt = forwardRef<HTMLPreElement, AsciiArtProps>(
  (
    {
      children,
      size = 'md',
      variant = 'default',
      animation = 'none',
      scanlines = false,
      bordered = false,
      title,
      revealDelay = 100,
      color,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [revealedLines, setRevealedLines] = useState<number>(0);
    const lines = children.split('\n');

    useEffect(() => {
      if (animation === 'reveal') {
        setRevealedLines(0);
        let lineIndex = 0;
        
        const interval = setInterval(() => {
          if (lineIndex < lines.length) {
            setRevealedLines(lineIndex + 1);
            lineIndex++;
          } else {
            clearInterval(interval);
          }
        }, revealDelay);

        return () => clearInterval(interval);
      }
    }, [animation, lines.length, revealDelay, children]);

    const renderContent = () => {
      if (animation === 'reveal') {
        return lines.map((line, i) => (
          <span
            key={i}
            className="block transition-all duration-300 ease-out"
            style={{
              opacity: i < revealedLines ? 1 : 0,
              transform: i < revealedLines ? 'translateX(0)' : 'translateX(-10px)',
            }}
          >
            {line}
            {'\n'}
          </span>
        ));
      }
      return children;
    };

    return (
      <pre
        ref={ref}
        className={`font-mono whitespace-pre leading-tight overflow-x-auto ${sizeClasses[size]} ${variantClasses[variant]} ${animationClasses[animation]} ${
          bordered ? 'border border-current p-4 relative' : ''
        } ${scanlines ? 'relative after:absolute after:inset-0 after:bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] after:pointer-events-none' : ''
        } ${className}`}
        style={{ color, ...style }}
        {...props}
      >
        {bordered && title && (
          <span className="absolute -top-2.5 left-4 bg-inherit px-2 text-[0.8em]">
            ┌{title}┐
          </span>
        )}
        {renderContent()}
      </pre>
    );
  }
);

AsciiArt.displayName = 'AsciiArt';
export default AsciiArt;
