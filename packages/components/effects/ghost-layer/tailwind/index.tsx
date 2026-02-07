'use client';

import { HTMLAttributes } from 'react';

export interface GhostItem { id: string; text: string; position?: { x: number; y: number }; }
export interface GhostLayerProps extends HTMLAttributes<HTMLDivElement> { ghosts: GhostItem[]; baseOpacity?: number; revealOpacity?: number; revealDistance?: number; showScanLine?: boolean; }

export const GhostLayerTailwind = ({ ghosts, baseOpacity = 0.03, revealOpacity = 0.15, revealDistance = 150, showScanLine = true, className = '', ...props }: GhostLayerProps) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [revealedGhosts, setRevealedGhosts] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const newRevealed = new Set<string>();
      ghosts.forEach(ghost => {
        const pos = ghost.position || { x: 100, y: 100 };
        const distance = Math.sqrt(Math.pow(e.clientX - pos.x, 2) + Math.pow(e.clientY - pos.y, 2));
        if (distance < revealDistance) newRevealed.add(ghost.id);
      });
      setRevealedGhosts(newRevealed);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [ghosts, revealDistance]);

  return (
    <div className={`relative w-full h-full pointer-events-none ${className}`} {...props}>
      {ghosts.map(ghost => (
        <div key={ghost.id} className="fixed font-mono text-xl leading-relaxed transition-opacity duration-300 whitespace-pre-wrap max-w-[calc(100%-160px)]" style={{ 
          left: (ghost.position?.x ?? 100) + 'px', top: (ghost.position?.y ?? 100) + 'px',
          opacity: revealedGhosts.has(ghost.id) ? revealOpacity : baseOpacity, color: '#e8e8e8' 
        }}>
          {ghost.text}
        </div>
      ))}
      {showScanLine && <div className="fixed left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none z-[100]" style={{ top: mousePos.y + 'px' }} />}
    </div>
  );
};
