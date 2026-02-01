'use client';

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'gold' | 'inverse';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  glitch?: boolean;
  shake?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type CtaBrutalProps = ButtonProps | AnchorProps;

const variantClasses: Record<string, string> = {
  default: 'bg-red-500 text-black hover:shadow-[4px_4px_0_#e8e8e8] [clip-path:polygon(0_0,100%_0,95%_100%,0_100%)]',
  outline: 'bg-transparent border-[3px] border-red-500 text-red-500 hover:bg-red-500 hover:text-black',
  gold: 'bg-amber-500 text-black hover:shadow-[4px_4px_0_#8b7017] [clip-path:polygon(0_0,100%_0,95%_100%,0_100%)]',
  inverse: 'bg-stone-200 text-black hover:shadow-[4px_4px_0_#ff0040] [clip-path:polygon(0_0,100%_0,95%_100%,0_100%)]',
};

const sizeClasses: Record<string, string> = {
  sm: 'py-3 px-6 text-base',
  md: 'py-6 px-12 text-2xl',
  lg: 'py-8 px-16 text-3xl',
  xl: 'py-10 px-20 text-4xl',
};

export const CtaBrutal = forwardRef<HTMLButtonElement | HTMLAnchorElement, CtaBrutalProps>(
  ({ children, variant = 'default', size = 'md', icon, iconPosition = 'right', fullWidth = false, glitch = false, shake = false, loading = false, disabled = false, className, ...props }, ref) => {
    const classes = `
      inline-flex items-center justify-center gap-4
      font-display tracking-[0.1em] uppercase no-underline
      border-none cursor-pointer transition-all
      hover:-translate-x-0.5 hover:-translate-y-0.5
      active:translate-x-0 active:translate-y-0 active:shadow-none
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${fullWidth ? 'w-full [clip-path:none]' : ''}
      ${shake ? 'hover:animate-[shake_0.1s_infinite]' : ''}
      ${loading ? 'relative text-transparent after:content-[""] after:absolute after:w-6 after:h-6 after:border-2 after:border-current after:border-t-transparent after:rounded-full after:animate-spin' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
      ${className || ''}
    `;

    const iconEl = icon && (
      <span className="text-[1.2em] transition-transform group-hover:translate-x-1">
        {icon}
      </span>
    );

    const content = (
      <>
        {iconPosition === 'left' && iconEl}
        {children}
        {iconPosition === 'right' && iconEl}
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
      <button ref={ref as any} className={`group ${classes}`} disabled={disabled || loading} {...(props as ButtonProps)}>
        {content}
      </button>
    );
  }
);

CtaBrutal.displayName = 'CtaBrutal';
export default CtaBrutal;
