'use client';

import { useEffect, useRef } from 'react';
import styles from './particle-field.module.css';

export interface ParticleFieldProps {
  /** Number of particles */
  particleCount?: number;
  /** Connection distance (0 for no connections) */
  connectionDistance?: number;
  /** Particle size */
  size?: 'small' | 'medium' | 'large';
  /** Particle density/opacity */
  density?: 'sparse' | 'medium' | 'dense';
  /** Animation speed */
  speed?: number;
  /** Particle color (hex or rgb) */
  color?: string;
  /** Container class name */
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function ParticleField({
  particleCount = 100,
  connectionDistance = 150,
  size = 'medium',
  density = 'medium',
  speed = 1,
  color = '#00ffff',
  className,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
    };

    const initParticles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 2 + 1,
      }));
    };

    const drawParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, width, height);

      // Update positions
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
      });

      // Draw connections
      if (connectionDistance > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.3;
              ctx.beginPath();
              ctx.strokeStyle = color;
              ctx.globalAlpha = opacity;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      ctx.globalAlpha = 1;
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(
          particle.x * window.devicePixelRatio,
          particle.y * window.devicePixelRatio,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resize();
    window.addEventListener('resize', resize);
    initParticles();
    drawParticles();

    animationRef.current = animationId;

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [particleCount, connectionDistance, speed, color]);

  const densityClass = density === 'sparse' ? styles.sparse : density === 'dense' ? styles.dense : '';
  const sizeClass = styles[size];

  return (
    <div className={`${styles.container} ${densityClass} ${sizeClass} ${className || ''}`}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={
          {
            '--particle-size': size === 'small' ? '2px' : size === 'large' ? '4px' : '3px',
          } as React.CSSProperties
        }
      />
    </div>
  );
}

export default ParticleField;
