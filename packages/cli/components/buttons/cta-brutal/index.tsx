'use client';

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './cta-brutal.module.css';

type BaseProps = {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'gold' | 'inverse';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  shake?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type CtaBrutalProps = ButtonProps | AnchorProps;

export const CtaBrutal = forwardRef<HTMLButtonElement | HTMLAnchorElement, CtaBrutalProps>(
  ({ children, variant = 'default', size = 'md', icon, iconPosition = 'right', fullWidth = false, shake = false, loading = false, disabled = false, className, ...props }, ref) => {
    const classes = [
      styles.button,
      variant === 'outline' && styles.variantOutline,
      variant === 'gold' && styles.variantGold,
      variant === 'inverse' && styles.variantInverse,
      size === 'sm' && styles.sizeSm,
      size === 'lg' && styles.sizeLg,
      size === 'xl' && styles.sizeXl,
      fullWidth && styles.fullWidth,
      shake && styles.shake,
      loading && styles.loading,
      disabled && styles.disabled,
      className,
    ].filter(Boolean).join(' ');

    const content = (
      <>
        {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
      </>
    );

    if ('href' in props && props.href) {
      return <a ref={ref as any} className={classes} {...(props as AnchorProps)}>{content}</a>;
    }
    return <button ref={ref as any} className={classes} disabled={disabled || loading} {...(props as ButtonProps)}>{content}</button>;
  }
);

CtaBrutal.displayName = 'CtaBrutal';
export default CtaBrutal;
