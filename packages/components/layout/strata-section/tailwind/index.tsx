'use client';

import { forwardRef, useEffect, useRef, HTMLAttributes } from 'react';

export interface StrataSectionProps extends HTMLAttributes<HTMLElement> {
  /** Depth in meters for this stratum */
  depth: number;
  /** Background color */
  color?: string;
  /** Text color */
  textColor?: string;
  /** Pattern overlay type */
  pattern?: 'lines' | 'lines-diagonal' | 'dots' | 'gradient' | 'fossil' | 'rust' | 'none';
  /** Font family override */
  font?: string;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Statistics to display */
  stats?: Array<{ label: string; value: string | number }>;
  /** Content position */
  position?: 'left' | 'center' | 'right';
  /** Show jagged edge at bottom */
  showEdge?: boolean;
  /** Show stratum number label */
  showNumber?: boolean;
  /** Show decorative line */
  showLine?: boolean;
  /** Enable fade-in animation on scroll */
  animate?: boolean;
  /** Animation threshold (0-1) */
  animationThreshold?: number;
  /** Spacing for title in pixels */
  spacing?: number;
}

const positionClasses = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

export const StrataSection = forwardRef<HTMLElement, StrataSectionProps>(
  (
    {
      depth,
      color = '#8b8680',
      textColor,
      pattern = 'none',
      font,
      title,
      description,
      stats,
      position = 'center',
      showEdge = true,
      showNumber = true,
      showLine = false,
      animate = true,
      animationThreshold = 0.3,
      spacing = 40,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Merge refs
    const setRef = (element: HTMLElement | null) => {
      containerRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // Intersection Observer for fade-in animation
    useEffect(() => {
      if (!animate || !contentRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        {
          threshold: animationThreshold,
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(contentRef.current);

      return () => {
        observer.disconnect();
      };
    }, [animate, animationThreshold]);

    const hasContent = title || description || stats || children;

    // Pattern backgrounds
    const patternStyles = {
      lines: {
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)',
      },
      'lines-diagonal': {
        backgroundImage: 'repeating-linear-gradient(2deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 6px)',
      },
      dots: {
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      },
      gradient: {
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
      },
      fossil: {
        backgroundImage: 'radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
      },
      rust: {
        backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(139,105,20,0.3) 0%, transparent 40%), radial-gradient(ellipse at 20% 80%, rgba(60,40,30,0.4) 0%, transparent 40%)',
      },
      none: {},
    };

    return (
      <section
        ref={setRef}
        className={`
          relative min-h-screen flex flex-col justify-center items-center
          px-5 py-[120px] md:px-20 overflow-hidden
          ${positionClasses[position]}
          ${className || ''}
        `}
        style={{
          backgroundColor: color,
          color: textColor,
          fontFamily: font,
          ...style,
        }}
        {...props}
      >
        {/* Pattern overlay */}
        {pattern !== 'none' && (
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={patternStyles[pattern]}
          />
        )}

        {/* Fossil decoration */}
        {pattern === 'fossil' && (
          <div
            className="hidden md:block absolute right-[15%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 border-current opacity-15 rounded-[50%_50%_45%_55%/_50%_45%_55%_50%] pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute inset-[30px] border border-current rounded-[inherit]" />
          </div>
        )}

        {/* Decorative line */}
        {showLine && (
          <div
            className={`absolute top-1/2 w-[60px] h-px bg-current opacity-20 ${
              position === 'right' || position === 'center' ? 'right-20' : 'left-20'
            } md:block hidden`}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <div
          ref={contentRef}
          className={`relative z-10 w-full max-w-5xl ${animate && hasContent ? 'fade-content' : ''}`}
        >
          {title && (
            <h2
              className="font-bold leading-[0.85] tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                marginBottom: `${spacing}px`,
              }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              className="text-[clamp(1rem,2vw,1.5rem)] leading-relaxed max-w-[600px] opacity-80"
              style={{ marginLeft: position === 'center' ? 'auto' : '', marginRight: position === 'center' ? 'auto' : '' }}
            >
              {description}
            </p>
          )}

          {stats && stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 text-left">
              {stats.map((stat, index) => (
                <div key={index} className="opacity-70">
                  <div className="font-bold text-[clamp(2rem,5vw,4rem)] leading-none">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest mt-3 opacity-60">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {children}
        </div>

        {/* Jagged edge */}
        {showEdge && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[60px] z-20"
            style={{
              backgroundColor: color,
              clipPath: 'polygon(0% 100%, 3% 45%, 8% 60%, 15% 30%, 22% 55%, 30% 20%, 38% 50%, 45% 25%, 52% 60%, 60% 15%, 68% 45%, 75% 30%, 82% 55%, 88% 20%, 95% 50%, 100% 35%, 100% 100%)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Stratum number */}
        {showNumber && (
          <span
            className="absolute bottom-16 right-20 md:right-20 text-[0.7rem] uppercase tracking-[0.3em] opacity-30"
            style={{ left: position === 'left' ? '80px' : '', right: position === 'left' ? '' : '80px' }}
          >
            {depth > 0 ? `— ${depth}m` : 'Surface — 0m'}
          </span>
        )}

        {/* Fade-in styles */}
        <style>{`
          .fade-content > * {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          .fade-content.in-view > * {
            opacity: 1;
            transform: translateY(0);
          }
          .fade-content.in-view > *:nth-child(1) { transition-delay: 0.1s; }
          .fade-content.in-view > *:nth-child(2) { transition-delay: 0.2s; }
          .fade-content.in-view > *:nth-child(3) { transition-delay: 0.3s; }
          .fade-content.in-view > *:nth-child(4) { transition-delay: 0.4s; }
          .fade-content.in-view > *:nth-child(5) { transition-delay: 0.5s; }
        `}</style>
      </section>
    );
  }
);

StrataSection.displayName = 'StrataSection';

export default StrataSection;
