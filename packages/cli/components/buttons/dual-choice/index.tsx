'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './dual-choice.module.css';

export interface DualChoiceProps extends HTMLAttributes<HTMLDivElement> {
  yesLabel?: string;
  noLabel?: string;
  onYes?: () => void;
  onNo?: () => void;
  variant?: 'default' | 'dramatic' | 'minimal' | 'stacked';
  size?: 'sm' | 'md' | 'lg';
  showDivider?: boolean;
  disabled?: boolean;
  selectedValue?: 'yes' | 'no' | null;
}

export const DualChoice = forwardRef<HTMLDivElement, DualChoiceProps>(
  ({ yesLabel = 'OUI', noLabel = 'NON', onYes, onNo, variant = 'default', size = 'md', showDivider = true, disabled = false, selectedValue = null, className, ...props }, ref) => {
    const containerClasses = [
      styles.container,
      variant === 'dramatic' && styles.variantDramatic,
      variant === 'minimal' && styles.variantMinimal,
      variant === 'stacked' && styles.variantStacked,
      size === 'sm' && styles.sizeSm,
      size === 'lg' && styles.sizeLg,
      disabled && styles.disabled,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <button 
          className={`${styles.button} ${styles.yes} ${selectedValue === 'yes' ? styles.selected : ''}`}
          onClick={onYes}
          disabled={disabled}
        >
          {yesLabel}
        </button>
        {showDivider && variant !== 'minimal' && <div className={styles.divider} />}
        <button 
          className={`${styles.button} ${styles.no} ${selectedValue === 'no' ? styles.selected : ''}`}
          onClick={onNo}
          disabled={disabled}
        >
          {noLabel}
        </button>
      </div>
    );
  }
);

DualChoice.displayName = 'DualChoice';
export default DualChoice;
