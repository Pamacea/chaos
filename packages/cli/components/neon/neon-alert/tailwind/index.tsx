'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface NeonAlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles = {
  info: 'border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)] [&_.title]:text-cyan-400',
  success: 'border-emerald-400 shadow-[0_0_10px_rgba(0,255,136,0.2)] [&_.title]:text-emerald-400',
  warning: 'border-amber-400 shadow-[0_0_10px_rgba(255,170,0,0.2)] [&_.title]:text-amber-400',
  error: 'border-rose-500 shadow-[0_0_10px_rgba(255,0,64,0.2)] [&_.title]:text-rose-500',
};

export const NeonAlert = forwardRef<HTMLDivElement, NeonAlertProps>(
  ({ children, variant = 'info', title, dismissible = false, onDismiss, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={`
          flex items-start gap-3 p-4
          bg-black/50 border border-l-4
          animate-[slideIn_0.3s_ease-out]
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {title && (
            <div className="title mb-1 font-['Orbitron',sans-serif] text-[13px] font-bold uppercase tracking-wide">
              {title}
            </div>
          )}
          <div className="font-['Rajdhani',sans-serif] text-sm text-white/80 leading-relaxed">
            {children}
          </div>
        </div>
        {dismissible && (
          <button
            className="flex-shrink-0 px-2 py-1 text-sm text-white/50 hover:text-white bg-transparent border-none cursor-pointer transition-colors"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

NeonAlert.displayName = 'NeonAlert';
export default NeonAlert;
