'use client';

import { forwardRef, ImgHTMLAttributes, useId } from 'react';

export interface GlitchImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const GlitchImage = forwardRef<HTMLDivElement, GlitchImageProps>(
  ({ src, alt = 'Image', className = '', ...props }, ref) => {
    const id = useId();
    return (
      <>
        <style>{`
          @keyframes glitch-r-${id} {
            0%, 100% { transform: translate(0); clip-path: inset(20% 0 40% 0); }
            25% { transform: translate(-5px, 5px); clip-path: inset(50% 0 20% 0); }
            50% { transform: translate(5px, -5px); clip-path: inset(10% 0 60% 0); }
            75% { transform: translate(-3px, 3px); clip-path: inset(70% 0 10% 0); }
          }
          @keyframes glitch-b-${id} {
            0%, 100% { transform: translate(0); clip-path: inset(60% 0 10% 0); }
            25% { transform: translate(5px, -5px); clip-path: inset(20% 0 50% 0); }
            50% { transform: translate(-5px, 5px); clip-path: inset(80% 0 5% 0); }
            75% { transform: translate(3px, -3px); clip-path: inset(5% 0 70% 0); }
          }
        `}</style>
        <div ref={ref} className={`relative overflow-hidden group ${className}`}>
          <img src={src} alt={alt} className="block w-full h-auto" {...props} />
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-0 mix-blend-screen group-hover:opacity-80"
            style={{ filter: 'hue-rotate(-50deg) saturate(200%)', animation: `glitch-r-${id} 0.3s steps(2) infinite` }}
            aria-hidden="true"
          />
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-0 mix-blend-screen group-hover:opacity-80"
            style={{ filter: 'hue-rotate(50deg) saturate(200%)', animation: `glitch-b-${id} 0.3s steps(2) infinite` }}
            aria-hidden="true"
          />
        </div>
      </>
    );
  }
);

GlitchImage.displayName = 'GlitchImage';
export default GlitchImage;
