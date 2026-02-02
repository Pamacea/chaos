'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './document-stamp.module.css';

export interface DocumentStampProps extends HTMLAttributes<HTMLDivElement> {
  /** Stamp text */
  text: string;
  /** Stamp type */
  type?: 'approved' | 'rejected' | 'confidential' | 'draft' | 'custom';
  /** Stamp size */
  size?: 'small' | 'medium' | 'large';
  /** Stamp rotation */
  rotation?: number;
  /** Stamp color */
  color?: string;
  /** Stamp border width */
  borderWidth?: number;
  /** Stamp opacity */
  opacity?: number;
  /** Enable rotation animation */
  animated?: boolean;
}

export const DocumentStamp = forwardRef<HTMLDivElement, DocumentStampProps>(
  (
    {
      text,
      type = 'approved',
      size = 'medium',
      rotation = -15,
      color,
      borderWidth = 3,
      opacity = 0.7,
      animated = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const defaultColor = {
      approved: '#00aa00',
      rejected: '#aa0000',
      confidential: '#aa00aa',
      draft: '#666666',
      custom: '#000000',
    }[type];

    const finalColor = color || defaultColor;

    return (
      <div
        ref={ref}
        className={`${styles.stamp} ${styles[size]} ${styles[type]} ${animated ? styles.animated : ''} ${className || ''}`}
        style={{
          '--stamp-color': finalColor,
          '--rotation': `${rotation}deg`,
          '--border-width': `${borderWidth}px`,
          '--opacity': opacity,
          ...style,
        }}
        {...props}
      >
        <div className={styles.stampInner}>
          <span className={styles.stampText}>{text}</span>
          <div className={styles.stampBorder} />
          {type === 'confidential' && (
            <div className={styles.stampPattern}>
              <span className={styles.patternLine} />
              <span className={styles.patternLine} />
              <span className={styles.patternLine} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

DocumentStamp.displayName = 'DocumentStamp';

export default DocumentStamp;
