'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './scattered-nav.module.css';

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface ScatteredNavProps {
  /** Navigation items to display */
  items: NavItem[];
  /** Chaos level affects dispersion range */
  chaosLevel?: 'low' | 'medium' | 'high';
  /** Shape of nav items */
  shape?: 'rect' | 'circle' | 'dot';
  /** Nav variant */
  variant?: 'scattered' | 'vertical-dots';
  /** Flash effect on click/active */
  flashOnActive?: boolean;
  /** Show labels on hover */
  showLabels?: boolean;
  /** Additional className */
  className?: string;
}

// Seeded random for deterministic positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate position based on index and chaos level
function generatePosition(index: number, chaosLevel: 'low' | 'medium' | 'high', total: number) {
  const seed = index * 123.45;
  const rng = () => seededRandom(seed + index);

  const chaosRanges = {
    low: { pos: 10, rot: 3 },
    medium: { pos: 20, rot: 8 },
    high: { pos: 35, rot: 15 },
  };

  const range = chaosRanges[chaosLevel];

  // Position: distribute items around screen edges
  const side = Math.floor(rng() * 4); // 0: top, 1: right, 2: bottom, 3: left
  let top, left;

  const edgeMargin = 40 + rng() * range.pos;
  const spread = rng() * 100;

  switch (side) {
    case 0: // top
      top = edgeMargin;
      left = 10 + spread + '%';
      break;
    case 1: // right
      top = 10 + spread + '%';
      left = `calc(100% - ${edgeMargin}px)`;
      break;
    case 2: // bottom
      top = `calc(100% - ${edgeMargin}px)`;
      left = 10 + spread + '%';
      break;
    case 3: // left
      top = 10 + spread + '%';
      left = edgeMargin;
      break;
  }

  // Rotation
  const rotation = (rng() - 0.5) * 2 * range.rot;

  return { top, left, rotation, side };
}

export function ScatteredNav({
  items,
  chaosLevel = 'medium',
  shape = 'rect',
  variant = 'scattered',
  flashOnActive = true,
  showLabels = true,
  className = '',
}: ScatteredNavProps) {
  const [flashActive, setFlashActive] = useState(false);
  const [positions, setPositions] = useState<Array<{ top: string | number; left: string | number; rotation: number; side: number }>>([]);
  const navRef = useRef<HTMLElement>(null);

  // Generate positions on mount
  useEffect(() => {
    setPositions(items.map((_, i) => generatePosition(i, chaosLevel, items.length)));
  }, [items.length, chaosLevel]);

  const handleClick = (href: string) => {
    if (flashOnActive) {
      setFlashActive(true);
      setTimeout(() => setFlashActive(false), 150);
    }
  };

  if (variant === 'vertical-dots') {
    return (
      <nav ref={navRef} className={`${styles.verticalNav} ${className}`} aria-label="Navigation">
        {flashActive && <div className={`${styles.flash} ${styles.flashActive}`} aria-hidden="true" />}
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`${styles.navDot} ${item.isActive ? styles.active : ''}`}
            data-label={showLabels ? item.label : undefined}
            data-index={index}
            onClick={() => handleClick(item.href)}
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            {showLabels && <span className={styles.dotLabel}>{item.label}</span>}
          </a>
        ))}
      </nav>
    );
  }

  const shapeClasses = {
    rect: styles.shapeRect,
    circle: styles.shapeCircle,
    dot: styles.shapeDot,
  }[shape];

  return (
    <nav ref={navRef} className={`${styles.scatteredNav} ${className}`} aria-label="Navigation">
      {flashActive && <div className={`${styles.flash} ${styles.flashActive}`} aria-hidden="true" />}

      {items.map((item, index) => {
        const pos = positions[index] || { top: '50%', left: '50%', rotation: 0, side: 0 };
        return (
          <a
            key={index}
            href={item.href}
            className={`${styles.navItem} ${shapeClasses} ${item.isActive ? styles.active : ''}`}
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotation}deg)`,
              '--chaos-color': `hsl(${(index * 60) % 360}, 80%, 60%)`,
            } as React.CSSProperties}
            data-side={pos.side}
            data-index={index}
            onClick={() => handleClick(item.href)}
          >
            {showLabels && <span className={styles.itemLabel}>{item.label}</span>}
            {shape === 'dot' && <span className={styles.dotInner} />}
          </a>
        );
      })}
    </nav>
  );
}

ScatteredNav.displayName = 'ScatteredNav';

export default ScatteredNav;
