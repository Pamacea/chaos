'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface BrutalNavLinkProps {
  href: string;
  children: ReactNode;
  active?: boolean;
}

export interface BrutalNavStatusProps {
  label: string;
  value: string;
  status?: 'online' | 'offline' | 'warning';
}

export interface BrutalNavProps extends HTMLAttributes<HTMLElement> {
  brand: string;
  brandGlitch?: boolean;
  links?: BrutalNavLinkProps[];
  statusItems?: BrutalNavStatusProps[];
  variant?: 'default' | 'heavy' | 'double';
  children?: ReactNode;
}

const dotClasses: Record<string, string> = {
  online: 'bg-green-500 shadow-[0_0_10px_#00ff00]',
  offline: 'bg-red-500',
  warning: 'bg-amber-500 animate-pulse',
};

export const BrutalNav = forwardRef<HTMLElement, BrutalNavProps>(
  ({ brand, brandGlitch, links, statusItems, variant = 'default', children, className, ...props }, ref) => {
    const navClasses = `
      fixed top-0 left-0 right-0 z-50 bg-black font-mono
      ${variant === 'heavy' ? 'border-b-[5px] border-red-500' : ''}
      ${variant === 'double' ? 'border-b-2 border-red-500 shadow-[0_4px_0_0_#ff0040]' : ''}
      ${variant === 'default' ? 'border-b-[3px] border-red-500' : ''}
      ${className || ''}
    `;

    return (
      <nav ref={ref} className={navClasses} {...props}>
        <div className="flex items-stretch h-[60px]">
          <div className={`
            bg-red-500 text-black font-display text-2xl px-8 flex items-center 
            tracking-wider uppercase
            ${variant === 'heavy' ? 'clip-path-[polygon(0_0,100%_0,90%_100%,0_100%)] pr-12' : ''}
          `}>
            {brand}
          </div>
          
          <div className="flex flex-1">
            {links?.map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                className={`
                  flex items-center px-6 text-xs tracking-[0.15em] uppercase
                  border-r border-white/10 transition-all
                  ${link.active 
                    ? 'bg-red-500/10 text-red-500 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-red-500' 
                    : 'text-gray-500 hover:bg-red-500 hover:text-black'
                  }
                `}
              >
                {link.children}
              </a>
            ))}
            {children}
          </div>

          {statusItems && statusItems.length > 0 && (
            <div className="ml-auto flex items-center gap-8 px-8 bg-black/50 border-l border-white/10">
              {statusItems.map((item, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-[0.5rem] text-gray-600 tracking-[0.2em] uppercase">{item.label}</span>
                  <span className="flex items-center gap-2">
                    {item.status && (
                      <span className={`w-2 h-2 rounded-full ${dotClasses[item.status]} animate-pulse`} />
                    )}
                    <span className="text-xs text-red-500 font-bold">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  }
);

BrutalNav.displayName = 'BrutalNav';
export default BrutalNav;
