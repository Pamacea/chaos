'use client';

import { forwardRef, useRef, useState, useEffect, ButtonHTMLAttributes, MouseEvent } from 'react';
import styles from './magnetic-button.module.css';

export type MagneticStrength = 'weak' | 'medium' | 'strong' | 'intense';
export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'default' | 'large';
export type ColorVariant = 'default' | 'neon' | 'cyber' | 'fire' | 'toxic' | 'warning';

export interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Magnetic pull strength */
  strength?: MagneticStrength;
  /** Button visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Color theme */
  color?: ColorVariant;
  /** Accent color override */
  accentColor?: string;
  /** Enable glow effect */
  glow?: boolean;
  /** Enable pulsing animation */
  pulsing?: boolean;
  /** Show magnetic field lines */
  showFieldLines?: boolean;
  /** Show floating particles */
  showParticles?: boolean;
  /** Enable glitch text effect on hover */
  glitchText?: boolean;
  /** Enable click ripple effect */
  ripple?: boolean;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      strength = 'medium',
      variant = 'solid',
      size = 'default',
      color = 'default',
      accentColor,
      glow = false,
      pulsing = false,
      showFieldLines = false,
      showParticles = false,
      glitchText = false,
      ripple = true,
      className,
      style,
      onMouseMove,
      onMouseLeave,
      onClick,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const innerRef = (ref as React.RefObject<HTMLButtonElement>) || buttonRef;
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

    // Magnetic effect
    useEffect(() => {
      const button = innerRef.current;
      if (!button) return;

      const strengthValues = { weak: 0.2, medium: 0.5, strong: 0.8, intense: 1 };
      const strengthValue = strengthValues[strength];

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strengthValue;
        const deltaY = (e.clientY - centerY) * strengthValue;

        setPosition({ x: deltaX, y: deltaY });
        onMouseMove?.(e);
      };

      const handleMouseLeave = (e: MouseEvent) => {
        setPosition({ x: 0, y: 0 });
        onMouseLeave?.(e);
      };

      button.addEventListener('mousemove', handleMouseMove as any);
      button.addEventListener('mouseleave', handleMouseLeave as any);

      return () => {
        button.removeEventListener('mousemove', handleMouseMove as any);
        button.removeEventListener('mouseleave', handleMouseLeave as any);
      };
    }, [strength, innerRef, onMouseMove, onMouseLeave]);

    // Ripple effect
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const button = innerRef.current;
        if (button) {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const newRipple = {
            id: Date.now(),
            x,
            y,
          };

          setRipples((prev) => [...prev, newRipple]);

          setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
          }, 600);
        }
      }
      onClick?.(e);
    };

    return (
      <button
        ref={innerRef}
        className={`${styles.button} ${styles[variant]} ${styles[`strength-${strength}`]} ${styles[size]} ${styles[color]} ${glow ? styles.glow : ''} ${pulsing ? styles.pulsing : ''} ${glitchText ? styles.glitchText : ''} ${className || ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          '--accent': accentColor,
          ...style,
        } as React.CSSProperties}
        onClick={handleClick}
        data-text={typeof children === 'string' ? children : undefined}
        {...props}
      >
        {/* Field lines decoration */}
        {showFieldLines && (
          <div className={styles.fieldLines}>
            <div className={styles.fieldLine} />
            <div className={styles.fieldLine} />
            <div className={styles.fieldLine} />
          </div>
        )}

        {/* Particles */}
        {showParticles && (
          <div className={styles.particles}>
            <div className={styles.particle} />
            <div className={styles.particle} />
            <div className={styles.particle} />
            <div className={styles.particle} />
          </div>
        )}

        {/* Ripples */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className={styles.ripple}
            style={{
              left: r.x,
              top: r.y,
              width: '20px',
              height: '20px',
              marginLeft: '-10px',
              marginTop: '-10px',
            }}
          />
        ))}

        {/* Content */}
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
