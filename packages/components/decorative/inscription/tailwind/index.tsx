'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface InscriptionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  effect?: 'carved' | 'deepCarved' | 'embossed' | 'weathered' | 'ancient' | 'roman';
  variant?: 'bone' | 'marble' | 'granite' | 'obsidian' | 'gold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  textured?: boolean;
  bordered?: boolean;
  cracked?: boolean;
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

const variantColors = {
  bone: 'text-stone-300',
  marble: 'text-gray-200',
  granite: 'text-gray-500',
  obsidian: 'text-zinc-700',
  gold: 'text-amber-500',
};

const sizeClasses = {
  xs: 'text-xs tracking-[0.15em]',
  sm: 'text-base tracking-[0.2em]',
  md: 'text-2xl tracking-[0.2em]',
  lg: 'text-4xl tracking-[0.25em]',
  xl: 'text-6xl tracking-[0.3em]',
};

const effectStyles = {
  carved: '[text-shadow:1px_1px_1px_rgba(0,0,0,0.5),-1px_-1px_1px_rgba(255,255,255,0.1),0_0_3px_rgba(0,0,0,0.3)]',
  deepCarved: '[text-shadow:2px_2px_2px_rgba(0,0,0,0.5),-1px_-1px_1px_rgba(255,255,255,0.1),1px_1px_4px_rgba(0,0,0,0.4)]',
  embossed: '[text-shadow:-1px_-1px_1px_rgba(0,0,0,0.5),1px_1px_1px_rgba(255,255,255,0.1),0_0_5px_rgba(255,255,255,0.1)]',
  weathered: 'opacity-70 blur-[0.3px] [text-shadow:1px_1px_2px_rgba(0,0,0,0.5),-1px_-1px_1px_rgba(255,255,255,0.1),0_0_8px_rgba(0,0,0,0.2)]',
  ancient: "font-['UnifrakturMaguntia',serif] tracking-[0.1em] [text-shadow:2px_2px_3px_rgba(0,0,0,0.5),-1px_-1px_2px_rgba(255,255,255,0.1)]",
  roman: 'font-bold tracking-[0.3em] [text-shadow:1px_2px_2px_rgba(0,0,0,0.5),-1px_-1px_1px_rgba(255,255,255,0.1)]',
};

export const Inscription = forwardRef<HTMLDivElement, InscriptionProps>(
  ({ children, effect = 'carved', variant = 'bone', size = 'md', textured = false, bordered = false, cracked = false, as: Component = 'div', className = '', ...props }, ref) => {
    const text = typeof children === 'string' ? children : '';

    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={`
          font-['Cinzel',serif] uppercase relative
          ${variantColors[variant]}
          ${sizeClasses[size]}
          ${effectStyles[effect]}
          ${bordered ? 'p-4 px-6 border border-current' : ''}
          ${className}
        `}
        data-text={text}
        {...props}
      >
        {children}

        {textured && (
          <span
            className="absolute inset-[-10px] opacity-5 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {bordered && (
          <>
            <span className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 border border-current border-r-0 border-b-0" />
            <span className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 border border-current border-l-0 border-t-0" />
          </>
        )}

        {cracked && (
          <span
            className="absolute top-1/2 left-[30%] w-[40%] h-px -rotate-[5deg]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 80%, transparent 100%)',
            }}
          />
        )}
      </Component>
    );
  }
);

Inscription.displayName = 'Inscription';
export default Inscription;
