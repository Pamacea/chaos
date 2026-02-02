'use client';

import { forwardRef, HTMLAttributes } from 'react';

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

const cornerClasses = {
  rounded: 'rounded-lg',
  sharp: 'rounded-none',
  ragged: 'rounded-sm',
};

const intensityShadows = {
  light: 'shadow-sm',
  medium: 'shadow-md',
  heavy: 'shadow-xl',
};

const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)' opacity='0.1'/></svg>`;

const burnSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='burn'><feTurbulence type='fractalNoise' baseFrequency='0.1' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23burn)' opacity='0.2'/></svg>`;

const fraySvg = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='fray'><feTurbulence type='fractalNoise' baseFrequency='0.2' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23fray)' opacity='0.05'/></svg>`;

const deckleSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='deckle'><feTurbulence type='turbulence' baseFrequency='0.05' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23deckle)' opacity='0.1'/></svg>`;

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
    // Base classes
    const baseClasses = `relative p-6 ${cornerClasses[corners]} ${intensityShadows[intensity]}`;

    // Style-specific additions
    const styleAdditions: Record<string, string> = {
      aged: '',
      torn: '',
      burnt: '',
      ink: '',
      frayed: '',
    };

    // Build inline styles
    const getInlineStyle = (): React.CSSProperties => {
      const baseStyle: React.CSSProperties = { backgroundColor };

      switch (edgeStyle) {
        case 'aged':
          baseStyle.background = `linear-gradient(135deg, rgba(0,0,0,0.05) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.1) 100%), ${backgroundColor}`;
          break;
        case 'burnt':
          baseStyle.background = `linear-gradient(135deg, rgba(139,0,0,0.15) 0%, transparent 15%, transparent 85%, rgba(139,0,0,0.2) 100%), ${backgroundColor}`;
          break;
        case 'torn':
          baseStyle.clipPath = 'polygon(0% 2%, 3% 0%, 5% 3%, 7% 1%, 9% 4%, 11% 0%, 100% 0%, 100% 98%, 97% 100%, 95% 97%, 93% 99%, 91% 96%, 89% 100%, 0% 100%)';
          break;
        case 'frayed':
          baseStyle.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(fraySvg)}")`;
          break;
        case 'deckle':
          baseStyle.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(deckleSvg)}")`;
          break;
      }

      return baseStyle;
    };

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${styleAdditions[edgeStyle]} ${deckle ? 'deckle-style' : ''} ${className || ''}`}
        style={getInlineStyle()}
        {...props}
      >
        {children}

        {/* Texture overlays */}
        {edgeStyle === 'aged' && (
          <>
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`,
                borderRadius: 'inherit',
              }}
            />
            <div
              className="absolute inset-1 pointer-events-none"
              style={{
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 'inherit',
              }}
            />
          </>
        )}

        {edgeStyle === 'burnt' && (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(burnSvg)}")`,
                borderRadius: 'inherit',
              }}
            />
            <div
              className="absolute inset-0.5 pointer-events-none"
              style={{
                border: '2px solid rgba(139,0,0,0.1)',
                borderRadius: 'inherit',
              }}
            />
          </>
        )}

        {edgeStyle === 'ink' && (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 0% 0%, rgba(0,0,0,0.1) 0%, transparent 30%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 100% 100%, rgba(0,0,0,0.1) 0%, transparent 30%)',
              }}
            />
          </>
        )}

        {edgeStyle === 'frayed' && (
          <div
            className="absolute inset-0 pointer-events-none border border-dashed border-black/10"
            style={{ borderRadius: 'inherit' }}
          />
        )}

        {deckle && (
          <div
            className="absolute inset-0.5 pointer-events-none"
            style={{
              border: '2px solid rgba(0,0,0,0.08)',
              borderRadius: 'inherit',
              background: `url("data:image/svg+xml,${encodeURIComponent(deckleSvg)}")`,
            }}
          />
        )}
      </div>
    );
  }
);

PaperEdges.displayName = 'PaperEdges';

export default PaperEdges;
