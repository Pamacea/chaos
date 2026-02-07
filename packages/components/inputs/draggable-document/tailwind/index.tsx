'use client';

import { forwardRef, useEffect, useRef, useState, HTMLAttributes } from 'react';

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

export const DraggableDocumentTailwind = forwardRef<HTMLDivElement, DraggableDocumentProps>(
  ({ title, reference, classification = 'confidentiel', stamp, content, backContent, initialPosition = { x: 100, y: 100 }, bounds = 'window', onDragStart, onDragEnd, className = '', ...props }, ref) => {
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

    const classificationColors: Record<string, string> = { public: 'bg-zinc-700', confidentiel: 'bg-yellow-500', secret: 'bg-red-600', 'top-secret': 'bg-red-900' };

    return (
      <div ref={ref} className={`fixed w-[300px] min-h-[200px] bg-[#f5f0e8] border border-[#d4d0c8] shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing select-none ${isDragging ? 'shadow-xl rotate-1 z-[100]' : 'z-10'} ${isFlipped ? 'rotate-y-180' : ''} transition-transform ${className}`} style={{ left: position.x, top: position.y }} onMouseDown={handleMouseDown} onDoubleClick={() => backContent && setIsFlipped(!isFlipped)} {...props}>
        <div className={`absolute -top-[25px] left-0 right-0 h-[30px] flex justify-between items-center px-4 rounded-t ${classificationColors[classification]}`}>
          <span className="text-[0.6rem] font-bold tracking-wider">{classification.toUpperCase()}</span>
          <span className="text-[0.55rem] opacity-70">{reference}</span>
        </div>
        <div className="p-5 relative">
          {!isFlipped ? (
            <>
              <h3 className="font-mono text-sm font-bold mb-4 text-[#1a1816]">{title}</h3>
              {content}
              {stamp && <div className="absolute bottom-5 right-5 font-mono text-xs font-bold text-red-600 border-2 border-red-600 px-2 py-1 -rotate-6 opacity-70">{stamp}</div>}
              <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(139,90,43,0.3)_0%,transparent_70%)] pointer-events-none" />
            </>
          ) : (
            <div className="min-h-[160px] rotate-y-180">{backContent}</div>
          )}
        </div>
      </div>
    );
  }
);
DraggableDocumentTailwind.displayName = 'DraggableDocumentTailwind';
