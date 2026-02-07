'use client';

import { forwardRef, HTMLAttributes, useEffect, useState, useRef, useCallback } from 'react';

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
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [chars, setChars] = useState<Array<{ char: string; dying: boolean }>>([]);
    const [ghosts, setGhosts] = useState<GhostData[]>([]);
    const [elapsed, setElapsed] = useState(0);
    const [scanLineY, setScanLineY] = useState(0);
    const [scanLineActive, setScanLineActive] = useState(false);

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
          className={`relative inline-block ${className}`}
          style={style}
          {...props}
        >
          {showTimer && elapsed > 0 && (
            <div
              className={`absolute -top-8 right-0 text-xs tabular-nums transition-colors duration-300 ${
                elapsed > 0 ? 'text-white/50' : 'text-white/20'
              }`}
            >
              {formatTime(elapsed)}
            </div>
          )}

          <div
            className="relative inline-flex flex-wrap font-mono text-slate-200 whitespace-pre-wrap"
            style={{
              left: textPosition[0],
              top: textPosition[1],
            }}
          >
            {chars.map((item, i) => (
              <span
                key={i}
                className={`inline-block transition-all duration-400 ${
                  item.dying ? 'opacity-0 -translate-y-2' : ''
                }`}
              >
                {item.char === ' ' ? '\u00A0' : item.char}
              </span>
            ))}
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {ghosts.map((ghost) => (
              <div
                key={ghost.id}
                className="absolute font-mono whitespace-pre-wrap transition-colors duration-300"
                style={{
                  left: ghost.x,
                  top: ghost.y,
                  color: ghost.revealed
                    ? `rgba(255, 255, 255, ${revealOpacity})`
                    : `rgba(255, 255, 255, ${ghostOpacity})`,
                }}
              >
                {ghost.text}
              </div>
            ))}
          </div>
        </div>

        {enableScanLine && (
          <div
            className={`fixed left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none z-[100] transition-opacity duration-300 ${
              scanLineActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ top: scanLineY }}
          />
        )}
      </>
    );
  }
);

LivingText.displayName = 'LivingText';

export default LivingText;
