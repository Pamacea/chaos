'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface PricingTier {
  name: string;
  price: number | string;
  currency?: string;
  period?: string;
  features: string[];
  featured?: boolean;
  featuredLabel?: string;
  buttonText?: string;
  onSelect?: () => void;
}

export interface TowerPricingProps extends HTMLAttributes<HTMLDivElement> {
  tiers: PricingTier[];
  variant?: 'gold' | 'blood' | 'cyan' | 'bone';
  showConnectors?: boolean;
}

const variantStyles = {
  gold: { accent: 'text-amber-600', border: 'border-amber-600', bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-600/5' },
  blood: { accent: 'text-red-800', border: 'border-red-800', bg: 'bg-red-800', hoverBg: 'hover:bg-red-800/5' },
  cyan: { accent: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-400', hoverBg: 'hover:bg-cyan-400/5' },
  bone: { accent: 'text-stone-400', border: 'border-stone-400', bg: 'bg-stone-400', hoverBg: 'hover:bg-stone-400/5' },
};

export const TowerPricing = forwardRef<HTMLDivElement, TowerPricingProps>(
  ({ tiers, variant = 'gold', showConnectors = false, className = '', ...props }, ref) => {
    const colors = variantStyles[variant];

    return (
      <div ref={ref} className={`flex flex-col max-w-[400px] ${className}`} {...props}>
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={`
              relative p-8 bg-black/60 border border-white/10 transition-all duration-300
              ${index === 0 ? 'rounded-t border-t' : 'border-t-0'}
              ${index === tiers.length - 1 ? 'rounded-b' : ''}
              ${tier.featured 
                ? `${colors.border} bg-amber-600/10 scale-[1.02] z-10` 
                : `${colors.hoverBg} hover:${colors.border} hover:z-[1]`
              }
            `}
          >
            {tier.featured && (
              <>
                <div className={`absolute -top-px left-[-1px] right-[-1px] h-[3px] ${colors.bg}`} />
                {tier.featuredLabel && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 ${colors.bg} text-black text-[0.65rem] font-bold uppercase tracking-wider`}>
                    {tier.featuredLabel}
                  </span>
                )}
              </>
            )}

            <div className="flex justify-between items-baseline mb-4 pb-4 border-b border-white/10">
              <span className={`font-['Cinzel',serif] text-xl font-bold ${colors.accent} tracking-wider`}>
                {tier.name}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-white/50">{tier.currency || '$'}</span>
                <span className="text-3xl font-bold text-white">{tier.price}</span>
                {tier.period && <span className="text-xs text-white/40">/{tier.period}</span>}
              </div>
            </div>

            <ul className="my-4 space-y-2">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <span className={`text-xs ${colors.accent}`}>✦</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                onClick={tier.onSelect}
                className={`
                  w-full py-3.5 px-6 border font-semibold text-xs uppercase tracking-[0.15em] transition-all duration-300
                  ${tier.featured 
                    ? `${colors.bg} ${colors.border} text-black hover:bg-transparent hover:${colors.accent}`
                    : `bg-transparent ${colors.border} ${colors.accent} hover:${colors.bg} hover:text-black`
                  }
                `}
              >
                {tier.buttonText || 'Select'}
              </button>
            </div>

            {showConnectors && index < tiers.length - 1 && (
              <span className={`absolute left-1/2 -bottom-px -translate-x-1/2 w-px h-5 ${colors.bg} opacity-30`} />
            )}
          </div>
        ))}
      </div>
    );
  }
);

TowerPricing.displayName = 'TowerPricing';
export default TowerPricing;
