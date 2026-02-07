'use client';

import { HTMLAttributes } from 'react';
import styles from './brutal-manifest.module.css';

export interface PhraseSegment { text: string; color?: string; borderColor?: string; }
export interface BrutalManifestProps extends HTMLAttributes<HTMLDivElement> { 
  phrases: PhraseSegment[][]; colors?: string[]; borderWidth?: number; padding?: string; 
  fontSize?: 'small' | 'medium' | 'large' | 'massive'; chaosLevel?: number; textShadow?: boolean; 
  uppercase?: boolean; italic?: boolean; 
}

export const BrutalManifest = ({ 
  phrases, colors = ['#ff0000', '#ffff00', '#000000', '#ffffff'], borderWidth = 6, fontSize = 'large', 
  chaosLevel = 0.5, textShadow = true, uppercase = true, italic = true, className = '', ...props 
}: BrutalManifestProps) => {
  const sizes = { small: '1.5rem', medium: '2.5rem', large: '4rem', massive: '6rem' };

  return (
    <div className={`${styles.manifest} ${className || ''}`} {...props}>
      {phrases.map((phrase, pi) => (
        <div key={pi} className={styles.phrase}>
          {phrase.map((segment, si) => {
            const colorIdx = (pi + si) % colors.length;
            const rotation = (Math.random() - 0.5) * chaosLevel * 10;
            return (
              <span key={si} className={styles.word} style={{
                background: segment.color || colors[colorIdx],
                borderColor: segment.borderColor || colors[(colorIdx + 1) % colors.length],
                color: colors[colorIdx] === '#ffffff' ? '#000' : '#fff',
                fontSize: sizes[fontSize],
                '--border-width': borderWidth + 'px',
                transform: `rotate(${rotation}deg)`,
                textShadow: textShadow ? '4px 4px 0 rgba(0,0,0,0.3)' : 'none',
                textTransform: uppercase ? 'uppercase' : 'none',
                fontStyle: italic ? 'italic' : 'normal',
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
export default BrutalManifest;
