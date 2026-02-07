'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

export interface AncientScrollProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to display on the scroll */
  children: string;
  /** Level of paper decay: pristine, aged, weathered, crumbling */
  decay?: 'pristine' | 'aged' | 'weathered' | 'crumbling';
  /** Ink color style: black, brown, red, gold */
  inkColor?: 'black' | 'brown' | 'red' | 'gold';
  /** Enable flowing ink animation */
  flowingInk?: boolean;
  /** Show aged paper texture */
  showTexture?: boolean;
}

export const AncientScroll = forwardRef<HTMLDivElement, AncientScrollProps>(
  (
    {
      children,
      decay = 'aged',
      inkColor = 'brown',
      flowingInk = true,
      showTexture = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const decayClasses = {
      pristine: 'from-amber-50 via-amber-100 to-amber-50',
      aged: 'from-amber-100 via-amber-200 to-amber-100',
      weathered: 'from-amber-200 via-amber-300 to-amber-200 contrast-125 brightness-95',
      crumbling: 'from-amber-300 via-amber-400 to-amber-300 contrast-125 brightness-85',
    };

    const inkColorClasses = {
      black: 'text-stone-800',
      brown: 'text-amber-900',
      red: 'text-red-900',
      gold: 'text-yellow-700',
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        style={style}
        {...props}
      >
        <div
          className={cn(
            'relative p-8 rounded bg-gradient-to-br shadow-md overflow-hidden',
            decayClasses[decay],
            showTexture && 'before:absolute before:inset-0 before:opacity-5 before:mix-blend-multiply before:pointer-events-none before:bg-[url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")]'
          )}
        >
          <div className="absolute inset-0 border-2 border-amber-700/20 rounded pointer-events-none" />

          <div
            className={cn(
              'relative z-10 font-serif text-base leading-relaxed tracking-wide text-justify',
              inkColorClasses[inkColor]
            )}
          >
            {children.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 first-letter:text-2xl first-letter:font-bold">
                {paragraph.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={cn(
                      'inline-block',
                      flowingInk && 'animate-[ink-flow_0.5s_ease-out_forwards]'
                    )}
                    style={{
                      animationDelay: `${index * 100 + charIndex * 20}ms`,
                      animationFillMode: 'both',
                      opacity: flowingInk ? 0 : 1,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </p>
            ))}
          </div>

          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-900 shadow-lg before:absolute before:inset-0 before:m-auto before:w-[60%] before:h-[60%] before:border-2 before:border-white/30 before:rounded-full" />
        </div>
      </div>
    );
  }
);

AncientScroll.displayName = 'AncientScroll';

export default AncientScroll;
