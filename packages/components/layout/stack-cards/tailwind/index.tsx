'use client';

import { forwardRef, useState, useRef, useEffect, HTMLAttributes } from 'react';

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

export const StackCardsTailwind = forwardRef<HTMLDivElement, StackCardsProps>(
  (
    {
      cards,
      cardOffset = 20,
      cardRotation = 2,
      stackSize = 3,
      onSwipe,
      onCardClick,
      className = '',
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
      } as React.CSSProperties;
    };

    const getCardClassName = (index: number) => {
      const isTop = index === 0;
      return `absolute inset-0 bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden cursor-grab transition-all duration-300 shadow-xl ${isTop ? 'z-10 hover:shadow-2xl' : 'pointer-events-none bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-lg'}`;
    };

    if (cards.length === 0) {
      return (
        <div ref={ref} className={`relative w-full min-h-[400px] flex flex-col items-center justify-center ${className}`} {...props}>
          <p className="text-zinc-500">No cards to display</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={`relative w-full flex flex-col items-center justify-center ${className}`} {...props}>
        <div ref={containerRef} className="relative w-full max-w-[380px] h-[520px]">
          {visibleCards.map((card, index) => (
            <div
              key={`${currentIndex}-${index}`}
              ref={el => cardRefs.current[index] = el}
              className={`${getCardClassName(index)} ${dragState.isDragging && index === 0 ? '!cursor-grabbing !transition-none' : ''}`}
              style={getCardStyle(index)}
              onMouseDown={index === 0 ? handleMouseDown : undefined}
              onTouchStart={index === 0 ? handleTouchStart : undefined}
              onClick={() => index === 0 && !dragState.isDragging && onCardClick?.(card)}
            >
              {card.image && (
                <div className="relative w-full h-[280px] overflow-hidden">
                  <img src={card.image} alt={card.title || 'Card image'} className="w-full h-full object-cover transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                </div>
              )}
              <div className="p-6 text-zinc-200">
                {card.title && <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{card.title}</h3>}
                <div className="text-sm leading-relaxed text-zinc-400">{card.content}</div>
              </div>
              {index === 0 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-red-400">Swipe left</span>
                  <span className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-blue-400">Swipe right</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {cards.length > 1 && (
          <div className="flex gap-2 mt-8">
            {cards.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-zinc-500' : 'w-2 bg-zinc-800'} ${i < currentIndex ? '!bg-red-500/50' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

StackCardsTailwind.displayName = 'StackCardsTailwind';
