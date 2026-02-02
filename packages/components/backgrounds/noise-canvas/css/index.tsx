'use client';

import { useEffect, useRef, forwardRef, HTMLAttributes } from 'react';
import styles from './noise-canvas.module.css';

export interface NoiseCanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  /** Noise opacity (0-1) */
  opacity?: number;
  /** Animation speed (fps) */
  fps?: number;
  /** Noise intensity (0-255) */
  intensity?: number;
  /** Monochrome or colored noise */
  monochrome?: boolean;
  /** Fixed or absolute positioning */
  position?: 'fixed' | 'absolute';
}

export const NoiseCanvas = forwardRef<HTMLCanvasElement, NoiseCanvasProps>(
  (
    {
      opacity = 0.05,
      fps = 24,
      intensity = 50,
      monochrome = true,
      position = 'fixed',
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

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resize();
      window.addEventListener('resize', resize);

      let lastFrame = 0;
      const frameInterval = 1000 / fps;

      const render = (timestamp: number) => {
        if (timestamp - lastFrame >= frameInterval) {
          const imageData = ctx.createImageData(canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * intensity;

            if (monochrome) {
              data[i] = value;
              data[i + 1] = value;
              data[i + 2] = value;
            } else {
              data[i] = Math.random() * intensity;
              data[i + 1] = Math.random() * intensity;
              data[i + 2] = Math.random() * intensity;
            }
            data[i + 3] = 255;
          }

          ctx.putImageData(imageData, 0, 0);
          lastFrame = timestamp;
        }

        animationRef.current = requestAnimationFrame(render);
      };

      animationRef.current = requestAnimationFrame(render);

      return () => {
        window.removeEventListener('resize', resize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [fps, intensity, monochrome]);

    return (
      <canvas
        ref={(node) => {
          (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={`${styles.canvas} ${className || ''}`}
        style={{
          position,
          opacity,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

NoiseCanvas.displayName = 'NoiseCanvas';

export default NoiseCanvas;
