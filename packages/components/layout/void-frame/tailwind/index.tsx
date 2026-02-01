'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface VoidFrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'gold' | 'bone' | 'blood' | 'iron' | 'cyan';
  cornerStyle?: 'simple' | 'extended' | 'ornate';
  glow?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const variantStyles = {
  gold: { border: 'border-amber-600', corner: 'border-amber-600', glow: 'shadow-[0_0_20px_rgba(201,162,39,0.2)]', ornament: 'text-amber-600' },
  bone: { border: 'border-stone-400', corner: 'border-stone-400', glow: 'shadow-[0_0_20px_rgba(212,197,169,0.2)]', ornament: 'text-stone-400' },
  blood: { border: 'border-red-800', corner: 'border-red-800', glow: 'shadow-[0_0_20px_rgba(139,26,26,0.3)]', ornament: 'text-red-800' },
  iron: { border: 'border-zinc-600', corner: 'border-zinc-600', glow: 'shadow-[0_0_20px_rgba(74,74,74,0.2)]', ornament: 'text-zinc-600' },
  cyan: { border: 'border-cyan-400', corner: 'border-cyan-400', glow: 'shadow-[0_0_20px_rgba(0,240,255,0.2)]', ornament: 'text-cyan-400' },
};

const paddingClasses = {
  sm: 'p-4',
  md: 'p-8',
  lg: 'p-12',
  xl: 'p-16',
};

export const VoidFrame = forwardRef<HTMLDivElement, VoidFrameProps>(
  ({ children, variant = 'gold', cornerStyle = 'simple', glow = false, padding = 'md', className = '', ...props }, ref) => {
    const colors = variantStyles[variant];
    const cornerSize = cornerStyle === 'ornate' ? 'w-10 h-10' : cornerStyle === 'extended' ? 'w-[30px] h-[30px]' : 'w-5 h-5';

    return (
      <div
        ref={ref}
        className={`
          relative bg-black/50 border ${colors.border} ${paddingClasses[padding]}
          ${glow ? colors.glow : ''}
          ${className}
        `}
        {...props}
      >
        {/* Corners */}
        <span className={`absolute -top-px -left-px ${cornerSize} border-t-2 border-l-2 ${colors.corner}`} />
        <span className={`absolute -top-px -right-px ${cornerSize} border-t-2 border-r-2 ${colors.corner}`} />
        <span className={`absolute -bottom-px -left-px ${cornerSize} border-b-2 border-l-2 ${colors.corner}`} />
        <span className={`absolute -bottom-px -right-px ${cornerSize} border-b-2 border-r-2 ${colors.corner}`} />

        {/* Ornate decorations */}
        {cornerStyle === 'ornate' && (
          <>
            <span className={`absolute -top-[0.5em] left-1/2 -translate-x-1/2 ${colors.ornament}`}>✦</span>
            <span className={`absolute -bottom-[0.5em] left-1/2 -translate-x-1/2 ${colors.ornament}`}>✦</span>
          </>
        )}

        {children}
      </div>
    );
  }
);

VoidFrame.displayName = 'VoidFrame';
export default VoidFrame;
