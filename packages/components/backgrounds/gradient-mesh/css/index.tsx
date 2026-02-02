'use client';

import { forwardRef, useEffect, useRef, HTMLAttributes } from 'react';
import styles from './gradient-mesh.module.css';

export interface GradientMeshProps extends HTMLAttributes<HTMLDivElement> {
  /** Gradient colors */
  colors?: string[];
  /** Number of gradient points */
  pointCount?: number;
  /** Animation speed */
  speed?: number;
  /** Animation type */
  animation?: 'flow' | 'rotate' | 'pulse' | 'wave';
  /** Mesh opacity */
  opacity?: number;
  /** Blur amount */
  blur?: number;
  /** Scale of mesh */
  scale?: number;
}

export const GradientMesh = forwardRef<HTMLDivElement, GradientMeshProps>(
  (
    {
      colors = ['#ff0040', '#00ffff', '#ff00ff', '#00ff00'],
      pointCount = 4,
      speed = 1,
      animation = 'flow',
      opacity = 0.5,
      blur = 50,
      scale = 1,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      const resize = () => {
        canvas.width = window.innerWidth * scale;
        canvas.height = window.innerHeight * scale;
      };
      resize();
      window.addEventListener('resize', resize);

      // Generate gradient points
      const points = Array.from({ length: pointCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 200 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      let time = 0;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        time += 0.01 * speed;

        // Update and draw points
        points.forEach((point, i) => {
          switch (animation) {
            case 'flow':
              point.x += point.vx * speed;
              point.y += point.vy * speed;
              if (point.x < -point.radius) point.x = canvas.width + point.radius;
              if (point.x > canvas.width + point.radius) point.x = -point.radius;
              if (point.y < -point.radius) point.y = canvas.height + point.radius;
              if (point.y > canvas.height + point.radius) point.y = -point.radius;
              break;

            case 'rotate':
              point.x = canvas.width / 2 + Math.cos(time + i) * 200;
              point.y = canvas.height / 2 + Math.sin(time + i * 1.5) * 200;
              break;

            case 'pulse':
              point.radius = 150 + Math.sin(time * 2 + i) * 50;
              point.x = canvas.width / 2 + Math.cos(time + i * Math.PI / 2) * 250;
              point.y = canvas.height / 2 + Math.sin(time + i * Math.PI / 2) * 250;
              break;

            case 'wave':
              point.x = (canvas.width / pointCount) * i;
              point.y = canvas.height / 2 + Math.sin(time + i * 0.5) * 200;
              break;
          }

          // Draw gradient at point
          const gradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            point.radius
          );
          gradient.addColorStop(0, point.color + '40');
          gradient.addColorStop(1, 'transparent');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [colors, pointCount, speed, animation, scale]);

    return (
      <div
        ref={ref}
        className={`${styles.gradientMesh} ${className || ''}`}
        style={
          {
            opacity,
            filter: `blur(${blur}px)`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    );
  }
);

GradientMesh.displayName = 'GradientMesh';

export default GradientMesh;
