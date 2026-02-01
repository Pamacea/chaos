'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './neon-tabs.module.css';

export interface NeonTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface NeonTabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: NeonTab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
}

export const NeonTabs = forwardRef<HTMLDivElement, NeonTabsProps>(
  ({ tabs, activeTab, onChange, variant = 'cyan', className, ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.tabs} ${styles[variant]} ${className || ''}`} role="tablist" {...props}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
            <span className={styles.label}>{tab.label}</span>
          </button>
        ))}
      </div>
    );
  }
);

NeonTabs.displayName = 'NeonTabs';
export default NeonTabs;
