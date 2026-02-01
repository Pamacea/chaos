'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface GiantLayersProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  layers?: 1 | 2 | 3;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'blood' | 'cyber' | 'mono' | 'neon';
  direction?: 'diagonal' | 'horizontal' | 'vertical';
  animated?: boolean;
  hover?: boolean;
  layerColors?: [string, string?, string?];
}

const sizeClasses = {
  sm: 'text-4xl md:text-6xl',
  md: 'text-6xl md:text-8xl',
  lg: 'text-7xl md:text-9xl',
  xl: 'text-8xl md:text-[12rem]',
};

const variantStyles = {
  blood: {
    base: 'bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent',
    shadow: 'text-rose-500',
  },
  cyber: {
    base: 'bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent',
    shadow: 'text-cyan-400',
  },
  mono: {
    base: 'text-white',
    shadow: 'text-gray-600',
  },
  neon: {
    base: 'text-white drop-shadow-[0_0_10px_#ff0040] drop-shadow-[0_0_20px_#ff0040]',
    shadow: 'text-transparent',
  },
};

const getOffset = (direction: string, layer: number) => {
  const px = (layer + 1) * 4;
  switch (direction) {
    case 'horizontal': return { transform: `translateX(${px}px)` };
    case 'vertical': return { transform: `translateY(${px}px)` };
    default: return { transform: `translate(${px}px, ${px}px)` };
  }
};

export const GiantLayers = forwardRef<HTMLSpanElement, GiantLayersProps>(
  (
    {
      children,
      layers = 3,
      size = 'lg',
      variant = 'blood',
      direction = 'diagonal',
      animated = false,
      hover = false,
      layerColors,
      className = '',
      ...props
    },
    ref
  ) => {
    const { base, shadow } = variantStyles[variant];
    const opacities = [0.5, 0.3, 0.15];

    return (
      <span
        ref={ref}
        className={`relative inline-block font-extrabold leading-none tracking-tight ${sizeClasses[size]} ${
          hover ? 'group' : ''
        } ${className}`}
        {...props}
      >
        {/* Shadow layers */}
        {[...Array(layers)].map((_, i) => {
          const layerIndex = layers - 1 - i;
          const colorStyle = layerColors?.[layerIndex] 
            ? { color: layerColors[layerIndex] }
            : undefined;
          
          return (
            <span
              key={i}
              className={`absolute top-0 left-0 pointer-events-none ${shadow} ${
                animated ? 'animate-pulse' : ''
              } ${hover ? 'transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6' : ''}`}
              style={{
                ...getOffset(direction, layerIndex),
                opacity: opacities[layerIndex],
                zIndex: -(layerIndex + 1),
                ...colorStyle,
              }}
              aria-hidden
            >
              {children}
            </span>
          );
        })}
        {/* Base layer */}
        <span className={`relative ${base}`}>{children}</span>
      </span>
    );
  }
);

GiantLayers.displayName = 'GiantLayers';
export default GiantLayers;
