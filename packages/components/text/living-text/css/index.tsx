'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef, useCallback } from 'react';
import styles from './living-text.module.css';

export interface LivingTextProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to display with living effect */
  text: string;
  /** Lifetime duration in ms. If 0, uses typing time-based duration */
  lifetime?: number;
  /** Base opacity for ghosts (0-1) */
  ghostOpacity?: number;
  /** Hover opacity for ghosts (0-1) */
  revealOpacity?: number;
  /** Pixel distance for ghost reveal */
  revealDistance?: number;
  /** Show timer display */
  showTimer?: boolean;
  /** Enable scan line effect on mouse move */
  enableScanLine?: boolean;
  /** Custom position for the living text [x, y] in pixels. Random if not provided */
  position?: [number, number];
}

interface GhostData {
  id: string;
  text: string;
  x: number;
  y: number;
  revealed: boolean;
}

export const LivingText = forwardRef<HTMLDivElement, LivingTextProps>(
  (
    {
      text,
      lifetime = 0,
      ghostOpacity = 0.03,
      revealOpacity = 0.15,
      revealDistance = 150,
      showTimer = true,
      enableScanLine = true,
      position,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [chars, setChars] = useState<Array<{ char: string; dying: boolean }>>([]);
    const [ghosts, setGhosts] = useState<GhostData[]>([]);
    const [elapsed, setElapsed] = useState(0);
    const [isDying, setIsDying] = useState(false);
    const [scanLineY, setScanLineY] = useState(0);
    const [scanLineActive, setScanLineActive] = useState(false);
    const [mouseY, setMouseY] = useState(0);

    const startTimeRef = useRef<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const deathTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scanLineTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastMouseYRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate random position if not provided
    const textPosition = position ?? [
      80 + Math.random() * Math.max(window.innerWidth - 560, 100),
      80 + Math.random() * Math.max(window.innerHeight - 260, 100),
    ];

    // Initialize character animation
    useEffect(() => {
      const charArray = text.split('').map((char) => ({ char, dying: false }));
      setChars(charArray);
      startTimeRef.current = Date.now();

      // Start timer
      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setElapsed((Date.now() - startTimeRef.current) / 1000);
        }
      }, 100);

      // Calculate lifetime
      const duration = lifetime > 0 ? lifetime : Math.max(2000, text.length * 100);

      // Start death animation after lifetime
      deathTimeoutRef.current = setTimeout(() => {
        startDeathAnimation();
      }, duration);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (deathTimeoutRef.current) clearTimeout(deathTimeoutRef.current);
      };
    }, [text, lifetime]);

    const startDeathAnimation = useCallback(() => {
      setIsDying(true);
      const totalChars = chars.length;
      const timePerChar = 50;

      // Kill characters in reverse order
      chars.forEach((_, i) => {
        const delay = (totalChars - 1 - i) * timePerChar;
        setTimeout(() => {
          setChars((prev) => {
            const newChars = [...prev];
            newChars[totalChars - 1 - i] = { ...newChars[totalChars - 1 - i], dying: true };
            return newChars;
          });
        }, delay);
      });

      // Create ghost after all characters die
      const totalDeathTime = totalChars * timePerChar + 500;
      setTimeout(() => {
        createGhost();
        setIsDying(false);
        setChars([]);
      }, totalDeathTime);
    }, [chars]);

    const createGhost = useCallback(() => {
      const newGhost: GhostData = {
        id: Math.random().toString(36).substring(7),
        text,
        x: textPosition[0],
        y: textPosition[1],
        revealed: false,
      };
      setGhosts((prev) => [...prev, newGhost]);
    }, [text, textPosition]);

    // Mouse move handler for scan line and ghost reveal
    useEffect(() => {
      if (!enableScanLine) return;

      const handleMouseMove = (e: MouseEvent) => {
        const newMouseY = e.clientY;
        setScanLineY(newMouseY);

        // Activate scan line on vertical movement
        const deltaY = Math.abs(newMouseY - lastMouseYRef.current);
        if (deltaY > 2) {
          setScanLineActive(true);
          if (scanLineTimeoutRef.current) {
            clearTimeout(scanLineTimeoutRef.current);
          }
          scanLineTimeoutRef.current = setTimeout(() => {
            setScanLineActive(false);
          }, 150);
        }
        lastMouseYRef.current = newMouseY;
        setMouseY(newMouseY);

        // Check ghost proximity
        setGhosts((prev) =>
          prev.map((ghost) => {
            const distance = Math.sqrt(
              Math.pow(e.clientX - (ghost.x + 100), 2) +
              Math.pow(e.clientY - (ghost.y + 20), 2)
            );
            return { ...ghost, revealed: distance < revealDistance };
          })
        );
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [enableScanLine, revealDistance]);

    const formatTime = (seconds: number): string => {
      return seconds.toFixed(1) + 's';
    };

    return (
      <>
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={`${styles.livingTextContainer} ${className || ''}`}
          style={style}
          {...props}
        >
          {showTimer && elapsed > 0 && (
            <div className={`${styles.timer} ${elapsed > 0 ? styles.active : ''}`}>
              {formatTime(elapsed)}
            </div>
          )}

          <div
            className={styles.livingText}
            style={{
              left: textPosition[0],
              top: textPosition[1],
            }}
          >
            {chars.map((item, i) => (
              <span
                key={i}
                className={`${styles.char} ${item.dying ? styles.dying : ''}`}
              >
                {item.char === ' ' ? '\u00A0' : item.char}
              </span>
            ))}
          </div>

          <div className={styles.ghostLayer}>
            {ghosts.map((ghost) => (
              <div
                key={ghost.id}
                className={`${styles.ghostText} ${ghost.revealed ? styles.revealed : ''}`}
                style={{
                  left: ghost.x,
                  top: ghost.y,
                  '--living-text-ghost-opacity': `rgba(255, 255, 255, ${ghostOpacity})`,
                  '--living-text-ghost-reveal': `rgba(255, 255, 255, ${revealOpacity})`,
                } as React.CSSProperties}
              >
                {ghost.text}
              </div>
            ))}
          </div>
        </div>

        {enableScanLine && (
          <div
            className={`${styles.scanLine} ${scanLineActive ? styles.active : ''}`}
            style={{ top: scanLineY }}
          />
        )}
      </>
    );
  }
);

LivingText.displayName = 'LivingText';

export default LivingText;
