'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState, useCallback, MouseEvent } from 'react';

export interface BubbleMenuItem {
  id: string;
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface BubbleMenuProps extends HTMLAttributes<HTMLElement> {
  /** Menu items to display */
  items: BubbleMenuItem[];
  /** Size of each bubble in px (default: 60) */
  bubbleSize?: number;
  /** Spacing between bubbles in px (default: 16) */
  spacing?: number;
  /** Enable floating animation (default: true) */
  floating?: boolean;
  /** Alignment of bubbles (default: 'center') */
  align?: 'center' | 'left' | 'right';
  /** Style variant */
  variant?: 'glass' | 'solid' | 'neon' | 'pastel';
  /** Animation speed multiplier (default: 1) */
  animationSpeed?: number;
}

interface BubbleState {
  hovered: boolean;
  popOffset: number;
}

export const BubbleMenu = forwardRef<HTMLElement, BubbleMenuProps>(
  (
    {
      items,
      bubbleSize = 60,
      spacing = 16,
      floating = true,
      align = 'center',
      variant = 'glass',
      animationSpeed = 1,
      className,
      ...props
    },
    ref
  ) => {
    const [bubbleStates, setBubbleStates] = useState<BubbleState[]>(
      items.map(() => ({ hovered: false, popOffset: 0 }))
    );

    const handleBubbleEnter = useCallback((index: number) => {
      setBubbleStates(prev => {
        const newStates = [...prev];
        newStates[index] = { hovered: true, popOffset: 8 };
        return newStates;
      });
    }, []);

    const handleBubbleLeave = useCallback((index: number) => {
      setBubbleStates(prev => {
        const newStates = [...prev];
        newStates[index] = { hovered: false, popOffset: 0 };
        return newStates;
      });
    }, []);

    const alignClasses = {
      center: 'justify-center',
      left: 'justify-start',
      right: 'justify-end',
    };

    const variantClasses = {
      glass: {
        bubble: 'before:bg-gradient-to-br before:from-white/90 before:to-white/70 before:shadow-[0_4px_20px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:before:shadow-[0_8px_30px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)]',
        icon: 'text-slate-700',
        label: 'text-slate-600',
        container: 'bg-white/5 backdrop-blur-md border border-white/10',
      },
      solid: {
        bubble: 'before:bg-gradient-to-br before:from-slate-800/95 before:to-slate-950/90 before:shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3)]',
        icon: 'text-white/90',
        label: 'text-white/90',
        container: 'bg-slate-900/50 backdrop-blur-md border border-white/5',
      },
      neon: {
        bubble: 'before:from-cyan-400/15 before:to-cyan-500/5 before:shadow-[0_0_20px_rgba(0,255,255,0.3),0_4px_20px_rgba(0,255,255,0.2),inset_0_0_20px_rgba(0,255,255,0.05)] before:border before:border-cyan-400/40 hover:before:shadow-[0_0_30px_rgba(0,255,255,0.5),0_8px_30px_rgba(0,255,255,0.3),inset_0_0_30px_rgba(0,255,255,0.1)] hover:before:border-cyan-400/80',
        icon: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]',
        label: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]',
        container: 'bg-cyan-950/20 backdrop-blur-md border border-cyan-400/20',
      },
      pastel: {
        bubble: 'before:shadow-[0_4px_20px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)]',
        icon: 'text-slate-700',
        label: 'text-slate-600',
        container: 'bg-pink-50/30 backdrop-blur-md border border-pink-100/30',
      },
    };

    const pastelBubbleColors = [
      'before:from-pink-300/90 before:to-pink-400/70',
      'before:from-sky-300/90 before:to-sky-400/70',
      'before:from-green-300/90 before:to-green-400/70',
    ];

    const getAnimationDelay = (index: number) => {
      const baseDelay = index * 0.15;
      return `${baseDelay}s`;
    };

    const getAnimationDuration = () => {
      return `${3 / animationSpeed}s`;
    };

    return (
      <nav
        ref={ref as any}
        className={`relative flex z-[100] font-sans ${alignClasses[align]} ${className || ''}`}
        {...props}
      >
        <div
          className={`
            flex items-center flex-wrap p-3 rounded-full
            ${variantClasses[variant].container}
          `}
          style={{ gap: `${spacing}px` }}
        >
          {items.map((item, index) => {
            const { hovered, popOffset } = bubbleStates[index] || { hovered: false, popOffset: 0 };
            const Tag = item.href ? 'a' : 'button';
            const isPastel = variant === 'pastel';
            const pastelColor = pastelBubbleColors[index % 3];

            return (
              <Tag
                key={item.id}
                href={item.href}
                className={`
                  relative flex items-center justify-center flex-shrink-0 p-0
                  bg-transparent border-none rounded-full cursor-pointer
                  transition-all duration-300 ease-out will-change-transform
                  before:absolute before:inset-0 before:rounded-full
                  after:absolute after:inset-0 after:rounded-full
                  after:bg-gradient-to-br after:from-white/40 after:via-white/10 after:to-transparent
                  after:opacity-0 after:transition-opacity after:duration-300 after:pointer-events-none
                  hover:after:opacity-100
                  ${item.disabled ? 'opacity-40 cursor-not-allowed before:grayscale' : ''}
                  ${variantClasses[variant].bubble}
                  ${isPastel ? pastelColor : ''}
                  ${hovered ? 'scale-110 -translate-y-2' : 'scale-100 translate-y-0'}
                  ${item.active ? 'ring-2 ring-current ring-opacity-60' : ''}
                  ${hovered ? 'before:shadow-[0_8px_30px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)]' : ''}
                `}
                onClick={item.onClick}
                disabled={item.disabled}
                onMouseEnter={() => handleBubbleEnter(index)}
                onMouseLeave={() => handleBubbleLeave(index)}
                style={{
                  width: `${bubbleSize}px`,
                  height: `${bubbleSize}px`,
                  animationDelay: getAnimationDelay(index),
                  animationDuration: getAnimationDuration(),
                  animation: floating ? `float ${getAnimationDuration()} ease-in-out infinite` : 'none',
                }}
                aria-label={item.label}
              >
                <span className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                  <span className={`
                    flex items-center justify-center
                    transition-transform duration-300
                    ${hovered ? 'scale-110' : 'scale-100'}
                    ${variantClasses[variant].icon}
                  `} style={{ width: '60%', height: '60%' }}>
                    {item.icon}
                  </span>

                  {item.label && (
                    <span className={`
                      absolute -bottom-6 left-1/2 -translate-x-1/2
                      text-[11px] font-medium whitespace-nowrap
                      opacity-0 transition-all duration-300 pointer-events-none
                      ${hovered ? 'opacity-100 -translate-y-1' : 'opacity-0'}
                      ${variantClasses[variant].label}
                    `}>
                      {item.label}
                    </span>
                  )}
                </span>

                {/* Ripple effects */}
                {variant === 'neon' && (
                  <>
                    <span className="absolute inset-0 rounded-full border border-cyan-400/30 opacity-0 pointer-events-none animate-ripple" />
                    <span className="absolute inset-0 rounded-full border border-cyan-400/30 opacity-0 pointer-events-none animate-ripple" style={{ animationDelay: '0.5s' }} />
                  </>
                )}

                {item.active && variant === 'neon' && (
                  <span className="absolute inset-[-4px] rounded-full border-2 border-cyan-400 opacity-60 animate-ping" style={{ animationDuration: '2s' }} />
                )}
              </Tag>
            );
          })}
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes ripple {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          .animate-ripple {
            animation: ripple 3s ease-out infinite;
          }
        `}</style>
      </nav>
    );
  }
);

BubbleMenu.displayName = 'BubbleMenu';

export default BubbleMenu;
