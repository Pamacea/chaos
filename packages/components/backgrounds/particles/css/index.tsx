'use client';

import { useEffect, useRef, useCallback, forwardRef, HTMLAttributes } from 'react';
import styles from './particles.module.css';

/**
 * Particle interface for internal state management
 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface ParticlesProps extends HTMLAttributes<HTMLCanvasElement> {
  /** Number of particles to render */
  particleCount?: number;
  /** Base animation speed multiplier */
  speed?: number;
  /** Particle size in pixels */
  size?: number;
  /** Particle color (hex or rgb) */
  color?: string;
  /** Maximum distance to draw connection lines between particles */
  connectionDistance?: number;
  /** Opacity of connection lines (0-1) */
  lineOpacity?: number;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
  /** Enable mouse interaction (particles flee from cursor) */
  mouseInteraction?: boolean;
  /** Mouse interaction radius */
  mouseRadius?: number;
}

export const Particles = forwardRef<HTMLCanvasElement, ParticlesProps>(
  (
    {
      particleCount = 100,
      speed = 1,
      size = 2,
      color = '#ffffff',
      connectionDistance = 100,
      lineOpacity = 0.15,
      position = 'fixed',
      mouseInteraction = true,
      mouseRadius = 150,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();
    const mouseRef = useRef({ x: -1000, y: -1000 });

    // Parse color to RGB for line rendering
    const parseColor = useCallback((colorStr: string): { r: number; g: number; b: number } => {
      const ctx = document.createElement('canvas').getContext('2d');
      if (!ctx) return { r: 255, g: 255, b: 255 };

      ctx.fillStyle = colorStr;
      const computed = ctx.fillStyle;

      // Handle rgb(r, g, b) format
      const rgbMatch = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        return {
          r: parseInt(rgbMatch[1], 10),
          g: parseInt(rgbMatch[2], 10),
          b: parseInt(rgbMatch[3], 10),
        };
      }

      // Handle #rrggbb format
      const hexMatch = computed.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      if (hexMatch) {
        return {
          r: parseInt(hexMatch[1], 16),
          g: parseInt(hexMatch[2], 16),
          b: parseInt(hexMatch[3], 16),
        };
      }

      return { r: 255, g: 255, b: 255 };
    }, []);

    // Initialize particles
    const initParticles = useCallback((width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
        });
      }
      return particles;
    }, [particleCount, speed]);

    // Animation loop
    const animate = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height } = canvas;
      const particles = particlesRef.current;
      const rgb = parseColor(color);

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction
        if (mouseInteraction) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            p.vx += (dx / dist) * force * 0.5;
            p.vy += (dy / dist) * force * 0.5;
          }
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Limit velocity
        const maxSpeed = 2 * speed;
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > maxSpeed) {
          p.vx = (p.vx / currentSpeed) * maxSpeed;
          p.vy = (p.vy / currentSpeed) * maxSpeed;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * lineOpacity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }, [color, size, connectionDistance, lineOpacity, speed, mouseInteraction, mouseRadius, parseColor]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesRef.current = initParticles(canvas.width, canvas.height);
      };

      resize();
      window.addEventListener('resize', resize);

      // Track mouse position
      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };

      const handleMouseLeave = () => {
        mouseRef.current = { x: -1000, y: -1000 };
      };

      if (mouseInteraction) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
      }

      // Start animation
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener('resize', resize);
        if (mouseInteraction) {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseleave', handleMouseLeave);
        }
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [initParticles, animate, mouseInteraction]);

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

Particles.displayName = 'Particles';

export default Particles;
