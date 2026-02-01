'use client';

import { forwardRef, HTMLAttributes, useEffect } from 'react';
import styles from './cyber-modal.module.css';

export interface CyberModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Modal open state */
  isOpen: boolean;
  /** Close callback */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Neon color variant */
  variant?: 'cyan' | 'pink' | 'green' | 'red';
  /** Modal size */
  size?: 'sm' | 'md' | 'lg';
}

export const CyberModal = forwardRef<HTMLDivElement, CyberModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      variant = 'cyan',
      size = 'md',
      children,
      className,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
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
      <div className={styles.overlay} onClick={onClose}>
        <div
          ref={ref}
          className={`${styles.modal} ${styles[variant]} ${styles[size]} ${className || ''}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <button className={styles.close} onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
          <div className={styles.content}>{children}</div>
          <div className={styles.scanlines} />
        </div>
      </div>
    );
  }
);

CyberModal.displayName = 'CyberModal';

export default CyberModal;
