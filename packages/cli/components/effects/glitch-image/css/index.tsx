'use client';

import { forwardRef, ImgHTMLAttributes } from 'react';
import styles from './glitch-image.module.css';

export interface GlitchImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  intensity?: 'low' | 'medium' | 'high';
  continuous?: boolean;
}

export const GlitchImage = forwardRef<HTMLDivElement, GlitchImageProps>(
  ({ src, alt = 'Image', intensity = 'medium', continuous = false, className, ...props }, ref) => {
    const classes = [styles.container, styles[intensity], continuous && styles.continuous, className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes}>
        <img src={src} alt={alt} className={styles.base} {...props} />
        <img src={src} alt="" className={`${styles.layer} ${styles.red}`} aria-hidden="true" />
        <img src={src} alt="" className={`${styles.layer} ${styles.blue}`} aria-hidden="true" />
      </div>
    );
  }
);

GlitchImage.displayName = 'GlitchImage';
export default GlitchImage;
