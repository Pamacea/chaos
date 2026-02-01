'use client';

import { forwardRef, ImgHTMLAttributes } from 'react';

export interface CyberAvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'cyan' | 'pink' | 'green' | 'purple';
  status?: 'online' | 'offline' | 'busy' | 'away';
  glowing?: boolean;
}

const sizeStyles = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16', xl: 'w-24 h-24' };
const variantStyles = {
  cyan: 'border-cyan-400 shadow-[0_0_10px_#00f0ff]',
  pink: 'border-fuchsia-500 shadow-[0_0_10px_#ff00ff]',
  green: 'border-emerald-400 shadow-[0_0_10px_#00ff88]',
  purple: 'border-purple-500 shadow-[0_0_10px_#a855f7]',
};
const statusStyles = {
  online: 'bg-emerald-400 shadow-[0_0_6px_#00ff88]',
  offline: 'bg-gray-500',
  busy: 'bg-rose-500 shadow-[0_0_6px_#ff0040]',
  away: 'bg-amber-500 shadow-[0_0_6px_#ffaa00]',
};

export const CyberAvatar = forwardRef<HTMLDivElement, CyberAvatarProps>(
  ({ src, alt = 'Avatar', size = 'md', variant = 'cyan', status, glowing = false, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`relative ${sizeStyles[size]} ${className}`}>
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover rounded-full border-2 ${variantStyles[variant]} ${glowing ? 'animate-pulse' : ''}`}
          {...props}
        />
        {status && (
          <span className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-[#0a0a0f] ${statusStyles[status]}`} />
        )}
      </div>
    );
  }
);

CyberAvatar.displayName = 'CyberAvatar';
export default CyberAvatar;
