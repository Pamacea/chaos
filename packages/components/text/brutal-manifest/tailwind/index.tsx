'use client';

import { HTMLAttributes } from 'react';

export interface PhraseSegment { text: string; color?: string; borderColor?: string; }
export interface BrutalManifestProps extends HTMLAttributes<HTMLDivElement> { 
  phrases: PhraseSegment[][]; colors?: string[]; borderWidth?: number; fontSize?: 'small' | 'medium' | 'large' | 'massive'; 
}

export const BrutalManifestTailwind = ({ phrases, colors = ['#ff0000', '#ffff00', '#000000', '#ffffff'], borderWidth = 6, fontSize = 'large', className = '', ...props }: BrutalManifestProps) => {
  const sizes = { small: 'text-2xl', medium: 'text-4xl', large: 'text-6xl', massive: 'text-8xl' };

  return (
    <div className={`flex flex-wrap gap-3 leading-tight ${className}`} {...props}>
      {phrases.map((phrase, pi) => (
        <div key={pi} className="flex flex-wrap gap-2">
          {phrase.map((segment, si) => {
            const colorIdx = (pi + si) % colors.length;
            return (
              <span key={si} className="inline-block px-4 py-2 border-solid font-black italic uppercase tracking-tight hover:scale-105 transition-transform" style={{
                background: segment.color || colors[colorIdx],
                borderColor: segment.borderColor || colors[(colorIdx + 1) % colors.length],
                color: colors[colorIdx] === '#ffffff' ? '#000' : '#fff',
                borderWidth: borderWidth + 'px',
                textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
              }}>
                {segment.text}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
