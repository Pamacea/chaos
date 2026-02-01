'use client';

import { forwardRef, HTMLAttributes, useState } from 'react';
import styles from './cyber-tooltip.module.css';

export interface CyberTooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'cyan' | 'pink' | 'green';
}

export const CyberTooltip = forwardRef<HTMLDivElement, CyberTooltipProps>(
  ({ children, content, position = 'top', variant = 'cyan', className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <div
        ref={ref}
        className={`${styles.tooltip} ${styles[position]} ${styles[variant]} ${className || ''}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        {...props}
      >
        {children}
        {visible && (
          <div className={styles.content}>
            <span className={styles.arrow} />
            {content}
          </div>
        )}
      </div>
    );
  }
);

CyberTooltip.displayName = 'CyberTooltip';
export default CyberTooltip;
