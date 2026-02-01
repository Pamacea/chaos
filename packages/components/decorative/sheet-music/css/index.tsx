'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import styles from './sheet-music.module.css';

export const MUSIC_SYMBOLS = {
  quarterNote: '♩',
  eighthNote: '♪',
  beamedNotes: '♫',
  sixteenthNotes: '♬',
  trebleClef: '𝄞',
  bassClef: '𝄢',
  sharp: '♯',
  flat: '♭',
  natural: '♮',
  fermata: '𝄐',
  coda: '𝄌',
  segno: '𝄋',
};

export interface NoteConfig {
  symbol: keyof typeof MUSIC_SYMBOLS | string;
  position: { top: string; left: string };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  delay?: number;
}

export interface SheetMusicProps extends HTMLAttributes<HTMLDivElement> {
  /** Positioning mode */
  mode?: 'overlay' | 'inline';
  /** Animation style */
  animation?: 'drift' | 'falling' | 'swirling' | 'rising' | 'none';
  /** Color variant */
  variant?: 'ash' | 'silver' | 'gold' | 'blood' | 'ivory';
  /** Note density */
  density?: 'sparse' | 'normal' | 'dense';
  /** Number of random notes */
  count?: number;
  /** Custom note configurations */
  notes?: NoteConfig[];
  /** Show decorative staff lines */
  showStaff?: boolean;
  /** Symbols to use for random generation */
  symbols?: (keyof typeof MUSIC_SYMBOLS)[];
}

const generateRandomNotes = (
  count: number, 
  symbols: (keyof typeof MUSIC_SYMBOLS)[]
): NoteConfig[] => {
  const sizes: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
  return Array.from({ length: count }, (_, i) => ({
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    position: {
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 90 + 5}%`,
    },
    size: sizes[Math.floor(Math.random() * sizes.length)],
    delay: i * (Math.random() * 3 + 1),
  }));
};

const sizeClasses = {
  sm: styles.note4,
  md: styles.note1,
  lg: styles.note2,
  xl: styles.note5,
};

export const SheetMusic = forwardRef<HTMLDivElement, SheetMusicProps>(
  (
    {
      mode = 'overlay',
      animation = 'drift',
      variant = 'ash',
      density = 'normal',
      count = 8,
      notes: customNotes,
      showStaff = false,
      symbols = ['quarterNote', 'eighthNote', 'beamedNotes', 'sixteenthNotes', 'trebleClef', 'bassClef'],
      className,
      ...props
    },
    ref
  ) => {
    const notes = useMemo(() => 
      customNotes || generateRandomNotes(count, symbols),
      [customNotes, count, symbols]
    );

    const animationClass = {
      drift: '',
      falling: styles.falling,
      swirling: styles.swirling,
      rising: styles.rising,
      none: '',
    }[animation];

    return (
      <div
        ref={ref}
        className={`
          ${styles.container} 
          ${mode === 'inline' ? styles.inline : ''}
          ${styles[variant]} 
          ${styles[density]}
          ${animationClass}
          ${className || ''}
        `}
        {...props}
      >
        {showStaff && (
          <>
            <div className={`${styles.staff} ${styles.staffTop}`}>
              {[...Array(5)].map((_, i) => <div key={i} className={styles.staffLine} />)}
            </div>
            <div className={`${styles.staff} ${styles.staffBottom}`}>
              {[...Array(5)].map((_, i) => <div key={i} className={styles.staffLine} />)}
            </div>
          </>
        )}

        {notes.map((note, i) => {
          const symbol = MUSIC_SYMBOLS[note.symbol as keyof typeof MUSIC_SYMBOLS] || note.symbol;
          return (
            <span
              key={i}
              className={`${styles.note} ${sizeClasses[note.size || 'md']}`}
              style={{
                ...note.position,
                animationDelay: `${note.delay || i * 2}s`,
              }}
            >
              {symbol}
            </span>
          );
        })}
      </div>
    );
  }
);

SheetMusic.displayName = 'SheetMusic';
export default SheetMusic;
