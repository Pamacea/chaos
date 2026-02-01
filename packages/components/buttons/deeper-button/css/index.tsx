'use client';

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './deeper-button.module.css';

type BaseProps = {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  pulsing?: boolean;
  glitchOnHover?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type DeeperButtonProps = ButtonProps | AnchorProps;

export const DeeperButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, DeeperButtonProps>(
  ({ children, variant = 'default', size = 'md', showArrow = true, pulsing = false, glitchOnHover = false, iconLeft, iconRight, className, ...props }, ref) => {
    const classes = [
      styles.button,
      variant === 'gold' && styles.variantGold,
      variant === 'outline' && styles.variantOutline,
      variant === 'ghost' && styles.variantGhost,
      size === 'sm' && styles.sizeSm,
      size === 'lg' && styles.sizeLg,
      pulsing && styles.pulsing,
      glitchOnHover && styles.glitchHover,
      className,
    ].filter(Boolean).join(' ');

    const content = (
      <>
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
        {children}
        {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
        {showArrow && <span className={styles.arrow}>↓</span>}
      </>
    );

    if ('href' in props && props.href) {
      return (
        <a ref={ref as any} className={classes} {...(props as AnchorProps)}>
          {content}
        </a>
      );
    }

    return (
      <button ref={ref as any} className={classes} {...(props as ButtonProps)}>
        {content}
      </button>
    );
  }
);

DeeperButton.displayName = 'DeeperButton';
export default DeeperButton;
