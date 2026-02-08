'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './blob-cursor.module.css';

export interface BlobCursorProps {
  /** Blob size in pixels */
  size?: number;
  /** Blob color (any valid CSS color) */
  color?: string;
  /** How distorted the blob shape is (0 = perfect circle, higher = more distorted) */
  blobAmount?: number;
  /** Follow speed (0.01-1, lower = smoother/slower) */
  speed?: number;
  /** Smoothness/damping of movement (0.1-0.99, higher = more momentum) */
  damping?: number;
  /** Z-index of the blob cursor */
  zIndex?: number;
  /** Additional className for the blob container */
  className?: string;
  /** Child elements to render underneath the cursor */
  children?: React.ReactNode;
}

export function BlobCursor({
  size = 80,
  color = 'rgba(100, 200, 255, 0.5)',
  blobAmount = 5,
  speed = 0.1,
  damping = 0.9,
  zIndex = 9999,
  className = '',
  children,
}: BlobCursorProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animate = () => {
      const dx = mousePos.current.x - currentPos.current.x;
      const dy = mousePos.current.y - currentPos.current.y;

      velocity.current.x += dx * speed;
      velocity.current.y += dy * speed;

      velocity.current.x *= damping;
      velocity.current.y *= damping;

      currentPos.current.x += velocity.current.x;
      currentPos.current.y += velocity.current.y;

      const sizeOffset = size / 2;
      blob.style.transform = `translate(${currentPos.current.x - sizeOffset}px, ${currentPos.current.y - sizeOffset}px)`;

      // Dynamic distortion based on velocity
      const speedFactor = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      const dynamicBlob = blobAmount + speedFactor * 0.5;
      blob.style.filter = `url(#blob-filter-${dynamicBlob.toFixed(1)})`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [size, speed, damping, blobAmount, isVisible]);

  const svgFilterId = `blob-filter-${blobAmount.toFixed(1)}`;

  return (
    <>
      <svg className={styles.svgFilters}>
        <defs>
          <filter id={svgFilterId}>
            <feGaussianNoise in="SourceGraphic" stdDeviation={blobAmount} result="noise" />
            <feColorMatrix in="noise" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
            <feBlend mode="screen" in="composite" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>
      <div className={className}>
        {children}
        <div
          ref={blobRef}
          className={`${styles.blob} ${isVisible ? styles.visible : ''}`}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            filter: `url(#${svgFilterId})`,
            zIndex,
          }}
          aria-hidden="true"
        />
      </div>
    </>
  );
}

export default BlobCursor;
