'use client';

import { useEffect, useRef, forwardRef, HTMLAttributes } from 'react';
import styles from './fireflies.module.css';

export interface FirefliesProps extends HTMLAttributes<HTMLCanvasElement> {
  /** Number of fireflies */
  count?: number;
  /** Firefly color (hex or rgb) */
  color?: string;
  /** Minimum firefly size in pixels */
  minSize?: number;
  /** Maximum firefly size in pixels */
  maxSize?: number;
  /** Movement speed multiplier */
  speed?: number;
  /** Glow intensity (0-1) */
  glowIntensity?: number;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

interface Firefly {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  pulsePhase: number;
  pulseSpeed: number;
  opacity: number;
}

export const Fireflies = forwardRef<HTMLCanvasElement, FirefliesProps>(
  (
    {
      count = 30,
      color = '#ffff00',
      minSize = 2,
      maxSize = 4,
      speed = 1,
      glowIntensity = 0.8,
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const firefliesRef = useRef<Firefly[]>([]);
    const animationRef = useRef<number>();

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resize();
      window.addEventListener('resize', resize);

      // Initialize fireflies
      const initFireflies = () => {
        const fireflies: Firefly[] = [];
        for (let i = 0; i < count; i++) {
          const size = minSize + Math.random() * (maxSize - minSize);
          fireflies.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size,
            speedX: (Math.random() - 0.5) * speed * 0.8,
            speedY: (Math.random() - 0.5) * speed * 0.8,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            opacity: Math.random() * 0.5 + 0.3,
          });
        }
        return fireflies;
      };

      firefliesRef.current = initFireflies();

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        firefliesRef.current.forEach((firefly) => {
          // Update position with random wandering
          firefly.x += firefly.speedX;
          firefly.y += firefly.speedY;

          // Random direction changes (simulating wandering)
          if (Math.random() < 0.02) {
            firefly.speedX += (Math.random() - 0.5) * 0.2 * speed;
            firefly.speedY += (Math.random() - 0.5) * 0.2 * speed;
          }

          // Clamp speed
          const maxSpeed = speed * 1.5;
          firefly.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, firefly.speedX));
          firefly.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, firefly.speedY));

          // Update pulse
          firefly.pulsePhase += firefly.pulseSpeed;

          // Wrap around screen
          if (firefly.x > canvas.width + firefly.size) {
            firefly.x = -firefly.size;
          } else if (firefly.x < -firefly.size) {
            firefly.x = canvas.width + firefly.size;
          }
          if (firefly.y > canvas.height + firefly.size) {
            firefly.y = -firefly.size;
          } else if (firefly.y < -firefly.size) {
            firefly.y = canvas.height + firefly.size;
          }

          // Calculate pulsing opacity
          const pulse = (Math.sin(firefly.pulsePhase) + 1) / 2;
          const currentOpacity = firefly.opacity * (0.3 + pulse * 0.7 * glowIntensity);

          // Draw glow
          const glowSize = firefly.size * 4;
          const gradient = ctx.createRadialGradient(
            firefly.x,
            firefly.y,
            0,
            firefly.x,
            firefly.y,
            glowSize
          );
          gradient.addColorStop(0, color);
          gradient.addColorStop(0.4, color);
          gradient.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(firefly.x, firefly.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = currentOpacity * 0.5;
          ctx.fill();

          // Draw core
          ctx.beginPath();
          ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();

          ctx.globalAlpha = 1;
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
    }, [count, color, minSize, maxSize, speed, glowIntensity]);

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

Fireflies.displayName = 'Fireflies';

export default Fireflies;
