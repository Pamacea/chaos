'use client';

import { forwardRef, HTMLAttributes } from 'react';
import styles from './paper-edges.module.css';

export interface PaperEdgesProps extends HTMLAttributes<HTMLDivElement> {
  /** Edge style */
  style?: 'aged' | 'torn' | 'burnt' | 'ink' | 'frayed';
  /** Edge intensity */
  intensity?: 'light' | 'medium' | 'heavy';
  /** Corner style */
  corners?: 'rounded' | 'sharp' | 'ragged';
  /** Background color */
  backgroundColor?: string;
  /** Show deckle edge */
  deckle?: boolean;
}

export const PaperEdges = forwardRef<HTMLDivElement, PaperEdgesProps>(
  (
    {
      style: edgeStyle = 'aged',
      intensity = 'medium',
      corners = 'rounded',
      backgroundColor = '#f5f0e6',
      deckle = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.paperEdges} ${styles[edgeStyle]} ${styles[intensity]} ${styles[corners]} ${
          deckle ? styles.deckle : ''
        } ${className || ''}`}
        style={{ backgroundColor } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PaperEdges.displayName = 'PaperEdges';

export default PaperEdges;
