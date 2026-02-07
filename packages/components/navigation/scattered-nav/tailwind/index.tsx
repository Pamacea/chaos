'use client';

import { useEffect, useRef, useState } from 'react';

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface ScatteredNavProps {
  /** Navigation items to display */
  items: NavItem[];
  /** Chaos level affects dispersion range */
  chaosLevel?: 'low' | 'medium' | 'high';
  /** Shape of nav items */
  shape?: 'rect' | 'circle' | 'dot';
  /** Nav variant */
  variant?: 'scattered' | 'vertical-dots';
  /** Flash effect on click/active */
  flashOnActive?: boolean;
  /** Show labels on hover */
  showLabels?: boolean;
  /** Additional className */
  className?: string;
}

// Seeded random for deterministic positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate position based on index and chaos level
function generatePosition(index: number, chaosLevel: 'low' | 'medium' | 'high', total: number) {
  const seed = index * 123.45;
  const rng = () => seededRandom(seed + index);

  const chaosRanges = {
    low: { pos: 10, rot: 3 },
    medium: { pos: 20, rot: 8 },
    high: { pos: 35, rot: 15 },
  };

  const range = chaosRanges[chaosLevel];

  // Position: distribute items around screen edges
  const side = Math.floor(rng() * 4); // 0: top, 1: right, 2: bottom, 3: left
  let top, left;

  const edgeMargin = 40 + rng() * range.pos;
  const spread = rng() * 100;

  switch (side) {
    case 0: // top
      top = edgeMargin;
      left = 10 + spread + '%';
      break;
    case 1: // right
      top = 10 + spread + '%';
      left = `calc(100% - ${edgeMargin}px)`;
      break;
    case 2: // bottom
      top = `calc(100% - ${edgeMargin}px)`;
      left = 10 + spread + '%';
      break;
    case 3: // left
      top = 10 + spread + '%';
      left = edgeMargin;
      break;
  }

  // Rotation
  const rotation = (rng() - 0.5) * 2 * range.rot;

  return { top, left, rotation, side };
}

export function ScatteredNav({
  items,
  chaosLevel = 'medium',
  shape = 'rect',
  variant = 'scattered',
  flashOnActive = true,
  showLabels = true,
  className = '',
}: ScatteredNavProps) {
  const [flashActive, setFlashActive] = useState(false);
  const [positions, setPositions] = useState<Array<{ top: string | number; left: string | number; rotation: number; side: number }>>([]);
  const navRef = useRef<HTMLElement>(null);

  // Generate positions on mount
  useEffect(() => {
    setPositions(items.map((_, i) => generatePosition(i, chaosLevel, items.length)));
  }, [items.length, chaosLevel]);

  const handleClick = (href: string) => {
    if (flashOnActive) {
      setFlashActive(true);
      setTimeout(() => setFlashActive(false), 150);
    }
  };

  if (variant === 'vertical-dots') {
    return (
      <nav ref={navRef} className={`fixed right-8 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-5 ${className}`} aria-label="Navigation">
        {flashActive && <div className="fixed inset-0 bg-white pointer-events-none z-[9999] animate-flash" aria-hidden="true" />}
        <style>{`
          @keyframes flash {
            0% { opacity: 0.4; }
            100% { opacity: 0; }
          }
          .animate-flash {
            animation: flash 0.15s ease-out;
          }
        `}</style>
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`w-3.5 h-3.5 border-2 border-white/30 rounded-full cursor-pointer transition-all duration-300 relative flex items-center justify-center hover:scale-110 ${item.isActive ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_20px_#22d3ee]' : ''}`}
            data-label={showLabels ? item.label : undefined}
            onClick={() => handleClick(item.href)}
          >
            {showLabels && (
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap text-gray-300 font-mono">
                {item.label}
              </span>
            )}
          </a>
        ))}
      </nav>
    );
  }

  const shapeClasses = {
    rect: 'px-4 py-2 min-w-[80px] min-h-[32px]',
    circle: 'w-12 h-12 rounded-full p-0',
    dot: 'w-3.5 h-3.5 border-2 border-white/30 rounded-full p-0 bg-transparent hover:w-5 hover:h-5 hover:border-[3px]',
  }[shape];

  return (
    <nav ref={navRef} className={`fixed inset-0 pointer-events-none z-[1000] ${className}`} aria-label="Navigation">
      {flashActive && <div className="fixed inset-0 bg-white pointer-events-none z-[9999] animate-flash" aria-hidden="true" />}
      <style>{`
        @keyframes flash {
          0% { opacity: 0.4; }
          100% { opacity: 0; }
        }
        @keyframes fadeInPlace {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          100% { opacity: 1; }
        }
        .animate-flash {
          animation: flash 0.15s ease-out;
        }
        .nav-item-enter {
          animation: fadeInPlace 0.5s ease-out backwards;
        }
      `}</style>

      {items.map((item, index) => {
        const pos = positions[index] || { top: '50%', left: '50%', rotation: 0, side: 0 };
        const isActiveColor = `hsl(${(index * 60) % 360}, 80%, 60%)`;
        return (
          <a
            key={index}
            href={item.href}
            className={`absolute pointer-events-auto flex items-center justify-center text-[0.7rem] font-mono uppercase tracking-widest text-gray-300 no-underline bg-zinc-900/90 border border-current transition-all duration-200 cursor-pointer hover:bg-yellow-400 hover:text-zinc-900 hover:shadow-[4px_4px_0_#ef4444] hover:z-[100] nav-item-enter ${shapeClasses} ${item.isActive ? 'bg-yellow-400 text-zinc-900 shadow-[0_0_20px_#facc15]' : ''} ${shape === 'dot' ? (item.isActive ? 'bg-yellow-400 border-yellow-400 shadow-[0_0_20px_#facc15]' : '') : ''}`}
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotation}deg)`,
              animationDelay: `${index * 0.1}s`,
            }}
            data-side={pos.side}
            data-index={index}
            onClick={() => handleClick(item.href)}
          >
            {showLabels && (
              <span className={`opacity-70 transition-opacity ${shape === 'dot' ? 'absolute right-8 top-1/2 -translate-y-1/2 text-[10px] whitespace-nowrap opacity-0 hover:opacity-100 font-mono' : ''}`}>
                {item.label}
              </span>
            )}
          </a>
        );
      })}
    </nav>
  );
}

ScatteredNav.displayName = 'ScatteredNav';

export default ScatteredNav;
