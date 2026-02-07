'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './quest-scroll.module.css';

export type QuestStatus = 'available' | 'active' | 'completed';

export interface QuestScrollProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Current quest status */
  questStatus?: QuestStatus;
  /** Size of the scroll */
  size?: 'sm' | 'md' | 'lg';
}

const statusColors: Record<QuestStatus, { primary: string; accent: string; seal: string }> = {
  available: { primary: '#d4a574', accent: '#8b7355', seal: '#c9a86c' },
  active: { primary: '#ffd700', accent: '#daa520', seal: '#ffed4a' },
  completed: { primary: '#4caf50', accent: '#388e3c', seal: '#81c784' },
};

export const QuestScroll = forwardRef<HTMLButtonElement, QuestScrollProps>(
  (
    {
      children,
      questStatus = 'available',
      size = 'md',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const colors = statusColors[questStatus];

    return (
      <button
        ref={ref}
        className={`${styles.questScroll} ${styles[size]} ${styles[questStatus]} ${className || ''}`}
        style={{
          '--scroll-primary': colors.primary,
          '--scroll-accent': colors.accent,
          '--scroll-seal': colors.seal,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <span className={styles.scrollTop} aria-hidden="true" />
        <span className={styles.scrollBody}>
          <span className={styles.content}>{children}</span>
        </span>
        <span className={styles.scrollBottom} aria-hidden="true" />
        <span className={styles.seal} aria-hidden="true">
          <span className={styles.sealInner} />
        </span>
        <span className={styles.waxDrips} aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={styles.drip} style={{ '--drip-delay': `${i * 0.1}s` } as React.CSSProperties} />
          ))}
        </span>
      </button>
    );
  }
);

QuestScroll.displayName = 'QuestScroll';

export default QuestScroll;
