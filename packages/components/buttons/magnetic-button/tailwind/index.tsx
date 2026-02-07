'use client';

import { forwardRef, useRef, useState, useEffect, ButtonHTMLAttributes, MouseEvent } from 'react';

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

const variantColors = {
  default: '#00ff00',
  neon: '#ff00ff',
  cyber: '#00ffff',
  fire: '#ff4400',
  toxic: '#00ff00',
  warning: '#ffaa00',
};

const sizeClasses = {
  small: 'py-2 px-4 text-xs',
  default: 'py-4 px-8 text-sm',
  large: 'py-6 px-12 text-base',
};

const variantClasses = {
  solid: 'text-black',
  outline: 'bg-transparent border border-current text-inherit',
  ghost: 'bg-white/10 text-inherit backdrop-blur-md',
};

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
      className = '',
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

    const color = accentColor || variantColors[color];
    const strengthValues = { weak: 0.2, medium: 0.5, strong: 0.8, intense: 1 };
    const strengthValue = strengthValues[strength];

    useEffect(() => {
      const button = innerRef.current;
      if (!button) return;

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

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const button = innerRef.current;
        if (button) {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const newRipple = { id: Date.now(), x, y };
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
        className={`
          relative inline-flex items-center justify-center
          font-inherit font-semibold uppercase tracking-[0.1em]
          border-none rounded cursor-pointer
          transition-transform duration-100 ease-out
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${glow ? 'shadow-[0_0_20px_var(--color)] hover:shadow-[0_0_30px_var(--color),0_0_60px_var(--color)]' : ''}
          ${pulsing ? 'animate-[magneticPulse_2s_ease-in-out_infinite]' : ''}
          ${className}
        `}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          backgroundColor: variant === 'solid' ? color : undefined,
          '--color': color,
          ...style,
        } as React.CSSProperties}
        onClick={handleClick}
        data-text={typeof children === 'string' ? children : undefined}
        {...props}
      >
        {/* Field lines */}
        {showFieldLines && (
          <div className="absolute inset-[-20px] pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-30">
            <span className="absolute inset-0 border border-[var(--color)] rounded-full animate-[fieldPulse_2s_ease-in-out_infinite]" />
            <span className="absolute inset-1 border border-[var(--color)] rounded-full animate-[fieldPulse_2s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }} />
            <span className="absolute inset-2 border border-[var(--color)] rounded-full animate-[fieldPulse_2s_ease-in-out_infinite]" style={{ animationDelay: '0.6s' }} />
          </div>
        )}

        {/* Particles */}
        {showParticles && (
          <div className="absolute inset-[-10px] pointer-events-none">
            <span className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-[var(--color)] rounded-full opacity-0 animate-[particleFloat_1s_ease-in-out_infinite]" />
            <span className="absolute top-1/2 right-0 w-0.5 h-0.5 bg-[var(--color)] rounded-full opacity-0 animate-[particleFloat_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
            <span className="absolute bottom-0 left-1/2 w-0.5 h-0.5 bg-[var(--color)] rounded-full opacity-0 animate-[particleFloat_1s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
            <span className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-[var(--color)] rounded-full opacity-0 animate-[particleFloat_1s_ease-in-out_infinite]" style={{ animationDelay: '0.6s' }} />
          </div>
        )}

        {/* Ripples */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/50 animate-[ripple_0.6s_ease-out] pointer-events-none"
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

        {/* Glitch text layers */}
        {glitchText && typeof children === 'string' && (
          <>
            <span
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-200"
              style={{
                color,
                clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)',
                transform: 'translate(-2px, -2px)',
              }}
            >
              {children}
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-200"
              style={{
                color: variantColors.neon,
                clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)',
                transform: 'translate(2px, 2px)',
              }}
            >
              {children}
            </span>
          </>
        )}

        {/* Content */}
        <span className="relative z-10 pointer-events-none">{children}</span>

        <style>{`
          @keyframes magneticPulse {
            0%, 100% { box-shadow: 0 0 20px var(--color); }
            50% { box-shadow: 0 0 40px var(--color), 0 0 60px var(--color); }
          }
          @keyframes fieldPulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.2; }
          }
          @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0); opacity: 1; }
            25% { transform: translate(5px, -5px); }
            50% { transform: translate(0, -10px); }
            75% { transform: translate(-5px, -5px); }
          }
          @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
          }
        `}</style>
      </button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
