'use client';

import { forwardRef, useEffect, useState, useRef, HTMLAttributes } from 'react';

export type DistortionMode = 'glitch' | 'wave' | 'scramble' | 'noise' | 'split' | 'blink' | 'drip';
export type IntensityLevel = 'mild' | 'medium' | 'intense';
export type TriggerType = 'none' | 'hover' | 'click' | 'mount' | 'continuous';

export interface TextDistorterProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text to distort */
  children: string;
  /** Distortion mode */
  mode?: DistortionMode;
  /** Intensity level */
  intensity?: IntensityLevel;
  /** When to trigger distortion */
  trigger?: TriggerType;
  /** Custom color for glitch effect */
  glitchColor1?: string;
  /** Secondary glitch color */
  glitchColor2?: string;
  /** Color variant */
  variant?: 'default' | 'neon' | 'fire' | 'matrix' | 'corruption';
  /** Size variant */
  size?: 'default' | 'small' | 'large' | 'xl';
  /** Scramble characters */
  scrambleChars?: string;
  /** Distortion speed (ms) */
  speed?: number;
  /** Wave delay between characters (ms) */
  waveDelay?: number;
}

const DEFAULT_SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

const variantColors = {
  default: { color1: '#ff00ff', color2: '#00ffff' },
  neon: { color1: '#ff00ff', color2: '#00ffff' },
  fire: { color1: '#ff4400', color2: '#ffaa00' },
  matrix: { color1: '#00ff00', color2: '#003300' },
  corruption: { color1: '#ff0000', color2: '#ffffff' },
};

const intensityClasses = {
  mild: { noiseIntensity: 0.3, animDuration: '2s' },
  medium: { noiseIntensity: 0.5, animDuration: '1s' },
  intense: { noiseIntensity: 0.8, animDuration: '0.5s' },
};

const sizeClasses = {
  small: 'text-xs',
  default: 'text-sm',
  large: 'text-xl',
  xl: 'text-2xl',
};

export const TextDistorter = forwardRef<HTMLSpanElement, TextDistorterProps>(
  (
    {
      children,
      mode = 'glitch',
      intensity = 'medium',
      trigger = 'continuous',
      glitchColor1,
      glitchColor2,
      variant = 'default',
      size = 'default',
      scrambleChars = DEFAULT_SCRAMBLE_CHARS,
      speed = 50,
      waveDelay = 50,
      className = '',
      ...props
    },
    ref
  ) => {
    const [displayText, setDisplayText] = useState(children);
    const [isDistorting, setIsDistorting] = useState(trigger === 'continuous' || trigger === 'mount');
    const scrambleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const colors = glitchColor1 && glitchColor2
      ? { color1: glitchColor1, color2: glitchColor2 }
      : variantColors[variant];

    const intensityConfig = intensityClasses[intensity];

    const scrambleText = (targetText: string, duration: number) => {
      const startTime = Date.now();
      const length = targetText.length;

      const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        let newText = '';
        for (let i = 0; i < length; i++) {
          const charProgress = Math.max(0, progress * length - i * 0.5);
          if (charProgress >= 1 || Math.random() > charProgress) {
            newText += targetText[i];
          } else {
            newText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }

        setDisplayText(newText);

        if (progress < 1) {
          scrambleTimeoutRef.current = setTimeout(update, speed);
        } else {
          setDisplayText(targetText);
        }
      };

      update();
    };

    useEffect(() => {
      if (trigger === 'mount') {
        if (mode === 'scramble') {
          scrambleText(children, 1000);
        }
        const timer = setTimeout(() => setIsDistorting(false), 2000);
        return () => clearTimeout(timer);
      }
    }, [children, trigger, mode]);

    useEffect(() => {
      if (trigger === 'continuous' && mode === 'scramble') {
        const interval = setInterval(() => {
          scrambleText(children, 500);
        }, 3000);
        return () => clearInterval(interval);
      }
    }, [children, trigger, mode]);

    const handleInteraction = () => {
      if (trigger === 'hover' || trigger === 'click') {
        if (mode === 'scramble') {
          scrambleText(children, 800);
        }
        setIsDistorting(true);
        setTimeout(() => setIsDistorting(false), 1000);
      }
    };

    const renderChars = () => {
      return displayText.split('').map((char, index) => {
        const delay = mode === 'wave' ? index * waveDelay : 0;
        return (
          <span
            key={index}
            className="inline-block"
            style={{ animationDelay: `${delay}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      });
    };

    const shouldUseChars = mode === 'wave' || mode === 'split' || mode === 'blink';

    const getModeClasses = () => {
      switch (mode) {
        case 'glitch':
          return 'relative animate-[glitchSkew_1s_infinite_linear_alternate]';
        case 'wave':
          return 'inline-flex';
        case 'scramble':
          return `font-mono ${isDistorting ? 'animate-[scrambleShake_0.1s_infinite]' : ''}`;
        case 'noise':
          return 'relative';
        case 'split':
          return 'relative';
        case 'blink':
          return '';
        case 'drip':
          return 'relative overflow-visible';
        default:
          return '';
      }
    };

    return (
      <span
        ref={ref}
        className={`inline-block ${getModeClasses()} ${sizeClasses[size]} ${trigger === 'hover' ? 'hover:opacity-100' : ''} ${className}`}
        data-text={children}
        onMouseEnter={trigger === 'hover' ? handleInteraction : undefined}
        onClick={trigger === 'click' ? handleInteraction : undefined}
        {...props}
      >
        {shouldUseChars ? renderChars() : displayText}

        {/* Glitch layers */}
        {mode === 'glitch' && (
          <>
            <span
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{
                color: colors.color1,
                animation: 'glitchAnim1 0.4s infinite linear alternate-reverse',
                clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)',
                transform: 'translate(-2px, -2px)',
              }}
            >
              {children}
            </span>
            <span
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{
                color: colors.color2,
                animation: 'glitchAnim2 0.4s infinite linear alternate-reverse',
                clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)',
                transform: 'translate(2px, 2px)',
              }}
            >
              {children}
            </span>
          </>
        )}

        {/* Noise overlay */}
        {mode === 'noise' && (
          <span
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              opacity: intensityConfig.noiseIntensity,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              ...(isDistorting ? { animation: 'noiseShift 0.05s infinite' } : {}),
            }}
          />
        )}

        {/* Drip effect */}
        {mode === 'drip' && (
          <span
            className="absolute -bottom-1 left-0 w-0.5 bg-current"
            style={{ animation: 'dripAnim 2s ease-in infinite' }}
          />
        )}

        {/* Styles for animations */}
        <style>{`
          @keyframes glitchSkew {
            0% { transform: skew(0deg); }
            20% { transform: skew(-2deg); }
            40% { transform: skew(2deg); }
            60% { transform: skew(-1deg); }
            80% { transform: skew(1deg); }
            100% { transform: skew(0deg); }
          }
          @keyframes glitchAnim1 {
            0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
            20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
            40% { clip-path: inset(10% 0 50% 0); transform: translate(-2px, 2px); }
            60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
            80% { clip-path: inset(30% 0 40% 0); transform: translate(-1px, 1px); }
            100% { clip-path: inset(50% 0 30% 0); transform: translate(1px, -1px); }
          }
          @keyframes glitchAnim2 {
            0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, 2px); }
            20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, -2px); }
            40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
            60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 2px); }
            80% { clip-path: inset(50% 0 30% 0); transform: translate(2px, -2px); }
            100% { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 2px); }
          }
          @keyframes waveAnim {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes scrambleShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-1px); }
            75% { transform: translateX(1px); }
          }
          @keyframes noiseShift {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-1px, 1px); }
            50% { transform: translate(1px, -1px); }
            75% { transform: translate(-1px, -1px); }
            100% { transform: translate(1px, 1px); }
          }
          @keyframes splitAnim {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(-20px) scale(1.5); opacity: 0.5; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }
          @keyframes blinkAnim {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes dripAnim {
            0% { height: 0; opacity: 1; }
            70% { height: 20px; opacity: 1; }
            100% { height: 30px; opacity: 0; }
          }
          .wave > span {
            animation: waveAnim ${intensityConfig.animDuration} ease-in-out infinite;
          }
          .split:hover > span {
            animation: splitAnim 0.5s ease forwards;
          }
          .blink > span {
            animation: blinkAnim 1s steps(1) infinite;
          }
          ${variant === 'neon' ? `text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;` : ''}
          ${variant === 'fire' ? `text-shadow: 0 0 10px #ff4400, 0 0 20px #ff0000;` : ''}
          ${variant === 'matrix' ? `text-shadow: 0 0 5px #00ff00;` : ''}
          ${variant === 'corruption' ? `text-shadow: 2px 0 #ff0000, -2px 0 #0000ff;` : ''}
        `}</style>
      </span>
    );
  }
);

TextDistorter.displayName = 'TextDistorter';

export default TextDistorter;
