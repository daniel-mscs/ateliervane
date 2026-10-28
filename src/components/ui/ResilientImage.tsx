import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle?: string;
  fallbackCategory?: string;
  className?: string;
}

/**
 * Componente de imagem com fallback resiliente (Zero-Broken-Image Policy).
 * Garante que mesmo se o usuário inserir uma URL externa inválida no painel de edição,
 * o layout mantenha estética editorial impecável.
 */
export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  fallbackCategory,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 text-center border border-zinc-800/80 ${className}`}
      >
        <Layers className="h-8 w-8 text-[#F2B705]/80 mb-3 stroke-[1.5]" />
        {fallbackCategory && (
          <span className="text-xs font-mono text-zinc-500 mb-1">{fallbackCategory}</span>
        )}
        <span className="font-display text-sm font-medium text-zinc-300 max-w-xs balance">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
