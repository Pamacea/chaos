'use client';

import { forwardRef, HTMLAttributes, useEffect } from 'react';

export interface CyberModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  variant?: 'cyan' | 'pink' | 'green' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  cyan: 'border-cyan-400 shadow-[0_0_20px_#00f0ff]',
  pink: 'border-fuchsia-500 shadow-[0_0_20px_#ff00ff]',
  green: 'border-emerald-400 shadow-[0_0_20px_#00ff88]',
  red: 'border-rose-500 shadow-[0_0_20px_#ff0040]',
};

const titleColors = {
  cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400',
  pink: 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500',
  green: 'text-emerald-400 bg-emerald-400/10 border-emerald-400',
  red: 'text-rose-500 bg-rose-500/10 border-rose-500',
};

const sizeStyles = { sm: 'max-w-[400px]', md: 'max-w-[600px]', lg: 'max-w-[900px]' };

export const CyberModal = forwardRef<HTMLDivElement, CyberModalProps>(
  ({ isOpen, onClose, title, variant = 'cyan', size = 'md', children, className = '', ...props }, ref) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 flex items-center justify-center p-5 bg-black/80 backdrop-blur-sm z-[1000] animate-[fadeIn_0.2s]"
        onClick={onClose}
      >
        <div
          ref={ref}
          className={`
            relative w-full ${sizeStyles[size]} max-h-[90vh]
            bg-[#0a0a0f] border-2 ${variantStyles[variant]}
            overflow-hidden animate-[scaleIn_0.3s_ease-out]
            ${className}
          `}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          <div className={`flex items-center justify-between px-5 py-4 border-b ${titleColors[variant]}`}>
            {title && (
              <h2 className="m-0 font-['Orbitron',sans-serif] text-sm font-bold uppercase tracking-widest">
                {title}
              </h2>
            )}
            <button
              className="px-2 py-1 text-white/50 hover:text-white bg-transparent border-none cursor-pointer transition-colors"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="p-5 max-h-[calc(90vh-60px)] overflow-y-auto text-white/80">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

CyberModal.displayName = 'CyberModal';
export default CyberModal;
