'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface DocumentStampProps extends HTMLAttributes<HTMLDivElement> {
  /** Stamp text */
  text: string;
  /** Stamp type */
  type?: 'approved' | 'rejected' | 'confidential' | 'draft' | 'custom';
  /** Stamp size */
  size?: 'small' | 'medium' | 'large';
  /** Stamp rotation */
  rotation?: number;
  /** Stamp color */
  color?: string;
  /** Stamp border width */
  borderWidth?: number;
  /** Stamp opacity */
  opacity?: number;
  /** Enable rotation animation */
  animated?: boolean;
}

const typeColors = {
  approved: '#00aa00',
  rejected: '#aa0000',
  confidential: '#aa00aa',
  draft: '#666666',
  custom: '#000000',
};

const typeBackgrounds = {
  approved: 'rgba(0, 170, 0, 0.05)',
  rejected: 'rgba(170, 0, 0, 0.05)',
  confidential: 'rgba(170, 0, 170, 0.05)',
  draft: 'rgba(102, 102, 102, 0.05)',
  custom: 'rgba(0, 0, 0, 0.05)',
};

const sizeClasses = {
  small: 'w-20 h-[50px] text-[0.75rem]',
  medium: 'w-[120px] h-[70px] text-[0.875rem]',
  large: 'w-[160px] h-[90px] text-base',
};

const borderStyles = {
  draft: 'border-dashed',
  approved: 'border-solid',
  rejected: 'border-solid',
  confidential: 'border-solid',
  custom: 'border-solid',
};

export const DocumentStamp = forwardRef<HTMLDivElement, DocumentStampProps>(
  (
    {
      text,
      type = 'approved',
      size = 'medium',
      rotation = -15,
      color,
      borderWidth = 3,
      opacity = 0.7,
      animated = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const finalColor = color || typeColors[type];
    const finalBackground = typeBackgrounds[type];
    const borderStyle = borderStyles[type];

    return (
      <div
        ref={ref}
        className={`absolute pointer-events-none select-none mix-blend-multiply ${sizeClasses[size]} ${borderStyle} ${animated ? 'animate-stamp-appear' : ''} ${className || ''}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          opacity,
          ...style,
        }}
        {...props}
      >
        <div
          className="relative flex items-center justify-center rounded"
          style={{
            borderColor: finalColor,
            borderWidth: `${borderWidth}px`,
            background: finalBackground,
          }}
        >
          <span
            className="font-bold tracking-[0.1em] uppercase text-center leading-tight"
            style={{
              fontFamily: "'Courier New', 'Courier', monospace",
              color: finalColor,
            }}
          >
            {text}
          </span>

          {/* Inner border */}
          <div
            className="absolute inset-1 rounded-sm"
            style={{
              border: `1px solid ${finalColor}`,
              opacity: 0.7,
            }}
          />

          {/* Pattern for confidential */}
          {type === 'confidential' && (
            <div className="absolute inset-0 flex flex-col justify-evenly items-center overflow-hidden opacity-20">
              <span className="w-4/5 h-px" style={{ backgroundColor: finalColor }} />
              <span className="w-4/5 h-px" style={{ backgroundColor: finalColor }} />
              <span className="w-4/5 h-px" style={{ backgroundColor: finalColor }} />
            </div>
          )}

          {/* X marks for rejected */}
          {type === 'rejected' && (
            <>
              <span
                className="absolute top-[-10px] left-[-10px] text-[1.5em] opacity-30"
                style={{ color: finalColor, transform: 'rotate(-45deg)' }}
              >
                ✕
              </span>
              <span
                className="absolute bottom-[-10px] right-[-10px] text-[1.5em] opacity-30"
                style={{ color: finalColor, transform: 'rotate(45deg)' }}
              >
                ✕
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
);

DocumentStamp.displayName = 'DocumentStamp';

export default DocumentStamp;
