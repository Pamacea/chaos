'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './dead-button.module.css';

export interface DeadButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  icon?: ReactNode;
  gradient?: 1 | 2 | 3 | 4;
  size?: 'sm' | 'md' | 'lg';
  showStrike?: boolean;
}

export const DeadButton = forwardRef<HTMLDivElement, DeadButtonProps>(
  ({ children, icon, gradient = 1, size = 'md', showStrike = true, className, ...props }, ref) => {
    const containerClasses = [
      styles.container,
      size === 'sm' && styles.sizeSm,
      size === 'lg' && styles.sizeLg,
      !showStrike && styles.noStrike,
      className,
    ].filter(Boolean).join(' ');

    const cleanClasses = [
      styles.clean,
      gradient === 2 && styles.gradient2,
      gradient === 3 && styles.gradient3,
      gradient === 4 && styles.gradient4,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div className={cleanClasses}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
        </div>
        <div className={styles.destroy} />
        <div className={styles.noise} />
        <div className={styles.glitch1} />
        <div className={styles.glitch2} />
      </div>
    );
  }
);

DeadButton.displayName = 'DeadButton';
export default DeadButton;
