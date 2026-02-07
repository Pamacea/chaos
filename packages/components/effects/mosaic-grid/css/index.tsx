'use client';

import { useEffect, useState, HTMLAttributes } from 'react';
import styles from './mosaic-grid.module.css';

export interface MosaicGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: number;
  /** Number of rows */
  rows?: number;
  /** Tile size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Gap between tiles */
  gap?: 'none' | 'small' | 'medium' | 'large';
  /** Color pattern */
  pattern?: 'checkered' | 'random' | 'gradient' | 'solid';
  /** Primary tile color */
  color?: string;
  /** Secondary tile color */
  color2?: string;
  /** Tile hover color */
  hoverColor?: string;
  /** Tile shape */
  shape?: 'square' | 'rounded' | 'circle';
  /** Initial reveal animation */
  animateOnMount?: boolean;
  /** Hover effect style */
  hoverEffect?: 'scale' | 'glitch' | 'pulse' | 'none';
  /** Custom class for grid */
  gridClassName?: string;
}

export function MosaicGrid({
  columns = 6,
  rows = 4,
  size = 'md',
  gap = 'small',
  pattern = 'checkered',
  color = '#1a1a1a',
  color2 = '#2a2a2a',
  hoverColor = '#ff0040',
  shape = 'square',
  animateOnMount = true,
  hoverEffect = 'scale',
  gridClassName,
  className,
  style,
  ...props
}: MosaicGridProps) {
  const [revealedTiles, setRevealedTiles] = useState<Set<number>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  const totalTiles = columns * rows;

  useEffect(() => {
    if (animateOnMount) {
      setIsInitialized(true);
      const intervals: NodeJS.Timeout[] = [];

      for (let i = 0; i < totalTiles; i++) {
        const delay = (i % 4) * 50 + Math.floor(i / 4) * 100;
        const timeout = setTimeout(() => {
          setRevealedTiles(prev => new Set([...prev, i]));
        }, delay);
        intervals.push(timeout as unknown as NodeJS.Timeout);
      }

      return () => intervals.forEach(clearTimeout);
    } else {
      setRevealedTiles(new Set(Array.from({ length: totalTiles }, (_, i) => i)));
      setIsInitialized(true);
    }
  }, [totalTiles, animateOnMount]);

  const handleTileClick = (index: number) => {
    setRevealedTiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getRandomColor = (seed: number) => {
    const colors = [color, color2, hoverColor];
    return colors[seed % colors.length];
  };

  const getGridStyle = () => ({
    '--columns': columns,
    '--rows': rows,
    '--tile-color': color,
    '--tile-color-1': color,
    '--tile-color-2': color2,
    '--tile-hover-color': hoverColor,
    '--tile-random-color': color,
    '--gradient-start': color,
    '--gradient-end': color2,
  } as React.CSSProperties);

  const tiles = Array.from({ length: totalTiles }, (_, i) => {
    const isRevealed = revealedTiles.has(i);
    const tileStyle = pattern === 'random' ? {
      '--tile-random-color': getRandomColor(i),
    } as React.CSSProperties : undefined;

    return (
      <div
        key={i}
        className={`${styles.tile} ${styles[`shape-${shape}`]} ${hoverEffect !== 'none' ? styles[hoverEffect] : ''} ${isRevealed ? styles.revealed : styles.hidden} ${isInitialized && animateOnMount ? styles.animating : ''}`}
        style={tileStyle}
        onClick={() => handleTileClick(i)}
        role="button"
        tabIndex={0}
        aria-label={`Tile ${i + 1}`}
      >
        <div className={styles.tileContent} />
      </div>
    );
  });

  return (
    <div
      className={`${styles.container} ${className || ''}`}
      style={style}
      {...props}
    >
      <div
        className={`${styles.grid} ${styles[`size-${size}`]} ${styles[`gap-${gap}`]} ${styles[`pattern-${pattern}`]} ${gridClassName || ''}`}
        style={getGridStyle()}
      >
        {tiles}
      </div>
    </div>
  );
}

MosaicGrid.displayName = 'MosaicGrid';

export default MosaicGrid;
