'use client';

import { forwardRef, useEffect, useRef, useState, HTMLAttributes } from 'react';
import styles from './draggable-document.module.css';

export interface DraggableDocumentProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  reference?: string;
  classification?: 'public' | 'confidentiel' | 'secret' | 'top-secret';
  stamp?: string;
  content: React.ReactNode;
  backContent?: React.ReactNode;
  initialPosition?: { x: number; y: number };
  bounds?: 'parent' | 'window';
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const DraggableDocument = forwardRef<HTMLDivElement, DraggableDocumentProps>(
  ({ title, reference, classification = 'confidentiel', stamp, content, backContent, initialPosition = { x: 100, y: 100 }, bounds = 'window', onDragStart, onDragEnd, className, ...props }, ref) => {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
      if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) return;
      setIsDragging(true);
      setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
      onDragStart?.();
    };

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;
        if (bounds === 'window') {
          newX = Math.max(0, Math.min(newX, window.innerWidth - 300));
          newY = Math.max(0, Math.min(newY, window.innerHeight - 200));
        }
        setPosition({ x: newX, y: newY });
      };
      const handleMouseUp = () => { setIsDragging(false); onDragEnd?.(); };
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDragging, offset, bounds, onDragEnd]);

    const classificationColors = { public: '#4a4a4a', confidentiel: '#e8c72e', secret: '#c23a22', 'top-secret': '#8b0000' };

    return (
      <div ref={ref} className={`${styles.document} ${isDragging ? styles.dragging : ''} ${isFlipped ? styles.flipped : ''} ${className || ''}`} style={{ left: position.x, top: position.y }} onMouseDown={handleMouseDown} onDoubleClick={() => backContent && setIsFlipped(!isFlipped)} {...props}>
        <div className={styles.folderTab} style={{ background: classificationColors[classification as keyof typeof classificationColors] }}>
          <span className={styles.classification}>{classification.toUpperCase()}</span>
          <span className={styles.ref}>{reference}</span>
        </div>
        <div className={styles.documentContent}>
          {!isFlipped ? (
            <>
              <h3 className={styles.docTitle}>{title}</h3>
              {content}
              {stamp && <div className={styles.stamp}>{stamp}</div>}
              <div className={styles.coffeeStain} />
            </>
          ) : (
            <div className={styles.backContent}>{backContent}</div>
          )}
        </div>
      </div>
    );
  }
);
DraggableDocument.displayName = 'DraggableDocument';
export default DraggableDocument;
