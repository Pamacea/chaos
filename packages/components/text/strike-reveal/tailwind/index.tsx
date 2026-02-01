'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef } from 'react';

export interface StrikeRevealProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  revealText?: string;
  variant?: 'permanent' | 'crossout' | 'redacted' | 'censored' | 'glitch';
  color?: 'default' | 'blood' | 'cyber' | 'acid' | 'void';
  trigger?: 'auto' | 'hover' | 'scroll' | 'click';
  delay?: number;
  double?: boolean;
  strikeColor?: string;
  onReveal?: () => void;
}

const colorStyles = {
  default: 'bg-current',
  blood: 'bg-rose-500',
  cyber: 'bg-cyan-400',
  acid: 'bg-lime-400',
  void: 'bg-[#0a0a0a]',
};

export const StrikeReveal = forwardRef<HTMLSpanElement, StrikeRevealProps>(
  (
    {
      children,
      revealText,
      variant = 'permanent',
      color = 'default',
      trigger = 'auto',
      delay = 0,
      double = false,
      strikeColor,
      onReveal,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (trigger === 'auto') {
        const timeout = setTimeout(() => {
          setIsActive(true);
          setTimeout(() => onReveal?.(), 700);
        }, delay);
        return () => clearTimeout(timeout);
      }

      if (trigger === 'scroll') {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setIsActive(true);
                setTimeout(() => onReveal?.(), 700);
              }, delay);
            }
          },
          { threshold: 0.5 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
      }
    }, [trigger, delay, onReveal]);

    const handleClick = () => {
      if (trigger === 'click') {
        setIsActive(true);
        setTimeout(() => onReveal?.(), 700);
      }
    };

    const handleMouseEnter = () => {
      if (trigger === 'hover') setIsActive(true);
    };

    const handleMouseLeave = () => {
      if (trigger === 'hover') setIsActive(false);
    };

    const strikeHeight = variant === 'redacted' ? 'h-[1em]' : variant === 'censored' ? 'h-full' : 'h-0.5';
    const bgStyle = strikeColor ? { backgroundColor: strikeColor } : undefined;

    return (
      <span
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={`relative inline-block ${className}`}
        style={style}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span className={`relative inline ${isActive && variant === 'crossout' ? 'opacity-30' : ''} ${isActive && variant === 'redacted' ? 'text-transparent' : ''} transition-opacity duration-300`}>
          {children}
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 ${strikeHeight} ${colorStyles[color]} transition-all duration-400 ease-out ${
              isActive ? 'w-full' : 'w-0'
            }`}
            style={bgStyle}
          />
          {double && (
            <span
              className={`absolute left-0 top-1/2 translate-y-0.5 h-0.5 ${colorStyles[color]} opacity-50 transition-all duration-400 ease-out ${
                isActive ? 'w-full' : 'w-0'
              }`}
              style={bgStyle}
            />
          )}
        </span>
        {revealText && (
          <span
            className={`block mt-2 transition-all duration-400 ease-out ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {revealText}
          </span>
        )}
      </span>
    );
  }
);

StrikeReveal.displayName = 'StrikeReveal';
export default StrikeReveal;
