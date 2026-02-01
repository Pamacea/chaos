'use client';

import { forwardRef, HTMLAttributes } from 'react';

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

const variantStyles = {
  cyan: { active: 'text-cyan-400 bg-cyan-400/10 border-cyan-400 shadow-[0_0_10px_#00f0ff]' },
  pink: { active: 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500 shadow-[0_0_10px_#ff00ff]' },
  green: { active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400 shadow-[0_0_10px_#00ff88]' },
  purple: { active: 'text-purple-500 bg-purple-500/10 border-purple-500 shadow-[0_0_10px_#a855f7]' },
};

export const NeonTabs = forwardRef<HTMLDivElement, NeonTabsProps>(
  ({ tabs, activeTab, onChange, variant = 'cyan', className = '', ...props }, ref) => {
    const colors = variantStyles[variant];
    return (
      <div ref={ref} className={`flex gap-1 p-1 bg-black/50 border border-white/10 ${className}`} role="tablist" {...props}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`
              flex items-center gap-2 px-5 py-2.5
              font-['Orbitron',sans-serif] text-xs font-semibold uppercase tracking-wide
              border transition-all duration-300 cursor-pointer
              ${activeTab === tab.id ? colors.active : 'text-white/50 bg-transparent border-transparent hover:text-white/80 hover:bg-white/5'}
            `}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon && <span className="text-sm">{tab.icon}</span>}
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>
    );
  }
);

NeonTabs.displayName = 'NeonTabs';
export default NeonTabs;
