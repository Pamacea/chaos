'use client';

import React from 'react';

export interface GridItem { title: string; description?: string; span?: [number, number]; }
export interface BrokenGridProps { items: GridItem[]; columns?: number; chaosLevel?: number; truncateText?: boolean; className?: string; }

export const BrokenGridTailwind = ({ items, columns = 3, chaosLevel = 0.5, truncateText = true, className = '' }: BrokenGridProps) => {
  return (
    <div className={`grid gap-5 relative ${className}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {items.map((item, i) => {
        const rot = (Math.sin(i) * chaosLevel * 5);
        const transX = (Math.cos(i * 1.5) * chaosLevel * 20);
        const transY = (Math.sin(i * 2.3) * chaosLevel * 15);
        return (
          <div key={i} className="relative bg-zinc-800/30 border border-zinc-700 p-8 transition-all hover:z-10 hover:-translate-x-1 hover:-translate-y-1 hover:rotate-0 hover:shadow-[8px_8px_0_#e8c72e]" style={{ transform: `translate(${transX}px, ${transY}px) rotate(${rot}deg)`, gridColumn: item.span ? `span ${item.span[0]}` : 'auto', gridRow: item.span ? `span ${item.span[1]}` : 'auto' }}>
            <h3 className="text-xs uppercase tracking-widest mb-4 text-yellow-500">{item.title}</h3>
            {item.description && <p className={`text-sm leading-relaxed opacity-70 ${truncateText ? 'overflow-hidden max-h-[4.8em] relative' : ''}`}>{item.description}</p>}
          </div>
        );
      })}
    </div>
  );
};
