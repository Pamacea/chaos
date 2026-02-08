'use client';

import { useEffect, useRef, forwardRef, HTMLAttributes } from 'react';
import styles from './snowfall.module.css';

export interface SnowfallProps extends HTMLAttributes<HTMLCanvasElement> {
  /** Number of snowflakes */
  snowflakeCount?: number;
  /** Minimum snowflake size in pixels */
  minSize?: number;
  /** Maximum snowflake size in pixels */
  maxSize?: number;
  /** Fall speed multiplier */
  speed?: number;
  /** Horizontal wind (negative = left, positive = right) */
  wind?: number;
  /** Snowflake color */
  color?: string;
  /** Snowflake opacity (0-1) */
  opacity?: number;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  sway: number;
  swayOffset: number;
  opacity: number;
}

export const Snowfall = forwardRef<HTMLCanvasElement, SnowfallProps>(
  (
    {
      snowflakeCount = 100,
      minSize = 2,
      maxSize = 5,
      speed = 1,
      wind = 0,
      color = '#ffffff',
      opacity = 0.8,
      position = 'fixed',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const snowflakesRef = useRef<Snowflake[]>([]);
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

      // Initialize snowflakes
      const initSnowflakes = () => {
        const snowflakes: Snowflake[] = [];
        for (let i = 0; i < snowflakeCount; i++) {
          const size = minSize + Math.random() * (maxSize - minSize);
          snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size,
            speedY: (size / maxSize) * speed + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            sway: Math.random() * 2 + 1,
            swayOffset: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.5 + 0.3,
          });
        }
        return snowflakes;
      };

      snowflakesRef.current = initSnowflakes();

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snowflakesRef.current.forEach((flake) => {
          // Update position
          flake.y += flake.speedY * speed;
          flake.x += flake.speedX + Math.sin(flake.y * 0.01 + flake.swayOffset) * flake.sway * 0.5 + wind;

          // Wrap around screen
          if (flake.y > canvas.height + flake.size) {
            flake.y = -flake.size;
            flake.x = Math.random() * canvas.width;
          }
          if (flake.x > canvas.width + flake.size) {
            flake.x = -flake.size;
          } else if (flake.x < -flake.size) {
            flake.x = canvas.width + flake.size;
          }

          // Draw snowflake
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = flake.opacity * opacity;
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
    }, [snowflakeCount, minSize, maxSize, speed, wind, color, opacity]);

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

Snowfall.displayName = 'Snowfall';

export default Snowfall;
