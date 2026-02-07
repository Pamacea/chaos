'use client';

import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import styles from './cursor-trail.module.css';

export interface CursorTrailProps extends HTMLAttributes<HTMLDivElement> { 
  trailCount?: number; trailSize?: number; trailColor?: string; trailColorAlt?: string; 
  blendMode?: 'normal' | 'difference' | 'screen' | 'multiply' | 'exclusion'; 
  cursorShape?: 'circle' | 'square' | 'crosshair'; hasCenterDot?: boolean; hoverScale?: number; stagger?: number; 
}

export const CursorTrail = ({ 
  trailCount = 3, trailSize = 20, trailColor = '#fff', trailColorAlt, blendMode = 'difference', 
  hasCenterDot = true, hoverScale = 2, stagger = 50, className = '', ...props 
}: CursorTrailProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const trails = useRef<Array<{ x: number; y: number }>>(Array(trailCount).fill({ x: 0, y: 0 }));
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsHovering((e.target as HTMLElement)?.matches?.('a, button, [role="button"], input, select, textarea') ?? false);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setMousePos(targetRef.current);
      const newTrails = [...trails.current];
      newTrails.unshift({ ...targetRef.current });
      if (newTrails.length > trailCount) newTrails.pop();
      trails.current = newTrails;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trailCount]);

  return (
    <div className={`${styles.container} ${isHovering ? styles.hovering : ''} ${className || ''}`} {...props}>
      {trails.current.map((pos, i) => (
        <div key={i} className={styles.trail} style={{ 
          left: (pos.x - trailSize / 2) + 'px', top: (pos.y - trailSize / 2) + 'px',
          '--trail-size': trailSize + 'px', '--trail-color': i % 2 === 0 ? trailColor : (trailColorAlt || trailColor),
          '--blend-mode': blendMode, transform: `scale(${1 - i * 0.15}) rotate(${Math.sin(i) * 10}deg)` 
        }} />
      ))}
      {hasCenterDot && <div className={styles.centerDot} style={{ 
        left: (mousePos.x - 2) + 'px', top: (mousePos.y - 2) + 'px', '--dot-color': trailColorAlt || '#ff0000' 
      }} />}
    </div>
  );
};
export default CursorTrail;
