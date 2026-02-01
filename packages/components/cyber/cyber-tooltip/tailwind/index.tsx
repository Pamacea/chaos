'use client';

import { forwardRef, HTMLAttributes, useState } from 'react';

export interface CyberTooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode;
  position?: 'top' | 'bottom';
  variant?: 'cyan' | 'pink' | 'green';
}

const variantStyles = {
  cyan: 'border-cyan-400 shadow-[0_0_10px_#00f0ff]',
  pink: 'border-fuchsia-500 shadow-[0_0_10px_#ff00ff]',
  green: 'border-emerald-400 shadow-[0_0_10px_#00ff88]',
};

export const CyberTooltip = forwardRef<HTMLDivElement, CyberTooltipProps>(
  ({ children, content, position = 'top', variant = 'cyan', className = '', ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <div
        ref={ref}
        className={`relative inline-block ${className}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        {...props}
      >
        {children}
        {visible && (
          <div
            className={`
              absolute z-50 px-3 py-2
              font-['Share_Tech_Mono',monospace] text-xs text-white whitespace-nowrap
              bg-[#0a0a0f]/95 border ${variantStyles[variant]}
              animate-[fadeIn_0.2s_ease-out]
              ${position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : 'top-full left-1/2 -translate-x-1/2 mt-2'}
            `}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

CyberTooltip.displayName = 'CyberTooltip';
export default CyberTooltip;
