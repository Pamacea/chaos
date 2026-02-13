'use client';

import { useEffect, useRef } from 'react';
import styles from './noise-canvas.module.css';

export interface NoiseCanvasProps {
  /** Noise intensity */
  intensity?: 'subtle' | 'medium' | 'heavy';
  /** Noise scale/fineness */
  scale?: 'fine' | 'medium' | 'coarse';
  /** Animation speed (0 for static) */
  speed?: number;
  /** Container class name */
  className?: string;
}

export function NoiseCanvas({
  intensity = 'medium',
  scale = 'medium',
  speed = 1,
  className,
}: NoiseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const generateNoise = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      const scaleValue = scale === 'fine' ? 100 : scale === 'coarse' ? 50 : 75;
      const intensityValue = intensity === 'subtle' ? 30 : intensity === 'heavy' ? 80 : 50;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;

          // Simplex-like noise
          const nx = x / scaleValue;
          const ny = y / scaleValue;
          const nt = time * 0.0001 * speed;

          const noise = Math.sin(nx * 12.9898 + ny * 78.233 + nt) * 43758.5453;
          const value = ((Math.sin(noise) + 1) / 2) * intensityValue;

          data[i] = value; // R
          data[i + 1] = value; // G
          data[i + 2] = value; // B
          data[i + 3] = 255; // A
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = (time: number) => {
      if (speed !== 0) {
        generateNoise(time);
        animationId = requestAnimationFrame(animate);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    if (speed === 0) {
      generateNoise(0);
    } else {
      animationId = requestAnimationFrame(animate);
    }

    animationRef.current = animationId;

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [intensity, scale, speed]);

  const intensityClass = intensity === 'subtle' ? styles.subtle : intensity === 'heavy' ? styles.heavy : '';
  const scaleClass = scale === 'fine' ? styles.fine : scale === 'coarse' ? styles.coarse : '';

  return (
    <div className={`${styles.container} ${intensityClass} ${scaleClass} ${className || ''}`}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

export default NoiseCanvas;
