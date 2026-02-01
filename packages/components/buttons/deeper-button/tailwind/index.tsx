'use client';

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  pulsing?: boolean;
  glitchOnHover?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type DeeperButtonProps = ButtonProps | AnchorProps;

const variantClasses: Record<string, string> = {
  default: 'border-red-500 text-red-500 hover:text-black before:bg-red-500',
  gold: 'border-amber-500 text-amber-500 hover:text-black before:bg-amber-500',
  outline: 'border border-red-500 text-red-500 hover:border-2 hover:text-black before:bg-red-500',
  ghost: 'border-transparent border-b-red-500 text-red-500 hover:border-red-500 before:hidden',
};

const sizeClasses: Record<string, string> = {
  sm: 'py-4 px-8 text-base',
  md: 'py-8 px-16 text-2xl',
  lg: 'py-10 px-20 text-3xl',
};

export const DeeperButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, DeeperButtonProps>(
  ({ children, variant = 'default', size = 'md', showArrow = true, pulsing = false, glitchOnHover = false, iconLeft, iconRight, className, ...props }, ref) => {
    const classes = `
      relative overflow-hidden border-2 bg-transparent
      font-display tracking-[0.1em] uppercase cursor-pointer
      transition-all inline-block no-underline
      before:content-[''] before:absolute before:top-0 before:-left-full
      before:w-full before:h-full before:transition-[left] before:duration-300 before:-z-10
      hover:before:left-0
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${pulsing ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}
      ${glitchOnHover ? 'hover:animate-[glitchText_0.3s_infinite]' : ''}
      ${className || ''}
    `;

    const content = (
      <>
        {iconLeft && <span className="mr-4">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-4">{iconRight}</span>}
        {showArrow && (
          <span className="inline-block ml-4 transition-transform group-hover:animate-bounce">↓</span>
        )}
      </>
    );

    if ('href' in props && props.href) {
      return (
        <a ref={ref as any} className={`group ${classes}`} {...(props as AnchorProps)}>
          {content}
        </a>
      );
    }

    return (
      <button ref={ref as any} className={`group ${classes}`} {...(props as ButtonProps)}>
        {content}
      </button>
    );
  }
);

DeeperButton.displayName = 'DeeperButton';
export default DeeperButton;
