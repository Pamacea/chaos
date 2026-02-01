'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './brutal-nav.module.css';

export interface BrutalNavLinkProps {
  href: string;
  children: ReactNode;
  active?: boolean;
}

export interface BrutalNavStatusProps {
  label: string;
  value: string;
  status?: 'online' | 'offline' | 'warning';
}

export interface BrutalNavProps extends HTMLAttributes<HTMLElement> {
  brand: string;
  brandGlitch?: boolean;
  links?: BrutalNavLinkProps[];
  statusItems?: BrutalNavStatusProps[];
  variant?: 'default' | 'heavy' | 'double';
  children?: ReactNode;
}

export const BrutalNav = forwardRef<HTMLElement, BrutalNavProps>(
  ({ brand, brandGlitch, links, statusItems, variant = 'default', children, className, ...props }, ref) => {
    const navClasses = [
      styles.nav,
      variant === 'heavy' && styles.variantHeavy,
      variant === 'double' && styles.variantDouble,
      className,
    ].filter(Boolean).join(' ');

    return (
      <nav ref={ref} className={navClasses} {...props}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            {brandGlitch ? (
              <span className={styles.brandGlitch} data-text={brand}>{brand}</span>
            ) : brand}
          </div>
          
          <div className={styles.links}>
            {links?.map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                className={`${styles.link} ${link.active ? styles.linkActive : ''}`}
              >
                {link.children}
              </a>
            ))}
            {children}
          </div>

          {statusItems && statusItems.length > 0 && (
            <div className={styles.status}>
              {statusItems.map((item, i) => (
                <div key={i} className={styles.statusItem}>
                  <span className={styles.statusLabel}>{item.label}</span>
                  <span className={styles.statusOnline}>
                    {item.status && (
                      <span className={`${styles.dot} ${styles[`dot${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`]}`} />
                    )}
                    <span className={styles.statusValue}>{item.value}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  }
);

BrutalNav.displayName = 'BrutalNav';
export default BrutalNav;
