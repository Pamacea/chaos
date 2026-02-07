'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './heal-pulse.module.css';

export interface HealPulseProps {
  children: React.ReactNode;
  /** Type of healing effect */
  color?: 'nature' | 'holy' | 'mystic' | 'water' | 'life';
  /** Number of healing waves */
  waves?: number;
  /** Speed of the waves */
  speed?: 'slow' | 'medium' | 'fast';
  /** Size of the effect */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Trigger animation on click */
  triggerOnClick?: boolean;
  /** Auto-trigger on mount */
  autoTrigger?: boolean;
  /** Show floating particles */
  particles?: boolean;
  /** Show cross pattern (holy) */
  showCross?: boolean;
}

export function HealPulse({
  children,
  color = 'nature',
  waves = 5,
  speed = 'medium',
  size = 'medium',
  triggerOnClick = true,
  autoTrigger = false,
  particles = true,
  showCross = false,
}: HealPulseProps) {
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const trigger = () => {
    setIsActive(false);
    // Force reflow
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsActive(true);
        timeoutRef.current = setTimeout(() => {
          setIsActive(false);
        }, 3000);
      });
    });
  };

  useEffect(() => {
    if (autoTrigger) {
      trigger();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Generate sparkle particles
  const sparkles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    return {
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - 50,
      delay: Math.random() * 0.5,
    };
  });

  // Generate leaves for nature type
  const leaves = Array.from({ length: 8 }, (_, i) => ({
    tx: (Math.random() - 0.5) * 100,
    ty: 50 + Math.random() * 50,
    delay: Math.random() * 0.3,
  }));

  // Generate plus symbols for holy type
  const plusSymbols = Array.from({ length: 6 }, (_, i) => ({
    tx: (Math.random() - 0.5) * 80,
    ty: -60 - Math.random() * 60,
    delay: Math.random() * 0.4,
  }));

  return (
    <div
      className={`${styles.container} ${styles[`color-${color}`]} ${styles[`speed-${speed}`]} ${styles[`size-${size}`]}`}
      onClick={triggerOnClick ? trigger : undefined}
      style={{ cursor: triggerOnClick ? 'pointer' : 'default' }}
    >
      {isActive && (
        <div className={styles.healEffect}>
          {/* Central glow */}
          <div className={`${styles.glowCenter} ${isActive ? styles.active : ''}`} />

          {/* Healing waves */}
          {Array.from({ length: waves }).map((_, i) => (
            <div
              key={i}
              className={`${styles.wave} ${showCross ? styles.holy : ''} ${isActive ? styles.active : ''}`}
            />
          ))}

          {/* Sparkles (all types) */}
          {particles && sparkles.map((sparkle, i) => (
            <div
              key={i}
              className={`${styles.healSparkle} ${isActive ? styles.active : ''}`}
              style={{
                '--tx': `${sparkle.tx}px`,
                '--ty': `${sparkle.ty}px`,
                animationDelay: `${sparkle.delay}s`,
              } as React.CSSProperties}
            />
          ))}

          {/* Leaves (nature type) */}
          {color === 'nature' && particles && leaves.map((leaf, i) => (
            <div
              key={`leaf-${i}`}
              className={`${styles.leaf} ${isActive ? styles.active : ''}`}
              style={{
                '--tx': `${leaf.tx}px`,
                '--ty': `${leaf.ty}px`,
                animationDelay: `${leaf.delay}s`,
              } as React.CSSProperties}
            />
          ))}

          {/* Plus symbols (holy type) */}
          {color === 'holy' && particles && plusSymbols.map((plus, i) => (
            <div
              key={`plus-${i}`}
              className={`${styles.plusSymbol} ${isActive ? styles.active : ''}`}
              style={{
                '--ty': `${plus.ty}px`,
                animationDelay: `${plus.delay}s`,
              } as React.CSSProperties}
            >
              +
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

export default HealPulse;
