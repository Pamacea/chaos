'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './inscription.module.css';

export interface InscriptionProps extends HTMLAttributes<HTMLDivElement> {
  /** Text content */
  children: ReactNode;
  /** Carving style */
  effect?: 'carved' | 'deepCarved' | 'embossed' | 'weathered' | 'ancient' | 'roman';
  /** Stone color variant */
  variant?: 'bone' | 'marble' | 'granite' | 'obsidian' | 'gold';
  /** Text size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Add stone texture overlay */
  textured?: boolean;
  /** Add decorative border */
  bordered?: boolean;
  /** Add crack effect */
  cracked?: boolean;
  /** HTML tag to render */
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

export const Inscription = forwardRef<HTMLDivElement, InscriptionProps>(
  (
    {
      children,
      effect = 'carved',
      variant = 'bone',
      size = 'md',
      textured = false,
      bordered = false,
      cracked = false,
      as: Component = 'div',
      className,
      ...props
    },
    ref
  ) => {
    const text = typeof children === 'string' ? children : '';

    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={`
          ${styles.inscription}
          ${styles[effect]}
          ${styles[variant]}
          ${styles[size]}
          ${textured ? styles.textured : ''}
          ${bordered ? styles.bordered : ''}
          ${cracked ? styles.cracked : ''}
          ${className || ''}
        `}
        data-text={text}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Inscription.displayName = 'Inscription';
export default Inscription;
