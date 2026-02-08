'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './lens-flare.module.css';

export interface LensFlareProps {
  /** Content to overlay flare on */
  children?: React.ReactNode;
  /** Flare brightness 0-1 */
  intensity?: number;
  /** Flare color tint */
  color?: string;
  /** Max flare diameter in pixels */
  flareSize?: number;
  /** Number of flare elements */
  elementCount?: number;
  /** Whether flare follows mouse */
  followMouse?: boolean;
  /** Additional class name */
  className?: string;
}

interface FlareElement {
  type: 'core' | 'halo' | 'ring' | 'streak' | 'ghost' | 'aperture' | 'rainbow';
  size: number;
  distance: number;
  angle: number;
  opacity: number;
}

export function LensFlare({
  children,
  intensity = 0.6,
  color = '#ffffff',
  flareSize = 300,
  elementCount = 5,
  followMouse = true,
  className = '',
}: LensFlareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flareContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [elements, setElements] = useState<FlareElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Generate flare elements based on count
  useEffect(() => {
    const flareTypes: FlareElement['type'][] = ['core', 'halo', 'ring', 'streak', 'ghost', 'aperture', 'rainbow'];

    const newElements: FlareElement[] = [];
    for (let i = 0; i < elementCount; i++) {
      const type = flareTypes[i % flareTypes.length];
      const size = (flareSize * (0.1 + Math.random() * 0.4));
      const distance = flareSize * (0.2 + (i * 0.15));
      const angle = Math.random() * 360;
      const opacity = intensity * (0.3 + Math.random() * 0.7);

      newElements.push({ type, size, distance, angle, opacity });
    }

    setElements(newElements);
  }, [elementCount, flareSize, intensity]);

  // Handle mouse movement
  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [followMouse]);

  // Position flare elements
  useEffect(() => {
    if (!followMouse || !flareContainerRef.current || !isVisible) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate angle from center to mouse
    const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);

    // Update each element position
    elements.forEach((element, index) => {
      const el = flareContainerRef.current?.children[index] as HTMLDivElement;
      if (!el) return;

      const elementAngle = angle + (element.angle * Math.PI / 180);
      const x = Math.cos(elementAngle) * element.distance;
      const y = Math.sin(elementAngle) * element.distance;

      el.style.transform = `translate(${rect.width / 2 + x}px, ${rect.height / 2 + y}px)`;
      el.style.opacity = String(element.opacity);
      el.style.width = `${element.size}px`;
      el.style.height = element.size === element.size ? `${element.size}px` : `${element.size * 3}px`;
    });
  }, [mousePos, elements, isVisible, followMouse]);

  const flareColor = hexToRgba(color, intensity);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ '--flare-color': flareColor } as React.CSSProperties}
    >
      <div
        ref={flareContainerRef}
        className={styles.flareContainer}
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease-out' }}
      >
        {elements.map((element, index) => (
          <div
            key={index}
            className={`${styles.flare} ${styles[element.type]}`}
          />
        ))}
      </div>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default LensFlare;
