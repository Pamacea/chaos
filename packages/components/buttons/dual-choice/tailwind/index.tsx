'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface DualChoiceProps extends HTMLAttributes<HTMLDivElement> {
  yesLabel?: string;
  noLabel?: string;
  onYes?: () => void;
  onNo?: () => void;
  variant?: 'default' | 'dramatic' | 'minimal' | 'stacked';
  size?: 'sm' | 'md' | 'lg';
  showDivider?: boolean;
  disabled?: boolean;
  selectedValue?: 'yes' | 'no' | null;
}

const sizeClasses: Record<string, string> = {
  sm: 'py-3 px-6 text-base',
  md: 'py-6 px-12 text-2xl',
  lg: 'py-8 px-16 text-3xl',
};

export const DualChoice = forwardRef<HTMLDivElement, DualChoiceProps>(
  ({ yesLabel = 'OUI', noLabel = 'NON', onYes, onNo, variant = 'default', size = 'md', showDivider = true, disabled = false, selectedValue = null, className, ...props }, ref) => {
    const isMinimal = variant === 'minimal';
    const isStacked = variant === 'stacked';
    const isDramatic = variant === 'dramatic';

    const containerClasses = `
      flex font-display
      ${isStacked ? 'flex-col' : ''}
      ${disabled ? 'opacity-50 pointer-events-none' : ''}
      ${className || ''}
    `;

    const baseButtonClasses = `
      flex-1 tracking-[0.15em] uppercase cursor-pointer transition-all relative overflow-hidden
      ${sizeClasses[size]}
      before:content-[''] before:absolute before:top-0 before:-left-full
      before:w-full before:h-full before:transition-[left] before:duration-300 before:-z-10
      hover:before:left-0
    `;

    const yesClasses = `
      ${baseButtonClasses}
      ${isMinimal 
        ? 'border-0 text-stone-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-current after:scale-x-0 after:transition-transform hover:after:scale-x-100 before:hidden' 
        : `border-2 ${isDramatic ? 'border-amber-500 text-amber-500 before:bg-amber-500' : 'border-gray-600 text-stone-200 before:bg-stone-200'}`
      }
      hover:text-black
      ${selectedValue === 'yes' ? 'bg-current text-black' : ''}
    `;

    const noClasses = `
      ${baseButtonClasses}
      ${isMinimal 
        ? 'border-0 text-red-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-current after:scale-x-0 after:transition-transform hover:after:scale-x-100 before:hidden'
        : `border-2 border-red-500 text-red-500 before:bg-red-500 ${isStacked ? 'border-t-0' : 'border-l-0'}`
      }
      hover:text-black
      ${selectedValue === 'no' ? 'bg-red-500 text-black' : ''}
    `;

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <button className={yesClasses} onClick={onYes} disabled={disabled}>
          {yesLabel}
        </button>
        
        {showDivider && !isMinimal && (
          <div className={`
            flex items-center justify-center relative
            ${isStacked ? 'w-full h-0.5' : 'w-0.5'} 
            bg-gray-700
          `}>
            <span className="absolute text-[0.6rem] text-gray-500 bg-black px-1 tracking-widest">OU</span>
          </div>
        )}
        
        <button className={noClasses} onClick={onNo} disabled={disabled}>
          {noLabel}
        </button>
      </div>
    );
  }
);

DualChoice.displayName = 'DualChoice';
export default DualChoice;
