'use client';

import { forwardRef, useImperativeHandle, HTMLAttributes } from 'react';

export interface FlashEffectProps extends HTMLAttributes<HTMLDivElement> { 
  trigger?: 'manual' | 'scroll'; color?: string; duration?: number; opacity?: number; 
}

export interface FlashHandle { flash: () => void; }

export const FlashEffectTailwind = forwardRef<FlashHandle, FlashEffectProps>(({ 
  trigger = 'manual', color = '#fff', duration = 150, opacity = 0.4, className = '', ...props 
}, ref) => {
  const [isActive, setIsActive] = React.useState(false);

  useImperativeHandle(ref, () => ({ flash: () => { setIsActive(true); setTimeout(() => setIsActive(false), duration); } }));

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9997] transition-opacity ${isActive ? 'opacity-[var(--opacity,0.4)]' : 'opacity-0'} ${className}`} style={{ background: color, '--opacity': opacity } as React.CSSProperties} {...props} />
  );
});
