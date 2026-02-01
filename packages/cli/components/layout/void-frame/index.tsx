'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './void-frame.module.css';

export interface VoidFrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'gold' | 'bone' | 'blood' | 'iron' | 'cyan';
  cornerStyle?: 'simple' | 'extended' | 'ornate';
  glow?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export const VoidFrame = forwardRef<HTMLDivElement, VoidFrameProps>(
  ({ children, variant = 'gold', cornerStyle = 'simple', glow = false, padding = 'md', className, style, ...props }, ref) => {
    const paddingSizes = { sm: '1rem', md: '2rem', lg: '3rem', xl: '4rem' };
    const cornerStyleClass = cornerStyle === 'extended' ? styles.extended : cornerStyle === 'ornate' ? styles.ornate : '';

    return (
      <div ref={ref} className={`${styles.frame} ${styles[variant]} ${cornerStyleClass} ${glow ? styles.glow : ''} ${className || ''}`} style={{ padding: paddingSizes[padding], ...style }} {...props}>
        <span className={`${styles.corner} ${styles.cornerTopLeft}`} />
        <span className={`${styles.corner} ${styles.cornerTopRight}`} />
        <span className={`${styles.corner} ${styles.cornerBottomLeft}`} />
        <span className={`${styles.corner} ${styles.cornerBottomRight}`} />
        {children}
      </div>
    );
  }
);

VoidFrame.displayName = 'VoidFrame';
export default VoidFrame;
