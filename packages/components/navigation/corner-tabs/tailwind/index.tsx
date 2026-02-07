'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState, useCallback } from 'react';

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
      'top-left': 'top-0 left-0',
      'top-right': 'top-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'bottom-right': 'bottom-0 right-0',
    };

    const orientationClasses = {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    };

    const variantClasses = {
      minimal: 'text-gray-500 bg-black',
      brutal: 'bg-rose-500 text-white',
      neon: 'text-cyan-400',
      ornate: 'text-gray-400',
    };

    const activeVariantClasses = {
      minimal: 'text-white',
      brutal: 'text-black bg-white',
      neon: '[text-shadow:0_0_10px_#00ffff]',
      ornate: 'text-white',
    };

    const contentVariantClasses = {
      minimal: 'bg-black/95 backdrop-blur-md border border-white/10',
      brutal: 'bg-rose-500 border-3 border-black shadow-[4px_4px_0_#000]',
      neon: 'bg-[rgba(0,20,30,0.95)] border border-cyan-400/30 shadow-[0_0_30px_rgba(0,255,255,0.1)]',
      ornate: 'bg-gradient-to-br from-[rgba(20,20,20,0.95)] to-[rgba(40,40,40,0.95)] border border-white/10',
    };

    const borderClasses = {
      'top-left': 'border-b border-r border-white/10',
      'top-right': 'border-b border-l border-white/10',
      'bottom-left': 'border-t border-r border-white/10',
      'bottom-right': 'border-t border-l border-white/10',
    };

    const contentPositionClasses = {
      'top-left': 'top-full left-0',
      'top-right': 'top-full right-0',
      'bottom-left': 'bottom-full left-0',
      'bottom-right': 'bottom-full right-0',
    };

    const indicatorClasses = {
      'top-left': 'bottom-[-1px] left-0 right-0 h-[2px]',
      'top-right': 'bottom-[-1px] left-0 right-0 h-[2px]',
      'bottom-left': 'top-[-1px] left-0 right-0 h-[2px]',
      'bottom-right': 'top-[-1px] left-0 right-0 h-[2px]',
    };

    const isHorizontal = orientation === 'horizontal';

    return (
      <nav
        ref={ref}
        className={`fixed z-[999] font-sans ${cornerClasses[corner]} ${variantClasses[variant]} ${className || ''}`}
        {...props}
      >
        {/* Corner decorative elements */}
        <div className="absolute pointer-events-none opacity-50" aria-hidden="true">
          <div className="absolute bg-current w-5 h-0.5 top-0 left-0" />
          <div className="absolute bg-current w-0.5 h-5 top-0 left-0" />
        </div>

        {/* Tab buttons */}
        <div
          className={`flex p-3 gap-2 ${orientationClasses[orientation]} ${borderClasses[corner]}`}
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeTab}
              aria-controls={`panel-${tab.id}`}
              className={`
                relative flex items-center gap-2 px-4 py-2 bg-transparent border-none
                text-current font-inherit text-xs tracking-widest uppercase cursor-pointer
                transition-all duration-300 whitespace-nowrap
                ${tab.id === activeTab ? `font-semibold ${activeVariantClasses[variant]}` : ''}
                ${tab.disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/5'}
              `}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
            >
              {tab.icon && <span className="flex items-center justify-center">{tab.icon}</span>}
              <span className="relative">{tab.label}</span>
              {tab.id === activeTab && (
                <span className={`absolute bg-current ${indicatorClasses[corner]} ${variant === 'brutal' ? 'h-[3px] bg-black' : variant === 'neon' ? 'shadow-[0_0_10px_#00ffff]' : ''}`} />
              )}
            </button>
          ))}
        </div>

        {/* Content panel */}
        {showContent && activeTabData?.content && (
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            className={`
              absolute p-6 min-w-[300px] max-w-[400px] ${contentPositionClasses[corner]}
              ${contentVariantClasses[variant]} ${isAnimating ? 'animate-in' : ''}
            `}
            style={{
              animation: isAnimating ? (animation === 'slide' ? 'slideIn 0.3s ease' : animation === 'fade' ? 'fadeIn 0.3s ease' : animation === 'scale' ? 'scaleIn 0.3s ease' : 'glitchIn 0.4s ease') : undefined,
            }}
          >
            {activeTabData.content}
          </div>
        )}

        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes glitchIn {
            0% { opacity: 0; transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-1px, -1px); }
            80% { transform: translate(1px, 1px); }
            100% { opacity: 1; transform: translate(0); }
          }
        `}</style>
      </nav>
    );
  }
);

CornerTabs.displayName = 'CornerTabs';

export default CornerTabs;
