'use client';

import React, { HTMLAttributes } from 'react';
import styles from './ghost-layer.module.css';

export interface GhostItem { id: string; text: string; position?: { x: number; y: number }; timestamp?: string; }
export interface GhostLayerProps extends HTMLAttributes<HTMLDivElement> { ghosts: GhostItem[]; baseOpacity?: number; revealOpacity?: number; revealDistance?: number; showScanLine?: boolean; }

export const GhostLayer = ({ ghosts, baseOpacity = 0.03, revealOpacity = 0.15, revealDistance = 150, showScanLine = true, className = '', ...props }: GhostLayerProps) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [scanLineY, setScanLineY] = React.useState(0);
  const [revealedGhosts, setRevealedGhosts] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setScanLineY(e.clientY);
      
      const newRevealed = new Set<string>();
      ghosts.forEach(ghost => {
        const pos = ghost.position || { x: 100, y: 100 };
        const distance = Math.sqrt(Math.pow(e.clientX - pos.x, 2) + Math.pow(e.clientY - pos.y, 2));
        if (distance < revealDistance) newRevealed.add(ghost.id);
      });
      setRevealedGhosts(newRevealed);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [ghosts, revealDistance]);

  return (
    <div className={`${styles.container} ${className || ''}`} {...props}>
      {ghosts.map(ghost => (
        <div key={ghost.id} className={styles.ghost} style={{ 
          left: (ghost.position?.x ?? 100) + 'px', 
          top: (ghost.position?.y ?? 100) + 'px',
          opacity: revealedGhosts.has(ghost.id) ? revealOpacity : baseOpacity 
        }}>
          {ghost.text}
        </div>
      ))}
      {showScanLine && <div className={styles.scanLine} style={{ top: scanLineY + 'px' }} />}
    </div>
  );
};
export default GhostLayer;
