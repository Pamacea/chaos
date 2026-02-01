'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface CyberSliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  showValue?: boolean;
}

const variantStyles = {
  cyan: { fill: 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]', text: 'text-cyan-400' },
  pink: { fill: 'bg-fuchsia-500 shadow-[0_0_10px_#ff00ff]', text: 'text-fuchsia-500' },
  green: { fill: 'bg-emerald-400 shadow-[0_0_10px_#00ff88]', text: 'text-emerald-400' },
  purple: { fill: 'bg-purple-500 shadow-[0_0_10px_#a855f7]', text: 'text-purple-500' },
};

export const CyberSlider = forwardRef<HTMLDivElement, CyberSliderProps>(
  ({ value, onChange, min = 0, max = 100, step = 1, variant = 'cyan', showValue = false, className = '', ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;
    const colors = variantStyles[variant];
    return (
      <div ref={ref} className={`flex items-center gap-3 ${className}`} {...props}>
        <div className="relative flex-1 h-2 bg-white/10 border border-white/20">
          <div className={`absolute top-0 left-0 h-full ${colors.fill}`} style={{ width: `${percentage}%` }} />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className={`absolute top-1/2 w-4 h-4 ${colors.fill} border-2 border-[#0a0a0f] pointer-events-none`}
            style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%) rotate(45deg)' }}
          />
        </div>
        {showValue && <span className={`min-w-[40px] font-['Orbitron',sans-serif] text-sm font-bold ${colors.text} text-right`}>{value}</span>}
      </div>
    );
  }
);

CyberSlider.displayName = 'CyberSlider';
export default CyberSlider;
