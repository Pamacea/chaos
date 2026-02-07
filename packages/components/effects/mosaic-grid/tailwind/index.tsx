'use client';

import { useEffect, useState, HTMLAttributes } from 'react';

export interface MosaicGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: number;
  /** Number of rows */
  rows?: number;
  /** Tile size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Gap between tiles in pixels */
  gap?: number;
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
}

export function MosaicGrid({
  columns = 6,
  rows = 4,
  size = 'md',
  gap = 1,
  pattern = 'checkered',
  color = '#1a1a1a',
  color2 = '#2a2a2a',
  hoverColor = '#ff0040',
  shape = 'square',
  animateOnMount = true,
  hoverEffect = 'scale',
  className = '',
  style,
  ...props
}: MosaicGridProps) {
  const [revealedTiles, setRevealedTiles] = useState<Set<number>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  const totalTiles = columns * rows;

  useEffect(() => {
    if (animateOnMount) {
      setIsInitialized(true);
      const timeouts: NodeJS.Timeout[] = [];

      for (let i = 0; i < totalTiles; i++) {
        const delay = (i % 4) * 50 + Math.floor(i / 4) * 100;
        const timeout = setTimeout(() => {
          setRevealedTiles(prev => new Set([...prev, i]));
        }, delay);
        timeouts.push(timeout);
      }

      return () => timeouts.forEach(clearTimeout);
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

  const getShapeClass = () => {
    switch (shape) {
      case 'rounded': return 'rounded';
      case 'circle': return 'rounded-full';
      default: return 'rounded-none';
    }
  };

  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case 'glitch': return 'hover:animate-glitch';
      case 'pulse': return 'hover:animate-pulse';
      case 'none': return '';
      default: return 'hover:scale-105';
    }
  };

  const getTileColor = (index: number) => {
    switch (pattern) {
      case 'checkered':
        return index % 2 === 0 ? color : color2;
      case 'random':
        return getRandomColor(index);
      case 'gradient':
        return `linear-gradient(135deg, ${color} 0%, ${color2} 100%)`;
      default:
        return color;
    }
  };

  const tiles = Array.from({ length: totalTiles }, (_, i) => {
    const isRevealed = revealedTiles.has(i);
    const tileBg = typeof getTileColor(i) === 'string' && getTileColor(i).startsWith('linear')
      ? { background: getTileColor(i) as string }
      : { backgroundColor: getTileColor(i) as string };

    return (
      <div
        key={i}
        className={`relative overflow-hidden cursor-crosshair transition-transform duration-300 ${getShapeClass()} ${getHoverEffectClass()} ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} ${isInitialized && animateOnMount ? 'transition-all duration-500' : ''}`}
        style={tileBg}
        onClick={() => handleTileClick(i)}
        role="button"
        tabIndex={0}
        aria-label={`Tile ${i + 1}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
      </div>
    );
  });

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`} style={style} {...props}>
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {tiles}
      </div>
    </div>
  );
}

MosaicGrid.displayName = 'MosaicGrid';

export default MosaicGrid;
