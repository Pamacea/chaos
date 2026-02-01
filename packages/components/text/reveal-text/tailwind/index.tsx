'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef } from 'react';

export interface RevealTextProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  splitBy?: 'word' | 'char' | 'line';
  direction?: 'fromBottom' | 'fromTop' | 'fromLeft' | 'fromRight';
  effect?: 'none' | 'blur' | 'scale' | 'rotate';
  stagger?: number;
  speed?: 'fast' | 'normal' | 'slow';
  threshold?: number;
  once?: boolean;
  highlight?: boolean;
  highlightColor?: string;
  immediate?: boolean;
}

const speedDurations = { fast: 'duration-300', normal: 'duration-500', slow: 'duration-1000' };

const hiddenTransforms = {
  fromBottom: 'translate-y-full',
  fromTop: '-translate-y-full',
  fromLeft: '-translate-x-full',
  fromRight: 'translate-x-full',
};

export const RevealText = forwardRef<HTMLDivElement, RevealTextProps>(
  (
    {
      children,
      splitBy = 'word',
      direction = 'fromBottom',
      effect = 'none',
      stagger = 50,
      speed = 'normal',
      threshold = 0.2,
      once = true,
      highlight = false,
      highlightColor = '#ff0040',
      immediate = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    const elements = splitBy === 'line' 
      ? children.split('\n') 
      : splitBy === 'char' 
        ? children.split('') 
        : children.split(' ');

    useEffect(() => {
      if (immediate) {
        elements.forEach((_, i) => {
          setTimeout(() => {
            setVisibleIndices(prev => new Set(prev).add(i));
          }, i * stagger);
        });
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            hasAnimated.current = true;
            elements.forEach((_, i) => {
              setTimeout(() => {
                setVisibleIndices(prev => new Set(prev).add(i));
              }, i * stagger);
            });
          } else if (!entry.isIntersecting && !once) {
            setVisibleIndices(new Set());
          }
        },
        { threshold }
      );

      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, [elements, stagger, threshold, once, immediate]);

    const renderElement = (text: string, index: number) => {
      const isVisible = visibleIndices.has(index);
      const duration = speedDurations[speed];
      
      const baseClasses = `inline-block overflow-hidden ${splitBy === 'line' ? 'block mb-1' : 'mr-1'}`;
      const innerBase = `inline-block transition-all ease-out ${duration}`;
      const hiddenState = `${hiddenTransforms[direction]} opacity-0 ${effect === 'blur' ? 'blur-sm' : ''} ${effect === 'scale' ? 'scale-75' : ''}`;
      const visibleState = 'translate-y-0 translate-x-0 opacity-100 blur-0 scale-100';

      return (
        <span key={index} className={`${baseClasses} ${highlight ? 'relative' : ''}`}>
          <span
            className={`${innerBase} ${isVisible ? visibleState : hiddenState}`}
            style={{ transitionDelay: `${index * stagger}ms` }}
          >
            {text === ' ' ? '\u00A0' : text}
          </span>
          {highlight && (
            <span
              className={`absolute bottom-0 left-0 h-[30%] -z-10 transition-all ${duration} opacity-30`}
              style={{
                backgroundColor: highlightColor,
                width: isVisible ? '100%' : '0%',
                transitionDelay: `${index * stagger + 200}ms`,
              }}
            />
          )}
        </span>
      );
    };

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={`relative ${className}`}
        {...props}
      >
        {elements.map(renderElement)}
      </div>
    );
  }
);

RevealText.displayName = 'RevealText';
export default RevealText;
