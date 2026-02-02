'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './marginalia.module.css';

export interface MarginaliaProps extends HTMLAttributes<HTMLSpanElement> {
  /** Note content */
  children: string;
  /** Note position */
  position?: 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Note style */
  style?: 'pencil' | 'ink' | 'highlighter' | 'sticker';
  /** Note rotation */
  rotation?: number;
  /** Show arrow pointing to text */
  showArrow?: boolean;
  /** Note label/prefix */
  label?: string;
}

export const Marginalia = forwardRef<HTMLSpanElement, MarginaliaProps>(
  (
    {
      children,
      position = 'right',
      style: noteStyle = 'pencil',
      rotation = -5,
      showArrow = true,
      label,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`${styles.marginalia} ${styles[position]} ${styles[noteStyle]} ${
          showArrow ? styles.withArrow : ''
        } ${className || ''}`}
        style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}
        {...props}
      >
        {label && <span className={styles.label}>{label}</span>}
        <span className={styles.content}>{children}</span>
        {showArrow && <span className={styles.arrow}>→</span>}
      </span>
    );
  }
);

Marginalia.displayName = 'Marginalia';

export default Marginalia;
