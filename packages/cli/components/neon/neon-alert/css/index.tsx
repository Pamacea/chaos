'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './neon-alert.module.css';

export interface NeonAlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Alert type */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Alert title */
  title?: string;
  /** Dismissible with close button */
  dismissible?: boolean;
  /** Close callback */
  onDismiss?: () => void;
}

export const NeonAlert = forwardRef<HTMLDivElement, NeonAlertProps>(
  (
    {
      children,
      variant = 'info',
      title,
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div 
        ref={ref} 
        className={`${styles.alert} ${styles[variant]} ${className || ''}`}
        role="alert"
        {...props}
      >
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.message}>{children}</div>
        </div>
        {dismissible && (
          <button className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
            ✕
          </button>
        )}
      </div>
    );
  }
);

NeonAlert.displayName = 'NeonAlert';

export default NeonAlert;
