'use client';

import { useEffect, useRef, forwardRef, HTMLAttributes } from 'react';
import styles from './bubbles.module.css';

export interface BubblesProps extends HTMLAttributes<HTMLCanvasElement> {
  /** Number of bubbles */
  count?: number;
  /** Minimum bubble size in pixels */
  minSize?: number;
  /** Maximum bubble size in pixels */
  maxSize?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Bubble color (rgba or hex) */
  color?: string;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleOffset: number;
}

export const Bubbles = forwardRef<HTMLCanvasElement, BubblesProps>(
  (
    {
      count = 20,
      minSize = 20,
      maxSize = 80,
      speed = 1,
      color = 'rgba(255, 255, 255, 0.1)',
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const bubblesRef = useRef<Bubble[]>([]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Parse color to handle opacity separately
      const parseColor = (colorStr: string): { r: number; g: number; b: number; a: number } => {
        // Handle rgba
        const rgbaMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbaMatch) {
          return {
            r: parseInt(rgbaMatch[1], 10),
            g: parseInt(rgbaMatch[2], 10),
            b: parseInt(rgbaMatch[3], 10),
            a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
          };
        }
        // Handle hex
        const hexMatch = colorStr.match(/#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i);
        if (hexMatch) {
          return {
            r: parseInt(hexMatch[1], 16),
            g: parseInt(hexMatch[2], 16),
            b: parseInt(hexMatch[3], 16),
            a: 1,
          };
        }
        return { r: 255, g: 255, b: 255, a: 0.1 };
      };

      const baseColor = parseColor(color);

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      const initBubbles = () => {
        bubblesRef.current = Array.from({ length: count }, () => ({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 200,
          radius: minSize + Math.random() * (maxSize - minSize),
          speedY: (0.5 + Math.random() * 1.5) * speed,
          speedX: (Math.random() - 0.5) * 0.5 * speed,
          opacity: 0.1 + Math.random() * baseColor.a,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.01 + Math.random() * 0.02,
          wobbleOffset: Math.random() * Math.PI * 2,
        }));
      };

      resize();
      initBubbles();
      window.addEventListener('resize', () => {
        resize();
        initBubbles();
      });

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bubblesRef.current.forEach((bubble) => {
          // Update position
          bubble.y -= bubble.speedY;
          bubble.x += bubble.speedX + Math.sin(bubble.wobble) * 0.5;
          bubble.wobble += bubble.wobbleSpeed;

          // Reset bubble if it goes off screen
          if (bubble.y + bubble.radius < -50) {
            bubble.y = canvas.height + bubble.radius + Math.random() * 100;
            bubble.x = Math.random() * canvas.width;
          }

          // Keep within horizontal bounds
          if (bubble.x < -bubble.radius) bubble.x = canvas.width + bubble.radius;
          if (bubble.x > canvas.width + bubble.radius) bubble.x = -bubble.radius;

          // Draw bubble
          ctx.beginPath();
          ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);

          // Create gradient for 3D effect
          const gradient = ctx.createRadialGradient(
            bubble.x - bubble.radius * 0.3,
            bubble.y - bubble.radius * 0.3,
            0,
            bubble.x,
            bubble.y,
            bubble.radius
          );

          gradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${bubble.opacity * 0.3})`);
          gradient.addColorStop(0.5, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${bubble.opacity * 0.1})`);
          gradient.addColorStop(1, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${bubble.opacity * 0.05})`);

          ctx.fillStyle = gradient;
          ctx.fill();

          // Add subtle highlight
          ctx.beginPath();
          ctx.arc(
            bubble.x - bubble.radius * 0.3,
            bubble.y - bubble.radius * 0.3,
            bubble.radius * 0.15,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`;
          ctx.fill();

          // Add subtle border
          ctx.beginPath();
          ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${bubble.opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        animationRef.current = requestAnimationFrame(render);
      };

      animationRef.current = requestAnimationFrame(render);

      return () => {
        window.removeEventListener('resize', resize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [count, minSize, maxSize, speed, color]);

    return (
      <canvas
        ref={(node) => {
          (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={`${styles.canvas} ${className || ''}`}
        style={{ position, ...style }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Bubbles.displayName = 'Bubbles';

export default Bubbles;
