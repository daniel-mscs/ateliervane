import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectCategory, ProjectItem } from '../../types/portfolio';
import { ResilientImage } from '../ui/ResilientImage';
import { ArrowUpRight, Plus, Pencil, Eye } from 'lucide-react';

interface ProjectsBentoSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES: Array<'Todos' | ProjectCategory> = [
  'Todos',
  'Sistemas & Produto',
  'Arquitetura Digital',
  'Hardware & Áudio',
  'Editorial & Tipografia',
];

export const ProjectsBentoSection: React.FC<ProjectsBentoSectionProps> = ({ onSelectProject }) => {
  const { data, openEditor } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | ProjectCategory>('Todos');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Todos') return data.projects;
    return data.projects.filter((p) => p.category === selectedCategory);
  }, [data.projects, selectedCategory]);

  return (
    <section id="projetos" className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-zinc-800/80 pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-mono text-zinc-500">01. Acervo Curado & Estudos de Caso</p>
          <h2
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Obras Selecionadas e Engenharia de Produto
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Interactive Filter Tabs (Functional Segmented Buttons) */}
          <div className="flex flex-wrap items-center gap-1 rounded-lg bg-zinc-900/90 p-1 border border-zinc-800/80">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => openEditor('projects', 'NEW')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-3.5 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#fbbf24] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Novo Projeto
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      {filteredProjects.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-12 text-center">
          <p className="font-display text-lg font-medium text-zinc-200">
            Nenhum projeto encontrado na categoria &ldquo;{selectedCategory}&rdquo;.
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Altere o filtro acima ou adicione um novo estudo de caso através do painel de edição.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedCategory('Todos')}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              Mostrar Todos os Projetos
            </button>
            <button
              type="button"
              onClick={() => openEditor('projects', 'NEW')}
              className="rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#fbbf24] transition-colors cursor-pointer"
            >
              Adicionar Projeto Agora
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {filteredProjects.map((project, index) => {
            const isWide = project.bentoSpan === 'wide';
            const colSpanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <article
                key={project.id}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/70 transition-colors hover:border-zinc-700 ${colSpanClass}`}
              >
                {/* Media Container */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 cursor-pointer"
                >
                  <ResilientImage
                    src={project.imageUrl}
                    alt={project.title}
                    fallbackTitle={project.title}
                    fallbackCategory={project.category}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-zinc-300 tabular-nums">
                      {String(index + 1).padStart(2, '0')} · {project.year}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-200 opacity-90 group-hover:text-[#F2B705] transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                      Ver Monografia
                    </span>
                  </div>
                </div>

                {/* Content Area (Zero-Pill Metadata Discipline) */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span className="font-medium text-zinc-300">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Cliente: {project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[#F2B705] tabular-nums">{project.metrics.split('·')[0].trim()}</span>
                    </div>

                    <h3
                      onClick={() => onSelectProject(project)}
                      className="mt-3 font-display text-xl font-semibold tracking-tight text-zinc-100 group-hover:text-[#F2B705] transition-colors cursor-pointer sm:text-2xl"
                      style={{ textWrap: 'balance' }}
                    >
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-zinc-900 pt-4 flex flex-wrap items-center justify-between gap-4">
                    {/* Unboxed Tech Stack with typographic separator */}
                    <div className="text-xs font-mono text-zinc-500 truncate max-w-[65%]">
                      {project.technologies.join(' / ')}
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditor('projects', project.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Pencil className="h-3 w-3" />
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#F2B705] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Estudo de Caso
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
