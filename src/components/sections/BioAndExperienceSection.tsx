import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Pencil, Sparkles } from 'lucide-react';

export const BioAndExperienceSection: React.FC = () => {
  const { data, openEditor } = usePortfolio();
  const { bio, services, experiences } = data;

  return (
    <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
      {/* Services / Capabilities Section */}
      <section id="especialidades" className="border-t border-zinc-800/80 py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-mono text-zinc-500">02. Disciplinas & Arquitetura</p>
            <h2
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Frentes de Atuação Institucional
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400">
            Atuamos em parceria direta com fundadores, diretores de produto e líderes de engenharia.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-8"
            >
              <div>
                <span className="font-mono text-sm font-medium text-[#F2B705] tabular-nums">
                  {srv.index}
                </span>
                <h3
                  className="mt-3 font-display text-xl font-semibold text-zinc-100"
                  style={{ textWrap: 'balance' }}
                >
                  {srv.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{srv.description}</p>
              </div>

              <div className="mt-8 border-t border-zinc-900 pt-5">
                <p className="text-xs font-mono text-zinc-500 mb-3">Entregáveis Principais</p>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {srv.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-[#F2B705]">
                        /
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Biography & Trajectory Section */}
      <section id="biografia" className="border-t border-zinc-800/80 py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left Column: Narrative Bio & Editorial Monograph Quote */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-mono text-zinc-500">03. Perfil & Direção</p>
                <button
                  type="button"
                  onClick={() => openEditor('bio')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-[#F2B705] transition-colors cursor-pointer"
                >
                  <Pencil className="h-3 w-3" />
                  Editar Biografia
                </button>
              </div>

              <h2
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Sobre {bio.fullName}
              </h2>

              <p className="mt-6 text-sm leading-relaxed text-zinc-300 sm:text-base">
                {bio.ExtendedBio}
              </p>

              <blockquote className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-6">
                <p className="font-serif italic text-lg leading-relaxed text-zinc-100">
                  &ldquo;{bio.philosophyQuote}&rdquo;
                </p>
                <footer className="mt-3 text-xs text-zinc-400">
                  {bio.fullName} · {bio.brandName}
                </footer>
              </blockquote>
            </div>

            <div className="mt-10 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-zinc-200">Atmosfera Interativa do Cursor</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    A nuvem cromática acompanha o mouse com física suave. Você pode calibrar o raio e intensidade.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openEditor('cursor')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-200 hover:border-[#F2B705] hover:text-[#F2B705] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Ajustar Nuvem
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Timeline */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <h3 className="font-display text-lg font-semibold text-zinc-100">
                Histórico de Liderança & Trajetória
              </h3>
              <button
                type="button"
                onClick={() => openEditor('experience')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-[#F2B705] transition-colors cursor-pointer"
              >
                <Pencil className="h-3 w-3" />
                Gerenciar Trajetória
              </button>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {experiences.map((exp) => (
                <div key={exp.id} className="py-7 first:pt-6 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-lg font-semibold text-zinc-100">
                      {exp.role}{' '}
                      <span className="font-normal text-zinc-400">· {exp.company}</span>
                    </h4>
                    <span className="font-mono text-xs text-zinc-400 tabular-nums">
                      {exp.period} · {exp.location}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{exp.description}</p>
                  <p className="mt-2 text-xs font-mono text-[#F2B705]">{exp.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
