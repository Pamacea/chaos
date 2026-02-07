'use client';

import { forwardRef, useEffect, useRef, useImperativeHandle, useState, HTMLAttributes } from 'react';
import styles from './flash-effect.module.css';

export interface FlashEffectProps extends HTMLAttributes<HTMLDivElement> {
  trigger?: 'manual' | 'scroll' | 'click';
  color?: string;
  duration?: number;
  opacity?: number;
  blendMode?: 'normal' | 'overlay' | 'screen' | 'difference';
  onFlash?: () => void;
  flashProbability?: number;
}

export interface FlashHandle {
  flash: () => void;
}

export const FlashEffect = forwardRef<FlashHandle, FlashEffectProps>(({
  trigger = 'manual',
  color = '#fff',
  duration = 150,
  opacity = 0.4,
  blendMode = 'normal',
  onFlash,
  flashProbability = 0.1,
  className = '',
  ...props
}, ref) => {
  const [isActive, setIsActive] = useState(false);

  useImperativeHandle(ref, () => ({
    flash: () => triggerFlash()
  }));

  const triggerFlash = () => {
    setIsActive(true);
    onFlash?.();
    setTimeout(() => setIsActive(false), duration);
  };

  useEffect(() => {
    if (trigger === 'scroll') {
      const handleScroll = () => {
        if (Math.random() < flashProbability) triggerFlash();
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [trigger, flashProbability]);

  return (
    <div
      className={`${styles.flash} ${isActive ? styles.flashActive : ''} ${className || ''}`}
      style={{
        '--flash-color': color,
        '--duration': duration + 'ms',
        '--opacity': opacity,
        mixBlendMode: blendMode
      } as React.CSSProperties}
      {...props}
    />
  );
});

FlashEffect.displayName = 'FlashEffect';

export default FlashEffect;

export function useFlash() {
  const flashRef = useRef<FlashHandle>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  const flash = () => {
    setIsFlashing(true);
    flashRef.current?.flash();
    setTimeout(() => setIsFlashing(false), 150);
  };

  return { flash, isFlashing, flashRef };
}
