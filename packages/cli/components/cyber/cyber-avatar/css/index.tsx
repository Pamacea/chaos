'use client';

import { forwardRef, ImgHTMLAttributes } from 'react';
import styles from './cyber-avatar.module.css';

export interface CyberAvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  status?: 'online' | 'offline' | 'busy' | 'away';
  glowing?: boolean;
}

export const CyberAvatar = forwardRef<HTMLDivElement, CyberAvatarProps>(
  ({ src, alt = 'Avatar', size = 'md', variant = 'cyan', status, glowing = false, className, ...props }, ref) => {
    const classes = [styles.avatar, styles[size], styles[variant], glowing && styles.glowing, className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes}>
        <img src={src} alt={alt} className={styles.image} {...props} />
        <div className={styles.border} />
        {status && <span className={`${styles.status} ${styles[status]}`} />}
      </div>
    );
  }
);

CyberAvatar.displayName = 'CyberAvatar';
export default CyberAvatar;
