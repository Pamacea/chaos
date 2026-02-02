'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './cursor-follower.module.css';

export interface CursorFollowerProps {
  /** Cursor size in pixels */
  size?: number;
  /** Cursor color */
  color?: string;
  /** Follow delay (higher = smoother but slower) */
  delay?: number;
  /** Cursor style */
  variant?: 'ring' | 'dot' | 'crosshair';
  /** Mix blend mode */
  blendMode?: 'difference' | 'exclusion' | 'normal';
}

export function CursorFollower({
  size = 20,
  color = '#ff0040',
  delay = 0.1,
  variant = 'ring',
  blendMode = 'difference',
}: CursorFollowerProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    let animationId: number;

    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * (1 - delay);
      position.current.y += (target.current.y - position.current.y) * (1 - delay);

      cursor.style.transform = `translate(${position.current.x - size / 2}px, ${position.current.y - size / 2}px)`;

      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [delay, size]);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${styles[variant]} ${isVisible ? styles.visible : ''}`}
      style={{
        width: size,
        height: size,
        borderColor: color,
        backgroundColor: variant === 'dot' ? color : 'transparent',
        mixBlendMode: blendMode,
      }}
      aria-hidden="true"
    />
  );
}

export default CursorFollower;
