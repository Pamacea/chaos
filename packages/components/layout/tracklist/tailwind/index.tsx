'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface Track {
  number: number | string;
  name: string;
  artist?: string;
  duration: string;
  active?: boolean;
}

export interface TracklistProps extends HTMLAttributes<HTMLDivElement> {
  tracks: Track[];
  variant?: 'silver' | 'blood' | 'gold' | 'bone';
  showHeader?: boolean;
  compact?: boolean;
  numbered?: boolean;
  onTrackClick?: (track: Track, index: number) => void;
}

const variantStyles = {
  silver: { accent: 'text-gray-400', bar: 'bg-gray-400', activeBg: 'bg-gray-400/10' },
  blood: { accent: 'text-red-800', bar: 'bg-red-800', activeBg: 'bg-red-800/20' },
  gold: { accent: 'text-amber-600', bar: 'bg-amber-600', activeBg: 'bg-amber-600/20' },
  bone: { accent: 'text-stone-400', bar: 'bg-stone-400', activeBg: 'bg-stone-400/20' },
};

export const Tracklist = forwardRef<HTMLDivElement, TracklistProps>(
  ({ tracks, variant = 'silver', showHeader = false, compact = false, numbered = false, onTrackClick, className = '', ...props }, ref) => {
    const colors = variantStyles[variant];

    return (
      <div ref={ref} className={`flex flex-col font-['Cormorant_Garamond',serif] ${className}`} {...props}>
        {showHeader && (
          <div className={`grid grid-cols-[auto_1fr_auto_auto] gap-6 py-3 px-6 border-b border-white/10 text-[0.65rem] uppercase tracking-[0.2em] ${colors.accent}`}>
            <span>#</span>
            <span>Title</span>
            <span></span>
            <span>Duration</span>
          </div>
        )}

        {tracks.map((track, index) => (
          <div
            key={index}
            onClick={() => onTrackClick?.(track, index)}
            className={`
              grid gap-6 items-center border-b border-white/5 cursor-pointer transition-all duration-300
              hover:bg-white/5 group
              ${compact ? 'grid-cols-[auto_1fr_auto] py-3 px-4 gap-4' : 'grid-cols-[auto_1fr_auto_auto] py-4 px-6'}
              ${track.active ? colors.activeBg : ''}
            `}
          >
            <span className={`
              font-['Share_Tech_Mono',monospace] min-w-[2rem]
              ${numbered ? "text-xl font-['Playfair_Display',serif] font-bold" : 'text-xs'}
              ${track.active ? colors.accent : colors.accent}
            `}>
              {track.active && <span className="mr-2">▶</span>}
              {String(track.number).padStart(2, '0')}
            </span>

            <div className="flex flex-col gap-1 overflow-hidden">
              <span className="text-white truncate">{track.name}</span>
              {track.artist && (
                <span className="text-xs text-white/40 italic">{track.artist}</span>
              )}
            </div>

            {!compact && (
              <div className="relative w-20 h-0.5 bg-white/10 overflow-hidden">
                <div className={`
                  absolute left-0 top-0 h-full w-0 ${colors.bar} transition-[width] duration-500
                  group-hover:w-full
                  ${track.active ? 'animate-[progress_180s_linear_forwards]' : ''}
                `} />
              </div>
            )}

            <span className="font-['Share_Tech_Mono',monospace] text-xs text-white/50 min-w-[3rem] text-right">
              {track.duration}
            </span>
          </div>
        ))}
      </div>
    );
  }
);

Tracklist.displayName = 'Tracklist';
export default Tracklist;
