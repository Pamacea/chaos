'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface HexagonMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface HexagonMenuProps extends HTMLAttributes<HTMLElement> {
  items: HexagonMenuItem[];
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
}

const variantStyles = {
  cyan: { border: 'border-cyan-400', hover: 'hover:bg-cyan-400/20 hover:shadow-[0_0_20px_#00f0ff]', icon: 'text-cyan-400' },
  pink: { border: 'border-fuchsia-500', hover: 'hover:bg-fuchsia-500/20 hover:shadow-[0_0_20px_#ff00ff]', icon: 'text-fuchsia-500' },
  green: { border: 'border-emerald-400', hover: 'hover:bg-emerald-400/20 hover:shadow-[0_0_20px_#00ff88]', icon: 'text-emerald-400' },
  purple: { border: 'border-purple-500', hover: 'hover:bg-purple-500/20 hover:shadow-[0_0_20px_#a855f7]', icon: 'text-purple-500' },
};

export const HexagonMenu = forwardRef<HTMLElement, HexagonMenuProps>(
  ({ items, variant = 'cyan', className = '', ...props }, ref) => {
    const colors = variantStyles[variant];
    return (
      <nav ref={ref} className={`flex flex-wrap gap-2 justify-center ${className}`} {...props}>
        {items.map((item, i) => (
          <button
            key={item.id}
            className={`
              flex flex-col items-center justify-center w-20 h-[92px] p-2
              bg-black/60 border-2 ${colors.border}
              transition-all duration-300 cursor-pointer
              ${colors.hover} hover:scale-110 active:scale-105
            `}
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', marginTop: i % 2 === 1 ? '40px' : '0' }}
            onClick={item.onClick}
          >
            {item.icon && <span className={`text-2xl ${colors.icon} mb-1`}>{item.icon}</span>}
            <span className="font-['Orbitron',sans-serif] text-[9px] font-semibold uppercase tracking-wide text-white/90 text-center">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    );
  }
);

HexagonMenu.displayName = 'HexagonMenu';
export default HexagonMenu;
