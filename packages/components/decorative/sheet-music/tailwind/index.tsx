'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';

export const MUSIC_SYMBOLS = {
  quarterNote: '♩', eighthNote: '♪', beamedNotes: '♫', sixteenthNotes: '♬',
  trebleClef: '𝄞', bassClef: '𝄢', sharp: '♯', flat: '♭', natural: '♮',
  fermata: '𝄐', coda: '𝄌', segno: '𝄋',
};

export interface NoteConfig {
  symbol: keyof typeof MUSIC_SYMBOLS | string;
  position: { top: string; left: string };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  delay?: number;
}

export interface SheetMusicProps extends HTMLAttributes<HTMLDivElement> {
  mode?: 'overlay' | 'inline';
  animation?: 'drift' | 'falling' | 'swirling' | 'rising' | 'none';
  variant?: 'ash' | 'silver' | 'gold' | 'blood' | 'ivory';
  density?: 'sparse' | 'normal' | 'dense';
  count?: number;
  notes?: NoteConfig[];
  showStaff?: boolean;
  symbols?: (keyof typeof MUSIC_SYMBOLS)[];
}

const variantColors = {
  ash: 'text-zinc-800',
  silver: 'text-gray-400',
  gold: 'text-amber-600',
  blood: 'text-red-900',
  ivory: 'text-stone-200',
};

const sizeClasses = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl', xl: 'text-5xl' };
const densityDurations = { sparse: '30s', normal: '20s', dense: '12s' };

const generateRandomNotes = (count: number, symbols: (keyof typeof MUSIC_SYMBOLS)[]): NoteConfig[] => {
  const sizes: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
  return Array.from({ length: count }, (_, i) => ({
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    position: { top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 90 + 5}%` },
    size: sizes[Math.floor(Math.random() * sizes.length)],
    delay: i * (Math.random() * 3 + 1),
  }));
};

export const SheetMusic = forwardRef<HTMLDivElement, SheetMusicProps>(
  ({ mode = 'overlay', animation = 'drift', variant = 'ash', density = 'normal', count = 8, notes: customNotes, showStaff = false, symbols = ['quarterNote', 'eighthNote', 'beamedNotes', 'sixteenthNotes', 'trebleClef', 'bassClef'], className = '', ...props }, ref) => {
    const notes = useMemo(() => customNotes || generateRandomNotes(count, symbols), [customNotes, count, symbols]);
    const duration = densityDurations[density];

    const animationKeyframes = {
      drift: `@keyframes noteDrift { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; } 25% { transform: translateY(-20px) rotate(5deg); opacity: 0.5; } 50% { transform: translateY(0) rotate(0deg); opacity: 0.3; } 75% { transform: translateY(20px) rotate(-5deg); opacity: 0.5; } }`,
      falling: `@keyframes noteFall { 0% { transform: translateY(-100%) rotate(0deg); opacity: 0; } 10%, 90% { opacity: 0.4; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }`,
      swirling: `@keyframes noteSwirl { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; } 25% { transform: translate(30px, -40px) rotate(90deg) scale(1.1); opacity: 0.5; } 50% { transform: translate(0, 0) rotate(180deg) scale(1); opacity: 0.3; } 75% { transform: translate(-30px, 40px) rotate(270deg) scale(0.9); opacity: 0.5; } }`,
      rising: `@keyframes noteRise { 0% { transform: translateY(100vh) scale(0.5); opacity: 0; } 20%, 80% { opacity: 0.4; } 100% { transform: translateY(-100%) scale(1.5); opacity: 0; } }`,
      none: '',
    };

    const animationNames = { drift: 'noteDrift', falling: 'noteFall', swirling: 'noteSwirl', rising: 'noteRise', none: '' };

    return (
      <div
        ref={ref}
        className={`
          pointer-events-none overflow-hidden z-[1]
          ${mode === 'overlay' ? 'fixed inset-0' : 'relative w-full h-full'}
          ${variantColors[variant]}
          ${className}
        `}
        {...props}
      >
        <style>{animationKeyframes[animation]}</style>

        {showStaff && (
          <>
            <div className="absolute w-full top-[15%] flex flex-col gap-2 opacity-10">
              {[...Array(5)].map((_, i) => <div key={i} className="h-px bg-current" />)}
            </div>
            <div className="absolute w-full bottom-[15%] flex flex-col gap-2 opacity-10">
              {[...Array(5)].map((_, i) => <div key={i} className="h-px bg-current" />)}
            </div>
          </>
        )}

        {notes.map((note, i) => {
          const symbol = MUSIC_SYMBOLS[note.symbol as keyof typeof MUSIC_SYMBOLS] || note.symbol;
          return (
            <span
              key={i}
              className={`absolute opacity-30 ${sizeClasses[note.size || 'md']}`}
              style={{
                ...note.position,
                animation: animation !== 'none' ? `${animationNames[animation]} ${duration} linear infinite` : undefined,
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
