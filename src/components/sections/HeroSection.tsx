import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ResilientImage } from '../ui/ResilientImage';
import { ArrowUpRight, Pencil } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, openEditor } = usePortfolio();
  const { bio, metrics } = data;

  return (
    <section id="top" className="relative z-10 mx-auto max-w-[1440px] px-6 pt-12 pb-16 lg:px-12 lg:pt-20 lg:pb-24">
      {/* Split-Screen Hero */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
        {/* Left Column: Typographic Hierarchy */}
        <div className="flex flex-col justify-between lg:col-span-7 lg:pr-6">
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-medium tracking-wide text-zinc-400">
                {bio.kicker} <span aria-hidden="true" className="mx-1.5 text-zinc-600">·</span>{' '}
                <span className="text-[#F2B705]">{bio.availabilityText}</span>
              </p>

              <button
                type="button"
                onClick={() => openEditor('bio')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-[#F2B705] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Pencil className="h-3 w-3" />
                Editar Bio & Capa
              </button>
            </div>

            <h1
              className="font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              {bio.headline}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              {bio.leadParagraph}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-white transition-colors whitespace-nowrap shrink-0"
            >
              Explorar Acervo de Projetos
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => openEditor('projects')}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/70 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:border-zinc-700 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Gerenciar Projetos ({data.projects.length})
            </button>
          </div>
        </div>

        {/* Right Column: Large Visual Container at Matching Height */}
        <div className="lg:col-span-5">
          <div className="group relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900">
            <ResilientImage
              src={bio.heroImageUrl}
              alt={`${bio.fullName} — ${bio.roleTitle}`}
              fallbackTitle={bio.fullName}
              fallbackCategory={bio.brandName}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="font-serif italic text-lg text-zinc-100">{bio.fullName}</p>
                <p className="text-xs text-zinc-300 mt-0.5">{bio.roleTitle}</p>
              </div>
              <span className="font-mono text-xs text-zinc-400 tabular-nums shrink-0">
                {bio.location.split('·')[0].trim()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Quantitative Proof Strip Below the Split */}
      <div className="mt-14 border-t border-b border-zinc-800/80 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="flex flex-col justify-between">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-3xl font-semibold tracking-tight text-zinc-100 tabular-nums">
                  {metric.value}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-zinc-200">{metric.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{metric.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
