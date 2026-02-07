'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './spell-cast.module.css';

export interface SpellCastProps {
  children: React.ReactNode;
  /** Type of spell for visual styling */
  spellType?: 'fire' | 'ice' | 'lightning' | 'nature' | 'shadow' | 'holy' | 'arcane';
  /** Size of the spell effect */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Duration in seconds */
  duration?: number;
  /** Trigger animation on click */
  triggerOnClick?: boolean;
  /** Auto-trigger on mount */
  autoTrigger?: boolean;
  /** Show rune symbol (arcane spells) */
  showRune?: boolean;
  /** Number of burst particles */
  particleCount?: number;
}

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'];

export function SpellCast({
  children,
  spellType = 'arcane',
  size = 'medium',
  duration = 0.6,
  triggerOnClick = true,
  autoTrigger = false,
  showRune = false,
  particleCount = 12,
}: SpellCastProps) {
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
        }, duration * 1000 + 200);
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

  const handleClick = () => {
    if (triggerOnClick) {
      trigger();
    }
  };

  // Generate particle directions
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 150 + Math.random() * 100;
    return {
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
      delay: Math.random() * 0.1,
    };
  });

  return (
    <div
      className={`${styles.container} ${styles[`spell-${spellType}`]} ${styles[`size-${size}`]}`}
      onClick={handleClick}
      style={{ cursor: triggerOnClick ? 'pointer' : 'default' }}
    >
      {isActive && (
        <div className={styles.castEffect}>
          {/* Flash */}
          <div className={`${styles.flash} ${isActive ? styles.active : ''}`} />

          {/* Shockwaves */}
          <div className={`${styles.shockwave} ${isActive ? styles.active : ''}`} />
          <div className={`${styles.shockwave} ${styles.delayed} ${isActive ? styles.active : ''}`} />
          <div className={`${styles.shockwave} ${styles.extraDelayed} ${isActive ? styles.active : ''}`} />

          {/* Particles */}
          <div className={styles.burst}>
            {particles.map((p, i) => (
              <div
                key={i}
                className={`${styles.particle} ${isActive ? styles.active : ''}`}
                style={{
                  '--tx': `${p.tx}px`,
                  '--ty': `${p.ty}px`,
                  '--duration': `${duration + Math.random() * 0.2}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Rune for arcane spells */}
          {showRune && spellType === 'arcane' && (
            <div className={`${styles.rune} ${isActive ? styles.active : ''}`}>
              {RUNES[Math.floor(Math.random() * RUNES.length)]}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export default SpellCast;
