'use client';

import { useEffect, useRef, useState } from 'react';

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

  const getFlareClasses = (type: FlareElement['type']): string => {
    const base = 'absolute rounded-full pointer-events-none will-change-transform';
    switch (type) {
      case 'core':
        return `${base} blur-[2px]`;
      case 'halo':
        return `${base} blur-[8px]`;
      case 'ring':
        return `${base} border-2 border-transparent bg-transparent`;
      case 'streak':
        return 'absolute pointer-events-none will-change-transform blur-[1px]';
      case 'ghost':
        return `${base} blur-[4px]`;
      case 'aperture':
        return `${base} blur-[2px]`;
      case 'rainbow':
        return `${base} blur-[3px] mix-blend-screen`;
      default:
        return base;
    }
  };

  const getFlareStyle = (type: FlareElement['type']) => {
    switch (type) {
      case 'core':
        return { background: `radial-gradient(circle, ${flareColor} 0%, transparent 70%)` };
      case 'halo':
        return { background: `radial-gradient(circle, ${hexToRgba(color, intensity * 0.4)} 0%, transparent 60%)` };
      case 'ring':
        return {
          borderColor: hexToRgba(color, 0.3),
          boxShadow: `0 0 20px ${hexToRgba(color, 0.2)}, inset 0 0 20px ${hexToRgba(color, 0.1)}`
        };
      case 'streak':
        return {
          background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(color, intensity * 0.6)} 20%, ${hexToRgba(color, intensity * 0.9)} 50%, ${hexToRgba(color, intensity * 0.6)} 80%, transparent 100%)`
        };
      case 'ghost':
        return { background: `radial-gradient(circle, ${hexToRgba(color, intensity * 0.3)} 0%, transparent 50%)` };
      case 'aperture':
        return {
          background: `conic-gradient(from 0deg, transparent 0deg, ${hexToRgba(color, 0.1)} 10deg, transparent 20deg, transparent 30deg, ${hexToRgba(color, 0.1)} 40deg, transparent 50deg, transparent 60deg, ${hexToRgba(color, 0.1)} 70deg, transparent 80deg, transparent 90deg, ${hexToRgba(color, 0.1)} 100deg, transparent 110deg, transparent 120deg, ${hexToRgba(color, 0.1)} 130deg, transparent 140deg, transparent 150deg, ${hexToRgba(color, 0.1)} 160deg, transparent 170deg, transparent 180deg)`
        };
      case 'rainbow':
        return {
          background: `conic-gradient(from 0deg, rgba(255, 0, 0, 0.3) 0deg, rgba(255, 165, 0, 0.3) 30deg, rgba(255, 255, 0, 0.3) 60deg, rgba(0, 255, 0, 0.3) 90deg, rgba(0, 255, 255, 0.3) 120deg, rgba(0, 0, 255, 0.3) 150deg, rgba(128, 0, 128, 0.3) 180deg, rgba(255, 0, 0, 0.3) 210deg, rgba(255, 165, 0, 0.3) 240deg, rgba(255, 255, 0, 0.3) 270deg, rgba(0, 255, 0, 0.3) 300deg, rgba(0, 255, 255, 0.3) 330deg, rgba(0, 0, 255, 0.3) 360deg)`
        };
      default:
        return {};
    }
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={flareContainerRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease-out' }}
      >
        {elements.map((element, index) => (
          <div
            key={index}
            className={getFlareClasses(element.type)}
            style={getFlareStyle(element.type)}
          />
        ))}
      </div>
      <div className="relative z-10">
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
