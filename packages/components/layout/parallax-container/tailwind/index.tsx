'use client';

import { forwardRef, HTMLAttributes, ReactNode, useRef, useEffect, useState } from 'react';

export interface ParallaxContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  speed?: number;
  offset?: number;
  disabled?: boolean;
  mobileBreakpoint?: number;
  smoothScrolling?: boolean;
  enable3D?: boolean;
  gpuAcceleration?: boolean;
  throttleMs?: number;
  className?: string;
}

export interface ParallaxLayerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  speed?: number;
  offset?: number;
  depth?: number;
  gpu?: boolean;
  className?: string;
}

interface LayerData {
  element: HTMLElement;
  speed: number;
  offset: number;
  depth: number;
}

const LAYER_CLASS = 'parallax-layer';

export const ParallaxContainer = forwardRef<HTMLDivElement, ParallaxContainerProps>(
  (
    {
      children,
      speed = 0.5,
      offset = 0,
      disabled = false,
      mobileBreakpoint = 768,
      smoothScrolling = false,
      enable3D = false,
      gpuAcceleration = true,
      throttleMs = 16,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<Map<HTMLElement, LayerData>>(new Map());
    const [isMobile, setIsMobile] = useState(false);
    const lastThrottle = useRef(0);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const checkMobile = () => {
        setIsMobile(window.innerWidth < mobileBreakpoint);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => window.removeEventListener('resize', checkMobile);
    }, [mobileBreakpoint]);

    useEffect(() => {
      if (disabled || isMobile) return;

      const container = containerRef.current;
      if (!container) return;

      let rafId: number;

      const updateLayers = () => {
        const scrollTop = window.scrollY;
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top + scrollTop;

        layersRef.current.forEach((layer) => {
          const relativeScroll = scrollTop - containerTop;
          const parallaxOffset = relativeScroll * layer.speed * speed + layer.offset;

          if (enable3D && layer.depth !== 0) {
            layer.element.style.transform = `translate3d(0, ${parallaxOffset}px, ${layer.depth}px)`;
          } else {
            layer.element.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
          }
        });
      };

      const handleScroll = () => {
        const now = performance.now();
        if (now - lastThrottle.current < throttleMs) {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            updateLayers();
            lastThrottle.current = now;
          });
          return;
        }

        updateLayers();
        lastThrottle.current = now;
      };

      const scanLayers = () => {
        layersRef.current.clear();
        const layerElements = container.querySelectorAll(`.${LAYER_CLASS}`);
        layerElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            const layerSpeed = parseFloat(el.dataset.speed || '1');
            const layerOffset = parseFloat(el.dataset.offset || '0');
            const layerDepth = parseFloat(el.dataset.depth || '0');
            layersRef.current.set(el, {
              element: el,
              speed: layerSpeed,
              offset: layerOffset,
              depth: layerDepth,
            });
          }
        });
      };

      const observer = new MutationObserver(scanLayers);
      observer.observe(container, { childList: true, subtree: true });

      window.addEventListener('scroll', handleScroll, { passive: true });

      scanLayers();
      updateLayers();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafId) cancelAnimationFrame(rafId);
        observer.disconnect();
      };
    }, [disabled, isMobile, speed, enable3D, throttleMs]);

    const containerClasses = [
      'relative overflow-hidden parallax-container',
      smoothScrolling && 'scroll-smooth',
      enable3D && 'perspective-[1000px]',
      gpuAcceleration && 'transform-gpu',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          containerRef.current = node;
        }}
        className={containerClasses}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ParallaxContainer.displayName = 'ParallaxContainer';

export const ParallaxLayer = forwardRef<HTMLDivElement, ParallaxLayerProps>(
  (
    {
      children,
      speed = 1,
      offset = 0,
      depth = 0,
      gpu = true,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const layerClasses = [
      LAYER_CLASS,
      'absolute inset-0 will-change-transform',
      gpu && 'transform-gpu',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={layerClasses}
        style={style}
        data-speed={speed}
        data-offset={offset}
        data-depth={depth}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ParallaxLayer.displayName = 'ParallaxLayer';

export default ParallaxContainer;
