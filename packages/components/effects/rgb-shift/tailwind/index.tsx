'use client';

import { useState, useCallback, cloneElement, ReactElement, HTMLAttributes } from 'react';

export interface RgbShiftProps extends HTMLAttributes<HTMLDivElement> {
  /** Child element to apply RGB shift to */
  children: ReactElement;
  /** Shift intensity */
  intensity?: 'subtle' | 'moderate' | 'intense' | 'extreme';
  /** Shift direction */
  direction?: 'horizontal' | 'vertical' | 'diagonal' | 'random';
  /** Animation style */
  animation?: 'none' | 'pulse' | 'glitch' | 'shimmer';
  /** Transition speed in seconds */
  transitionSpeed?: number;
  /** Trigger on click instead of hover */
  clickToTrigger?: boolean;
  /** Custom shift amount in pixels */
  customShift?: number;
}

export function RgbShift({
  children,
  intensity = 'moderate',
  direction = 'horizontal',
  animation = 'none',
  transitionSpeed = 0.3,
  clickToTrigger = false,
  customShift,
  className = '',
  style,
  ...props
}: RgbShiftProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = useCallback(() => {
    if (clickToTrigger) {
      setIsActive(prev => !prev);
    }
  }, [clickToTrigger]);

  const getShiftAmount = () => {
    if (customShift) return customShift;
    switch (intensity) {
      case 'subtle': return 2;
      case 'moderate': return 4;
      case 'intense': return 8;
      case 'extreme': return 12;
      default: return 4;
    }
  };

  const shift = getShiftAmount();

  const getTransform = (channel: 'red' | 'green' | 'blue') => {
    if (animation === 'glitch') {
      return `translate(${Math.random() * shift - shift/2}px, ${Math.random() * shift - shift/2}px)`;
    }
    if (isActive || !clickToTrigger) {
      switch (channel) {
        case 'red':
          return direction === 'vertical' ? `translate(0, -${shift}px)` :
            direction === 'diagonal' ? `translate(-${shift}px, -${shift/2}px)` :
              `translate(-${shift}px, 0)`;
        case 'green':
          return 'translate(0, 0)';
        case 'blue':
          return direction === 'vertical' ? `translate(0, ${shift}px)` :
            direction === 'diagonal' ? `translate(${shift}px, ${shift/2}px)` :
              `translate(${shift}px, 0)`;
      }
    }
    return 'translate(0, 0)';
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={style}
      onClick={handleClick}
      {...props}
    >
      <style>{`
        @keyframes rgb-pulse {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-${shift}px, 0); }
          50% { transform: translate(0, 0); }
          75% { transform: translate(${shift}px, 0); }
        }
        @keyframes rgb-shimmer {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          33% { transform: translate(-${shift}px, 0); opacity: 0.8; }
          66% { transform: translate(${shift}px, 0); opacity: 0.9; }
        }
        .rgb-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          transition: transform ${transitionSpeed}s ease;
        }
        ${animation === 'pulse' ? `.rgb-layer.red { animation: rgb-pulse 2s ease-in-out infinite; }` : ''}
        ${animation === 'shimmer' ? `.rgb-layer { animation: rgb-shimmer 3s ease-in-out infinite; }` : ''}
      `}</style>
      {/* Red channel */}
      <div
        className="rgb-layer red z-10"
        style={{
          transform: getTransform('red'),
          animation: animation === 'glitch' ? `rgb-glitch 0.3s infinite` : undefined,
        }}
      >
        {cloneElement(children, {
          style: {
            ...children.props.style,
            color: 'transparent',
            textShadow: '2px 0 0.3px rgba(255, 0, 0, 0.8)',
          },
        })}
      </div>
      {/* Green channel */}
      <div
        className="rgb-layer green z-20"
        style={{
          transform: getTransform('green'),
          animation: animation === 'glitch' ? `rgb-glitch 0.3s 0.05s infinite` : undefined,
        }}
      >
        {cloneElement(children, {
          style: {
            ...children.props.style,
            color: 'transparent',
            textShadow: '-1px 0 0.3px rgba(0, 255, 0, 0.8)',
          },
        })}
      </div>
      {/* Blue channel */}
      <div
        className="rgb-layer blue z-30"
        style={{
          transform: getTransform('blue'),
          animation: animation === 'glitch' ? `rgb-glitch 0.3s 0.1s infinite` : undefined,
        }}
      >
        {cloneElement(children, {
          style: {
            ...children.props.style,
            color: 'transparent',
            textShadow: '-1px 0 0.3px rgba(0, 0, 255, 0.8)',
          },
        })}
      </div>
      {/* Original content */}
      <div className="relative z-40">
        {children}
      </div>
    </div>
  );
}

RgbShift.displayName = 'RgbShift';

export default RgbShift;
