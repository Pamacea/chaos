'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import styles from './coffee-stain.module.css';

export interface StainConfig {
  type?: 'stain' | 'ring';
  size?: 'sm' | 'md' | 'lg';
  position: { top?: string; right?: string; bottom?: string; left?: string };
  rotation?: number;
}

export interface CoffeeStainProps extends HTMLAttributes<HTMLDivElement> {
  mode?: 'overlay' | 'inline';
  intensity?: 'light' | 'medium' | 'heavy';
  variant?: 'coffee' | 'tea' | 'wine' | 'ink';
  count?: number;
  stains?: StainConfig[];
  agedPaper?: boolean;
  paperTexture?: boolean;
  burnEdges?: boolean;
  edgeDarkening?: boolean;
}

const generateRandomStains = (count: number): StainConfig[] => {
  return Array.from({ length: count }, () => ({
    type: Math.random() > 0.7 ? 'ring' : 'stain',
    size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
    position: { top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` },
    rotation: Math.random() * 360,
  }));
};

export const CoffeeStain = forwardRef<HTMLDivElement, CoffeeStainProps>(
  ({ mode = 'overlay', intensity = 'medium', variant = 'coffee', count = 3, stains: customStains, agedPaper = false, paperTexture = false, burnEdges = false, edgeDarkening = false, className, ...props }, ref) => {
    const stains = useMemo(() => customStains || generateRandomStains(count), [customStains, count]);
    const stainStyles = ['stain1', 'stain2', 'stain3', 'stain4', 'stain5'];

    return (
      <div ref={ref} className={`${styles.container} ${styles[mode]} ${styles[intensity]} ${styles[variant]} ${className || ''}`} {...props}>
        {stains.map((stain, i) => {
          const styleClass = stain.type === 'ring' ? `${styles.ring} ${stain.size === 'lg' ? styles.ring1 : styles.ring2}` : `${styles.stain} ${styles[stainStyles[i % stainStyles.length]]}`;
          return <div key={i} className={styleClass} style={{ ...stain.position, transform: `rotate(${stain.rotation || 0}deg)` }} />;
        })}
        {agedPaper && <div className={styles.agedPaper} />}
        {paperTexture && <div className={styles.paperTexture} />}
        {burnEdges && <div className={styles.burnEdges} />}
        {edgeDarkening && <><div className={styles.edgeLeft} /><div className={styles.edgeRight} /></>}
      </div>
    );
  }
);

CoffeeStain.displayName = 'CoffeeStain';
export default CoffeeStain;
