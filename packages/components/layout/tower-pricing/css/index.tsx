'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './tower-pricing.module.css';

export interface PricingTier {
  name: string;
  price: number | string;
  currency?: string;
  period?: string;
  features: string[];
  featured?: boolean;
  featuredLabel?: string;
  buttonText?: string;
  onSelect?: () => void;
}

export interface TowerPricingProps extends HTMLAttributes<HTMLDivElement> {
  /** Pricing tiers */
  tiers: PricingTier[];
  /** Color variant */
  variant?: 'gold' | 'blood' | 'cyan' | 'bone';
  /** Show connectors between tiers */
  showConnectors?: boolean;
}

export const TowerPricing = forwardRef<HTMLDivElement, TowerPricingProps>(
  (
    {
      tiers,
      variant = 'gold',
      showConnectors = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.tower} ${styles[variant]} ${className || ''}`}
        {...props}
      >
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={`${styles.tier} ${tier.featured ? styles.featured : ''}`}
          >
            {tier.featured && tier.featuredLabel && (
              <span className={styles.featuredBadge}>{tier.featuredLabel}</span>
            )}
            
            <div className={styles.tierHeader}>
              <span className={styles.tierName}>{tier.name}</span>
              <div className={styles.tierPrice}>
                <span className={styles.currency}>{tier.currency || '$'}</span>
                <span className={styles.amount}>{tier.price}</span>
                {tier.period && <span className={styles.period}>/{tier.period}</span>}
              </div>
            </div>

            <ul className={styles.tierFeatures}>
              {tier.features.map((feature, i) => (
                <li key={i} className={styles.feature}>
                  <span className={styles.featureIcon}>✦</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className={styles.tierAction}>
              <button
                className={styles.actionButton}
                onClick={tier.onSelect}
              >
                {tier.buttonText || 'Select'}
              </button>
            </div>

            {showConnectors && index < tiers.length - 1 && (
              <span className={styles.connector} />
            )}
          </div>
        ))}
      </div>
    );
  }
);

TowerPricing.displayName = 'TowerPricing';
export default TowerPricing;
