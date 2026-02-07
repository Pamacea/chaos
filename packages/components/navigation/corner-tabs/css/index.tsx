'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState, useCallback } from 'react';
import styles from './corner-tabs.module.css';

export interface CornerTab {
  id: string;
  label: string;
  content?: ReactNode;
  icon?: string;
  disabled?: boolean;
}

export interface CornerTabsProps extends HTMLAttributes<HTMLElement> {
  /** Tab items */
  tabs: CornerTab[];
  /** Corner position */
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Default active tab */
  defaultActive?: string;
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Show tab content panels */
  showContent?: boolean;
  /** Animation style */
  animation?: 'slide' | 'fade' | 'scale' | 'glitch';
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Style variant */
  variant?: 'minimal' | 'brutal' | 'neon' | 'ornate';
}

export const CornerTabs = forwardRef<HTMLElement, CornerTabsProps>(
  (
    {
      tabs,
      corner = 'top-left',
      defaultActive,
      onTabChange,
      showContent = true,
      animation = 'slide',
      orientation = 'horizontal',
      variant = 'minimal',
      className,
      ...props
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = useState(defaultActive || tabs[0]?.id);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleTabClick = useCallback(
      (tabId: string) => {
        if (tabId === activeTab) return;
        setIsAnimating(true);
        setActiveTab(tabId);
        onTabChange?.(tabId);

        setTimeout(() => setIsAnimating(false), 300);
      },
      [activeTab, onTabChange]
    );

    const activeTabData = tabs.find(tab => tab.id === activeTab);

    const cornerClasses = {
      'top-left': styles.cornerTopLeft,
      'top-right': styles.cornerTopRight,
      'bottom-left': styles.cornerBottomLeft,
      'bottom-right': styles.cornerBottomRight,
    };

    const orientationClasses = {
      horizontal: styles.orientationHorizontal,
      vertical: styles.orientationVertical,
    };

    const animationClasses = {
      slide: styles.animationSlide,
      fade: styles.animationFade,
      scale: styles.animationScale,
      glitch: styles.animationGlitch,
    };

    return (
      <nav
        ref={ref}
        className={`${styles.cornerTabs} ${cornerClasses[corner]} ${orientationClasses[orientation]} ${styles[variant]} ${className || ''}`}
        {...props}
      >
        {/* Corner decorative elements */}
        <div className={styles.cornerDecoration} aria-hidden="true">
          <div className={styles.decorationLine} />
          <div className={styles.decorationLine} />
        </div>

        {/* Tab buttons */}
        <div className={styles.tabList} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeTab}
              aria-controls={`panel-${tab.id}`}
              className={`${styles.tab} ${tab.id === activeTab ? styles.tabActive : ''} ${tab.disabled ? styles.tabDisabled : ''}`}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
            >
              {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
              <span className={styles.tabLabel}>{tab.label}</span>
              {tab.id === activeTab && <span className={styles.tabIndicator} />}
            </button>
          ))}
        </div>

        {/* Content panel */}
        {showContent && activeTabData?.content && (
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            className={`${styles.contentPanel} ${animationClasses[animation]} ${isAnimating ? styles.animating : ''}`}
          >
            {activeTabData.content}
          </div>
        )}
      </nav>
    );
  }
);

CornerTabs.displayName = 'CornerTabs';

export default CornerTabs;
