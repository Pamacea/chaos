'use client';

import { forwardRef, useState, useRef, useEffect, HTMLAttributes } from 'react';
import styles from './stack-cards.module.css';

export interface CardData {
  content: React.ReactNode;
  image?: string;
  title?: string;
}

export interface StackCardsProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of card data */
  cards: CardData[];
  /** Vertical offset between stacked cards in pixels */
  cardOffset?: number;
  /** Rotation angle for stacked cards in degrees */
  cardRotation?: number;
  /** Number of visible cards in stack */
  stackSize?: number;
  /** Callback when card is swiped */
  onSwipe?: (direction: 'left' | 'right', card: CardData) => void;
  /** Callback when card is clicked */
  onCardClick?: (card: CardData) => void;
}

export const StackCards = forwardRef<HTMLDivElement, StackCardsProps>(
  (
    {
      cards,
      cardOffset = 20,
      cardRotation = 2,
      stackSize = 3,
      onSwipe,
      onCardClick,
      className,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragState, setDragState] = useState({
      isDragging: false,
      startX: 0,
      currentX: 0,
      rotation: 0,
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const visibleCards = cards.slice(currentIndex, currentIndex + stackSize);
    const topCard = visibleCards[0];

    useEffect(() => {
      if (currentIndex >= cards.length) {
        setCurrentIndex(0);
      }
    }, [currentIndex, cards.length]);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      setDragState({
        isDragging: true,
        startX: e.clientX,
        currentX: e.clientX,
        rotation: 0,
      });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      setDragState({
        isDragging: true,
        startX: e.touches[0].clientX,
        currentX: e.touches[0].clientX,
        rotation: 0,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.isDragging) return;
      const deltaX = e.clientX - dragState.startX;
      const rotation = deltaX * 0.05;
      setDragState(prev => ({ ...prev, currentX: e.clientX, rotation }));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragState.isDragging) return;
      const deltaX = e.touches[0].clientX - dragState.startX;
      const rotation = deltaX * 0.05;
      setDragState(prev => ({ ...prev, currentX: e.touches[0].clientX, rotation }));
    };

    const handleMouseUp = () => {
      if (!dragState.isDragging) return;
      const deltaX = dragState.currentX - dragState.startX;
      const threshold = 100;

      if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 'right' : 'left';
        handleSwipe(direction);
      }

      setDragState({
        isDragging: false,
        startX: 0,
        currentX: 0,
        rotation: 0,
      });
    };

    const handleSwipe = (direction: 'left' | 'right') => {
      if (topCard) {
        onSwipe?.(direction, topCard);
      }
      setCurrentIndex(prev => Math.min(prev + 1, cards.length));
    };

    useEffect(() => {
      if (dragState.isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleMouseUp);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleMouseUp);
        };
      }
    }, [dragState.isDragging, dragState.startX]);

    const getCardStyle = (index: number) => {
      const isTop = index === 0;
      const offset = isTop ? 0 : index * cardOffset;
      const rotation = isTop ? dragState.rotation : index * cardRotation;
      const dragX = isTop ? dragState.currentX - dragState.startX : 0;

      return {
        transform: `translateY(${offset}px) translateX(${dragX}px) rotate(${rotation}deg)`,
        zIndex: stackSize - index,
        opacity: isTop ? 1 : 1 - index * 0.15,
      };
    };

    const getCardClassName = (index: number) => {
      const isTop = index === 0;
      return `${styles.card} ${isTop ? styles.topCard : styles.stackedCard} ${dragState.isDragging && isTop ? styles.dragging : ''}`;
    };

    if (cards.length === 0) {
      return (
        <div ref={ref} className={`${styles.container} ${styles.empty} ${className || ''}`} {...props}>
          <p className={styles.emptyText}>No cards to display</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={`${styles.container} ${className || ''}`} {...props}>
        <div
          ref={containerRef}
          className={styles.stackContainer}
        >
          {visibleCards.map((card, index) => (
            <div
              key={`${currentIndex}-${index}`}
              ref={el => cardRefs.current[index] = el}
              className={getCardClassName(index)}
              style={getCardStyle(index)}
              onMouseDown={index === 0 ? handleMouseDown : undefined}
              onTouchStart={index === 0 ? handleTouchStart : undefined}
              onClick={() => index === 0 && !dragState.isDragging && onCardClick?.(card)}
            >
              {card.image && (
                <div className={styles.cardImage}>
                  <img src={card.image} alt={card.title || 'Card image'} />
                  <div className={styles.imageOverlay} />
                </div>
              )}
              <div className={styles.cardContent}>
                {card.title && <h3 className={styles.cardTitle}>{card.title}</h3>}
                <div className={styles.cardBody}>{card.content}</div>
              </div>
              {index === 0 && (
                <div className={styles.swipeHints}>
                  <span className={styles.swipeHint}>Swipe left</span>
                  <span className={styles.swipeHint}>Swipe right</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {cards.length > 1 && (
          <div className={styles.progressDots}>
            {cards.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ''} ${i < currentIndex ? styles.pastDot : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

StackCards.displayName = 'StackCards';

export default StackCards;
