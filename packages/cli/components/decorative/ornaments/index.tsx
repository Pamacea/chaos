'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './ornaments.module.css';

export const ORNAMENT_SYMBOLS = {
  cross: '✝', maltese: '✠', orthodox: '☦', fleurDeLis: '⚜', star: '✦',
  diamond: '◆', heart: '❧', leaf: '❦', dagger: '†', doubleDagger: '‡',
  asterisk: '✽', florette: '✿', skull: '☠', crown: '♔', swords: '⚔',
};

export interface OrnamentsProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'divider' | 'corner' | 'frame' | 'fleuron' | 'symbols';
  symbol?: keyof typeof ORNAMENT_SYMBOLS | string;
  symbols?: (keyof typeof ORNAMENT_SYMBOLS | string)[];
  variant?: 'gold' | 'bone' | 'blood' | 'iron';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'all';
}

const getSymbol = (s: keyof typeof ORNAMENT_SYMBOLS | string): string => ORNAMENT_SYMBOLS[s as keyof typeof ORNAMENT_SYMBOLS] || s;

export const Ornaments = forwardRef<HTMLDivElement, OrnamentsProps>(
  ({ type = 'divider', symbol = 'cross', symbols, variant = 'gold', size = 'md', animated = false, position = 'all', className, ...props }, ref) => {
    const baseClasses = `${styles.ornament} ${styles[variant]} ${styles[size]} ${animated ? styles.animated : ''}`;
    const sym = getSymbol(symbol);

    if (type === 'divider') {
      return (<div ref={ref} className={`${baseClasses} ${styles.divider} ${className || ''}`} {...props}><span className={styles.line} /><span className={styles.symbol}>{sym}</span><span className={styles.line} /></div>);
    }
    if (type === 'fleuron') {
      return (<div ref={ref} className={`${baseClasses} ${className || ''}`} {...props}><span className={styles.fleuron}>{sym}</span></div>);
    }
    if (type === 'symbols') {
      const syms = symbols || ['star', 'diamond', 'star'];
      return (<div ref={ref} className={`${baseClasses} ${styles.symbols} ${className || ''}`} {...props}>{syms.map((s, i) => (<span key={i} className={styles.symbol}>{getSymbol(s)}</span>))}</div>);
    }
    if (type === 'corner') {
      const corners = position === 'all' ? ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'] : [position.split('-').map((p, i) => i === 0 ? p.charAt(0).toUpperCase() + p.slice(1) : p.charAt(0).toUpperCase() + p.slice(1)).join('')];
      return (<>{corners.map((pos) => (<div key={pos} ref={pos === corners[0] ? ref : undefined} className={`${styles.corner} ${styles[`corner${pos}`]} ${styles[variant]} ${className || ''}`} {...props}><span className={styles.cornerInner}><span className={styles.cornerSymbol}>{sym}</span></span></div>))}</>);
    }
    if (type === 'frame') {
      return (<div ref={ref} className={`${styles.frame} ${styles[variant]} ${className || ''}`} {...props}><div className={styles.frameTop}><span className={styles.frameLine} /><span className={styles.frameSymbol}>{sym}</span><span className={styles.frameLine} /></div><div className={styles.frameBottom}><span className={styles.frameLine} /><span className={styles.frameSymbol}>{sym}</span><span className={styles.frameLine} /></div></div>);
    }
    return null;
  }
);

Ornaments.displayName = 'Ornaments';
export default Ornaments;
