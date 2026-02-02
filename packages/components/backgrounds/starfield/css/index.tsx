'use client';

import { forwardRef, useEffect, useRef, HTMLAttributes } from 'react';
import styles from './starfield.module.css';

export interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  opacity: number;
  twinkle: boolean;
}

export interface StarfieldProps extends HTMLAttributes<HTMLCanvasElement> {
  /** Number of stars to render */
  starCount?: number;
  /** Speed of star movement */
  speed?: number;
  /** Color of stars */
  color?: string;
  /** Star size range */
  minSize?: number;
  maxSize?: number;
  /** Enable twinkling effect */
  twinkle?: boolean;
  /** Twinkle speed */
  twinkleSpeed?: number;
  /** Perspective depth */
  depth?: number;
  /** Movement direction: 'center', 'right', 'down' */
  direction?: 'center' | 'right' | 'down' | 'random';
  /** Background color */
  backgroundColor?: string;
  /** Enable mouse parallax */
  mouseParallax?: boolean;
  /** Parallax intensity */
  parallaxIntensity?: number;
}

export const Starfield = forwardRef<HTMLCanvasElement, StarfieldProps>(
  (
    {
      starCount = 200,
      speed = 0.5,
      color = '#ffffff',
      minSize = 0.5,
      maxSize = 2,
      twinkle = true,
      twinkleSpeed = 0.02,
      depth = 1000,
      direction = 'center',
      backgroundColor = 'transparent',
      mouseParallax = true,
      parallaxIntensity = 0.5,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animationRef = useRef<number>();
    const mouseXRef = useRef(0);
    const mouseYRef = useRef(0);

    // Merge forwarded ref with local ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(canvasRef.current);
        } else {
          ref.current = canvasRef.current;
        }
      }
    }, [ref]);

    // Initialize stars
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
          z: Math.random() * depth,
          size: Math.random() * (maxSize - minSize) + minSize,
          speed: (Math.random() * 0.5 + 0.5) * speed,
          opacity: Math.random(),
          twinkle: Math.random() > 0.5,
        });
      }
      starsRef.current = stars;
    }, [starCount, minSize, maxSize, speed, depth]);

    // Handle mouse parallax
    useEffect(() => {
      if (!mouseParallax) return;

      const handleMouseMove = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseXRef.current = (e.clientX - centerX) / centerX * parallaxIntensity;
        mouseYRef.current = (e.clientY - centerY) / centerY * parallaxIntensity;
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseParallax, parallaxIntensity]);

    // Animation loop
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

      const animate = () => {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        starsRef.current.forEach((star) => {
          // Update position based on direction
          if (direction === 'center') {
            star.z -= star.speed;
            if (star.z <= 0) {
              star.z = depth;
              star.x = Math.random() * 2 - 1;
              star.y = Math.random() * 2 - 1;
            }
          } else if (direction === 'right') {
            star.x -= star.speed * 0.001;
            if (star.x < -1) {
              star.x = 1;
              star.z = Math.random() * depth;
            }
          } else if (direction === 'down') {
            star.y -= star.speed * 0.001;
            if (star.y < -1) {
              star.y = 1;
              star.z = Math.random() * depth;
            }
          }

          // Twinkle effect
          if (twinkle && star.twinkle) {
            star.opacity += (Math.random() - 0.5) * twinkleSpeed;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
          }

          // Calculate screen position with parallax
          let screenX = centerX + (star.x / star.z) * centerX * depth;
          let screenY = centerY + (star.y / star.z) * centerY * depth;

          if (mouseParallax) {
            screenX += mouseXRef.current * (depth - star.z);
            screenY += mouseYRef.current * (depth - star.z);
          }

          // Check bounds
          if (screenX < 0 || screenX > canvas.width || screenY < 0 || screenY > canvas.height) {
            if (direction === 'center' && star.z <= 0) {
              star.z = depth;
              star.x = Math.random() * 2 - 1;
              star.y = Math.random() * 2 - 1;
            }
            return;
          }

          // Calculate size based on depth
          const size = (depth - star.z) / depth * star.size;

          // Draw star
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(0, size), 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = star.opacity;
          ctx.fill();
          ctx.globalAlpha = 1;
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
    }, [speed, color, depth, direction, backgroundColor, twinkle, twinkleSpeed, mouseParallax, parallaxIntensity]);

    return (
      <canvas
        ref={canvasRef}
        className={`${styles.starfield} ${className || ''}`}
        style={style}
        {...props}
      />
    );
  }
);

Starfield.displayName = 'Starfield';

export default Starfield;
