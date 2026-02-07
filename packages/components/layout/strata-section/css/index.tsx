'use client';

import { forwardRef, useEffect, useRef, HTMLAttributes } from 'react';
import styles from './strata-section.module.css';

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
  /** Spacing for title */
  spacing?: number;
}

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
              contentRef.current?.classList.add(styles.inView);
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

    // Pattern class mapping
    const patternClasses = {
      lines: styles.patternLines,
      'lines-diagonal': styles.patternLinesDiagonal,
      dots: styles.patternDots,
      gradient: styles.patternGradient,
      fossil: styles.patternFossil,
      rust: styles.patternRust,
      none: '',
    };

    // Position class mapping
    const positionClasses = {
      left: styles.positionLeft,
      center: styles.positionCenter,
      right: styles.positionRight,
    };

    const hasContent = title || description || stats || children;

    return (
      <section
        ref={setRef}
        className={`${styles.container} ${positionClasses[position]} ${showEdge ? '' : styles.noEdge} ${className || ''}`}
        style={{
          '--strata-bg': color,
          '--strata-text': textColor,
          '--strata-font': font,
          '--strata-spacing': `${spacing}px`,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {/* Pattern overlay */}
        {pattern !== 'none' && (
          <div className={`${styles.patternOverlay} ${patternClasses[pattern]}`} />
        )}

        {/* Fossil decoration */}
        {pattern === 'fossil' && <div className={styles.fossil} aria-hidden="true" />}

        {/* Decorative line */}
        {showLine && <div className={styles.decorationLine} aria-hidden="true" />}

        {/* Main content */}
        <div
          ref={contentRef}
          className={`${styles.content} ${animate && hasContent ? styles.fadeContent : ''}`}
        >
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}

          {stats && stats.length > 0 && (
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {children}
        </div>

        {/* Jagged edge */}
        {showEdge && <div className={styles.jaggedEdge} aria-hidden="true" />}

        {/* Stratum number */}
        {showNumber && (
          <span className={styles.stratumNumber}>
            {depth > 0 ? `— ${depth}m` : 'Surface — 0m'}
          </span>
        )}
      </section>
    );
  }
);

StrataSection.displayName = 'StrataSection';

export default StrataSection;
