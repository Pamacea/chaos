'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './tracklist.module.css';

export interface Track {
  number: number | string;
  name: string;
  artist?: string;
  duration: string;
  active?: boolean;
}

export interface TracklistProps extends HTMLAttributes<HTMLDivElement> {
  /** List of tracks */
  tracks: Track[];
  /** Color variant */
  variant?: 'silver' | 'blood' | 'gold' | 'bone';
  /** Show header row */
  showHeader?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Large track numbers */
  numbered?: boolean;
  /** Track click handler */
  onTrackClick?: (track: Track, index: number) => void;
}

export const Tracklist = forwardRef<HTMLDivElement, TracklistProps>(
  (
    {
      tracks,
      variant = 'silver',
      showHeader = false,
      compact = false,
      numbered = false,
      onTrackClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          ${styles.tracklist} 
          ${styles[variant]} 
          ${compact ? styles.compact : ''} 
          ${numbered ? styles.numbered : ''}
          ${className || ''}
        `}
        {...props}
      >
        {showHeader && (
          <div className={styles.header}>
            <span>#</span>
            <span>Title</span>
            <span></span>
            <span>Duration</span>
          </div>
        )}

        {tracks.map((track, index) => (
          <div
            key={index}
            className={`${styles.track} ${track.active ? styles.active : ''}`}
            onClick={() => onTrackClick?.(track, index)}
          >
            <span className={styles.trackNum}>
              {String(track.number).padStart(2, '0')}
            </span>
            
            <div className={styles.trackInfo}>
              <span className={styles.trackName}>{track.name}</span>
              {track.artist && (
                <span className={styles.trackArtist}>{track.artist}</span>
              )}
            </div>

            {!compact && (
              <div className={styles.trackBarContainer}>
                <div className={styles.trackBar} />
              </div>
            )}

            <span className={styles.trackDuration}>{track.duration}</span>
          </div>
        ))}
      </div>
    );
  }
);

Tracklist.displayName = 'Tracklist';
export default Tracklist;
