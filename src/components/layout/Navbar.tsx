import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SlidersHorizontal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, openEditor } = usePortfolio();

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#050505]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-4 lg:px-12">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-zinc-100 whitespace-nowrap shrink-0 hover:text-[#F2B705] transition-colors"
        >
          {data.bio.brandName}
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a
            href="#projetos"
            className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Projetos
          </a>
          <a
            href="#especialidades"
            className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Especialidades
          </a>
          <a
            href="#biografia"
            className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Biografia
          </a>
          <a
            href="#contato"
            className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Contato
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => openEditor('bio')}
            className="inline-flex items-center gap-2 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#fbbf24] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Painel do Portfólio
          </button>
        </div>
      </div>
    </header>
  );
};
