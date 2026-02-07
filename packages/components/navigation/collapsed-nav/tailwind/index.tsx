'use client';

import React from 'react';

export interface NavItem { label: string; href: string; isActive?: boolean; }
export interface CollapsedNavProps { items: NavItem[]; chaosLevel?: 'low' | 'medium' | 'high'; className?: string; }

export const CollapsedNavTailwind = ({ items, className = '' }: CollapsedNavProps) => {
  return (
    <nav className={`fixed inset-0 pointer-events-none z-[100] ${className}`}>
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          className="fixed text-xs uppercase tracking-[0.3em] text-[#d4d0c8] px-4 py-2 border border-current bg-[#1a1a1a]/90 hover:bg-[#e8c72e] hover:text-[#1a1a1a] hover:-translate-x-1 hover:translate-y-0.5 hover:-rotate-1 transition-all pointer-events-auto"
          style={{ top: `${30 + i * 70}px`, left: `${40 + i * 60}px`, transform: `rotate(${-2 + i}deg)` }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};