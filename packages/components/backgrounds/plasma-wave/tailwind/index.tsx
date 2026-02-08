'use client';

import { forwardRef, useEffect, useRef, HTMLAttributes } from 'react';

export interface PlasmaWaveProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of plasma colors (min 2 colors recommended) */
  colors?: string[];
  /** Animation speed multiplier (0.1 - 3) */
  speed?: number;
  /** Wave complexity - number of overlapping waves (2 - 6) */
  complexity?: number;
  /** Wave intensity/amplitude (0.1 - 1) */
  intensity?: number;
  /** Canvas scale for performance (0.5 - 2, higher = sharper) */
  scale?: number;
  /** Position the plasma effect */
  position?: 'fixed' | 'absolute';
}

const defaultColors = [
  '#ff006e', // Hot pink
  '#8338ec', // Purple
  '#3a86ff', // Blue
  '#06ffa5', // Cyan
  '#ffbe0b', // Gold
];

export const PlasmaWave = forwardRef<HTMLDivElement, PlasmaWaveProps>(
  (
    {
      colors = defaultColors,
      speed = 1,
      complexity = 3,
      intensity = 0.5,
      scale = 1,
      position = 'fixed',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const timeRef = useRef(0);

    // Normalize and validate props
    const normalizedSpeed = Math.max(0.1, Math.min(3, speed));
    const normalizedComplexity = Math.max(2, Math.min(6, Math.round(complexity)));
    const normalizedIntensity = Math.max(0.1, Math.min(1, intensity));
    const normalizedScale = Math.max(0.5, Math.min(2, scale));

    // Pad colors array to match complexity
    const waveColors = Array.from({ length: normalizedComplexity }, (_, i) =>
      colors[i % colors.length]
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      // Setup canvas size with scale factor for performance
      const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr * normalizedScale;
        canvas.height = rect.height * dpr * normalizedScale;
        ctx.scale(dpr * normalizedScale, dpr * normalizedScale);
      };

      resize();
      window.addEventListener('resize', resize);

      // Color parsing helper
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
          : { r: 255, g: 255, b: 255 };
      };

      const rgbColors = waveColors.map(hexToRgb);

      // Plasma wave animation
      const animate = () => {
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const imageData = ctx.createImageData(
          canvas.width,
          canvas.height
        );
        const data = imageData.data;

        // Skip pixels based on scale for performance
        const pixelScale = Math.max(1, Math.floor(2 / normalizedScale));
        const scaledWidth = Math.ceil(canvas.width / pixelScale);
        const scaledHeight = Math.ceil(canvas.height / pixelScale);

        const time = timeRef.current;

        for (let y = 0; y < scaledHeight; y++) {
          for (let x = 0; x < scaledWidth; x++) {
            // Normalize coordinates
            const nx = (x / scaledWidth) * 2 - 1;
            const ny = (y / scaledHeight) * 2 - 1;

            // Calculate plasma value using multiple sine waves
            let plasma = 0;
            const phase = time * normalizedSpeed;

            // Wave 1: Large flowing wave
            plasma += Math.sin(nx * 3 + phase);
            // Wave 2: Diagonal wave
            plasma += Math.sin((nx + ny) * 2 + phase * 0.7);
            // Wave 3: Radial wave from center
            const dist = Math.sqrt(nx * nx + ny * ny);
            plasma += Math.sin(dist * 5 - phase * 0.5);
            // Wave 4: Swirling pattern
            plasma += Math.sin(Math.atan2(ny, nx) * 3 + phase);

            // Normalize to 0-1 range
            plasma = (plasma + 4) / 8;

            // Apply intensity curve for more dramatic effect
            plasma = Math.pow(plasma, 1.5 - normalizedIntensity * 0.5);

            // Blend colors based on plasma value and complexity
            let r = 0, g = 0, b = 0;
            const colorIndex = (plasma * normalizedComplexity) % normalizedComplexity;
            const colorLow = Math.floor(colorIndex);
            const colorHigh = (colorLow + 1) % normalizedComplexity;
            const colorT = colorIndex - colorLow;

            const c1 = rgbColors[colorLow];
            const c2 = rgbColors[colorHigh];

            r = c1.r + (c2.r - c1.r) * colorT;
            g = c1.g + (c2.g - c1.g) * colorT;
            b = c1.b + (c2.b - c1.b) * colorT;

            // Apply intensity
            r = Math.min(255, r * normalizedIntensity * 2);
            g = Math.min(255, g * normalizedIntensity * 2);
            b = Math.min(255, b * normalizedIntensity * 2);

            // Set pixel data (with scaling for performance)
            for (let py = 0; py < pixelScale && y * pixelScale + py < canvas.height; py++) {
              for (let px = 0; px < pixelScale && x * pixelScale + px < canvas.width; px++) {
                const idx = ((y * pixelScale + py) * canvas.width + (x * pixelScale + px)) * 4;
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
                data[idx + 3] = 255;
              }
            }
        }

        ctx.putImageData(imageData, 0, 0);

        // Increment time (base speed ~60fps)
        timeRef.current += 0.016;
        animationRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [
      normalizedSpeed,
      normalizedComplexity,
      normalizedIntensity,
      normalizedScale,
      waveColors,
    ]);

    return (
      <div
        ref={ref}
        className={`inset-0 w-full h-full overflow-hidden pointer-events-none z-[1] ${className || ''}`}
        style={{ position, ...style }}
        aria-hidden="true"
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: normalizedIntensity }}
        />
      </div>
    );
  }
);

PlasmaWave.displayName = 'PlasmaWave';

export default PlasmaWave;
