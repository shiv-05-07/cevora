import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CevoraLogoProps {
  iconOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function CevoraLogo({ iconOnly = false, size = 'medium', className }: CevoraLogoProps) {
  const sizeMap = {
    small: {
      icon: 24,
      text: 'text-lg',
      gap: 'gap-2'
    },
    medium: {
      icon: 32,
      text: 'text-xl',
      gap: 'gap-3'
    },
    large: {
      icon: 48,
      text: 'text-3xl',
      gap: 'gap-4'
    }
  };

  const config = sizeMap[size];

  return (
    <div className={cn('flex items-center select-none', config.gap, className)}>
      <div className="relative shrink-0 flex items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-[1.02]">
        {/* Light Mode Logo */}
        <Image
          src="/logo-light.jpg"
          alt="Cevora"
          width={config.icon}
          height={config.icon}
          className="dark:hidden object-cover"
          priority
        />
        {/* Dark Mode Logo */}
        <Image
          src="/logo-dark.jpg"
          alt="Cevora"
          width={config.icon}
          height={config.icon}
          className="hidden dark:block object-cover"
          priority
        />
      </div>

      {!iconOnly && (
        <span className={cn('font-bold tracking-tight text-foreground', config.text)}>
          Cevora
        </span>
      )}
    </div>
  );
}
